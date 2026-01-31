import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Bath, Bed, Heart, Home, MapPin, Maximize, Star } from "lucide-react"
import Image from "next/image"

interface PropertyProps {
    image: string
    title: string
    address: string
    price: number
    bedrooms: number
    bathrooms: number
    sqft: number
    type: string
    featured: boolean
}

const PropertyImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
    </div>
)

const FeaturedBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-primary text-primary-foreground">
        <Star className="size-3 fill-current" />
        Featured
    </Badge>
)

const PropertyType = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="gap-1 text-xs">
        <Home className="size-3" />
        {text}
    </Badge>
)

const PropertyTitle = ({ text }: { text: string }) => (
    <h3 className="font-semibold text-foreground">{text}</h3>
)

const PropertyAddress = ({ text }: { text: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {text}
    </div>
)

const PropertySpecs = ({ bedrooms, bathrooms, sqft }: { bedrooms: number; bathrooms: number; sqft: number }) => (
    <div className="flex gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
            <Bed className="size-4" />
            {bedrooms} beds
        </span>
        <span className="flex items-center gap-1.5">
            <Bath className="size-4" />
            {bathrooms} baths
        </span>
        <span className="flex items-center gap-1.5">
            <Maximize className="size-4" />
            {sqft.toLocaleString()} sqft
        </span>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toLocaleString()}</span>
)

const ViewButton = ({ label }: { label: string }) => (
    <Button>{label}</Button>
)

export default function Main() {
    const property: PropertyProps = {
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop",
        title: "Modern Family Home",
        address: "123 Oak Street, Beverly Hills, CA",
        price: 1250000,
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2850,
        type: "Single Family",
        featured: true,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <PropertyImage src={property.image} alt={property.title} />
                        {property.featured && <FeaturedBadge />}
                    </div>
                    <div className="space-y-3 p-4">
                        <PropertyType text={property.type} />
                        <PropertyTitle text={property.title} />
                        <PropertyAddress text={property.address} />
                        <PropertySpecs bedrooms={property.bedrooms} bathrooms={property.bathrooms} sqft={property.sqft} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={property.price} />
                            <ViewButton label="View Details" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
