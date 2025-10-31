import { Github, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 mt-20">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-2xl">⚙️</span>
              <span className="text-lg font-bold">Bits, Boot & Beyond</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Exploring Linux Kernel, Embedded Systems, SoC Design, and FPGA development.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/?category=Linux" className="text-muted-foreground hover:text-foreground transition-colors">
                  Linux Kernel
                </Link>
              </li>
              <li>
                <Link to="/?category=Embedded" className="text-muted-foreground hover:text-foreground transition-colors">
                  Embedded Systems
                </Link>
              </li>
              <li>
                <Link to="/?category=SoC" className="text-muted-foreground hover:text-foreground transition-colors">
                  SoC Architecture
                </Link>
              </li>
              <li>
                <Link to="/?category=FPGA" className="text-muted-foreground hover:text-foreground transition-colors">
                  FPGA Design
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted-foreground/10 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted-foreground/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-muted hover:bg-muted-foreground/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Bits, Boot & Beyond. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
