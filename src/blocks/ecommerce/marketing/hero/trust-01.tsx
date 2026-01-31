import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Truck, Shield, Star, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ text }: { text: string }) => (
    <span className="text-sm text-primary font-medium uppercase tracking-wider">{text}</span>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const TrustBadges = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="grid @sm:grid-cols-3 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex items-center gap-3 p-4 rounded-xl border bg-card">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <p className="font-medium text-sm">{title}</p>
                    <p className="text-xs text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const FeaturedImage = ({ src, alt, badge }: { src: string; alt: string; badge?: string }) => (
    <div className="relative aspect-square @lg:aspect-[4/5] rounded-3xl overflow-hidden">
        {badge && <Badge className="absolute top-6 left-6 z-10">{badge}</Badge>}
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

const Testimonial = ({ quote, author, rating }: { quote: string; author: string; rating: number }) => (
    <div className="rounded-xl border bg-card p-6">
        <div className="flex mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className={`size-4 ${i < rating ? "fill-primary text-primary" : "text-muted"}`} />
            ))}
        </div>
        <p className="text-sm text-muted-foreground italic mb-3">"{quote}"</p>
        <p className="text-sm font-medium">{author}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow text="Trusted by Millions" />
                        <Title text="Shop with" highlight="Confidence" />
                        <Description text="Experience worry-free shopping with our industry-leading guarantees. Your satisfaction is our top priority." />
                        <TrustBadges items={[
                            { icon: Truck, title: "Free Shipping", description: "On all orders $50+" },
                            { icon: Shield, title: "Secure Payment", description: "256-bit encryption" },
                            { icon: Package, title: "Easy Returns", description: "30-day guarantee" }
                        ]} />
                        <CTA items={[
                            { label: "Start Shopping", href: "/shop", icon: ArrowRight },
                            { label: "Our Guarantees", href: "/guarantees", variant: "outline" }
                        ]} />
                        <Testimonial 
                            quote="The best shopping experience I've ever had. Fast shipping, great quality, and amazing customer service!"
                            author="Sarah M., Verified Buyer"
                            rating={5}
                        />
                    </div>
                    <FeaturedImage 
                        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=1000&fit=crop" 
                        alt="Trust shopping"
                        badge="100% Authentic"
                    />
                </div>
            </div>
        </section>
    )
}
