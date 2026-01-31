import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Check, Crown, Sparkles, Star, Zap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4 auto-rows-[minmax(160px,auto)]">
                    <HeroCell
                        title="Upgrade Your Learning"
                        subtitle="Unlock premium content and features"
                        className="@md:col-span-2 row-span-2"
                    />
                    <PricingCell
                        plan="Pro"
                        price="$12"
                        features={['Unlimited access', 'Ad-free reading', 'Exclusive content']}
                        className="row-span-2"
                    />
                    <FeatureCell icon={Star} title="Early Access" description="New content first" className="" />
                    <FeatureCell icon={Zap} title="AI Features" description="Smart summaries" className="" />
                    <TestimonialCell
                        quote="Best investment for my career growth!"
                        author="Sarah K."
                        className="@xl:col-span-2"
                    />
                </div>
            </div>
        </section>
    )
}

interface HeroCellProps {
    title: string
    subtitle: string
    className?: string
}

const HeroCell = ({ title, subtitle, className }: HeroCellProps) => (
    <Card className={`relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-card to-orange-500/5 border-amber-500/20 flex flex-col justify-center ${className}`}>
        <CardContent className="p-6 @md:p-8">
            <Badge className="mb-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                <Crown className="size-3.5 mr-1.5" />
                Premium
            </Badge>
            <h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-3">
                {title}
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md">{subtitle}</p>
            <Button size="lg" asChild className="gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0">
                <Link href="/premium">
                    Get Started
                    <ArrowRight className="size-4" />
                </Link>
            </Button>
        </CardContent>
        <PremiumDecorative />
    </Card>
)

const PremiumDecorative = () => (
    <>
        <div className="absolute top-0 right-0 size-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 size-40 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
    </>
)

interface PricingCellProps {
    plan: string
    price: string
    features: string[]
    className?: string
}

const PricingCell = ({ plan, price, features, className }: PricingCellProps) => (
    <Card className={`bg-gradient-to-b from-primary/5 to-card border-primary/20 ${className}`}>
        <CardContent className="p-5 flex flex-col h-full">
            <Badge variant="outline" className="w-fit mb-4">{plan}</Badge>
            <div className="mb-4">
                <span className="text-4xl font-bold">{price}</span>
                <span className="text-muted-foreground">/month</span>
            </div>
            <ul className="space-y-3 flex-1">
                {features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="size-4 text-primary shrink-0" />
                        {feature}
                    </li>
                ))}
            </ul>
            <Button className="w-full mt-4">Choose Plan</Button>
        </CardContent>
    </Card>
)

interface FeatureCellProps {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    className?: string
}

const FeatureCell = ({ icon: Icon, title, description, className }: FeatureCellProps) => (
    <Card className={`transition-all hover:border-amber-500/50 hover:shadow-lg ${className}`}>
        <CardContent className="p-5 flex flex-col items-center justify-center text-center h-full">
            <div className="size-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-3">
                <Icon className="size-6 text-amber-500" />
            </div>
            <p className="font-semibold">{title}</p>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

interface TestimonialCellProps {
    quote: string
    author: string
    className?: string
}

const TestimonialCell = ({ quote, author, className }: TestimonialCellProps) => (
    <Card className={`bg-muted/30 ${className}`}>
        <CardContent className="p-5 flex flex-col justify-center h-full">
            <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
                ))}
            </div>
            <p className="italic text-lg mb-2">&ldquo;{quote}&rdquo;</p>
            <p className="text-sm text-muted-foreground">— {author}, Premium Member</p>
        </CardContent>
    </Card>
)
