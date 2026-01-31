import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, CheckCircle2, Star, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="order-2 @3xl:order-1">
                        <Eyebrow icon={Award} text="Award Winning" />
                        <Title text="Excellence in Every Detail" />
                        <Description text="Recognized by industry experts for our commitment to quality, innovation, and customer satisfaction." />

                        <FeatureList items={[
                            'Best Online Retailer 2024',
                            'Customer Choice Award Winner',
                            '99.8% Satisfaction Rate',
                            'Trusted by 2M+ Customers',
                        ]} />

                        <div className="flex flex-wrap gap-6 mt-8">
                            <Stat icon={Star} value="4.9" label="Avg Rating" />
                            <Stat icon={Users} value="2M+" label="Customers" />
                        </div>

                        <Button className="mt-8" asChild>
                            <Link href="/about">
                                Our Story <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="order-1 @3xl:order-2">
                        <div className="relative aspect-square @3xl:aspect-4/5 rounded-2xl @md:rounded-3xl overflow-hidden">
                            <Image
                                src="https://picsum.photos/seed/split1/800/1000"
                                alt="Award ceremony"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        <Icon className="size-3.5" />
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

const FeatureList = ({ items }: { items: string[] }) => (
    <ul className="mt-6 space-y-3">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span className="text-sm @md:text-base">{item}</span>
            </li>
        ))}
    </ul>
)

const Stat = ({ icon: Icon, value, label }: { icon: ComponentType<{ className?: string }>; value: string; label: string }) => (
    <div className="flex items-center gap-3">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="size-5 text-primary" />
        </div>
        <div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </div>
    </div>
)
