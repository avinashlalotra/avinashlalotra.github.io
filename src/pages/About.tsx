import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Terminal, Code, Cpu, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import ContributionCard from "@/components/ContributionCard";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About | Bits, Boot & Beyond</title>
        <meta name="description" content="Learn about Abinash Lalotra and his journey in systems programming, Linux kernel development, embedded systems, and FPGA design." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="container py-16 max-w-4xl">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">About Me</h1>
              <div className="flex items-center justify-center gap-3 mb-4">
                <p className="text-xl text-muted-foreground max-w-prose">
                  Systems programmer, kernel enthusiast, and hardware hacker
                </p>
              </div>
              <div className="mx-auto w-24 h-1 bg-gradient-to-r from-primary to-secondary rounded-full mb-6" aria-hidden />
            </div>

            <div className="grid gap-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-20 w-20 rounded-full bg-gradient-hero flex items-center justify-center text-white text-3xl font-bold">
                      <img src="/content/images/abinashSingh.png"/>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Abinash Singh</h2>
                      <p className="text-muted-foreground">Systems Engineer</p>
                    </div>
                  </div>

                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p>
                      Welcome to <strong>Bits, Boot & Beyond</strong> – my corner of the internet where I explore the fascinating world of low-level systems programming, kernel development, and hardware design.
                    </p>
                    <p>
                      With deep intrest in embedded Linux, kernel internals, SoC architecture, and FPGA development, I've developed a deep appreciation for the beautiful complexity that lies beneath our modern computing systems.
                    </p>
                    <p>
                      This blog serves as both a learning journal and a resource for others interested in understanding how computers really work – from the moment you press the power button to the kernel scheduler making split-second decisions about which thread to run next.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-2">Open Source Contributions</h3>
                  <p className="text-sm text-muted-foreground mb-4">A selection of projects and contributions I maintain or have contributed to. Click any card to open the project or PR.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ContributionCard
                      name="Kernel"
                      imageSrc="/content/images/linux.png"
                      href="https://avinashlalotra.github.io/#/posts/linux-contrib"
                    />

                    <ContributionCard
                      name="FOSSEE"
                      imageSrc="/content/images/fossee.png"
                      href="https://github.com/avinashlalotra/memset"
                    />

                    <ContributionCard
                      name="Octave"
                      imageSrc="/content/images/octave.png"
                      href="https://github.com/avinashlalotra/rtl2c"
                    />
                    
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Connect With Me</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button asChild variant="outline">
                      <a href="https://github.com/avinashlalotra" target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="https://www.linkedin.com/in/abinashsinghlalotra/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <a href="mailto:abinashsinghlalotra@gmail.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                      <Button asChild variant="outline">
                        <a href="https://drive.google.com/file/d/164489bMc_Sxf5qEMLBYA4CC9wZ0yNQ-A/view?usp=drive_link" target="_blank" rel="noopener noreferrer">
                          <Terminal className="mr-2 h-4 w-4" />
                          Resume
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
