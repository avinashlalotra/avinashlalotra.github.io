import { useParams, Navigate } from 'react-router-dom'
import { getPostBySlug, getRelatedPosts } from '@/utils/blog'
import BlogTemplate from '@/components/BlogTemplate'
import BlogGrid from '@/components/BlogGrid'
import { Separator } from '@/components/ui/separator'

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>()
  
  if (!slug) {
    return <Navigate to="/posts" replace />
  }

  const post = getPostBySlug(slug)
  
  if (!post) {
    return <Navigate to="/404" replace />
  }

  const relatedPosts = getRelatedPosts(post)

  // For now, we'll show a basic template. In a real implementation,
  // you would load and render the actual markdown content
  return (
    <div className="min-h-screen">
      <BlogTemplate 
        title={post.title} 
        date={new Date(post.date).toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        })} 
        author={post.author}
      >
        {/* This would normally render the parsed markdown content */}
        <div className="prose prose-invert max-w-none">
          <p className="lead text-muted-foreground">
            {post.excerpt}
          </p>
          
          <div className="not-prose flex flex-wrap gap-2 my-6">
            {post.tags.map((tag) => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full font-mono"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <p>
            This is a placeholder for the full blog post content. In a complete implementation, 
            this would render the parsed markdown content from the blog post file.
          </p>
          
          <h2>Implementation Details</h2>
          <p>
            The actual blog post content would be loaded from markdown files and rendered here. 
            This scalable architecture supports:
          </p>
          
          <ul>
            <li>Dynamic content loading from markdown files</li>
            <li>Frontmatter metadata parsing</li>
            <li>Syntax highlighting for code blocks</li>
            <li>Image optimization and lazy loading</li>
            <li>Related posts suggestions</li>
          </ul>
          
          <h2>Next Steps</h2>
          <p>
            To complete the implementation, you would need to:
          </p>
          
          <ol>
            <li>Set up a markdown parsing system (using libraries like gray-matter and marked)</li>
            <li>Create actual markdown files for your blog posts</li>
            <li>Implement dynamic content loading</li>
            <li>Add syntax highlighting for code blocks</li>
            <li>Set up image optimization</li>
          </ol>
        </div>
      </BlogTemplate>
      
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-muted/5">
          <div className="max-w-6xl mx-auto">
            <Separator className="mb-8" />
            <h3 className="text-2xl font-bold font-mono mb-8 text-center">Related Posts</h3>
            <BlogGrid posts={relatedPosts} />
          </div>
        </section>
      )}
    </div>
  )
}

export default BlogPost