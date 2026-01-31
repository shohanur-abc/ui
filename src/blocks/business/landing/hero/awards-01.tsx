import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Trophy, Star, Award, Medal, Crown } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <AwardsShowcase items={[
                        { icon: Crown, title: 'G2 Leader', subtitle: 'Winter 2024', rating: '4.8/5' },
                        { icon: Trophy, title: 'Best in Class', subtitle: 'TechCrunch Disrupt', rating: 'Winner' },
                        { icon: Award, title: 'Top 100', subtitle: 'Forbes Cloud 100', rating: '#12' },
                        { icon: Medal, title: 'Customers Choice', subtitle: 'Gartner Peer Insights', rating: '4.9/5' },
                    ]} />
                    <div>
                        <Eyebrow icon={Trophy} text="Award Winning" />
                        <Title text="Recognized by Industry Leaders" highlight="Industry Leaders" />
                        <Description text="Don&apos;t just take our word for it. See why analysts, reviewers, and customers consistently rate us #1 in the market." />
                        <ReviewSummary 
                            averageRating={4.8}
                            totalReviews={12500}
                            platforms={['G2', 'Capterra', 'TrustPilot']}
                        />
                        <CTA items={[
                            { label: 'Read Reviews', href: '#reviews', icon: ArrowRight },
                            { label: 'View All Awards', href: '#awards', variant: 'outline' },
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text.split(highlight)[0]}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const ReviewSummary = ({ averageRating, totalReviews, platforms }: { averageRating: number; totalReviews: number; platforms: string[] }) => (
    <div className="flex flex-wrap items-center gap-4 mb-8 p-4 rounded-lg bg-muted/50 border border-border/50">
        <div className="flex items-center gap-2">
            <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`size-5 ${i < Math.floor(averageRating) ? 'text-primary fill-primary' : 'text-muted-foreground'}`} />
                ))}
            </div>
            <span className="font-bold">{averageRating}</span>
        </div>
        <div className="text-sm text-muted-foreground">
            Based on <span className="font-medium text-foreground">{totalReviews.toLocaleString()}</span> reviews across {platforms.join(', ')}
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const AwardsShowcase = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; subtitle: string; rating: string }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, subtitle, rating }, i) => (
            <div key={i} className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="size-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{title}</h3>
                <p className="text-sm text-muted-foreground mb-2">{subtitle}</p>
                <p className="text-2xl font-bold text-primary">{rating}</p>
            </div>
        ))}
    </div>
)
