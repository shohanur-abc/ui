import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Gift, Star, Truck, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const BentoCard = ({
    children,
    className = "",
    href,
}: {
    children: React.ReactNode
    className?: string
    href?: string
}) => {
    const content = (
        <div className={`group relative rounded-2xl overflow-hidden bg-card transition-all hover:shadow-lg hover:shadow-primary/5 ${className}`}>
            {children}
        </div>
    )
    return href ? <Link href={href}>{content}</Link> : content
}

const HeroCard = ({
    src,
    alt,
    badge,
    headline,
    cta,
    href,
}: {
    src: string
    alt: string
    badge: string
    headline: string
    cta: string
    href: string
}) => (
    <BentoCard className="@lg:col-span-2 @lg:row-span-2" href={href}>
        <div className="aspect-[4/3] @lg:aspect-auto @lg:absolute @lg:inset-0">
            <Image src={src} alt={alt} fill className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/60 to-transparent" />
        <div className="absolute inset-0 p-6 @md:p-8 flex flex-col justify-end">
            <Badge className="w-fit mb-4">{badge}</Badge>
            <h2 className="text-2xl @md:text-3xl @lg:text-4xl font-bold mb-4 max-w-sm">{headline}</h2>
            <span className="inline-flex items-center gap-2 font-medium text-primary group-hover:gap-3 transition-all">
                {cta}
                <ArrowRight className="size-4" />
            </span>
        </div>
    </BentoCard>
)

const FeatureCard = ({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType
    title: string
    description: string
}) => (
    <BentoCard className="p-6">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className="size-6 text-primary" />
        </div>
        <h3 className="font-semibold mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </BentoCard>
)

const PromoCard = ({
    discount,
    text,
    href,
}: {
    discount: string
    text: string
    href: string
}) => (
    <BentoCard className="@lg:col-span-2 p-6 bg-primary" href={href}>
        <div className="flex items-center justify-between gap-4">
            <div>
                <span className="text-3xl @md:text-4xl font-black text-primary-foreground">{discount}</span>
                <p className="text-primary-foreground/80 mt-1">{text}</p>
            </div>
            <ArrowRight className="size-6 text-primary-foreground group-hover:translate-x-1 transition-transform" />
        </div>
    </BentoCard>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <HeroCard
                            src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=1200"
                            alt="Summer Collection"
                            badge="New Collection"
                            headline="Summer Essentials Are Here"
                            cta="Explore Collection"
                            href="/summer"
                        />
                        <FeatureCard
                            icon={Truck}
                            title="Free Shipping"
                            description="On orders over $50"
                        />
                        <FeatureCard
                            icon={Shield}
                            title="Secure Payment"
                            description="100% protected"
                        />
                        <PromoCard
                            discount="30% OFF"
                            text="First order discount"
                            href="/welcome"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
