import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    size?: 'sm' | 'md' | 'lg'
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Wall of Love" />
                    <Description text="A curated collection of client feedback." />
                </div>

                <MasonryGrid items={[
                    {
                        quote: "The best investment we made this year. Our new website has completely transformed how customers perceive our brand and interact with our products.",
                        author: "Michelle Thompson",
                        role: "CEO, BrandFirst",
                        avatar: "https://i.pravatar.cc/100?img=19",
                        size: 'lg',
                    },
                    {
                        quote: "Exceptional quality and on-time delivery.",
                        author: "James Wilson",
                        role: "CTO, TechCorp",
                        avatar: "https://i.pravatar.cc/100?img=20",
                        size: 'sm',
                    },
                    {
                        quote: "Professional, creative, and technically excellent. A true partner we can rely on for all our digital needs.",
                        author: "Sarah Kim",
                        role: "VP Product, ScaleUp",
                        avatar: "https://i.pravatar.cc/100?img=21",
                        size: 'md',
                    },
                    {
                        quote: "Brilliant execution!",
                        author: "David Chen",
                        role: "Founder, AppStart",
                        avatar: "https://i.pravatar.cc/100?img=22",
                        size: 'sm',
                    },
                    {
                        quote: "The attention to detail and commitment to quality was outstanding. Every aspect of the project was handled with expertise.",
                        author: "Emily Foster",
                        role: "Marketing Director, GrowthLab",
                        avatar: "https://i.pravatar.cc/100?img=23",
                        size: 'md',
                    },
                    {
                        quote: "A seamless experience from start to finish. Communication was excellent throughout the entire project lifecycle.",
                        author: "Michael Park",
                        role: "COO, Enterprise Inc",
                        avatar: "https://i.pravatar.cc/100?img=24",
                        size: 'md',
                    },
                    {
                        quote: "Highly recommended!",
                        author: "Lisa Wang",
                        role: "Director, DesignStudio",
                        avatar: "https://i.pravatar.cc/100?img=25",
                        size: 'sm',
                    },
                    {
                        quote: "Working with this team was transformative for our business. The technical expertise and creative vision resulted in a product that exceeded our wildest expectations.",
                        author: "Robert Taylor",
                        role: "CEO, InnovateTech",
                        avatar: "https://i.pravatar.cc/100?img=26",
                        size: 'lg',
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const MasonryGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="columns-1 @md:columns-2 @xl:columns-3 gap-4 space-y-4">
        {items.map(({ quote, author, role, avatar, size = 'md' }, i) => (
            <Card key={i} className="break-inside-avoid">
                <CardContent className={`${size === 'lg' ? 'p-8' : size === 'sm' ? 'p-4' : 'p-6'}`}>
                    {size !== 'sm' && <Quote className={`${size === 'lg' ? 'size-10' : 'size-8'} text-primary/20 mb-4`} />}
                    <blockquote className={`leading-relaxed mb-4 ${size === 'lg' ? 'text-lg @md:text-xl' : size === 'sm' ? 'text-sm' : 'text-base'}`}>
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3">
                        <Avatar className={size === 'lg' ? 'size-12' : size === 'sm' ? 'size-8' : 'size-10'}>
                            <AvatarImage src={avatar} />
                            <AvatarFallback className={`bg-primary text-primary-foreground ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className={`font-semibold ${size === 'sm' ? 'text-sm' : ''}`}>{author}</div>
                            <div className={`text-muted-foreground ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>{role}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
