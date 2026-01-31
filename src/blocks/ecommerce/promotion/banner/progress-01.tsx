import Link from "next/link"
import { ArrowRight, ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

const FreeShippingBar = ({
    current,
    target,
    message,
    cta,
}: {
    current: number
    target: number
    message: { below: string; above: string }
    cta: { label: string; href: string }
}) => {
    const percentage = Math.min((current / target) * 100, 100)
    const remaining = target - current
    const hasReached = remaining <= 0

    return (
        <div className="flex items-center gap-4 @md:gap-6">
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">
                        {hasReached ? message.above : message.below.replace("{amount}", `$${remaining}`)}
                    </p>
                    <span className="text-sm text-muted-foreground">${current} / ${target}</span>
                </div>
                <Progress value={percentage} className="h-2" />
            </div>
            <Button size="sm" className="gap-1.5 shrink-0" asChild>
                <Link href={cta.href}>
                    <ShoppingCart className="size-3.5" />
                    {cta.label}
                </Link>
            </Button>
            <Button variant="ghost" size="icon-sm" className="shrink-0 text-muted-foreground hover:text-foreground">
                <X className="size-4" />
            </Button>
        </div>
    )
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-card border-b border-border py-3 @md:py-4 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-4xl mx-auto">
                    <FreeShippingBar
                        current={35}
                        target={50}
                        message={{
                            below: "Add {amount} more for FREE shipping!",
                            above: "🎉 You've unlocked FREE shipping!",
                        }}
                        cta={{ label: "Continue", href: "/shop" }}
                    />
                </div>
            </div>
        </section>
    )
}
