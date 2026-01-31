import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Sparkles} text="Influencer Pick" />
                        <Title text="As Seen" highlight="On Social" />
                        <Description text="Discover the products that influencers and celebrities can't stop talking about. Shop the looks that are breaking the internet." />

                        <InfluencerQuote
                            quote="This collection is absolutely stunning! The quality and attention to detail is unmatched."
                            name="Emily Chen"
                            handle="@emilychen"
                            avatar="https://i.pravatar.cc/100?img=47"
                            followers="2.5M"
                        />

                        <CTA items={[
                            { label: 'Shop the Look', href: '/influencer-picks', icon: ArrowRight },
                            { label: 'Follow Us', href: '/social', variant: 'outline' },
                        ]} />

                        <SocialProof />
                    </div>

                    {/* Social Feed */}
                    <div className="relative">
                        <SocialFeed />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-pink-500/50 text-pink-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

interface InfluencerQuoteProps {
    quote: string
    name: string
    handle: string
    avatar?: string
    followers: string
}

const InfluencerQuote = ({ quote, name, handle, avatar, followers }: InfluencerQuoteProps) => (
    <div className="p-5 rounded-2xl bg-gradient-to-r from-pink-500/10 to-purple-500/10 border border-pink-500/20 mb-8 @md:mb-10">
        <p className="text-base @md:text-lg mb-4 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <Avatar className="size-10">
                    <AvatarImage src={avatar} />
                    <AvatarFallback>{name[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-sm text-muted-foreground">{handle}</div>
                </div>
            </div>
            <Badge variant="secondary">{followers} followers</Badge>
        </div>
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-6 @md:mb-8">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600' : ''}`}
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

const SocialProof = () => (
    <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
        <span>📸 10K+ posts</span>
        <span>❤️ 500K+ likes</span>
        <span>🏷️ #BrandName trending</span>
    </div>
)

const SocialFeed = () => (
    <div className="grid grid-cols-2 gap-3 @md:gap-4">
        {[
            { image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=300', likes: '12.5K' },
            { image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=300', likes: '8.2K' },
            { image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300', likes: '15.1K' },
            { image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300', likes: '9.8K' },
        ].map(({ image, likes }, i) => (
            <div key={i} className={`relative rounded-2xl overflow-hidden group ${i === 0 ? 'row-span-2' : ''}`}>
                <div className={`relative ${i === 0 ? 'aspect-[3/4]' : 'aspect-square'}`}>
                    <Image
                        src={image}
                        alt={`Social post ${i + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="flex items-center gap-2 text-white">
                            <Star className="size-5 fill-white" />
                            <span className="font-semibold">{likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)
