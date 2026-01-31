import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Briefcase, Users, Building, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

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
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="space-y-3">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0" />
                <span>{item}</span>
            </div>
        ))}
    </div>
)

const ContactForm = () => (
    <div className="space-y-4">
        <div className="grid @sm:grid-cols-2 gap-4">
            <Input placeholder="Company Name" />
            <Input placeholder="Your Name" />
        </div>
        <Input placeholder="Business Email" type="email" />
        <Input placeholder="Estimated Order Size" />
        <Button className="w-full gap-2">
            Request Quote
            <ArrowRight className="size-4" />
        </Button>
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center p-4 rounded-xl border bg-card">
                <p className="text-2xl font-bold text-primary">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
            </div>
        ))}
    </div>
)

const ClientLogos = ({ logos }: { logos: string[] }) => (
    <div className="space-y-3">
        <p className="text-sm text-muted-foreground">Trusted by leading companies:</p>
        <div className="flex flex-wrap gap-6 items-center opacity-60">
            {logos.map((logo, i) => (
                <div key={i} className="text-xl font-bold">{logo}</div>
            ))}
        </div>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Eyebrow icon={Building} text="For Business" />
                        <Title text="Corporate &" highlight="Bulk Orders" />
                        <Description text="Outfit your team in style with our corporate solutions. Get volume discounts, custom branding, and dedicated account management." />
                        <Benefits items={[
                            "Volume discounts up to 40%",
                            "Custom logo and branding options",
                            "Dedicated account manager",
                            "Flexible payment terms",
                            "Priority shipping"
                        ]} />
                        <Stats items={[
                            { value: "500+", label: "Companies" },
                            { value: "40%", label: "Max Discount" },
                            { value: "24h", label: "Response" }
                        ]} />
                        <ClientLogos logos={["ACME", "TechCorp", "StartupX", "DesignCo"]} />
                    </div>
                    <div className="rounded-2xl border bg-card p-6 @md:p-8 space-y-6">
                        <div className="text-center">
                            <h3 className="text-xl font-bold">Get a Custom Quote</h3>
                            <p className="text-muted-foreground mt-1">Tell us about your needs</p>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </section>
    )
}
