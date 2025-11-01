import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { BlogPost } from "@/data/posts";

interface BlogCardProps {
  post: BlogPost;
}

const categoryColors = {
  Linux: "bg-primary/10 text-primary hover:bg-primary/20",
  Embedded: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  SoC: "bg-accent/10 text-accent hover:bg-accent/20",
  FPGA: "bg-tech-cyan/10 text-tech-cyan hover:bg-tech-cyan/20",
};

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/posts/${post.slug}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-start justify-between gap-2 mb-3">
            <Badge className={categoryColors[post.category]}>
              {post.category}
            </Badge>
            <div className="flex items-center text-xs text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {post.readTime} min
            </div>
          </div>
          <h3 className="text-xl font-bold line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs rounded-md bg-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default BlogCard;
