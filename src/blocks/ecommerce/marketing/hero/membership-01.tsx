import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Crown, Star, Diamond, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const MembershipTier = ({ 
    icon: Icon,
    name, 
    description, 
    benefits,
    price,
    featured = false,
    cta
}: { 
    icon: React.ElementType
    name: string
    description: string
    benefits: string[]
    price: { amount: string; period: string }
    featured?: boolean
    cta: { label: string; href: string }
}) => (
    <div className={`rounded-2xl border p-6 @md:p-8 ${featured ? "border-primary bg-primary/5 relative" : "bg-card"}`}>
        {featured && (
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
        )}
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon className={`size-6 ${featured ? "text-primary" : "text-muted-foreground"}`} />
        </div>
        <h3 className="text-xl font-bold mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="mb-6">
            <span className="text-3xl font-bold">{price.amount}</span>
            <span className="text-muted-foreground">/{price.period}</span>
        </div>
        <ul className="space-y-3 mb-6">
            {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3 text-sm">
                    <Star className="size-4 text-primary shrink-0" />
                    {benefit}
                </li>
            ))}
        </ul>
        <Button className="w-full" variant={featured ? "default" : "outline"} asChild>
            <Link href={cta.href}>{cta.label}</Link>
        </Button>
    </div>
)

const SectionHeader = ({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) => (
    <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
        <Badge variant="secondary" className="gap-2">
            <Crown className="size-4" />
            {eyebrow}
        </Badge>
        <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">{title}</h1>
        <p className="text-lg text-muted-foreground">{description}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <SectionHeader 
                    eyebrow="VIP Membership"
                    title="Unlock Exclusive Benefits"
                    description="Join our membership program and enjoy premium perks, exclusive access, and unbeatable savings."
                />
                <div className="grid @md:grid-cols-3 gap-6 @lg:gap-8">
                    <MembershipTier 
                        icon={Star}
                        name="Silver"
                        description="Perfect for occasional shoppers"
                        benefits={[
                            "5% off all purchases",
                            "Free standard shipping",
                            "Early sale access",
                            "Birthday reward"
                        ]}
                        price={{ amount: "Free", period: "forever" }}
                        cta={{ label: "Join Free", href: "/membership/silver" }}
                    />
                    <MembershipTier 
                        icon={Crown}
                        name="Gold"
                        description="For dedicated fashion lovers"
                        benefits={[
                            "15% off all purchases",
                            "Free express shipping",
                            "Priority customer support",
                            "Exclusive member events",
                            "Double points earning"
                        ]}
                        price={{ amount: "$9.99", period: "month" }}
                        featured
                        cta={{ label: "Go Gold", href: "/membership/gold" }}
                    />
                    <MembershipTier 
                        icon={Diamond}
                        name="Platinum"
                        description="The ultimate shopping experience"
                        benefits={[
                            "25% off all purchases",
                            "Free same-day shipping",
                            "Personal stylist access",
                            "VIP lounge access",
                            "Complimentary alterations",
                            "Exclusive drops access"
                        ]}
                        price={{ amount: "$29.99", period: "month" }}
                        cta={{ label: "Go Platinum", href: "/membership/platinum" }}
                    />
                </div>
            </div>
        </section>
    )
}
