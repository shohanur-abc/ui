import Link from "next/link"
import { ArrowRight, Zap, Crown, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Tab = ({
    icon: Icon,
    label,
    active,
}: {
    icon: React.ElementType
    label: string
    active?: boolean
}) => (
    <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
        }`}
    >
        <Icon className="size-4" />
        {label}
    </button>
)

const TabList = ({ items }: { items: { icon: React.ElementType; label: string; active?: boolean }[] }) => (
    <div className="flex flex-wrap gap-2 mb-8">
        {items.map((item, i) => (
            <Tab key={i} {...item} />
        ))}
    </div>
)

const PromoContent = ({
    headline,
    description,
    discount,
    cta,
}: {
    headline: { text: string; highlight: string }
    description: string
    discount: { value: string; label: string }
    cta: { label: string; href: string }
}) => (
    <div className="@lg:flex items-center justify-between gap-8">
        <div className="space-y-4 mb-6 @lg:mb-0">
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
                {headline.text}
                <span className="text-primary"> {headline.highlight}</span>
            </h2>
            <p className="text-muted-foreground max-w-md">{description}</p>
        </div>
        <div className="flex items-center gap-6">
            <div className="text-center">
                <span className="text-4xl @md:text-5xl font-black text-primary">{discount.value}</span>
                <p className="text-sm text-muted-foreground">{discount.label}</p>
            </div>
            <Button size="lg" className="gap-2" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <TabList
                        items={[
                            { icon: Zap, label: "Flash Sales", active: true },
                            { icon: Crown, label: "VIP Deals" },
                            { icon: Gift, label: "Bundle Offers" },
                        ]}
                    />
                    <PromoContent
                        headline={{ text: "Flash Sale:", highlight: "Electronics Week" }}
                        description="Get incredible discounts on the latest gadgets, phones, laptops, and more. Limited time only!"
                        discount={{ value: "40%", label: "Max Discount" }}
                        cta={{ label: "Shop Electronics", href: "/flash-sale/electronics" }}
                    />
                </div>
            </div>
        </section>
    )
}
