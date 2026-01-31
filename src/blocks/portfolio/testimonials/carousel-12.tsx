'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Quote } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    company: string
    avatar?: string
    project: string
}

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Case Studies" />
                    <Title text="Project Carousel" />
                    <Description text="Testimonials from specific projects." />
                </div>

                <ProjectCarousel
                    items={[
                        { quote: "The e-commerce platform handles millions in transactions monthly.", author: "Patricia Lane", role: "CEO", company: "ShopMillion", avatar: "https://i.pravatar.cc/100?img=51", project: "E-commerce Platform" },
                        { quote: "Mobile app reached 1M downloads in first month.", author: "Kevin Zhang", role: "Product Lead", company: "MillionDownloads", avatar: "https://i.pravatar.cc/100?img=52", project: "Mobile Application" },
                        { quote: "SaaS dashboard reduced support tickets by 60%.", author: "Maria Santos", role: "COO", company: "SupportLess", avatar: "https://i.pravatar.cc/100?img=53", project: "SaaS Dashboard" },
                        { quote: "Corporate rebrand unified our global presence.", author: "James Wilson", role: "Brand Director", company: "GlobalUnify", avatar: "https://i.pravatar.cc/100?img=54", project: "Corporate Rebrand" },
                        { quote: "Marketing site generates 500+ leads monthly.", author: "Emily Foster", role: "CMO", company: "LeadGen500", avatar: "https://i.pravatar.cc/100?img=55", project: "Marketing Website" },
                    ]}
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

const ProjectCarousel = ({ items }: { items: TestimonialItem[] }) => (
    <Carousel
        opts={{
            align: 'center',
            loop: true,
        }}
        className="w-full max-w-5xl mx-auto"
    >
        <CarouselContent>
            {items.map(({ quote, author, role, company, avatar, project }, i) => (
                <CarouselItem key={i} className="basis-full @md:basis-4/5 @lg:basis-3/5">
                    <div className="bg-background border rounded-2xl p-6 @md:p-8 shadow-md mx-2">
                        <Badge className="mb-4" variant="secondary">{project}</Badge>
                        <Quote className="size-8 text-primary/20 mb-4" />
                        <blockquote className="text-lg @md:text-xl leading-relaxed mb-6">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-4 pt-4 border-t">
                            <Avatar className="size-12 ring-2 ring-primary/20">
                                <AvatarImage src={avatar} />
                                <AvatarFallback className="bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="font-semibold">{author}</div>
                                <div className="text-sm text-muted-foreground">{role}, {company}</div>
                            </div>
                        </div>
                    </div>
                </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
    </Carousel>
)
