import Link from "next/link"
import { ArrowRight, Timer, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"

const TimeBlock = ({ value, label }: { value: string; label: string }) => (
    <Card className="flex flex-col items-center justify-center p-3 @md:p-4 bg-card border-border/50">
        <span className="text-2xl @sm:text-3xl @md:text-4xl font-black tabular-nums text-primary">{value}</span>
        <span className="text-[10px] @md:text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    </Card>
)

const CountdownGrid = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="grid grid-cols-4 gap-2 @md:gap-3 mb-6 @md:mb-8">
        {items.map((item, i) => (
            <TimeBlock key={i} value={item.value} label={item.label} />
        ))}
    </div>
)

const PromoHeadline = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) => (
    <div className="text-center mb-6 @md:mb-8">
        <Badge variant="outline" className="border-primary/50 text-primary mb-4">
            {eyebrow}
        </Badge>
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">{title}</h2>
        <p className="text-muted-foreground">{subtitle}</p>
    </div>
)

const DealHighlights = ({ items }: { items: { text: string; value: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 @md:gap-8 mb-6 @md:mb-8">
        {items.map((item, i) => (
            <div key={i} className="text-center">
                <span className="text-xl @md:text-2xl font-bold text-primary">{item.value}</span>
                <p className="text-xs @md:text-sm text-muted-foreground">{item.text}</p>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: "default" | "outline"; icon?: React.ElementType }[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map(({ label, href, variant = "default", icon: Icon }, i) => (
            <Button key={i} variant={variant} size="lg" className="gap-2" asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-4" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-2xl mx-auto">
                    <PromoHeadline
                        eyebrow="⏰ Limited Time Only"
                        title="Cyber Monday Deals"
                        subtitle="Our biggest sale of the year ends soon"
                    />
                    <CountdownGrid
                        items={[
                            { value: "01", label: "Day" },
                            { value: "23", label: "Hrs" },
                            { value: "59", label: "Min" },
                            { value: "59", label: "Sec" },
                        ]}
                    />
                    <DealHighlights
                        items={[
                            { text: "Max Discount", value: "70% OFF" },
                            { text: "Items on Sale", value: "500+" },
                            { text: "Bonus Rewards", value: "2X Points" },
                        ]}
                    />
                    <CTA
                        items={[
                            { label: "Shop All Deals", href: "/cyber-monday", icon: ShoppingBag },
                            { label: "View Categories", href: "/categories", variant: "outline" },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}
