import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, SplitSquareHorizontal, PanelLeftClose, PanelRightClose } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={SplitSquareHorizontal} text="Panels" />
                    <Title text="Panel Layout" />
                    <Description text="Side-by-side panels with image and content sections." />
                </div>

                <PanelGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/panel1/800/600',
                            title: 'Enterprise Dashboard',
                            description: 'Comprehensive analytics platform providing real-time insights for data-driven decision making.',
                            category: 'SaaS',
                            features: ['Real-time Analytics', 'Custom Reports', 'Team Collaboration'],
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/panel2/800/600',
                            title: 'Mobile Banking App',
                            description: 'Secure and intuitive mobile banking experience with biometric authentication.',
                            category: 'Fintech',
                            features: ['Biometric Login', 'Instant Transfers', 'Budget Tracking'],
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/panel3/800/600',
                            title: 'Healthcare Platform',
                            description: 'Digital health solution connecting patients with providers seamlessly.',
                            category: 'Health',
                            features: ['Telehealth', 'Appointment Booking', 'Health Records'],
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

interface PanelItem {
    image: string
    title: string
    description: string
    category: string
    features: string[]
    href: string
}

const PanelGrid = ({ items }: { items: PanelItem[] }) => (
    <div className="space-y-6">
        {items.map(({ image, title, description, category, features, href }, i) => {
            const isOdd = i % 2 === 1
            
            return (
                <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                    <div className={`grid @lg:grid-cols-2 ${isOdd ? '@lg:grid-flow-col-dense' : ''}`}>
                        {/* Image panel */}
                        <Link 
                            href={href} 
                            className={`relative aspect-video @lg:aspect-auto @lg:min-h-[350px] overflow-hidden ${isOdd ? '@lg:col-start-2' : ''}`}
                        >
                            <Image 
                                src={image} 
                                alt={title} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                            
                            {/* Hover indicator */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <div className="size-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                                    <ArrowUpRight className="size-8 text-white" />
                                </div>
                            </div>
                        </Link>
                        
                        {/* Content panel */}
                        <div className={`p-6 @md:p-8 @lg:p-10 flex flex-col justify-center ${isOdd ? '@lg:col-start-1' : ''}`}>
                            <Badge className="w-fit mb-4">{category}</Badge>
                            <h3 className="font-bold text-2xl @md:text-3xl mb-3 group-hover:text-primary transition-colors">{title}</h3>
                            <p className="text-muted-foreground mb-6">{description}</p>
                            
                            {/* Features */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {features.map((feature, j) => (
                                    <Badge key={j} variant="secondary">{feature}</Badge>
                                ))}
                            </div>
                            
                            <Button className="gap-2 w-fit" asChild>
                                <Link href={href}>
                                    View Project <ArrowUpRight className="size-4" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Card>
            )
        })}
    </div>
)
