import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Quote } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mx-auto text-center">
                    <Eyebrow text="Personal Philosophy" />
                    <QuoteCard
                        text="The best code is the code you don't have to write. Simplicity is the ultimate sophistication in software engineering."
                        icon={Quote}
                    />
                    <ProfileImage
                        src="https://picsum.photos/seed/about-centered6/400/400"
                        fallback="RL"
                    />
                    <Title text="Rachel Lee" />
                    <Role text="Principal Engineer" />
                    <Description
                        text="With 15 years in the industry, I've learned that the most elegant solutions come from deeply understanding the problem. I lead engineering teams with a focus on sustainable velocity and technical excellence."
                    />
                    <Values
                        items={['Simplicity First', 'Ship Early', 'Learn Fast', 'Stay Curious']}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="secondary" className="mb-8">
        {text}
    </Badge>
)

interface QuoteCardProps {
    text: string
    icon: React.ComponentType<{ className?: string }>
}

const QuoteCard = ({ text, icon: Icon }: QuoteCardProps) => (
    <Card className="mb-10 bg-muted/50 border-none">
        <CardContent className="p-6 @md:p-8">
            <Icon className="size-8 text-primary/40 mx-auto mb-4" />
            <blockquote className="text-lg @md:text-xl italic text-foreground leading-relaxed">
                &ldquo;{text}&rdquo;
            </blockquote>
        </CardContent>
    </Card>
)

const ProfileImage = ({ src, fallback }: { src: string; fallback: string }) => (
    <Avatar className="size-20 @md:size-24 mx-auto mb-4 ring-2 ring-primary/20">
        <AvatarImage src={src} alt="Profile" />
        <AvatarFallback className="text-xl @md:text-2xl bg-primary text-primary-foreground">
            {fallback}
        </AvatarFallback>
    </Avatar>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-1">{text}</h1>
)

const Role = ({ text }: { text: string }) => (
    <p className="text-primary font-medium mb-6">{text}</p>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-muted-foreground leading-relaxed mb-8 max-w-xl mx-auto">
        {text}
    </p>
)

const Values = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap justify-center gap-3">
        {items.map((value) => (
            <Badge key={value} variant="outline" className="px-4 py-1.5 text-sm">
                {value}
            </Badge>
        ))}
    </div>
)
