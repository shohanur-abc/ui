import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Award, BarChart3, Building2, CheckCircle, Globe, Phone, Shield, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface Stat {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

export default function Component() {
    return (
        <section className="@container min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <ul className="grid @3xl:grid-cols-2 min-h-screen gap-6 @md:gap-8 @xl:gap-12 items-center">
                    {/* Content Column */}
                    <li className="flex flex-col justify-center h-full py-8 @md:py-12 @3xl:py-0">
                        <Eyebrow icon={Building2} text="Enterprise Solutions" />
                        <Title text="Transform Your Business with Strategic Excellence" />
                        <Description text="Partner with industry leaders who understand your vision. We deliver measurable results through innovative strategies and proven methodologies." />

                        <Benefits items={[
                            'Industry-leading expertise',
                            'Tailored business solutions',
                            '24/7 dedicated support',
                            'Proven track record'
                        ]} />

                        <CTA items={[
                            { text: 'Schedule Consultation', href: '#consultation', iconRight: ArrowRight },
                            { text: 'Contact Sales', href: '#contact', variant: 'outline' as const, iconLeft: Phone },
                        ]} />

                        <Certifications items={[
                            { icon: Shield, text: 'ISO 27001 Certified' },
                            { icon: Award, text: 'Fortune 500 Partner' },
                        ]} />
                    </li>

                    {/* Stats Column */}
                    <li className="flex flex-col justify-center py-8 @md:py-12 @3xl:py-16 @5xl:py-20">
                        <StatsGrid items={[
                            { icon: Users, value: '500+', label: 'Clients Served' },
                            { icon: Globe, value: '25+', label: 'Countries' },
                            { icon: Award, value: '15+', label: 'Years Experience' },
                            { icon: BarChart3, value: '98%', label: 'Client Satisfaction' },
                        ]} />

                        <ContactCard />
                    </li>
                </ul>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-5 @xl:mb-6">
        <Badge variant="outline" className="w-fit gap-2">
            <Icon className="size-3 @md:size-4" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <div className="mb-4 @md:mb-5 @xl:mb-6">
        <h1 className="text-3xl @sm:text-4xl @md:text-5xl @2xl:text-6xl @3xl:@max-4xl:text-4xl @5xl:text-6xl font-bold text-foreground leading-tight text-center @3xl:text-left">
            {text.split('Strategic Excellence')[0]}
            <span className="text-primary">Strategic Excellence</span>
        </h1>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <div className="mb-6 @md:mb-8">
        <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-lg mx-auto text-center @3xl:mx-0 @3xl:text-left">
            {text}
        </p>
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <ul className="grid grid-cols-2 gap-2 @md:gap-3 mb-6 @md:mb-8">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm @md:text-base">
                <CheckCircle className="size-4 @md:size-5 text-primary shrink-0" />
                <span>{item}</span>
            </li>
        ))}
    </ul>
)

const CTA = ({ items }: { items: { text: string, href: string, variant?: React.ComponentProps<typeof Button>['variant'], iconRight?: React.ComponentType<{ className?: string }>, iconLeft?: React.ComponentType<{ className?: string }> }[] }) => (
    <div className="flex justify-center @3xl:justify-start flex-wrap gap-3 @md:gap-4">
        {items.map((item, i) => (
            <Button key={i} size="lg" variant={item.variant} className="gap-2" asChild>
                <Link href={item.href}>
                    {item.iconLeft && <item.iconLeft className="size-4" />}
                    {item.text}
                    {item.iconRight && <item.iconRight className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Certifications = ({ items }: { items: { icon: ComponentType<{ className?: string }>, text: string }[] }) => (
    <div className="flex items-center justify-center @3xl:justify-start gap-3 @md:gap-4 mt-6 @md:mt-8 pt-4 @md:pt-5">
        {items.map((cert, i) => (
            <div key={i} className="flex items-center gap-2">
                {i > 0 && <div className="w-px h-4 bg-border mr-1" />}
                <cert.icon className="size-4 @md:size-5 text-muted-foreground" />
                <span className="text-xs @md:text-sm text-muted-foreground">{cert.text}</span>
            </div>
        ))}
    </div>
)

const StatsGrid = ({ items }: { items: Stat[] }) => (
    <ul className="grid grid-cols-2 gap-3 @md:gap-4 mb-4 @md:mb-5 @xl:mb-6">
        {items.map((stat) => (
            <li key={stat.label}>
                <Card className="group hover:border-primary/50 hover:shadow-lg transition-all duration-300 p-0 py-0 gap-0">
                    <CardContent className="p-4 @md:p-5 text-center space-y-2">
                        <div className="mx-auto size-10 @md:size-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                            <stat.icon className="size-5 @md:size-6 text-primary" />
                        </div>
                        <div className="text-2xl @md:text-3xl font-bold">{stat.value}</div>
                        <div className="text-xs @md:text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)

const ContactCard = () => (
    <Card className="border-primary/20 bg-primary/5 p-0 py-0 gap-0">
        <CardContent className="p-4 @md:p-5 flex items-center gap-3 @md:gap-4">
            <div className="size-10 @md:size-12 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Phone className="size-5 @md:size-6 text-primary-foreground" />
            </div>
            <div>
                <p className="text-xs @md:text-sm text-muted-foreground">Need immediate assistance?</p>
                <p className="text-sm @md:text-base font-semibold">Call us: +1 (800) 123-4567</p>
            </div>
        </CardContent>
    </Card>
)
