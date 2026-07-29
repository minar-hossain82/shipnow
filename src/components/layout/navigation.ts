import type { DashboardIcon } from "@/components/dashboard/dashboard-icons";

export type NavigationItem = {
  id: string;
  label: string;
  icon: DashboardIcon;
  href?: string;
  badge?: string;
};

export const primaryNavigation: readonly NavigationItem[] = [
  { id: "dashboard", label: "Dashboard", icon: "grid", href: "/dashboard" },
  { id: "analytics", label: "Analytics", icon: "chart", href: "/analytics" },
  { id: "calendar", label: "Calendar", icon: "calendar", href: "/calendar" },
  { id: "shipments", label: "Shipments", icon: "truck", href: "/shipments" },
  { id: "tracking", label: "Tracking", icon: "route", href: "/tracking" },
  { id: "warehouse", label: "Warehouse", icon: "warehouse", href: "/warehouse" },
  { id: "fleets", label: "Fleets", icon: "fleet", href: "/fleets" },
  { id: "drivers", label: "Drivers", icon: "driver", href: "/drivers" },
  { id: "invoices", label: "Invoices & Billing", icon: "invoice", href: "/invoices" },
];

export const secondaryNavigation: readonly NavigationItem[] = [
  { id: "message", label: "Message", icon: "message", badge: "19" },
  { id: "notification", label: "Notification", icon: "bell", badge: "5" },
  { id: "settings", label: "Settings", icon: "settings" },
];
