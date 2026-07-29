import { AuthenticatedShell } from "@/components/layout/authenticated-shell";

export default function ShipmentsLayout({ children }: { children: React.ReactNode }) {
  return <AuthenticatedShell activeLabel="Shipments">{children}</AuthenticatedShell>;
}
