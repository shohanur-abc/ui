import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Code2, Globe, Palette, Server, Smartphone, Sparkles } from 'lucide-react'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16 @xl:mb-20">
                    <Eyebrow text="What I Do" />
                    <Title text="Services & Expertise" />
                    <Description text="From concept to deployment, I offer end-to-end solutions for your digital needs." />
                </div>

                <ServiceGrid items={[
                    { icon: Code2, title: 'Web Development', description: 'Building responsive, fast, and scalable web applications using modern frameworks.', technologies: ['React', 'Next.js', 'Vue'] },
                    { icon: Palette, title: 'UI/UX Design', description: 'Creating intuitive interfaces with focus on user experience and accessibility.', technologies: ['Figma', 'Adobe XD', 'Framer'] },
                    { icon: Smartphone, title: 'Mobile Development', description: 'Cross-platform mobile apps that feel native on both iOS and Android.', technologies: ['React Native', 'Flutter'] },
                    { icon: Server, title: 'Backend Development', description: 'Robust server-side solutions with secure APIs and database management.', technologies: ['Node.js', 'Python', 'Go'] },
                    { icon: Globe, title: 'DevOps & Cloud', description: 'Setting up CI/CD pipelines and cloud infrastructure for optimal performance.', technologies: ['AWS', 'Docker', 'Kubernetes'] },
                    { icon: Sparkles, title: 'AI Integration', description: 'Implementing AI/ML features to enhance user experience and automation.', technologies: ['OpenAI', 'TensorFlow', 'LangChain'] },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mx-auto mb-3 @md:mb-4" variant="outline">
        {Icon && <Icon className="size-4 mr-2" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface ServiceItem {
    icon: ComponentType<{ className?: string }>
    title: string
    description: string
    technologies: string[]
}

const ServiceGrid = ({ items }: { items: ServiceItem[] }) => (
    <ul className="grid @md:grid-cols-2 @3xl:grid-cols-3 gap-4 @md:gap-5 @xl:gap-6">
        {items.map(({ icon: Icon, title, description, technologies }, i) => (
            <li key={i}>
                <Card className="h-full group hover:shadow-lg transition-all hover:-translate-y-1 py-0">
                    <CardContent className="p-6 @md:p-8">
                        <div className="size-12 @md:size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4 @md:mb-5 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110 transition-all">
                            <Icon className="size-6 @md:size-7" />
                        </div>
                        <h3 className="text-lg @md:text-xl font-semibold mb-2 @md:mb-3">{title}</h3>
                        <p className="text-sm @md:text-base text-muted-foreground leading-relaxed mb-3 @md:mb-4">{description}</p>
                        <div className="flex flex-wrap gap-2">
                            {technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="text-xs">
                                    {tech}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </li>
        ))}
    </ul>
)
