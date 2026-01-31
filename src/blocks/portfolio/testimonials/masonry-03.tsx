import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    accent?: boolean
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Words of Appreciation" />
                </div>

                <MasonryGrid items={[
                    {
                        quote: "Remarkable work that transformed our entire digital strategy.",
                        author: "Victoria Adams",
                        role: "CMO, BrandForce",
                        avatar: "https://i.pravatar.cc/100?img=36",
                    },
                    {
                        quote: "The team's dedication to excellence was evident in every deliverable. Our platform has never performed better.",
                        author: "Marcus Johnson",
                        role: "CTO, TechVentures",
                        avatar: "https://i.pravatar.cc/100?img=37",
                        accent: true,
                    },
                    {
                        quote: "A perfect blend of creativity and technical expertise.",
                        author: "Sophia Williams",
                        role: "Product Lead, DesignFirst",
                        avatar: "https://i.pravatar.cc/100?img=38",
                    },
                    {
                        quote: "Incredible attention to detail!",
                        author: "Benjamin Harris",
                        role: "Founder, AppMasters",
                        avatar: "https://i.pravatar.cc/100?img=39",
                    },
                    {
                        quote: "The results speak for themselves. Our conversion rate increased by 250% within the first quarter.",
                        author: "Rachel Green",
                        role: "VP Marketing, ConvertPro",
                        avatar: "https://i.pravatar.cc/100?img=40",
                        accent: true,
                    },
                    {
                        quote: "Professional and responsive throughout the entire project.",
                        author: "Andrew Kim",
                        role: "Director, CloudFirst",
                        avatar: "https://i.pravatar.cc/100?img=41",
                    },
                    {
                        quote: "True partners who understand both design and business objectives.",
                        author: "Nina Patel",
                        role: "CEO, GrowthLab",
                        avatar: "https://i.pravatar.cc/100?img=42",
                    },
                    {
                        quote: "Game-changing!",
                        author: "Tom Anderson",
                        role: "CTO, ScaleUp",
                        avatar: "https://i.pravatar.cc/100?img=43",
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const MasonryGrid = ({ items }: { items: TestimonialItem[] }) => (
    <div className="columns-1 @md:columns-2 @xl:columns-3 gap-6 space-y-6">
        {items.map(({ quote, author, role, avatar, accent }, i) => (
            <div 
                key={i} 
                className={`break-inside-avoid p-6 rounded-xl ${accent ? 'bg-primary text-primary-foreground' : 'bg-background shadow-sm border'}`}
            >
                <Quote className={`size-8 mb-4 ${accent ? 'opacity-30' : 'text-primary/20'}`} />
                <blockquote className={`text-base leading-relaxed mb-6 ${quote.length < 50 ? 'text-lg font-medium' : ''}`}>
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                    <Avatar className={`size-11 ${accent ? 'ring-2 ring-primary-foreground/20' : ''}`}>
                        <AvatarImage src={avatar} />
                        <AvatarFallback className={accent ? 'bg-primary-foreground text-primary' : 'bg-primary text-primary-foreground'}>{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{author}</div>
                        <div className={`text-sm ${accent ? 'opacity-80' : 'text-muted-foreground'}`}>{role}</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
