import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const srcDir = "public/content";   // markdown input
const outDir = "public/posts";   // build output

await fs.ensureDir(outDir);

const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const md = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(md);

  const htmlContent = marked.parse(content);

  // Full-width blog layout with a left TOC slot and main article column
  const htmlFragment = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.title}</title>
<style>
  :root { --max-content: 1100px; }
  body {
    font-family: "Inter", system-ui, sans-serif;
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
    margin: 0;
    padding: 0;
    line-height: 1.7;
    transition: background-color 0.3s, color 0.3s;
  }

  .post-page {
    display: grid;
    grid-template-columns: 260px 1fr;
    gap: 2rem;
    max-width: 1300px;
    margin: 1.5rem auto;
    /* match SPA horizontal padding: px-4 md:px-8 lg:px-12 */
    padding-left: 1rem;
    padding-right: 1rem;
    align-items: start;
  }

  @media (min-width: 768px) {
    .post-page { padding-left: 2rem; padding-right: 2rem; }
  }

  @media (min-width: 1024px) {
    .post-page { padding-left: 3rem; padding-right: 3rem; }
  }

  @media (max-width: 1024px) {
    .post-page { grid-template-columns: 1fr; }
    .post-toc { display: none; }
  }

  .post-toc {
    position: sticky;
    top: 1.5rem;
    align-self: start;
    padding: 1rem;
    border-radius: 8px;
    background-color: hsl(var(--card));
    box-shadow: 0 6px 24px hsl(var(--border) / 0.06);
    max-height: calc(100vh - 3rem);
    overflow: auto;
  }

  .post-main {
    width: 100%;
  }

  article {
    max-width: var(--max-content);
    margin: 0;
    padding: 2rem;
    background-color: transparent;
    color: hsl(var(--card-foreground));
    border-radius: var(--radius);
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

  code { background-color: hsl(var(--code-bg)); color: hsl(var(--code-text)); padding: 0.2em 0.4em; border-radius: 4px; }

  a { color: hsl(var(--primary)); text-decoration: none; }
  a:hover { text-decoration: underline; }

  hr { border: none; border-top: 1px solid hsl(var(--border)); margin: 2rem 0; }

  p, ul, ol { margin-bottom: 1rem; }
  ul { padding-left: 1.5rem; }

  .toc-list { list-style: none; padding: 0; margin: 0; }
  .toc-list li { margin: 0.25rem 0; }
  .toc-list a { color: hsl(var(--muted-foreground)); font-size: 0.95rem; }
  .toc-list a.active { color: hsl(var(--primary)); font-weight: 600; }

  h1 code, h2 code, h3 code { background-color: hsl(var(--muted)); color: hsl(var(--foreground)); padding: 0.15em 0.3em; border-radius: 4px; font-size: 0.9em; }
</style>

<!-- fallback hero padding available for static viewers -->
<style>
  .hero-fallback { padding-top: 1.5rem; padding-bottom: 3rem; }
  @media (min-width: 768px) { .hero-fallback { padding-top: 2rem; padding-bottom: 4rem; } }
</style>

<script>
  window.location.replace(window.location.origin + '/?redirect=' + window.location.pathname);
</script>

</head>
<body>
  <div class="post-page">
    <aside id="post-toc" class="post-toc">
      <!-- TOC will be populated by the client -->
      <div><strong>On this page</strong></div>
      <ul class="toc-list"></ul>
    </aside>
    <div class="post-main">
      <article>
        <h1>${data.title}</h1>
        <p><i>${data.date} — ${data.author}</i></p>
        ${htmlContent}
      </article>
    </div>
  </div>
</body>
</html>`;

  const outPath = path.join(outDir, `${data.slug}/index.html`);
  await fs.ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, htmlFragment);
  console.log(`✅ Built: ${outPath}`);
}
