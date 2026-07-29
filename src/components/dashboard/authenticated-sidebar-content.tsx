import Link from "next/link";
import { Icon } from "./dashboard-icons";
import { SidebarPromoCard } from "./sidebar-promo-card";
import { SidebarHeader } from "./sidebar-header";
import styles from "./authenticated-sidebar-content.module.css";
import { primaryNavigation, secondaryNavigation } from "@/components/layout/navigation";

export function AuthenticatedSidebarContent({active,onNavigate,onClose}:{active:string;onNavigate?:()=>void;onClose:()=>void}) {
  return <div className={styles.content}><SidebarHeader onClose={onClose}/><nav aria-label="Primary navigation"><ul>{primaryNavigation.map(item=><li key={item.id}><Link href={item.href!} aria-current={item.label===active?"page":undefined} className={item.label===active?styles.active:""} onClick={onNavigate} onKeyDown={event=>{if(event.key===" "){event.preventDefault();event.currentTarget.click()}}}><Icon name={item.icon}/><span>{item.label}</span></Link></li>)}</ul><hr/><ul>{secondaryNavigation.map(item=><li key={item.id}><button type="button"><Icon name={item.icon}/><span>{item.label}</span>{item.badge&&<b>{item.badge}</b>}</button></li>)}</ul></nav><div className={styles.promo}><SidebarPromoCard/></div></div>;
}
