import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code, Cpu, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Bits, Boot & Beyond</title>
        <meta name="description" content="Learn about Avinash Lalotra and his journey in systems programming, Linux kernel development, embedded systems, and FPGA design." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="container py-16 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <p className="text-xl text-muted-foreground">
                Systems programmer, kernel enthusiast, and hardware hacker
              </p>
            </div>

            <div className="grid gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center text-white text-3xl font-bold">
                      AL
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Avinash Lalotra</h2>
                      <p className="text-muted-foreground">Systems Engineer</p>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                      Welcome to <strong>Bits, Boot & Beyond</strong> – my corner of the internet where I explore the fascinating world of low-level systems programming, kernel development, and hardware design.
                    </p>
                    <p>
                      With years of experience in embedded Linux, kernel internals, SoC architecture, and FPGA development, I've developed a deep appreciation for the beautiful complexity that lies beneath our modern computing systems.
                    </p>
                    <p>
                      This blog serves as both a learning journal and a resource for others interested in understanding how computers really work – from the moment you press the power button to the kernel scheduler making split-second decisions about which thread to run next.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Areas of Expertise
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-muted">
                      <Terminal className="h-6 w-6 text-primary mb-2" />
                      <h4 className="font-semibold mb-1">Linux Kernel</h4>
                      <p className="text-sm text-muted-foreground">
                        Threading models, scheduling, memory management, and driver development
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <Cpu className="h-6 w-6 text-secondary mb-2" />
                      <h4 className="font-semibold mb-1">Embedded Systems</h4>
                      <p className="text-sm text-muted-foreground">
                        Boot process, real-time Linux, Yocto, device drivers
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <Code className="h-6 w-6 text-accent mb-2" />
                      <h4 className="font-semibold mb-1">SoC Architecture</h4>
                      <p className="text-sm text-muted-foreground">
                        ARM Cortex-A, cache hierarchies, interconnects, power management
                      </p>
                    </div>
                    <div className="p-4 rounded-lg bg-muted">
                      <Terminal className="h-6 w-6 text-tech-cyan mb-2" />
                      <h4 className="font-semibold mb-1">FPGA Design</h4>
                      <p className="text-sm text-muted-foreground">
                        Verilog/VHDL, synthesis, timing analysis, hardware acceleration
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild variant="outline">
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="mailto:contact@example.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default About;
