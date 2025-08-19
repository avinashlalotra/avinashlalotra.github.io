export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  date: string
  readTime: number
  tags: string[]
  category: string
  author: string
  published: boolean
  featured: boolean
}

export interface BlogMetadata {
  title: string
  date: string
  excerpt: string
  tags: string[]
  category: string
  author: string
  published?: boolean
  featured?: boolean
}

export interface PaginatedPosts {
  posts: BlogPost[]
  currentPage: number
  totalPages: number
  totalPosts: number
}