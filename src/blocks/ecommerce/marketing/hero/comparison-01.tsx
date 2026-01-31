import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Scale, ArrowLeftRight, Check, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                {/* Header */}
                <div className="text-center mb-10 @md:mb-14">
                    <Badge variant="secondary" className="mb-4">
                        <Scale className="size-3 mr-1" /> Product Comparison
                    </Badge>
                    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
                        Find Your <span className="text-primary">Perfect Match</span>
                    </h1>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Compare products side by side to make the best choice for your needs.
                    </p>
                </div>

                {/* Comparison Table */}
                <ComparisonTable />

                {/* CTA */}
                <div className="text-center mt-10 @md:mt-12">
                    <Button size="lg" className="gap-2" asChild>
                        <Link href="/compare">
                            Compare More Products <ArrowRight className="size-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

const ComparisonTable = () => {
    const products = [
        {
            name: 'Essential',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
            price: '$49',
            rating: 4.5,
            features: { wireless: true, waterproof: false, battery: '12 hours', warranty: '1 year' },
            popular: false,
        },
        {
            name: 'Pro',
            image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300',
            price: '$99',
            rating: 4.8,
            features: { wireless: true, waterproof: true, battery: '24 hours', warranty: '2 years' },
            popular: true,
        },
        {
            name: 'Elite',
            image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300',
            price: '$149',
            rating: 4.9,
            features: { wireless: true, waterproof: true, battery: '36 hours', warranty: 'Lifetime' },
            popular: false,
        },
    ]

    return (
        <div className="overflow-x-auto">
            <div className="inline-flex @lg:grid @lg:grid-cols-4 gap-4 min-w-full">
                {/* Feature labels */}
                <div className="hidden @lg:flex flex-col pt-48">
                    <div className="h-12 flex items-center text-sm font-medium text-muted-foreground">Wireless</div>
                    <div className="h-12 flex items-center text-sm font-medium text-muted-foreground">Waterproof</div>
                    <div className="h-12 flex items-center text-sm font-medium text-muted-foreground">Battery Life</div>
                    <div className="h-12 flex items-center text-sm font-medium text-muted-foreground">Warranty</div>
                </div>

                {/* Products */}
                {products.map((product) => (
                    <div
                        key={product.name}
                        className={`relative p-6 rounded-2xl border min-w-[280px] @lg:min-w-0 ${product.popular
                            ? 'bg-primary/5 border-primary'
                            : 'bg-card'
                            }`}
                    >
                        {product.popular && (
                            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                                Most Popular
                            </Badge>
                        )}

                        {/* Product image */}
                        <div className="relative aspect-square w-32 mx-auto mb-4">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {/* Product info */}
                        <div className="text-center mb-6">
                            <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                            <div className="text-2xl font-bold text-primary">{product.price}</div>
                            <div className="text-sm text-muted-foreground">
                                ★ {product.rating} / 5
                            </div>
                        </div>

                        {/* Features */}
                        <div className="space-y-0">
                            <FeatureRow
                                label="Wireless"
                                value={product.features.wireless}
                                showLabel
                            />
                            <FeatureRow
                                label="Waterproof"
                                value={product.features.waterproof}
                                showLabel
                            />
                            <FeatureRow
                                label="Battery"
                                value={product.features.battery}
                                showLabel
                            />
                            <FeatureRow
                                label="Warranty"
                                value={product.features.warranty}
                                showLabel
                            />
                        </div>

                        {/* CTA */}
                        <Button
                            className="w-full mt-6"
                            variant={product.popular ? 'default' : 'outline'}
                        >
                            Add to Cart
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}

interface FeatureRowProps {
    label: string
    value: boolean | string
    showLabel?: boolean
}

const FeatureRow = ({ label, value, showLabel }: FeatureRowProps) => (
    <div className="h-12 flex items-center justify-between @lg:justify-center border-t border-border/50">
        {showLabel && <span className="@lg:hidden text-sm text-muted-foreground">{label}</span>}
        {typeof value === 'boolean' ? (
            value ? (
                <Check className="size-5 text-green-500" />
            ) : (
                <X className="size-5 text-muted-foreground" />
            )
        ) : (
            <span className="text-sm font-medium">{value}</span>
        )}
    </div>
)
