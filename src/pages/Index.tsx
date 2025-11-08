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
    ? blogPosts.filter((post) => post.category === categoryFilter && post.hidden !==1)
    : blogPosts;

  const categories = ["All", "Linux", "Embedded", "SoC", "FPGA"];
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter || "All");

const displayedPosts = blogPosts.filter(
  (post) =>
    post.hidden !== 1 &&
    (selectedCategory === "All" || post.category === selectedCategory)
);

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

            {/* Areas of Interest moved from About page - keep on Home for visibility */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="h-5 w-5 text-primary"> </span>
                Areas of Interest
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted">
                  <div className="h-6 w-6 text-primary mb-2" />
                  <h4 className="font-semibold mb-1">Linux Kernel & User Space</h4>
                  <p className="text-sm text-muted-foreground">
                    Threading models, scheduling, memory management, LibC and driver development
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="h-6 w-6 text-secondary mb-2" />
                  <h4 className="font-semibold mb-1">Embedded Systems</h4>
                  <p className="text-sm text-muted-foreground">
                    Boot process, real-time Linux, Yocto, device drivers
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="h-6 w-6 text-accent mb-2" />
                  <h4 className="font-semibold mb-1">Computer Architecture</h4>
                  <p className="text-sm text-muted-foreground">
                    RISC-V, MatrixMul, interconnects
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-muted">
                  <div className="h-6 w-6 text-tech-cyan mb-2" />
                  <h4 className="font-semibold mb-1">FPGA Design</h4>
                  <p className="text-sm text-muted-foreground">
                    Verilog/VHDL, synthesis, timing analysis, hardware acceleration
                  </p>
                </div>
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
