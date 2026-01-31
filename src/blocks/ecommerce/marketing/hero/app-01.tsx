import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Smartphone, CreditCard, Package, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const AppPreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative mx-auto max-w-[280px]">
        <div className="relative rounded-[2.5rem] border-8 border-foreground/10 overflow-hidden shadow-2xl">
            <div className="aspect-[9/19] relative">
                <Image src={src} alt={alt} fill className="object-cover" />
            </div>
        </div>
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 h-1 rounded-full bg-foreground/20" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground">{text}</p>
)

const Features = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="space-y-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const AppButtons = ({ items }: { items: { store: string; url: string }[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ store, url }, i) => (
            <Button key={i} size="lg" variant={i === 0 ? "default" : "outline"} className="gap-2" asChild>
                <Link href={url}>
                    <Smartphone className="size-5" />
                    {store}
                </Link>
            </Button>
        ))}
    </div>
)

const Rating = ({ value, count }: { value: string; count: string }) => (
    <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-primary text-primary" />
            ))}
        </div>
        <span>{value} • {count} reviews</span>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8 order-2 @lg:order-1">
                        <Eyebrow icon={Smartphone} text="Mobile App" />
                        <Title text="Shop Smarter with Our" highlight="Mobile App" />
                        <Description text="Get exclusive app-only deals, personalized recommendations, and seamless checkout experience on the go." />
                        <Features items={[
                            { icon: CreditCard, title: "One-Tap Checkout", description: "Save your preferences for lightning-fast purchases" },
                            { icon: Package, title: "Real-Time Tracking", description: "Track your orders from warehouse to doorstep" },
                            { icon: Star, title: "Exclusive Rewards", description: "Earn double points on all app purchases" }
                        ]} />
                        <AppButtons items={[
                            { store: "App Store", url: "#app-store" },
                            { store: "Google Play", url: "#google-play" }
                        ]} />
                        <Rating value="4.9" count="50K+" />
                    </div>
                    <div className="order-1 @lg:order-2">
                        <AppPreview 
                            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=800&fit=crop" 
                            alt="Mobile app preview"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
