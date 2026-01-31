import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Bot, Braces, FileCode2, Gamepad2, Globe2, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Services" />
                    <Title text="What I Build" />
                    <Description text="From web apps to mobile solutions, I craft digital products that make an impact." />
                </div>

                <FeatureGrid
                    items={[
                        { icon: Globe2, title: 'Web Applications', description: 'Full-stack web apps with modern frameworks and responsive design.' },
                        { icon: Smartphone, title: 'Mobile Apps', description: 'Cross-platform mobile applications for iOS and Android.' },
                        { icon: Bot, title: 'AI Solutions', description: 'Intelligent automation and machine learning integrations.' },
                        { icon: Braces, title: 'APIs & Backend', description: 'Scalable backend services and RESTful API development.' },
                        { icon: FileCode2, title: 'CMS Development', description: 'Custom content management systems and headless CMS.' },
                        { icon: Gamepad2, title: 'Interactive', description: 'Engaging interactive experiences and web games.' },
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

interface FeatureItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const FeatureGrid = ({ items }: { items: FeatureItem[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-4 @md:gap-6">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all hover:-translate-y-1 text-center">
                <CardContent className="p-6 @md:p-8">
                    <div className="size-14 @md:size-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all group-hover:scale-110">
                        <Icon className="size-7 @md:size-8" />
                    </div>
                    <h3 className="text-lg @md:text-xl font-bold mb-2">{title}</h3>
                    <p className="text-sm @md:text-base text-muted-foreground leading-relaxed">{description}</p>
                </CardContent>
            </Card>
        ))}
    </div>
)
