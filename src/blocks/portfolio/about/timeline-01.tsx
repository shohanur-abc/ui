import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, GraduationCap, Rocket } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto">
                    <Header
                        src="https://picsum.photos/seed/timeline1/400/400"
                        fallback="JD"
                        name="John Doe"
                        role="Software Engineer"
                        bio="My journey from curious student to tech professional."
                    />
                    <Timeline
                        items={[
                            {
                                icon: Rocket,
                                year: '2023',
                                title: 'Senior Engineer at Google',
                                description: 'Leading a team of 5 engineers on cloud infrastructure projects.',
                                tags: ['Leadership', 'Cloud', 'Go'],
                            },
                            {
                                icon: Briefcase,
                                year: '2020',
                                title: 'Software Engineer at Stripe',
                                description: 'Built payment processing systems handling millions of transactions.',
                                tags: ['Fintech', 'Python', 'APIs'],
                            },
                            {
                                icon: Briefcase,
                                year: '2018',
                                title: 'Junior Developer at Startup',
                                description: 'Full-stack development for a growing e-commerce platform.',
                                tags: ['React', 'Node.js', 'MongoDB'],
                            },
                            {
                                icon: GraduationCap,
                                year: '2017',
                                title: 'B.S. Computer Science',
                                description: 'Graduated from MIT with honors. Focus on distributed systems.',
                                tags: ['Education', 'Research'],
                            },
                        ]}
                    />
                    <CTA label="View Full Resume" href="/resume" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}

interface HeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
}

const Header = ({ src, fallback, name, role, bio }: HeaderProps) => (
    <div className="text-center mb-12">
        <Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-3xl font-bold mb-2">{name}</h1>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-muted-foreground">{bio}</p>
    </div>
)

interface TimelineItem {
    icon: React.ComponentType<{ className?: string }>
    year: string
    title: string
    description: string
    tags: string[]
}

interface TimelineProps {
    items: TimelineItem[]
}

const Timeline = ({ items }: TimelineProps) => (
    <div className="relative">
        <div className="absolute left-4 @md:left-1/2 top-0 bottom-0 w-px bg-border @md:-ml-px" />
        <div className="space-y-8">
            {items.map((item, i) => (
                <div key={i} className={`relative flex items-start gap-6 @md:gap-8 ${i % 2 === 0 ? '@md:flex-row-reverse' : ''}`}>
                    <div className={`hidden @md:block flex-1 ${i % 2 === 0 ? 'text-left' : 'text-right'}`}>
                        <Badge variant="secondary" className="mb-2">{item.year}</Badge>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <div className={`flex flex-wrap gap-2 mt-2 ${i % 2 === 0 ? '' : 'justify-end'}`}>
                            {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="absolute left-0 @md:left-1/2 @md:-ml-4 size-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center z-10">
                        <item.icon className="size-4" />
                    </div>
                    <div className="flex-1 @md:hidden ml-12">
                        <Badge variant="secondary" className="mb-2">{item.year}</Badge>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            {item.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                            ))}
                        </div>
                    </div>
                    <div className="hidden @md:block flex-1" />
                </div>
            ))}
        </div>
    </div>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center mt-12">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
