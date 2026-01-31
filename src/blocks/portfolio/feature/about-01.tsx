import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Building, Globe2, Users } from 'lucide-react'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-12 items-center">
                    <div>
                        <Eyebrow text="About Me" />
                        <Title text="Passionate Developer & Problem Solver" />
                        <Description text="With over 8 years of experience in software development, I've helped companies of all sizes build products that users love. My approach combines technical excellence with a deep understanding of business needs." />

                        <HighlightStats
                            items={[
                                { icon: Building, value: '50+', label: 'Companies Worked With' },
                                { icon: Users, value: '1M+', label: 'Users Impacted' },
                                { icon: Globe2, value: '15+', label: 'Countries Reached' },
                                { icon: Award, value: '5', label: 'Industry Awards' },
                            ]}
                        />
                    </div>

                    <ProfileImage
                        src="https://picsum.photos/seed/profile/600/700"
                        alt="Developer portrait"
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed mb-8 @md:mb-10">{text}</p>
)

interface StatItem {
    icon: ComponentType<{ className?: string }>
    value: string
    label: string
}

const HighlightStats = ({ items }: { items: StatItem[] }) => (
    <div className="grid @sm:grid-cols-2 gap-4">
        {items.map(({ icon: Icon, value, label }, i) => (
            <Card key={i} className="py-0">
                <CardContent className="p-4 @md:p-5 flex items-center gap-4">
                    <div className="size-10 @md:size-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="size-5 @md:size-6 text-primary" />
                    </div>
                    <div>
                        <div className="text-xl @md:text-2xl font-bold">{value}</div>
                        <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

interface ProfileImageProps {
    src: string
    alt: string
}

const ProfileImage = ({ src, alt }: ProfileImageProps) => (
    <div className="relative aspect-[4/5] rounded-2xl @md:rounded-3xl overflow-hidden">
        <Image src={src} alt={alt} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
    </div>
)
