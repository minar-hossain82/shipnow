import Link from "next/link";
import { Icon, type DashboardIcon } from "./dashboard-icons";
import { SidebarPromoCard } from "./sidebar-promo-card";
import { SidebarHeader } from "./sidebar-header";
import styles from "./authenticated-sidebar-content.module.css";

const primary: Array<[string,DashboardIcon,string]> = [["Dashboard","grid","/dashboard"],["Analytics","chart","/analytics"],["Calendar","calendar","/calendar"],["Shipments","truck","/shipments"],["Tracking","route","/tracking"],["Warehouse","warehouse","/warehouse"],["Fleets","fleet","/fleets"],["Drivers","driver","/drivers"],["Invoices & Billing","invoice","/invoices"]];
const secondary: Array<[string,DashboardIcon,string]> = [["Message","message","19"],["Notification","bell","5"],["Settings","settings",""]];

export function AuthenticatedSidebarContent({active,onNavigate,onClose}:{active:string;onNavigate?:()=>void;onClose:()=>void}) {
  return <div className={styles.content}><SidebarHeader onClose={onClose}/><nav><ul>{primary.map(([label,icon,href])=><li key={label}><Link href={href} className={label===active?styles.active:""} onClick={onNavigate} onKeyDown={event=>{if(event.key===" "){event.preventDefault();event.currentTarget.click()}}}><Icon name={icon}/><span>{label}</span></Link></li>)}</ul><hr/><ul>{secondary.map(([label,icon,badge])=><li key={label}><button type="button"><Icon name={icon}/><span>{label}</span>{badge&&<b>{badge}</b>}</button></li>)}</ul></nav><div className={styles.promo}><SidebarPromoCard/></div></div>;
}
