import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Sparkles, Users } from 'lucide-react'
import { ComponentType } from 'react'

interface TeamMember {
    name: string
    role: string
    avatar: string
    bio: string
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Users} text="Our Team" />
                    <Title text="Meet the People" highlight="Behind the Product" />
                    <Description text="A diverse team of passionate individuals dedicated to building the best platform for your business." />
                </div>

                <TeamGrid members={[
                    { name: 'Alex Rivera', role: 'CEO & Founder', avatar: 'https://i.pravatar.cc/200?img=11', bio: 'Former engineer at Google with 15+ years in tech.' },
                    { name: 'Jordan Park', role: 'CTO', avatar: 'https://i.pravatar.cc/200?img=12', bio: 'Previously led engineering at a Series D startup.' },
                    { name: 'Sam Taylor', role: 'Head of Design', avatar: 'https://i.pravatar.cc/200?img=13', bio: 'Award-winning designer with a passion for UX.' },
                    { name: 'Morgan Lee', role: 'VP of Sales', avatar: 'https://i.pravatar.cc/200?img=14', bio: 'Built sales teams from 0 to $50M ARR.' },
                    { name: 'Casey Chen', role: 'Head of Product', avatar: 'https://i.pravatar.cc/200?img=15', bio: 'Product leader with experience at top SaaS companies.' },
                    { name: 'Riley Johnson', role: 'Engineering Lead', avatar: 'https://i.pravatar.cc/200?img=16', bio: 'Full-stack expert passionate about clean code.' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const TeamGrid = ({ members }: { members: TeamMember[] }) => (
    <div className="grid gap-6 @sm:grid-cols-2 @xl:grid-cols-3">
        {members.map((member) => (
            <Card key={member.name} className="group border-border/50 transition-all hover:border-primary/30 hover:shadow-lg overflow-hidden">
                <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                        <img 
                            src={member.avatar}
                            alt={member.name}
                            className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                    </div>
                    <div className="p-5">
                        <h3 className="font-semibold">{member.name}</h3>
                        <p className="text-sm text-primary mb-2">{member.role}</p>
                        <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
