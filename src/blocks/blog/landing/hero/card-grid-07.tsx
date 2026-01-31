import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Download, FileText, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Free Resources"
                    cta={{ label: 'Browse All', href: '/resources' }}
                />
                <ResourceGrid
                    resources={[
                        { title: 'React Cheat Sheet', type: 'PDF', downloads: '12.5K', rating: 4.9, image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600' },
                        { title: 'TypeScript Guide', type: 'PDF', downloads: '8.2K', rating: 4.8, image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600' },
                        { title: 'CSS Grid Reference', type: 'PDF', downloads: '6.7K', rating: 4.9, image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600' },
                        { title: 'Next.js Starter Kit', type: 'ZIP', downloads: '5.4K', rating: 4.7, image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    cta: { label: string; href: string }
}

const Header = ({ title, cta }: HeaderProps) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <FileText className="size-6 text-primary" />
            <h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
        </div>
        <Button variant="outline" asChild className="gap-1">
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Resource {
    title: string
    type: string
    downloads: string
    rating: number
    image: string
}

interface ResourceGridProps {
    resources: Resource[]
}

const ResourceGrid = ({ resources }: ResourceGridProps) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {resources.map((resource) => (
            <Card key={resource.title} className="group overflow-hidden py-0">
                <div className="relative aspect-[4/3]">
                    <Image src={resource.image} alt={resource.title} fill className="object-cover transition-transform group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-foreground border-0 text-xs">
                        <FileText className="size-3 mr-1" />
                        {resource.type}
                    </Badge>
                </div>
                <CardContent className="p-4">
                    <h3 className="font-semibold mb-3 group-hover:text-primary transition-colors">
                        {resource.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3 text-sm">
                        <div className="flex items-center gap-1">
                            <Star className="size-3.5 fill-amber-500 text-amber-500" />
                            <span>{resource.rating}</span>
                        </div>
                        <span className="text-muted-foreground flex items-center gap-1">
                            <Download className="size-3" />
                            {resource.downloads}
                        </span>
                    </div>
                    <Button size="sm" className="w-full gap-2">
                        <Download className="size-3.5" />
                        Download Free
                    </Button>
                </CardContent>
            </Card>
        ))}
    </div>
)
