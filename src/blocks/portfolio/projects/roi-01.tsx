import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, LineChart, TrendingUp, TrendingDown, Target, Award, DollarSign, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={LineChart} text="Results" />
                    <Title text="ROI Focused" />
                    <Description text="Projects showcased with measurable business impact." />
                </div>

                <ROIGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/roi1/600/400',
                            title: 'Banking Platform',
                            category: 'Fintech',
                            metrics: [
                                { label: 'Revenue Increase', value: '+45%', icon: TrendingUp, positive: true },
                                { label: 'User Growth', value: '2.5M', icon: Users, positive: true },
                                { label: 'Cost Reduction', value: '-30%', icon: DollarSign, positive: true },
                            ],
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/roi2/600/400',
                            title: 'E-Commerce Store',
                            category: 'Retail',
                            metrics: [
                                { label: 'Conversion Rate', value: '+120%', icon: Target, positive: true },
                                { label: 'Average Order', value: '+35%', icon: TrendingUp, positive: true },
                                { label: 'Cart Abandonment', value: '-50%', icon: TrendingDown, positive: true },
                            ],
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/roi3/600/400',
                            title: 'Healthcare Portal',
                            category: 'Health',
                            metrics: [
                                { label: 'Patient Satisfaction', value: '+95%', icon: Award, positive: true },
                                { label: 'Wait Time', value: '-60%', icon: TrendingDown, positive: true },
                                { label: 'Active Users', value: '500K', icon: Users, positive: true },
                            ],
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/roi4/600/400',
                            title: 'AI Content Platform',
                            category: 'AI/ML',
                            metrics: [
                                { label: 'Content Output', value: '+400%', icon: TrendingUp, positive: true },
                                { label: 'Time Saved', value: '1000h', icon: Target, positive: true },
                                { label: 'Client Growth', value: '+200%', icon: Users, positive: true },
                            ],
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

interface Metric {
    label: string
    value: string
    icon: ComponentType<{ className?: string }>
    positive: boolean
}

interface ROIItem {
    image: string
    title: string
    category: string
    metrics: Metric[]
    href: string
}

const ROIGrid = ({ items }: { items: ROIItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-6 @lg:gap-8">
        {items.map(({ image, title, category, metrics, href }, i) => (
            <Link key={i} href={href} className="group block">
                <Card className="overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        
                        <div className="absolute inset-x-0 bottom-0 p-5">
                            <Badge className="mb-2">{category}</Badge>
                            <h3 className="text-white font-bold text-xl group-hover:text-primary transition-colors">{title}</h3>
                        </div>
                    </div>
                    
                    <CardContent className="p-5">
                        <div className="grid grid-cols-3 gap-3">
                            {metrics.map(({ label, value, icon: Icon, positive }, j) => (
                                <div key={j} className="text-center p-3 rounded-lg bg-muted/50">
                                    <Icon className={`size-5 mx-auto mb-1 ${positive ? 'text-green-500' : 'text-red-500'}`} />
                                    <div className="font-bold text-lg">{value}</div>
                                    <div className="text-xs text-muted-foreground">{label}</div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="flex items-center justify-end mt-4 text-sm text-muted-foreground group-hover:text-primary transition-colors">
                            <span>View Case Study</span>
                            <ArrowUpRight className="size-4 ml-1" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
