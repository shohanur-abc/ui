import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <Card className="py-0 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-primary/5 border-primary/20">
                    <CardContent className="p-0">
                        <div className="grid @xl:grid-cols-2 gap-0">
                            <div className="p-6 @md:p-8 @xl:p-12 flex flex-col justify-center">
                                <CallToAction
                                    eyebrow={{ icon: Sparkles, text: 'Ready to Start?' }}
                                    title="Let's Build Something Amazing Together"
                                    description="Have a project in mind? I'm currently accepting new clients and would love to hear about your ideas. Let's discuss how we can bring your vision to life."
                                    ctas={[
                                        { label: 'Schedule a Call', href: '#calendly', variant: 'default' },
                                        { label: 'View My Work', href: '#portfolio', variant: 'outline' },
                                    ]}
                                />
                            </div>
                            <div className="relative min-h-[300px] @xl:min-h-0">
                                <Image
                                    src="https://picsum.photos/seed/cta/800/600"
                                    alt="Collaboration"
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t @xl:bg-gradient-to-r from-background via-transparent to-transparent" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    )
}

interface EyebrowProps {
    icon: React.ComponentType<{ className?: string }>
    text: string
}

interface CTAItem {
    label: string
    href: string
    variant: 'default' | 'outline'
}

interface CallToActionProps {
    eyebrow: EyebrowProps
    title: string
    description: string
    ctas: CTAItem[]
}

const CallToAction = ({ eyebrow, title, description, ctas }: CallToActionProps) => {
    const EyebrowIcon = eyebrow.icon
    return (
        <div>
            <Badge variant="secondary" className="mb-4 gap-1.5">
                <EyebrowIcon className="size-3.5" />
                {eyebrow.text}
            </Badge>
            <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">
                {title}
            </h2>
            <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-6 @md:mb-8">
                {description}
            </p>
            <div className="flex flex-wrap gap-3 @md:gap-4">
                {ctas.map(({ label, href, variant }, i) => (
                    <Button key={i} variant={variant} size="lg" asChild>
                        <Link href={href}>
                            {label}
                            {i === 0 && <ArrowRight className="size-4" />}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}
