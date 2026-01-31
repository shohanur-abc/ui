import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Zap, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-1.5">
        <Icon className="size-3.5" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h2 className="text-xl @md:text-2xl @lg:text-3xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-sm @md:text-base text-muted-foreground">{text}</p>
)

const BentoCard = ({ 
    children, 
    className = "",
    image
}: { 
    children: React.ReactNode
    className?: string
    image?: { src: string; alt: string }
}) => (
    <div className={`relative rounded-2xl border bg-card overflow-hidden group ${className}`}>
        {image && (
            <div className="absolute inset-0">
                <Image src={image.src} alt={image.alt} fill className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
            </div>
        )}
        <div className="relative p-6 @md:p-8 h-full flex flex-col">
            {children}
        </div>
    </div>
)

const CTAButton = ({ label, href, icon: Icon }: { label: string; href: string; icon?: React.ElementType }) => (
    <Button size="sm" className="gap-2 mt-auto w-fit" asChild>
        <Link href={href}>
            {label}
            {Icon && <Icon className="size-3.5" />}
        </Link>
    </Button>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @md:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
                    <BentoCard 
                        className="@xl:col-span-2 @xl:row-span-2 min-h-[300px] @xl:min-h-[500px]"
                        image={{ src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=800&h=600&fit=crop", alt: "Featured collection" }}
                    >
                        <div className="space-y-4 mt-auto">
                            <Eyebrow icon={Crown} text="Exclusive" />
                            <Title text="Premium" highlight="Collection" />
                            <Description text="Discover our flagship line of luxury essentials. Crafted for those who demand excellence." />
                            <CTAButton label="Explore Now" href="/premium" icon={ArrowRight} />
                        </div>
                    </BentoCard>

                    <BentoCard className="min-h-[200px]">
                        <div className="space-y-3">
                            <Eyebrow icon={Sparkles} text="New Arrivals" />
                            <Title text="Fresh Drops" />
                            <Description text="Be the first to shop our latest styles." />
                            <CTAButton label="Shop New" href="/new" icon={ArrowRight} />
                        </div>
                    </BentoCard>

                    <BentoCard 
                        className="min-h-[200px]"
                        image={{ src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=300&fit=crop", alt: "Flash sale" }}
                    >
                        <div className="space-y-3 mt-auto">
                            <Eyebrow icon={Zap} text="Flash Sale" />
                            <Title text="Up to 50% Off" />
                            <CTAButton label="Shop Sale" href="/sale" icon={ArrowRight} />
                        </div>
                    </BentoCard>
                </div>
            </div>
        </section>
    )
}
