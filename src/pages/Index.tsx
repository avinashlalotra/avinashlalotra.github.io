import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BlogCard from "@/components/BlogCard";
import Footer from "@/components/Footer";
import { blogPosts } from "@/data/posts";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const Index = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  
  const filteredPosts = categoryFilter
    ? blogPosts.filter((post) => post.category === categoryFilter)
    : blogPosts;

  const categories = ["All", "Linux", "Embedded", "SoC", "FPGA"];
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "All");

  const displayedPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Bits, Boot & Beyond | Systems Programming Blog</title>
        <meta name="description" content="Deep technical insights into Linux Kernel internals, Embedded Systems, SoC architecture, and FPGA development by Avinash Lalotra." />
        <meta name="keywords" content="Linux kernel, embedded systems, FPGA, SoC, systems programming, device drivers, real-time Linux" />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Hero />

          <section id="posts" className="container py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <h2 className="text-3xl font-bold mb-4 md:mb-0">Latest Articles</h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>

            {displayedPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No articles found in this category.
                </p>
              </div>
            )}
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
