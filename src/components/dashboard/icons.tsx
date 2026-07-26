import type { SVGProps } from "react";

export type IconName = "grid" | "chart" | "calendar" | "truck" | "route" | "warehouse" | "fleet" | "driver" | "invoice" | "message" | "bell" | "settings" | "search" | "plus" | "money" | "box" | "more";

export function Icon({ name, className = "h-5 w-5", ...props }: SVGProps<SVGSVGElement> & { name: IconName }) {
  const paths: Record<IconName, React.ReactNode> = {
    grid: <><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></>,
    chart: <><path d="M4 19V9m5 10V5m5 14v-7m5 7V3"/><path d="M2 21h20"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></>,
    truck: <><path d="M3 6h11v11H3zM14 10h3l4 4v3h-7z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,
    route: <><circle cx="5" cy="19" r="2"/><circle cx="19" cy="5" r="2"/><path d="M7 18c5-1 3-7 8-8M9 5h3v3M4 9h3v3"/></>,
    warehouse: <><path d="m3 10 9-6 9 6v11H3zM7 21v-7h10v7M6 10h12"/></>,
    fleet: <><rect x="4" y="7" width="16" height="11" rx="2"/><path d="M7 7V4h10v3M8 11h8M8 15h.01M16 15h.01"/><circle cx="7" cy="19" r="1"/><circle cx="17" cy="19" r="1"/></>,
    driver: <><rect x="5" y="3" width="14" height="18" rx="1"/><circle cx="12" cy="10" r="3"/><path d="M8 18c.8-2 2.1-3 4-3s3.2 1 4 3"/></>,
    invoice: <><path d="M5 3h14v18l-3-2-4 2-4-2-3 2z"/><path d="M8 8h8M8 12h8"/></>,
    message: <path d="M3 4h18v14H8l-5 3zM8 9h.01M12 9h.01M16 9h.01"/>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9M10 21h4"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1.2l2-1.6-2-3.4-2.5 1a7 7 0 0 0-2-1.2L14 3h-4l-.4 2.6a7 7 0 0 0-2 1.2l-2.5-1-2 3.4 2 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2 1.6 2 3.4 2.5-1a7 7 0 0 0 2 1.2L10 21h4l.4-2.6a7 7 0 0 0 2-1.2l2.5 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.2Z"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></>,
    plus: <path d="M12 5v14M5 12h14"/>,
    money: <><circle cx="12" cy="12" r="9"/><path d="M15 8.5c-.7-.6-1.6-1-3-1-1.7 0-3 .9-3 2.2 0 3.4 6 1.6 6 4.7 0 1.3-1.2 2.3-3.2 2.3-1.3 0-2.4-.4-3.2-1.1M12 5.5v13"/></>,
    box: <><path d="m3 7.5 9-4.5 9 4.5v9L12 21l-9-4.5zM3 7.5l9 4.5 9-4.5M12 21v-9"/></>,
    more: <><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{paths[name]}</svg>;
}
