import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-5 gap-8 @xl:gap-12 items-center">
                    <div className="@3xl:col-span-2">
                        <ImageColumn
                            src="https://picsum.photos/seed/approach/600/800"
                            alt="My approach visualization"
                        />
                    </div>

                    <div className="@3xl:col-span-3">
                        <ContentColumn
                            eyebrow="My Approach"
                            title="Human-Centered Development"
                            description="Technology should serve people, not the other way around. I approach every project with empathy, understanding that behind every feature request is a real person with real needs."
                            quote={{
                                text: "The best code is the code that solves real problems for real people.",
                                author: "Personal Philosophy",
                            }}
                            highlights={[
                                'Empathy-driven design',
                                'Clear communication',
                                'Agile methodology',
                                'Continuous feedback',
                            ]}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

interface ImageColumnProps {
    src: string
    alt: string
}

const ImageColumn = ({ src, alt }: ImageColumnProps) => (
    <div className="aspect-[3/4] rounded-2xl @md:rounded-3xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

interface ContentColumnProps {
    eyebrow: string
    title: string
    description: string
    quote: { text: string; author: string }
    highlights: string[]
}

const ContentColumn = ({ eyebrow, title, description, quote, highlights }: ContentColumnProps) => (
    <div>
        <Badge variant="outline" className="mb-3 @md:mb-4">
            {eyebrow}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
            {title}
        </h2>
        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
            {description}
        </p>

        <Card className="py-0 mb-6 @md:mb-8 bg-muted/30 border-l-4 border-l-primary">
            <CardContent className="p-5 @md:p-6">
                <Quote className="size-6 text-primary/30 mb-2" />
                <p className="text-base @md:text-lg font-medium italic mb-2">{quote.text}</p>
                <p className="text-sm text-muted-foreground">— {quote.author}</p>
            </CardContent>
        </Card>

        <div className="flex flex-wrap gap-2 @md:gap-3">
            {highlights.map((item, i) => (
                <span key={i} className="px-3 py-1.5 text-sm rounded-full bg-primary/10 text-primary">
                    {item}
                </span>
            ))}
        </div>
    </div>
)
