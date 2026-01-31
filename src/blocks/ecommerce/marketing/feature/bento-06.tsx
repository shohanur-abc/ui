import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Infinity, Percent, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <BentoGrid items={{
                    hero: {
                        badge: 'Exclusive Access',
                        title: 'Premium Member Benefits',
                        description: 'Unlock the ultimate shopping experience with our premium membership.',
                        image: 'https://picsum.photos/seed/premium/800/600',
                        cta: { text: 'Join Premium', href: '/premium' },
                    },
                    features: [
                        { icon: Percent, title: '20% Off Everything', description: 'Members-only discount' },
                        { icon: Sparkles, title: 'Early Access', description: '48 hours before launch' },
                        { icon: Infinity, title: 'Free Shipping', description: 'No minimum order' },
                        { icon: Star, title: 'VIP Support', description: 'Priority assistance' },
                    ],
                }} />
            </div>
        </section>
    )
}

interface BentoProps {
    items: {
        hero: {
            badge: string
            title: string
            description: string
            image: string
            cta: { text: string; href: string }
        }
        features: {
            icon: ComponentType<{ className?: string }>
            title: string
            description: string
        }[]
    }
}

const BentoGrid = ({ items }: BentoProps) => (
    <div className="grid @xl:grid-cols-5 gap-6">
        <Card className="py-0 @xl:col-span-3 overflow-hidden group">
            <div className="relative h-full min-h-80">
                <Image
                    src={items.hero.image}
                    alt={items.hero.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <CardContent className="absolute bottom-0 left-0 right-0 p-6 @md:p-8 text-white">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/20 backdrop-blur-sm mb-3">{items.hero.badge}</Badge>
                    <h2 className="text-2xl @md:text-3xl font-bold mb-2">{items.hero.title}</h2>
                    <p className="text-white/80 mb-4 max-w-lg">{items.hero.description}</p>
                    <Button variant="secondary" asChild>
                        <Link href={items.hero.cta.href}>
                            {items.hero.cta.text} <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </CardContent>
            </div>
        </Card>

        <div className="@xl:col-span-2 grid grid-cols-2 gap-4">
            {items.features.map(({ icon: Icon, title, description }, i) => (
                <Card key={i} className="py-0 group hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 @md:p-5 h-full flex flex-col">
                        <div className="size-10 @md:size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-auto group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <Icon className="size-5 @md:size-6" />
                        </div>
                        <div className="mt-4">
                            <h3 className="font-bold text-sm @md:text-base mb-1">{title}</h3>
                            <p className="text-xs text-muted-foreground">{description}</p>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
)
