import Link from "next/link"
import { ArrowRight, Mail, Gift, Percent, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const NewsletterBenefit = ({
    icon: Icon,
    title,
    description,
}: {
    icon: React.ElementType
    title: string
    description: string
}) => (
    <div className="flex gap-4 p-4 bg-card rounded-xl border border-border/50">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="size-5 text-primary" />
        </div>
        <div>
            <h3 className="font-semibold mb-1">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    </div>
)

const NewsletterForm = ({
    badge,
    headline,
    cta,
}: {
    badge: { icon: React.ElementType; text: string }
    headline: { text: string; highlight: string }
    cta: { label: string }
}) => (
    <div className="bg-primary/5 rounded-2xl p-6 @md:p-8 border border-primary/20">
        <Badge className="bg-primary text-primary-foreground gap-1.5 mb-4">
            <badge.icon className="size-3" />
            {badge.text}
        </Badge>
        <h2 className="text-2xl @md:text-3xl font-bold mb-4">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <div className="space-y-3">
            <Input type="email" placeholder="Your email address" />
            <Button className="w-full gap-2">
                <Mail className="size-4" />
                {cta.label}
            </Button>
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-5xl mx-auto">
                    <div className="grid @lg:grid-cols-2 gap-8 @lg:gap-12 items-center">
                        <div className="space-y-4">
                            <NewsletterBenefit
                                icon={Percent}
                                title="15% Off First Order"
                                description="Get an instant discount code when you sign up"
                            />
                            <NewsletterBenefit
                                icon={Zap}
                                title="Early Access"
                                description="Be first to shop new arrivals and flash sales"
                            />
                            <NewsletterBenefit
                                icon={Gift}
                                title="Birthday Rewards"
                                description="Receive a special gift during your birthday month"
                            />
                        </div>
                        <NewsletterForm
                            badge={{ icon: Mail, text: "Get 15% Off" }}
                            headline={{ text: "Join Our", highlight: "VIP List" }}
                            cta={{ label: "Subscribe & Save" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
