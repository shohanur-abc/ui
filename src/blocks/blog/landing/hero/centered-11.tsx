import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Award, BookMarked, GraduationCap } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="emerald">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow icon={GraduationCap} text="Learning Path" />
                    <Title text="Master Your Craft" highlight="Step by Step" />
                    <Description text="Structured learning paths designed by industry experts. From beginner to advanced, track your progress and earn certificates along the way." />
                    <ProgressPreview
                        courses={[
                            { title: 'React Fundamentals', progress: 100, badge: 'Completed' },
                            { title: 'Advanced Patterns', progress: 65, badge: 'In Progress' },
                            { title: 'Testing Mastery', progress: 0, badge: 'Up Next' },
                        ]}
                    />
                    <CTA
                        items={[
                            { label: 'Start Learning', href: '/courses', icon: ArrowRight },
                            { label: 'Browse Paths', href: '/paths', icon: BookMarked, variant: 'outline' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4 @md:mb-6">
        <Badge className="gap-2 px-4 py-1.5 bg-primary text-primary-foreground">
            <Icon className="size-4" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
        {text}{' '}
        <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
        {text}
    </p>
)

interface Course {
    title: string
    progress: number
    badge: string
}

const ProgressPreview = ({ courses }: { courses: Course[] }) => (
    <div className="max-w-md mx-auto space-y-4 mb-10 @md:mb-12">
        {courses.map(({ title, progress, badge }) => (
            <div key={title} className="flex items-center gap-4 p-4 rounded-xl bg-card border">
                <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    {progress === 100 ? (
                        <Award className="size-5 text-primary" />
                    ) : (
                        <BookMarked className="size-5 text-muted-foreground" />
                    )}
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                        <p className="font-medium truncate">{title}</p>
                        <Badge
                            variant={progress === 100 ? 'default' : progress > 0 ? 'secondary' : 'outline'}
                            className="text-xs shrink-0 ml-2"
                        >
                            {badge}
                        </Badge>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>
            </div>
        ))}
    </div>
)

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap justify-center gap-3 @md:gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
