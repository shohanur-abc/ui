"use client"
import { Highlight, themes } from 'prism-react-renderer'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
    code: string
    language?: string
    theme?: keyof typeof themes,
    className?: string
}
export const CodeBlock = ({ code, language = 'tsx', theme = 'nightOwl', className = 'bg-slate-800 text-sm overflow-auto' }: CodeBlockProps) => {
    return (
        <section className={className}>
            <Highlight theme={themes[theme]} code={code} language={language} >
                {({ className, style, tokens, getLineProps, getTokenProps }) => (
                    <pre className={cn(className, 'text-sm leading-5.5 p-4')} style={{ ...style, background: 'transparent', margin: 0 }}>
                        {tokens.map((line, i) => (
                            <div key={i} {...getLineProps({ line })}>
                                <span className="inline-block w-12 text-right pr-4 select-none text-zinc-500 text-xs">{i + 1}</span>
                                {line.map((token, key) => (
                                    <span key={key} {...getTokenProps({ token })} />
                                ))}
                            </div>
                        ))}
                    </pre>
                )}
            </Highlight>
        </section>
    )
}