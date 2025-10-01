import { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminLayout from "@/components/admin/admin-layout";
import PortfolioEditor from "@/components/admin/portfolio/portfolio-editor";
import { prisma } from "@/lib/prisma";

interface PageProps {
  params: { id: string };
}

export const metadata: Metadata = {
  title: "Loyihani Tahrirlash - EvolvoAI Admin",
  description: "Edit portfolio project",
};

export default async function EditPortfolioPage({ params }: PageProps) {
  let project = null;

  try {
    project = await prisma.project.findUnique({
      where: { id: params.id },
    });
  } catch (error) {
    console.error("Error fetching project:", error);
  }

  if (!project) {
    notFound();
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-black text-white mb-2">
            Loyihani Tahrirlash
          </h1>
          <p className="text-gray-400">
            {project.title}
          </p>
        </div>

        <div className="rounded-2xl p-8" style={{ background: "rgba(26, 31, 58, 0.5)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
          <PortfolioEditor 
            projectId={project.id}
            initialData={{
              title: project.title,
              slug: project.slug,
              description: project.description,
              category: project.category,
              tags: project.tags,
              technologies: project.technologies,
              imageUrl: project.imageUrl,
              demoUrl: project.demoUrl,
              githubUrl: project.githubUrl,
              clientName: project.clientName,
              completedAt: project.completedAt?.toISOString().split('T')[0] || null,
              featured: project.featured,
              status: project.status,
            }}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
