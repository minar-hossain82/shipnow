"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/dashboard/icons";
import { shipments, type Shipment, type ShipmentStatus } from "@/data/shipments";
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
  const items: Array<[string, "grid"|"chart"|"calendar"|"truck"|"route"|"warehouse"|"fleet"|"driver"|"invoice", string]> = [["Dashboard","grid","/dashboard"],["Analytics","chart","#"],["Calendar","calendar","#"],["Shipments","truck","/shipments"],["Tracking","route","#"],["Warehouse","warehouse","#"],["Fleets","fleet","#"],["Drivers","driver","#"],["Invoices & Billing","invoice","/invoices"]];
  return <div className={styles.drawerBackdrop} onClick={close}><aside className={styles.drawer} onClick={event=>event.stopPropagation()}><div className={styles.drawerBrand}><LogoMark word/><button type="button" onClick={close} aria-label="Close navigation">×</button></div><nav>{items.map(item=><Link key={item[0]} href={item[2]} className={item[0]==="Shipments"?styles.drawerActive:""} onClick={close}><Icon name={item[1]}/><span>{item[0]}</span></Link>)}</nav></aside></div>;
}

function Footer() {
  return <footer className={styles.footer}><div><b>Copyright © 2025 Peterdraw</b><span>Privacy Policy</span><span>Term and conditions</span><span>Contact</span></div><div aria-label="Social links"><span>ⓕ</span><span>𝕏</span><span>◎</span><span>▷</span><span>in</span></div></footer>;
}

function StatusPill({ status }: { status: ShipmentStatus }) {
  return <span className={`${styles.status} ${styles[status.replaceAll(" ", "").toLowerCase()]}`}>{status === "Delivered" ? "Completed" : status}</span>;
}

function Company({ shipment, compact = false }: { shipment: Shipment; compact?: boolean }) {
  return <div className={styles.company}><span className={styles.companyMark}>{shipment.mark}</span><span><b>{shipment.company}</b><small>{shipment.category}</small></span>{compact && <StatusPill status={shipment.status}/>}</div>;
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
  return <article className={styles.shipmentCard}><div className={styles.cardTop}><div><b>{shipment.id}</b><StatusPill status={shipment.status}/></div><span className={styles.freightIcon}>{shipment.freight.startsWith("Air") ? "✈" : shipment.freight.startsWith("Ocean") ? "♙" : "▣"}</span></div><Company shipment={shipment}/><div className={styles.routeBox}><div><span><i/>Origin</span><b>{shipment.origin}</b><small>{shipment.departure}</small></div><div><span><i/>Destination</span><b>{shipment.destination}</b><small>{shipment.arrival}</small></div></div><div className={styles.progressMeta}><span>Progres <b>{shipment.progress}%</b></span><span>Carriers <b>{shipment.carrier}</b></span></div><div className={styles.progress}><i style={{width:`${shipment.progress}%`}}/></div></article>;
}

function SummaryCards() {
  const cards = [["▣","Total Shipments","1,284","Up by","4.6%"],["◷","Pending","285","Up by","8.7%"],["▣","Delivery","594","Down","4.2%"],["☑","Completed","405","Up by","3.9%"]];
  return <div className={styles.summaries}>{cards.map(card=><article key={card[1]}><div><span>{card[0]}</span><p>{card[1]}</p><button type="button" aria-label={`More ${card[1]}`}>•••</button></div><strong>{card[2]}</strong><small><i>{card[3]==="Down"?"⌄":"⌃"}</i>{card[3]} <b>{card[4]}</b> this week</small></article>)}</div>;
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
      <div className={styles.toolbar}><div className={styles.tabs}>{activeTabs.map(tab=><button type="button" className={status===tab?styles.activeTab:""} key={tab} onClick={()=>{setStatus(tab);setPage(1)}}>{tab}</button>)}</div><div className={styles.tools}><Search value={query} onChange={value=>{setQuery(value);setPage(1)}} placeholder={view==="grid"?"Search Shipment":"Search id, company, etc"}/><button type="button" className={styles.filter} onClick={()=>setStatus(current=>current==="All"?"Delivered":"All")}>⌯ <span>Filter</span></button>{view==="table"?<button type="button" className={styles.date} onClick={()=>setMonthOnly(value=>!value)}>▣ <span>{monthOnly?"All Dates":"This Month"}⌄</span></button>:<><span className={styles.sortLabel}>Sort by:</span><button type="button" className={styles.date} onClick={()=>{setSort("departure");setAscending(value=>!value)}}>Newest⌄</button></>}</div></div>
      {view === "grid" ? <div className={styles.cards}>{pageItems.map(item=><ShipmentCard shipment={item} key={item.id}/>)}</div> : <div className={styles.tableScroll}><table className={styles.table}><thead><tr><th><input type="checkbox" checked={allSelected} onChange={toggleAll} aria-label="Select page"/></th><SortHead label="Shipping ID" value="id" action={chooseSort}/><SortHead label="Company" value="company" action={chooseSort}/><SortHead label="Carriers" value="carrier" action={chooseSort}/><SortHead label="Product Category" value="product" action={chooseSort}/><SortHead label="Weight" value="weight" action={chooseSort}/><SortHead label="Route" value="origin" action={chooseSort}/><SortHead label="Date" value="departure" action={chooseSort}/><SortHead label="Progress" value="progress" action={chooseSort}/><SortHead label="Status" value="status" action={chooseSort}/></tr></thead><tbody>{pageItems.map(item=><tr key={item.id} className={selected.has(item.id)?styles.selectedRow:""}><td><input type="checkbox" checked={selected.has(item.id)} onChange={()=>toggle(item.id)} aria-label={`Select ${item.id}`}/></td><td><b className={styles.shipmentId}>{item.id}</b><small>{item.freight}</small></td><td><Company shipment={item}/></td><td><b>{item.carrier}</b><small>{item.category}</small></td><td>{item.product}</td><td>{item.weight}</td><td><b>{item.origin} <small>(Origin)</small></b><b className={styles.destination}>{item.destination} <small>(Destination)</small></b></td><td><b>{item.departure} <small>(ATD)</small></b><b className={styles.destination}>{item.arrival} <small>(ETA)</small></b></td><td><div className={styles.tableProgress}><i><span style={{width:`${item.progress}%`}}/></i><b>{item.progress}%</b></div></td><td><StatusPill status={item.status}/></td></tr>)}</tbody></table></div>}
      <Pager page={page} pages={pages} pageSize={pageSize} setPage={setPage} setPageSize={setPageSize} grid={view==="grid"}/>
    </div><Footer/>
  </main></>;
}

function SortHead({label,value,action}:{label:string;value:SortKey;action:(value:SortKey)=>void}) { return <th><button type="button" onClick={()=>action(value)}>{label} ↕</button></th>; }
