import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container relative">
        <div className="mx-auto max-w-4xl text-center space-y-8">
          <div className="flex justify-center space-x-4 mb-6">
            <div className="p-3 rounded-lg bg-primary/10 text-primary">
              <Terminal className="h-6 w-6" />
            </div>
            <div className="p-3 rounded-lg bg-secondary/10 text-secondary">
              <Cpu className="h-6 w-6" />
            </div>
            <div className="p-3 rounded-lg bg-accent/10 text-accent">
              <Zap className="h-6 w-6" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            Exploring the depths of{" "}
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              systems programming
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Deep technical insights into Linux Kernel internals, Embedded Systems, 
            SoC architecture, and FPGA development.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button asChild size="lg" className="text-lg px-8">
              <Link to="/#posts">Explore Articles</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link to="/about">About Me</Link>
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>Linux Kernel</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span>Embedded Systems</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent" />
              <span>SoC Design</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-tech-cyan" />
              <span>FPGA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
