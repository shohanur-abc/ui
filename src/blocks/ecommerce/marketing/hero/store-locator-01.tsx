import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Store, MapPin, Clock, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const StoreSearch = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="max-w-md mx-auto flex gap-3">
        <div className="flex-1 relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input placeholder={placeholder} className="pl-10" />
        </div>
        <Button>{buttonText}</Button>
    </div>
)

const StoreList = ({ stores }: { stores: { name: string; address: string; distance: string; hours: string; image: string }[] }) => (
    <div className="grid @md:grid-cols-2 @lg:grid-cols-3 gap-6">
        {stores.map((store, i) => (
            <div key={i} className="rounded-2xl border bg-card overflow-hidden group">
                <div className="relative h-40 overflow-hidden">
                    <Image src={store.image} alt={store.name} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <Badge className="absolute top-3 right-3">{store.distance}</Badge>
                </div>
                <div className="p-4 space-y-3">
                    <h3 className="font-semibold">{store.name}</h3>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="size-4 mt-0.5 shrink-0" />
                        <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="size-4" />
                        <span>{store.hours}</span>
                    </div>
                    <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex-1 gap-1">
                            <Phone className="size-3" />
                            Call
                        </Button>
                        <Button size="sm" className="flex-1 gap-1">
                            <MapPin className="size-3" />
                            Directions
                        </Button>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Store} text="Find a Store" />
                    <Title text="Shop In Person" highlight="Near You" />
                    <Description text="Visit one of our retail locations to experience our products firsthand. Our expert staff is ready to help you find the perfect items." />
                </div>
                <StoreSearch placeholder="Enter your city or zip code" buttonText="Find Stores" />
                <StoreList stores={[
                    { name: "Downtown Flagship", address: "123 Main Street, New York, NY 10001", distance: "0.5 mi", hours: "10AM - 9PM", image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop" },
                    { name: "Midtown Mall", address: "456 Fashion Ave, New York, NY 10018", distance: "1.2 mi", hours: "10AM - 10PM", image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=400&h=300&fit=crop" },
                    { name: "Brooklyn Heights", address: "789 Atlantic Ave, Brooklyn, NY 11201", distance: "2.8 mi", hours: "11AM - 8PM", image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=400&h=300&fit=crop" }
                ]} />
            </div>
        </section>
    )
}
