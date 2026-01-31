import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, BookOpen, Briefcase, Code, GraduationCap, Rocket } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Journey" />
                    <Title text="Professional Milestones" />
                    <Description text="Key achievements and experiences that shaped my career." />
                </div>

                <MilestoneTimeline
                    items={[
                        { icon: GraduationCap, year: '2015', title: 'Started Coding', description: 'Wrote my first line of code in college.' },
                        { icon: BookOpen, year: '2017', title: 'First Internship', description: 'Joined a startup as a frontend intern.' },
                        { icon: Briefcase, year: '2019', title: 'Full-Time Role', description: 'Landed my first developer position.' },
                        { icon: Code, year: '2021', title: 'Tech Lead', description: 'Promoted to lead a team of 5 developers.' },
                        { icon: Award, year: '2023', title: 'Industry Award', description: 'Recognized for open source contributions.' },
                        { icon: Rocket, year: '2024', title: 'Independent', description: 'Started freelancing full-time.' },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface MilestoneItem {
    icon: ComponentType<{ className?: string }>
    year: string
    title: string
    description: string
}

const MilestoneTimeline = ({ items }: { items: MilestoneItem[] }) => (
    <div className="relative">
        <div className="absolute left-4 @md:left-1/2 top-0 bottom-0 w-0.5 bg-border @md:-translate-x-0.5" />
        
        <div className="space-y-8 @md:space-y-12">
            {items.map(({ icon: Icon, year, title, description }, i) => (
                <div key={i} className={`relative flex items-start gap-6 @md:gap-0 ${i % 2 === 0 ? '@md:flex-row-reverse' : ''}`}>
                    <div className={`hidden @md:block @md:w-1/2 ${i % 2 === 0 ? '@md:text-left @md:pl-12' : '@md:text-right @md:pr-12'}`}>
                        <div className="text-lg @md:text-xl font-bold text-primary mb-1">{year}</div>
                        <h3 className="font-bold text-base @md:text-lg">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>

                    <div className="absolute left-4 @md:left-1/2 transform -translate-x-1/2 z-10">
                        <div className="size-8 @md:size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center ring-4 ring-background">
                            <Icon className="size-4 @md:size-5" />
                        </div>
                    </div>

                    <div className="@md:hidden pl-12">
                        <div className="text-base font-bold text-primary mb-0.5">{year}</div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="text-sm text-muted-foreground">{description}</p>
                    </div>

                    <div className="hidden @md:block @md:w-1/2" />
                </div>
            ))}
        </div>
    </div>
)
