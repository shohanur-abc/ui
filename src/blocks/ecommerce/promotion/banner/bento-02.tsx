import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Percent, Zap, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
    </div>
)

const MainPromo = ({
    src,
    alt,
    badge,
    headline,
    subtext,
    href,
}: {
    src: string
    alt: string
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
    href: string
}) => (
    <Link
        href={href}
        className="group relative @lg:col-span-2 @lg:row-span-2 rounded-3xl overflow-hidden bg-card"
    >
        <div className="aspect-[4/3] @lg:aspect-auto @lg:absolute @lg:inset-0">
            <Image src={src} alt={alt} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 @lg:p-10">
            <Badge className="mb-4 gap-1.5 shadow-lg">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl @lg:text-5xl font-bold mb-2 group-hover:text-primary transition-colors">
                {headline}
            </h2>
            <p className="text-muted-foreground text-base @md:text-lg mb-4">{subtext}</p>
            <span className="inline-flex items-center gap-2 font-medium group-hover:gap-3 transition-all">
                Shop Now
                <ArrowRight className="size-4" />
            </span>
        </div>
    </Link>
)

const SmallPromo = ({
    title,
    subtitle,
    icon: Icon,
    href,
    variant = "default",
}: {
    title: string
    subtitle: string
    icon: React.ElementType
    href: string
    variant?: "default" | "accent"
}) => (
    <Link
        href={href}
        className={`group relative flex flex-col justify-between p-6 rounded-2xl overflow-hidden transition-all hover:scale-[1.02] ${
            variant === "accent" ? "bg-primary text-primary-foreground" : "bg-card"
        }`}
    >
        <Icon className={`size-8 mb-4 ${variant === "accent" ? "opacity-80" : "text-primary"}`} />
        <div>
            <h3 className="font-semibold text-lg mb-1">{title}</h3>
            <p className={`text-sm ${variant === "accent" ? "opacity-80" : "text-muted-foreground"}`}>
                {subtitle}
            </p>
        </div>
    </Link>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <MainPromo
                            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200"
                            alt="Mega Sale"
                            badge={{ icon: Zap, text: "Mega Sale" }}
                            headline="Up to 70% Off Everything"
                            subtext="The biggest sale of the year is here"
                            href="/mega-sale"
                        />
                        <SmallPromo
                            title="Daily Deals"
                            subtitle="New offers every day"
                            icon={Percent}
                            href="/daily-deals"
                        />
                        <SmallPromo
                            title="Flash Sale"
                            subtitle="Ends in 2 hours"
                            icon={Clock}
                            href="/flash-sale"
                            variant="accent"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
