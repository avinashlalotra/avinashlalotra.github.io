import BlogTemplate from '@/components/BlogTemplate'
import CodeBlock from '@/components/ui/CodeBlock'
import BlogImage from '@/components/ui/BlogImage'

const sampleCode = `#include <stdio.h>

int main() {
  printf("Hello, world!\n");
  return 0;
}`

const SampleBlog = () => {
  return (
    <BlogTemplate title="Getting Started with Bare-metal RISC-V" date="Aug 18, 2025" author="Abinash Singh">
      <p>
        In this post we will look at a minimal bare-metal "Hello, world" example for RISC-V and
        how to wire up a minimal serial console.
      </p>

      <h2>Minimal C Program</h2>
      <CodeBlock code={sampleCode} language="c" showLineNumbers />

      <h2>Boot image</h2>
      <BlogImage src="/public/placeholder.svg" alt="boot diagram" caption="Boot flow diagram" />

      <h2>Notes</h2>
      <p>
        You can click the image to enlarge it. Use the copy button on the code block to copy the code.
      </p>
    </BlogTemplate>
  )
}

export default SampleBlog
