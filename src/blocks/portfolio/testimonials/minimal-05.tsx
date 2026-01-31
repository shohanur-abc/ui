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
        <section className="@container bg-primary text-primary-foreground">
            <div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center">
                    <Eyebrow text="Featured Review" />
                    <SingleTestimonial
                        quote="The partnership with this team has been nothing short of transformative. Their expertise, creativity, and dedication to excellence resulted in a digital platform that has fundamentally changed how we do business."
                        author="Alexandra Reynolds"
                        role="Chief Executive Officer, FutureTech Industries"
                        avatar="https://i.pravatar.cc/100?img=94"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="flex justify-center mb-8">
        <Badge variant="secondary">{text}</Badge>
    </div>
)

const SingleTestimonial = ({ quote, author, role, avatar }: TestimonialItem) => (
    <div>
        <blockquote className="text-2xl @md:text-3xl @lg:text-4xl leading-relaxed mb-12 font-light">
            &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex flex-col items-center">
            <Avatar className="size-20 ring-4 ring-primary-foreground/20 mb-4">
                <AvatarImage src={avatar} />
                <AvatarFallback className="text-2xl bg-primary-foreground text-primary">{author[0]}</AvatarFallback>
            </Avatar>
            <div className="font-semibold text-xl">{author}</div>
            <div className="opacity-80">{role}</div>
        </div>
    </div>
)
