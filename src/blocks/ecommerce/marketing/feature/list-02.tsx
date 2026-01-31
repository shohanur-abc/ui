import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Check } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 @3xl:gap-16 items-center">
                    <div className="relative">
                        <div className="aspect-square rounded-2xl @md:rounded-3xl overflow-hidden">
                            <Image
                                src="https://picsum.photos/seed/list2/800/800"
                                alt="Premium service"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    <div>
                        <Badge variant="outline" className="mb-3 @md:mb-4">Premium Service</Badge>
                        <h2 className="text-2xl @sm:text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
                            White Glove Treatment for Every Order
                        </h2>
                        <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
                            Experience the difference of truly premium service, from order to delivery.
                        </p>

                        <FeatureList items={[
                            { title: 'Personal Shopping Assistance', description: 'Expert help finding the perfect products' },
                            { title: 'Premium Packaging', description: 'Beautifully presented, ready for gifting' },
                            { title: 'Priority Processing', description: 'Jump the queue with express handling' },
                            { title: 'Dedicated Support', description: 'VIP customer service channel' },
                        ]} />

                        <Button className="mt-6 @md:mt-8" asChild>
                            <Link href="/premium">
                                Upgrade to Premium <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}

interface FeatureItem {
    title: string
    description: string
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
    <ul className="space-y-4">
        {items.map(({ title, description }, i) => (
            <li key={i} className="flex gap-4">
                <div className="size-6 rounded-full bg-primary flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary-foreground" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)
