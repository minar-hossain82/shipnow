import { Icon, type IconName } from "./icons";

export function Card({ title, action, children, className="" }: { title?: string; action?: React.ReactNode; children: React.ReactNode; className?: string }) { return <section className={`rounded-xl bg-white p-4 ${className}`}><div className="flex items-center justify-between">{title && <h2 className="text-[15px] font-semibold">{title}</h2>}{action}</div>{children}</section>; }

export function MoreButton() { return <button type="button" aria-label="More" className="grid h-8 w-8 place-items-center rounded-lg bg-[#f4f4f4] text-[#8a8a8e]"><Icon name="more" className="h-4 w-4"/></button>; }

export function KpiCard({ label, value, suffix, change, period, icon }: { label:string; value:string; suffix?:string; change:string; period:string; icon:IconName }) { return <Card className="h-[114px]"><p className="text-[12px] text-[#858589]">{label}</p><div className="mt-2 flex items-center"><p className="text-[27px] font-bold tracking-tight">{value} <span className="text-[11px] font-normal text-[#77777b]">{suffix}</span></p><span className="ml-auto grid h-10 w-10 place-items-center rounded-lg bg-[#8065f4] text-white"><Icon name={icon} className="h-5 w-5"/></span></div><p className="mt-2 text-[10px] text-[#8b8b8f]"><span className="mr-1 rounded-full bg-[#def8e9] px-1.5 py-1 font-semibold text-[#38ad70]">⌃ {change}</span>{period}</p></Card>; }

export function SelectButton({ children }: { children: React.ReactNode }) { return <button type="button" className="h-8 rounded-lg bg-[#f4f4f4] px-3 text-[11px] text-[#55555a]">{children}⌄</button>; }
