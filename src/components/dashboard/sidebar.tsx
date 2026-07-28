import Link from "next/link";
import { Icon, type IconName } from "./icons";
import { SidebarHeader } from "./sidebar-header";

const primary: Array<[string, IconName, string]> = [["Dashboard","grid","/dashboard"],["Analytics","chart","#"],["Calendar","calendar","#"],["Shipments","truck","/shipments"],["Tracking","route","#"],["Warehouse","warehouse","/warehouse"],["Fleets","fleet","#"],["Drivers","driver","#"],["Invoices & Billing","invoice","/invoices"]];
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
    <div className="shared-sidebar-promo px-4 pb-5"><div className="relative h-[252px] overflow-hidden rounded-xl bg-[#282828] p-[18px] text-white"><span className="absolute -right-1 -top-3 text-7xl font-black italic text-[#6854d6]">{"//"}</span><p className="relative mt-1 text-[24px] font-semibold leading-[1.05]">Loving<br/>ShipNow<br/>Free?</p><p className="relative mt-5 text-[11px] leading-4 text-[#d4d4d4]">Go Pro to access priority support, real-time tracking, and full analytics.</p><button type="button" className="relative mt-5 h-11 w-full rounded-lg bg-white text-[14px] font-medium text-[#292929]">Go Pro Today</button></div></div>
  </aside>;
}
