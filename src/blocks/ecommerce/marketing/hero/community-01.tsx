import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Users, MessageCircle, Star, TrendingUp } from 'lucide-react'
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
                        <Eyebrow icon={Users} text="Community" />
                        <Title text="Join Our" highlight="Community" />
                        <Description text="More than just a store – we're a community of enthusiasts. Share your style, get inspired, and connect with thousands of like-minded shoppers." />

                        <CommunityStats items={[
                            { icon: Users, value: '50K+', label: 'Members' },
                            { icon: MessageCircle, value: '10K+', label: 'Daily Posts' },
                            { icon: Star, value: '4.9', label: 'Rating' },
                        ]} />

                        <CommunityHighlights />

                        <CTA items={[
                            { label: 'Join Community', href: '/community/join', icon: ArrowRight },
                            { label: 'Browse Feed', href: '/community', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Community Visual */}
                    <div className="relative">
                        <CommunityVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const CommunityStats = ({ items }: { items: { icon: ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="flex gap-6 mb-6 @md:mb-8">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label}>
                <div className="flex items-center gap-2 mb-1">
                    <Icon className="size-4 text-primary" />
                    <span className="text-xl font-bold">{value}</span>
                </div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CommunityHighlights = () => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm font-medium mb-3">Active Members</div>
        <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                    <Avatar key={i} className="size-10 border-2 border-background">
                        <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 20}`} />
                        <AvatarFallback>U{i}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
            <div className="text-sm text-muted-foreground">
                +12,847 members online now
            </div>
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const CommunityVisual = () => (
    <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl" />

        {/* Feed preview */}
        <div className="relative max-w-sm mx-auto space-y-4">
            {/* Post 1 */}
            <div className="p-4 bg-card rounded-2xl shadow-lg border">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="size-10">
                        <AvatarImage src="https://i.pravatar.cc/100?img=5" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm">Jane D.</div>
                        <div className="text-xs text-muted-foreground">2 hours ago</div>
                    </div>
                </div>
                <div className="text-sm mb-3">Just got my new summer collection! The quality is amazing 🔥</div>
                <div className="grid grid-cols-2 gap-2 rounded-xl overflow-hidden">
                    <div className="relative aspect-square">
                        <Image src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200" alt="Post" fill className="object-cover" />
                    </div>
                    <div className="relative aspect-square">
                        <Image src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200" alt="Post" fill className="object-cover" />
                    </div>
                </div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>❤️ 234</span>
                    <span>💬 45</span>
                </div>
            </div>

            {/* Post 2 */}
            <div className="p-4 bg-card rounded-2xl shadow-lg border">
                <div className="flex items-center gap-3 mb-3">
                    <Avatar className="size-10">
                        <AvatarImage src="https://i.pravatar.cc/100?img=8" />
                        <AvatarFallback>MK</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-sm">Mike K.</div>
                        <div className="text-xs text-muted-foreground">5 hours ago</div>
                    </div>
                </div>
                <div className="text-sm">Any recommendations for fall jackets? Looking for something versatile 🍂</div>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span>❤️ 56</span>
                    <span>💬 23</span>
                </div>
            </div>

            {/* Trending badge */}
            <div className="absolute -top-4 -right-4 px-3 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full shadow-lg flex items-center gap-1.5">
                <TrendingUp className="size-4" />
                Trending
            </div>
        </div>
    </div>
)
