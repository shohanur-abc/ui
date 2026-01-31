import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Star, Quote } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Product Image */}
                    <div className="relative">
                        <div className="relative aspect-square rounded-3xl overflow-hidden bg-muted">
                            <Image
                                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800"
                                alt="Featured Product"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <FeaturedBadge />
                    </div>

                    {/* Content */}
                    <div>
                        <Eyebrow text="Customer Favorite" />
                        <Title text="Classic Runner" highlight="Pro" />
                        <Rating value={4.9} reviews={2847} />
                        <Description text="The perfect blend of comfort and style. Our bestselling sneaker features premium materials and innovative cushioning technology for all-day wear." />

                        <PriceBlock price="$149" originalPrice="$199" />

                        <CTA items={[
                            { label: 'Add to Cart', href: '/cart', icon: ArrowRight },
                            { label: 'View Details', href: '/product/classic-runner', variant: 'outline' },
                        ]} />

                        <Testimonial
                            quote="Best sneakers I've ever owned. Incredibly comfortable and they look amazing!"
                            author="Sarah M."
                            avatar="https://i.pravatar.cc/100?img=47"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-4">
        <Star className="size-3 mr-1 fill-yellow-500 text-yellow-500" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-3 @md:mb-4">
        {text}{' '}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Rating = ({ value, reviews }: { value: number; reviews: number }) => (
    <div className="flex items-center gap-2 mb-4 @md:mb-6">
        <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`size-5 ${star <= Math.floor(value) ? 'fill-yellow-500 text-yellow-500' : 'text-muted'}`}
                />
            ))}
        </div>
        <span className="font-semibold">{value}</span>
        <span className="text-muted-foreground">({reviews.toLocaleString()} reviews)</span>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
        {text}
    </p>
)

const PriceBlock = ({ price, originalPrice }: { price: string; originalPrice?: string }) => (
    <div className="flex items-center gap-3 mb-6 @md:mb-8">
        <span className="text-3xl @md:text-4xl font-bold">{price}</span>
        {originalPrice && (
            <>
                <span className="text-xl text-muted-foreground line-through">{originalPrice}</span>
                <Badge variant="destructive">Save 25%</Badge>
            </>
        )}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10">
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

const Testimonial = ({ quote, author, avatar }: { quote: string; author: string; avatar?: string }) => (
    <div className="p-5 rounded-2xl bg-muted/50 border">
        <Quote className="size-6 text-primary/40 mb-3" />
        <p className="text-sm @md:text-base mb-4 italic">&ldquo;{quote}&rdquo;</p>
        <div className="flex items-center gap-3">
            <Avatar className="size-8">
                <AvatarImage src={avatar} />
                <AvatarFallback>{author[0]}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author}</span>
            <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="size-3 fill-yellow-500 text-yellow-500" />
                ))}
            </div>
        </div>
    </div>
)

const FeaturedBadge = () => (
    <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg">
        <span className="text-sm font-semibold">#1 Best Seller</span>
    </div>
)
