import Link from "next/link"
import { ArrowRight, Truck, Clock, MapPin, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const FreeShippingBar = ({
    current,
    threshold,
    remaining,
}: {
    current: number
    threshold: number
    remaining: number
}) => (
    <div className="max-w-2xl mx-auto">
        <div className="bg-card rounded-2xl p-6 border border-border/50">
            <div className="flex items-center justify-center gap-3 mb-4">
                <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="size-6 text-primary" />
                </div>
                <div className="text-left">
                    <h3 className="font-bold text-lg">Free Shipping Progress</h3>
                    <p className="text-sm text-muted-foreground">Add ${remaining} more to get FREE shipping!</p>
                </div>
            </div>
            <Progress value={(current / threshold) * 100} className="h-3 mb-4" />
            <div className="flex justify-between text-sm">
                <span>${current.toFixed(2)} in cart</span>
                <span className="text-primary font-semibold">${threshold} goal</span>
            </div>
        </div>
    </div>
)

const ShippingInfo = ({
    items,
}: {
    items: { icon: React.ElementType; text: string }[]
}) => (
    <div className="flex flex-wrap justify-center gap-6 mt-8">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-2 text-muted-foreground">
                <Icon className="size-4 text-primary" />
                <span className="text-sm">{text}</span>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-12 @md:py-16 px-4 @sm:px-6 @2xl:px-8">
                <FreeShippingBar current={65.5} threshold={100} remaining={34.5} />
                <ShippingInfo
                    items={[
                        { icon: Clock, text: "Fast 2-day delivery" },
                        { icon: MapPin, text: "Track your order" },
                        { icon: Package, text: "Secure packaging" },
                    ]}
                />
            </div>
        </section>
    )
}
