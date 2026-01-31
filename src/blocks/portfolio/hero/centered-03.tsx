import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20 @3xl:py-24">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <ProfileImage src="https://avatars.githubusercontent.com/u/252440198?v=4" fallback="JK" />
                    <Eyebrow icon={Briefcase} text="Currently at Google" />
                    <Title text="James Kim" subtitle="Product Designer" />
                    <Description text="I design products that people love. With 8+ years of experience at top tech companies, I've helped ship products used by millions." />

                    <CTA items={[
                        { label: 'See My Work', href: '#work', icon: ArrowRight },
                        { label: 'About Me', href: '#about', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src?: string; fallback: string }) => (
    <Avatar className="size-24 @sm:size-28 @md:size-32 mx-auto mb-6 @md:mb-8 ring-4 ring-border">
        <AvatarImage src={src} />
        <AvatarFallback className="text-2xl @md:text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
    </Avatar>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>, text: string }) => (
    <div className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4 @md:mb-5">
        <Icon className="size-4" />
        <span>{text}</span>
    </div>
)

const Title = ({ text, subtitle }: { text: string; subtitle: string }) => (
    <div className="mb-4 @md:mb-6">
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight">{text}</h1>
        <p className="text-xl @md:text-2xl @xl:text-3xl text-muted-foreground font-light mt-2">{subtitle}</p>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10 @xl:mb-12">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
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
