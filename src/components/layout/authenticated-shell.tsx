import { AuthenticatedSidebar } from "./authenticated-sidebar";

type AuthenticatedShellProps = {
  activeLabel: string;
  children: React.ReactNode;
  shellClassName?: string;
  contentClassName?: string;
  variant?: "standard"|"dashboard";
  sidebarOpen?: boolean;
  onNavigate?: () => void;
};

export function AuthenticatedShell({activeLabel,children,shellClassName="shipments-shell min-h-screen bg-[#f2f2f2] font-sans text-[#292929]",contentClassName="shipments-main min-h-screen",variant="standard",sidebarOpen=false,onNavigate}:AuthenticatedShellProps) {
  return <div className={shellClassName}><AuthenticatedSidebar activeLabel={activeLabel} variant={variant} open={sidebarOpen} onNavigate={onNavigate} onClose={onNavigate}/><div className={contentClassName}>{children}</div></div>;
}
