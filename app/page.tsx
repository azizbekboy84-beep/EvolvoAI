import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/sections/hero";
import ServicesSection from "@/components/sections/services";
import WorkflowSection from "@/components/sections/workflow";
import TechStackSection from "@/components/sections/tech-stack";
import PortfolioSection from "@/components/sections/portfolio-section";
import PricingSection from "@/components/sections/pricing";
import BlogPreviewSection from "@/components/sections/blog-preview";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  // Fetch featured projects for homepage
  const projects = await prisma.project.findMany({
    where: {
      status: "COMPLETED",
      featured: true,
    },
    orderBy: { createdAt: "desc" },
    take: 4,
  });

  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WorkflowSection />
      <TechStackSection />
      <PortfolioSection projects={projects} />
      <PricingSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <FloatingContact />
    </main>
  );
}
