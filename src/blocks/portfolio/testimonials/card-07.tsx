import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface TestimonialItem {
    quote: string
    author: string
    role: string
    avatar?: string
}

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-12 @md:mb-16">
                    <Eyebrow text="Testimonials" />
                    <Title text="Words That Matter" />
                </div>

                <TestimonialList items={[
                    {
                        quote: "The collaboration was seamless from start to finish. Our new platform has received incredible feedback from users.",
                        author: "Amanda Foster",
                        role: "Head of Product, TechVentures",
                        avatar: "https://i.pravatar.cc/100?img=46",
                    },
                    {
                        quote: "Brilliant execution of complex requirements. The attention to performance and user experience was remarkable.",
                        author: "Ryan Mitchell",
                        role: "CTO, ScaleUp Inc",
                        avatar: "https://i.pravatar.cc/100?img=47",
                    },
                    {
                        quote: "A true partner in every sense. They understood our vision and brought it to life with expertise and creativity.",
                        author: "Jennifer Hayes",
                        role: "Founder, DesignFirst",
                        avatar: "https://i.pravatar.cc/100?img=48",
                    },
                ]} />
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">{text}</h2>
)

const TestimonialList = ({ items }: { items: TestimonialItem[] }) => (
    <ul className="max-w-4xl mx-auto divide-y divide-border">
        {items.map(({ quote, author, role, avatar }, i) => (
            <li key={i} className="py-8 @md:py-12 first:pt-0 last:pb-0">
                <div className="flex flex-col @md:flex-row gap-6 @md:gap-10">
                    <Avatar className="size-16 @md:size-20 shrink-0 ring-4 ring-muted">
                        <AvatarImage src={avatar} />
                        <AvatarFallback className="text-xl bg-primary text-primary-foreground">{author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <blockquote className="text-lg @md:text-xl @lg:text-2xl leading-relaxed mb-4 @md:mb-6">
                            &ldquo;{quote}&rdquo;
                        </blockquote>
                        <div>
                            <div className="font-semibold text-base @md:text-lg">{author}</div>
                            <div className="text-sm @md:text-base text-muted-foreground">{role}</div>
                        </div>
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
