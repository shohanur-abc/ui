import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Eye, ArrowLeftRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

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

const BeforeAfter = ({ before, after }: { before: { image: string; label: string }; after: { image: string; label: string } }) => (
    <div className="relative max-w-3xl mx-auto">
        <div className="grid grid-cols-2 gap-4 @md:gap-8">
            <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-muted">
                    <Image src={before.image} alt={before.label} fill className="object-cover" />
                </div>
                <p className="text-center font-medium text-muted-foreground">{before.label}</p>
            </div>
            <div className="space-y-4">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-primary">
                    <Image src={after.image} alt={after.label} fill className="object-cover" />
                    <Badge className="absolute top-4 right-4">Recommended</Badge>
                </div>
                <p className="text-center font-medium text-primary">{after.label}</p>
            </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-12 rounded-full bg-background border-2 flex items-center justify-center z-10">
            <ArrowLeftRight className="size-5 text-primary" />
        </div>
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                <span className="text-sm">{item}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center">
        <Button size="lg" className="gap-2" asChild>
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
                    <Eyebrow icon={ArrowLeftRight} text="Before & After" />
                    <Title text="See the" highlight="Transformation" />
                    <Description text="Discover how our products can transform your look. Compare before and after to see the real difference." />
                </div>
                <BeforeAfter 
                    before={{ image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=533&fit=crop", label: "Before" }}
                    after={{ image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=533&fit=crop", label: "After Our Styling" }}
                />
                <Benefits items={[
                    "Expert styling advice",
                    "Curated outfit matching",
                    "Instant transformation",
                    "Confidence boost"
                ]} />
                <CTA label="Get Your Transformation" href="/styling" />
            </div>
        </section>
    )
}
