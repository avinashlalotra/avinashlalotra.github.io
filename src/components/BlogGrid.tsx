import { BlogPost } from '@/types/blog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar, Clock, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

interface BlogGridProps {
  posts: BlogPost[]
  showExcerpt?: boolean
}

const BlogGrid = ({ posts, showExcerpt = true }: BlogGridProps) => {
  const navigate = useNavigate()

  const handlePostClick = (slug: string) => {
    navigate(`/posts/${slug}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <Card key={post.id} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20">
          <CardHeader className="space-y-3">
            <div className="flex items-center justify-between">
              <Badge variant="secondary" className="text-xs font-mono">
                {post.category}
              </Badge>
              {post.featured && (
                <Badge variant="outline" className="text-xs">
                  Featured
                </Badge>
              )}
            </div>
            
            <CardTitle 
              className="text-lg font-mono hover:text-primary cursor-pointer transition-colors line-clamp-2"
              onClick={() => handlePostClick(post.slug)}
            >
              {post.title}
            </CardTitle>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime} min</span>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            {showExcerpt && (
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            )}
            
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {post.tags.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{post.tags.length - 3}
                </Badge>
              )}
            </div>
            
            <Button 
              variant="ghost" 
              size="sm" 
              className="group/btn w-full justify-between"
              onClick={() => handlePostClick(post.slug)}
            >
              Read more
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default BlogGrid