import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Gift, Heart, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div className="aspect-4/5 rounded-2xl overflow-hidden">
                                <Image
                                    src="https://picsum.photos/seed/split4a/400/500"
                                    alt="Community member 1"
                                    width={400}
                                    height={500}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <Card className="py-0">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary">50K+</div>
                                    <div className="text-xs text-muted-foreground">Members</div>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="space-y-4 pt-8">
                            <Card className="py-0">
                                <CardContent className="p-4 text-center">
                                    <div className="text-2xl font-bold text-primary">$2M+</div>
                                    <div className="text-xs text-muted-foreground">Rewards Given</div>
                                </CardContent>
                            </Card>
                            <div className="aspect-4/5 rounded-2xl overflow-hidden">
                                <Image
                                    src="https://picsum.photos/seed/split4b/400/500"
                                    alt="Community member 2"
                                    width={400}
                                    height={500}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <Eyebrow icon={Heart} text="Community" />
                        <Title text="Join Our Growing Community" />
                        <Description text="Be part of a community of passionate shoppers who share tips, reviews, and exclusive member benefits." />

                        <FeatureList items={[
                            { icon: Gift, title: 'Exclusive Perks', description: 'Member-only discounts and early access' },
                            { icon: Users, title: 'Connect', description: 'Share reviews and recommendations' },
                            { icon: Sparkles, title: 'Earn Rewards', description: 'Points on every purchase and referral' },
                        ]} />

                        <Button className="mt-6 @md:mt-8" asChild>
                            <Link href="/community">
                                Join Now - It&apos;s Free <ArrowRight className="size-4" />
                            </Link>
                        </Button>
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

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureList = ({ items }: { items: FeatureItem[] }) => (
    <ul className="mt-6 space-y-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <li key={i} className="flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold mb-0.5">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </li>
        ))}
    </ul>
)
