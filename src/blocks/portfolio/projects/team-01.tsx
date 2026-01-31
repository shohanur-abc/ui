import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { ArrowUpRight, Users, MessageSquare } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Users} text="Collaboration" />
                    <Title text="Team Projects" />
                    <Description text="Projects built collaboratively with talented teams." />
                </div>

                <TeamGrid
                    items={[
                        {
                            image: 'https://picsum.photos/seed/team1/800/500',
                            title: 'Enterprise Platform',
                            description: 'Large-scale B2B solution development.',
                            team: [
                                { name: 'Alex', avatar: 'https://i.pravatar.cc/150?img=1', role: 'Lead Dev' },
                                { name: 'Sarah', avatar: 'https://i.pravatar.cc/150?img=2', role: 'Designer' },
                                { name: 'Mike', avatar: 'https://i.pravatar.cc/150?img=3', role: 'Backend' },
                                { name: 'Emma', avatar: 'https://i.pravatar.cc/150?img=4', role: 'QA' },
                            ],
                            client: 'Fortune 500 Company',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/team2/800/500',
                            title: 'Startup MVP',
                            description: 'Rapid prototype development.',
                            team: [
                                { name: 'John', avatar: 'https://i.pravatar.cc/150?img=5', role: 'Full Stack' },
                                { name: 'Lisa', avatar: 'https://i.pravatar.cc/150?img=6', role: 'UI/UX' },
                            ],
                            client: 'Tech Startup',
                            href: '#',
                        },
                        {
                            image: 'https://picsum.photos/seed/team3/800/500',
                            title: 'Mobile Application',
                            description: 'Cross-platform mobile development.',
                            team: [
                                { name: 'Chris', avatar: 'https://i.pravatar.cc/150?img=7', role: 'Mobile Dev' },
                                { name: 'Anna', avatar: 'https://i.pravatar.cc/150?img=8', role: 'Designer' },
                                { name: 'Dave', avatar: 'https://i.pravatar.cc/150?img=9', role: 'Backend' },
                            ],
                            client: 'Healthcare Provider',
                            href: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface TeamMember {
    name: string
    avatar: string
    role: string
}

interface TeamItem {
    image: string
    title: string
    description: string
    team: TeamMember[]
    client: string
    href: string
}

const TeamGrid = ({ items }: { items: TeamItem[] }) => (
    <div className="grid @lg:grid-cols-3 gap-6">
        {items.map(({ image, title, description, team, client, href }, i) => (
            <Card key={i} className="group overflow-hidden border transition-all hover:shadow-xl hover:shadow-primary/10 hover:border-primary/20 p-0">
                <Link href={href} className="block">
                    <div className="relative aspect-video overflow-hidden">
                        <Image 
                            src={image} 
                            alt={title} 
                            fill 
                            className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                        
                        {/* Team avatars */}
                        <div className="absolute bottom-3 left-3 flex -space-x-2">
                            {team.map(({ name, avatar }, j) => (
                                <Avatar key={j} className="size-8 border-2 border-card">
                                    <AvatarImage src={avatar} alt={name} />
                                    <AvatarFallback>{name[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                            {team.length > 3 && (
                                <div className="size-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs font-medium">
                                    +{team.length - 3}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                        <Badge variant="secondary" className="w-fit text-xs mb-2">{client}</Badge>
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">{title}</h3>
                    </CardHeader>
                    
                    <CardContent className="pt-0 pb-4">
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </CardContent>
                    
                    <CardFooter className="pt-0 border-t">
                        <div className="flex items-center justify-between w-full pt-4">
                            <span className="text-sm text-muted-foreground">{team.length} team members</span>
                            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </CardFooter>
                </Link>
            </Card>
        ))}
    </div>
)
