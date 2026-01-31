'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Quote, Star, Play } from 'lucide-react'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    rating: number
    videoThumbnail?: string
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Video Reviews" />
                    <Title text="Featured 7" />
                    <Description text="Watch our clients share their experiences." />
                </div>

                <VideoFeatured
                    item={{
                        quote: "The video testimonial really captures how transformative this partnership has been for our organization.",
                        author: "Marcus Johnson",
                        role: "Founder & CEO",
                        company: "VideoFirst Media",
                        avatar: "https://i.pravatar.cc/100?img=17",
                        rating: 5,
                        videoThumbnail: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=450&fit=crop"
                    }}
                />
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-3 @md:mb-4">
        <Badge>{text}</Badge>
    </div>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const VideoFeatured = ({ item }: { item: TestimonialItem }) => (
    <div className="max-w-5xl mx-auto">
        <div className="grid @lg:grid-cols-2 gap-8 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
                <img 
                    src={item.videoThumbnail} 
                    alt="Video testimonial" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                    <div className="size-20 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="size-8 text-primary fill-primary ml-1" />
                    </div>
                </div>
            </div>
            
            <div className="bg-card border rounded-2xl p-6 @md:p-8 shadow-sm">
                <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} className={`size-5 ${j < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`} />
                    ))}
                </div>
                
                <Quote className="size-8 text-primary/20 mb-4" />
                
                <blockquote className="text-lg @md:text-xl leading-relaxed mb-6">
                    &ldquo;{item.quote}&rdquo;
                </blockquote>
                
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="size-14 ring-2 ring-primary/20">
                        <AvatarImage src={item.avatar} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{item.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="font-bold text-lg">{item.author}</div>
                        <div className="text-muted-foreground">{item.role}, {item.company}</div>
                    </div>
                </div>
                
                <Button className="w-full">
                    <Play className="size-4 mr-2" /> Watch Full Video
                </Button>
            </div>
        </div>
    </div>
)
