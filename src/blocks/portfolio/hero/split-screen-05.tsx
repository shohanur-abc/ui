import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Github, Mail, Zap } from 'lucide-react'
import Link from 'next/link'
import { ComponentType, FC } from 'react'


export default function Component() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24 w-full">
                <div className="grid @2xl:grid-cols-[1.5fr_1fr] gap-8 @md:gap-10 @xl:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Zap} text="Available for Projects" />
                        <Title text="Olivia Martinez" />
                        <Subtitle text="I create " highlight="digital magic" />
                        <Description text="A passionate designer and developer with expertise in crafting beautiful, high-performing web applications. I believe great design is invisible until it's needed." />

                        <CTA items={[
                            { label: 'View My Work', href: '#work', iconRight: ArrowRight },
                            { label: 'Contact', href: '#contact', iconLeft: Mail },
                            { label: 'GitHub', href: '#github', iconLeft: Github },
                        ]} />

                        <Stats items={[
                            { label: 'Location', value: 'Barcelona, Spain' },
                            { label: 'Experience', value: '9+ Years' },
                            { label: 'Projects', value: '150+' },
                        ]} />
                    </div>

                    {/* Visual Element */}
                    <div className="hidden @2xl:block">
                        <HeroImage
                            src='https://avatars.githubusercontent.com/u/252440198?v=4'
                            alt="Olivia Martinez"
                            fallback="OM"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}


const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>, text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 mb-4 @md:mb-5 @xl:mb-6">
        <Icon className="size-4" />{text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:text-7xl font-bold mb-4 @md:mb-5 @xl:mb-6 leading-tight tracking-tight">
        {text}
    </h1>
)

const Subtitle = ({ text, highlight }: { text: string; highlight: string }) => (
    <div className="text-xl @sm:text-2xl @md:text-3xl @xl:text-4xl font-medium mb-4 @md:mb-5 @xl:mb-6">
        <span className="text-muted-foreground">{text}</span>
        <span className="relative inline-block">
            <span className="bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {highlight}
            </span>
            <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                <path d="M0 4 Q50 0, 100 4 T200 4" stroke="currentColor" strokeWidth="2" fill="none" className="text-primary/30" />
            </svg>
        </span>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-8 @md:mb-10 @xl:mb-12 leading-relaxed max-w-xl">
        {text}
    </p>
)

interface StatItem {
    label: string
    value: string
}

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="flex items-center gap-6 @md:gap-8 pt-4 @md:pt-6 border-t">
        {items.map(({ label, value }) => (
            <div key={label}>
                <div className="text-xs @md:text-sm text-muted-foreground mb-1">{label}</div>
                <div className="text-sm @md:text-base font-medium">{value}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; iconLeft?: React.ComponentType<{ className?: string }>; iconRight?: React.ComponentType<{ className?: string }>; variant?: React.ComponentProps<typeof Button>['variant'] }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10 @xl:mb-12">
        {items.map(({ label, href, iconLeft: IconLeft, iconRight: IconRight }, i) => (
            <Button key={i} size="lg" className="gap-2" variant={i === 0 ? 'default' : i === 1 ? 'outline' : 'ghost'} asChild>
                <Link href={href}>
                    {IconLeft && <IconLeft className="size-4" />}
                    {label}
                    {IconRight && <IconRight className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

interface HeroImageProps {
    src?: string
    alt?: string
    fallback?: string
}

const HeroImage: FC<HeroImageProps> = ({ src, alt = 'Profile', fallback = 'OM' }) => (
    <div className="relative aspect-square max-w-md mx-auto">
        <div className="absolute inset-0 rounded-4xl bg-linear-to-br from-primary/20 via-primary/10 to-transparent rotate-6" />
        <div className="absolute inset-0 rounded-4xl bg-linear-to-tl from-primary/20 via-primary/10 to-transparent -rotate-6" />
        <div className="relative rounded-4xl bg-card border-2 shadow-2xl flex items-center justify-center h-full">
            <Avatar className="size-60">
                <AvatarImage src={src} alt={alt} className="rounded-3xl" />
                <AvatarFallback className="rounded-3xl bg-linear-to-br from-primary to-primary/60 text-5xl font-bold">{fallback}</AvatarFallback>
            </Avatar>
        </div>
    </div>
)

const BackgroundDecorative = () => (
    <div className="absolute inset-0 bg-background">
        <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[100px] -translate-x-1/2 translate-y-1/2" />
    </div>
)

