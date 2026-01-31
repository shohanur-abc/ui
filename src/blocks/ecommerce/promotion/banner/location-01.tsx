import Link from "next/link"
import Image from "next/image"
import { ArrowRight, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const StoreCard = ({
    image,
    name,
    address,
    distance,
    isOpen,
    href,
}: {
    image: { src: string; alt: string }
    name: string
    address: string
    distance: string
    isOpen: boolean
    href: string
}) => (
    <Link href={href} className="group flex gap-4 p-4 rounded-xl bg-card hover:bg-card/80 border border-border/50 hover:border-primary/30 transition-all">
        <div className="relative size-20 rounded-lg overflow-hidden shrink-0 bg-muted">
            <Image src={image.src} alt={image.alt} fill className="object-cover" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{name}</h3>
                <Badge variant={isOpen ? "default" : "secondary"} className="text-xs">
                    {isOpen ? "Open" : "Closed"}
                </Badge>
            </div>
            <p className="text-sm text-muted-foreground truncate mb-2">{address}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3" />
                <span>{distance}</span>
            </div>
        </div>
        <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all self-center" />
    </Link>
)

const SectionHeader = ({
    headline,
    cta,
}: {
    headline: string
    cta: { label: string; href: string }
}) => (
    <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl @sm:text-2xl font-bold">{headline}</h2>
        <Button variant="ghost" className="gap-2" asChild>
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
            <div className="bg-background py-12 @md:py-16 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-2xl mx-auto">
                    <SectionHeader
                        headline="Stores Near You"
                        cta={{ label: "View All", href: "/stores" }}
                    />
                    <div className="space-y-3">
                        <StoreCard
                            image={{ src: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200", alt: "Store" }}
                            name="Downtown Flagship"
                            address="123 Main Street, New York, NY"
                            distance="0.5 miles"
                            isOpen={true}
                            href="/stores/downtown"
                        />
                        <StoreCard
                            image={{ src: "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=200", alt: "Store" }}
                            name="Midtown Mall"
                            address="456 Broadway, New York, NY"
                            distance="1.2 miles"
                            isOpen={true}
                            href="/stores/midtown"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
