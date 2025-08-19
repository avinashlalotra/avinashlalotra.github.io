import { useState, useMemo } from 'react'
import { getAllPosts, searchPosts, getPostsByCategory, getPostsByTag, paginatePosts } from '@/utils/blog'
import BlogGrid from './BlogGrid'
import BlogFilters from './BlogFilters'
import BlogPagination from './BlogPagination'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface BlogSectionProps {
  showTitle?: boolean
  showFilters?: boolean
  showPagination?: boolean
  postsPerPage?: number
  maxPosts?: number
}

const BlogSection = ({ 
  showTitle = true, 
  showFilters = false, 
  showPagination = false,
  postsPerPage = 6,
  maxPosts 
}: BlogSectionProps) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const filteredPosts = useMemo(() => {
    let posts = getAllPosts()

    // Apply search
    if (searchQuery) {
      posts = searchPosts(searchQuery)
    }

    // Apply category filter
    if (selectedCategory) {
      posts = getPostsByCategory(selectedCategory)
    }

    // Apply tag filter
    if (selectedTag) {
      posts = getPostsByTag(selectedTag)
    }

    // Apply search to filtered posts if both search and filters are active
    if (searchQuery && (selectedCategory || selectedTag)) {
      const query = searchQuery.toLowerCase()
      posts = posts.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Limit posts if maxPosts is specified
    if (maxPosts) {
      posts = posts.slice(0, maxPosts)
    }

    return posts
  }, [searchQuery, selectedCategory, selectedTag, maxPosts])

  const paginatedData = useMemo(() => {
    if (!showPagination) {
      return {
        posts: filteredPosts,
        currentPage: 1,
        totalPages: 1,
        totalPosts: filteredPosts.length
      }
    }
    return paginatePosts(filteredPosts, currentPage, postsPerPage)
  }, [filteredPosts, currentPage, postsPerPage, showPagination])

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('')
    setSelectedTag('')
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    // Scroll to top of posts section
    document.getElementById('blog-posts')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Reset page when filters change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
  }

  const handleTagChange = (tag: string) => {
    setSelectedTag(tag)
    setCurrentPage(1)
  }

  return (
    <section className="py-20 px-4" id="blog-posts">
      <div className="max-w-6xl mx-auto">
        {showTitle && (
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-mono mb-4">Latest Posts</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Dive deep into low-level programming, kernel development, and hardware design
            </p>
          </div>
        )}

        {showFilters && (
          <div className="mb-8">
            <BlogFilters
              searchQuery={searchQuery}
              selectedCategory={selectedCategory}
              selectedTag={selectedTag}
              onSearchChange={handleSearchChange}
              onCategoryChange={handleCategoryChange}
              onTagChange={handleTagChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}

        {paginatedData.posts.length > 0 ? (
          <>
            <div className="mb-8">
              <BlogGrid posts={paginatedData.posts} />
            </div>

            {showPagination && paginatedData.totalPages > 1 && (
              <div className="mb-8">
                <BlogPagination
                  currentPage={paginatedData.currentPage}
                  totalPages={paginatedData.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}

            {!showPagination && !maxPosts && (
              <div className="text-center">
                <Button variant="outline" size="lg" className="font-mono">
                  View All Posts
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No posts found matching your criteria.
            </p>
            <Button variant="outline" onClick={handleClearFilters} className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}

        {showFilters && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            Showing {paginatedData.posts.length} of {paginatedData.totalPosts} posts
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogSection