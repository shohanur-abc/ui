import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, Users, Linkedin, Twitter } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Users} text="Our Leadership" />
                    <Title text="Meet the Team Behind the Vision" />
                    <Description text="World-class experts from Google, Amazon, and Microsoft, united by a mission to transform how businesses operate." />
                    <CTA items={[
                        { label: 'Join Our Team', href: '#careers', icon: ArrowRight },
                        { label: 'Our Story', href: '#story', variant: 'outline' },
                    ]} />
                </div>
                <TeamGrid items={[
                    { 
                        name: 'Sarah Chen', 
                        role: 'CEO & Co-Founder', 
                        avatar: 'https://i.pravatar.cc/150?img=32',
                        bio: 'Former VP at Google. 15+ years in tech leadership.',
                        social: { linkedin: '#', twitter: '#' },
                    },
                    { 
                        name: 'Michael Park', 
                        role: 'CTO & Co-Founder', 
                        avatar: 'https://i.pravatar.cc/150?img=11',
                        bio: 'Ex-Amazon Principal Engineer. PhD in Computer Science.',
                        social: { linkedin: '#', twitter: '#' },
                    },
                    { 
                        name: 'Emily Watson', 
                        role: 'Chief Product Officer', 
                        avatar: 'https://i.pravatar.cc/150?img=23',
                        bio: 'Previously led Product at Stripe. Design thinking expert.',
                        social: { linkedin: '#', twitter: '#' },
                    },
                    { 
                        name: 'James Miller', 
                        role: 'Chief Revenue Officer', 
                        avatar: 'https://i.pravatar.cc/150?img=53',
                        bio: 'Built sales teams at 3 unicorns. Revenue growth specialist.',
                        social: { linkedin: '#', twitter: '#' },
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
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

const TeamGrid = ({ items }: { items: { name: string; role: string; avatar: string; bio: string; social: { linkedin: string; twitter: string } }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {items.map(({ name, role, avatar, bio, social }, i) => (
            <div key={i} className="group text-center bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/30 transition-all">
                <Avatar className="size-24 mx-auto mb-4 ring-4 ring-background">
                    <AvatarImage src={avatar} />
                    <AvatarFallback className="text-xl">{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg mb-1">{name}</h3>
                <p className="text-sm text-primary mb-3">{role}</p>
                <p className="text-sm text-muted-foreground mb-4">{bio}</p>
                <div className="flex justify-center gap-3">
                    <Link href={social.linkedin} className="text-muted-foreground hover:text-primary transition-colors">
                        <Linkedin className="size-5" />
                    </Link>
                    <Link href={social.twitter} className="text-muted-foreground hover:text-primary transition-colors">
                        <Twitter className="size-5" />
                    </Link>
                </div>
            </div>
        ))}
    </div>
)
