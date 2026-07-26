import { ChartsRow, Kpis, ProductCategories, ShipmentAlerts, ShipmentType, TrackingMap } from "@/components/dashboard/widgets";
import { Footer, RecentActivity, RecentShipments } from "@/components/dashboard/bottom";

export default function DashboardPage(){return <main className="dashboard-page px-[22px]"><div className="grid grid-cols-[minmax(0,1fr)_318px] gap-[21px]"><div className="space-y-[21px]"><Kpis/><ChartsRow/><div className="grid grid-cols-[392px_minmax(0,1fr)] gap-[21px]"><ProductCategories/><TrackingMap/></div></div><div className="space-y-[21px]"><ShipmentType/><ShipmentAlerts/></div></div><div className="mt-[21px] grid grid-cols-[minmax(0,1fr)_318px] gap-[21px]"><RecentShipments/><RecentActivity/></div><Footer/></main>}
