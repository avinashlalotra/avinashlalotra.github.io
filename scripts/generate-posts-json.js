import fs from 'fs-extra';
import path from 'path';
import matter from 'gray-matter';

const POSTS_DIR = 'public/content';
const OUTPUT_FILE = 'src/data/posts.json';

async function generatePostsJson() {
  // Get all markdown files
  const files = fs.readdirSync(POSTS_DIR).filter(f => f.endsWith('.md'));
  
  const posts = files.map((file, index) => {
    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);
    
    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));
    
    return {
      id: String(index + 1),
      title: data.title || '',
      slug: data.slug || file.replace('.md', ''),
      excerpt: data.excerpt || '',
      mdFile: file,
      date: data.date || new Date().toISOString().split('T')[0],
      author: data.author || 'Avinash',
      category: data.category || 'Linux',
      tags: data.tags || [],
      readTime: data.readTime || readTime,
      hidden: parseInt(data.hidden) || 0,
    };
  });
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Write to JSON file
  await fs.writeJson(OUTPUT_FILE, posts, { spaces: 2 });
  console.log(`✅ Generated ${OUTPUT_FILE} with ${posts.length} posts`);
}

generatePostsJson().catch(console.error);
