import { useState } from 'react'

type BlogImageProps = {
  src: string
  alt?: string
  caption?: string
}

const BlogImage = ({ src, alt = '', caption }: BlogImageProps) => {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="rounded-lg border border-border cursor-zoom-in w-full"
        onClick={() => setOpen(true)}
      />
      {caption && <p className="mt-2 text-sm text-muted-foreground">{caption}</p>}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setOpen(false)}>
          <img src={src} alt={alt} className="max-h-[80vh] max-w-[90vw] rounded" />
        </div>
      )}
    </div>
  )
}

export default BlogImage
