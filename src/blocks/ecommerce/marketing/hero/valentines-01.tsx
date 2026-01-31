import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gift, Heart, Sparkles, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-2 bg-gradient-to-r from-rose-500 to-pink-500 border-0">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="bg-gradient-to-r from-rose-500 to-pink-500 bg-clip-text text-transparent">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const Countdown = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex justify-center gap-4">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="size-16 @md:size-20 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-2xl @md:text-3xl">
                    {value}
                </div>
                <p className="text-sm text-muted-foreground mt-2">{label}</p>
            </div>
        ))}
    </div>
)

const GiftCategories = ({ items }: { items: { image: string; title: string; subtitle: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
        {items.map((item, i) => (
            <div key={i} className="group relative aspect-[3/4] rounded-2xl overflow-hidden">
                <Image src={item.image} alt={item.title} fill className="object-cover group-hover:scale-105 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 inset-x-4 text-center text-white">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-rose-300">{item.subtitle}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center">
        <Button size="lg" className="gap-2 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600" asChild>
            <Link href={href}>
                {label}
                <ArrowRight className="size-5" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Heart} text="Valentine's Day" />
                    <Title text="Gifts They'll" highlight="Love Forever" />
                    <Description text="Find the perfect gift for your special someone. Shop our curated Valentine's collection with free gift wrapping and express delivery." />
                </div>
                <Countdown items={[
                    { value: "05", label: "Days" },
                    { value: "12", label: "Hours" },
                    { value: "34", label: "Minutes" },
                    { value: "56", label: "Seconds" }
                ]} />
                <GiftCategories items={[
                    { image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=533&fit=crop", title: "For Her", subtitle: "From $29" },
                    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=533&fit=crop", title: "For Him", subtitle: "From $39" },
                    { image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=533&fit=crop", title: "Couples", subtitle: "From $79" },
                    { image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=533&fit=crop", title: "Luxury", subtitle: "From $199" }
                ]} />
                <CTA label="Shop Valentine's Gifts" href="/valentines" />
            </div>
        </section>
    )
}
