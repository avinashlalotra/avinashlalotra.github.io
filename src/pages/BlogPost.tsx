import { useEffect, useRef, useState } from "react";
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
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [toc, setToc] = useState<Array<{ id: string; text: string; level: number }>>([]);
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (!post) return;
    const htmlPath = `/posts/${post.slug}/index.html`;

    fetch(htmlPath)
      .then((res) => {
        if (!res.ok) throw new Error("404");
        return res.text();
      })
      .then((html) => setHtmlContent(html))
      .catch(() => setHtmlContent("<h2>Post not found</h2>"));
  }, [post]);

  // Build TOC from rendered DOM and add ids to headings after the HTML is mounted
  useEffect(() => {
    const build = () => {
      const el = contentRef.current;
      if (!el) return;
      const headings = Array.from(el.querySelectorAll('h2, h3')) as HTMLElement[];
      const newToc: Array<{ id: string; text: string; level: number }> = [];
      headings.forEach((h) => {
        let id = h.id;
        if (!id) {
          id = h.textContent ? h.textContent.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `heading-${Math.random().toString(36).slice(2,6)}`;
          h.id = id;
        }
        const level = h.tagName.toLowerCase() === 'h2' ? 2 : 3;
        newToc.push({ id, text: h.textContent ? h.textContent.trim() : id, level });
      });
      setToc(newToc);

      // Also populate the static TOC area inside the generated HTML (if present)
      try {
        const tocAside = el.querySelector('#post-toc');
        if (tocAside) {
          const list = tocAside.querySelector('.toc-list');
          if (list) {
            list.innerHTML = '';
            newToc.forEach((item) => {
              const li = document.createElement('li');
              const a = document.createElement('a');
              a.textContent = item.text;
              a.href = `#${item.id}`;
              a.className = item.id === activeId ? 'active' : '';
              a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(item.id);
                if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // update active class
                Array.from(list.querySelectorAll('a')).forEach(el => el.classList.remove('active'));
                a.classList.add('active');
              });
              li.appendChild(a);
              list.appendChild(li);
            });
          }
        }
      } catch (err) {
        // ignore DOM errors
        console.warn('TOC populate error', err);
      }
    };

    // run initially and also after a short timeout to allow DOM to mount
    build();
    const t = setTimeout(build, 200);
    return () => clearTimeout(t);
  }, [htmlContent]);

  // Reading progress and active heading tracking
  useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.scrollHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(window.scrollY - (window.scrollY + rect.top - window.scrollY), 0), Math.max(total, 0));
      // fallback progress calculation: proportion of scroll within the element
      const top = rect.top + window.scrollY;
      const height = el.scrollHeight;
      const y = window.scrollY;
      let p = 0;
      if (y <= top) p = 0;
      else if (y >= top + height - window.innerHeight) p = 1;
      else p = (y - top) / (height - window.innerHeight || 1);
      setProgress(Math.round(p * 100));
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).id;
        if (entry.isIntersecting) setActiveId(id);
      });
    }, { root: null, rootMargin: '0px 0px -60% 0px', threshold: 0 });

    // observe headings
    const el = contentRef.current;
    if (el) {
      const heads = Array.from(el.querySelectorAll('h2, h3')) as HTMLElement[];
      heads.forEach(h => observer.observe(h));
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [htmlContent]);

  if (!post) {
    return (
  <div className="min-h-screen flex flex-col px-1 md:px-2 lg:px-2">
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
        {/* reading progress */}
        <div className="w-full h-1 bg-muted/20">
          <div className="h-1 bg-primary transition-all" style={{ width: `${progress}%` }} />
        </div>
        <main className="flex-1">
          <div className="w-full max-w-[1300px] mx-auto">
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

            {/* Render the md2html-generated full post HTML (includes left TOC slot) */}
            <div className="mb-8">
              <div className="px-4 md:px-8 lg:px-12" ref={contentRef} dangerouslySetInnerHTML={{ __html: htmlContent }} />
            </div>

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
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
