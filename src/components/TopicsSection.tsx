import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Cpu, 
  CircuitBoard, 
  Terminal, 
  Wrench, 
  Zap, 
  Code2,
  Layers,
  HardDrive
} from "lucide-react";

const topics = [
  {
    icon: CircuitBoard,
    title: "🧬 Open-source hardware",
    description: "Exploring FPGAs, development boards, and contributing to open hardware projects",
    tags: ["FPGA", "PCB Design", "Open Hardware"],
    color: "circuit-blue"
  },
  {
    icon: Terminal,
    title: "💻 Linux kernel hacking & device drivers",
    description: "Deep-dives into kernel subsystems, writing drivers, and contributing patches",
    tags: ["Kernel", "Device Drivers", "C Programming"],
    color: "terminal-green"
  },
  {
    icon: Cpu,
    title: "🔩 Bare-metal programming & embedded systems",
    description: "Programming microcontrollers, real-time systems, and hardware abstraction",
    tags: ["Embedded C", "Real-time", "Microcontrollers"],
    color: "warning-amber"
  },
  {
    icon: Layers,
    title: "🧰 RTL design & custom SoCs",
    description: "Verilog/VHDL development, digital design, and system-on-chip architecture",
    tags: ["Verilog", "VHDL", "Digital Design"],
    color: "code-purple"
  },
  {
    icon: Zap,
    title: "🛠️ RISC-V experiments & core bring-up",
    description: "Custom RISC-V implementations, ISA extensions, and processor design",
    tags: ["RISC-V", "ISA", "CPU Design"],
    color: "terminal-green"
  },
  {
    icon: Code2,
    title: "🔍 Tools & Toolchains",
    description: "Working with Vivado, elf2hex, open-source toolchains, and debugging tools",
    tags: ["Toolchains", "Debug", "Open Source"],
    color: "circuit-blue"
  }
];

const TopicsSection = () => {
  return (
    <section id="topics" className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 font-mono text-terminal-green">
            $ ls -la /topics/
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Areas I explore and document through hands-on experimentation and real-world projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topics.map((topic, index) => {
            const IconComponent = topic.icon;
            return (
              <Card 
                key={index} 
                className="bg-gradient-card border-border hover:shadow-card transition-all duration-300 hover:scale-105 slide-in group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-3 rounded-lg bg-${topic.color}/10 group-hover:bg-${topic.color}/20 transition-colors`}>
                      <IconComponent className={`h-6 w-6 text-${topic.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {topic.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topic.tags.map((tag, tagIndex) => (
                      <Badge 
                        key={tagIndex} 
                        variant="secondary" 
                        className="text-xs font-mono"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TopicsSection;