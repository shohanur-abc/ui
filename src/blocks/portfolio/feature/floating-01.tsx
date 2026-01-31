import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Laptop, Lightbulb, Rocket, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <FloatingCards
                    header={{
                        eyebrow: 'Values',
                        title: 'What Drives Me',
                        description: 'Core principles that guide every project and decision.',
                    }}
                    items={[
                        { icon: Lightbulb, title: 'Innovation', description: 'Constantly exploring new technologies and approaches.' },
                        { icon: Users, title: 'Collaboration', description: 'Working closely with clients as partners.' },
                        { icon: Rocket, title: 'Excellence', description: 'Striving for the highest quality in everything.' },
                        { icon: Laptop, title: 'Simplicity', description: 'Making complex things feel simple.' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    eyebrow: string
    title: string
    description: string
}

interface CardItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

interface FloatingCardsProps {
    header: HeaderProps
    items: CardItem[]
}

const FloatingCards = ({ header, items }: FloatingCardsProps) => (
    <div className="relative">
        <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
            <Badge variant="outline" className="mb-3 @md:mb-4">
                {header.eyebrow}
            </Badge>
            <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">
                {header.title}
            </h2>
            <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">
                {header.description}
            </p>
        </div>

        <div className="grid @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
            {items.map(({ icon: Icon, title, description }, i) => (
                <Card
                    key={i}
                    className={`py-0 group hover:shadow-2xl transition-all duration-300 ${
                        i % 2 === 0 ? '@xl:-translate-y-4' : '@xl:translate-y-4'
                    } hover:scale-105`}
                >
                    <CardContent className="p-6 @md:p-8 text-center">
                        <div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:scale-110 group-hover:rotate-3">
                            <Icon className="size-7 @md:size-8" />
                        </div>
                        <h3 className="font-bold text-lg @md:text-xl mb-2">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground">{description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    </div>
)
