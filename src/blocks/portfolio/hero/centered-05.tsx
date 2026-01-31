import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight, Copy, Check } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center justify-center">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 w-full">
                <div className="max-w-3xl mx-auto text-center">
                    <ProfileImage src="https://i.pravatar.cc/400?img=5" fallback="JL" />
                    <Greeting text="Hello, I'm" />
                    <Title text="Jordan Lee" />
                    <Subtitle text="Software Engineer" highlight="@Meta" />
                    <Description text="I build products that scale to billions. Previously at Amazon and Microsoft. Open source contributor and occasional writer." />

                    <CTA items={[
                        { label: 'See My Work', href: '#work', icon: ArrowRight },
                        { label: 'Get Resume', href: '#resume' },
                    ]} />

                    <EmailCopy email="jordan@example.com" />
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src?: string; fallback: string }) => (
    <Avatar className="size-24 @sm:size-28 @md:size-32 mx-auto mb-6 @md:mb-8 ring-4 ring-primary/10">
        <AvatarImage src={src} />
        <AvatarFallback className="text-2xl @md:text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
    </Avatar>
)

const Greeting = ({ text }: { text: string }) => (
    <p className="text-sm @md:text-base text-muted-foreground mb-2">{text}</p>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-3">
        {text}
    </h1>
)

const Subtitle = ({ text, highlight }: { text: string; highlight: string }) => (
    <p className="text-xl @md:text-2xl mb-6 @md:mb-8">
        <span className="text-muted-foreground">{text} </span>
        <span className="text-primary font-medium">{highlight}</span>
    </p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8 @md:mb-10">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4 mb-10 @md:mb-12">
        {items.map(({ label, href, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={i === 0 ? 'default' : 'outline'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const EmailCopy = ({ email }: { email: string }) => (
    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-muted/50 border">
        <span className="text-sm text-muted-foreground">{email}</span>
        <button
            className="p-1.5 rounded-md hover:bg-background transition-colors"
            aria-label="Copy email"
        >
            <Copy className="size-3.5 text-muted-foreground" />
        </button>
    </div>
)
