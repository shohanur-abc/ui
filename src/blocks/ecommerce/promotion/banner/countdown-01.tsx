import Link from "next/link"
import { ArrowRight, Percent, Clock, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const GlowDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
    </div>
)

const CountdownUnit = ({ value, label }: { value: string; label: string }) => (
    <div className="flex flex-col items-center">
        <span className="text-3xl @sm:text-4xl @md:text-5xl font-black tabular-nums">{value}</span>
        <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
)

const Countdown = ({ units }: { units: { value: string; label: string }[] }) => (
    <div className="flex items-center gap-4 @md:gap-6">
        {units.map((unit, i) => (
            <div key={i} className="flex items-center gap-4 @md:gap-6">
                <CountdownUnit value={unit.value} label={unit.label} />
                {i < units.length - 1 && (
                    <span className="text-2xl @md:text-3xl font-bold text-muted-foreground/50">:</span>
                )}
            </div>
        ))}
    </div>
)

const ProgressBar = ({ value, text }: { value: number; text: string }) => (
    <div className="w-full max-w-md space-y-2">
        <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{text}</span>
            <span className="font-medium">{value}% claimed</span>
        </div>
        <Progress value={value} className="h-2" />
    </div>
)

const SaleBadge = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge className="gap-1.5 mb-4 @md:mb-6">
        <Icon className="size-3" />
        {text}
    </Badge>
)

const Headline = ({ text, discount }: { text: string; discount: string }) => (
    <div className="mb-6 @md:mb-8">
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">{text}</h2>
        <p className="text-4xl @sm:text-5xl @md:text-6xl font-black text-primary">{discount}</p>
    </div>
)

const CTAButton = ({ label, href, icon: Icon }: { label: string; href: string; icon: React.ElementType }) => (
    <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
        <Link href={href}>
            {label}
            <Icon className="size-4" />
        </Link>
    </Button>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowDecorative />
                <div className="relative max-w-4xl mx-auto text-center space-y-6 @md:space-y-8">
                    <SaleBadge icon={Zap} text="Flash Sale" />
                    <Countdown
                        units={[
                            { value: "00", label: "Days" },
                            { value: "12", label: "Hours" },
                            { value: "45", label: "Minutes" },
                            { value: "30", label: "Seconds" },
                        ]}
                    />
                    <Headline text="Ends Tonight" discount="UP TO 70% OFF" />
                    <div className="flex justify-center">
                        <ProgressBar value={73} text="Limited stock remaining" />
                    </div>
                    <CTAButton label="Shop Flash Sale" href="/flash-sale" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}
