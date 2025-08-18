import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowDown, Code, Cpu, Zap } from "lucide-react";
import heroImage from "@/assets/hero-circuit.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-hero flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/50 to-background/90" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-glow rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-terminal-green/10 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center slide-in">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style greeting */}
          <div className="font-mono text-terminal-green mb-6">
            <span className="text-muted-foreground">$</span> whoami
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-accent bg-clip-text text-transparent">
            🧠 Welcome to<br />
            Bits, Boot, and Beyond
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Hi, I'm <span className="text-terminal-green font-semibold">Abinash Singh</span> — 
            a curious explorer of the low-level world of computers. This blog is my personal lab notebook 
            where I document my hands-on journey through the depths of system programming.
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-mono">
              <Code className="w-4 h-4 mr-2" />
              Linux Kernel
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-mono">
              <Cpu className="w-4 h-4 mr-2" />
              RISC-V
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm font-mono">
              <Zap className="w-4 h-4 mr-2" />
              Embedded Systems
            </Badge>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-terminal-green text-primary-foreground hover:bg-terminal-green/90 shadow-terminal px-8 py-3 text-lg font-semibold"
            >
              Start Reading
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 px-8 py-3 text-lg"
            >
              View Projects
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="flex justify-center">
            <div className="animate-bounce">
              <ArrowDown className="h-6 w-6 text-terminal-green" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;