import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Camera, Download, Heart, ShoppingCart, Star, Image as ImageIcon, Maximize, User } from "lucide-react"
import Image from "next/image"

interface StockPhotoProps {
    image: string
    title: string
    photographer: string
    price: number
    rating: number
    downloads: number
    resolution: string
    orientation: string
    category: string
    similar: string[]
}

const PhotoPreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
            <button className="flex size-12 items-center justify-center rounded-full bg-white/90 shadow-lg">
                <Maximize className="size-5 text-foreground" />
            </button>
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white hover:bg-white/20">
            <Heart className="size-4" />
        </Button>
    </div>
)

const CategoryBadge = ({ text }: { text: string }) => (
    <Badge className="absolute left-3 top-3 gap-1">
        <Camera className="size-3" />
        {text}
    </Badge>
)

const PhotoTitle = ({ text }: { text: string }) => (
    <h3 className="line-clamp-1 font-semibold text-foreground">{text}</h3>
)

const PhotographerInfo = ({ name }: { name: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <User className="size-4" />
        {name}
    </div>
)

const PhotoStats = ({ downloads }: { downloads: number }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Download className="size-4" />
        {downloads.toLocaleString()} downloads
    </div>
)

const PhotoSpecs = ({ resolution, orientation }: { resolution: string; orientation: string }) => (
    <div className="flex gap-2">
        <Badge variant="outline" className="gap-1 text-xs">
            <ImageIcon className="size-3" />
            {resolution}
        </Badge>
        <Badge variant="outline" className="text-xs">{orientation}</Badge>
    </div>
)

const SimilarPhotos = ({ photos }: { photos: string[] }) => (
    <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground">Similar:</span>
        <div className="flex gap-1.5">
            {photos.map((src, i) => (
                <div key={i} className="relative size-8 overflow-hidden rounded">
                    <Image src={src} alt={`Similar ${i + 1}`} fill className="object-cover" />
                </div>
            ))}
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount}</span>
)

const DownloadButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        <Download className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const photo: StockPhotoProps = {
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop",
        title: "Mountain Landscape at Golden Hour",
        photographer: "Alex Chen",
        price: 15,
        rating: 4.9,
        downloads: 8934,
        resolution: "6000 × 4000",
        orientation: "Landscape",
        category: "Nature",
        similar: [
            "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=50&h=50&fit=crop",
            "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=50&h=50&fit=crop",
            "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=50&h=50&fit=crop",
        ],
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <PhotoPreview src={photo.image} alt={photo.title} />
                        <CategoryBadge text={photo.category} />
                    </div>
                    <div className="space-y-3 p-4">
                        <PhotoTitle text={photo.title} />
                        <div className="flex items-center justify-between">
                            <PhotographerInfo name={photo.photographer} />
                            <PhotoStats downloads={photo.downloads} />
                        </div>
                        <PhotoSpecs resolution={photo.resolution} orientation={photo.orientation} />
                        <SimilarPhotos photos={photo.similar} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={photo.price} />
                            <DownloadButton label="Buy" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
