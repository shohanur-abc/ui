import Link from "next/link"
import { Mail, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const GlowLineDecorative = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </div>
)

const Icon = ({ icon: IconComponent }: { icon: React.ElementType }) => (
    <div className="inline-flex items-center justify-center size-12 @md:size-14 rounded-full bg-primary/10 text-primary mb-4 @md:mb-6">
        <IconComponent className="size-6 @md:size-7" />
    </div>
)

const Headline = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-3 @md:mb-4">
        {text}
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto mb-6 @md:mb-8">
        {text}
    </p>
)

const EmailForm = ({
    placeholder,
    buttonText,
}: {
    placeholder: string
    buttonText: string
}) => (
    <form className="flex flex-col @sm:flex-row gap-3 max-w-md mx-auto">
        <Input
            type="email"
            placeholder={placeholder}
            className="flex-1 h-11"
        />
        <Button type="submit" size="lg">
            {buttonText}
        </Button>
    </form>
)

const Disclaimer = ({ text }: { text: string }) => (
    <p className="text-xs text-muted-foreground mt-4">{text}</p>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative bg-card py-16 @md:py-20 @xl:py-24 px-4 @sm:px-6 @2xl:px-8">
                <GlowLineDecorative />
                <div className="relative max-w-2xl mx-auto text-center">
                    <Icon icon={Bell} />
                    <Headline text="Get Early Access" />
                    <Description text="Subscribe to our newsletter and be the first to know about exclusive deals, new arrivals, and insider tips." />
                    <EmailForm
                        placeholder="Enter your email"
                        buttonText="Subscribe"
                    />
                    <Disclaimer text="No spam, unsubscribe anytime. By subscribing you agree to our Privacy Policy." />
                </div>
            </div>
        </section>
    )
}
