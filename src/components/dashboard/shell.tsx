"use client";

import { useState } from "react";
import { Icon } from "./dashboard-icons";
import { AuthenticatedShell } from "@/components/layout/authenticated-shell";
import styles from "./dashboard.module.css";

function Logo() {
  return <div className={styles.logo}><i /><span>SHIPNOW</span></div>;
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return <AuthenticatedShell activeLabel="Dashboard" variant="dashboard" sidebarOpen={open} onNavigate={()=>setOpen(false)} shellClassName={styles.shell} contentClassName={styles.main}>
      <button aria-label="Close navigation" className={`${styles.scrim} ${open ? styles.scrimOpen : ""}`} onClick={()=>setOpen(false)} />
      <header className={styles.mobileBar}><Logo /><span>Dashboard</span><button aria-label="Open menu" onClick={() => setOpen(true)}><Icon name="menu" /></button></header>
      <header className={styles.topHeader}><div><p>Hello John!</p><h1>Good Morning</h1></div><div><label><Icon name="search" /><input aria-label="Search" placeholder="Search anything" /></label><button><Icon name="plus" /><span className={styles.addDesktop}>Add New Shipping</span><span className={styles.addTablet}>New Shipping</span></button></div></header>
      {children}
  </AuthenticatedShell>;
}
