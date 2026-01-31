import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Rocket, Bell, Star, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const LaunchCountdown = ({ date }: { date: string }) => (
    <div className="text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Launching</p>
        <p className="text-2xl @md:text-3xl font-bold text-primary">{date}</p>
    </div>
)

const NotifyForm = () => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto">
        <Input placeholder="Enter your email" type="email" className="flex-1" />
        <Button className="gap-2 shrink-0">
            <Bell className="size-4" />
            Notify Me
        </Button>
    </div>
)

const Features = ({ items }: { items: { icon: React.ElementType; title: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-6">
        {items.map(({ icon: Icon, title }, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <Icon className="size-4 text-primary" />
                <span>{title}</span>
            </div>
        ))}
    </div>
)

const PreviewGrid = ({ images }: { images: { src: string; label: string }[] }) => (
    <div className="relative max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
            {images.map((image, i) => (
                <div key={i} className={`relative rounded-2xl overflow-hidden ${i === 1 ? "row-span-2" : ""}`}>
                    <div className="aspect-square @md:aspect-[3/4] relative">
                        <Image src={image.src} alt={image.label} fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/20" />
                        <Badge className="absolute bottom-3 left-3 bg-black/50 backdrop-blur">{image.label}</Badge>
                    </div>
                </div>
            ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Badge variant="secondary" className="gap-2">
                        <Rocket className="size-4" />
                        Coming Soon
                    </Badge>
                    <Title text="Something Amazing is" highlight="Launching" />
                    <Description text="We're working on something special. Be the first to know when we launch and get exclusive early-bird access." />
                    <LaunchCountdown date="March 15, 2024" />
                </div>
                <NotifyForm />
                <Features items={[
                    { icon: Star, title: "Early Access" },
                    { icon: TrendingUp, title: "Launch Discounts" },
                    { icon: Bell, title: "Exclusive Updates" }
                ]} />
                <PreviewGrid images={[
                    { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", label: "Sneak Peek" },
                    { src: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=600&fit=crop", label: "Featured" },
                    { src: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop", label: "Preview" }
                ]} />
                <Stats items={[
                    { value: "5K+", label: "Waitlisted" },
                    { value: "100+", label: "Products" },
                    { value: "30%", label: "Launch Discount" }
                ]} />
            </div>
        </section>
    )
}
