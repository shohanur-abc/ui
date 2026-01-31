import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Utensils, Clock, Leaf, ChefHat } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-amber-50 to-background dark:from-amber-950/20">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Utensils} text="Meal Kits" />
                        <Title text="Delicious Meals" highlight="Made Easy" />
                        <Description text="Fresh ingredients, chef-designed recipes, delivered to your door. Cook restaurant-quality meals at home in 30 minutes or less." />

                        <MealPlanOptions items={[
                            { meals: '2', people: '2', price: '$49/week' },
                            { meals: '3', people: '4', price: '$89/week', popular: true },
                            { meals: '4', people: '4', price: '$119/week' },
                        ]} />

                        <Benefits items={[
                            { icon: Clock, label: '30 min recipes' },
                            { icon: Leaf, label: 'Fresh ingredients' },
                            { icon: ChefHat, label: 'Chef-designed' },
                        ]} />

                        <CTA items={[
                            { label: 'Get Started - 50% Off', href: '/meals', icon: ArrowRight },
                            { label: 'See Menu', href: '/menu', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Food Visual */}
                    <div className="relative">
                        <MealShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-amber-500/50 text-amber-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}
        <br />
        <span className="bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const MealPlanOptions = ({ items }: { items: { meals: string; people: string; price: string; popular?: boolean }[] }) => (
    <div className="flex gap-3 mb-6 @md:mb-8 overflow-x-auto pb-2">
        {items.map(({ meals, people, price, popular }) => (
            <div
                key={`${meals}-${people}`}
                className={`p-4 rounded-xl border shrink-0 min-w-32 ${popular ? 'border-amber-500 bg-amber-500/10' : 'border-border'}`}
            >
                {popular && <Badge className="mb-2 bg-amber-500 text-white">Most Popular</Badge>}
                <div className="font-bold">{meals} meals</div>
                <div className="text-sm text-muted-foreground">{people} people</div>
                <div className="text-lg font-bold text-amber-600 mt-2">{price}</div>
            </div>
        ))}
    </div>
)

const Benefits = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center">
                    <Icon className="size-4 text-amber-600" />
                </div>
                <span>{label}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button
                key={i}
                size="lg"
                variant={variant || 'default'}
                className={`gap-2 ${i === 0 ? 'bg-amber-600 hover:bg-amber-700' : ''}`}
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

const MealShowcase = () => (
    <div className="relative">
        {/* Main plate */}
        <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-orange-400/10 rounded-full blur-3xl" />

            <div className="relative h-full flex items-center justify-center">
                <div className="relative w-72 h-72 @md:w-80 @md:h-80 rounded-full overflow-hidden shadow-2xl">
                    <Image
                        src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500"
                        alt="Delicious meal"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Ingredient cards */}
            <div className="absolute top-4 left-0 p-3 bg-card rounded-xl shadow-lg flex items-center gap-3">
                <div className="size-10 rounded-lg overflow-hidden relative">
                    <Image
                        src="https://images.unsplash.com/photo-1518843875459-f738682238a6?w=100"
                        alt="Fresh vegetables"
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="text-xs">
                    <div className="font-medium">Fresh Veggies</div>
                    <div className="text-muted-foreground">Pre-portioned</div>
                </div>
            </div>

            <div className="absolute bottom-4 right-0 p-3 bg-card rounded-xl shadow-lg flex items-center gap-3">
                <ChefHat className="size-8 text-amber-500" />
                <div className="text-xs">
                    <div className="font-medium">Easy Recipe</div>
                    <div className="text-muted-foreground">Step-by-step</div>
                </div>
            </div>

            {/* Discount badge */}
            <div className="absolute -top-4 right-8 px-4 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg">
                50% OFF
            </div>
        </div>
    </div>
)
