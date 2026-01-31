import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Star, Building, Check, Users, Headphones } from "lucide-react"
import Image from "next/image"

interface EnterpriseProps {
    image: string
    name: string
    brand: string
    minSeats: number
    rating: number
    reviews: number
    features: string[]
    support: string[]
    deployment: string
    sla: string
}

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[16/9] overflow-hidden rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Image src={src} alt={alt} fill className="object-cover opacity-50 transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 flex items-center justify-center">
            <Building className="size-16 text-primary/50" />
        </div>
        <Button size="icon-sm" variant="ghost" className="absolute right-3 top-3 text-white/70 hover:bg-white/10 hover:text-white">
            <Heart className="size-4" />
        </Button>
    </div>
)

const EnterpriseBadge = () => (
    <Badge className="absolute left-3 top-3 gap-1 bg-gradient-to-r from-slate-700 to-slate-800 text-white ring-1 ring-white/20">
        <Building className="size-3" />
        Enterprise
    </Badge>
)

const BrandLabel = ({ text }: { text: string }) => (
    <span className="text-xs font-bold uppercase tracking-wider text-primary">{text}</span>
)

const ProductName = ({ text }: { text: string }) => (
    <h3 className="text-lg font-semibold text-foreground">{text}</h3>
)

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
    <div className="flex items-center gap-1.5">
        <Star className="size-4 fill-yellow-400 text-yellow-400" />
        <span className="font-medium">{rating.toFixed(1)}</span>
        <span className="text-sm text-muted-foreground">({reviews})</span>
    </div>
)

const FeatureGrid = ({ features }: { features: string[] }) => (
    <div className="grid grid-cols-2 gap-2">
        {features.map((f, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="size-4 shrink-0 text-green-500" />
                <span className="text-muted-foreground">{f}</span>
            </div>
        ))}
    </div>
)

const SupportSection = ({ support, sla }: { support: string[]; sla: string }) => (
    <div className="space-y-2 rounded-lg bg-muted/50 p-3">
        <div className="flex items-center gap-2 text-sm font-medium">
            <Headphones className="size-4 text-primary" />
            Dedicated Support
        </div>
        <div className="space-y-1">
            {support.map((s, i) => (
                <p key={i} className="text-xs text-muted-foreground">{s}</p>
            ))}
        </div>
        <Badge variant="outline" className="text-xs">{sla}</Badge>
    </div>
)

const DeploymentInfo = ({ text }: { text: string }) => (
    <div className="text-sm text-muted-foreground">
        <span className="font-medium text-foreground">Deployment:</span> {text}
    </div>
)

const SeatInfo = ({ min }: { min: number }) => (
    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Users className="size-4" />
        Minimum {min} seats
    </div>
)

const ContactButton = ({ label }: { label: string }) => (
    <Button className="w-full gap-2">
        <Building className="size-4" />
        {label}
    </Button>
)

export default function Main() {
    const enterprise: EnterpriseProps = {
        image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=450&fit=crop",
        name: "Platform Enterprise Suite",
        brand: "TechFlow",
        minSeats: 50,
        rating: 4.9,
        reviews: 342,
        features: [
            "Unlimited users",
            "SSO/SAML",
            "Custom integrations",
            "API access",
            "Admin console",
            "Audit logs",
        ],
        support: [
            "24/7 Priority support",
            "Dedicated success manager",
            "Custom training",
        ],
        deployment: "Cloud, on-premise, or hybrid",
        sla: "99.99% SLA Guaranteed",
    }

    return (
        <section className="@container">
            <div className="mx-auto max-w-sm px-4 py-8">
                <Card className="group overflow-hidden">
                    <div className="relative">
                        <ProductImage src={enterprise.image} alt={enterprise.name} />
                        <EnterpriseBadge />
                    </div>
                    <div className="space-y-3 p-4">
                        <div className="flex items-center justify-between">
                            <BrandLabel text={enterprise.brand} />
                            <ProductRating rating={enterprise.rating} reviews={enterprise.reviews} />
                        </div>
                        <ProductName text={enterprise.name} />
                        <FeatureGrid features={enterprise.features} />
                        <SupportSection support={enterprise.support} sla={enterprise.sla} />
                        <DeploymentInfo text={enterprise.deployment} />
                        <SeatInfo min={enterprise.minSeats} />
                        <Separator />
                        <div className="text-center text-lg font-semibold text-foreground">
                            Custom Pricing
                        </div>
                        <ContactButton label="Contact Sales" />
                    </div>
                </Card>
            </div>
        </section>
    )
}
