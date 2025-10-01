import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Mijozlar - EvolvoAI Admin",
  description: "Manage customers",
};

export const dynamic = 'force-dynamic';

export default async function CustomersPage() {
  let customers: any[] = [];
  let totalCustomers = 0;

  try {
    customers = await prisma.customer.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
    totalCustomers = await prisma.customer.count();
  } catch (error) {
    console.error("Error fetching customers:", error);
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Mijozlar
          </h1>
          <p className="text-gray-400">
            Jami {totalCustomers} ta mijoz
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-white">Barcha Mijozlar</CardTitle>
          </CardHeader>
          <CardContent>
            {customers.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Hozircha mijoz yo'q
              </p>
            ) : (
              <div className="space-y-4">
                {customers.map((customer) => (
                  <div
                    key={customer.id}
                    className="flex items-center justify-between p-4 rounded-lg"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-white">{customer.name}</p>
                      <p className="text-sm text-gray-400">{customer.email}</p>
                    </div>
                    <div className="text-right">
                      {customer.company && (
                        <p className="text-sm text-gray-300">{customer.company}</p>
                      )}
                      <p className="text-xs text-gray-500">
                        {new Date(customer.createdAt).toLocaleDateString("uz-UZ")}
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
