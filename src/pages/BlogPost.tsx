import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug, blogPosts } from "@/data/posts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import BlogCard from "@/components/BlogCard";
import { Helmet } from "react-helmet";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug || "");
  const [htmlContent, setHtmlContent] = useState("<p>Loading...</p>");

  useEffect(() => {
    if (!post) return;
    const htmlPath = `/posts/html/${post.slug}.html`;

    fetch(htmlPath)
      .then((res) => {
        if (!res.ok) throw new Error("404");
        return res.text();
      })
      .then((html) => setHtmlContent(html))
      .catch(() => setHtmlContent("<h2>Post not found</h2>"));
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container py-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{post.title} | Bits, Boot & Beyond</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(", ")} />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <article className="container py-10 max-w-4xl">
            <Button asChild variant="ghost" className="mb-6">
              <Link to="/">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Articles
              </Link>
            </Button>

            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 mb-4">
                <Badge className="text-sm px-3 py-1">{post.category}</Badge>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.readTime} min read
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-xl text-muted-foreground">{post.excerpt}</p>

              <div className="flex items-center gap-3 mt-6 pt-6 border-t">
                <div className="h-12 w-12 rounded-full bg-gradient-hero flex items-center justify-center text-white font-bold">
                  {post.author[0]}
                </div>
                <div>
                  <div className="font-medium">{post.author}</div>
                  <div className="text-sm text-muted-foreground">Author</div>
                </div>
              </div>
            </header>

            <Card className="mb-8">
              <CardContent className="prose prose-lg dark:prose-invert max-w-none pt-6">
                <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
              </CardContent>
            </Card>

            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  #{tag}
                </Badge>
              ))}
            </div>

            {relatedPosts.length > 0 && (
              <section className="mt-16 pt-16 border-t">
                <h2 className="text-3xl font-bold mb-8">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard key={relatedPost.id} post={relatedPost} />
                  ))}
                </div>
              </section>
            )}
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
