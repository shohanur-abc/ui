import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Sparkles, Play, ChevronLeft, ChevronRight, Check, Award, Truck, Shield } from "lucide-react"
import Image from "next/image"

interface ShowcaseProps {
    images: string[]
    name: string
    brand: string
    price: number
    rating: number
    reviews: number
    tagline: string
    highlights: string[]
    video: boolean
    awards: string[]
    freeShipping: boolean
    warranty: string
}

const ProductGallery = ({ images, alt, hasVideo }: { images: string[]; alt: string; hasVideo: boolean }) => (
    <div className="relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
        <Image src={images[0]} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
        
        {hasVideo && (
            <Button size="icon" className="absolute bottom-3 right-3 rounded-full bg-white/90 text-foreground shadow-lg hover:bg-white">
                <Play className="size-4 fill-current" />
            </Button>
        )}
        
        <div className="absolute bottom-3 left-3 flex gap-1">
            {images.map((_, i) => (
                <div key={i} className={`size-2 rounded-full ${i === 0 ? "bg-white" : "bg-white/50"}`} />
            ))}
        </div>
        
        <Button size="icon-sm" variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 text-white/70 hover:bg-white/10 hover:text-white">
            <ChevronLeft className="size-4" />
        </Button>
        <Button size="icon-sm" variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 text-white/70 hover:bg-white/10 hover:text-white">
            <ChevronRight className="size-4" />
        </Button>
    </div>
)

const ShowcaseBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg">
        <Sparkles className="size-3" />
        Editor's Choice
    </Badge>
)

const AwardsList = ({ awards }: { awards: string[] }) => (
    <div className="flex flex-wrap gap-1.5">
        {awards.map((award, i) => (
            <Badge key={i} variant="outline" className="gap-1 text-xs">
                <Award className="size-3 text-yellow-500" />
                {award}
            </Badge>
        ))}
    </div>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-xl font-bold text-foreground">{text}</h3>
)

const Tagline = ({ text }: { text: string }) => (
    <p className="text-sm italic text-muted-foreground">{text}</p>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <div className="flex">
            {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={`size-4 ${i <= rating ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/30"}`} />
            ))}
        </div>
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
    </div>
)

const Highlights = ({ items }: { items: string[] }) => (
    <div className="space-y-1.5">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <div className="flex size-5 items-center justify-center rounded-full bg-primary/10">
                    <Check className="size-3 text-primary" />
                </div>
                <span className="text-foreground">{item}</span>
            </div>
        ))}
    </div>
)

const TrustBadges = ({ shipping, warranty }: { shipping: boolean; warranty: string }) => (
    <div className="flex items-center gap-4 rounded-lg bg-muted/50 px-3 py-2">
        {shipping && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Truck className="size-4 text-green-500" />
                Free Shipping
            </div>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Shield className="size-4 text-blue-500" />
            {warranty}
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-2xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const AddButton = ({ label }: { label: string }) => (
    <Button size="lg" className="gap-2">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const showcase: ShowcaseProps = {
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
        ],
        name: "Premium Smart Watch Ultra",
        brand: "TechMaster",
        price: 599.00,
        rating: 4.9,
        reviews: 4521,
        tagline: "The ultimate wearable for modern professionals",
        highlights: [
            "Advanced health monitoring suite",
            "7-day battery with fast charging",
            "Titanium case with sapphire crystal",
            "Water resistant to 100m",
        ],
        video: true,
        awards: ["Best of 2024", "Design Award"],
        freeShipping: true,
        warranty: "2-Year Warranty",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden shadow-2xl shadow-slate-900/10">
                    <div className="relative">
                        <ProductGallery images={showcase.images} alt={showcase.name} hasVideo={showcase.video} />
                        <ShowcaseBadge />
                    </div>
                    <div className="space-y-4 p-5">
                        <AwardsList awards={showcase.awards} />
                        <BrandLabel text={showcase.brand} />
                        <ProductName text={showcase.name} />
                        <Tagline text={showcase.tagline} />
                        <ProductRating rating={showcase.rating} reviews={showcase.reviews} />
                        <Highlights items={showcase.highlights} />
                        <TrustBadges shipping={showcase.freeShipping} warranty={showcase.warranty} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={showcase.price} />
                            <AddButton label="Add to Cart" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
