import { BlogPost, BlogMetadata } from '@/types/blog'

// Mock blog posts data - in a real implementation, this would load from markdown files
const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'getting-started-with-risc-v',
    title: 'Getting Started with Bare-metal RISC-V',
    excerpt: 'Learn how to write your first bare-metal program for RISC-V architecture and set up a minimal development environment.',
    content: 'Full content would be loaded from markdown...',
    date: '2024-01-15',
    readTime: 8,
    tags: ['RISC-V', 'bare-metal', 'embedded'],
    category: 'tutorials',
    author: 'Abinash Singh',
    published: true,
    featured: true
  },
  {
    id: '2',
    slug: 'linux-kernel-debugging',
    title: 'Linux Kernel Debugging Techniques',
    excerpt: 'Deep dive into various kernel debugging methods including printk, ftrace, and using GDB with QEMU.',
    content: 'Full content would be loaded from markdown...',
    date: '2024-01-10',
    readTime: 12,
    tags: ['Linux', 'kernel', 'debugging'],
    category: 'kernel',
    author: 'Abinash Singh',
    published: true,
    featured: false
  },
  {
    id: '3',
    slug: 'fpga-hello-world',
    title: 'FPGA Hello World: Your First Verilog Design',
    excerpt: 'Build your first FPGA project from scratch using Verilog and understand the basics of hardware description languages.',
    content: 'Full content would be loaded from markdown...',
    date: '2024-01-05',
    readTime: 15,
    tags: ['FPGA', 'Verilog', 'hardware'],
    category: 'hardware',
    author: 'Abinash Singh',
    published: true,
    featured: true
  },
  {
    id: '4',
    slug: 'device-driver-basics',
    title: 'Writing Your First Linux Device Driver',
    excerpt: 'Step-by-step guide to creating a simple character device driver for the Linux kernel.',
    content: 'Full content would be loaded from markdown...',
    date: '2023-12-28',
    readTime: 20,
    tags: ['Linux', 'drivers', 'kernel'],
    category: 'kernel',
    author: 'Abinash Singh',
    published: true,
    featured: false
  },
  {
    id: '5',
    slug: 'riscv-cpu-design',
    title: 'Designing a Simple RISC-V CPU Core',
    excerpt: 'Learn the fundamentals of CPU design by implementing a basic RISC-V processor in Verilog.',
    content: 'Full content would be loaded from markdown...',
    date: '2023-12-20',
    readTime: 25,
    tags: ['RISC-V', 'CPU', 'Verilog', 'architecture'],
    category: 'hardware',
    author: 'Abinash Singh',
    published: true,
    featured: true
  },
  {
    id: '6',
    slug: 'embedded-rust-intro',
    title: 'Embedded Programming with Rust',
    excerpt: 'Explore how Rust can be used for embedded systems programming with safety and performance.',
    content: 'Full content would be loaded from markdown...',
    date: '2023-12-15',
    readTime: 18,
    tags: ['Rust', 'embedded', 'bare-metal'],
    category: 'tutorials',
    author: 'Abinash Singh',
    published: true,
    featured: false
  }
]

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

export const getAllPosts = (published: boolean = true): BlogPost[] => {
  return blogPosts
    .filter(post => published ? post.published : true)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug && post.published)
}

export const getFeaturedPosts = (): BlogPost[] => {
  return blogPosts
    .filter(post => post.featured && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostsByCategory = (category: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.category === category && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getPostsByTag = (tag: string): BlogPost[] => {
  return blogPosts
    .filter(post => post.tags.includes(tag) && post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const searchPosts = (query: string): BlogPost[] => {
  const lowercaseQuery = query.toLowerCase()
  return blogPosts
    .filter(post => 
      post.published && (
        post.title.toLowerCase().includes(lowercaseQuery) ||
        post.excerpt.toLowerCase().includes(lowercaseQuery) ||
        post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
        post.category.toLowerCase().includes(lowercaseQuery)
      )
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export const getAllCategories = (): string[] => {
  const categories = new Set(blogPosts.filter(post => post.published).map(post => post.category))
  return Array.from(categories).sort()
}

export const getAllTags = (): string[] => {
  const tags = new Set(blogPosts.filter(post => post.published).flatMap(post => post.tags))
  return Array.from(tags).sort()
}

export const paginatePosts = (posts: BlogPost[], page: number, limit: number = 6) => {
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  const paginatedPosts = posts.slice(startIndex, endIndex)
  
  return {
    posts: paginatedPosts,
    currentPage: page,
    totalPages: Math.ceil(posts.length / limit),
    totalPosts: posts.length
  }
}

export const getRelatedPosts = (currentPost: BlogPost, limit: number = 3): BlogPost[] => {
  const relatedPosts = blogPosts
    .filter(post => 
      post.id !== currentPost.id && 
      post.published && (
        post.category === currentPost.category ||
        post.tags.some(tag => currentPost.tags.includes(tag))
      )
    )
    .sort((a, b) => {
      // Priority scoring based on shared tags and category
      const aScore = (a.category === currentPost.category ? 2 : 0) + 
        a.tags.filter(tag => currentPost.tags.includes(tag)).length
      const bScore = (b.category === currentPost.category ? 2 : 0) + 
        b.tags.filter(tag => currentPost.tags.includes(tag)).length
      
      if (aScore !== bScore) return bScore - aScore
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })
  
  return relatedPosts.slice(0, limit)
}