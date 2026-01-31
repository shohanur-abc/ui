import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Code2, Palette, Rocket } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative min-h-screen flex items-center overflow-hidden">
            <BackgroundDecorative />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24 w-full">
                <div className="grid @xl:grid-cols-12 gap-8 @lg:gap-10 @2xl:gap-12 items-center">
                    {/* Left Content - Takes 7 columns */}
                    <div className="@xl:col-span-7 space-y-6 @md:space-y-8">
                        <Eyebrow icon={Sparkles} text="Creative Developer" />
                        <Title name="Sarah Chen" role="I build digital experiences" />
                        <Description text="Combining technical expertise with creative vision to craft memorable web experiences. Specializing in React, TypeScript, and modern design systems." />

                        <SkillBadges items={['React', 'TypeScript', 'Next.js', 'Figma', 'Node.js']} />

                        <CTA items={[
                            { label: 'View Projects', href: '#projects', icon: ArrowRight },
                            { label: 'About Me', href: '#about', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Right Visual - Takes 5 columns */}
                    <div className="@xl:col-span-5 relative">
                        <div className="relative">
                            <HeroImage src="https://i.pravatar.cc/400?img=47" fallback="SC" />
                            <FloatingCards />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const BackgroundDecorative = () => (
    <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 text-sm">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ name, role }: { name: string; role: string }) => (
    <div>
        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @2xl:text-7xl font-bold tracking-tight leading-tight">
            {name}
        </h1>
        <p className="text-xl @md:text-2xl @xl:text-3xl text-muted-foreground mt-2 @md:mt-3">
            {role}
        </p>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-xl">
        {text}
    </p>
)

const SkillBadges = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
            <Badge key={skill} variant="outline" className="px-3 py-1">
                {skill}
            </Badge>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 pt-2">
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

const HeroImage = ({ src, fallback }: { src?: string; fallback: string }) => (
    <div className="relative mx-auto w-64 h-64 @sm:w-72 @sm:h-72 @md:w-80 @md:h-80 @xl:w-96 @xl:h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl rotate-6" />
        <Avatar className="relative w-full h-full rounded-2xl shadow-2xl">
            <AvatarImage src={src} className="object-cover rounded-2xl" />
            <AvatarFallback className="rounded-2xl text-5xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
    </div>
)

const FloatingCards = () => (
    <>
        <div className="absolute -top-4 -left-4 @md:-top-6 @md:-left-6 p-3 @md:p-4 bg-card rounded-xl border shadow-lg backdrop-blur-sm animate-bounce [animation-duration:3s]">
            <Code2 className="size-5 @md:size-6 text-primary" />
        </div>
        <div className="absolute top-1/2 -right-4 @md:-right-8 p-3 @md:p-4 bg-card rounded-xl border shadow-lg backdrop-blur-sm animate-bounce [animation-duration:4s] [animation-delay:1s]">
            <Palette className="size-5 @md:size-6 text-primary" />
        </div>
        <div className="absolute -bottom-4 left-1/4 p-3 @md:p-4 bg-card rounded-xl border shadow-lg backdrop-blur-sm animate-bounce [animation-duration:3.5s] [animation-delay:0.5s]">
            <Rocket className="size-5 @md:size-6 text-primary" />
        </div>
    </>
)
