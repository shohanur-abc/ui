'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Quote, ArrowRight } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    projectUrl?: string
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Portfolio" />
                    <Title text="Linked Masonry" />
                    <Description text="Testimonials linked to project showcases." />
                </div>

                <LinkedMasonry
                    items={[
                        { quote: "The e-commerce platform they built handles millions in monthly transactions flawlessly.", author: "Patricia Lane", role: "CEO", company: "ShopMaster", avatar: "https://i.pravatar.cc/100?img=43", projectUrl: "#" },
                        { quote: "Amazing mobile app!", author: "Kevin Z.", role: "CPO", company: "AppPro", avatar: "https://i.pravatar.cc/100?img=44", projectUrl: "#" },
                        { quote: "The SaaS dashboard transformed our operations completely.", author: "Maria Santos", role: "COO", company: "SaaSTransform", avatar: "https://i.pravatar.cc/100?img=45", projectUrl: "#" },
                        { quote: "Brand redesign success.", author: "James W.", role: "CMO", company: "RebrandCo", avatar: "https://i.pravatar.cc/100?img=46", projectUrl: "#" },
                        { quote: "The marketing website generates 500+ qualified leads monthly for our sales team.", author: "Emily Foster", role: "VP Marketing", company: "LeadGenPro", avatar: "https://i.pravatar.cc/100?img=47", projectUrl: "#" },
                        { quote: "Portfolio site perfection.", author: "Mike P.", role: "Founder", company: "PortfolioCo", avatar: "https://i.pravatar.cc/100?img=48", projectUrl: "#" },
                    ]}
                />
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

const LinkedMasonry = ({ items }: { items: TestimonialItem[] }) => (
    <div className="max-w-6xl mx-auto columns-1 @sm:columns-2 @lg:columns-3 gap-5">
        {items.map(({ quote, author, role, avatar, projectUrl }, i) => (
            <div key={i} className="break-inside-avoid mb-5">
                <div className="bg-background border rounded-xl p-5 shadow-sm group hover:shadow-md transition-all">
                    <Quote className="size-5 text-primary/20 mb-2" />
                    <blockquote className="text-sm leading-relaxed mb-4">
                        &ldquo;{quote}&rdquo;
                    </blockquote>
                    <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center gap-2.5">
                            <Avatar className="size-8">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-muted text-xs">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-medium text-xs">{author}</div>
                                <div className="text-xs text-muted-foreground">{role}</div>
                            </div>
                        </div>
                        {projectUrl && (
                            <Button size="sm" variant="ghost" className="size-8 p-0" asChild>
                                <a href={projectUrl}>
                                    <ArrowRight className="size-4" />
                                </a>
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        ))}
    </div>
)
