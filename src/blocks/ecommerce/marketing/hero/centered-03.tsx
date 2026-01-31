import Link from "next/link"
import { Percent, ArrowRight, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const CountdownTimer = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex justify-center gap-4 @md:gap-6">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-3xl @md:text-5xl font-bold text-primary tabular-nums">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground uppercase tracking-wide">{label}</div>
            </div>
        ))}
    </div>
)

const SaleBadge = ({ icon: Icon, text, variant }: { icon: React.ElementType; text: string; variant?: "default" | "destructive" }) => (
    <Badge variant={variant} className="gap-1.5 px-4 py-1.5 text-sm animate-pulse">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, sale }: { text: string; sale?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-black tracking-tight uppercase">
        {text}
        {sale && (
            <span className="block text-primary">{sale}</span>
        )}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-lg mx-auto">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-col @sm:flex-row justify-center gap-3">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2 text-base" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    <SaleBadge icon={Zap} text="Flash Sale Live" variant="destructive" />
                    <Title text="Mega" sale="70% Off" />
                    <Description text="Don't miss our biggest sale of the year. Premium products at unbeatable prices for a limited time only." />
                    <CountdownTimer items={[
                        { value: "02", label: "Days" },
                        { value: "14", label: "Hours" },
                        { value: "36", label: "Minutes" },
                        { value: "52", label: "Seconds" }
                    ]} />
                    <CTA items={[
                        { label: "Shop Sale", href: "/sale", icon: ArrowRight },
                        { label: "View Deals", href: "/deals", variant: "outline" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
