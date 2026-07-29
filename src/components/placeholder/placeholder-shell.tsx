"use client";

import { usePathname } from "next/navigation";
import { AppFooter } from "@/components/layout/app-footer";
import { AuthenticatedShell } from "@/components/layout/authenticated-shell";
import { MobileNavigation } from "@/components/layout/mobile-navigation";
import styles from "./placeholder-shell.module.css";

const titles: Record<string, string> = { analytics: "Analytics", calendar: "Calendar", tracking: "Tracking", fleets: "Fleets", drivers: "Drivers" };

export function PlaceholderShell({ children }: { children: React.ReactNode }) {
  const segment = usePathname().split("/")[1];
  const title = titles[segment] ?? "Dashboard";

  return <AuthenticatedShell activeLabel={title} shellClassName={styles.shell} contentClassName={styles.content}>
      <MobileNavigation activeLabel={title} barClassName={styles.mobileBar} backdropClassName={styles.drawerBack} leading={<i aria-hidden="true"/>} title={<strong>{title}</strong>} menu="☰"/>
      <div className={styles.main}>{children}</div>
      <AppFooter className={styles.footer} socialClassName={styles.social}/>
  </AuthenticatedShell>;
}
