import Link from "next/link";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Icon } from "@/components/dashboard/dashboard-icons";
import { SidebarHeader } from "@/components/dashboard/sidebar-header";
import { SidebarPromoCard } from "@/components/dashboard/sidebar-promo-card";
import { AuthenticatedSidebarContent } from "@/components/dashboard/authenticated-sidebar-content";
import { primaryNavigation, secondaryNavigation } from "./navigation";
import dashboardStyles from "@/components/dashboard/dashboard.module.css";

type AuthenticatedSidebarProps = {
  activeLabel: string;
  variant?: "standard"|"dashboard"|"drawer";
  open?: boolean;
  onNavigate?: () => void;
  onClose?: () => void;
};

export function AuthenticatedSidebar({activeLabel,variant="standard",open=false,onNavigate,onClose}:AuthenticatedSidebarProps) {
  if(variant==="standard") return <Sidebar activeLabel={activeLabel}/>;
  if(variant==="drawer") return <AuthenticatedSidebarContent active={activeLabel} onNavigate={onNavigate} onClose={onClose!}/>;
  return <aside className={`shared-sidebar ${dashboardStyles.sidebar} ${open?dashboardStyles.sidebarOpen:""}`}>
    <div className={dashboardStyles.desktopSidebar}><SidebarHeader onClose={onClose}/><nav className="shared-sidebar-nav" aria-label="Primary navigation"><ul>{primaryNavigation.map(item=><li key={item.id}><Link href={item.href!} aria-current={item.label===activeLabel?"page":undefined} className={item.label===activeLabel?dashboardStyles.active:""} onClick={onNavigate}><Icon name={item.icon}/><span>{item.label}</span></Link></li>)}</ul><hr/><ul>{secondaryNavigation.map(item=><li key={item.id}><button type="button"><Icon name={item.icon}/><span>{item.label}</span>{item.badge&&<b>{item.badge}</b>}</button></li>)}</ul></nav><div className={`shared-sidebar-promo ${dashboardStyles.sidebarPromo}`}><SidebarPromoCard/></div></div>
    <div className={dashboardStyles.mobileSidebar}><AuthenticatedSidebarContent active={activeLabel} onNavigate={onNavigate} onClose={onClose!}/></div>
  </aside>;
}
