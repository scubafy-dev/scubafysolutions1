import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

type Props = {
  content: string
}

export function MarkdownContent({ content }: Props) {
  return (
    <div className="blog-prose space-y-6 font-mono text-sm leading-relaxed text-foreground/85">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="font-[var(--font-bebas)] text-4xl tracking-tight text-foreground pt-4">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="font-[var(--font-bebas)] text-3xl tracking-tight text-foreground pt-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="font-[var(--font-bebas)] text-2xl tracking-tight text-foreground pt-2">{children}</h3>
          ),
          p: ({ children }) => <p className="leading-relaxed">{children}</p>,
          a: ({ href, children }) => (
            <a href={href} className="text-accent hover:underline underline-offset-4" target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          ul: ({ children }) => <ul className="list-disc pl-5 space-y-2">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-5 space-y-2">{children}</ol>,
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-accent/60 pl-4 text-muted-foreground italic">{children}</blockquote>
          ),
          code: ({ children, className }) => {
            const isBlock = Boolean(className)
            if (isBlock) {
              return (
                <code className="block overflow-x-auto border border-border/40 bg-muted/30 p-4 text-xs">{children}</code>
              )
            }
            return <code className="border border-border/40 bg-muted/30 px-1.5 py-0.5 text-xs">{children}</code>
          },
          img: ({ src, alt }) => {
            if (!src || typeof src !== "string") return null
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt || ""}
                className="my-8 w-full border border-border/30 object-cover"
                loading="lazy"
              />
            )
          },
          hr: () => <hr className="border-border/30 my-8" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
