import { Badge } from '@/components/ui/badge'
import { ArrowUpRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 text-center @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">

                <Eyebrow icon={ArrowUpRight} text="Projects" />
                <Title text="Creative Work" />
                <Description text="A visual gallery of selected projects." />

                <MasonryGrid items={[
                    { image: 'https://picsum.photos/seed/mas1/600/800', title: 'Mobile App Design', category: 'UI/UX', size: 'tall', href: '#' },
                    { image: 'https://picsum.photos/seed/mas2/600/400', title: 'E-Commerce Store', category: 'Web', size: 'normal', href: '#' },
                    // { image: 'https://picsum.photos/seed/mas3/600/400', title: 'Brand Guidelines', category: 'Branding', size: 'normal', href: '#' },
                    { image: 'https://picsum.photos/seed/mas4/600/600', title: 'Dashboard UI', category: 'Web App', size: 'square', href: '#' },
                    { image: 'https://picsum.photos/seed/mas5/600/800', title: 'Social Media App', category: 'Mobile', size: 'tall', href: '#' },
                    { image: 'https://picsum.photos/seed/mas6/600/400', title: 'Corporate Website', category: 'Web', size: 'normal', href: '#' },
                    { image: 'https://picsum.photos/seed/mas7/600/400', title: 'Marketing Site', category: 'Web', size: 'normal', href: '#' },
                    { image: 'https://picsum.photos/seed/mas8/600/600', title: 'Icon Set', category: 'Design', size: 'square', href: '#' },
                ]} />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>, text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline">
            <Icon />{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground  mb-12 @md:mb-16">{text}</p>
)

interface MasonryItem {
    image: string
    title: string
    category: string
    size: 'normal' | 'tall' | 'square'
    href: string
}

const MasonryGrid = ({ items }: { items: MasonryItem[] }) => (
    <ul className="columns-1 @sm:columns-2 @xl:columns-3 gap-4 @md:gap-6 space-y-4 @md:space-y-6">
        {items.map(({ image, title, category, size, href }, i) => (
            <li key={i} className="break-inside-avoid">
                <Link href={href} className="group block relative rounded-xl overflow-hidden">
                    <div className={`relative ${size === 'tall' ? 'aspect-3/4' : size === 'square' ? 'aspect-square' : 'aspect-3/2'}`}>
                        <Image src={image} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="absolute bottom-0 left-0 right-0 p-4 @md:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                            <Badge variant="secondary" className="mb-2">{category}</Badge>
                            <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                                {title}
                                <ArrowUpRight className="size-4" />
                            </h3>
                        </div>
                    </div>
                </Link>
            </li>
        ))}
    </ul>
)
