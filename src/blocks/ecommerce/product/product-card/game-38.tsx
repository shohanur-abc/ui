import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Award, Brain, Clock, Heart, Star, Trophy, Users } from "lucide-react"
import Image from "next/image"

interface GameProps {
    cover: string
    title: string
    developer: string
    rating: number
    price: number
    discount?: number
    tags: string[]
    achievements: { earned: number; total: number }
    friends: number
}

const GameCover = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const DiscountBadge = ({ percent }: { percent: number }) => (
    <Badge className="absolute left-3 top-3 bg-green-600 text-white">-{percent}%</Badge>
)

const GameTags = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-1">
        {items.map((tag, i) => (
            <Badge key={i} variant="secondary" className="text-xs">
                {tag}
            </Badge>
        ))}
    </div>
)

const GameTitle = ({ text }: { text: string }) => (
    <h3 className="font-bold text-foreground">{text}</h3>
)

const DeveloperName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">{name}</p>
)

const GameRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
    </div>
)

const AchievementProgress = ({ earned, total }: { earned: number; total: number }) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1 text-muted-foreground">
                <Trophy className="size-3 text-yellow-500" />
                Achievements
            </span>
            <span className="text-foreground">{earned}/{total}</span>
        </div>
        <Progress value={(earned / total) * 100} className="h-1.5" />
    </div>
)

const FriendsPlaying = ({ count }: { count: number }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Users className="size-4 text-primary" />
        <span>{count} friends playing</span>
    </div>
)

const PriceDisplay = ({ price, discount }: { price: number; discount?: number }) => {
    const finalPrice = discount ? price * (1 - discount / 100) : price
    return (
        <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">${finalPrice.toFixed(2)}</span>
            {discount && <span className="text-sm text-muted-foreground line-through">${price.toFixed(2)}</span>}
        </div>
    )
}

const BuyButton = ({ label }: { label: string }) => (
    <Button className="flex-1">{label}</Button>
)

export default function Main() {
    const game: GameProps = {
        cover: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=530&fit=crop",
        title: "Cyberpunk Legends",
        developer: "Neon Studios",
        rating: 4.7,
        price: 59.99,
        discount: 40,
        tags: ["Action", "RPG", "Open World"],
        achievements: { earned: 24, total: 50 },
        friends: 12,
    }

    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <GameCover src={game.cover} alt={game.title} />
                        {game.discount && <DiscountBadge percent={game.discount} />}
                    </div>
                    <div className="space-y-3 p-4">
                        <GameTags items={game.tags} />
                        <div className="flex items-start justify-between gap-2">
                            <div className="space-y-0.5">
                                <GameTitle text={game.title} />
                                <DeveloperName name={game.developer} />
                            </div>
                            <GameRating rating={game.rating} />
                        </div>
                        <AchievementProgress {...game.achievements} />
                        <FriendsPlaying count={game.friends} />
                        <Separator />
                        <div className="flex items-center gap-3">
                            <PriceDisplay price={game.price} discount={game.discount} />
                            <BuyButton label="Buy Now" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
