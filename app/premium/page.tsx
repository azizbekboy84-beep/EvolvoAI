import NavbarPremium from "@/components/layout/navbar-premium";
import Footer from "@/components/layout/footer";
import HeroPremium from "@/components/sections/hero-premium";
import ServicesBento from "@/components/sections/services-bento";
import WorkflowSection from "@/components/sections/workflow";
import TechStackSection from "@/components/sections/tech-stack";
import Portfolio3D from "@/components/sections/portfolio-3d";
import PricingSection from "@/components/sections/pricing";
import BlogPreviewSection from "@/components/sections/blog-preview";
import TestimonialsSection from "@/components/sections/testimonials";
import FAQSection from "@/components/sections/faq";
import ContactSection from "@/components/sections/contact";
import BackToTop from "@/components/ui/back-to-top";
import FloatingContact from "@/components/ui/floating-contact";
import MobileNav from "@/components/ui/mobile-nav";

export default function PremiumPage() {
  return (
    <main className="min-h-screen" style={{ background: "#0A0E27" }}>
      <NavbarPremium />
      <HeroPremium />
      <ServicesBento />
      <WorkflowSection />
      <TechStackSection />
      <Portfolio3D />
      <PricingSection />
      <BlogPreviewSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <BackToTop />
      <FloatingContact />
      <MobileNav />
    </main>
  );
}
