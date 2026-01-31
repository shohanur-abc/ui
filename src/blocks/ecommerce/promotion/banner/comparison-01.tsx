import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, CheckCircle2, Shield, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const CompareItem = ({
    label,
    us,
    them,
}: {
    label: string
    us: string | boolean
    them: string | boolean
}) => (
    <div className="grid grid-cols-3 gap-4 py-3 border-b border-border/50 last:border-0">
        <span className="text-muted-foreground">{label}</span>
        <span className="text-center font-semibold text-primary">
            {typeof us === 'boolean' ? (us ? <CheckCircle2 className="size-5 mx-auto" /> : '—') : us}
        </span>
        <span className="text-center text-muted-foreground">
            {typeof them === 'boolean' ? (them ? <CheckCircle2 className="size-5 mx-auto" /> : '—') : them}
        </span>
    </div>
)

const ComparisonTable = ({
    items,
    ourBrand,
    competitor,
}: {
    items: { label: string; us: string | boolean; them: string | boolean }[]
    ourBrand: string
    competitor: string
}) => (
    <Card className="p-6">
        <div className="grid grid-cols-3 gap-4 pb-4 mb-4 border-b border-border">
            <span className="font-semibold">Features</span>
            <span className="text-center font-bold text-primary">{ourBrand}</span>
            <span className="text-center text-muted-foreground">{competitor}</span>
        </div>
        {items.map((item, i) => (
            <CompareItem key={i} {...item} />
        ))}
    </Card>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: string
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{subtext}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-3xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Award, text: "Why Choose Us" }}
                        headline="See the Difference"
                        subtext="Compare our products with the competition and discover why customers choose us"
                    />
                    <ComparisonTable
                        ourBrand="Our Brand"
                        competitor="Others"
                        items={[
                            { label: "Quality Materials", us: "Premium", them: "Standard" },
                            { label: "Warranty", us: "Lifetime", them: "1 Year" },
                            { label: "Free Shipping", us: true, them: false },
                            { label: "Free Returns", us: true, them: false },
                            { label: "24/7 Support", us: true, them: false },
                            { label: "Price Match", us: true, them: false },
                        ]}
                    />
                    <div className="mt-8 text-center">
                        <Button size="lg" className="gap-2" asChild>
                            <Link href="/products">
                                Shop Now
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
