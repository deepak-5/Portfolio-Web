import { FC } from 'react'
import { BlogPost } from '@/types/blog'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { CodeBlock } from '@/components/blog/CodeBlock'
import { Mermaid } from '@/components/blog/Mermaid'
import { Info, Lightbulb, AlertTriangle, CheckCircle2, Flame, Quote } from 'lucide-react'

interface BlogContentProps {
  blog: BlogPost
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function getCalloutKind(text: string): { kind: 'info' | 'tip' | 'warning' | 'danger' | 'success'; icon: any; label: string } {
  const lower = text.toLowerCase()
  if (lower.includes('pitfall') || lower.includes('danger') || lower.includes('never') || text.includes('❌') || text.includes('🛑')) {
    return { kind: 'danger', icon: AlertTriangle, label: 'Pitfall' }
  }
  if (lower.includes('warning') || lower.includes('⚠️') || lower.includes('caution')) {
    return { kind: 'warning', icon: AlertTriangle, label: 'Warning' }
  }
  if (lower.includes('pro tip') || lower.includes('🔥') || lower.includes('insight')) {
    return { kind: 'tip', icon: Flame, label: 'Pro Tip' }
  }
  if (lower.includes('tip') || lower.includes('💡') || lower.includes('verdict') || lower.includes('takeaway')) {
    return { kind: 'tip', icon: Lightbulb, label: 'Insight' }
  }
  if (lower.includes('✅') || lower.includes('success') || lower.includes('fix')) {
    return { kind: 'success', icon: CheckCircle2, label: 'Success' }
  }
  return { kind: 'info', icon: Info, label: 'Note' }
}

export const BlogContent: FC<BlogContentProps> = ({ blog }) => {
  return (
    <article className="prose prose-neutral dark:prose-invert max-w-none prose-p:leading-7 prose-p:text-[15px] prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400">
      {blog.content && (
        <div className="blog-prose">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ children }) => {
                const text = String(children)
                const id = slugify(text)
                return (
                  <h1 id={id} className="group flex items-center gap-3 text-2xl sm:text-3xl font-bold mt-10 mb-4 scroll-mt-24 text-neutral-900 dark:text-white">
                    <span className="hidden sm:inline-flex h-8 w-1 rounded-full bg-gradient-to-b from-blue-500 to-violet-500" />
                    <span>{children}</span>
                    <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-blue-500 transition-opacity text-lg">
                      #
                    </a>
                  </h1>
                )
              },
              h2: ({ children }) => {
                const text = String(children)
                const id = slugify(text)
                return (
                  <div className="mt-12 mb-6">
                    <div className="h-px w-full bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-transparent mb-6" />
                    <h2 id={id} className="group flex items-start gap-3 text-xl sm:text-2xl font-bold scroll-mt-24 text-neutral-900 dark:text-white">
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-500 shrink-0" />
                      <span className="flex-1 leading-tight">{children}</span>
                      <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-blue-500 transition-opacity text-base mt-1">
                        #
                      </a>
                    </h2>
                  </div>
                )
              },
              h3: ({ children }) => {
                const text = String(children)
                const id = slugify(text)
                return (
                  <h3 id={id} className="group flex items-center gap-2 text-lg font-semibold mt-8 mb-3 scroll-mt-24 text-neutral-900 dark:text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span>{children}</span>
                    <a href={`#${id}`} className="opacity-0 group-hover:opacity-100 text-neutral-300 hover:text-blue-500 text-sm">
                      #
                    </a>
                  </h3>
                )
              },
              p: ({ children }) => {
                // Detect callout-like paragraphs? We'll handle blockquote separately.
                // But inline check for TL;DR styled as paragraph starting with >
                return <p className="my-4 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">{children}</p>
              },
              blockquote: ({ children }) => {
                // Extract text to determine kind
                let text = ''
                try {
                  // children is React nodes; get string via simple traversal when possible
                  const walk = (n: any): string => {
                    if (typeof n === 'string') return n
                    if (Array.isArray(n)) return n.map(walk).join('')
                    if (n?.props?.children) return walk(n.props.children)
                    return ''
                  }
                  text = walk(children)
                } catch {}
                const { kind, icon: Icon, label } = getCalloutKind(text)

                const styles: Record<string, string> = {
                  info: 'border-blue-500/30 bg-blue-500/[0.06] dark:bg-blue-500/[0.08]',
                  tip: 'border-emerald-500/30 bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08]',
                  warning: 'border-amber-500/30 bg-amber-500/[0.06] dark:bg-amber-500/[0.08]',
                  danger: 'border-red-500/30 bg-red-500/[0.06] dark:bg-red-500/[0.08]',
                  success: 'border-emerald-500/30 bg-emerald-500/[0.06]',
                }
                const iconBg: Record<string, string> = {
                  info: 'bg-blue-500 text-white',
                  tip: 'bg-emerald-500 text-white',
                  warning: 'bg-amber-500 text-white',
                  danger: 'bg-red-500 text-white',
                  success: 'bg-emerald-500 text-white',
                }

                return (
                  <div className={`my-6 rounded-2xl border-l-4 p-4 sm:p-5 ${styles[kind]} flex gap-3 sm:gap-4`}>
                    <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${iconBg[kind]}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-mono-tech text-[11px] font-semibold tracking-wider uppercase opacity-60 mb-1">{label}</div>
                      <div className="text-sm leading-relaxed text-neutral-800 dark:text-neutral-200 [&_p]:my-1 [&_strong]:font-semibold">{children}</div>
                    </div>
                  </div>
                )
              },
              ul: ({ children }) => <ul className="my-4 space-y-2 list-none pl-0">{children}</ul>,
              ol: ({ children }) => <ol className="my-4 space-y-2 list-decimal pl-6 marker:text-blue-500 marker:font-mono-tech marker:text-sm">{children}</ol>,
              li: ({ children }) => (
                <li className="relative pl-6 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300 before:content-[''] before:absolute before:left-0 before:top-[0.7em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-blue-500">
                  <span>{children}</span>
                </li>
              ),
              a: ({ children, href }) => (
                <a href={href} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined} className="text-blue-600 dark:text-blue-400 underline decoration-blue-500/30 underline-offset-4 hover:decoration-blue-500 font-medium">
                  {children}
                </a>
              ),
              code: ({ children, className }) => {
                const isInline = !className
                if (isInline) {
                  return (
                    <code className="px-1.5 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/15 text-blue-600 dark:text-blue-300 font-mono-tech text-[13px] font-medium whitespace-nowrap">
                      {children}
                    </code>
                  )
                }
                return <code className={className}>{children}</code>
              },
              pre: ({ children }) => {
                // children is <code> element with className like language-typescript
                // Extract language and code string
                let codeString = ''
                let language = ''
                try {
                  const codeEl: any = Array.isArray(children) ? children[0] : children
                  const props = codeEl?.props
                  codeString = props?.children ? String(props.children).replace(/\n$/, '') : ''
                  const cls: string = props?.className || ''
                  const match = cls.match(/language-(\w+)/)
                  language = match ? match[1] : ''
                } catch {}

                if (language === 'mermaid') {
                  return <Mermaid code={codeString} id={slugify(codeString.slice(0, 20))} />
                }

                return <CodeBlock code={codeString} language={language || 'plaintext'} />
              },
              table: ({ children }) => (
                <div className="my-6 overflow-hidden rounded-2xl border border-black/8 dark:border-white/[0.08] shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">{children}</table>
                  </div>
                </div>
              ),
              thead: ({ children }) => <thead className="bg-black/[0.03] dark:bg-white/[0.04] border-b border-black/8 dark:border-white/[0.08]">{children}</thead>,
              th: ({ children }) => <th className="px-4 py-3 text-left font-mono-tech text-xs font-semibold tracking-wider uppercase text-neutral-700 dark:text-white/80 whitespace-nowrap">{children}</th>,
              td: ({ children }) => <td className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300 border-t border-black/5 dark:border-white/5 align-top">{children}</td>,
              hr: () => <hr className="my-8 h-px border-0 bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent" />,
              strong: ({ children }) => <strong className="font-semibold text-neutral-900 dark:text-white">{children}</strong>,
              em: ({ children }) => <em className="italic text-neutral-700 dark:text-neutral-300">{children}</em>,
              img: ({ src, alt }) => (
                <span className="my-6 block overflow-hidden rounded-2xl border border-black/8 dark:border-white/[0.08]">
                  <img src={src} alt={alt || ''} className="w-full h-auto" />
                  {alt && <span className="block px-4 py-2 bg-black/[0.02] dark:bg-white/[0.02] font-mono-tech text-xs text-neutral-500 dark:text-white/40 text-center">{alt}</span>}
                </span>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      )}

      {blog.externalUrl && (
        <div className="mt-8 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <div className="font-mono-tech text-xs font-semibold">Original on Medium</div>
              <div className="text-xs text-neutral-500 dark:text-white/40">Continue discussion • Claps & comments welcome</div>
            </div>
          </div>
          <a
            href={blog.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-mono-tech text-xs font-medium transition-colors shrink-0"
          >
            Read on Medium <ExternalLinkIcon />
          </a>
        </div>
      )}

      <style>{`
        .blog-prose pre { background: transparent; padding: 0; margin: 0; }
        .blog-prose code { font-family: var(--font-geist-mono), ui-monospace, monospace; }
      `}</style>
    </article>
  )
}

function ExternalLinkIcon() {
  return (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  )
}
