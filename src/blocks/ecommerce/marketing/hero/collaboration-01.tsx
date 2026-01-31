import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Users, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Sparkles} text="Exclusive Collab" />
                        <Title text="Limited Edition" highlight="x Designer" />
                        <Description text="A groundbreaking collaboration between our brand and world-renowned designer Alexandra Chen. Only 500 pieces available worldwide." />

                        <CollaboratorInfo
                            name="Alexandra Chen"
                            role="Fashion Designer"
                            avatar="https://i.pravatar.cc/100?img=47"
                            followers="2.5M"
                        />

                        <LimitedInfo remaining={127} total={500} />

                        <CTA items={[
                            { label: 'Shop Collection', href: '/collab', icon: ArrowRight },
                            { label: 'Learn More', href: '/about-collab', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Product Showcase */}
                    <div className="relative">
                        <CollabShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-primary/50">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

interface CollaboratorInfoProps {
    name: string
    role: string
    avatar?: string
    followers: string
}

const CollaboratorInfo = ({ name, role, avatar, followers }: CollaboratorInfoProps) => (
    <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/50 border mb-6 @md:mb-8">
        <Avatar className="size-14 @md:size-16">
            <AvatarImage src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-sm text-muted-foreground">{role}</div>
        </div>
        <div className="text-right">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Users className="size-4" />
                {followers}
            </div>
            <div className="text-xs text-muted-foreground">followers</div>
        </div>
    </div>
)

const LimitedInfo = ({ remaining, total }: { remaining: number; total: number }) => (
    <div className="mb-8 @md:mb-10">
        <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Limited Availability</span>
            <span className="font-semibold">{remaining} / {total} remaining</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
                className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                style={{ width: `${(remaining / total) * 100}%` }}
            />
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600' : ''}`}
                asChild
            >
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const CollabShowcase = () => (
    <div className="relative">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-transparent rounded-3xl blur-3xl" />

        {/* Product stack */}
        <div className="relative">
            <div className="relative aspect-[4/5] max-w-md mx-auto">
                <Image
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600"
                    alt="Collaboration Collection"
                    fill
                    className="object-cover rounded-3xl shadow-2xl"
                />

                {/* Limited badge */}
                <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-lg">
                    <span className="text-sm font-semibold">Limited Edition</span>
                </div>

                {/* Signature */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-2xl p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs text-muted-foreground">Signed by Designer</div>
                            <div className="font-script text-xl">Alexandra Chen</div>
                        </div>
                        <div className="text-right">
                            <div className="text-xs text-muted-foreground">Starting at</div>
                            <div className="font-bold text-lg">$349</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
