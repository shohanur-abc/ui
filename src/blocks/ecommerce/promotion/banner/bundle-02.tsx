import Link from "next/link"
import { ArrowRight, Package, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const BundleOption = ({
    items,
    label,
    price,
    savings,
    popular,
}: {
    items: number
    label: string
    price: string
    savings: string
    popular?: boolean
}) => (
    <div className={`relative rounded-2xl p-6 transition-all ${popular ? "bg-primary text-primary-foreground ring-2 ring-primary" : "bg-card border border-border/50 hover:border-primary/30"}`}>
        {popular && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                Best Value
            </Badge>
        )}
        <div className="text-center mb-4">
            <div className={`text-5xl @md:text-6xl font-black ${popular ? "" : "text-primary"}`}>{items}</div>
            <p className="text-sm opacity-80">{label}</p>
        </div>
        <div className="text-center mb-4">
            <span className="text-2xl font-bold">{price}</span>
            <p className={`text-sm ${popular ? "text-primary-foreground/80" : "text-green-500"}`}>Save {savings}</p>
        </div>
        <Button variant={popular ? "secondary" : "default"} className="w-full" asChild>
            <Link href={`/bundle/${items}`}>Select</Link>
        </Button>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
}: {
    badge: { text: string }
    headline: string
    subtext: string
}) => (
    <div className="text-center mb-10">
        <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
            <Package className="size-3" />
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
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        badge={{ text: "Buy More, Save More" }}
                        headline="Bundle Deals"
                        subtext="The more you buy, the more you save. Choose your bundle size."
                    />
                    <div className="grid @sm:grid-cols-3 gap-6">
                        <BundleOption items={2} label="Items" price="$89" savings="10%" />
                        <BundleOption items={4} label="Items" price="$159" savings="20%" popular />
                        <BundleOption items={6} label="Items" price="$219" savings="30%" />
                    </div>
                </div>
            </div>
        </section>
    )
}
