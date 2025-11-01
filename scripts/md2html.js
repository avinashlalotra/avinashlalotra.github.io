import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const srcDir = "public/posts";   // markdown input
const outDir = "public/posts";   // build output

await fs.ensureDir(outDir);

const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const md = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(md);

  const htmlContent = marked.parse(content);

  // Minimal clean blog layout
  const htmlFragment = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.title}</title>
<style>
  body {
    font-family: "Inter", system-ui, sans-serif;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    margin: 0;
    padding: 0;
    line-height: 1.7;
    transition: background-color 0.3s, color 0.3s;
  }

  article {
    max-width: 800px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: hsl(var(--card));
    color: hsl(var(--card-foreground));
    border-radius: var(--radius);
    box-shadow: 0 2px 12px hsl(var(--border) / 0.3);
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
  }

  h1, h2, h3 {
    line-height: 1.3;
    font-weight: 600;
  }
  h1 { font-size: 2rem; margin-bottom: 0.5rem; }
  h2 {
    margin-top: 2rem;
    font-size: 1.5rem;
    border-bottom: 1px solid hsl(var(--border));
    padding-bottom: 0.3rem;
  }

  pre {
    background-color: hsl(var(--code-bg));
    color: hsl(var(--code-text));
    padding: 1rem 1.2rem;
    border-radius: 10px;
    overflow-x: auto;
    font-family: "Fira Code", monospace;
    font-size: 0.95rem;
    margin: 1.5rem 0;
    transition: background-color 0.3s, color 0.3s;
  }

  code {
    background-color: hsl(var(--code-bg));
    color: hsl(var(--code-text));
    padding: 0.2em 0.4em;
    border-radius: 4px;
    font-family: "Fira Code", monospace;
    font-size: 0.95em;
    transition: background-color 0.3s, color 0.3s;
  }

  pre code {
    background: none;
    padding: 0;
  }

  a {
    color: hsl(var(--primary));
    text-decoration: none;
    transition: color 0.3s;
  }

  a:hover {
    text-decoration: underline;
  }

  hr {
    border: none;
    border-top: 1px solid hsl(var(--border));
    margin: 2rem 0;
  }

  p, ul, ol {
    margin-bottom: 1rem;
  }

  ul {
    padding-left: 1.5rem;
  }

  i {
    color: hsl(var(--muted-foreground));
  }

  h1 code, h2 code, h3 code {
    background-color: hsl(var(--muted));
    color: hsl(var(--foreground));
    padding: 0.15em 0.3em;
    border-radius: 4px;
    font-size: 0.9em;
  }
</style>

<script>
  // If React app root exists, do nothing (you're already inside app)
  if (!document.querySelector('#root')) {
    // Redirect to the main app, preserving path
    window.location.replace('/?redirect=' + window.location.pathname);
  }
</script>



</head>
<body>
  <article>
    <h1>${data.title}</h1>
    <p><i>${data.date} — ${data.author}</i></p>
    ${htmlContent}
  </article>
</body>
</html>
  `;

  const outPath = path.join(outDir, `${data.slug}/index.html`);
  await fs.ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, htmlFragment);
  console.log(`✅ Built: ${outPath}`);
}
