import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Star, ArrowUpRight } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    projectType: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Client Stories" />
                    <Title text="Success Stories" />
                    <Description text="Real results from real partnerships across various industries." />
                </div>

                <TestimonialGrid items={[
                    {
                        quote: "The website redesign led to a 150% increase in leads within the first quarter.",
                        author: "Alex Turner",
                        role: "Marketing VP",
                        company: "GrowthCo",
                        avatar: "https://i.pravatar.cc/100?img=60",
                        rating: 5,
                        projectType: "Website Redesign",
                    },
                    {
                        quote: "Our e-commerce platform now handles 10x the traffic with better performance.",
                        author: "Priya Sharma",
                        role: "CTO",
                        company: "ShopElite",
                        avatar: "https://i.pravatar.cc/100?img=61",
                        rating: 5,
                        projectType: "E-commerce Platform",
                    },
                    {
                        quote: "The mobile app they built has become our primary customer touchpoint.",
                        author: "David Kim",
                        role: "Product Head",
                        company: "MobileFirst",
                        avatar: "https://i.pravatar.cc/100?img=62",
                        rating: 5,
                        projectType: "Mobile App",
                    },
                    {
                        quote: "Dashboard analytics transformed how we make business decisions daily.",
                        author: "Sarah Chen",
                        role: "CEO",
                        company: "DataInsight",
                        avatar: "https://i.pravatar.cc/100?img=63",
                        rating: 5,
                        projectType: "Analytics Dashboard",
                    },
                    {
                        quote: "Brand identity overhaul resulted in 40% better brand recognition scores.",
                        author: "Michael Ross",
                        role: "Brand Director",
                        company: "IdentityPro",
                        avatar: "https://i.pravatar.cc/100?img=64",
                        rating: 5,
                        projectType: "Brand Identity",
                    },
                    {
                        quote: "The CRM integration streamlined our entire sales process beautifully.",
                        author: "Jennifer Liu",
                        role: "Sales Director",
                        company: "SalesFlow",
                        avatar: "https://i.pravatar.cc/100?img=65",
                        rating: 5,
                        projectType: "CRM Integration",
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge>{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const TestimonialGrid = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-5">
        {items.map(({ quote, author, role, company, avatar, rating, projectType }, i) => (
            <li key={i}>
                <Card className="h-full group hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                    <CardContent className="p-5 flex flex-col h-full">
                        <div className="flex items-center justify-between mb-3">
                            <Badge variant="secondary" className="text-xs">{projectType}</Badge>
                            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex gap-0.5 mb-3">
                            {Array.from({ length: 5 }).map((_, j) => (
                                <Star key={j} className={`size-3.5 ${j < rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                            ))}
                        </div>
                        <blockquote className="text-sm leading-relaxed mb-4 flex-1">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-3 pt-3 border-t">
                            <Avatar className="size-9">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="text-xs">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-sm">{author}</div>
                                <div className="text-xs text-muted-foreground">{role}, {company}</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
