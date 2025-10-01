"use client";

import { ReactNode } from "react";
import AdminSidebar from "./admin-sidebar";
import AdminTopbar from "./admin-topbar";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen" style={{ background: "#0A0E27" }}>
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div style={{ marginLeft: "280px" }}>
        {/* Topbar */}
        <AdminTopbar />

        {/* Page Content */}
        <main className="pt-20 p-8">
          <div className="max-w-[1600px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
