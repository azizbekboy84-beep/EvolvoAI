import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Foydalanuvchilar - EvolvoAI Admin",
};

export const dynamic = 'force-dynamic';

export default async function UsersSettingsPage() {
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Foydalanuvchilar
          </h1>
          <p className="text-gray-400">
            Admin foydalanuvchilarni boshqaring
          </p>
        </div>

        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user.id}
              className="p-4 rounded-lg flex items-center justify-between"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <div>
                <p className="font-medium text-white">{user.name || "No name"}</p>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-400">
                {user.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
