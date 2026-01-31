import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Play, Award } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 h-full">
                <div className="grid @3xl:grid-cols-[1fr_1.2fr] min-h-screen gap-8 @xl:gap-12 items-center">
                    <div className="py-12 @md:py-16 @3xl:py-0">
                        <Eyebrow icon={Award} text="Award-Winning Platform" />
                        <Title text="Streamline Your Entire Workflow" highlight="Workflow" />
                        <Description text="One platform to manage projects, collaborate with teams, and deliver exceptional results. Trusted by industry leaders worldwide." />
                        <CTA items={[
                            { label: 'Try For Free', href: '#try', icon: ArrowRight },
                            { label: 'Watch Video', href: '#video', icon: Play, variant: 'ghost' },
                        ]} />
                        <Testimonial 
                            quote="This platform transformed how we work. 10x productivity improvement."
                            author="Sarah Chen"
                            role="CEO, TechFlow Inc."
                            avatar="https://i.pravatar.cc/150?img=32"
                        />
                    </div>
                    <div className="py-8 @3xl:py-12">
                        <VideoPreview 
                            thumbnail="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&h=500&fit=crop"
                            alt="Platform demo"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text.split(highlight)[0]}
        <span className="text-primary">{highlight}</span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed max-w-xl">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' | 'ghost' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4 mb-8 @md:mb-10">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {Icon && variant === 'ghost' && <Icon className="size-4" />}
                    {label}
                    {Icon && variant !== 'ghost' && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Testimonial = ({ quote, author, role, avatar }: { quote: string; author: string; role: string; avatar: string }) => (
    <div className="flex gap-4 items-start p-4 rounded-lg bg-muted/50 border border-border/50">
        <Image src={avatar} alt={author} width={48} height={48} className="rounded-full shrink-0" />
        <div>
            <p className="text-sm @md:text-base italic mb-2">&ldquo;{quote}&rdquo;</p>
            <p className="text-sm font-medium">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
        </div>
    </div>
)

const VideoPreview = ({ thumbnail, alt }: { thumbnail: string; alt: string }) => (
    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl group cursor-pointer">
        <Image src={thumbnail} alt={alt} fill className="object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
            <div className="size-16 @md:size-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Play className="size-6 @md:size-8 text-foreground ml-1" fill="currentColor" />
            </div>
        </div>
    </div>
)
