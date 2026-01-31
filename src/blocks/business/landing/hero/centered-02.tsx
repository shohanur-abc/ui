import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, Star, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={Star} text="Trusted by Fortune 500" />
                    <Title text="Enterprise-Grade Solutions for Modern Businesses" />
                    <Description text="Streamline operations, boost productivity, and drive revenue with our comprehensive suite of business tools." />
                    <CTA items={[
                        { label: 'Start Free Trial', href: '#trial', icon: ArrowRight },
                        { label: 'Book Demo', href: '#demo', variant: 'outline' },
                    ]} />
                    <TrustedBy 
                        label="Trusted by 10,000+ companies"
                        avatars={[
                            { src: 'https://i.pravatar.cc/150?img=1', fallback: 'JD' },
                            { src: 'https://i.pravatar.cc/150?img=2', fallback: 'MK' },
                            { src: 'https://i.pravatar.cc/150?img=3', fallback: 'AS' },
                            { src: 'https://i.pravatar.cc/150?img=4', fallback: 'RB' },
                            { src: 'https://i.pravatar.cc/150?img=5', fallback: 'CT' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-6 @md:mb-8 gap-2 px-4 py-1.5">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-6 @md:mb-8 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4 mb-10 @md:mb-12">
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

const TrustedBy = ({ label, avatars }: { label: string; avatars: { src: string; fallback: string }[] }) => (
    <div className="flex flex-col items-center gap-4">
        <div className="flex -space-x-3">
            {avatars.map((avatar, i) => (
                <Avatar key={i} className="size-10 ring-2 ring-background">
                    <AvatarImage src={avatar.src} />
                    <AvatarFallback className="text-xs">{avatar.fallback}</AvatarFallback>
                </Avatar>
            ))}
        </div>
        <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Users className="size-4" />
            {label}
        </p>
    </div>
)
