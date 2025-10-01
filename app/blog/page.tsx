import { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import BlogList from "@/components/blog/blog-list";

export const metadata: Metadata = {
  title: "Blog - EvolvoAI",
  description: "AI va texnologiya bo'yicha so'nggi yangiliklar, maslahatlar va professional maqolalar",
};

export default function BlogPage() {
  return (
    <main className="min-h-screen">
      <Navbar forceWhite />
      <div className="pt-20">
        <BlogList />
      </div>
      <Footer />
    </main>
  );
}
