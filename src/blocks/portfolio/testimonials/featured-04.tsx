import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote, PlayCircle } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    videoThumbnail?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Video Testimonial" />
                    <Title text="Hear It From Them" />
                </div>

                <VideoTestimonial
                    quote="The collaboration exceeded all our expectations. What started as a website redesign became a complete digital transformation that has positioned us for years of growth."
                    author="Sarah Mitchell"
                    role="CEO"
                    company="TechVentures Inc"
                    avatar="https://i.pravatar.cc/100?img=98"
                    videoThumbnail="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge variant="outline">{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const VideoTestimonial = ({ quote, author, role, company, avatar, videoThumbnail }: TestimonialItem) => (
    <div className="max-w-5xl mx-auto">
        <div className="grid @lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video bg-muted rounded-xl overflow-hidden group cursor-pointer">
                {videoThumbnail && (
                    <img 
                        src={videoThumbnail} 
                        alt="Video thumbnail" 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="size-16 @md:size-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                        <PlayCircle className="size-8 @md:size-10 text-primary ml-1" />
                    </div>
                </div>
            </div>

            <div className="@lg:pl-6">
                <Quote className="size-10 text-primary/30 mb-6" />
                <blockquote className="text-lg @md:text-xl leading-relaxed mb-8">
                    &ldquo;{quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-4">
                    <Avatar className="size-14 ring-2 ring-primary/20">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground text-lg">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-semibold text-lg">{author}</div>
                        <div className="text-muted-foreground">{role}, {company}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
