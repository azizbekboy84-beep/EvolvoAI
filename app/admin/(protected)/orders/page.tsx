import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Buyurtmalar - EvolvoAI Admin",
  description: "Manage orders",
};

export const dynamic = 'force-dynamic';

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const whereClause = searchParams.status
    ? { status: searchParams.status.toUpperCase().replace("-", "_") as any }
    : {};

  const orders = await prisma.order.findMany({
    where: whereClause,
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      orderNumber: true,
      clientName: true,
      serviceType: true,
      status: true,
      priority: true,
      createdAt: true,
    },
  });

  const stats = await prisma.order.groupBy({
    by: ["status"],
    _count: true,
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Buyurtmalar
          </h1>
          <p className="text-gray-400">
            Mijozlarning buyurtmalarini boshqaring
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.status}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.status}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">{stat._count}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">So'nggi Buyurtmalar</CardTitle>
          </CardHeader>
          <CardContent>
            {orders.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Hozircha buyurtma yo'q
              </p>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div>
                      <p className="font-medium text-white">{order.orderNumber}</p>
                      <p className="text-sm text-gray-400">
                        {order.clientName} • {order.serviceType}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                        {order.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.priority} priority
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
