import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, Newspaper, ExternalLink, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Newspaper} text="In the News" />
                    <Title text="Press & Media" />
                    <Description text="Projects featured in publications and media outlets." />
                </div>

                <PressGrid
                    items={[
                        {
                            publication: 'TechCrunch',
                            logo: 'https://logo.clearbit.com/techcrunch.com',
                            headline: 'How This Design Tool is Revolutionizing UI Development',
                            project: 'Design System Platform',
                            date: 'Jan 2025',
                            excerpt: 'The platform has gained traction among enterprise teams looking for...',
                            articleUrl: '#',
                            projectUrl: '#',
                        },
                        {
                            publication: 'Wired',
                            logo: 'https://logo.clearbit.com/wired.com',
                            headline: 'The Future of Healthcare is Digital: A Case Study',
                            project: 'Healthcare Dashboard',
                            date: 'Dec 2024',
                            excerpt: 'Patient engagement has increased significantly since the platform launch...',
                            articleUrl: '#',
                            projectUrl: '#',
                        },
                        {
                            publication: 'Forbes',
                            logo: 'https://logo.clearbit.com/forbes.com',
                            headline: '30 Under 30: Developers Shaping the Future',
                            project: 'Open Source Contributions',
                            date: 'Nov 2024',
                            excerpt: 'Recognition for contributions to the developer community...',
                            articleUrl: '#',
                            projectUrl: '#',
                        },
                        {
                            publication: 'Product Hunt',
                            logo: 'https://logo.clearbit.com/producthunt.com',
                            headline: '#1 Product of the Day',
                            project: 'API Management Tool',
                            date: 'Oct 2024',
                            excerpt: 'Over 2,000 upvotes and featured in the weekly newsletter...',
                            articleUrl: '#',
                            projectUrl: '#',
                        },
                    ]}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex justify-center mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface PressItem {
    publication: string
    logo: string
    headline: string
    project: string
    date: string
    excerpt: string
    articleUrl: string
    projectUrl: string
}

const PressGrid = ({ items }: { items: PressItem[] }) => (
    <div className="grid @md:grid-cols-2 gap-6">
        {items.map(({ publication, logo, headline, project, date, excerpt, articleUrl, projectUrl }, i) => (
            <Card key={i} className="group border transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                <CardContent className="p-5 @md:p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="size-10 rounded-lg bg-white p-1.5 flex items-center justify-center">
                            <Image src={logo} alt={publication} width={28} height={28} className="object-contain" />
                        </div>
                        <div>
                            <span className="font-medium text-sm">{publication}</span>
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <Calendar className="size-3" />
                                {date}
                            </div>
                        </div>
                    </div>
                    
                    <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors leading-snug">{headline}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{excerpt}</p>
                    
                    <Badge variant="secondary" className="mb-4">{project}</Badge>
                    
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                        <Button variant="outline" size="sm" className="gap-1.5 flex-1" asChild>
                            <Link href={articleUrl} target="_blank">
                                <ExternalLink className="size-3.5" />
                                Read Article
                            </Link>
                        </Button>
                        <Button variant="secondary" size="sm" className="gap-1.5 flex-1" asChild>
                            <Link href={projectUrl}>
                                View Project
                                <ArrowUpRight className="size-3.5" />
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
