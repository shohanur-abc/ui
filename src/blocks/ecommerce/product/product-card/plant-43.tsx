import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Flower2, Heart, Leaf, ShoppingCart, Star, Droplets, Sun } from "lucide-react"
import Image from "next/image"

interface PlantProps {
    image: string
    name: string
    scientificName: string
    price: number
    size: string
    rating: number
    reviews: number
    careLevel: string
    light: string
    water: string
    petSafe: boolean
}

const PlantImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 bg-white/80 backdrop-blur-sm hover:bg-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const PetSafeBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-green-600 text-white">
        Pet Safe
    </Badge>
)

const PlantName = ({ name, scientificName }: { name: string; scientificName: string }) => (
    <div className="space-y-0.5">
        <h3 className="font-semibold text-foreground">{name}</h3>
        <p className="text-xs italic text-muted-foreground">{scientificName}</p>
    </div>
)

const PlantSize = ({ size }: { size: string }) => (
    <Badge variant="outline" className="gap-1 text-xs">
        <Flower2 className="size-3" />
        {size}
    </Badge>
)

const PlantRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const CareInfo = ({ careLevel, light, water }: { careLevel: string; light: string; water: string }) => (
    <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Leaf className="size-4 text-green-600" />
            <span className="mt-1 text-xs text-muted-foreground">{careLevel}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Sun className="size-4 text-yellow-500" />
            <span className="mt-1 text-xs text-muted-foreground">{light}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Droplets className="size-4 text-blue-500" />
            <span className="mt-1 text-xs text-muted-foreground">{water}</span>
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <span className="text-xl font-bold text-foreground">${amount.toFixed(2)}</span>
)

const AddButton = ({ label }: { label: string }) => (
    <Button className="gap-2 bg-green-600 hover:bg-green-700">
        <ShoppingCart className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const plant: PlantProps = {
        image: "https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=400&h=400&fit=crop",
        name: "Monstera Deliciosa",
        scientificName: "Monstera deliciosa",
        price: 45.00,
        size: "Medium (6\" pot)",
        rating: 4.9,
        reviews: 892,
        careLevel: "Easy",
        light: "Indirect",
        water: "Weekly",
        petSafe: false,
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-xs px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <PlantImage src={plant.image} alt={plant.name} />
                        {plant.petSafe && <PetSafeBadge />}
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <PlantSize size={plant.size} />
                            <PlantRating rating={plant.rating} reviews={plant.reviews} />
                        </div>
                        <PlantName name={plant.name} scientificName={plant.scientificName} />
                        <CareInfo careLevel={plant.careLevel} light={plant.light} water={plant.water} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={plant.price} />
                            <AddButton label="Add" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
