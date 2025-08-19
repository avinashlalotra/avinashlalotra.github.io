import { useEffect, useRef, useState } from 'react'

type TerminalProps = {
  lines?: string[]
  speed?: number // ms per character
  className?: string
  autoStart?: boolean
}

const Terminal = ({
  lines = ["Welcome ..!"],
  speed = 30,
  className = '',
  autoStart = true,
}: TerminalProps) => {
  const [displayed, setDisplayed] = useState<string[]>([])
  const [curLineIdx, setCurLineIdx] = useState(0)
  const [curText, setCurText] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIdx, setHistoryIdx] = useState<number | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (curLineIdx >= lines.length) return

    const line = lines[curLineIdx]
    let i = 0
    setCurText('')

    const t = setInterval(() => {
      i += 1
      setCurText(line.slice(0, i))
      if (i >= line.length) {
        clearInterval(t)
        setDisplayed((d) => [...d, line])
        // small pause before next line
        setTimeout(() => setCurLineIdx((n) => n + 1), 300)
      }
    }, speed)

    return () => clearInterval(t)
  }, [curLineIdx, lines, speed])

  // focus input when initial typing finishes
  useEffect(() => {
    if (curLineIdx >= lines.length) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [curLineIdx, lines.length])

  // If autoStart is enabled, skip the typewriter animation and show input immediately
  useEffect(() => {
    if (autoStart) {
      setDisplayed(lines.slice())
      setCurLineIdx(lines.length)
      setCurText('')
      setTimeout(() => inputRef.current?.focus(), 50)
    }
    // run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pushOutput = (linesOut: string[] | string) => {
    const arr = Array.isArray(linesOut) ? linesOut : [linesOut]
    setDisplayed((d) => [...d, ...arr])
  }

  const handleCommand = (raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return
    // echo command as entered
    setDisplayed((d) => [...d, `$ ${cmd}`])

    const parts = cmd.split(/\s+/)
    const base = parts[0]

    switch (base) {
      case 'help':
        pushOutput(["Available commands: help, whoami, echo, ls, date, clear"])
        break
      case 'whoami':
        pushOutput('abinash')
        break
      case 'echo':
        pushOutput(parts.slice(1).join(' '))
        break
      case 'ls':
        pushOutput(['projects  notes  README.md'])
        break
      case 'date':
        pushOutput(new Date().toString())
        break
      case 'clear':
        setDisplayed([])
        break
      default:
        pushOutput(`${base}: command not found`)
    }
  }

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue)
      setHistory((h) => [inputValue, ...h].slice(0, 50))
      setHistoryIdx(null)
      setInputValue('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIdx((idx) => {
        const next = idx === null ? 0 : Math.min((idx || 0) + 1, history.length - 1)
        const val = history[next] ?? ''
        setInputValue(val)
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIdx((idx) => {
        if (idx === null) return null
        const next = idx - 1
        const val = history[next] ?? ''
        setInputValue(val)
        return next >= 0 ? next : null
      })
    }
  }

  const skipTyping = () => {
    if (curLineIdx < lines.length) {
      setDisplayed(lines.slice())
      setCurLineIdx(lines.length)
      setCurText('')
    }
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={skipTyping}
      onKeyDown={(e) => { if (e.key === 'Enter') skipTyping() }}
      className={`terminal-window w-full font-mono text-base ${className}`}
    >
      <div className="terminal-body">
        {displayed.map((l, idx) => (
          <div className="terminal-line" key={idx}>
            <span className="terminal-prompt">$</span>
            <span className="terminal-text"> {l}</span>
          </div>
        ))}

        {curLineIdx < lines.length ? (
          <div className="terminal-line terminal-current">
            <span className="terminal-prompt">$</span>
            <span className="terminal-text"> {curText}</span>
            <span className="terminal-cursor" />
          </div>
        ) : (
          <div className="terminal-line terminal-input-line">
            <span className="terminal-prompt">$</span>
            <input
              ref={inputRef}
              autoFocus
              placeholder="type a command (help for list)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
              className="terminal-input"
              spellCheck={false}
              aria-label="terminal input"
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Terminal
