"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/dashboard/icons";
import { AuthenticatedSidebarContent } from "@/components/dashboard/authenticated-sidebar-content";
import { shipments, type Shipment, type ShipmentStatus, type ShipmentTableStatus } from "@/data/shipments";
import styles from "./shipments.module.css";

type View = "grid" | "table";
type SortKey = "id" | "company" | "carrier" | "product" | "weight" | "origin" | "departure" | "progress" | "status";
const statuses = ["All", "Delivered", "In Transit", "Processing", "Out for Delivery"] as const;
const tableStatuses = ["All", "Completed", "Delivery", "Pending"] as const;

function LogoMark({ word = false }: { word?: boolean }) {
  return <span className={styles.logo}><i/><i/>{word && <b>SHIPNOW</b>}</span>;
}

function MobileBar({ open }: { open: () => void }) {
  return <header className={styles.mobileBar}><LogoMark/><strong>Shipments</strong><button type="button" aria-label="Open navigation" onClick={open}>☰</button></header>;
}

function MobileDrawer({ close }: { close: () => void }) {
  return <div className={styles.drawerBackdrop} onClick={close}><aside className={styles.drawer} onClick={event=>event.stopPropagation()}><AuthenticatedSidebarContent active="Shipments" onNavigate={close} onClose={close}/></aside></div>;
}

function NewestChevron(){return <svg aria-hidden="true" className={styles.newestChevron} viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}

function Footer() {
  return <footer className={styles.footer}><div><b>Copyright © 2025 Peterdraw</b><span>Privacy Policy</span><span>Term and conditions</span><span>Contact</span></div><div aria-label="Social links"><span>ⓕ</span><span>𝕏</span><span>◎</span><span>▷</span><span>in</span></div></footer>;
}

function StatusPill({ status }: { status: ShipmentStatus }) {
  return <span className={`${styles.status} ${styles[status.replaceAll(" ", "").toLowerCase()]}`}>{status === "Delivered" ? "Completed" : status}</span>;
}

function TableStatusPill({ status }: { status: ShipmentTableStatus }) {
  return <span className={`${styles.tableStatus} ${styles[`tableStatus${status}`]}`}><i/>{status}</span>;
}

