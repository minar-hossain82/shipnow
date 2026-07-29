import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { SidebarHeader } from "./sidebar-header";
import { SidebarPromoCard } from "./sidebar-promo-card";
import { primaryNavigation, secondaryNavigation, type NavigationItem } from "@/components/layout/navigation";

function NavItem({ item, active=false }: { item: NavigationItem; active?: boolean }) {
  const content=<><Icon name={item.icon as IconName} className="nav-icon mr-[15px] h-[19px] w-[19px] shrink-0"/><span className="nav-label">{item.label}</span>{item.badge && <span className="nav-badge ml-auto rounded-md bg-[#8065f4] px-2 py-1 text-[11px] font-semibold text-white">{item.badge}</span>}</>;
  const classes=`flex h-[38px] w-full items-center rounded-md px-4 text-left text-[14px] ${active ? "bg-[#ddd6fe] font-semibold text-[#5033b6]" : "text-[#6f6f73]"}`;
  return <li>{item.href?<Link href={item.href} className={classes} aria-current={active?"page":undefined}>{content}</Link>:<button type="button" className={classes}>{content}</button>}</li>;
}

export function Sidebar({ activeLabel="Dashboard" }: { activeLabel?: string }) {
  return <aside className="dashboard-sidebar shared-sidebar fixed inset-y-0 left-0 z-20 flex w-[224px] flex-col border-r border-[#eeeeef] bg-white">
    <SidebarHeader />
    <nav className="shared-sidebar-nav mt-[21px] px-4" aria-label="Primary navigation"><ul className="flex flex-col gap-2">{primaryNavigation.map(item=><NavItem key={item.id} item={item} active={item.label===activeLabel}/>)}</ul><div className="my-4 border-t border-[#eeeeef]"/><ul className="flex flex-col gap-2">{secondaryNavigation.map(item=><NavItem key={item.id} item={item}/>)}</ul></nav>
    <div className="shared-sidebar-promo"><SidebarPromoCard/></div>
  </aside>;
}
