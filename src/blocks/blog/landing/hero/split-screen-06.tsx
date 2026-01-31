import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, MessageSquare, Pencil, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="slate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
                    <ContentSection
                        eyebrow={{ icon: Pencil, text: 'Write with Us' }}
                        title="Share Your Expertise"
                        highlight="With the World"
                        description="Join our community of writers and reach millions of developers. Get paid for your expertise and build your personal brand."
                        stats={[
                            { icon: Users, value: '50K+', label: 'Writers' },
                            { icon: MessageSquare, value: '2M+', label: 'Readers' },
                            { icon: Star, value: '$500K+', label: 'Paid Out' },
                        ]}
                        cta={[
                            { label: 'Become a Writer', href: '/write', icon: ArrowRight },
                            { label: 'Learn More', href: '/about-writing', variant: 'ghost' },
                        ]}
                    />
                    <TestimonialsSection
                        items={[
                            {
                                quote: 'Publishing here helped me land my dream job at Google.',
                                author: { name: 'Alex Chen', avatar: 'https://i.pravatar.cc/100?img=11', initials: 'AC' },
                                role: 'Software Engineer',
                            },
                            {
                                quote: 'I\'ve earned over $10K sharing what I know. Life-changing!',
                                author: { name: 'Sarah Kim', avatar: 'https://i.pravatar.cc/100?img=12', initials: 'SK' },
                                role: 'Tech Writer',
                            },
                            {
                                quote: 'The community feedback has made me a better engineer.',
                                author: { name: 'Mike Johnson', avatar: 'https://i.pravatar.cc/100?img=13', initials: 'MJ' },
                                role: 'Frontend Developer',
                            },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string }
    title: string
    highlight: string
    description: string
    stats: StatItem[]
    cta: CTAItem[]
}

const ContentSection = ({ eyebrow, title, highlight, description, stats, cta }: ContentSectionProps) => (
    <div className="space-y-6">
        <Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
        <Title text={title} highlight={highlight} />
        <Description text={description} />
        <Stats items={stats} />
        <CTA items={cta} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="gap-2 px-4 py-1.5 bg-primary text-primary-foreground">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
        <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">
        {text}
    </p>
)

const Stats = ({ items }: { items: StatItem[] }) => (
    <div className="flex flex-wrap gap-6 @md:gap-8">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
                <Icon className="size-5 text-primary mx-auto mb-1" />
                <p className="text-xl @md:text-2xl font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

interface Author {
    name: string
    avatar: string
    initials: string
}

interface Testimonial {
    quote: string
    author: Author
    role: string
}

const TestimonialsSection = ({ items }: { items: Testimonial[] }) => (
    <div className="space-y-4">
        {items.map((item) => (
            <TestimonialCard key={item.author.name} testimonial={item} />
        ))}
    </div>
)

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="p-5 @md:p-6 rounded-xl bg-card border">
        <p className="text-base @md:text-lg mb-4 italic">&ldquo;{testimonial.quote}&rdquo;</p>
        <div className="flex items-center gap-3">
            <Avatar className="size-10">
                <AvatarImage src={testimonial.author.avatar} alt={testimonial.author.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                    {testimonial.author.initials}
                </AvatarFallback>
            </Avatar>
            <div>
                <p className="font-semibold text-sm">{testimonial.author.name}</p>
                <p className="text-xs text-muted-foreground">{testimonial.role}</p>
            </div>
        </div>
    </div>
)