export function CompanyLogo({ company }: { company: string }) {
  const common = { "aria-hidden": true, viewBox: "0 0 32 32" } as const;
  switch (company) {
    case "TechGear Inc.": return <svg {...common} className={styles.companyLogoDark}><path fill="currentColor" fillRule="evenodd" d="M11 2h13v5h5v14L20 30H8l-6-6V12L11 2Zm3 8-5 5v7l3 3h6l5-5v-8l-2-2h-7Z"/></svg>;
    case "StyleHub Co.": return <svg {...common} className={styles.companyLogoPurple}><path fill="currentColor" d="M14.8 2.2 1.8 21.8C-.7 25.6 2 30 6.5 30h19c4.5 0 7.2-4.4 4.7-8.2L17.2 2.2v16.1l8.6 5.7H6.2l8.6-5.7V2.2Z"/></svg>;
    case "FreshNest": return <svg {...common} className={styles.companyLogoDark}><path fill="currentColor" d="M2 15C2 7.8 7.8 2 15 2v13H2Zm0 2h13v13H7a5 5 0 0 1-5-5v-8Zm15 0h13v8a5 5 0 0 1-5 5h-8V17Zm0-15c7.2 0 13 5.8 13 13H17V2Z"/><path fill="#fff" d="m23.5 8 1.6 4.4 4.4 1.6-4.4 1.6-1.6 4.4-1.6-4.4-4.4-1.6 4.4-1.6L23.5 8Z"/><circle cx="29" cy="3" r="1.5" fill="currentColor"/></svg>;
    case "FitPlus Gear": return <svg {...common} className={styles.companyLogoPurple}><path fill="currentColor" d="M16 3a13.5 13.5 0 1 1-12.5 8.4l8 3.1A5.7 5.7 0 1 0 16 11V3Z"/><path fill="currentColor" d="M3 4h13v7H9.5A9.5 9.5 0 0 1 3 17.5V4Z"/></svg>;
    case "AutoParts Pro": return <svg {...common}><path fill="#29292b" d="m9 5 14 .2-7 11.5H2L9 5Z"/><path fill="#8065f4" d="m16 17.5 14 .2L23 29H9l7-11.5Z"/></svg>;
    case "EcoLights": return <svg {...common} className={styles.companyLogoPurple}><g stroke="currentColor" strokeWidth="2" strokeLinecap="square"><path d="M16 1v30M1 16h30M5.4 5.4l21.2 21.2M26.6 5.4 5.4 26.6"/></g><circle cx="16" cy="16" r="2" fill="currentColor"/></svg>;
    case "GreenHaven": return <svg {...common} className={styles.companyLogoDark}><path fill="currentColor" fillRule="evenodd" d="M4 3h6v4h12V3h6v14c0 7.8-4.8 12.8-12 15C8.8 29.8 4 24.8 4 17V3Zm6 9v5c0 4.2 2.1 7.2 6 9 3.9-1.8 6-4.8 6-9v-2.5c-4.3.3-7.2 1.7-9 4.2.2-3.2 1.8-5.4 4.8-6.7H10Z"/></svg>;
    case "ModaWear": return <svg {...common} className={styles.companyLogoPurple}><path fill="currentColor" d="M1 8a6 6 0 0 1 6-6h7v22h-5V8H6v20H1V8Zm15-6h9c5 0 8 5.5 5 9.5L20 25h-4V2Zm5 6v9l6-8a1 1 0 0 0-.8-1H21Z"/></svg>;
    case "SunCore Panels": return <svg {...common} className={styles.companyLogoDark}><g fill="currentColor"><ellipse cx="16" cy="4" rx="4" ry="2.7"/><ellipse cx="16" cy="28" rx="4" ry="2.7"/><ellipse cx="4" cy="16" rx="4" ry="2.7"/><ellipse cx="28" cy="16" rx="4" ry="2.7"/><ellipse cx="7.5" cy="7.5" rx="4" ry="2.7" transform="rotate(45 7.5 7.5)"/><ellipse cx="24.5" cy="7.5" rx="4" ry="2.7" transform="rotate(-45 24.5 7.5)"/><ellipse cx="7.5" cy="24.5" rx="4" ry="2.7" transform="rotate(-45 7.5 24.5)"/><ellipse cx="24.5" cy="24.5" rx="4" ry="2.7" transform="rotate(45 24.5 24.5)"/><ellipse cx="16" cy="16" rx="4" ry="2.7"/></g></svg>;
    case "QuickParts": return <svg {...common}><path fill="#8065f4" d="M7 5h7L7 27H0L7 5Z"/><path fill="#ff4f68" d="M16 5h7l-7 22H9l7-22Z"/><path fill="#ff4f68" d="M25 5h7l-7 22h-7l7-22Z"/></svg>;
    case "VitaFresh": return <svg {...common} className={styles.companyLogoPurple}><path fill="currentColor" fillRule="evenodd" d="M2 18a8 8 0 0 1 13.2-6.1A8.5 8.5 0 1 1 30 17v10H2v-9Zm19-8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7ZM9 18a4 4 0 0 0-4 4v2h8v-2a4 4 0 0 0-4-4Zm12 1a4 4 0 0 0-4 4v1h8v-1a4 4 0 0 0-4-4Z"/><path d="M4 2v8M0 6h8" stroke="currentColor" strokeWidth="2.5"/><path d="M27 5v4M25 7h4" stroke="currentColor" strokeWidth="2"/></svg>;
    case "SmartAppliance":
    case "StyleDepot": return <svg {...common} className={styles.companyLogoDark}><g fill="none" stroke="currentColor" strokeWidth="2"><path d="m2 13 11-11 17 17-11 11L2 13Z"/><path d="m6 13 7-7 13 13-7 7L6 13Z"/><path d="m10 13 3-3 9 9-3 3-9-9Z"/></g></svg>;
    default: return null;
  }
}

