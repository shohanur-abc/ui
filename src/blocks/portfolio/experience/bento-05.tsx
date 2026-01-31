import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Building2, Award, GraduationCap, Heart, Mic, FileCode } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Journey" />
                    <Title text="My Story" />
                    <Description text="A visual overview of my professional journey and accomplishments." />
                </div>

                <div className="grid @md:grid-cols-4 gap-4 auto-rows-[minmax(120px,auto)]">
                    <ProfileCard
                        avatar="https://github.com/shadcn.png"
                        initials="JD"
                        name="John Doe"
                        title="Principal Engineer"
                        company="TechCorp"
                        className="@md:col-span-2 @md:row-span-2"
                    />
                    <StatCard icon={Building2} value="5" label="Companies" />
                    <StatCard icon={Award} value="8" label="Years Exp" />
                    <StatCard icon={GraduationCap} value="2" label="Degrees" />
                    <StatCard icon={Mic} value="10+" label="Talks" />
                    <TextCard
                        title="Current Focus"
                        text="Building scalable design systems and leading platform engineering initiatives."
                        className="@md:col-span-2"
                    />
                    <StatCard icon={Heart} value="100+" label="OSS PRs" className="@md:col-span-1" />
                    <StatCard icon={FileCode} value="50+" label="Projects" className="@md:col-span-1" />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">{text}</Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface ProfileCardProps {
    avatar: string
    initials: string
    name: string
    title: string
    company: string
    className?: string
}

const ProfileCard = ({ avatar, initials, name, title, company, className = '' }: ProfileCardProps) => (
    <Card className={`overflow-hidden ${className}`}>
        <CardContent className="p-8 h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-primary/5 to-primary/10">
            <Avatar className="size-24 @md:size-32 mb-6 ring-4 ring-primary/20">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <h3 className="text-2xl @md:text-3xl font-bold mb-2">{name}</h3>
            <p className="text-lg text-primary mb-1">{title}</p>
            <p className="text-sm text-muted-foreground">{company}</p>
        </CardContent>
    </Card>
)

interface StatCardProps {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
    className?: string
}

const StatCard = ({ icon: Icon, value, label, className = '' }: StatCardProps) => (
    <Card className={`group hover:shadow-md transition-all ${className}`}>
        <CardContent className="p-4 h-full flex items-center gap-4">
            <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Icon className="size-5 text-primary" />
            </div>
            <div>
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
            </div>
        </CardContent>
    </Card>
)

interface TextCardProps {
    title: string
    text: string
    className?: string
}

const TextCard = ({ title, text, className = '' }: TextCardProps) => (
    <Card className={`${className}`}>
        <CardContent className="p-6 h-full flex flex-col justify-center">
            <h4 className="font-semibold mb-2">{title}</h4>
            <p className="text-sm text-muted-foreground">{text}</p>
        </CardContent>
    </Card>
)
