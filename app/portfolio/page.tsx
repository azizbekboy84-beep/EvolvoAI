import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Github, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "Portfolio - EvolvoAI",
  description: "Bizning bajarilgan loyihalar portfoliosi",
};

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: {
      status: "COMPLETED",
    },
    orderBy: [
      { featured: "desc" },
      { createdAt: "desc" },
    ],
  });

  const categories = Array.from(new Set(projects.map(p => p.category)));

  return (
    <main className="min-h-screen" style={{ background: "#0A0E27" }}>
      <Navbar />
      
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Bizning bajarilgan loyihalar va mijozlar uchun yaratgan echimlarimiz
            </p>
          </div>

          {/* Projects Grid */}
          {projects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-xl">
                Hozircha loyihalar yo'q
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/portfolio/${project.slug}`}
                  className="group"
                >
                  <div className="rounded-2xl overflow-hidden transition-all hover:scale-105"
                    style={{ 
                      background: "rgba(26, 31, 58, 0.5)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}>
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={project.imageUrl}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      {project.featured && (
                        <div className="absolute top-4 right-4 bg-yellow-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                          ⭐ Featured
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold"
                          style={{ background: "rgba(255, 0, 128, 0.1)", color: "#FF0080" }}>
                          {project.category}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-[#FF0080] transition-colors">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-xs"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 3 && (
                          <span className="px-2 py-1 rounded-lg bg-gray-500/20 text-gray-400 text-xs">
                            +{project.technologies.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{project.views}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {project.demoUrl && (
                            <ExternalLink className="w-4 h-4 text-[#FF0080]" />
                          )}
                          {project.githubUrl && (
                            <Github className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}
