import CodeBlock from '@/components/ui/CodeBlock'
import BlogImage from '@/components/ui/BlogImage'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type BlogTemplateProps = {
  title: string
  date?: string
  author?: string
  children?: React.ReactNode
}

const BlogTemplate = ({ title, date, author, children }: BlogTemplateProps) => {
  const navigate = useNavigate()

  const goBack = () => {
    // try to go back in history; if not possible, go to home
    try {
      navigate(-1)
    } catch (e) {
      navigate('/')
    }
  }

  return (
    <article className="prose prose-invert max-w-4xl mx-auto px-4 py-12">
      <div className="mb-6">
        <Button variant="ghost" size="sm" onClick={goBack}>
          ← Back
        </Button>
      </div>

      <header className="mb-8">
        <h1 className="text-4xl font-bold font-mono">{title}</h1>
        <div className="text-sm text-muted-foreground mt-2">
          <span>{date}</span>
          {author && <span className="mx-2">•</span>}
          {author && <span>{author}</span>}
        </div>
      </header>

      <section className="prose prose-invert leading-relaxed">
        {children}
      </section>
    </article>
  )
}

export default BlogTemplate
