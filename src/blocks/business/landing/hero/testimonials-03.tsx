import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, HeartHandshake, Quote, Star } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-amber">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={HeartHandshake} text="Customer Love" />
                    <Title text="Hear From Our Happy Customers" />
                    <Description text="Don&apos;t take our word for it. See what thousands of satisfied customers have to say about their experience." />
                </div>
                <TestimonialGrid items={[
                    {
                        quote: "This platform has completely transformed our operations. We've cut our processing time in half and our team loves it.",
                        author: 'Sarah Chen',
                        role: 'COO',
                        company: 'TechFlow Inc',
                        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                        rating: 5,
                    },
                    {
                        quote: "The best investment we've made this year. ROI was visible within the first month of implementation.",
                        author: 'Marcus Johnson',
                        role: 'CEO',
                        company: 'Growth Labs',
                        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
                        rating: 5,
                    },
                    {
                        quote: "Outstanding support team and intuitive interface. Onboarding our 500+ employees was seamless.",
                        author: 'Emily Rodriguez',
                        role: 'HR Director',
                        company: 'Global Corp',
                        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
                        rating: 5,
                    },
                    {
                        quote: "We evaluated 10 different solutions. This was the clear winner in terms of features and value.",
                        author: 'David Park',
                        role: 'VP Engineering',
                        company: 'Innovate Co',
                        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
                        rating: 5,
                    },
                ]} />
                <div className="text-center mt-10">
                    <CTA items={[
                        { label: 'Read More Reviews', href: '#reviews', icon: ArrowRight },
                        { label: 'Share Your Story', href: '#share', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
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
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const TestimonialGrid = ({ items }: { items: { quote: string; author: string; role: string; company: string; avatar: string; rating: number }[] }) => (
    <div className="grid @md:grid-cols-2 gap-6">
        {items.map(({ quote, author, role, company, avatar, rating }, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-6 @md:p-8 hover:shadow-lg hover:border-primary/30 transition-all">
                <div className="flex mb-4">
                    {Array.from({ length: rating }).map((_, j) => (
                        <Star key={j} className="size-4 text-primary fill-primary" />
                    ))}
                </div>
                <Quote className="size-8 text-primary/20 mb-4" />
                <blockquote className="text-lg mb-6 leading-relaxed">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                        <AvatarImage src={avatar} alt={author} />
                        <AvatarFallback>{author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold">{author}</div>
                        <div className="text-sm text-muted-foreground">{role}, {company}</div>
                    </div>
                </div>
            </div>
        ))}
    </div>
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
