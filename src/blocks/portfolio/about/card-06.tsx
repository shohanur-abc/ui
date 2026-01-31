import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Quote, Star } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-md mx-auto">
                    <ProfileCard
                        src="https://picsum.photos/seed/card6/400/400"
                        fallback="LW"
                        name="Lisa Wang"
                        role="Design Consultant"
                        experience="15+ years"
                        rating={5}
                        reviewCount={120}
                        quote="Lisa transformed our product experience. Her insights were invaluable."
                        quoteAuthor="CEO, TechStartup"
                        expertise={['Product Design', 'Design Strategy', 'Team Coaching', 'Workshops']}
                        clients={['Google', 'Meta', 'Airbnb', 'Stripe']}
                    />
                </div>
            </div>
        </section>
    )
}

interface ProfileCardProps {
    src: string
    fallback: string
    name: string
    role: string
    experience: string
    rating: number
    reviewCount: number
    quote: string
    quoteAuthor: string
    expertise: string[]
    clients: string[]
}

const ProfileCard = ({ src, fallback, name, role, experience, rating, reviewCount, quote, quoteAuthor, expertise, clients }: ProfileCardProps) => (
    <Card>
        <CardHeader className="text-center pb-0">
            <Avatar className="size-24 mx-auto mb-4 ring-4 ring-border">
                <AvatarImage src={src} alt={name} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
            </Avatar>
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-primary font-medium">{role}</p>
            <div className="flex items-center justify-center gap-4 mt-3 text-sm text-muted-foreground">
                <span>{experience}</span>
                <span className="flex items-center gap-1">
                    <Star className="size-4 fill-yellow-500 text-yellow-500" />
                    {rating}.0 ({reviewCount} reviews)
                </span>
            </div>
        </CardHeader>
        <CardContent className="pt-6">
            <div className="bg-muted/50 rounded-lg p-4 mb-6">
                <Quote className="size-5 text-primary/40 mb-2" />
                <p className="text-sm italic text-muted-foreground mb-2">&ldquo;{quote}&rdquo;</p>
                <p className="text-xs font-medium">— {quoteAuthor}</p>
            </div>
            <div className="mb-6">
                <p className="text-sm font-medium mb-2">Expertise</p>
                <div className="flex flex-wrap gap-2">
                    {expertise.map((item) => (
                        <Badge key={item} variant="secondary" className="text-xs">{item}</Badge>
                    ))}
                </div>
            </div>
            <Separator className="my-4" />
            <div>
                <p className="text-sm font-medium mb-2">Trusted by</p>
                <div className="flex flex-wrap gap-2">
                    {clients.map((client) => (
                        <Badge key={client} variant="outline" className="text-xs">{client}</Badge>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)
