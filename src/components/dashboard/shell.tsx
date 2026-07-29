"use client";

import Link from "next/link";
import { useState } from "react";
import { Icon, type DashboardIcon } from "./dashboard-icons";
import { SidebarHeader } from "./sidebar-header";
import { SidebarPromoCard } from "./sidebar-promo-card";
import { AuthenticatedSidebarContent } from "./authenticated-sidebar-content";
import styles from "./dashboard.module.css";

const primary: [string, DashboardIcon, string][] = [
  ["Dashboard", "grid", "/dashboard"], ["Analytics", "chart", "/analytics"],
  ["Calendar", "calendar", "/calendar"], ["Shipments", "truck", "/shipments"],
  ["Tracking", "route", "/tracking"], ["Warehouse", "warehouse", "/warehouse"],
  ["Fleets", "fleet", "/fleets"], ["Drivers", "driver", "/drivers"],
  ["Invoices & Billing", "invoice", "/invoices"],
];
const secondary: [string, DashboardIcon, string][] = [
  ["Message", "message", "19"], ["Notification", "bell", "5"], ["Settings", "settings", ""],
];

function Logo() {
  return <div className={styles.logo}><i /><span>SHIPNOW</span></div>;
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return <>
    <button aria-label="Close navigation" className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={onClose} />
    <aside className={`shared-sidebar ${styles.sidebar} ${open ? styles.sidebarOpen : ""}`}>
      <div className={styles.desktopSidebar}><SidebarHeader onClose={onClose} /><nav className="shared-sidebar-nav"><ul>{primary.map(item => <li key={item[0]}><Link href={item[2]} className={item[0] === "Dashboard" ? styles.active : ""} onClick={onClose} onKeyDown={event=>{if(event.key===" "){event.preventDefault();event.currentTarget.click()}}}><Icon name={item[1]} /><span>{item[0]}</span></Link></li>)}</ul><hr/><ul>{secondary.map(item => <li key={item[0]}><button><Icon name={item[1]} /><span>{item[0]}</span>{item[2] && <b>{item[2]}</b>}</button></li>)}</ul></nav><div className={`shared-sidebar-promo ${styles.sidebarPromo}`}><SidebarPromoCard/></div></div>
      <div className={styles.mobileSidebar}><AuthenticatedSidebarContent active="Dashboard" onNavigate={onClose} onClose={onClose}/></div>
    </aside>
  </>;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <div className={styles.shell}>
    <Sidebar open={open} onClose={() => setOpen(false)} />
    <div className={styles.main}>
      <header className={styles.mobileBar}><Logo /><span>Dashboard</span><button aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button></header>
      <header className={styles.topHeader}><div><p>Hello John!</p><h1>Good Morning</h1></div><div><label><Icon name="search" /><input aria-label="Search" placeholder="Search anything" /></label><button><Icon name="plus" /><span className={styles.addDesktop}>Add New Shipping</span><span className={styles.addTablet}>New Shipping</span></button></div></header>
      {children}
    </div>
  </div>;
}
