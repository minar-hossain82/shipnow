"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/components/dashboard/icons";
import { AppFooter } from "@/components/layout/app-footer";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import { shipments, type Shipment, type ShipmentStatus, type ShipmentTableStatus } from "@/data/shipments";
import styles from "./shipments.module.css";

type View = "grid" | "table";
type SortKey = "id" | "company" | "carrier" | "product" | "weight" | "route" | "departure" | "progress" | "tableStatus";
type SortDirection = "ascending" | "descending";
type GridSort = "newest" | "oldest" | "progress-desc" | "progress-asc" | "company-asc" | "company-desc";
type GridFilters = { carriers:string[]; freight:string[]; statuses:string[] };
const statuses = ["All", "Delivered", "In Transit", "Processing", "Out for Delivery"] as const;
const tableStatuses = ["All", "Completed", "Delivery", "Pending"] as const;
const emptyGridFilters: GridFilters = { carriers:[], freight:[], statuses:[] };
const gridSortOptions: Array<{value:GridSort;label:string}> = [
  {value:"newest",label:"Newest"}, {value:"oldest",label:"Oldest"},
  {value:"progress-desc",label:"Progress: High to Low"}, {value:"progress-asc",label:"Progress: Low to High"},
  {value:"company-asc",label:"Company: A to Z"}, {value:"company-desc",label:"Company: Z to A"},
];

function LogoMark({ word = false }: { word?: boolean }) {
  return <span className={styles.logo}><i/><i/>{word && <b>SHIPNOW</b>}</span>;
}

