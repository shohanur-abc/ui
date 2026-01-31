import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Star, Users, Zap } from 'lucide-react'
import { ComponentType } from 'react'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="max-w-4xl mx-auto text-center space-y-6 @md:space-y-8">
                    <Eyebrow items={[
                        { icon: Users, text: '50K+ Readers' },
                        { icon: Star, text: 'Award Winning' },
                        { icon: Zap, text: 'Weekly Updates' },
                    ]} />
                    <Title text="Stay Updated with" highlight="Expert Insights" />
                    <Subtitle text="Join thousands of readers who trust our weekly newsletter. Get the latest insights, tutorials, and industry trends delivered to your inbox." />
                    <Newsletter
                        placeholder="Enter your email to subscribe"
                        actionText="Subscribe Now"
                        subtext="Join 10,000+ readers receiving weekly updates on the latest articles."
                    />
                    <SocialProof items={[
                        { src: 'https://i.pravatar.cc/100?img=1', fallback: 'JD' },
                        { src: 'https://i.pravatar.cc/100?img=2', fallback: 'AB' },
                        { src: 'https://i.pravatar.cc/100?img=3', fallback: 'CD' },
                        { src: 'https://i.pravatar.cc/100?img=4', fallback: 'EF' },
                        { src: 'https://i.pravatar.cc/100?img=5', fallback: 'GH' },
                    ]} />
                </div>
            </div>
        </section>
    )
}



const Eyebrow = ({ items }: { items: { icon: ComponentType<{ className?: string }>, text: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-2 @md:gap-3">
        {items.map(({ icon: Icon, text }) => (
            <Badge key={text} variant="secondary" className="flex items-center gap-2 px-2.5 @md:px-3 py-1.5">
                <Icon className="size-4" />
                {text}
            </Badge>
        ))}
    </div>
)

const Title = ({ text, highlight }: { text: string, highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl @3xl:text-7xl font-bold tracking-tight leading-tight">
        {text}{' '}
        <span className="relative inline-block">
            <span className="relative z-10">{highlight}</span>
            <span className="absolute bottom-2 left-0 w-full h-3 bg-primary/30 z-0" />
        </span>
    </h1>
)

const Subtitle = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const Newsletter = ({ placeholder, actionText, subtext }: { placeholder: string, actionText?: string, subtext?: string }) => (
    <div className="flex flex-col @sm:flex-row gap-2 @md:gap-3 max-w-md mx-auto">
        <Input type="email" placeholder={placeholder} className="h-11 @md:h-12 px-3 @md:px-4" />
        <Button size="lg" className="h-11 @md:h-12 px-5 @md:px-6 gap-2 shrink-0">
            {actionText || "Subscribe Now"}
            <ArrowRight className="size-4" />
        </Button>
    </div>
)

const SocialProof = ({ items }: { items: { src: string, fallback: string }[] }) => (
    <div className="flex flex-col items-center gap-3 @md:gap-4 pt-6 @md:pt-8">
        <div className="flex -space-x-3">
            {items.map(({ src, fallback }, i) => (
                <Avatar key={i} className="border-2 border-background size-9 @md:size-10">
                    <AvatarImage src={src} />
                    <AvatarFallback>{fallback}</AvatarFallback>
                </Avatar>
            ))}
        </div>
        <p className="text-sm text-muted-foreground">5,000+ readers joined this month</p>
    </div>
)
