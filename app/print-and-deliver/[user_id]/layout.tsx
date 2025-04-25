import React, { ReactNode } from "react";
import { OrderProvider } from "@/context/orderContext";

export default function PrintAndDeliverLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <section>
      <OrderProvider>{children}</OrderProvider>
    </section>
  );
}
