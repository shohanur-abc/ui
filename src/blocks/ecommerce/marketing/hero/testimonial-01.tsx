import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MessageCircle, Star, Quote, ThumbsUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const RatingStats = ({ stats }: { stats: { rating: string; reviews: string; recommended: string } }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        <div className="text-center">
            <div className="flex items-center gap-1 justify-center mb-1">
                <Star className="size-6 fill-primary text-primary" />
                <span className="text-3xl font-bold">{stats.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground">Average Rating</p>
        </div>
        <div className="text-center">
            <p className="text-3xl font-bold">{stats.reviews}</p>
            <p className="text-sm text-muted-foreground">Total Reviews</p>
        </div>
        <div className="text-center">
            <p className="text-3xl font-bold text-primary">{stats.recommended}</p>
            <p className="text-sm text-muted-foreground">Would Recommend</p>
        </div>
    </div>
)

const TestimonialCards = ({ testimonials }: { testimonials: { quote: string; author: string; avatar: string; rating: number; product: string }[] }) => (
    <div className="grid @md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
            <div key={i} className="p-6 rounded-2xl border bg-card">
                <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-4 ${j < t.rating ? "fill-primary text-primary" : "text-muted"}`} />
                    ))}
                </div>
                <p className="text-sm mb-4">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                    <Avatar className="size-10">
                        <AvatarImage src={t.avatar} />
                        <AvatarFallback>{t.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-medium text-sm">{t.author}</p>
                        <p className="text-xs text-muted-foreground">Purchased: {t.product}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center">
        <Button size="lg" variant="outline" className="gap-2" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-5" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Badge variant="secondary" className="gap-2">
                        <MessageCircle className="size-4" />
                        Customer Reviews
                    </Badge>
                    <Title text="What Our Customers" highlight="Say" />
                    <Description text="Don't just take our word for it. See what thousands of happy customers have to say about their shopping experience." />
                </div>
                <RatingStats stats={{ rating: "4.9", reviews: "25,847", recommended: "98%" }} />
                <TestimonialCards testimonials={[
                    { quote: "Best online shopping experience I've ever had! Quality products and fast shipping.", author: "Sarah M.", avatar: "https://i.pravatar.cc/150?img=1", rating: 5, product: "Silk Dress" },
                    { quote: "The customer service is outstanding. They helped me find the perfect gift!", author: "Michael R.", avatar: "https://i.pravatar.cc/150?img=2", rating: 5, product: "Watch" },
                    { quote: "Love the quality and the easy returns policy. Will definitely shop here again.", author: "Emma L.", avatar: "https://i.pravatar.cc/150?img=3", rating: 5, product: "Sneakers" }
                ]} />
                <CTA label="Read All Reviews" href="/reviews" />
            </div>
        </section>
    )
}
