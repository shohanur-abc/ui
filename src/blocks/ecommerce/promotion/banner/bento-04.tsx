import Link from "next/link"
import Image from "next/image"
import { ArrowRight, TrendingUp, Award, Sparkles, Heart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const GlowLineDecorative = () => (
    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
)

const ImageCard = ({
    src,
    alt,
    badge,
    title,
    subtitle,
    href,
    className = "",
}: {
    src: string
    alt: string
    badge?: { icon: React.ElementType; text: string }
    title: string
    subtitle: string
    href: string
    className?: string
}) => (
    <Link href={href} className={`group relative rounded-2xl overflow-hidden bg-card ${className}`}>
        <div className="aspect-[3/4] @md:aspect-auto @md:absolute @md:inset-0">
            <Image src={src} alt={alt} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 @md:p-6">
            {badge && (
                <Badge variant="secondary" className="mb-3 gap-1.5 bg-background/80 backdrop-blur-sm">
                    <badge.icon className="size-3" />
                    {badge.text}
                </Badge>
            )}
            <h3 className="font-bold text-lg @md:text-xl mb-1 group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
    </Link>
)

const StatCard = ({
    value,
    label,
    icon: Icon,
}: {
    value: string
    label: string
    icon: React.ElementType
}) => (
    <div className="relative rounded-2xl bg-card p-6 flex flex-col items-center justify-center text-center">
        <Icon className="size-8 text-primary mb-3" />
        <span className="text-2xl @md:text-3xl font-bold">{value}</span>
        <span className="text-sm text-muted-foreground mt-1">{label}</span>
    </div>
)

const CTACard = ({
    headline,
    cta,
    href,
}: {
    headline: string
    cta: string
    href: string
}) => (
    <div className="relative rounded-2xl bg-primary p-6 flex flex-col justify-between">
        <h3 className="text-xl font-bold text-primary-foreground mb-4">{headline}</h3>
        <Button variant="secondary" size="sm" className="w-fit gap-2" asChild>
            <Link href={href}>
                {cta}
                <ArrowRight className="size-3.5" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowLineDecorative />
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <ImageCard
                            src="https://images.unsplash.com/photo-1485968579169-53d0cb14d5bd?w=600"
                            alt="Trending"
                            badge={{ icon: TrendingUp, text: "Trending" }}
                            title="Most Wanted"
                            subtitle="This week's top picks"
                            href="/trending"
                            className="@md:col-span-2 @lg:col-span-1 @lg:row-span-2"
                        />
                        <StatCard value="10K+" label="Happy Customers" icon={Heart} />
                        <StatCard value="4.9★" label="Average Rating" icon={Award} />
                        <CTACard
                            headline="Get 20% off your first order"
                            cta="Claim Now"
                            href="/welcome"
                        />
                        <ImageCard
                            src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600"
                            alt="New Arrivals"
                            badge={{ icon: Sparkles, text: "New" }}
                            title="Just Dropped"
                            subtitle="Fresh arrivals weekly"
                            href="/new"
                            className="@lg:col-span-2"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
