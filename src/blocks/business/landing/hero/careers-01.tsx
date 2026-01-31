import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Briefcase, MapPin, Clock, DollarSign } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Briefcase} text="We&apos;re Hiring" />
                    <Title text="Join Our Mission to Transform Business" />
                    <Description text="Work with talented people from around the world. Competitive salaries, full benefits, and flexible remote work." />
                    <CTA items={[
                        { label: 'View All Positions', href: '#careers', icon: ArrowRight },
                        { label: 'Our Culture', href: '#culture', variant: 'outline' },
                    ]} />
                </div>
                <Stats items={[
                    { value: '250+', label: 'Team Members' },
                    { value: '15+', label: 'Countries' },
                    { value: '100%', label: 'Remote-Friendly' },
                    { value: '4.8', label: 'Glassdoor Rating' },
                ]} />
                <JobList items={[
                    { title: 'Senior Frontend Engineer', department: 'Engineering', location: 'Remote', type: 'Full-time', salary: '$150K - $200K' },
                    { title: 'Product Designer', department: 'Design', location: 'San Francisco', type: 'Full-time', salary: '$120K - $160K' },
                    { title: 'Enterprise Account Executive', department: 'Sales', location: 'New York', type: 'Full-time', salary: '$100K - $150K + OTE' },
                    { title: 'Data Scientist', department: 'Analytics', location: 'Remote', type: 'Full-time', salary: '$130K - $180K' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-4xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-6 mb-10 @md:mb-14">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center p-4 rounded-xl bg-card/50 border border-border/50">
                <div className="text-2xl @md:text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const JobList = ({ items }: { items: { title: string; department: string; location: string; type: string; salary: string }[] }) => (
    <div className="space-y-4">
        {items.map(({ title, department, location, type, salary }, i) => (
            <Link key={i} href="#job">
                <Card className="group hover:shadow-lg hover:border-primary/30 transition-all">
                    <CardContent className="py-4 flex flex-col @md:flex-row @md:items-center gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
                                <Badge variant="secondary" className="text-xs">{department}</Badge>
                            </div>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                                <span className="flex items-center gap-1">
                                    <MapPin className="size-3.5" />
                                    {location}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="size-3.5" />
                                    {type}
                                </span>
                                <span className="flex items-center gap-1">
                                    <DollarSign className="size-3.5" />
                                    {salary}
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="gap-1 shrink-0">
                            Apply Now
                            <ArrowRight className="size-3" />
                        </Button>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
