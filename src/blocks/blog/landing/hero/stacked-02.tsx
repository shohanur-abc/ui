import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Star, Users } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="10,000+ readers trust us" />
                    <Title text="Knowledge Meets Community" />
                    <Description text="Join a thriving community of learners and experts sharing insights on technology, design, and innovation." />
                    <Stats
                        items={[
                            { icon: BookOpen, value: '5K+', label: 'Articles' },
                            { icon: Users, value: '125K', label: 'Readers' },
                            { icon: Star, value: '4.9', label: 'Rating' },
                        ]}
                    />
                    <CTA label="Explore Articles" href="/articles" />
                    <AuthorAvatars
                        authors={[
                            { name: 'Sarah', image: 'https://i.pravatar.cc/100?img=30', initials: 'S' },
                            { name: 'Alex', image: 'https://i.pravatar.cc/100?img=31', initials: 'A' },
                            { name: 'Maria', image: 'https://i.pravatar.cc/100?img=32', initials: 'M' },
                            { name: 'John', image: 'https://i.pravatar.cc/100?img=33', initials: 'J' },
                        ]}
                        label="50+ contributing writers"
                    />
                </div>
            </div>
        </section>
    )
}

interface EyebrowProps {
    label: string
}

const Eyebrow = ({ label }: EyebrowProps) => (
    <Badge variant="secondary" className="px-4 py-1.5">
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl">
        {text}
    </p>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

interface StatsProps {
    items: StatItem[]
}

const Stats = ({ items }: StatsProps) => (
    <div className="flex flex-wrap justify-center gap-8 @md:gap-12 mt-2">
        {items.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
                <stat.icon className="size-5 text-muted-foreground mb-1" />
                <span className="text-2xl @md:text-3xl font-bold">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
            </div>
        ))}
    </div>
)

interface CTAProps {
    label: string
    href: string
}

const CTA = ({ label, href }: CTAProps) => (
    <Button size="lg" asChild className="gap-2 mt-4">
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)

interface Author {
    name: string
    image: string
    initials: string
}

interface AuthorAvatarsProps {
    authors: Author[]
    label: string
}

const AuthorAvatars = ({ authors, label }: AuthorAvatarsProps) => (
    <div className="flex flex-col items-center gap-3 mt-4">
        <div className="flex -space-x-3">
            {authors.map((author) => (
                <Avatar key={author.name} className="size-10 ring-2 ring-background">
                    <AvatarImage src={author.image} alt={author.name} />
                    <AvatarFallback className="text-xs">{author.initials}</AvatarFallback>
                </Avatar>
            ))}
            <div className="size-10 rounded-full bg-muted ring-2 ring-background flex items-center justify-center text-xs font-medium">
                +50
            </div>
        </div>
        <span className="text-sm text-muted-foreground">{label}</span>
    </div>
)
