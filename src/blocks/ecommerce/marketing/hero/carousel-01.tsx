import Link from "next/link"
import Image from "next/image"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const SlideContent = ({ 
    badge, 
    title, 
    description, 
    cta 
}: { 
    badge: string
    title: { main: string; highlight?: string }
    description: string
    cta: { label: string; href: string }
}) => (
    <div className="space-y-6 max-w-xl">
        <Badge variant="secondary">{badge}</Badge>
        <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight">
            {title.main}{" "}
            {title.highlight && <span className="text-primary">{title.highlight}</span>}
        </h1>
        <p className="text-lg text-muted-foreground">{description}</p>
        <Button size="lg" className="gap-2" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-5" />
            </Link>
        </Button>
    </div>
)

const SlideImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="absolute inset-0">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
    </div>
)

const SliderControls = ({ current, total }: { current: number; total: number }) => (
    <div className="flex items-center gap-4">
        <Button size="icon" variant="outline">
            <ChevronLeft className="size-5" />
        </Button>
        <div className="flex gap-2">
            {Array.from({ length: total }).map((_, i) => (
                <div 
                    key={i} 
                    className={`h-1.5 rounded-full transition-all ${i === current ? "w-8 bg-primary" : "w-2 bg-muted"}`} 
                />
            ))}
        </div>
        <Button size="icon" variant="outline">
            <ChevronRight className="size-5" />
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <SlideImage 
                src="https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1600&h=900&fit=crop" 
                alt="Slide background"
            />
            <div className="relative max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36 min-h-[550px] @lg:min-h-[650px] flex flex-col justify-center">
                <SlideContent 
                    badge="New Collection"
                    title={{ main: "Redefine Your", highlight: "Wardrobe" }}
                    description="Explore our latest collection of premium essentials designed for the modern lifestyle."
                    cta={{ label: "Shop Collection", href: "/collection" }}
                />
                <div className="absolute bottom-8 left-4 @sm:left-6 @2xl:left-8">
                    <SliderControls current={0} total={4} />
                </div>
            </div>
        </section>
    )
}
