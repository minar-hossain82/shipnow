import { Sidebar } from "./sidebar";
import { Icon } from "./icons";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return <div className="dashboard-shell min-h-screen min-w-[1240px] bg-[#f2f2f2] font-sans text-[#262629]"><Sidebar/><div className="dashboard-main ml-[224px] min-h-screen"><header className="flex h-[94px] items-center justify-between px-[22px]"><div><p className="text-[15px] font-normal leading-5 text-[#737377]">Hello John!</p><h1 className="text-[25px] font-bold leading-[29px] tracking-[-0.02em]">Good Morning</h1></div><div className="flex items-center gap-3"><label className="flex h-[42px] w-[310px] items-center rounded-[11px] bg-white px-[15px] text-[#8a8a8e]"><Icon name="search" className="h-5 w-5"/><input aria-label="Search" placeholder="Search anything" className="ml-3 w-full bg-transparent text-[13px] outline-none placeholder:text-[#8a8a8e]"/></label><button type="button" className="flex h-[42px] items-center rounded-[9px] bg-[#292929] px-[18px] text-[13px] font-medium text-white"><Icon name="plus" className="mr-2 h-5 w-5"/>Add New Shipping</button></div></header>{children}</div></div>;
}
