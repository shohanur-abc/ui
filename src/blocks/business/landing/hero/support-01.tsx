import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, LifeBuoy, Book, MessageCircle, Video, FileQuestion, Users } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={LifeBuoy} text="Help Center" />
                    <Title text="How Can We Help You?" />
                    <Description text="Find answers in our comprehensive knowledge base, or reach out to our support team for personalized assistance." />
                </div>
                <SupportGrid items={[
                    { icon: Book, title: 'Documentation', description: 'Browse our detailed guides and tutorials', href: '#docs', count: '200+ articles' },
                    { icon: Video, title: 'Video Tutorials', description: 'Watch step-by-step walkthrough videos', href: '#videos', count: '50+ videos' },
                    { icon: FileQuestion, title: 'FAQ', description: 'Quick answers to common questions', href: '#faq', count: '100+ answers' },
                    { icon: MessageCircle, title: 'Live Chat', description: 'Chat with our support team in real-time', href: '#chat', count: 'Available 24/7' },
                    { icon: Users, title: 'Community Forum', description: 'Connect with other users and share tips', href: '#community', count: '10K+ members' },
                    { icon: LifeBuoy, title: 'Submit a Ticket', description: 'Get help from our technical support team', href: '#ticket', count: '<2hr response' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const SupportGrid = ({ items }: { items: { icon: ComponentType<{ className?: string }>; title: string; description: string; href: string; count: string }[] }) => (
    <div className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, description, href, count }, i) => (
            <Link key={i} href={href}>
                <Card className="group h-full hover:shadow-lg hover:border-primary/30 transition-all">
                    <CardContent className="pt-6">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                            <Icon className="size-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">{title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{description}</p>
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="text-xs">{count}</Badge>
                            <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                    </CardContent>
                </Card>
            </Link>
        ))}
    </div>
)
