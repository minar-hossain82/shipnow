import { Suspense } from "react";
import { ShipmentsPage } from "@/components/shipments/shipments-page";

export default function Page() {
  return <Suspense><ShipmentsPage/></Suspense>;
}
