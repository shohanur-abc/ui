import Link from "next/link"
import { ArrowRight, Smartphone, Laptop, Watch, Headphones, Camera, Gamepad } from "lucide-react"
import { Button } from "@/components/ui/button"

const CategoryCard = ({
    icon: Icon,
    title,
    itemCount,
    href,
    featured,
}: {
    icon: React.ElementType
    title: string
    itemCount: string
    href: string
    featured?: boolean
}) => (
    <Link
        href={href}
        className={`group relative p-6 rounded-2xl transition-all hover:scale-[1.02] flex flex-col ${
            featured
                ? "bg-primary text-primary-foreground @md:col-span-2"
                : "bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30"
        }`}
    >
        <div className={`size-14 rounded-xl flex items-center justify-center mb-4 ${
            featured ? "bg-primary-foreground/20" : "bg-primary/10"
        }`}>
            <Icon className={`size-7 ${featured ? "text-primary-foreground" : "text-primary"}`} />
        </div>
        <h3 className="font-bold text-xl mb-1">{title}</h3>
        <p className={`text-sm mb-4 ${featured ? "opacity-80" : "text-muted-foreground"}`}>{itemCount}</p>
        <div className="mt-auto">
            <span className={`inline-flex items-center gap-1 text-sm font-medium group-hover:gap-2 transition-all ${
                featured ? "text-primary-foreground" : "text-primary"
            }`}>
                Shop Now
                <ArrowRight className="size-3.5" />
            </span>
        </div>
    </Link>
)

const SectionHeader = ({ headline, description }: { headline: string; description: string }) => (
    <div className="text-center mb-10 @md:mb-12">
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-3">{headline}</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        headline="Shop by Category"
                        description="Find what you need across our wide range of product categories"
                    />
                    <div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 gap-4 @md:gap-6">
                        <CategoryCard
                            icon={Smartphone}
                            title="Smartphones"
                            itemCount="245 products"
                            href="/category/smartphones"
                            featured
                        />
                        <CategoryCard
                            icon={Laptop}
                            title="Laptops"
                            itemCount="128 products"
                            href="/category/laptops"
                        />
                        <CategoryCard
                            icon={Watch}
                            title="Watches"
                            itemCount="89 products"
                            href="/category/watches"
                        />
                        <CategoryCard
                            icon={Headphones}
                            title="Audio"
                            itemCount="156 products"
                            href="/category/audio"
                        />
                        <CategoryCard
                            icon={Camera}
                            title="Cameras"
                            itemCount="67 products"
                            href="/category/cameras"
                        />
                        <CategoryCard
                            icon={Gamepad}
                            title="Gaming"
                            itemCount="203 products"
                            href="/category/gaming"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
