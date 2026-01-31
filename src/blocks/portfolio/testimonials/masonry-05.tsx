import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
    projectUrl?: string
    projectName?: string
}

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Portfolio Reviews" />
                    <Title text="Project Testimonials" />
                    <Description text="Feedback linked to the projects that made an impact." />
                </div>

                <MasonryGrid items={[
                    {
                        quote: "The e-commerce platform exceeded all benchmarks. 300% increase in sales.",
                        author: "Patricia Lane",
                        role: "CEO, ShopPro",
                        avatar: "https://i.pravatar.cc/100?img=51",
                        projectUrl: "#",
                        projectName: "E-commerce Platform",
                    },
                    {
                        quote: "Our SaaS dashboard is now the most praised feature by our customers. Exceptional UX work.",
                        author: "Kevin Zhang",
                        role: "CTO, CloudMetrics",
                        avatar: "https://i.pravatar.cc/100?img=52",
                        projectUrl: "#",
                        projectName: "Analytics Dashboard",
                    },
                    {
                        quote: "Mobile app perfection!",
                        author: "Maria Santos",
                        role: "Product VP, AppFirst",
                        avatar: "https://i.pravatar.cc/100?img=53",
                        projectUrl: "#",
                        projectName: "iOS & Android App",
                    },
                    {
                        quote: "The brand identity work completely transformed how customers perceive us. We've seen measurable improvements in brand recognition.",
                        author: "Thomas Wright",
                        role: "CMO, IdentityBrand",
                        avatar: "https://i.pravatar.cc/100?img=54",
                        projectUrl: "#",
                        projectName: "Brand Identity",
                    },
                    {
                        quote: "Website redesign = 2x leads",
                        author: "Emma Davis",
                        role: "Marketing Head, LeadGen",
                        avatar: "https://i.pravatar.cc/100?img=55",
                        projectUrl: "#",
                        projectName: "Website Redesign",
                    },
                    {
                        quote: "The CRM integration streamlined our entire sales process. Best investment in years.",
                        author: "Robert Chen",
                        role: "Sales Director, SalesFlow",
                        avatar: "https://i.pravatar.cc/100?img=56",
                        projectUrl: "#",
                        projectName: "CRM Integration",
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
        {items.map(({ quote, author, role, avatar, projectUrl, projectName }, i) => (
            <Card key={i} className="break-inside-avoid group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                    {projectUrl && projectName && (
                        <Link 
                            href={projectUrl} 
                            className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline mb-4"
                        >
                            <span className="font-medium">{projectName}</span>
                            <ExternalLink className="size-3" />
                        </Link>
                    )}
                    <Quote className="size-8 text-primary/20 mb-3" />
                    <blockquote className={`leading-relaxed mb-4 ${quote.length < 40 ? 'text-lg font-medium' : 'text-base'}`}>
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-3 pt-4 border-t">
                        <Avatar className="size-10 ring-2 ring-transparent group-hover:ring-primary/20 transition-all">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground text-sm">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold text-sm">{author}</div>
                            <div className="text-xs text-muted-foreground">{role}</div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
