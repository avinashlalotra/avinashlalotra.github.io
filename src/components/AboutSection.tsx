import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Target, 
  BookOpen, 
  Users, 
  Lightbulb,
  Code,
  Bug,
  Layers,
  Zap
} from "lucide-react";

const expectations = [
  {
    icon: Code,
    title: "Deep-dives into Linux contributions",
    description: "Especially in kernel subsystems and low-level programming"
  },
  {
    icon: Bug,
    title: "Tutorials on writing and debugging device drivers",
    description: "Step-by-step guides with real-world examples"
  },
  {
    icon: Layers,
    title: "Step-by-step SoC bring-ups",
    description: "Hardware/software co-design and system integration"
  },
  {
    icon: Zap,
    title: "Practical lessons from RTL projects",
    description: "FPGA exploration and digital design experiences"
  },
  {
    icon: Lightbulb,
    title: "Insights from open-source toolchains",
    description: "Working with Verilog, Vivado, elf2hex, and more"
  }
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 font-mono text-terminal-green">
              $ cat /proc/self/about
            </h2>
            <p className="text-xl text-muted-foreground">
              What to expect from this low-level journey
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="bg-gradient-card border-border slide-in">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-terminal-green/10 rounded-lg">
                    <Target className="h-6 w-6 text-terminal-green" />
                  </div>
                  <h3 className="text-xl font-semibold">Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Whether it's writing your first kernel patch, booting a custom RISC-V CPU on an FPGA, 
                  or lighting up LEDs from assembly, I'm here to share the learning process — 
                  <span className="text-terminal-green font-semibold"> raw, unfiltered, and full of trial and error</span>.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-card border-border slide-in" style={{ animationDelay: '0.1s' }}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="p-2 bg-circuit-blue/10 rounded-lg">
                    <Users className="h-6 w-6 text-circuit-blue" />
                  </div>
                  <h3 className="text-xl font-semibold">For You If</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  You enjoy <span className="text-terminal-green">tinkering</span>, 
                  <span className="text-terminal-green"> debugging at the lowest levels</span>, 
                  or <span className="text-terminal-green">contributing to real-world systems</span>. 
                  You'll probably find something valuable here.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gradient-card border-border mb-8">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-warning-amber/10 rounded-lg">
                  <BookOpen className="h-6 w-6 text-warning-amber" />
                </div>
                <h3 className="text-2xl font-semibold">🔍 What to Expect</h3>
              </div>
              
              <div className="space-y-6">
                {expectations.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <div 
                      key={index} 
                      className="flex items-start space-x-4 slide-in"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="p-2 bg-terminal-green/10 rounded-lg flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-terminal-green" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <div className="inline-flex flex-wrap gap-2 justify-center">
              {[
                "Linux Kernel", "RISC-V", "FPGA", "Verilog", "Device Drivers", 
                "Embedded C", "RTL Design", "Open Source", "Hardware Hacking"
              ].map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="font-mono text-terminal-green bg-terminal-green/10"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="bg-gradient-card border-border mt-8">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2">Contact</h3>
              <p className="text-muted-foreground mb-4">For collaboration or inquiries, drop a line:</p>
              <div className="flex items-center space-x-3">
                <a href="mailto:abinash@example.com" className="text-terminal-green font-mono">abinash@example.com</a>
                <a href="https://github.com/" target="_blank" rel="noreferrer" className="text-muted-foreground">GitHub</a>
                <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="text-muted-foreground">LinkedIn</a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;