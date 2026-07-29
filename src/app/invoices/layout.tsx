import { AuthenticatedShell } from "@/components/layout/authenticated-shell";

export default function Layout({children}:{children:React.ReactNode}) {
  return <AuthenticatedShell activeLabel="Invoices & Billing">{children}</AuthenticatedShell>;
}
