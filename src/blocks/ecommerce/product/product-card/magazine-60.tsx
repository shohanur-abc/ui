import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { BookOpen, Calendar, Heart, Newspaper, ShoppingCart, Star, Clock, TrendingUp } from "lucide-react"
import Image from "next/image"

interface MagazineProps {
    cover: string
    title: string
    issue: string
    price: number
    subscriptionPrice: number
    rating: number
    reviews: number
    publishDate: string
    readTime: string
    highlights: string[]
    trending: boolean
}

const MagazineCover = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted shadow-lg">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 text-foreground hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const TrendingBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-red-500 to-orange-500">
        <TrendingUp className="size-3" />
        Trending
    </Badge>
)

const MagazineTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const IssueInfo = ({ issue }: { issue: string }) => (
    <p className="text-sm text-muted-foreground">{issue}</p>
)

const MagazineRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const MagazineDetails = ({ publishDate, readTime }: { publishDate: string; readTime: string }) => (
    <div className="flex gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
            <Calendar className="size-4" />
            {publishDate}
        </span>
        <span className="flex items-center gap-1">
            <Clock className="size-4" />
            {readTime}
        </span>
    </div>
)

const Highlights = ({ items }: { items: string[] }) => (
    <div className="space-y-1.5">
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
            <Newspaper className="size-3" />
            In this issue
        </p>
        <ul className="space-y-1 text-sm text-muted-foreground">
            {items.map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-primary" />
                    {item}
                </li>
            ))}
        </ul>
    </div>
)

const PriceOptions = ({ single, subscription }: { single: number; subscription: number }) => (
    <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold text-foreground">${single.toFixed(2)}</span>
        <span className="text-sm text-muted-foreground">or ${subscription}/mo</span>
    </div>
)

const BuyButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <BookOpen className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const magazine: MagazineProps = {
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=530&fit=crop",
        title: "Design Quarterly",
        issue: "Spring 2025 Edition",
        price: 9.99,
        subscriptionPrice: 5.99,
        rating: 4.7,
        reviews: 892,
        publishDate: "Mar 1, 2025",
        readTime: "2 hr read",
        highlights: [
            "Future of UI Design",
            "Interview: Design Leaders",
            "Color Trends 2025",
        ],
        trending: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative p-4">
                        <MagazineCover src={magazine.cover} alt={magazine.title} />
                        {magazine.trending && <TrendingBadge />}
                    </div>
                    <div className="space-y-3 px-4 pb-4">
                        <div className="flex items-center justify-between">
                            <IssueInfo issue={magazine.issue} />
                            <MagazineRating rating={magazine.rating} reviews={magazine.reviews} />
                        </div>
                        <MagazineTitle text={magazine.title} />
                        <MagazineDetails publishDate={magazine.publishDate} readTime={magazine.readTime} />
                        <Highlights items={magazine.highlights} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceOptions single={magazine.price} subscription={magazine.subscriptionPrice} />
                            <BuyButton label="Read" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
