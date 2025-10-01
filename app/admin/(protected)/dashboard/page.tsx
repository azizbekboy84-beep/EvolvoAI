import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import DashboardStats from "@/components/admin/dashboard/stats";
import RecentActivity from "@/components/admin/dashboard/recent-activity";
import QuickActions from "@/components/admin/dashboard/quick-actions";
import Analytics from "@/components/admin/dashboard/analytics";

export const metadata: Metadata = {
  title: "Dashboard - EvolvoAI Admin",
  description: "Admin dashboard overview",
};

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">
            Saytingiz statistikasi va tezkor harakatlar
          </p>
        </div>

        {/* Stats Cards */}
        <DashboardStats />

        {/* Quick Actions */}
        <QuickActions />

        {/* Analytics and Activity */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Analytics />
          <RecentActivity />
        </div>
      </div>
    </AdminLayout>
  );
}