function Company({ shipment, compact = false }: { shipment: Shipment; compact?: boolean }) {
  return <div className={styles.company}><span className={styles.companyMark}><CompanyLogo company={shipment.company}/><span className={styles.companyFallback} aria-hidden="true">{shipment.mark}</span></span><span><b>{shipment.company}</b><small>{shipment.category}</small></span>{compact && <StatusPill status={shipment.status}/>}</div>;
}

function ShipmentTypeIcon({ freight }: { freight: string }) {
  const common = { "aria-hidden": true, className: styles.freightTypeIcon, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round", strokeLinejoin: "round" } as const;
  if (freight.startsWith("Air")) return <svg {...common}><path d="m17.8 19.2-1.8-8.1 3.5-3.5c1-1 1.4-2.6.6-3.4-.8-.8-2.4-.4-3.4.6L13.1 8.4 5 6.6 3.4 8.2l6.4 3.2-3.2 3.2-2.2-.7-1.1 1.1 2.9 1.7 1.7 2.9 1.1-1.1-.7-2.2 3.2-3.2 3.2 6.4 1.1-1.3Z"/></svg>;
  if (freight.startsWith("Ocean")) return <svg {...common}><path d="M12 3v5m-3-3h6M6 9h12l2 3v5c-2.7 2.2-5.3 3.5-8 4-2.7-.5-5.3-1.8-8-4v-5l2-3Z"/><path d="M12 11v7M4 14l8-3 8 3"/></svg>;
  if (freight.startsWith("Rail")) return <svg {...common}><rect x="5" y="3" width="14" height="16" rx="2.5"/><path d="M7 6h10v5H7zM5 12h14M8 16h.01M16 16h.01M8 19l-2 2m10-2 2 2"/></svg>;
  return <svg {...common}><path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/><path d="M3 13h11"/></svg>;
}

function ViewSwitcher({ view, setView }: { view: View; setView: (view: View) => void }) {
  return <div className={styles.viewSwitcher} aria-label="Shipment view"><button type="button" className={view === "table" ? styles.chosen : ""} onClick={()=>setView("table")} aria-pressed={view === "table"}>☷ <span>Table</span></button><button type="button" className={view === "grid" ? styles.chosen : ""} onClick={()=>setView("grid")} aria-pressed={view === "grid"}>⊞ <span>Grid</span></button></div>;
}

function Search({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className={styles.search}><Icon name="search"/><input value={value} onChange={event=>onChange(event.target.value)} placeholder={placeholder} aria-label={placeholder}/></label>;
}

function Pager({ page, pages, pageSize, setPage, setPageSize, grid }: { page:number; pages:number; pageSize:number; setPage:(page:number)=>void; setPageSize:(size:number)=>void; grid:boolean }) {
  const visible = [1, 2, 3, Math.max(4, pages)].filter((value,index,array)=>value<=pages && array.indexOf(value)===index);
  return <div className={styles.pager}><div className={styles.pageSize}>Show <select value={pageSize} onChange={event=>setPageSize(Number(event.target.value))}><option>6</option><option>12</option><option>24</option></select> of {grid ? "520" : "1,240"} results</div><div className={styles.pages}><button disabled={page===1} onClick={()=>setPage(page-1)}>‹</button>{visible.map((value,index)=><span key={value}>{index>0 && value-visible[index-1]>1 && <i>…</i>}<button className={page===value?styles.current:""} onClick={()=>setPage(value)}>{value}</button></span>)}<button disabled={page===pages} onClick={()=>setPage(page+1)}>›</button></div></div>;
}

function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return <article className={styles.shipmentCard}><div className={styles.cardTop}><div><b>{shipment.id}</b><StatusPill status={shipment.status}/></div><span className={styles.freightIcon}><ShipmentTypeIcon freight={shipment.freight}/></span></div><Company shipment={shipment}/><div className={styles.routeBox}><div><span><i/>Origin</span><b>{shipment.origin}</b><small>{shipment.departure}</small></div><div><span><i/>Destination</span><b>{shipment.destination}</b><small>{shipment.arrival}</small></div></div><div className={styles.progressMeta}><span>Progres <b>{shipment.progress}%</b></span><span>Carriers <b>{shipment.carrier}</b></span></div><div className={styles.progress}><i style={{width:`${shipment.progress}%`}}/></div></article>;
}

function SummaryCards() {
  const cards = [
    { icon: <Icon name="truck" className={styles.summaryMetricIcon}/>, title: "Total Shipments", value: "1,284", direction: "up", change: "Up by", percent: "4.6%", period: "this week" },
    { icon: "◷", title: "Pending", value: "285", direction: "up", change: "Up by", percent: "8.7%", period: "this week" },
    { icon: <Icon name="truck" className={styles.summaryMetricIcon}/>, title: "Delivery", value: "594", direction: "down", change: "Down", percent: "4.2%", period: "from last week" },
    { icon: "☑", title: "Completed", value: "405", direction: "up", change: "Up by", percent: "3.9%", period: "this week" },
  ] as const;

  return <div className={styles.summaries}>{cards.map(card=><article key={card.title}>
    <div className={styles.summaryTop}>
      <span className={styles.summaryIcon}>{card.icon}</span>
      <p>{card.title}</p>
      <button type="button" aria-label={`More ${card.title}`}><Icon name="more"/></button>
    </div>
    <div className={styles.summaryBottom}>
      <strong>{card.value}</strong>
      <div className={`${styles.summaryTrend} ${card.direction === "down" ? styles.summaryTrendDown : ""}`}>
        <i aria-hidden="true">{card.direction === "down" ? "⌄" : "⌃"}</i>
        <span>{card.change}<br/>{card.period}</span>
        <b>{card.percent}</b>
      </div>
    </div>
  </article>)}</div>;
}

export function ShipmentsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialView = searchParams.get("view") === "grid" ? "grid" : "table";
  const [view,setViewState] = useState<View>(initialView);
  const [query,setQuery] = useState("");
  const [status,setStatus] = useState<string>("All");
  const [sort,setSort] = useState<SortKey | null>(null);
  const [ascending,setAscending] = useState(true);
  const [page,setPage] = useState(1);
  const [pageSize,setPageSizeState] = useState(12);
  const [selected,setSelected] = useState<Set<string>>(new Set());
  const [monthOnly,setMonthOnly] = useState(false);
  const [drawerOpen,setDrawerOpen] = useState(false);

  const setView = (next:View) => { setViewState(next); setStatus("All"); setPage(1); router.replace(`/shipments?view=${next}`, { scroll:false }); };
  const setPageSize = (size:number) => { setPageSizeState(size); setPage(1); };
  const filtered = useMemo(()=>shipments.filter(item=>{
    const mapped = status === "Completed" ? "Delivered" : status === "Delivery" ? "Out for Delivery" : status === "Pending" ? "Processing" : status;
    return (mapped === "All" || item.status === mapped) && (!query || `${item.id} ${item.company} ${item.carrier} ${item.origin} ${item.destination}`.toLowerCase().includes(query.toLowerCase())) && (!monthOnly || item.departure.startsWith("Mar"));
  }).sort((a,b)=>sort ? String(a[sort]).localeCompare(String(b[sort]),undefined,{numeric:true})*(ascending?1:-1) : 0),[query,status,sort,ascending,monthOnly]);
  const pages = Math.max(1,Math.ceil(filtered.length/pageSize));
  const pageItems = filtered.slice((page-1)*pageSize,page*pageSize);
  const chooseSort = (key:SortKey) => { if(sort===key)setAscending(value=>!value);else{setSort(key);setAscending(true);} };
  const toggle = (id:string) => setSelected(current=>{const next=new Set(current);if(next.has(id))next.delete(id);else next.add(id);return next;});
  const allSelected = pageItems.length>0 && pageItems.every(item=>selected.has(item.id));
  const toggleAll = () => setSelected(current=>{const next=new Set(current);pageItems.forEach(item=>allSelected?next.delete(item.id):next.add(item.id));return next;});
  const activeTabs = view === "grid" ? statuses : tableStatuses;

  return <><MobileBar open={()=>setDrawerOpen(true)}/>{drawerOpen&&<MobileDrawer close={()=>setDrawerOpen(false)}/>}<main className={styles.page}>
    <header className={styles.pageHeader}><div><h1>Shipments</h1><div className={styles.crumbRow}><p><b>Dashboard</b><span>/</span>Shipments</p><ViewSwitcher view={view} setView={setView}/></div></div><Link href="/shipments/new" className={styles.newShipment}><Icon name="plus"/>New Shipment</Link></header>
    {view === "table" && <SummaryCards/>}
    <div className={view === "table" ? styles.tablePanel : styles.gridPanel}>
      <div className={styles.toolbar}><div className={styles.tabs}>{activeTabs.map(tab=><button type="button" className={status===tab?styles.activeTab:""} key={tab} onClick={()=>{setStatus(tab);setPage(1)}}>{tab}</button>)}</div><div className={styles.tools}><Search value={query} onChange={value=>{setQuery(value);setPage(1)}} placeholder={view==="grid"?"Search Shipment":"Search id, company, etc"}/><button type="button" className={styles.filter} onClick={()=>setStatus(current=>current==="All"?"Delivered":"All")}>⌯ <span>Filter</span></button>{view==="table"?<button type="button" className={styles.date} onClick={()=>setMonthOnly(value=>!value)}>▣ <span>{monthOnly?"All Dates":"This Month"}⌄</span></button>:<><span className={styles.sortLabel}>Sort by:</span><button type="button" className={styles.date} onClick={()=>{setSort("departure");setAscending(value=>!value)}}>Newest<NewestChevron/></button></>}</div></div>
      {view === "grid" ? <div className={styles.cards}>{pageItems.map(item=><ShipmentCard shipment={item} key={item.id}/>)}</div> : <div className={styles.tableScroll}><table className={styles.table}><colgroup className={styles.tableColumns}><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup><thead><tr><th><input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select page"/></th><SortHead label="Shipping ID" value="id" action={chooseSort}/><SortHead label="Company" value="company" action={chooseSort}/><SortHead label="Carriers" value="carrier" action={chooseSort}/><SortHead label="Product Category" value="product" action={chooseSort}/><SortHead label="Weight" value="weight" action={chooseSort}/><SortHead label="Route" value="origin" action={chooseSort}/><SortHead label="Date" value="departure" action={chooseSort}/><SortHead label="Progress" value="progress" action={chooseSort}/><SortHead label="Status" value="status" action={chooseSort}/></tr></thead><tbody>{pageItems.map(item=><tr key={item.id} className={selected.has(item.id)?styles.selectedRow:""}><td><input type="checkbox" checked={selected.has(item.id)} onChange={()=>toggle(item.id)} aria-label={`Select ${item.id}`}/></td><td><b className={styles.shipmentId}>{item.id}</b><small>{item.freight}</small></td><td><Company shipment={item}/></td><td><b>{item.carrier}</b><small>{item.category}</small></td><td>{item.product}</td><td>{item.weight}</td><td><b>{item.origin} <small>(Origin)</small></b><b className={styles.destination}>{item.destination} <small>(Destination)</small></b></td><td><b>{item.departure} <small>(ATD)</small></b><b className={styles.destination}>{item.arrival} <small>(ETA)</small></b></td><td><div className={styles.tableProgress}><i><span style={{width:`${item.progress}%`}}/></i><b>{item.progress}%</b></div></td><td><TableStatusPill status={item.tableStatus}/></td></tr>)}</tbody></table></div>}
      <Pager page={page} pages={pages} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} grid={view==="grid"}/>
    </div><Footer/>
  </main></>;
}

function SortHead({label,value,action}:{label:string;value:SortKey;action:(value:SortKey)=>void}) { return <th><button type="button" onClick={()=>action(value)}>{label} ↕</button></th>; }
