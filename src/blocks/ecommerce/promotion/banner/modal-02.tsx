import Link from "next/link"
import Image from "next/image"
import { ArrowRight, X, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const CloseButton = () => (
    <Button
        variant="ghost"
        size="icon-sm"
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground z-10"
    >
        <X className="size-4" />
    </Button>
)

const ModalImage = ({ src, alt }: { src: string; alt: string }) => (
    <div className="relative aspect-[4/3] @lg:aspect-auto @lg:absolute @lg:inset-0 rounded-t-2xl @lg:rounded-l-2xl @lg:rounded-tr-none overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
    </div>
)

const SubscribeForm = ({
    headline,
    description,
    placeholder,
    buttonText,
    disclaimer,
}: {
    headline: { text: string; highlight: string }
    description: string
    placeholder: string
    buttonText: string
    disclaimer: string
}) => (
    <div className="space-y-4">
        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Gift className="size-6 text-primary" />
        </div>
        <h2 className="text-2xl @md:text-3xl font-bold">
            {headline.text}
            <span className="text-primary"> {headline.highlight}</span>
        </h2>
        <p className="text-muted-foreground">{description}</p>
        <form className="space-y-3">
            <Input
                type="email"
                placeholder={placeholder}
                className="h-11"
            />
            <Button type="submit" size="lg" className="w-full gap-2">
                {buttonText}
                <ArrowRight className="size-4" />
            </Button>
        </form>
        <p className="text-xs text-muted-foreground">{disclaimer}</p>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="relative bg-card rounded-2xl overflow-hidden border border-border/50 grid @lg:grid-cols-2">
                        <CloseButton />
                        <ModalImage
                            src="https://images.unsplash.com/photo-1607082349566-187342175e2f?w=800"
                            alt="Subscribe"
                        />
                        <div className="p-6 @md:p-8 @lg:p-10">
                            <SubscribeForm
                                headline={{ text: "Get", highlight: "15% Off" }}
                                description="Subscribe to our newsletter and receive an exclusive discount on your first order."
                                placeholder="Enter your email"
                                buttonText="Subscribe & Save"
                                disclaimer="No spam, unsubscribe anytime. See our Privacy Policy."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
