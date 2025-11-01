import fs from "fs-extra";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

const srcDir = "public/posts";   // keep markdown files here
const outDir = "public/posts";    // build output for your React app

await fs.ensureDir(outDir);

const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".md"));

for (const file of files) {
  const filePath = path.join(srcDir, file);
  const md = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(md);

  // Convert markdown → HTML
  const htmlContent = marked.parse(content);

  // Optional: wrap it with minimal HTML structure for standalone viewing
  const htmlFragment = `
  <article>
    <h1>${data.title}</h1>
    <p><i>${data.date} — ${data.author}</i></p>
    ${htmlContent}
  </article>
  `;

  // Write output (React fetches this path)
  const outPath = path.join(outDir, `${data.slug}/index.html`);
  await fs.ensureDir(path.dirname(outPath));
  fs.writeFileSync(outPath, htmlFragment);
  console.log(`✅ Built: ${outPath}`);
}
