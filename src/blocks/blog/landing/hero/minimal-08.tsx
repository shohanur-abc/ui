import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative" data-theme="emerald">
            <div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
                <div className="flex flex-col">
                    <Quote text="The best way to learn is to build in public and share what you learn along the way." />
                    <Author name="Sarah Chen" role="Software Engineer" />
                    <ReadLink href="/articles" />
                </div>
            </div>
        </section>
    )
}

interface QuoteProps {
    text: string
}

const Quote = ({ text }: QuoteProps) => (
    <blockquote className="text-2xl @sm:text-3xl @md:text-4xl font-medium leading-relaxed mb-8 relative">
        <span className="text-primary text-6xl absolute -left-8 -top-4 opacity-20">&ldquo;</span>
        {text}
    </blockquote>
)

interface AuthorProps {
    name: string
    role: string
}

const Author = ({ name, role }: AuthorProps) => (
    <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-px bg-border" />
        <div>
            <p className="font-medium">{name}</p>
            <p className="text-sm text-muted-foreground">{role}</p>
        </div>
    </div>
)

interface ReadLinkProps {
    href: string
}

const ReadLink = ({ href }: ReadLinkProps) => (
    <Link
        href={href}
        className="text-sm font-medium text-primary hover:underline"
    >
        Read my thoughts →
    </Link>
)
