import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Lightbulb, Clock, TrendingUp, BookOpen } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow={{ icon: BookOpen, text: 'Insights & Expertise' }}
                    title="Knowledge Hub for Modern Business"
                    highlight="Knowledge Hub"
                    description="Discover actionable insights, industry trends, and expert strategies to accelerate your business growth."
                    cta={[
                        { label: 'Browse Articles', href: '#', icon: ArrowRight },
                        { label: 'Subscribe', href: '#', variant: 'outline' }
                    ]}
                />
                <BlogGrid items={[
                    {
                        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
                        category: 'Strategy',
                        readTime: '8 min',
                        title: 'Digital Transformation Strategies for 2024',
                        excerpt: 'Learn how leading companies are leveraging technology to drive innovation and growth.',
                        author: { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/100?img=1' }
                    },
                    {
                        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
                        category: 'Analytics',
                        readTime: '6 min',
                        title: 'Data-Driven Decision Making',
                        excerpt: 'How to build a culture of analytics and make better business decisions.',
                        author: { name: 'Mike Ross', avatar: 'https://i.pravatar.cc/100?img=2' }
                    },
                    {
                        image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=400&fit=crop',
                        category: 'Growth',
                        readTime: '10 min',
                        title: 'Scaling Your SaaS Business',
                        excerpt: 'Proven frameworks for sustainable growth in the competitive SaaS landscape.',
                        author: { name: 'Lisa Wang', avatar: 'https://i.pravatar.cc/100?img=3' }
                    }
                ]} />
                <Categories items={[
                    { name: 'Strategy', count: 24, icon: Lightbulb },
                    { name: 'Technology', count: 18, icon: TrendingUp },
                    { name: 'Leadership', count: 15, icon: BookOpen },
                    { name: 'Growth', count: 12, icon: TrendingUp }
                ]} />
            </div>
        </section>
    )
}

const Header = ({ eyebrow, title, highlight, description, cta }: { 
    eyebrow: { icon: ComponentType<{ className?: string }>; text: string };
    title: string;
    highlight: string;
    description: string;
    cta: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[];
}) => {
    const Icon = eyebrow.icon
    const parts = title.split(highlight)
    
    return (
        <div className="text-center mb-12 @xl:mb-16">
            <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1">
                <Icon className="size-4" />
                {eyebrow.text}
            </Badge>
            <h1 className="text-3xl @md:text-4xl @xl:text-5xl @3xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6">
                {parts[0]}<span className="text-primary">{highlight}</span>{parts[1]}
            </h1>
            <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 max-w-3xl mx-auto">
                {description}
            </p>
            <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
                {cta.map(({ label, href, icon: CtaIcon, variant = 'default' }, i) => (
                    <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                        <Link href={href}>
                            {label}
                            {CtaIcon && <CtaIcon className="size-4" />}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}

const BlogGrid = ({ items }: { items: { image: string; category: string; readTime: string; title: string; excerpt: string; author: { name: string; avatar: string } }[] }) => (
    <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-6 @xl:gap-8 mb-12 @xl:mb-16">
        {items.map((item, i) => (
            <Card key={i} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                    <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <CardContent className="p-5 @md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="size-3" />
                            {item.readTime}
                        </span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{item.excerpt}</p>
                    <div className="flex items-center gap-3">
                        <Image
                            src={item.author.avatar}
                            alt={item.author.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                        />
                        <span className="text-sm font-medium">{item.author.name}</span>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const Categories = ({ items }: { items: { name: string; count: number; icon: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map(({ name, count, icon: Icon }, i) => (
            <Button key={i} variant="outline" className="gap-2">
                <Icon className="size-4" />
                {name}
                <Badge variant="secondary" className="ml-1">{count}</Badge>
            </Button>
        ))}
    </div>
)
