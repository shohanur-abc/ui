import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Video, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const VideoCard = ({
    thumbnail,
    title,
    duration,
    views,
}: {
    thumbnail: string
    title: string
    duration: string
    views: string
}) => (
    <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
        <div className="aspect-video relative">
            <Image src={thumbnail} alt={title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="size-14 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="size-6 text-black fill-black ml-1" />
                </div>
            </div>
            <Badge className="absolute bottom-3 right-3 bg-black/70 text-white border-0">
                {duration}
            </Badge>
        </div>
        <div className="p-4 bg-card">
            <h3 className="font-semibold mb-1 line-clamp-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{views} views</p>
        </div>
    </div>
)

const SectionHeader = ({
    badge,
    headline,
    subtext,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    subtext: string
    cta: { label: string; href: string }
}) => (
    <div className="flex flex-col @md:flex-row @md:items-end justify-between gap-4 mb-10">
        <div>
            <Badge variant="outline" className="border-primary/50 text-primary gap-1.5 mb-4">
                <badge.icon className="size-3" />
                {badge.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold mb-2">
                {headline.text}
                <span className="text-primary"> {headline.highlight}</span>
            </h2>
            <p className="text-muted-foreground">{subtext}</p>
        </div>
        <Button variant="outline" className="gap-2 shrink-0" asChild>
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-6xl mx-auto">
                    <SectionHeader
                        badge={{ icon: Video, text: "Video Reviews" }}
                        headline={{ text: "Watch Before", highlight: "You Buy" }}
                        subtext="See our products in action with real customer reviews"
                        cta={{ label: "View All Videos", href: "/videos" }}
                    />
                    <div className="grid @md:grid-cols-3 gap-6">
                        <VideoCard
                            thumbnail="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600"
                            title="Smart Watch Pro Unboxing & Review"
                            duration="12:34"
                            views="45.2K"
                        />
                        <VideoCard
                            thumbnail="https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=600"
                            title="Wireless Earbuds Sound Test"
                            duration="8:21"
                            views="32.1K"
                        />
                        <VideoCard
                            thumbnail="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600"
                            title="30 Days with Fitness Tracker"
                            duration="15:45"
                            views="28.7K"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
