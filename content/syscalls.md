---
title: "Linux Syscalls"
slug: "syscalls"
excerpt: "Implementing custom Syscalls"
date: "2025-11-01"
author: "Abinash"
category: "Linux"
tags: ["Syscall", "Interrupts", "Kernel"]
---

# Introduction to System Calls

The kernel is the core part of an operating system. It acts as a bridge between software applications and computer hardware.

<img src="/content/images/syscalls/kernel.webp">

The kernel manages system resources such as the CPU, memory, and devices, ensuring that everything works together efficiently.  
It handles essential tasks like running programs, accessing files, and communicating with devices such as printers and keyboards.

System calls are the mechanism used to interact with the kernel. They are the only way for user-space programs to use kernel functionality.

System calls form a layer between hardware and user-space processes. This layer serves three main purposes:

1. Provides an abstract hardware interface for user-space  
2. Ensures system security and stability  
3. Acts as a single, consistent interface between user-space and the kernel  

Let’s take the classical “Hello World” program, probably the first one you ever executed:

```c
printf("Hello, World!");
```

Internally, this `printf()` function calls `print()` from the C library, which in turn calls `write()` from the same library, and finally invokes the `write()` system call.

<img src="/content/images/syscalls/printftokernel.png">

`write()` is a system call. Linux on x86_64 provides around 400+ system calls.  
Each one serves a unique purpose—some only read kernel state, while others modify it.

## Syscalls

System calls (syscalls) are usually accessed through functions defined in the C library.  
They can accept zero or more arguments and always return a value of type `long`.

A return value of `0` indicates success, while a negative value represents an error.  
For instance, `-ENOSYS` is returned if the syscall is not implemented.

The return value also sets the global variable `errno`, which can be converted to human-readable messages using `perror()`.

## System Call Numbers

In Linux, each system call is assigned a unique syscall number. This number is used to reference the system call internally—the process never refers to the syscall by name.

Changing syscall numbers can break existing applications because they rely on these fixed identifiers.

The kernel maintains all registered system calls in a system call table named `sys_call_table`.

This table is architecture-specific. On x86-64 systems, it is defined in:  
`arch/x86/entry/syscalls/syscall_64.tbl`

This table maps each system call to its number.

## System Call Handler

User-space applications cannot directly execute kernel code. They cannot simply call kernel functions because the kernel resides in a protected memory space.

Instead, user-space programs must request the kernel to execute a system call. This triggers a mode switch from user-space to kernel-space, where the system call is executed by the kernel on behalf of the application.

On early 32-bit systems, this was done using software interrupts. The interrupt `int $0x80` (128) was assigned as the system call handler.

<img src="/content/images/syscalls/syshandler.png">

The system call handler executes the requested call. However, this interrupt mechanism was relatively slow, so modern x86 processors introduced `syscall` and `sysenter` instructions, which are much faster.

## Parameter Passing

Most syscalls require one or more parameters in addition to the syscall number.  
User-space programs must pass these parameters to the kernel during the trap.

On x86-32, parameters are passed via registers: `ebx`, `ecx`, `edx`, `esi`, and `edi` hold the first five arguments in order.  
If there are six or more, a pointer to user-space memory containing the remaining parameters is passed in a register.

The return value is also returned to user-space via a register—on x86, it’s stored in `eax`.

# System Call Implementation

Now that we understand the basics, let’s implement a custom system call.

## Get the Kernel Source

```bash
git clone https://github.com/torvalds/linux.git --depth=1
```

First, decide the purpose of the new system call.  
Here, we’ll implement a simple one that returns the PID of the process calling it.

Since no additional information is required, this syscall takes no arguments.

The Linux kernel provides macros to simplify syscall definition.  
While you can define a syscall manually, using macros is cleaner and less error-prone.

Create a new file under `arch/x86/kernel/` named `mysyscall.c`:

```c
#include <linux/kernel.h>
#include <linux/syscalls.h>
#include <asm/current.h>

SYSCALL_DEFINE0(my_pid) {
    return task_tgid_vnr(current); // Returns the PID of the current process
}
```

That’s it.  
`SYSCALL_DEFINE($num_of_arguments)(syscall_name) { implementation }`  
expands internally to:

```c
asmlinkage long sys_my_pid(void) {
    return task_tgid_vnr(current);
}
```

Syscalls return a `long` value.

Next, register the new syscall by adding it to the syscall table:  
`arch/x86/entry/syscalls/syscall_64.tbl`

Assign an unused number, for example, `470`:

```
Number   Type    User-space Name   Kernel-space Name
467      common  open_tree_attr    sys_open_tree_attr
468      common  file_getattr      sys_file_getattr
469      common  file_setattr      sys_file_setattr
470      common  my_pid            sys_my_pid
```

In kernel space, our function name is `sys_my_pid`, and in user space, it’s `my_pid`.

Now link the new file with the kernel. Edit `arch/x86/kernel/Makefile`:

```Makefile
obj-y += mysyscall.o
```

Compile and boot the kernel:

```bash
cp /boot/config-$(uname -r) .config
make oldconfig
make -j$(nproc)
sudo make modules_install
sudo make install
sudo update-grub
```

## Reboot

```bash
sudo reboot
```

After booting into the new kernel—congratulations, your syscall is ready.

# Next Steps: Calling from User Space

There are two ways to call this new system call from user space:

1. Using libc** — via `syscall(syscall_number)`  
2. Using custom assembly** — via `int $0x80` or `syscall` instruction

Let’s implement both methods.

Create a directory for experiments:

```bash
cd ~
mkdir experiments
```

Create a header file `my_pid.h`:

```c
#define __NR_my_pid 470
long my_pid_int(void);
long my_pid_syscall(void);
```

Now create an assembly file `my_pid.S`:

```
.text
.global my_pid_int, my_pid_syscall
.type my_pid_int, @function
.type my_pid_syscall, @function
.equ __NR_my_pid, 470

my_pid_int:
    mov $__NR_my_pid, %eax
    int $0x80
    ret

my_pid_syscall:
    mov $__NR_my_pid, %rax
    syscall
    ret
```

Then create `main.c`:

```c
#include <stdio.h>
#include <sys/syscall.h>
#include "my_pid.h"

int main() {
    printf("The PID (using interrupt): %ld\n", my_pid_int());
    printf("The PID (using syscall): %ld\n", my_pid_syscall());
    printf("The PID (using libc): %ld\n", syscall(__NR_my_pid));
    return 0;
}
```

Compile and run:

```bash
gcc my_pid.S main.c -o mypid
./mypid
```

If you get a negative PID, it means the syscall was not properly mapped or you booted the wrong kernel.  
Reboot into the kernel where you added the syscall.

## Issues ??
If you are facing some issues kindly visit https://github.com/avinashlalotra/Syscalls and follow the instructions


Thanks for reading!  
— Abinash Singh 📌 GitHub: https://github.com/avinashlalotra/Syscalls