import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase, GraduationCap, Heart, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-2xl mx-auto">
                    <ProfileHeader
                        src="https://picsum.photos/seed/acc1/400/400"
                        fallback="JD"
                        name="John Doe"
                        role="Software Engineer"
                        bio="Building products that matter. Here's my story."
                    />
                    <ProfileAccordion
                        items={[
                            {
                                id: 'experience',
                                icon: Briefcase,
                                title: 'Work Experience',
                                content: [
                                    { title: 'Senior Engineer at Google', subtitle: '2021 - Present', description: 'Leading frontend architecture' },
                                    { title: 'Engineer at Meta', subtitle: '2018 - 2021', description: 'Built React components' },
                                    { title: 'Junior Developer at Startup', subtitle: '2016 - 2018', description: 'Full-stack development' },
                                ],
                            },
                            {
                                id: 'education',
                                icon: GraduationCap,
                                title: 'Education',
                                content: [
                                    { title: 'M.S. Computer Science', subtitle: 'Stanford University, 2016', description: 'Focus on AI/ML' },
                                    { title: 'B.S. Computer Science', subtitle: 'UC Berkeley, 2014', description: 'Graduated with honors' },
                                ],
                            },
                            {
                                id: 'achievements',
                                icon: Trophy,
                                title: 'Achievements',
                                content: [
                                    { title: 'Open Source Award', subtitle: 'GitHub, 2023', description: 'Top contributor' },
                                    { title: 'Patent Holder', subtitle: '2022', description: 'Machine learning optimization' },
                                    { title: 'Speaker', subtitle: '2021', description: 'React Summit keynote' },
                                ],
                            },
                            {
                                id: 'interests',
                                icon: Heart,
                                title: 'Interests',
                                content: [
                                    { title: 'Open Source', subtitle: 'Active contributor', description: '50+ repositories' },
                                    { title: 'Photography', subtitle: 'Hobby', description: 'Landscape & street' },
                                    { title: 'Running', subtitle: 'Fitness', description: 'Marathon finisher' },
                                ],
                            },
                        ]}
                    />
                    <CTA label="Get in Touch" href="/contact" icon={ArrowRight} />
                </div>
            </div>
        </section>
    )
}

interface ProfileHeaderProps {
    src: string
    fallback: string
    name: string
    role: string
    bio: string
}

const ProfileHeader = ({ src, fallback, name, role, bio }: ProfileHeaderProps) => (
    <div className="text-center mb-8">
        <Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <h1 className="text-2xl font-bold mb-1">{name}</h1>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-muted-foreground text-sm">{bio}</p>
    </div>
)

interface ContentItem {
    title: string
    subtitle: string
    description: string
}

interface AccordionItemData {
    id: string
    icon: React.ComponentType<{ className?: string }>
    title: string
    content: ContentItem[]
}

interface ProfileAccordionProps {
    items: AccordionItemData[]
}

const ProfileAccordion = ({ items }: ProfileAccordionProps) => (
    <Accordion type="single" collapsible defaultValue="experience" className="mb-8">
        {items.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
                <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <item.icon className="size-4 text-primary" />
                        </div>
                        <span>{item.title}</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="pl-11 space-y-4">
                        {item.content.map((entry, i) => (
                            <div key={i} className="pb-4 last:pb-0 border-b last:border-0">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="font-medium">{entry.title}</h4>
                                    <Badge variant="secondary" className="text-xs">{entry.subtitle}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{entry.description}</p>
                            </div>
                        ))}
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
