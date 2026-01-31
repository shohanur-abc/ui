import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Award, Calendar, CheckCircle } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-2xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Award} text="Achievements" />
                    <Title text="Career Milestones" />
                    <Description text="Key achievements and recognition throughout my journey." />
                </div>

                <div className="max-w-3xl mx-auto space-y-0">
                    <MilestoneItem
                        year="2024"
                        title="Promoted to Principal Engineer"
                        category="Career"
                        description="Recognized for technical leadership and organizational impact. Now guiding technical direction across multiple product teams."
                        highlights={['Technical strategy owner', '5 teams influenced', '$10M+ project scope']}
                    />
                    <MilestoneItem
                        year="2023"
                        title="Design System v3 Launch"
                        category="Product"
                        description="Successfully launched major design system release adopted across the organization."
                        highlights={['500+ engineers using', '200+ components', '50% faster dev time']}
                    />
                    <MilestoneItem
                        year="2022"
                        title="Patent Filed"
                        category="Innovation"
                        description="Filed patent for novel caching algorithm that significantly improved system performance."
                        highlights={['60% load reduction', 'Org-wide adoption', 'Industry recognition']}
                    />
                    <MilestoneItem
                        year="2021"
                        title="Conference Keynote"
                        category="Speaking"
                        description="Delivered keynote at React Summit on scaling frontend applications."
                        highlights={['5000+ attendees', '50K+ video views', 'Top-rated talk']}
                    />
                    <MilestoneItem
                        year="2020"
                        title="Team Leadership"
                        category="Leadership"
                        description="Started leading my first engineering team, growing from 3 to 8 engineers."
                        highlights={['100% retention', '3 promotions', 'Shipped 5 features']}
                        isLast
                    />
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

interface MilestoneItemProps {
    year: string
    title: string
    category: string
    description: string
    highlights: string[]
    isLast?: boolean
}

const MilestoneItem = ({ year, title, category, description, highlights, isLast }: MilestoneItemProps) => (
    <>
        <div className="py-8 group">
            <div className="flex flex-col @md:flex-row gap-6">
                <div className="@md:w-32 shrink-0 flex @md:flex-col items-center @md:items-start gap-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="size-4" />
                        <span className="font-mono font-bold text-lg">{year}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">{category}</Badge>
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>
                    <div className="flex flex-wrap gap-3">
                        {highlights.map((highlight, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground bg-background px-3 py-1.5 rounded-full border">
                                <CheckCircle className="size-3.5 text-primary" />
                                {highlight}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        {!isLast && <Separator />}
    </>
)
