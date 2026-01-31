import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowRight, Circle } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow="Career Journey"
                    title="From Beginner to Expert"
                    description="Explore the milestones that shaped my professional path"
                />
                <Profile
                    src="https://picsum.photos/seed/timeline3/400/400"
                    fallback="MR"
                    name="Michael Ross"
                    currentRole="CTO at TechCorp"
                    yearsExperience="12+ years"
                />
                <TimelineGrid
                    items={[
                        { year: '2012', title: 'Started Coding', description: 'Wrote my first line of code', category: 'milestone' },
                        { year: '2014', title: 'CS Degree', description: 'Graduated with honors', category: 'education' },
                        { year: '2015', title: 'First Job', description: 'Junior Developer at Agency', category: 'work' },
                        { year: '2017', title: 'Senior Role', description: 'Promoted to Senior Engineer', category: 'work' },
                        { year: '2019', title: 'Tech Lead', description: 'Led team of 8 engineers', category: 'work' },
                        { year: '2021', title: 'Director', description: 'Engineering Director role', category: 'work' },
                        { year: '2023', title: 'CTO', description: 'Joined TechCorp as CTO', category: 'work' },
                        { year: 'Now', title: 'Building', description: 'Scaling to 100+ engineers', category: 'milestone' },
                    ]}
                />
                <CTA label="Connect With Me" href="/contact" icon={ArrowRight} />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

const Header = ({ eyebrow, title, description }: HeaderProps) => (
    <div className="text-center mb-12">
        <Badge variant="secondary" className="mb-4">{eyebrow}</Badge>
        <h1 className="text-3xl @lg:text-4xl font-bold mb-4">{title}</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">{description}</p>
    </div>
)

interface ProfileProps {
    src: string
    fallback: string
    name: string
    currentRole: string
    yearsExperience: string
}

const Profile = ({ src, fallback, name, currentRole, yearsExperience }: ProfileProps) => (
    <div className="flex flex-col @sm:flex-row items-center justify-center gap-4 mb-12">
        <Avatar className="size-16 ring-2 ring-border">
            <AvatarImage src={src} alt={name} />
            <AvatarFallback className="text-xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
        </Avatar>
        <div className="text-center @sm:text-left">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-muted-foreground">{currentRole}</p>
        </div>
        <Separator orientation="vertical" className="hidden @sm:block h-8" />
        <Badge variant="outline">{yearsExperience} in tech</Badge>
    </div>
)

interface TimelineItem {
    year: string
    title: string
    description: string
    category: string
}

interface TimelineGridProps {
    items: TimelineItem[]
}

const TimelineGrid = ({ items }: TimelineGridProps) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 @lg:gap-6">
        {items.map((item, i) => (
            <div key={i} className="relative p-4 @lg:p-6 rounded-xl border bg-card hover:shadow-md transition-shadow">
                <Circle className={`size-3 absolute top-4 right-4 ${item.category === 'milestone' ? 'fill-primary text-primary' : item.category === 'education' ? 'fill-blue-500 text-blue-500' : 'fill-muted text-muted'}`} />
                <Badge variant="secondary" className="text-xs mb-3">{item.year}</Badge>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
            </div>
        ))}
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
