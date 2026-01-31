import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code, Globe, Laptop, Palette, Server, Smartphone } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div>
                        <Eyebrow text="Expertise" />
                        <Title text="Full-Service Development" />
                        <Description text="I offer comprehensive solutions covering every aspect of modern software development. Whether you need a simple landing page or a complex enterprise application, I've got you covered." />
                    </div>

                    <ServicesList
                        items={[
                            { icon: Globe, title: 'Web Applications', description: 'Scalable, responsive web apps with modern frameworks.' },
                            { icon: Smartphone, title: 'Mobile Development', description: 'Cross-platform mobile apps with React Native.' },
                            { icon: Server, title: 'Backend Services', description: 'Robust APIs and microservices architecture.' },
                            { icon: Palette, title: 'UI/UX Design', description: 'User-centered design with attention to detail.' },
                            { icon: Laptop, title: 'DevOps', description: 'Cloud infrastructure and CI/CD pipelines.' },
                            { icon: Code, title: 'Code Review', description: 'Expert review and optimization of existing code.' },
                        ]}
                    />
                </div>
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
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ServiceItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
}

const ServicesList = ({ items }: { items: ServiceItem[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, title, description }, i) => (
            <Card key={i} className="py-0 group hover:shadow-lg transition-all hover:border-primary/30">
                <CardContent className="p-4 @md:p-5 flex gap-3">
                    <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                        <Icon className="size-5" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm @md:text-base mb-0.5">{title}</h3>
                        <p className="text-xs @md:text-sm text-muted-foreground">{description}</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
