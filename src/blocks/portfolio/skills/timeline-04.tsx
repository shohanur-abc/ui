import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, BookOpen, Briefcase, Code2, GraduationCap, Target } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <TitleSection
                    eyebrow="Learning Path"
                    title="Skill Milestones"
                    description="Key achievements in my development journey"
                />

                <MilestoneTimeline
                    milestones={[
                        { icon: GraduationCap, year: '2016', title: 'Computer Science Degree', description: 'Started my journey with fundamental CS concepts' },
                        { icon: Code2, year: '2018', title: 'First Developer Role', description: 'Joined a startup as a junior developer' },
                        { icon: BookOpen, year: '2019', title: 'Full Stack Transition', description: 'Expanded skills to include backend development' },
                        { icon: Briefcase, year: '2020', title: 'Senior Developer', description: 'Promoted to senior role with architecture responsibilities' },
                        { icon: Award, year: '2022', title: 'Tech Lead', description: 'Leading a team of developers on major projects' },
                        { icon: Target, year: '2024', title: 'Staff Engineer', description: 'Focusing on company-wide technical strategy' },
                    ]}
                />
            </div>
        </section>
    )
}

interface TitleSectionProps {
    eyebrow: string
    title: string
    description: string
}

const TitleSection = ({ eyebrow, title, description }: TitleSectionProps) => (
    <div className="text-center mb-12 @md:mb-16">
        <Badge variant="outline" className="mb-4">{eyebrow}</Badge>
        <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">
            {title}
        </h2>
        <p className="text-muted-foreground text-base @md:text-lg max-w-xl mx-auto">
            {description}
        </p>
    </div>
)

interface Milestone {
    icon: ComponentType<{ className?: string }>
    year: string
    title: string
    description: string
}

const MilestoneTimeline = ({ milestones }: { milestones: Milestone[] }) => (
    <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-5 @md:left-1/2 top-0 bottom-0 w-0.5 bg-border @md:-translate-x-px" />

        <div className="space-y-8">
            {milestones.map((milestone, i) => (
                <MilestoneRow key={i} {...milestone} isEven={i % 2 === 0} />
            ))}
        </div>
    </div>
)

interface MilestoneRowProps extends Milestone {
    isEven: boolean
}

const MilestoneRow = ({ icon: Icon, year, title, description, isEven }: MilestoneRowProps) => (
    <div className={`relative flex items-center gap-4 @md:gap-8 ${isEven ? '' : '@md:flex-row-reverse'}`}>
        <div className={`hidden @md:block flex-1 ${isEven ? 'text-right' : 'text-left'}`}>
            <Card className="inline-block group hover:border-primary/50 transition-all">
                <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2">{year}</Badge>
                    <h4 className="font-bold mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>

        <div className="relative z-10 flex items-center justify-center size-10 rounded-full bg-primary text-primary-foreground shrink-0">
            <Icon className="size-5" />
        </div>

        <div className="flex-1 @md:hidden">
            <Card className="group hover:border-primary/50 transition-all">
                <CardContent className="p-5">
                    <Badge variant="outline" className="mb-2">{year}</Badge>
                    <h4 className="font-bold mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </div>

        <div className="hidden @md:block flex-1" />
    </div>
)
