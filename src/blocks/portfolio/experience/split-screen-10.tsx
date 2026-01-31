import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { Users, Calendar, Trophy, ArrowUp } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-start">
                    <div>
                        <Eyebrow icon={Users} text="Leadership" />
                        <Title text="Team I Lead" />
                        <Description text="I currently lead the Platform Engineering team at TechCorp, responsible for developer experience and internal tooling." />

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            <StatCard value="8" label="Engineers" icon={Users} />
                            <StatCard value="2 yrs" label="Team Age" icon={Calendar} />
                            <StatCard value="100%" label="Retention" icon={Trophy} />
                            <StatCard value="5" label="Promotions" icon={ArrowUp} />
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold mb-6">Team Members</h3>
                        <div className="space-y-0">
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="AJ"
                                name="Alex Johnson"
                                role="Senior Engineer"
                                focus="Design Systems"
                            />
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="SC"
                                name="Sarah Chen"
                                role="Senior Engineer"
                                focus="Build Infrastructure"
                            />
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="MK"
                                name="Michael Kim"
                                role="Engineer"
                                focus="Developer Tools"
                            />
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="RP"
                                name="Rachel Park"
                                role="Engineer"
                                focus="Documentation"
                            />
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="DL"
                                name="David Lee"
                                role="Engineer"
                                focus="Testing Infrastructure"
                            />
                            <TeamMember
                                avatar="https://github.com/shadcn.png"
                                initials="EW"
                                name="Emily Wang"
                                role="Engineer"
                                focus="Performance"
                                isLast
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface StatCardProps {
    value: string
    label: string
    icon: ComponentType<{ className?: string }>
}

const StatCard = ({ value, label, icon: Icon }: StatCardProps) => (
    <div className="p-4 bg-muted/50 rounded-lg border">
        <Icon className="size-5 text-primary mb-2" />
        <p className="text-2xl font-bold">{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
    </div>
)

interface TeamMemberProps {
    avatar: string
    initials: string
    name: string
    role: string
    focus: string
    isLast?: boolean
}

const TeamMember = ({ avatar, initials, name, role, focus, isLast }: TeamMemberProps) => (
    <>
        <div className="flex items-center gap-4 py-4 group">
            <Avatar className="size-12 ring-2 ring-background">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
                <p className="font-medium group-hover:text-primary transition-colors">{name}</p>
                <p className="text-sm text-muted-foreground">{role}</p>
            </div>
            <Badge variant="secondary" className="text-xs hidden @sm:inline-flex">{focus}</Badge>
        </div>
        {!isLast && <Separator />}
    </>
)
