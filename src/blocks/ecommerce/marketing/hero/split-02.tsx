import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Package, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <div className="inline-flex items-center gap-2 text-primary text-sm font-medium">
        <Icon className="size-4" />
        {text}
    </div>
)

const Title = ({ lines }: { lines: string[] }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight leading-tight">
        {lines.map((line, i) => (
            <span key={i} className="block">{line}</span>
        ))}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const Features = ({ items }: { items: { icon: React.ElementType; text: string }[] }) => (
    <div className="space-y-3">
        {items.map(({ icon: Icon, text }, i) => (
            <div key={i} className="flex items-center gap-3 text-sm">
                <Icon className="size-5 text-primary shrink-0" />
                <span>{text}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ImageGallery = ({ images }: { images: { src: string; alt: string }[] }) => (
    <div className="grid grid-cols-2 gap-4">
        {images.map(({ src, alt }, i) => (
            <div key={i} className={`relative rounded-xl overflow-hidden ${i === 0 ? "col-span-2 aspect-[16/9]" : "aspect-square"}`}>
                <Image src={src} alt={alt} fill className="object-cover hover:scale-105 transition-transform duration-500" />
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-10 @lg:gap-16 items-center">
                    <div className="space-y-6 @md:space-y-8 order-2 @lg:order-1">
                        <Eyebrow icon={Package} text="Free Worldwide Shipping" />
                        <Title lines={["Elevate Your", "Everyday Style"]} />
                        <Description text="Curated essentials designed for modern living. From work to weekend, discover pieces that move with you." />
                        <Features items={[
                            { icon: CheckCircle2, text: "Premium quality materials" },
                            { icon: Clock, text: "Fast 2-day delivery" },
                            { icon: Package, text: "Free returns within 30 days" }
                        ]} />
                        <CTA items={[
                            { label: "Explore Collection", href: "/collection", icon: ArrowRight },
                            { label: "Our Story", href: "/about", variant: "outline" }
                        ]} />
                    </div>
                    <div className="order-1 @lg:order-2">
                        <ImageGallery images={[
                            { src: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=450&fit=crop", alt: "Fashion collection" },
                            { src: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop", alt: "Accessories" },
                            { src: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop", alt: "Lifestyle" }
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}
