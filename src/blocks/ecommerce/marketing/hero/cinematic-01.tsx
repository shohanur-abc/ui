import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Volume2, VolumeX, Maximize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="backdrop-blur">{text}</Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-xl">{text}</p>
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

const VideoControls = () => (
    <div className="absolute bottom-6 right-6 flex gap-2 z-10">
        <Button size="icon" variant="secondary" className="rounded-full backdrop-blur bg-background/50">
            <VolumeX className="size-4" />
        </Button>
        <Button size="icon" variant="secondary" className="rounded-full backdrop-blur bg-background/50">
            <Maximize className="size-4" />
        </Button>
    </div>
)

const VideoBackground = ({ poster }: { poster: string }) => (
    <>
        <div className="absolute inset-0 z-0">
            <Image src={poster} alt="Video poster" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-transparent" />
        </div>
        <VideoControls />
    </>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden min-h-[80vh]" data-theme="neon">
            <VideoBackground poster="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop" />
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 relative z-10">
                <div className="max-w-2xl space-y-8 py-12 @md:py-20">
                    <Eyebrow text="Cinematic Experience" />
                    <Title text="Where Fashion Meets" highlight="Art" />
                    <Description text="Immerse yourself in our latest campaign. Experience fashion like never before with stunning visuals that tell a story." />
                    <CTA items={[
                        { label: "Watch Full Video", href: "/campaign", icon: Play },
                        { label: "Shop the Look", href: "/collection", variant: "outline", icon: ArrowRight }
                    ]} />
                </div>
            </div>
        </section>
    )
}
