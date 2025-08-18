import { Github, Mail, Terminal, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-card rounded-lg shadow-glow-sm">
              <Terminal className="h-6 w-6 text-terminal-green" />
            </div>
            <div>
              <h1 className="text-xl font-bold font-mono text-terminal-green">
                Low-Level Quest
              </h1>
              <p className="text-sm text-muted-foreground">Abinash Singh</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a 
              href="#about" 
              className="text-foreground hover:text-terminal-green transition-colors"
            >
              About
            </a>
            <a 
              href="#posts" 
              className="text-foreground hover:text-terminal-green transition-colors"
            >
              Posts
            </a>
            <a 
              href="#topics" 
              className="text-foreground hover:text-terminal-green transition-colors"
            >
              Topics
            </a>
            <a 
              href="#contact" 
              className="text-foreground hover:text-terminal-green transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:bg-secondary">
              <Mail className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;