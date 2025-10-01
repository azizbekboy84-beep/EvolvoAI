import { ReactNode } from "react";

export default function AdminProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  // Layout faqat wrapper, auth AdminLayout komponentida
  return <>{children}</>;
}
