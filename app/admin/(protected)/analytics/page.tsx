import { Metadata } from "next";
import AdminLayout from "@/components/admin/admin-layout";
import Analytics from "@/components/admin/dashboard/analytics";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Eye, FileText, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics - EvolvoAI Admin",
  description: "Website analytics",
};

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
  // Get analytics data
  const totalViews = await prisma.blogPost.aggregate({
    _sum: { views: true }
  }).then(res => res._sum.views || 0);
  
  const totalPosts = await prisma.blogPost.count();
  const totalContacts = await prisma.contact.count().catch(() => 0);
  
  const topPosts = await prisma.blogPost.findMany({
    orderBy: { views: "desc" },
    take: 5,
    select: {
      title: true,
      views: true,
      slug: true,
    },
  });

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-400">
            Sayt statistikasi va tahlil
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl p-6" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <Eye className="w-8 h-8 text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white mb-1">{totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-400">Jami Ko'rishlar</div>
          </div>
          
          <div className="rounded-2xl p-6" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-8 h-8 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white mb-1">{totalPosts}</div>
            <div className="text-sm text-gray-400">Blog Postlar</div>
          </div>
          
          <div className="rounded-2xl p-6" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
            <div className="flex items-center justify-between mb-4">
              <MessageSquare className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-black text-white mb-1">{totalContacts}</div>
            <div className="text-sm text-gray-400">Murojaatlar</div>
          </div>
        </div>

        {/* Top Posts */}
        <div className="rounded-2xl p-6" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <h2 className="text-2xl font-bold text-white mb-6">
            <TrendingUp className="inline w-6 h-6 mr-2" />
            Eng Ko'p Ko'rilgan Postlar
          </h2>
          <div className="space-y-4">
            {topPosts.map((post, index) => (
              <div key={post.slug} className="flex items-center justify-between p-4 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}>
                    {index + 1}
                  </div>
                  <div className="text-white font-medium">{post.title}</div>
                </div>
                <div className="text-gray-400 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  {post.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart */}
        <Analytics />
      </div>
    </AdminLayout>
  );
}
