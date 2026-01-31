import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const VideoBackground = ({ poster }: { poster: string }) => (
    <div className="absolute inset-0">
        <Image src={poster} alt="Video background" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
    </div>
)

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="backdrop-blur-sm">{text}</Badge>
)

const Title = ({ lines }: { lines: { text: string; highlight?: boolean }[] }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl @xl:text-7xl font-bold tracking-tight leading-tight">
        {lines.map((line, i) => (
            <span key={i} className={`block ${line.highlight ? "text-primary" : ""}`}>{line.text}</span>
        ))}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-lg">{text}</p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {Icon && <Icon className="size-5" />}
                    {label}
                </Link>
            </Button>
        ))}
    </div>
)

const VideoControls = ({ isPlaying, isMuted }: { isPlaying: boolean; isMuted: boolean }) => (
    <div className="absolute bottom-8 right-8 flex gap-2">
        <Button size="icon" variant="secondary" className="backdrop-blur-sm">
            {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </Button>
        <Button size="icon" variant="secondary" className="backdrop-blur-sm">
            {isMuted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <VideoBackground poster="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop" />
            <div className="relative max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-24 @md:py-32 @xl:py-40 min-h-[600px] @lg:min-h-[700px]">
                <div className="max-w-2xl space-y-6 @md:space-y-8">
                    <Eyebrow text="Spring/Summer 2026" />
                    <Title lines={[
                        { text: "Discover" },
                        { text: "The Future", highlight: true },
                        { text: "Of Fashion" }
                    ]} />
                    <Description text="Immerse yourself in our latest collection. Where innovation meets timeless elegance." />
                    <CTA items={[
                        { label: "Watch Campaign", href: "#video", icon: Play },
                        { label: "Shop Now", href: "/shop", variant: "outline", icon: ArrowRight }
                    ]} />
                </div>
            </div>
            <VideoControls isPlaying={false} isMuted={true} />
        </section>
    )
}
