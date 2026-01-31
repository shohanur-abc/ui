import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <Header
                    eyebrow="Portfolio"
                    title="Selected Projects"
                    description="Explore detailed case studies of my recent work."
                />
                <ProjectsAccordion
                    items={[
                        {
                            id: 'ecommerce',
                            title: 'E-Commerce Platform',
                            category: 'Web Development',
                            featured: true,
                            image: 'https://picsum.photos/seed/pr1/800/400',
                            description: 'Built a full-featured e-commerce platform handling 10K+ daily transactions with real-time inventory management.',
                            role: 'Lead Developer',
                            duration: '6 months',
                            technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
                            results: ['40% increase in conversion', '99.9% uptime', '2s average load time'],
                            link: 'https://example.com',
                        },
                        {
                            id: 'fintech',
                            title: 'Fintech Dashboard',
                            category: 'Web App',
                            image: 'https://picsum.photos/seed/pr2/800/400',
                            description: 'Designed and developed a financial analytics dashboard for institutional investors with real-time market data.',
                            role: 'Full-Stack Developer',
                            duration: '4 months',
                            technologies: ['React', 'D3.js', 'Node.js', 'WebSocket'],
                            results: ['50K+ daily active users', 'Real-time updates', 'SOC 2 compliant'],
                            link: 'https://example.com',
                        },
                        {
                            id: 'saas',
                            title: 'SaaS Project Management',
                            category: 'Product',
                            image: 'https://picsum.photos/seed/pr3/800/400',
                            description: 'Created a project management tool from scratch that helped teams collaborate more effectively.',
                            role: 'Co-founder & CTO',
                            duration: '12 months',
                            technologies: ['Vue.js', 'GraphQL', 'PostgreSQL', 'AWS'],
                            results: ['10K+ users', '$100K ARR', 'Acquired in 2023'],
                            link: 'https://example.com',
                        },
                    ]}
                />
                <CTA label="View All Projects" href="/projects" icon={ArrowRight} />
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
        <p className="text-muted-foreground">{description}</p>
    </div>
)

interface ProjectItem {
    id: string
    title: string
    category: string
    featured?: boolean
    image: string
    description: string
    role: string
    duration: string
    technologies: string[]
    results: string[]
    link: string
}

interface ProjectsAccordionProps {
    items: ProjectItem[]
}

const ProjectsAccordion = ({ items }: ProjectsAccordionProps) => (
    <Accordion type="single" collapsible defaultValue={items[0].id} className="max-w-4xl mx-auto mb-12">
        {items.map((item) => (
            <AccordionItem key={item.id} value={item.id} className="border rounded-xl mb-4 overflow-hidden last:mb-0">
                <AccordionTrigger className="hover:no-underline px-4 @md:px-6 py-4">
                    <div className="flex items-center gap-4 w-full">
                        <div className="relative size-16 @md:size-20 rounded-lg overflow-hidden shrink-0">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <div className="flex-1 text-left">
                            <div className="flex items-center gap-2 mb-1">
                                {item.featured && <Star className="size-4 fill-yellow-500 text-yellow-500" />}
                                <h3 className="font-semibold">{item.title}</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="outline" className="text-xs">{item.category}</Badge>
                                <Badge variant="secondary" className="text-xs">{item.role}</Badge>
                            </div>
                        </div>
                    </div>
                </AccordionTrigger>
                <AccordionContent>
                    <div className="px-4 @md:px-6 pb-6">
                        <div className="relative aspect-video rounded-lg overflow-hidden mb-6">
                            <Image src={item.image} alt={item.title} fill className="object-cover" />
                        </div>
                        <p className="text-muted-foreground mb-6">{item.description}</p>
                        <div className="grid @md:grid-cols-3 gap-6 mb-6">
                            <div>
                                <p className="text-sm font-medium mb-2">Technologies</p>
                                <div className="flex flex-wrap gap-2">
                                    {item.technologies.map((tech) => (
                                        <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-2">Duration</p>
                                <p className="text-sm text-muted-foreground">{item.duration}</p>
                            </div>
                            <div>
                                <p className="text-sm font-medium mb-2">Results</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                    {item.results.map((result) => (
                                        <li key={result}>• {result}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <Button variant="outline" className="gap-2" asChild>
                            <Link href={item.link} target="_blank">
                                View Live Project
                                <ExternalLink className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </AccordionContent>
            </AccordionItem>
        ))}
    </Accordion>
)

interface CTAProps {
    label: string
    href: string
    icon: React.ComponentType<{ className?: string }>
}

const CTA = ({ label, href, icon: Icon }: CTAProps) => (
    <div className="text-center">
        <Button className="gap-2" asChild>
            <Link href={href}>
                {label}
                <Icon className="size-4" />
            </Link>
        </Button>
    </div>
)
