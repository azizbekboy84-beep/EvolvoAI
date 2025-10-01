import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ExternalLink, Github, Calendar, Tag } from "lucide-react";
import Image from "next/image";

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    return {
      title: "Portfolio Not Found",
    };
  }

  return {
    title: `${project.title} - EvolvoAI Portfolio`,
    description: project.description,
  };
}

export default async function PortfolioDetailPage({ params }: PageProps) {
  const project = await prisma.project.findUnique({
    where: { slug: params.slug },
  });

  if (!project) {
    notFound();
  }

  // Increment views
  await prisma.project.update({
    where: { slug: params.slug },
    data: { views: { increment: 1 } },
  });

  return (
    <main className="min-h-screen" style={{ background: "#0A0E27" }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{ background: "rgba(255, 0, 128, 0.1)", color: "#FF0080" }}>
                {project.category}
              </span>
              {project.featured && (
                <span className="text-2xl">⭐</span>
              )}
            </div>
            
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6">
              {project.title}
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              {project.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400">
              {project.clientName && (
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Mijoz:</span>
                  <span>{project.clientName}</span>
                </div>
              )}
              {project.completedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(project.completedAt).toLocaleDateString('uz-UZ')}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span>{project.views} ko'rish</span>
              </div>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-4 mt-6">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 flex items-center gap-2"
                  style={{ background: "linear-gradient(135deg, #FF0080, #7928CA)" }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl font-bold text-white bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <Github className="w-5 h-5" />
                  GitHub
                </a>
              )}
            </div>
          </div>

          {/* Project Image */}
          <div className="rounded-2xl overflow-hidden mb-12">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto"
            />
          </div>

          {/* Technologies */}
          {project.technologies.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Texnologiyalar
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 rounded-xl bg-blue-500/20 text-blue-400 font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {project.tags.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <Tag className="w-6 h-6" />
                Teglar
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-xl bg-[#FF0080]/20 text-[#FF0080] font-semibold"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div className="text-center pt-12 border-t border-white/10">
            <span className={`px-6 py-3 rounded-full text-lg font-bold ${
              project.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
              project.status === 'IN_PROGRESS' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-gray-500/20 text-gray-400'
            }`}>
              {project.status === 'COMPLETED' ? '✅ Tugallangan' :
               project.status === 'IN_PROGRESS' ? '🚧 Jarayonda' :
               '📋 Rejalashtirilgan'}
            </span>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
