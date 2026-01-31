import Link from "next/link"
import { Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const RatingSummary = ({
    average,
    total,
    breakdown,
}: {
    average: string
    total: string
    breakdown: { stars: number; percentage: number }[]
}) => (
    <div className="space-y-4">
        <div className="flex items-center gap-4">
            <span className="text-5xl @md:text-6xl font-black">{average}</span>
            <div>
                <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="size-5 fill-primary text-primary" />
                    ))}
                </div>
                <p className="text-sm text-muted-foreground">{total} reviews</p>
            </div>
        </div>
        <div className="space-y-2">
            {breakdown.map(({ stars, percentage }) => (
                <div key={stars} className="flex items-center gap-2 text-sm">
                    <span className="w-3 text-muted-foreground">{stars}</span>
                    <Star className="size-3 fill-muted-foreground text-muted-foreground" />
                    <Progress value={percentage} className="h-2 flex-1" />
                    <span className="w-8 text-muted-foreground">{percentage}%</span>
                </div>
            ))}
        </div>
    </div>
)

const FeaturedReview = ({
    quote,
    author,
}: {
    quote: string
    author: { name: string; date: string; avatar: string; initials: string }
}) => (
    <div className="bg-card rounded-2xl p-6 @md:p-8 border border-border/50">
        <div className="flex gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
        </div>
        <blockquote className="text-lg @md:text-xl font-medium mb-6">&ldquo;{quote}&rdquo;</blockquote>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={author.avatar} />
                    <AvatarFallback>{author.initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-sm">{author.name}</p>
                    <p className="text-xs text-muted-foreground">{author.date}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="icon-sm">
                    <ChevronLeft className="size-4" />
                </Button>
                <Button variant="outline" size="icon-sm">
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12">
                        <RatingSummary
                            average="4.9"
                            total="12,847"
                            breakdown={[
                                { stars: 5, percentage: 85 },
                                { stars: 4, percentage: 10 },
                                { stars: 3, percentage: 3 },
                                { stars: 2, percentage: 1 },
                                { stars: 1, percentage: 1 },
                            ]}
                        />
                        <FeaturedReview
                            quote="This is hands down the best purchase I've made this year. The quality is exceptional and the customer service team went above and beyond!"
                            author={{
                                name: "Jessica Martinez",
                                date: "Reviewed 2 days ago",
                                avatar: "https://i.pravatar.cc/100?img=9",
                                initials: "JM",
                            }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
