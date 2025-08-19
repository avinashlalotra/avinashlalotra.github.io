import { useState } from 'react'

type CodeBlockProps = {
  code: string
  language?: string
  showLineNumbers?: boolean
}

const CodeBlock = ({ code, language = 'bash', showLineNumbers = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (e) {
      // fallback: select text
      console.warn('copy failed', e)
    }
  }

  const lines = code.split('\n')

  return (
    <div className="relative bg-card p-4 rounded-md border border-border overflow-auto">
      <div className="absolute top-3 right-3 flex items-center gap-2">
        <button
          className="px-2 py-1 text-xs rounded bg-secondary text-secondary-foreground hover:opacity-90"
          onClick={handleCopy}
          aria-label="Copy code"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      <pre className="whitespace-pre-wrap">
        {showLineNumbers ? (
          <code className="flex">
            <ol className="pr-4 text-muted-foreground text-right select-none" aria-hidden>
              {lines.map((_, i) => (
                <li key={i} className="leading-6">{i + 1}</li>
              ))}
            </ol>
            <div className="pl-4">
              {lines.map((l, i) => (
                <div key={i} className="leading-6 text-sm font-mono text-foreground">{l || '\u00A0'}</div>
              ))}
            </div>
          </code>
        ) : (
          <code className="text-sm font-mono text-foreground">{code}</code>
        )}
      </pre>
    </div>
  )
}

export default CodeBlock
