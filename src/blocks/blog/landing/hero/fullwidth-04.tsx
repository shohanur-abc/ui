import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, BookOpen, Code2, FileText, Headphones, Video } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden min-h-[85vh]" data-theme="amber">
            <BackgroundImage src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
                <Header
                    title="What Do You Want to Learn?"
                    description="Explore our extensive library of developer resources"
                />
                <ContentTypes
                    items={[
                        { icon: FileText, label: 'Articles', count: '500+', href: '/articles' },
                        { icon: Video, label: 'Tutorials', count: '200+', href: '/tutorials' },
                        { icon: Headphones, label: 'Podcasts', count: '100+', href: '/podcasts' },
                        { icon: Code2, label: 'Code Labs', count: '50+', href: '/labs' },
                    ]}
                />
            </div>
        </section>
    )
}

interface BackgroundImageProps {
    src: string
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
    <>
        <Image src={src} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
    </>
)

interface HeaderProps {
    title: string
    description: string
}

const Header = ({ title, description }: HeaderProps) => (
    <div className="text-center mb-12">
        <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold text-white mb-6">
            {title}
        </h1>
        <p className="text-lg @md:text-xl text-white/80">
            {description}
        </p>
    </div>
)

interface ContentItem {
    icon: React.ComponentType<{ className?: string }>
    label: string
    count: string
    href: string
}

interface ContentTypesProps {
    items: ContentItem[]
}

const ContentTypes = ({ items }: ContentTypesProps) => (
    <div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @md:gap-6 max-w-4xl w-full">
        {items.map((item) => (
            <Link
                key={item.label}
                href={item.href}
                className="group p-6 @lg:p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10 hover:bg-white/20 hover:border-white/20 transition-all text-center"
            >
                <div className="size-12 @lg:size-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="size-6 @lg:size-8 text-primary" />
                </div>
                <h3 className="font-semibold text-white text-lg mb-1">{item.label}</h3>
                <p className="text-white/60 text-sm">{item.count}</p>
                <ArrowRight className="size-4 text-white/40 mx-auto mt-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
        ))}
    </div>
)
