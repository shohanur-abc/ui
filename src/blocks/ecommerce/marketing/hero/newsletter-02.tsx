import Link from "next/link"
import Image from "next/image"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Content = ({ 
    badge, 
    title, 
    description, 
    benefits 
}: { 
    badge: string
    title: { main: string; highlight: string }
    description: string
    benefits: string[]
}) => (
    <div className="space-y-6">
        <Badge variant="outline">{badge}</Badge>
        <h2 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
            {title.main}{" "}
            <span className="text-primary">{title.highlight}</span>
        </h2>
        <p className="text-lg text-muted-foreground">{description}</p>
        <ul className="space-y-3">
            {benefits.map((benefit, i) => (
                <li key={i} className="flex items-center gap-3">
                    <CheckCircle2 className="size-5 text-primary shrink-0" />
                    <span>{benefit}</span>
                </li>
            ))}
        </ul>
    </div>
)

const Form = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="flex flex-col @sm:flex-row gap-3">
        <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input 
                type="email" 
                placeholder={placeholder}
                className="pl-10 h-12"
            />
        </div>
        <Button size="lg" className="gap-2">
            {buttonText}
            <ArrowRight className="size-4" />
        </Button>
    </div>
)

const ImageSection = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-square @lg:aspect-[4/5] rounded-3xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-center">
                    <div className="space-y-8">
                        <Content 
                            badge="Newsletter"
                            title={{ main: "Stay in the", highlight: "Loop" }}
                            description="Subscribe to our newsletter and never miss out on the latest trends, exclusive deals, and style inspiration."
                            benefits={[
                                "Exclusive 20% welcome discount",
                                "Early access to new collections",
                                "Weekly style guides and tips",
                                "Member-only flash sales"
                            ]}
                        />
                        <Form placeholder="Your email address" buttonText="Subscribe Now" />
                        <p className="text-sm text-muted-foreground">Join 100,000+ subscribers. No spam, unsubscribe anytime.</p>
                    </div>
                    <ImageSection 
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop" 
                        alt="Fashion newsletter"
                    />
                </div>
            </div>
        </section>
    )
}
