import { Sidebar } from "@/components/dashboard/sidebar";

export default function ShipmentsLayout({ children }: { children: React.ReactNode }) {
  return <div className="shipments-shell min-h-screen bg-[#f2f2f2] font-sans text-[#292929]"><Sidebar activeLabel="Shipments"/><div className="shipments-main min-h-screen">{children}</div></div>;
}
