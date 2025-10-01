import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Kanal Postlari - EvolvoAI Admin",
};

export const dynamic = 'force-dynamic';

export default async function TelegramPostsPage() {
  const posts = await prisma.telegramPost.findMany({
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Telegram Kanal Postlari
          </h1>
          <p className="text-gray-400">
            Rejalashtirilgan va chop etilgan postlar
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="rounded-2xl p-12 text-center" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <p className="text-gray-400 text-lg">
              Hozircha postlar yo'q
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-4 rounded-lg"
                style={{ background: "rgba(255, 255, 255, 0.05)" }}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                    {post.postType}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                    {post.status}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{post.content.substring(0, 150)}...</p>
                <p className="text-xs text-gray-500">
                  {new Date(post.scheduledAt).toLocaleString("uz-UZ")}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
