import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, MapPin, Info } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 overflow-hidden">
                <ul className="grid @3xl:grid-cols-2 gap-12 @lg:gap-16 @3xl:gap-20 items-center">
                    <HeroImage src="https://avatars.githubusercontent.com/u/252440198?v=4" fallback="JD" />

                    <li>
                        <Eyebrow icon={Info} text="About Me" />
                        <Title text="John Doe" />
                        <Description text="I'm a passionate Full-Stack Developer and Designer dedicated to crafting exceptional digital experiences. With over 8 years in the industry, I specialize in building scalable web applications that are both beautiful and functional." />
                        <Location text="San Francisco, CA" />
                        <Tags items={['React', 'TypeScript', 'Node.js', 'UI/UX', 'System Design']} />
                        <CTA items={[
                            { label: 'Get in Touch', href: '#contact', icon: ArrowRight },
                            { label: 'Download CV', href: '#cv', variant: 'outline' },
                        ]} />
                    </li>
                </ul>
            </div>
        </section>
    )
}

const HeroImage = ({ src, fallback }: { src?: string; fallback: string }) => (
    <div className="relative">
        <div className="absolute -inset-4 bg-linear-to-br from-primary/20 to-primary/5 rounded-3xl rotate-3" />
        <Avatar className="relative w-full h-full aspect-square mx-auto rounded-2xl">
            <AvatarImage src={src} className="rounded-2xl object-cover" />
            <AvatarFallback className="rounded-2xl text-6xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
    </div>
)
const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>, text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-3 py-1 w-fit mb-6">
        <Icon className="size-4" />{text}
    </Badge>
)
const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}
    </h1>
)
const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8 @md:mb-10 @xl:mb-12">
        {text}
    </p>
)

const Location = ({ text }: { text: string }) => (
    <div className="flex items-center gap-2 text-sm @md:text-base text-muted-foreground mb-6">
        <MapPin className="size-4 @md:size-5" />
        <span>{text}</span>
    </div>
)

const Tags = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2 mb-8 @md:mb-10">
        {items.map((tag, i) => (
            <Badge key={i} variant="secondary">{tag}</Badge>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
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
