import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Gauge, Heart, MapPin, Settings, ShoppingCart, Star, Fuel } from "lucide-react"
import Image from "next/image"

interface VehicleProps {
    image: string
    make: string
    model: string
    year: number
    price: number
    mileage: number
    fuelType: string
    transmission: string
    location: string
    condition: string
}

const VehicleImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-muted">
        <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        <Button size="icon-sm" variant="secondary" className="absolute right-3 top-3 bg-white/90">
            <Heart className="size-4" />
        </Button>
        <Badge className="absolute left-3 top-3 bg-green-600 text-white">Certified Pre-Owned</Badge>
    </div>
)

const VehicleTitle = ({ make, model, year }: { make: string; model: string; year: number }) => (
    <h3 className="font-bold text-foreground">
        {year} {make} {model}
    </h3>
)

const VehicleLocation = ({ text }: { text: string }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-4" />
        {text}
    </div>
)

const VehicleSpecs = ({ mileage, fuelType, transmission }: { mileage: number; fuelType: string; transmission: string }) => (
    <div className="grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Gauge className="size-4 text-primary" />
            <span className="mt-1 text-xs text-muted-foreground">{mileage.toLocaleString()} mi</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Fuel className="size-4 text-primary" />
            <span className="mt-1 text-xs text-muted-foreground">{fuelType}</span>
        </div>
        <div className="flex flex-col items-center rounded-lg bg-muted/50 p-2 text-center">
            <Settings className="size-4 text-primary" />
            <span className="mt-1 text-xs text-muted-foreground">{transmission}</span>
        </div>
    </div>
)

const PriceTag = ({ amount }: { amount: number }) => (
    <div className="space-y-0.5">
        <span className="text-2xl font-bold text-foreground">${amount.toLocaleString()}</span>
        <p className="text-xs text-muted-foreground">Est. $450/mo</p>
    </div>
)

const ContactButton = ({ label }: { label: string }) => (
    <Button className="gap-2">
        {label}
    </Button>
)

export default function Main() {
    const vehicle: VehicleProps = {
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=340&fit=crop",
        make: "BMW",
        model: "M4 Competition",
        year: 2023,
        price: 78500,
        mileage: 12450,
        fuelType: "Gasoline",
        transmission: "Automatic",
        location: "Los Angeles, CA",
        condition: "Excellent",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <VehicleImage src={vehicle.image} alt={`${vehicle.make} ${vehicle.model}`} />
                    <div className="space-y-3 p-4">
                        <VehicleTitle make={vehicle.make} model={vehicle.model} year={vehicle.year} />
                        <VehicleLocation text={vehicle.location} />
                        <VehicleSpecs mileage={vehicle.mileage} fuelType={vehicle.fuelType} transmission={vehicle.transmission} />
                        <Separator />
                        <div className="flex items-center justify-between">
                            <PriceTag amount={vehicle.price} />
                            <ContactButton label="Contact Dealer" />
                        </div>
                    </div>
                </Card>
            </div>
        </section>
    )
}
