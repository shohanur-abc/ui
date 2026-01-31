import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, PawPrint, Heart, Truck, ShieldCheck } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20">
            <PawPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={PawPrint} text="Pet Supplies" />
                        <Title text="Happy Pets" highlight="Happy Life" />
                        <Description text="Everything your furry friends need to thrive. From premium food to fun toys, we have it all for dogs, cats, and beyond." />

                        <PetCategories items={[
                            { image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100', label: 'Dogs' },
                            { image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100', label: 'Cats' },
                            { image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=100', label: 'Birds' },
                            { image: 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?w=100', label: 'Fish' },
                        ]} />

                        <Benefits items={[
                            { icon: Heart, label: 'Vet Approved' },
                            { icon: Truck, label: 'Free Delivery $35+' },
                            { icon: ShieldCheck, label: 'Quality Guaranteed' },
                        ]} />

                        <CTA items={[
                            { label: 'Shop Pet Supplies', href: '/pets', icon: ArrowRight },
                            { label: 'Pet Food Finder', href: '/finder', variant: 'outline' },
                        ]} />
                    </div>

                    {/* Pet Visual */}
                    <div className="relative">
                        <PetShowcase />
                    </div>
                </div>
            </div>
        </section>
    )
}

const PawPattern = () => {
    const positions = [
        { top: '8%', left: '12%', width: 32, rotate: 25 },
        { top: '18%', left: '78%', width: 40, rotate: 110 },
        { top: '28%', left: '22%', width: 28, rotate: 195 },
        { top: '38%', left: '68%', width: 44, rotate: 80 },
        { top: '48%', left: '8%', width: 36, rotate: 290 },
        { top: '58%', left: '88%', width: 30, rotate: 145 },
        { top: '68%', left: '32%', width: 48, rotate: 235 },
        { top: '78%', left: '58%', width: 34, rotate: 50 },
        { top: '88%', left: '18%', width: 42, rotate: 175 },
        { top: '12%', left: '52%', width: 26, rotate: 95 },
        { top: '42%', left: '42%', width: 38, rotate: 265 },
        { top: '72%', left: '82%', width: 32, rotate: 325 },
        { top: '92%', left: '48%', width: 46, rotate: 65 },
        { top: '32%', left: '92%', width: 30, rotate: 205 },
        { top: '62%', left: '52%', width: 40, rotate: 130 },
    ]
    return (
        <div className="absolute inset-0 opacity-10 overflow-hidden">
            {positions.map((pos, i) => (
                <PawPrint
                    key={i}
                    className="absolute text-orange-500"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: `${pos.width}px`,
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 border-orange-400/50 text-orange-600">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text},{' '}
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const PetCategories = ({ items }: { items: { image: string; label: string }[] }) => (
    <div className="flex gap-4 mb-6 @md:mb-8">
        {items.map(({ image, label }) => (
            <Link key={label} href={`/pets/${label.toLowerCase()}`} className="group text-center">
                <div className="size-16 @md:size-20 rounded-full overflow-hidden relative mb-2 ring-2 ring-orange-200 dark:ring-orange-800 group-hover:ring-orange-500 transition-all">
                    <Image src={image} alt={label} fill className="object-cover" />
                </div>
                <div className="text-xs font-medium">{label}</div>
            </Link>
        ))}
    </div>
)

const Benefits = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap gap-4 mb-8 @md:mb-10">
        {items.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm">
                <div className="size-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <Icon className="size-4 text-orange-600" />
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
                className={`gap-2 ${i === 0 ? 'bg-orange-500 hover:bg-orange-600' : ''}`}
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

const PetShowcase = () => (
    <div className="relative">
        {/* Main pet image */}
        <div className="relative aspect-square max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-amber-400/10 rounded-full blur-3xl" />

            <div className="relative h-full flex items-center justify-center">
                <div className="relative w-72 h-72 @md:w-80 @md:h-80 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
                    <Image
                        src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500"
                        alt="Happy dog"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Floating product cards */}
            <div className="absolute top-4 left-0 p-3 bg-card rounded-xl shadow-lg flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="size-12 rounded-lg overflow-hidden relative">
                    <Image
                        src="https://images.unsplash.com/photo-1568640347023-a616a30bc3bd?w=100"
                        alt="Dog food"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-xs font-medium">Premium Food</div>
                    <div className="text-xs text-muted-foreground">$49.99</div>
                </div>
            </div>

            <div className="absolute bottom-4 right-0 p-3 bg-card rounded-xl shadow-lg flex items-center gap-3 animate-bounce [animation-duration:4s] [animation-delay:1s]">
                <div className="size-12 rounded-lg overflow-hidden relative">
                    <Image
                        src="https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=100"
                        alt="Dog toy"
                        fill
                        className="object-cover"
                    />
                </div>
                <div>
                    <div className="text-xs font-medium">Fun Toys</div>
                    <div className="text-xs text-muted-foreground">From $9.99</div>
                </div>
            </div>
        </div>
    </div>
)
