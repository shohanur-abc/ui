import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, GraduationCap, Award, Star } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-28 @3xl:py-32 w-full">
                <div className="grid @2xl:grid-cols-5 gap-8 @lg:gap-12 @3xl:gap-16 items-start">
                    {/* Main Content - 3 columns */}
                    <div className="@2xl:col-span-3 space-y-6 @md:space-y-8">
                        <div className="flex items-center gap-4 @md:gap-6">
                            <HeroAvatar src="https://i.pravatar.cc/400?img=32" fallback="MR" />
                            <div>
                                <Eyebrow icon={Briefcase} text="Senior UX Designer" />
                                <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mt-1">
                                    Marcus Rivera
                                </h1>
                            </div>
                        </div>

                        <Title text="Designing" highlight="human-centered" suffix="digital products" />
                        <Description text="With over 10 years of experience in product design, I help companies create intuitive and delightful user experiences that drive business results." />

                        <CTA items={[
                            { label: 'See Case Studies', href: '#work', icon: ArrowRight },
                            { label: 'Let\'s Talk', href: '#contact', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Stats Cards - 2 columns */}
                    <div className="@2xl:col-span-2 grid @xs:grid-cols-2 @2xl:grid-cols-1 gap-4 @md:gap-5">
                        <StatCard icon={Briefcase} value="50+" label="Projects Delivered" />
                        <StatCard icon={GraduationCap} value="10+" label="Years Experience" />
                        <StatCard icon={Award} value="15" label="Design Awards" />
                        <StatCard icon={Star} value="100%" label="Client Satisfaction" />
                    </div>
                </div>
            </div>
        </section>
    )
}

const BackgroundDecorative = () => (
    <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </div>
)

const HeroAvatar = ({ src, fallback }: { src?: string; fallback: string }) => (
    <Avatar className="size-16 @sm:size-20 @md:size-24 ring-4 ring-background shadow-xl">
        <AvatarImage src={src} />
        <AvatarFallback className="text-xl @md:text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
    </Avatar>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-1.5 text-xs">
        <Icon className="size-3" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold leading-tight tracking-tight">
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {highlight}
        </span>{' '}
        {suffix}
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground leading-relaxed max-w-2xl">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const StatCard = ({ icon: Icon, value, label }: { icon: ComponentType<{ className?: string }>; value: string; label: string }) => (
    <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 py-0">
        <CardContent className="flex items-center gap-4 p-4 @md:p-5">
            <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 @md:size-6 text-primary" />
            </div>
            <div>
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        </CardContent>
    </Card>
)
