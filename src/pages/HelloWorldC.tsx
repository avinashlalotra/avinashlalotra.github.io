import BlogTemplate from '@/components/BlogTemplate'
import CodeBlock from '@/components/ui/CodeBlock'
import BlogImage from '@/components/ui/BlogImage'

const helloC = `#include <stdio.h>

int main(void) {
  printf("Hello, world!\n");
  return 0;
}`

const buildCmds = `# compile with gcc
gcc -o hello hello.c

# run
./hello`

const HelloWorldC = () => {
  return (
    <BlogTemplate title="Hello World in C" date="Aug 18, 2025" author="Abinash Singh">
      <p>
        This short post demonstrates the canonical "Hello, world!" program in C, how to
        compile it with GCC, and a small note about running it on a bare-metal target vs a
        userspace environment.
      </p>

      <h2>Source Code</h2>
      <p>Here's the minimal C source (saved as <code>hello.c</code>):</p>
      <CodeBlock code={helloC} language="c" showLineNumbers />

      <h2>Build and Run</h2>
      <p>On a normal Linux machine with GCC installed:</p>
      <CodeBlock code={buildCmds} language="bash" />

      <h2>Bare-metal / Embedded Note</h2>
      <p>
        On bare-metal or when targeting a small embedded runtime you won't have a libc
        or a terminal attached. You typically write to a UART or semihosting console.
        The above example requires an OS userland or a minimal runtime that implements
        <code>printf</code>.
      </p>

      <h2>Diagram</h2>
      <BlogImage src="/placeholder.svg" alt="hello world flow" caption="Hello world flow (userland vs bare-metal)" />

      <h2>Closing</h2>
      <p>
        This is the canonical starting point for learning C and systems programming. From
        here you can explore linking, startup code, and bare-metal runtime setup for
        RISC-V or ARM targets.
      </p>
    </BlogTemplate>
  )
}

export default HelloWorldC
