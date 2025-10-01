import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Kontakt Xabarlar - EvolvoAI Admin",
  description: "Contact form messages",
};

export default async function ContactMessagesPage() {
  const messages = await prisma.contact.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  const stats = await prisma.contact.groupBy({
    by: ["status"],
    _count: true,
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Kontakt Xabarlar
          </h1>
          <p className="text-gray-400">
            Saytdan kelgan xabarlar
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
            <CardTitle className="text-white">Barcha Xabarlar</CardTitle>
          </CardHeader>
          <CardContent>
            {messages.length === 0 ? (
              <p className="text-gray-400 text-center py-8">
                Hozircha xabar yo'q
              </p>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className="p-4 rounded-lg"
                    style={{ background: "rgba(255, 255, 255, 0.05)" }}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium text-white">{message.name}</p>
                        <p className="text-sm text-gray-400">{message.email}</p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                        {message.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{message.serviceType}</p>
                    <p className="text-gray-400 text-sm">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(message.createdAt).toLocaleString("uz-UZ")}
                    </p>
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
