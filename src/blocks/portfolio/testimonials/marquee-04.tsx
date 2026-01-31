'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container overflow-hidden bg-muted/30">
            <div className="py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 px-4 @sm:px-6 @2xl:px-8">
                    <Eyebrow text="Wall of Love" />
                    <Title text="Marquee 4" />
                    <Description text="A wall of client love scrolling continuously." />
                </div>

                <WallMarquee
                    rows={[
                        [
                            { quote: "Outstanding work!", author: "Alex T.", role: "CEO", company: "Tech", avatar: "https://i.pravatar.cc/100?img=21" },
                            { quote: "Best agency ever.", author: "Maria S.", role: "CTO", company: "Cloud", avatar: "https://i.pravatar.cc/100?img=22" },
                            { quote: "Highly recommend!", author: "David C.", role: "VP", company: "Scale", avatar: "https://i.pravatar.cc/100?img=23" },
                            { quote: "A+ experience.", author: "Sarah K.", role: "PM", company: "Growth", avatar: "https://i.pravatar.cc/100?img=24" },
                            { quote: "Pure excellence.", author: "James W.", role: "Dir", company: "Design", avatar: "https://i.pravatar.cc/100?img=25" },
                            { quote: "Game changer!", author: "Emily F.", role: "Lead", company: "Brand", avatar: "https://i.pravatar.cc/100?img=26" },
                        ],
                        [
                            { quote: "Transformed our biz.", author: "Mike P.", role: "CEO", company: "Transform", avatar: "https://i.pravatar.cc/100?img=27" },
                            { quote: "Creative genius.", author: "Lisa W.", role: "CMO", company: "Creative", avatar: "https://i.pravatar.cc/100?img=28" },
                            { quote: "10/10 recommend.", author: "Rob C.", role: "CTO", company: "Recommend", avatar: "https://i.pravatar.cc/100?img=29" },
                            { quote: "Best decision.", author: "Jen L.", role: "Founder", company: "Decision", avatar: "https://i.pravatar.cc/100?img=30" },
                            { quote: "Amazing team!", author: "Dan K.", role: "VP", company: "Amazing", avatar: "https://i.pravatar.cc/100?img=31" },
                            { quote: "So professional.", author: "Amanda W.", role: "PM", company: "Pro", avatar: "https://i.pravatar.cc/100?img=32" },
                        ],
                        [
                            { quote: "Incredible results.", author: "Chris L.", role: "CEO", company: "Results", avatar: "https://i.pravatar.cc/100?img=33" },
                            { quote: "True partners.", author: "Nicole B.", role: "COO", company: "Partner", avatar: "https://i.pravatar.cc/100?img=34" },
                            { quote: "Worth every penny.", author: "Daniel K.", role: "CFO", company: "Worth", avatar: "https://i.pravatar.cc/100?img=35" },
                            { quote: "Exceeded goals.", author: "Jennifer P.", role: "CMO", company: "Goals", avatar: "https://i.pravatar.cc/100?img=36" },
                            { quote: "Simply the best.", author: "Robert T.", role: "CTO", company: "Best", avatar: "https://i.pravatar.cc/100?img=37" },
                            { quote: "Would hire again.", author: "Sarah M.", role: "Lead", company: "Again", avatar: "https://i.pravatar.cc/100?img=38" },
                        ],
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

const WallMarquee = ({ rows }: { rows: TestimonialItem[][] }) => (
    <div className="space-y-4">
        {rows.map((items, rowIndex) => {
            const duplicatedItems = [...items, ...items]
            const direction = rowIndex % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right'
            const duration = 30 + rowIndex * 10
            
            return (
                <div key={rowIndex} className="relative flex overflow-hidden">
                    <div 
                        className={`flex gap-4 ${direction}`}
                        style={{
                            animationDuration: `${duration}s`,
                            animationTimingFunction: 'linear',
                            animationIterationCount: 'infinite',
                        }}
                    >
                        {duplicatedItems.map(({ quote, author, role, company, avatar }, i) => (
                            <div 
                                key={i} 
                                className="flex-shrink-0 w-56 bg-background border rounded-lg p-4 shadow-sm"
                            >
                                <blockquote className="text-xs font-medium mb-3">
                                    &ldquo;{quote}&rdquo;
                                </blockquote>
                                <div className="flex items-center gap-2">
                                    <Avatar className="size-6">
                                        <AvatarImage src={avatar} />
                                        <AvatarFallback className="bg-muted text-[10px]">{author[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-medium text-[10px]">{author}</div>
                                        <div className="text-[10px] text-muted-foreground">{role}, {company}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )
        })}
    </div>
)
