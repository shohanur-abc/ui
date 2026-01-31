import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Download, Heart, Sliders, ShoppingCart, Star, Wand2, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface PresetProps {
    image: string
    name: string
    creator: string
    price: number
    rating: number
    reviews: number
    software: string
    includes: number
    category: string
    previews: string[]
}

const PresetPreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const SoftwareBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1">
        <Sliders className="size-3" />
        {text}
    </Badge>
)

const PresetName = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const CreatorName = ({ name }: { name: string }) => (
    <p className="text-sm text-muted-foreground">by {name}</p>
)

const PresetRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const IncludesInfo = ({ count, category }: { count: number; category: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Wand2 className="size-4" />
        {count} {category} presets
    </div>
)

const PreviewThumbnails = ({ previews }: { previews: string[] }) => (
    <div className="flex gap-2">
        {previews.map((src, i) => (
            <div key={i} className="relative aspect-square w-14 overflow-hidden rounded-lg">
                <Image src={src} alt={`Preview ${i + 1}`} fill className="object-cover" />
            </div>
        ))}
        <div className="flex aspect-square w-14 items-center justify-center rounded-lg bg-muted">
            <ImageIcon className="size-5 text-muted-foreground" />
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const DownloadButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Download className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const preset: PresetProps = {
        image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=375&fit=crop",
        name: "Cinematic Film Pack",
        creator: "PhotoMaster",
        price: 39.00,
        rating: 4.9,
        reviews: 1234,
        software: "Lightroom",
        includes: 50,
        category: "color grading",
        previews: [
            "https://images.unsplash.com/photo-1504198322253-cfa87a0ff25f?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=100&h=100&fit=crop",
            "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=100&h=100&fit=crop",
        ],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <PresetPreview src={preset.image} alt={preset.name} />
                        <SoftwareBadge text={preset.software} />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <IncludesInfo count={preset.includes} category={preset.category} />
                            <PresetRating rating={preset.rating} reviews={preset.reviews} />
                        </div>
                        <div className="space-y-0.5">
                            <PresetName text={preset.name} />
                            <CreatorName name={preset.creator} />
                        </div>
                        <PreviewThumbnails previews={preset.previews} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={preset.price} />
                            <DownloadButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
