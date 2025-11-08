
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  mdFile: string;
  date: string;
  author: string;
  category: "Linux" | "Embedded" | "SoC" | "FPGA";
  tags: string[];
  readTime: number;
  coverImage?: string;
  hidden: number;
}

// Import JSON data with type assertion
import rawData from './posts.json';
const blogPostsData = rawData as Array<BlogPost>;

// Export the typed blog posts array
export const blogPosts = blogPostsData;

// Helper functions to get posts
export const getFeaturedPosts = () => blogPosts.slice(0, 3);
export const getPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug);
export const getPostsByCategory = (category: string) => blogPosts.filter(post => post.category === category);

