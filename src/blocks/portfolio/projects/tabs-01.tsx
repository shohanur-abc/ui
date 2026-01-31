import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto ">
                    <Eyebrow text="Portfolio" />
                    <Title text="My Work" />
                    <Description text="Browse projects by category." />
                </div>

                <ProjectTabs categories={[
                    {
                        id: 'all',
                        label: 'All',
                        projects: [
                            { image: 'https://picsum.photos/seed/all1/600/400', title: 'E-Commerce Platform', category: 'Web App', href: '#' },
                            { image: 'https://picsum.photos/seed/all2/600/400', title: 'Brand Identity', category: 'Branding', href: '#' },
                            { image: 'https://picsum.photos/seed/all3/600/400', title: 'Mobile Banking App', category: 'Mobile', href: '#' },
                            { image: 'https://picsum.photos/seed/all4/600/400', title: 'SaaS Dashboard', category: 'Web App', href: '#' },
                            { image: 'https://picsum.photos/seed/all5/600/400', title: 'Restaurant Website', category: 'Website', href: '#' },
                            { image: 'https://picsum.photos/seed/all6/600/400', title: 'Fitness App', category: 'Mobile', href: '#' },
                        ],
                    },
                    {
                        id: 'web',
                        label: 'Web Apps',
                        projects: [
                            { image: 'https://picsum.photos/seed/web1/600/400', title: 'E-Commerce Platform', category: 'Web App', href: '#' },
                            { image: 'https://picsum.photos/seed/web2/600/400', title: 'SaaS Dashboard', category: 'Web App', href: '#' },
                            { image: 'https://picsum.photos/seed/web3/600/400', title: 'Analytics Tool', category: 'Web App', href: '#' },
                        ],
                    },
                    {
                        id: 'mobile',
                        label: 'Mobile',
                        projects: [
                            { image: 'https://picsum.photos/seed/mob1/600/400', title: 'Banking App', category: 'Mobile', href: '#' },
                            { image: 'https://picsum.photos/seed/mob2/600/400', title: 'Fitness Tracker', category: 'Mobile', href: '#' },
                        ],
                    },
                    {
                        id: 'branding',
                        label: 'Branding',
                        projects: [
                            { image: 'https://picsum.photos/seed/brand1/600/400', title: 'Tech Startup Identity', category: 'Branding', href: '#' },
                            { image: 'https://picsum.photos/seed/brand2/600/400', title: 'Restaurant Brand', category: 'Branding', href: '#' },
                        ],
                    },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mx-auto mb-3 @md:mb-4">
        {Icon && <Icon className="size-4 mr-2" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground mb-12 @md:mb-16">{text}</p>
)


interface Category {
    id: string
    label: string
    projects: {
        image: string
        title: string
        category: string
        href: string
    }[]
}

const ProjectTabs = ({ categories }: { categories: Category[] }) => (
    <Tabs defaultValue={categories[0].id} className="w-full">
        <TabsList className="flex w-full max-w-md mx-auto mb-8 @md:mb-12">
            {categories.map(({ id, label }) => (
                <TabsTrigger key={id} value={id} className="flex-1">{label}</TabsTrigger>
            ))}
        </TabsList>

        {categories.map(({ id, projects }) => (
            <TabsContent key={id} value={id}>
                <ul className="grid @sm:grid-cols-2 @xl:grid-cols-3 gap-6 @md:gap-8">
                    {projects.map(({ image, title, category, href }, i) => (
                        <li key={i}>
                            <Link href={href} className="group block">
                                <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-4">
                                    <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <Button size="sm" variant="secondary" className="gap-1">
                                            View Project <ArrowUpRight className="size-3" />
                                        </Button>
                                    </div>
                                </div>
                                <Badge variant="outline" className="mb-2">{category}</Badge>
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{title}</h3>
                            </Link>
                        </li>
                    ))}
                </ul>
            </TabsContent>
        ))}
    </Tabs>
)
