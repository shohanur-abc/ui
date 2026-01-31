import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ArrowUpRight, Quote, MessageSquareQuote } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={MessageSquareQuote} text="Quotes" />
                    <Title text="Client Stories" />
                    <Description text="Projects paired with client testimonials." />
                </div>

                <QuoteGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/quote1/800/600',
                            title: 'Banking Platform',
                            category: 'Fintech',
                            clientName: 'Sarah Chen',
                            clientRole: 'CEO, FinTech Corp',
                            clientImage: 'https://randomuser.me/api/portraits/women/44.jpg',
                            quote: 'The platform transformed how we serve our customers. Transaction speed improved by 300%.',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/quote2/800/600',
                            title: 'Healthcare App',
                            category: 'Health',
                            clientName: 'Dr. Michael Ross',
                            clientRole: 'Director, MedTech Solutions',
                            clientImage: 'https://randomuser.me/api/portraits/men/32.jpg',
                            quote: 'Patient satisfaction scores increased 45% after launching this intuitive system.',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/quote3/800/600',
                            title: 'E-Commerce Store',
                            category: 'Retail',
                            clientName: 'Emily Watson',
                            clientRole: 'Founder, StyleHub',
                            clientImage: 'https://randomuser.me/api/portraits/women/68.jpg',
                            quote: 'Our online sales doubled within the first quarter. The UX is absolutely phenomenal.',
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface QuoteItem {
    image: string
    title: string
    category: string
    clientName: string
    clientRole: string
    clientImage: string
    quote: string
    href: string
}

const QuoteGrid = ({ items }: { items: QuoteItem[] }) => (
    <div className="space-y-8">
        {items.map(({ image, title, category, clientName, clientRole, clientImage, quote, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <div className={`grid @lg:grid-cols-2 ${i % 2 === 1 ? '@lg:grid-flow-col-dense' : ''}`}>
                    {/* Project image */}
                    <Link 
                        href={href} 
                        className={`relative aspect-video @lg:aspect-auto @lg:min-h-[300px] overflow-hidden ${i % 2 === 1 ? '@lg:col-start-2' : ''}`}
                    >
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t @lg:bg-gradient-to-r from-card/80 via-transparent to-transparent" />
                        
                        <div className="absolute top-4 left-4">
                            <Badge>{category}</Badge>
                        </div>
                        
                        <div className="absolute bottom-4 left-4 right-4 @lg:right-auto">
                            <h3 className="text-white font-bold text-xl @md:text-2xl group-hover:text-primary transition-colors">{title}</h3>
                        </div>
                    </Link>
                    
                    {/* Quote section */}
                    <div className={`p-6 @md:p-8 flex flex-col justify-center ${i % 2 === 1 ? '@lg:col-start-1' : ''}`}>
                        <Quote className="size-10 text-primary/30 mb-4" />
                        
                        <blockquote className="text-lg @md:text-xl font-medium mb-6 leading-relaxed">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="relative size-12 rounded-full overflow-hidden border-2 border-primary">
                                    <Image 
                                        src={clientImage} 
                                        alt={clientName} 
                                        fill 
                                        className="object-cover" 
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold">{clientName}</div>
                                    <div className="text-sm text-muted-foreground">{clientRole}</div>
                                </div>
                            </div>
                            
                            <Button variant="outline" size="sm" className="gap-1.5" asChild>
                                <Link href={href}>
                                    View <ArrowUpRight className="size-3.5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </Card>
        ))}
    </div>
)
