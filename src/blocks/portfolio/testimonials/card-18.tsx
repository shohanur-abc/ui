'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, Linkedin, Twitter } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    linkedin?: string
    twitter?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Social Proof" />
                    <Title text="With Social Links" />
                    <Description text="Connect with our clients on social media." />
                </div>

                <SocialCards
                    items={[
                        { quote: "An incredible team that delivers exceptional results.", author: "James Wilson", role: "CEO", company: "TechStart", avatar: "https://i.pravatar.cc/100?img=1", linkedin: "#", twitter: "#" },
                        { quote: "Best investment in our digital presence we've made.", author: "Emily Foster", role: "CMO", company: "GrowthLab", avatar: "https://i.pravatar.cc/100?img=2", linkedin: "#", twitter: "#" },
                        { quote: "Transformed our brand completely. Highly recommended.", author: "Michael Park", role: "Founder", company: "BrandPro", avatar: "https://i.pravatar.cc/100?img=3", linkedin: "#" },
                        { quote: "Professional, reliable, and incredibly creative.", author: "Lisa Chen", role: "CTO", company: "InnovateCo", avatar: "https://i.pravatar.cc/100?img=4", twitter: "#" },
                    ]}
                />
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

const SocialCards = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="grid @md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {items.map(({ quote, author, role, company, avatar, linkedin, twitter }, i) => (
            <li key={i} className="bg-card border rounded-xl p-6 shadow-sm">
                <Quote className="size-6 text-primary/20 mb-3" />
                <blockquote className="text-base leading-relaxed mb-6">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Avatar className="size-11">
                            <AvatarImage src={avatar} />
                            <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="font-semibold">{author}</div>
                            <div className="text-sm text-muted-foreground">{role}, {company}</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        {linkedin && (
                            <a href={linkedin} className="size-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Linkedin className="size-4" />
                            </a>
                        )}
                        {twitter && (
                            <a href={twitter} className="size-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                                <Twitter className="size-4" />
                            </a>
                        )}
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
