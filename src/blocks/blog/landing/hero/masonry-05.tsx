import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header title="Wisdom from the Community" />
                <MasonryGrid
                    quotes={[
                        { text: 'The best way to predict the future is to create it.', author: 'Alan Kay', topic: 'Innovation', featured: true },
                        { text: "Code is like humor. When you have to explain it, it's bad.", author: 'Cory House', topic: 'Clean Code', featured: false },
                        { text: 'First, solve the problem. Then, write the code.', author: 'John Johnson', topic: 'Problem Solving', featured: false },
                        { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', author: 'Martin Fowler', topic: 'Best Practices', featured: true },
                        { text: 'Simplicity is the soul of efficiency.', author: 'Austin Freeman', topic: 'Design', featured: false },
                        { text: 'The only way to go fast is to go well.', author: 'Robert C. Martin', topic: 'Quality', featured: false },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
}

const Header = ({ title }: HeaderProps) => (
    <div className="text-center mb-10">
        <Quote className="size-8 text-primary mx-auto mb-4" />
        <h1 className="text-3xl @md:text-4xl font-bold">{title}</h1>
    </div>
)

interface QuoteItem {
    text: string
    author: string
    topic: string
    featured: boolean
}

interface MasonryGridProps {
    quotes: QuoteItem[]
}

const MasonryGrid = ({ quotes }: MasonryGridProps) => (
    <div className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 space-y-4">
        {quotes.map((quote) => (
            <Link key={quote.text} href="#" className="block break-inside-avoid">
                <Card className={`group transition-all hover:shadow-lg ${quote.featured ? 'bg-gradient-to-br from-primary/10 to-card border-primary/20' : ''}`}>
                    <CardContent className={`${quote.featured ? 'p-6' : 'p-5'}`}>
                        <Badge variant="secondary" className="mb-4 text-xs">
                            {quote.topic}
                        </Badge>
                        <blockquote className={`${quote.featured ? 'text-xl' : 'text-base'} font-medium leading-relaxed mb-4`}>
                            &ldquo;{quote.text}&rdquo;
                        </blockquote>
                        <p className="text-sm text-muted-foreground">— {quote.author}</p>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
