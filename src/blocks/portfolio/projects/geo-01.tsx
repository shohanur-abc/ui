import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowUpRight, MapPin, Globe, Building } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container" data-theme="neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow icon={Globe} text="Worldwide" />
                    <Title text="Global Projects" />
                    <Description text="Projects delivered for clients across the globe." />
                </div>

                <div className="relative">
                    {/* World Map Background */}
                    <div className="relative aspect-[2/1] @lg:aspect-[3/1] rounded-2xl overflow-hidden bg-muted/50 border mb-8">
                        <div className="absolute inset-0 bg-[url('/world-map.svg')] bg-contain bg-center bg-no-repeat opacity-20" />
                        
                        {/* Location pins */}
                        <LocationPin 
                            position={{ top: '30%', left: '20%' }}
                            location="San Francisco"
                            projects={3}
                        />
                        <LocationPin 
                            position={{ top: '35%', left: '48%' }}
                            location="London"
                            projects={5}
                        />
                        <LocationPin 
                            position={{ top: '45%', left: '55%' }}
                            location="Dubai"
                            projects={2}
                        />
                        <LocationPin 
                            position={{ top: '40%', left: '75%' }}
                            location="Singapore"
                            projects={4}
                        />
                        <LocationPin 
                            position={{ top: '55%', left: '85%' }}
                            location="Sydney"
                            projects={2}
                        />
                    </div>

                    {/* Project list by region */}
                    <RegionGrid
                        regions={[
                            {
                                name: 'North America',
                                icon: Building,
                                projects: [
                                    { image: 'https://picsum.photos/seed/geo1/400/300', title: 'Tech Startup Platform', location: 'San Francisco', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo2/400/300', title: 'E-Commerce Giant', location: 'New York', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo3/400/300', title: 'Healthcare Network', location: 'Boston', href: '#' },
                                ],
                            },
                            {
                                name: 'Europe',
                                icon: Building,
                                projects: [
                                    { image: 'https://picsum.photos/seed/geo4/400/300', title: 'Fintech Innovation', location: 'London', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo5/400/300', title: 'Automotive Brand', location: 'Berlin', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo6/400/300', title: 'Fashion House', location: 'Paris', href: '#' },
                                ],
                            },
                            {
                                name: 'Asia Pacific',
                                icon: Building,
                                projects: [
                                    { image: 'https://picsum.photos/seed/geo7/400/300', title: 'Banking Platform', location: 'Singapore', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo8/400/300', title: 'Tech Conglomerate', location: 'Tokyo', href: '#' },
                                    { image: 'https://picsum.photos/seed/geo9/400/300', title: 'Retail Chain', location: 'Sydney', href: '#' },
                                ],
                            },
                        ]}
                    />
                </div>
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

interface LocationPinProps {
    position: { top: string; left: string }
    location: string
    projects: number
}

const LocationPin = ({ position, location, projects }: LocationPinProps) => (
    <div 
        className="absolute group cursor-pointer z-10"
        style={{ top: position.top, left: position.left }}
    >
        {/* Ping animation */}
        <div className="absolute size-6 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
            <div className="absolute inset-1 rounded-full bg-primary" />
        </div>
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-card border rounded-lg px-3 py-2 shadow-lg whitespace-nowrap">
                <div className="font-medium text-sm">{location}</div>
                <div className="text-xs text-muted-foreground">{projects} projects</div>
            </div>
        </div>
    </div>
)

interface Project {
    image: string
    title: string
    location: string
    href: string
}

interface Region {
    name: string
    icon: ComponentType<{ className?: string }>
    projects: Project[]
}

const RegionGrid = ({ regions }: { regions: Region[] }) => (
    <div className="grid @lg:grid-cols-3 gap-6">
        {regions.map(({ name, icon: Icon, projects }, i) => (
            <div key={i} className="space-y-4">
                <div className="flex items-center gap-2 text-lg font-semibold">
                    <Icon className="size-5 text-primary" />
                    {name}
                </div>
                
                <div className="space-y-3">
                    {projects.map(({ image, title, location, href }, j) => (
                        <Link key={j} href={href} className="group flex gap-3 p-2 rounded-lg border bg-card transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/20">
                            <div className="relative size-16 rounded-md overflow-hidden bg-muted shrink-0">
                                <Image src={image} alt={title} fill className="object-cover" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">{title}</h4>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <MapPin className="size-3" />
                                    {location}
                                </div>
                            </div>
                            <ArrowUpRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        </Link>
                    ))}
                </div>
            </div>
        ))}
    </div>
)
