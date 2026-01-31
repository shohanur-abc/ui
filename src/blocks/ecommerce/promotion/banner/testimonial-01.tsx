import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Quote, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const TestimonialCard = ({
    quote,
    author,
    avatar,
    rating,
    product,
}: {
    quote: string
    author: string
    avatar: string
    rating: number
    product: string
}) => (
    <div className="bg-card rounded-2xl p-6 border border-border/50">
        <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className={`size-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />
            ))}
        </div>
        <Quote className="size-6 text-primary/30 mb-2" />
        <p className="text-sm mb-4">{quote}</p>
        <div className="flex items-center gap-3">
            <Avatar className="size-10">
                <AvatarImage src={avatar} alt={author} />
                <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm">{author}</p>
                <p className="text-xs text-muted-foreground">Purchased: {product}</p>
            </div>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Heart, text: "Customer Love" }}
                        headline={{ text: "What Customers", highlight: "Say" }}
                        subtext="Real reviews from real customers"
                    />
                    <div className="grid @md:grid-cols-3 gap-6">
                        <TestimonialCard
                            quote="Best purchase I've ever made! The quality is incredible and shipping was super fast."
                            author="Sarah M."
                            avatar="https://i.pravatar.cc/100?img=1"
                            rating={5}
                            product="Smart Watch Pro"
                        />
                        <TestimonialCard
                            quote="Amazing sound quality and the battery lasts forever. Highly recommend!"
                            author="James K."
                            avatar="https://i.pravatar.cc/100?img=2"
                            rating={5}
                            product="Wireless Earbuds"
                        />
                        <TestimonialCard
                            quote="Perfect for my daily workouts. Tracks everything I need and looks great too."
                            author="Emily R."
                            avatar="https://i.pravatar.cc/100?img=3"
                            rating={4}
                            product="Fitness Tracker"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