function NewestChevron(){return <svg aria-hidden="true" className={styles.newestChevron} viewBox="0 0 10 6" fill="none"><path d="m1 1 4 4 4-4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}

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

function Pager({ page, pages, pageSize, total, start, end, setPage, setPageSize, grid }: { page:number; pages:number; pageSize:number; total:number; start:number; end:number; setPage:(page:number)=>void; setPageSize:(size:number)=>void; grid:boolean }) {
  const visible = [1, 2, 3, Math.max(4, pages)].filter((value,index,array)=>value<=pages && array.indexOf(value)===index);
  const sizes = grid ? [6,12,24] : [12,24,48];
  return <div className={styles.pager}><div className={styles.pageSize}>Show <select aria-label="Results per page" value={pageSize} onChange={event=>setPageSize(Number(event.target.value))}>{sizes.map(size=><option key={size} value={size}>{size}</option>)}</select><span>Showing {start}–{end} of {total} results</span></div><nav className={styles.pages} aria-label="Shipment table pagination"><button type="button" aria-label="Previous page" disabled={page===1} onClick={()=>setPage(page-1)}>‹</button>{visible.map((value,index)=><span key={value}>{index>0 && value-visible[index-1]>1 && <i aria-hidden="true">…</i>}<button type="button" aria-label={`Page ${value}`} aria-current={page===value?"page":undefined} className={page===value?styles.current:""} onClick={()=>setPage(value)}>{value}</button></span>)}<button type="button" aria-label="Next page" disabled={page===pages} onClick={()=>setPage(page+1)}>›</button></nav></div>;
}

const textCollator = new Intl.Collator(undefined,{ sensitivity:"base" });
const numericId = (value:string) => Number(value.replace(/\D/g,""));
const numericWeight = (value:string) => Number(value.replace(/[^\d.]/g,""));
const shipmentDate = (value:string) => {
  const match = value.match(/([A-Za-z]{3})\s+(\d{1,2}),\s+(\d{4}).*?(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if(!match) return 0;
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  let hour = Number(match[4]) % 12;
  if(match[6].toUpperCase()==="PM") hour += 12;
  return Date.UTC(Number(match[3]),months.indexOf(match[1].toLowerCase()),Number(match[2]),hour,Number(match[5]));
};

function compareShipments(a:Shipment,b:Shipment,key:SortKey) {
  switch(key) {
    case "id": return numericId(a.id)-numericId(b.id);
    case "weight": return numericWeight(a.weight)-numericWeight(b.weight);
    case "departure": return shipmentDate(a.departure)-shipmentDate(b.departure);
    case "progress": return a.progress-b.progress;
    case "route": return textCollator.compare(`${a.origin} ${a.destination}`,`${b.origin} ${b.destination}`);
    case "tableStatus": return textCollator.compare(a.tableStatus,b.tableStatus);
    default: return textCollator.compare(a[key],b[key]);
  }
}

function compareGridShipments(a:Shipment,b:Shipment,sort:GridSort) {
  switch(sort) {
    case "newest": return shipmentDate(b.departure)-shipmentDate(a.departure);
    case "oldest": return shipmentDate(a.departure)-shipmentDate(b.departure);
    case "progress-desc": return b.progress-a.progress;
    case "progress-asc": return a.progress-b.progress;
    case "company-desc": return textCollator.compare(b.company,a.company);
    default: return textCollator.compare(a.company,b.company);
  }
}

function focusMenuItem(container:HTMLElement,current:EventTarget & HTMLElement,direction:1|-1) {
  const items = Array.from(container.querySelectorAll<HTMLElement>('[role="menuitem"], input:not([disabled])'));
  const next = items[(items.indexOf(current)+direction+items.length)%items.length];
  next?.focus();
}

function menuKeyDown(event:React.KeyboardEvent<HTMLElement>,container:HTMLElement|null) {
  if(!container || (event.key!=="ArrowDown" && event.key!=="ArrowUp")) return;
  event.preventDefault();
  focusMenuItem(container,event.currentTarget,event.key==="ArrowDown"?1:-1);
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
  const [sortKey,setSortKey] = useState<SortKey | null>(null);
  const [sortDirection,setSortDirection] = useState<SortDirection>("ascending");
  const [page,setPage] = useState(1);
  const [pageSize,setPageSizeState] = useState(12);
  const [selected,setSelected] = useState<Set<string>>(new Set());
  const [monthOnly,setMonthOnly] = useState(false);
  const [gridSort,setGridSort] = useState<GridSort>("newest");
  const [appliedFilters,setAppliedFilters] = useState<GridFilters>(emptyGridFilters);
  const [draftFilters,setDraftFilters] = useState<GridFilters>(emptyGridFilters);
  const [filterOpen,setFilterOpen] = useState(false);
  const [sortOpen,setSortOpen] = useState(false);
  const selectPageRef = useRef<HTMLInputElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  const setView = (next:View) => { setViewState(next); if(next==="grid"&&pageSize===48)setPageSizeState(24); setStatus("All"); setPage(1); router.replace(`/shipments?view=${next}`, { scroll:false }); };
  const setPageSize = (size:number) => { setPageSizeState(size); setPage(1); };
  const filterOptions = useMemo(()=>({
    carriers:[...new Set(shipments.map(item=>item.carrier))].sort(textCollator.compare),
    freight:[...new Set(shipments.map(item=>item.freight))].sort(textCollator.compare),
    statuses:[...new Set(shipments.map(item=>item.status === "Delivered" ? "Completed" : item.status))].sort(textCollator.compare),
  }),[]);
  const filteredShipments = useMemo(()=>shipments.filter(item=>{
    const matchesStatus = status === "All" || (view === "table" ? item.tableStatus === status : item.status === status);
    const searchable = `${item.id} ${item.company} ${item.carrier} ${item.category} ${item.product} ${item.weight} ${item.origin} ${item.destination} ${item.status} ${item.tableStatus}`;
    const displayStatus = item.status === "Delivered" ? "Completed" : item.status;
    const matchesPopover = view === "table" ||
      (!appliedFilters.carriers.length || appliedFilters.carriers.includes(item.carrier)) &&
      (!appliedFilters.freight.length || appliedFilters.freight.includes(item.freight)) &&
      (!appliedFilters.statuses.length || appliedFilters.statuses.includes(displayStatus));
    return matchesStatus && (!query || searchable.toLocaleLowerCase().includes(query.toLocaleLowerCase())) && matchesPopover && (!monthOnly || item.departure.startsWith("Mar"));
  }),[query,status,monthOnly,view,appliedFilters]);
  const sortedShipments = useMemo(()=>view === "grid" ? [...filteredShipments].sort((a,b)=>compareGridShipments(a,b,gridSort)) : sortKey ? [...filteredShipments].sort((a,b)=>compareShipments(a,b,sortKey)*(sortDirection==="ascending"?1:-1)) : filteredShipments,[filteredShipments,view,gridSort,sortKey,sortDirection]);
  const pages = Math.max(1,Math.ceil(sortedShipments.length/pageSize));
  const currentPage = Math.min(page,pages);
  const pageItems = useMemo(()=>sortedShipments.slice((currentPage-1)*pageSize,currentPage*pageSize),[sortedShipments,currentPage,pageSize]);
  const resultStart = sortedShipments.length ? (currentPage-1)*pageSize+1 : 0;
  const resultEnd = Math.min(currentPage*pageSize,sortedShipments.length);
  const chooseSort = (key:SortKey) => { if(sortKey===key)setSortDirection(value=>value==="ascending"?"descending":"ascending");else{setSortKey(key);setSortDirection("ascending");} };
  const toggle = (id:string) => setSelected(current=>{const next=new Set(current);if(next.has(id))next.delete(id);else next.add(id);return next;});
  const allSelected = pageItems.length>0 && pageItems.every(item=>selected.has(item.id));
  const someSelected = pageItems.some(item=>selected.has(item.id)) && !allSelected;
  const toggleAll = () => setSelected(current=>{const next=new Set(current);pageItems.forEach(item=>allSelected?next.delete(item.id):next.add(item.id));return next;});
  const activeTabs = view === "grid" ? statuses : tableStatuses;
  const activeFilterCount = appliedFilters.carriers.length+appliedFilters.freight.length+appliedFilters.statuses.length;
  const gridSortLabel = gridSortOptions.find(option=>option.value===gridSort)?.label ?? "Newest";
  const toggleDraftFilter = (key:keyof GridFilters,value:string) => setDraftFilters(current=>({...current,[key]:current[key].includes(value)?current[key].filter(item=>item!==value):[...current[key],value]}));

  useEffect(()=>{if(selectPageRef.current)selectPageRef.current.indeterminate=someSelected},[someSelected]);
  useEffect(()=>{
    if(!filterOpen && !sortOpen) return;
    const close = (event:MouseEvent) => {
      if(filterOpen && !filterRef.current?.contains(event.target as Node)) setFilterOpen(false);
      if(sortOpen && !sortRef.current?.contains(event.target as Node)) setSortOpen(false);
    };
    const key = (event:KeyboardEvent) => { if(event.key==="Escape"){setFilterOpen(false);setSortOpen(false);} };
    document.addEventListener("mousedown",close); document.addEventListener("keydown",key);
    return ()=>{document.removeEventListener("mousedown",close);document.removeEventListener("keydown",key)};
  },[filterOpen,sortOpen]);

  return <><MobileNavigation activeLabel="Shipments" barClassName={styles.mobileBar} backdropClassName={styles.drawerBackdrop} drawerClassName={styles.drawer} leading={<LogoMark/>} title={<strong>Shipments</strong>} menu="☰"/><main className={`${styles.page} ${view === "table" ? styles.tableView : styles.gridView}`}>
    <header className={styles.pageHeader}><div><h1>Shipments</h1><div className={styles.crumbRow}><p><b>Dashboard</b><span>/</span>Shipments</p><ViewSwitcher view={view} setView={setView}/></div></div><Link href="/shipments/new" className={styles.newShipment}><Icon name="plus"/>New Shipment</Link></header>
    {view === "table" && <SummaryCards/>}
    <div className={view === "table" ? styles.tablePanel : styles.gridPanel}>
      <div className={styles.toolbar}><div className={styles.tabs}>{activeTabs.map(tab=><button type="button" className={status===tab?styles.activeTab:""} key={tab} onClick={()=>{setStatus(tab);setPage(1)}}>{tab}</button>)}</div><div className={styles.tools}><Search value={query} onChange={value=>{setQuery(value);setPage(1)}} placeholder={view==="grid"?"Search Shipment":"Search id, company, etc"}/>{view==="grid"?<div className={styles.menuWrap} ref={filterRef}><button type="button" className={`${styles.filter} ${activeFilterCount?styles.filterActive:""}`} aria-haspopup="dialog" aria-expanded={filterOpen} onClick={()=>{setDraftFilters(appliedFilters);setFilterOpen(value=>!value);setSortOpen(false)}}>⌯ <span>Filter</span>{activeFilterCount>0&&<b className={styles.filterCount}>{activeFilterCount}</b>}</button>{filterOpen&&<div className={styles.filterMenu} role="dialog" aria-label="Filter shipments">{([['carriers','Carrier'],['freight','Shipment Type'],['statuses','Status']] as const).map(([key,label])=><fieldset key={key}><legend>{label}</legend>{filterOptions[key].map(value=><label key={value}><input type="checkbox" checked={draftFilters[key].includes(value)} onChange={()=>toggleDraftFilter(key,value)} onKeyDown={event=>menuKeyDown(event,filterRef.current)}/><span>{value}</span></label>)}</fieldset>)}<div className={styles.filterActions}><button type="button" onClick={()=>{setDraftFilters(emptyGridFilters);setAppliedFilters(emptyGridFilters);setPage(1);setFilterOpen(false)}}>Clear Filters</button><button type="button" onClick={()=>{setAppliedFilters(draftFilters);setPage(1);setFilterOpen(false)}}>Apply Filters</button></div></div>}</div>:<button type="button" className={styles.filter} onClick={()=>{setStatus(current=>current==="All"?"Completed":"All");setPage(1)}}>⌯ <span>Filter</span></button>}{view==="table"?<button type="button" className={styles.date} onClick={()=>{setMonthOnly(value=>!value);setPage(1)}}>▣ <span>{monthOnly?"All Dates":"This Month"}⌄</span></button>:<><span className={styles.sortLabel}>Sort by:</span><div className={styles.menuWrap} ref={sortRef}><button type="button" className={styles.date} aria-haspopup="menu" aria-expanded={sortOpen} onClick={()=>{setSortOpen(value=>!value);setFilterOpen(false)}}>{gridSortLabel}<NewestChevron/></button>{sortOpen&&<div className={styles.sortMenu} role="menu" aria-label="Sort shipments">{gridSortOptions.map(option=><button type="button" role="menuitem" aria-current={gridSort===option.value?"true":undefined} className={gridSort===option.value?styles.menuSelected:""} key={option.value} onKeyDown={event=>menuKeyDown(event,sortRef.current)} onClick={()=>{setGridSort(option.value);setPage(1);setSortOpen(false)}}>{option.label}</button>)}</div>}</div></>}</div></div>
      {view === "grid" ? <div className={styles.cards}>{pageItems.map(item=><ShipmentCard shipment={item} key={item.id}/>)}</div> : <div className={styles.tableScroll}><table className={styles.table}><colgroup className={styles.tableColumns}><col/><col/><col/><col/><col/><col/><col/><col/><col/><col/></colgroup><thead><tr><th><input ref={selectPageRef} type="checkbox" checked={allSelected} aria-checked={someSelected?"mixed":allSelected} onChange={toggleAll} aria-label="Select all shipments on this page"/></th><SortHead label="Shipping ID" value="id" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Company" value="company" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Carriers" value="carrier" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Product Category" value="product" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Weight" value="weight" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Route" value="route" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Date" value="departure" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Progress" value="progress" sortKey={sortKey} direction={sortDirection} action={chooseSort}/><SortHead label="Status" value="tableStatus" sortKey={sortKey} direction={sortDirection} action={chooseSort}/></tr></thead><tbody>{pageItems.map(item=><tr key={item.id} className={selected.has(item.id)?styles.selectedRow:""}><td><input type="checkbox" checked={selected.has(item.id)} onChange={()=>toggle(item.id)} aria-label={`Select ${item.id}`}/></td><td><b className={styles.shipmentId}>{item.id}</b><small>{item.freight}</small></td><td><Company shipment={item}/></td><td><b>{item.carrier}</b><small>{item.category}</small></td><td>{item.product}</td><td>{item.weight}</td><td><b>{item.origin} <small>(Origin)</small></b><b className={styles.destination}>{item.destination} <small>(Destination)</small></b></td><td><b>{item.departure} <small>(ATD)</small></b><b className={styles.destination}>{item.arrival} <small>(ETA)</small></b></td><td><div className={styles.tableProgress}><i><span style={{width:`${item.progress}%`}}/></i><b>{item.progress}%</b></div></td><td><TableStatusPill status={item.tableStatus}/></td></tr>)}</tbody></table></div>}
      <Pager page={currentPage} pages={pages} pageSize={pageSize} total={sortedShipments.length} start={resultStart} end={resultEnd} setPage={setPage} setPageSize={setPageSize} grid={view==="grid"}/>
    </div><AppFooter className={styles.footer}/>
  </main></>;
}

function SortHead({label,value,sortKey,direction,action}:{label:string;value:SortKey;sortKey:SortKey|null;direction:SortDirection;action:(value:SortKey)=>void}) {
  const active = sortKey===value;
  return <th aria-sort={active?direction:"none"}><button type="button" aria-label={`Sort by ${label} ${active&&direction==="ascending"?"descending":"ascending"}`} onClick={()=>action(value)}>{label} {active?(direction==="ascending"?"↑":"↓"):"↕"}</button></th>;
}
