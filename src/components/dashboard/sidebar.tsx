import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { SidebarHeader } from "./sidebar-header";
import { SidebarPromoCard } from "./sidebar-promo-card";

const primary: Array<[string, IconName, string]> = [["Dashboard","grid","/dashboard"],["Analytics","chart","/analytics"],["Calendar","calendar","/calendar"],["Shipments","truck","/shipments"],["Tracking","route","/tracking"],["Warehouse","warehouse","/warehouse"],["Fleets","fleet","/fleets"],["Drivers","driver","/drivers"],["Invoices & Billing","invoice","/invoices"]];
const secondary: Array<[string, IconName, string?]> = [["Message","message","19"],["Notification","bell","5"],["Settings","settings"]];

function NavItem({ item, active=false }: { item: [string, IconName, string?]; active?: boolean }) {
  const content=<><Icon name={item[1]} className="nav-icon mr-[15px] h-[19px] w-[19px] shrink-0"/><span className="nav-label">{item[0]}</span>{item[2] && !item[2].startsWith("/") && item[2]!=="#" && <span className="nav-badge ml-auto rounded-md bg-[#8065f4] px-2 py-1 text-[11px] font-semibold text-white">{item[2]}</span>}</>;
  const classes=`flex h-[38px] w-full items-center rounded-md px-4 text-left text-[14px] ${active ? "bg-[#ddd6fe] font-semibold text-[#5033b6]" : "text-[#6f6f73]"}`;
  return <li>{item[2]?.startsWith("/")?<Link href={item[2]} className={classes}>{content}</Link>:<button type="button" className={classes}>{content}</button>}</li>;
}

export function Sidebar({ activeLabel="Dashboard" }: { activeLabel?: string }) {
  return <aside className="dashboard-sidebar shared-sidebar fixed inset-y-0 left-0 z-20 flex w-[224px] flex-col border-r border-[#eeeeef] bg-white">
    <SidebarHeader />
    <nav className="shared-sidebar-nav mt-[21px] px-4"><ul className="flex flex-col gap-2">{primary.map(item=><NavItem key={item[0]} item={item} active={item[0]===activeLabel}/>)}</ul><div className="my-4 border-t border-[#eeeeef]"/><ul className="flex flex-col gap-2">{secondary.map(item=><NavItem key={item[0]} item={item}/>)}</ul></nav>
    <div className="shared-sidebar-promo"><SidebarPromoCard/></div>
  </aside>;
}
