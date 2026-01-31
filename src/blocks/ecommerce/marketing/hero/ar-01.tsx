import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Eye, Palette, Ruler } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-lg">{text}</p>
)

const Features = ({ items }: { items: { icon: React.ElementType; title: string; description: string }[] }) => (
    <div className="space-y-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <div key={i} className="flex gap-4">
                <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const ARPreview = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border-4 border-foreground/10">
            <Image src={src} alt={alt} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
            <div className="absolute bottom-6 inset-x-6">
                <div className="rounded-2xl border bg-card/80 backdrop-blur p-4 flex items-center gap-4">
                    <div className="size-16 rounded-xl overflow-hidden relative shrink-0">
                        <Image src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop" alt="Product" fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">Urban Runner Pro</p>
                        <p className="text-sm text-muted-foreground">Size: US 10 • Red</p>
                    </div>
                    <Button size="sm">Try On</Button>
                </div>
            </div>
        </div>
        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[80%] rounded-full bg-primary/20 blur-3xl" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Sparkles} text="AR Technology" />
                        <Title text="Try Before You" highlight="Buy" />
                        <Description text="Experience products like never before with our augmented reality feature. See how items look on you or in your space before making a purchase." />
                        <Features items={[
                            { icon: Eye, title: "Virtual Try-On", description: "See how clothes and accessories look on you" },
                            { icon: Palette, title: "Color Matching", description: "View products in different colors and styles" },
                            { icon: Ruler, title: "Perfect Fit", description: "Get accurate size recommendations" }
                        ]} />
                        <CTA items={[
                            { label: "Try AR Experience", href: "/ar-try-on", icon: Sparkles },
                            { label: "Learn More", href: "/ar-info", variant: "outline", icon: ArrowRight }
                        ]} />
                    </div>
                    <ARPreview 
                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=750&fit=crop" 
                        alt="AR try-on preview"
                    />
                </div>
            </div>
        </section>
    )
}
