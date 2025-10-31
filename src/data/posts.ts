export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: "Linux" | "Embedded" | "SoC" | "FPGA";
  tags: string[];
  readTime: number;
  coverImage?: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Linux Kernel Threading Models",
    slug: "linux-kernel-threading-models",
    excerpt: "Deep dive into kernel-level threading mechanisms, scheduler implementations, and performance implications for system programming.",
    content: `
# Understanding Linux Kernel Threading Models

The Linux kernel provides sophisticated threading mechanisms that are fundamental to modern system programming. Understanding these models is crucial for writing efficient concurrent applications.

## Kernel Threads vs User Threads

Linux implements a hybrid threading model that combines the best of both worlds:

\`\`\`c
#include <pthread.h>
#include <linux/sched.h>

// Creating a kernel thread
struct task_struct *kthread_create(
    int (*threadfn)(void *data),
    void *data,
    const char namefmt[], ...
);
\`\`\`

### Key Concepts

1. **NPTL (Native POSIX Thread Library)**: Modern 1:1 threading model
2. **CFS (Completely Fair Scheduler)**: Default scheduler for tasks
3. **Real-time scheduling**: SCHED_FIFO and SCHED_RR policies

## Performance Considerations

Thread creation overhead, context switching costs, and cache coherency all play crucial roles in system performance.
    `,
    date: "2025-01-15",
    author: "Avinash Lalotra",
    category: "Linux",
    tags: ["kernel", "threading", "concurrency", "scheduling"],
    readTime: 8,
  },
  {
    id: "2",
    title: "Embedded Linux Boot Process: From Power-On to Init",
    slug: "embedded-linux-boot-process",
    excerpt: "Complete walkthrough of the embedded Linux boot sequence, from bootloader initialization through kernel decompression to userspace init.",
    content: `
# Embedded Linux Boot Process

Understanding the boot process is essential for embedded systems development. Let's break down each stage.

## Boot Stages

### 1. Bootloader (U-Boot)

\`\`\`bash
# U-Boot environment variables
setenv bootargs 'console=ttyS0,115200 root=/dev/mmcblk0p2'
setenv bootcmd 'fatload mmc 0:1 0x80000000 zImage; bootz 0x80000000'
\`\`\`

### 2. Kernel Initialization

The kernel decompresses and initializes hardware subsystems:

- Memory management initialization
- Device tree parsing
- Driver probing and initialization

### 3. Init System

Modern embedded systems typically use systemd or BusyBox init.
    `,
    date: "2025-01-10",
    author: "Avinash Lalotra",
    category: "Embedded",
    tags: ["bootloader", "u-boot", "embedded-linux", "kernel"],
    readTime: 12,
  },
  {
    id: "3",
    title: "FPGA Design Workflow: From RTL to Bitstream",
    slug: "fpga-design-workflow",
    excerpt: "Comprehensive guide to FPGA development using Verilog/VHDL, covering synthesis, place-and-route, timing analysis, and bitstream generation.",
    content: `
# FPGA Design Workflow

Designing for FPGAs requires understanding the complete toolchain from RTL to hardware implementation.

## RTL Design

\`\`\`verilog
module uart_transmitter #(
    parameter CLK_FREQ = 50_000_000,
    parameter BAUD_RATE = 115200
)(
    input wire clk,
    input wire rst,
    input wire [7:0] data,
    input wire valid,
    output reg tx,
    output reg ready
);
    
    localparam BAUD_DIV = CLK_FREQ / BAUD_RATE;
    // ... implementation
    
endmodule
\`\`\`

## Synthesis and Implementation

1. **Synthesis**: RTL → Gate-level netlist
2. **Place**: Map logic to physical resources
3. **Route**: Connect placed components
4. **Timing Analysis**: Verify timing constraints

## Verification

Always simulate thoroughly before hardware deployment.
    `,
    date: "2025-01-05",
    author: "Avinash Lalotra",
    category: "FPGA",
    tags: ["fpga", "verilog", "rtl", "synthesis"],
    readTime: 15,
  },
  {
    id: "4",
    title: "ARM Cortex-A SoC Architecture Deep Dive",
    slug: "arm-cortex-soc-architecture",
    excerpt: "Exploring modern ARM-based System-on-Chip architectures, cache hierarchies, interconnects, and peripheral subsystems.",
    content: `
# ARM Cortex-A SoC Architecture

Modern ARM SoCs are incredibly sophisticated, integrating multiple processor cores with complex cache hierarchies and interconnects.

## Core Architecture

### Cortex-A Series Features

- Out-of-order execution (A76+)
- Advanced SIMD (NEON)
- Multiple cache levels (L1, L2, L3)
- Hardware virtualization

\`\`\`c
// ARM-specific cache operations
static inline void flush_cache_line(void *addr) {
    asm volatile("dc civac, %0" : : "r" (addr) : "memory");
    asm volatile("dsb sy");
    asm volatile("isb");
}
\`\`\`

## Memory Subsystem

Understanding AXI/ACE protocols is crucial for high-performance designs.

## Power Management

ARM TrustZone and PSCI enable secure power state transitions.
    `,
    date: "2024-12-28",
    author: "Avinash Lalotra",
    category: "SoC",
    tags: ["arm", "soc", "architecture", "cortex"],
    readTime: 10,
  },
  {
    id: "5",
    title: "Real-Time Linux: PREEMPT_RT Patch Deep Dive",
    slug: "realtime-linux-preempt-rt",
    excerpt: "Comprehensive analysis of the PREEMPT_RT patch set, converting Linux into a fully preemptible real-time operating system.",
    content: `
# Real-Time Linux with PREEMPT_RT

The PREEMPT_RT patch transforms Linux into a hard real-time operating system suitable for industrial and automotive applications.

## Key Modifications

### 1. Spinlocks to Mutexes

\`\`\`c
// Standard kernel spinlock
spinlock_t lock;
spin_lock(&lock);
// critical section
spin_unlock(&lock);

// PREEMPT_RT converts to:
rt_mutex_t lock;
rt_mutex_lock(&lock);
// critical section (now preemptible!)
rt_mutex_unlock(&lock);
\`\`\`

### 2. Interrupt Threading

All interrupt handlers run in thread context, making them preemptible.

### 3. Priority Inheritance

Prevents priority inversion through PI protocol implementation.

## Latency Measurements

Use cyclictest for measuring system latency characteristics.
    `,
    date: "2024-12-20",
    author: "Avinash Lalotra",
    category: "Linux",
    tags: ["realtime", "preempt-rt", "kernel", "latency"],
    readTime: 14,
  },
  {
    id: "6",
    title: "Yocto Project: Building Custom Embedded Linux Distributions",
    slug: "yocto-custom-embedded-linux",
    excerpt: "Master the Yocto Project build system to create tailored Linux distributions for embedded devices with custom recipes and layers.",
    content: `
# Yocto Project for Embedded Linux

Yocto provides the tools and metadata to create custom Linux distributions for embedded devices.

## BitBake Basics

\`\`\`bash
# Build a custom image
bitbake core-image-minimal

# Add custom layer
bitbake-layers add-layer ../meta-custom
\`\`\`

## Writing Recipes

\`\`\`python
DESCRIPTION = "Custom application"
LICENSE = "MIT"
LIC_FILES_CHKSUM = "file://LICENSE;md5=..."

SRC_URI = "git://github.com/user/repo.git;protocol=https"
SRCREV = "\${AUTOREV}"

inherit cmake

do_install() {
    install -d \${D}\${bindir}
    install -m 0755 myapp \${D}\${bindir}
}
\`\`\`

## Layer Management

Organize BSP, middleware, and application layers effectively.
    `,
    date: "2024-12-15",
    author: "Avinash Lalotra",
    category: "Embedded",
    tags: ["yocto", "buildroot", "embedded-linux", "bsp"],
    readTime: 18,
  },
];

export const getFeaturedPosts = () => blogPosts.slice(0, 3);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getPostsByCategory = (category: string) => blogPosts.filter(post => post.category === category);
