"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/dashboard/sidebar";
import { AuthenticatedSidebarContent } from "@/components/dashboard/authenticated-sidebar-content";
import styles from "./placeholder-shell.module.css";

const titles: Record<string, string> = { analytics: "Analytics", calendar: "Calendar", tracking: "Tracking", fleets: "Fleets", drivers: "Drivers" };

export function PlaceholderShell({ children }: { children: React.ReactNode }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const segment = usePathname().split("/")[1];
  const title = titles[segment] ?? "Dashboard";
  const closeDrawer = () => setDrawerOpen(false);

  return <div className={styles.shell}>
    <Sidebar activeLabel={title}/>
    <div className={styles.content}>
      <header className={styles.mobileBar}><i aria-hidden="true"/><strong>{title}</strong><button type="button" onClick={() => setDrawerOpen(true)} aria-label="Open navigation">☰</button></header>
      {drawerOpen && <div className={styles.drawerBack} onClick={closeDrawer}><aside onClick={event => event.stopPropagation()}><AuthenticatedSidebarContent active={title} onNavigate={closeDrawer} onClose={closeDrawer}/></aside></div>}
      <div className={styles.main}>{children}</div>
      <footer className={styles.footer}><div><b>Copyright © 2025 Peterdraw</b><span>Privacy Policy</span><span>Term and conditions</span><span>Contact</span></div><div className={styles.social}><span>ⓕ</span><span>𝕏</span><span>◎</span><span>▷</span><span>in</span></div></footer>
    </div>
  </div>;
}
