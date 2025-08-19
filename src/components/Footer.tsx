import { Github, Mail, Twitter, Linkedin, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-card rounded-lg shadow-glow-sm">
                <Terminal className="h-6 w-6 text-terminal-green" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-mono text-terminal-green">
                  Bits, Boot, and Beyond
                </h3>
                <p className="text-sm text-muted-foreground">Abinash Singh</p>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Exploring the depths of systems programming, hardware design, and open-source development. 
              One kernel patch at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <nav className="space-y-2">
              <a 
                href="#about" 
                className="block text-muted-foreground hover:text-terminal-green transition-colors text-sm"
              >
                About
              </a>
              <a 
                href="#posts" 
                className="block text-muted-foreground hover:text-terminal-green transition-colors text-sm"
              >
                Blog Posts
              </a>
              <a 
                href="#topics" 
                className="block text-muted-foreground hover:text-terminal-green transition-colors text-sm"
              >
                Topics
              </a>
              <a 
                href="#contact" 
                className="block text-muted-foreground hover:text-terminal-green transition-colors text-sm"
              >
                Contact
              </a>
            </nav>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Connect</h4>
            <div className="flex space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-terminal-green/10 hover:text-terminal-green"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-terminal-green/10 hover:text-terminal-green"
              >
                <Mail className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-terminal-green/10 hover:text-terminal-green"
              >
                <Twitter className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:bg-terminal-green/10 hover:text-terminal-green"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground font-mono">
                $ echo "Let's connect and build amazing things together"
              </p>
              <p className="text-xs text-muted-foreground">
                Open for collaboration on low-level projects
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground font-mono">
              © 2024 Abinash Singh. Licensed under MIT.
            </p>
            <p className="text-xs text-muted-foreground">
              Built with ❤️ for the low-level community
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;