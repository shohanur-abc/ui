import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Mail, Gift, Sparkles } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Eyebrow icon={Sparkles} text="Exclusive Offer" />
                        <Title text="Get" highlight="20% Off" suffix="Your First Order" />
                        <Description text="Join our newsletter and receive an exclusive discount code for your first purchase. Plus, get early access to new arrivals and special promotions." />

                        <NewsletterForm />

                        <Benefits items={[
                            'Exclusive member discounts',
                            'Early access to sales',
                            'New arrival alerts',
                            'Birthday rewards',
                        ]} />
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <OfferVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight, suffix }: { text: string; highlight: string; suffix: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">{highlight}</span>
        <br />
        {suffix}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg mb-6 @md:mb-8">
        {text}
    </p>
)

const NewsletterForm = () => (
    <div className="mb-8 @md:mb-10">
        <div className="flex flex-col @sm:flex-row gap-3 max-w-md">
            <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
                <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10 h-12"
                />
            </div>
            <Button size="lg" className="gap-2 h-12">
                Subscribe <ArrowRight className="size-4" />
            </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
            By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
        </p>
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="grid @sm:grid-cols-2 gap-3">
        {items.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
                <div className="size-5 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg className="size-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>
                {item}
            </div>
        ))}
    </div>
)

const OfferVisual = () => (
    <div className="relative">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl" />

        {/* Gift box visual */}
        <div className="relative aspect-square max-w-md mx-auto p-8 flex items-center justify-center">
            <div className="relative">
                {/* Floating elements */}
                <div className="absolute -top-8 -left-8 animate-bounce [animation-duration:3s]">
                    <div className="size-16 rounded-2xl bg-primary/20 flex items-center justify-center">
                        <Gift className="size-8 text-primary" />
                    </div>
                </div>
                <div className="absolute -bottom-4 -right-4 animate-bounce [animation-duration:4s] [animation-delay:1s]">
                    <div className="size-12 rounded-xl bg-primary/30 flex items-center justify-center">
                        <Sparkles className="size-6 text-primary" />
                    </div>
                </div>

                {/* Main discount badge */}
                <div className="size-48 @md:size-56 @xl:size-64 rounded-full bg-primary flex flex-col items-center justify-center text-primary-foreground shadow-2xl">
                    <span className="text-6xl @md:text-7xl @xl:text-8xl font-bold">20%</span>
                    <span className="text-xl @md:text-2xl font-medium">OFF</span>
                </div>
            </div>
        </div>

        {/* Code preview */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 px-6 py-3 bg-card border rounded-full shadow-lg">
            <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Your code:</span>
                <span className="font-mono font-bold text-primary">WELCOME20</span>
            </div>
        </div>
    </div>
)
