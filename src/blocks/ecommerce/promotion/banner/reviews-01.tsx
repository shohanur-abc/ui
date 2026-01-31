import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const ReviewCard = ({
    quote,
    author,
    rating,
}: {
    quote: string
    author: { name: string; title: string; avatar: string; initials: string }
    rating: number
}) => (
    <div className="bg-card rounded-2xl p-6 @md:p-8 border border-border/50">
        <div className="flex gap-1 mb-4">
            {[...Array(rating)].map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
        </div>
        <blockquote className="text-base @md:text-lg mb-6">&ldquo;{quote}&rdquo;</blockquote>
        <div className="flex items-center gap-3">
            <Avatar className="size-10">
                <AvatarImage src={author.avatar} />
                <AvatarFallback>{author.initials}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm">{author.name}</p>
                <p className="text-xs text-muted-foreground">{author.title}</p>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    eyebrow,
    headline,
}: {
    eyebrow: string
    headline: string
}) => (
    <div className="text-center mb-8 @md:mb-10">
        <p className="text-primary text-sm font-medium uppercase tracking-wider mb-2">{eyebrow}</p>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">{headline}</h2>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        eyebrow="Customer Reviews"
                        headline="What Our Customers Say"
                    />
                    <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-4 @md:gap-6">
                        <ReviewCard
                            quote="Amazing quality and fast delivery! Will definitely order again."
                            author={{
                                name: "Sarah Chen",
                                title: "Verified Buyer",
                                avatar: "https://i.pravatar.cc/100?img=1",
                                initials: "SC",
                            }}
                            rating={5}
                        />
                        <ReviewCard
                            quote="Best online shopping experience I've had. The customer service is outstanding."
                            author={{
                                name: "Michael Park",
                                title: "Verified Buyer",
                                avatar: "https://i.pravatar.cc/100?img=3",
                                initials: "MP",
                            }}
                            rating={5}
                        />
                        <ReviewCard
                            quote="Great value for money. The products exceeded my expectations."
                            author={{
                                name: "Emma Wilson",
                                title: "Verified Buyer",
                                avatar: "https://i.pravatar.cc/100?img=5",
                                initials: "EW",
                            }}
                            rating={5}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
