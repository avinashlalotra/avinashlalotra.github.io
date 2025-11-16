import { Button } from "@/components/ui/button";
import { Terminal, Cpu, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
  <section className="relative py-12 md:py-20 overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5" />
      
      <div className="container relative">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-left">
              <div className="flex space-x-4 mb-6">
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
                Exploring the <span className="bg-gradient-hero bg-clip-text text-transparent"> computing stack </span>  end-to-end
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mt-4">
                Deep insights into userspace systems programming, Linux kernel internals, embedded platforms, SoC architecture, and FPGA-based hardware design.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-start items-center pt-6">
                <Button
                  size="lg"
                  className="text-lg px-8"
                  onClick={() => {
                    const section = document.getElementById("posts");
                    if (section) section.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  Explore Articles
                </Button>

                <Button asChild variant="outline" size="lg" className="text-lg px-8">
                  <Link to="/about">About Me</Link>
                </Button>
              </div>

              <div className="pt-8 flex flex-wrap gap-6 text-sm text-muted-foreground">
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

            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-md">
                <img src="/moto.png" alt="moto" className="w-full object-contain rounded-xl shadow-lg relative z-10" />
                {/* dark-only left fade */}
                <div className="absolute inset-y-0 left-0 w-20 pointer-events-none rounded-l-xl z-20 dark:bg-gradient-to-r dark:from-black/90 dark:to-transparent" />
                {/* dark-only right fade */}
                <div className="absolute inset-y-0 right-0 w-8 pointer-events-none rounded-r-xl z-20 dark:bg-gradient-to-l dark:from-black/30 dark:to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
