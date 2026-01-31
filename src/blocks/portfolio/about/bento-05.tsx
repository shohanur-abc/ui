import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Building, GraduationCap, Rocket } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @md:grid-cols-3 @xl:grid-cols-4 gap-4">
                    <ProfileCard
                        src="https://picsum.photos/seed/bento5/400/400"
                        fallback="LM"
                        name="Laura Mitchell"
                        role="Product Manager"
                        bio="Turning user insights into product strategy. 7 years building products that users love."
                        className="@md:col-span-2"
                    />
                    <ExperienceCard
                        title="Experience"
                        items={[
                            { company: 'Google', role: 'Sr. PM', years: '2020-Present' },
                            { company: 'Meta', role: 'PM', years: '2017-2020' },
                            { company: 'Startup', role: 'APM', years: '2015-2017' },
                        ]}
                        className="@xl:col-span-2 @xl:row-span-2"
                    />
                    <MilestoneCard
                        icon={Building}
                        value="$50M+"
                        label="Product Revenue Generated"
                    />
                    <MilestoneCard
                        icon={GraduationCap}
                        value="MBA"
                        label="Stanford GSB"
                    />
                    <SkillsCard
                        title="Product Skills"
                        items={['Strategy', 'Roadmapping', 'Analytics', 'User Research', 'A/B Testing', 'Agile']}
                        className="@md:col-span-2"
                    />
                    <QuoteCard
                        text="Great products aren't built by luck—they're built by listening."
                        icon={Rocket}
                    />
                </div>
            </div>
        </section>
    )
}

interface ProfileCardProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
    className?: string
}

const ProfileCard = ({ src, fallback, name, role, bio, className }: ProfileCardProps) => (
    <Card className={className}>
        <CardContent className="p-6 flex flex-col @sm:flex-row items-center @sm:items-start gap-6">
            <Avatar className="size-24 ring-2 ring-border shrink-0">
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
            </Avatar>
            <div className="text-center @sm:text-left">
                <h1 className="text-2xl font-bold mb-1">{name}</h1>
                <p className="text-primary font-medium mb-3">{role}</p>
                <p className="text-sm text-muted-foreground">{bio}</p>
            </div>
        </CardContent>
    </Card>
)

interface ExperienceItem {
    company: string
    role: string
    years: string
}

interface ExperienceCardProps {
    title: string
    items: ExperienceItem[]
    className?: string
}

const ExperienceCard = ({ title, items, className }: ExperienceCardProps) => (
    <Card className={className}>
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-4">{title}</p>
            <div className="space-y-4">
                {items.map(({ company, role, years }, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-start mb-1">
                            <div>
                                <p className="font-medium">{company}</p>
                                <p className="text-sm text-muted-foreground">{role}</p>
                            </div>
                            <Badge variant="outline" className="text-xs">{years}</Badge>
                        </div>
                        {i < items.length - 1 && <Separator className="mt-4" />}
                    </div>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface MilestoneCardProps {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const MilestoneCard = ({ icon: Icon, value, label }: MilestoneCardProps) => (
    <Card className="bg-muted/50 border-none">
        <CardContent className="p-6 flex flex-col justify-center h-full text-center">
            <Icon className="size-6 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">{value}</div>
            <div className="text-xs text-muted-foreground">{label}</div>
        </CardContent>
    </Card>
)

interface SkillsCardProps {
    title: string
    items: string[]
    className?: string
}

const SkillsCard = ({ title, items, className }: SkillsCardProps) => (
    <Card className={className}>
        <CardContent className="p-6">
            <p className="text-sm font-medium mb-3">{title}</p>
            <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                ))}
            </div>
        </CardContent>
    </Card>
)

interface QuoteCardProps {
    text: string
    icon: React.ComponentType<{ className?: string }>
}

const QuoteCard = ({ text, icon: Icon }: QuoteCardProps) => (
    <Card className="bg-primary text-primary-foreground">
        <CardContent className="p-6 flex flex-col justify-between h-full">
            <Icon className="size-6 mb-4 opacity-80" />
            <p className="text-sm italic leading-relaxed">&ldquo;{text}&rdquo;</p>
        </CardContent>
    </Card>
)
