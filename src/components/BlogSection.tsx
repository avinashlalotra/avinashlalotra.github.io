import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, GitBranch } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const blogPosts = [
  {
    title: "Writing Your First Linux Kernel Module",
    excerpt: "A step-by-step guide to creating, compiling, and loading your first kernel module. Learn the basics of kernel programming and driver development.",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["Linux Kernel", "C Programming", "Tutorial"],
    category: "Kernel Hacking",
    featured: true
  },
  {
    title: "Hello World in C",
    excerpt: "Minimal hello world example in C and how to build/run it.",
    date: "2025-08-18",
    readTime: "2 min read",
    tags: ["C", "Tutorial"],
    category: "Tutorial",
    slug: "hello-world-c"
  },
  {
    title: "RISC-V Core Bring-up on FPGA",
    excerpt: "Building and booting a custom RISC-V processor on an FPGA. From RTL design to running your first assembly program.",
    date: "2024-01-08",
    readTime: "12 min read",
    tags: ["RISC-V", "FPGA", "Verilog"],
    category: "Hardware Design"
  },
  {
    title: "Debugging Device Drivers with QEMU",
    excerpt: "Advanced debugging techniques for kernel drivers using QEMU, GDB, and kernel debugging tools. Essential skills for kernel developers.",
    date: "2024-01-01",
    readTime: "10 min read",
    tags: ["Debugging", "QEMU", "Device Drivers"],
    category: "Kernel Hacking"
  },
  {
    title: "Custom SoC Design: From Concept to Silicon",
    excerpt: "Designing a custom system-on-chip using open-source tools. Learn the complete flow from RTL to GDSII.",
    date: "2023-12-20",
    readTime: "15 min read",
    tags: ["SoC Design", "RTL", "Open Source"],
    category: "Hardware Design"
  },
  {
    title: "Bare-metal Programming on STM32",
    excerpt: "Writing firmware without an operating system. Direct register manipulation and understanding hardware at the lowest level.",
    date: "2023-12-15",
    readTime: "9 min read",
    tags: ["Embedded", "STM32", "Bare-metal"],
    category: "Embedded Systems"
  },
  {
    title: "Contributing to the Linux Kernel",
    excerpt: "My journey contributing to the Linux kernel. From finding bugs to getting patches accepted upstream.",
    date: "2023-12-10",
    readTime: "7 min read",
    tags: ["Open Source", "Linux", "Community"],
    category: "Kernel Hacking"
  }
];

const BlogSection = () => {
  const navigate = useNavigate();
  return (
    <section id="posts" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-mono text-terminal-green">
            $ cat /var/log/learnings/*
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Raw, unfiltered documentation of my journey through low-level systems programming
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blogPosts.map((post, index) => (
            <Card 
              key={index} 
              className={`bg-gradient-card border-border hover:shadow-card transition-all duration-300 slide-in group ${
                post.featured ? 'ring-2 ring-terminal-green/30' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between mb-3">
                  <Badge 
                    variant="secondary" 
                    className="text-xs font-mono text-terminal-green bg-terminal-green/10"
                  >
                    <GitBranch className="w-3 h-3 mr-1" />
                    {post.category}
                  </Badge>
                  {post.featured && (
                    <Badge className="bg-warning-amber text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-xl font-semibold mb-3 group-hover:text-terminal-green transition-colors" onClick={() => navigate(`/posts/${post.slug ?? ''}`)}>
                  {post.title}
                </CardTitle>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, tagIndex) => (
                    <Badge 
                      key={tagIndex} 
                      variant="outline" 
                      className="text-xs font-mono border-terminal-green/30 text-terminal-green"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Button 
                  variant="ghost" 
                  className="p-0 h-auto text-terminal-green hover:text-terminal-green/80 font-mono"
                  onClick={() => navigate(`/posts/${post.slug ?? ''}`)}
                >
                  Read more 
                  <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg"
            variant="outline"
            className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 px-8"
          >
            View All Posts
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;