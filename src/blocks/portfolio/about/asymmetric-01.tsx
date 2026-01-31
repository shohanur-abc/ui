import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Calendar, MapPin, Users } from 'lucide-react'
import Image from 'next/image'


export default function Component() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-3xl mb-12 @md:mb-16">
                    <Eyebrow icon={MapPin} text="My Journey" />
                    <Title text="About Me" />
                    <Description text="A developer passionate about building products that make a difference." />
                </div>

                <div className="grid @4xl:grid-cols-5 gap-8 @lg:gap-12">
                    <div className="@4xl:col-span-2">
                        <ProfileCard
                            image="https://picsum.photos/seed/about/600/800"
                            name="Alex Rivera"
                            title="Senior Software Engineer"
                            location="Austin, TX"
                            experience="8+ Years"
                        />
                    </div>

                    <div className="@4xl:col-span-3 space-y-6 @md:space-y-8">
                        <StorySection
                            title="My Story"
                            paragraphs={[
                                "I started coding at 14 when I built my first website for my dad's small business. That spark turned into a career spanning 8 years and 200+ projects.",
                                "Today, I specialize in building scalable web applications using modern technologies. I'm particularly passionate about developer experience and creating tools that make other developers' lives easier.",
                                "When I'm not coding, you'll find me hiking in the Texas Hill Country, reading sci-fi novels, or experimenting with new recipes in the kitchen.",
                            ]}
                        />

                        <StatsRow items={[
                            { icon: Calendar, value: '8+', label: 'Years Experience' },
                            { icon: Users, value: '50+', label: 'Happy Clients' },
                            { icon: Award, value: '12', label: 'Awards Won' },
                        ]} />

                        <SkillsSection items={[
                            'React & Next.js',
                            'TypeScript',
                            'Node.js',
                            'PostgreSQL',
                            'System Design',
                            'UI/UX',
                            'Performance',
                            'Accessibility'
                        ]} />
                    </div>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        <Icon className="size-4 mr-1.5" />{text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

interface ProfileCardProps {
    image: string
    name: string
    title: string
    location: string
    experience: string
}

const ProfileCard = ({ image, name, title, location, experience }: ProfileCardProps) => (
    <Card className="overflow-hidden sticky top-8 py-0">
        <div className="relative aspect-2/1 @4xl:aspect-square w-full">
            <Image src={image} alt={name} fill className="object-cover" />
        </div>
        <CardContent className="px-5 pb-3 @md:px-6 @md:pb-4">
            <h3 className="text-xl @md:text-2xl font-bold mb-1">{name}</h3>
            <p className="text-muted-foreground mb-4">{title}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                    <MapPin className="size-4" />
                    {location}
                </span>
                <span className="flex items-center gap-1.5">
                    <Calendar className="size-4" />
                    {experience}
                </span>
            </div>
        </CardContent>
    </Card>
)

const StorySection = ({ title, paragraphs }: { title: string; paragraphs: string[] }) => (
    <div>
        <h3 className="text-xl @md:text-2xl font-bold mb-4 @md:mb-6">{title}</h3>
        <div className="space-y-4 text-base @md:text-lg text-muted-foreground leading-relaxed">
            {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
            ))}
        </div>
    </div>
)

interface StatItem {
    icon: React.ComponentType<{ className?: string }>
    value: string
    label: string
}

const StatsRow = ({ items }: { items: StatItem[] }) => (
    <div className="grid grid-cols-3 gap-4 @md:gap-6 pt-6 @md:pt-8 border-t">
        {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="text-center">
                <Icon className="size-5 @md:size-6 text-primary mx-auto mb-2" />
                <div className="text-2xl @md:text-3xl font-bold">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const SkillsSection = ({items}: {items: string[]}) => (
    <div className="pt-6 @md:pt-8 border-t">
        <h3 className="text-lg @md:text-xl font-bold mb-4">Core Expertise</h3>
        <div className="grid grid-cols-2 gap-3 @md:gap-4">
            {items.map((skill) => (
                <div key={skill} className="px-3 @md:px-4 py-2 @md:py-3 bg-muted rounded-lg text-sm @md:text-base font-medium">
                    {skill}
                </div>
            ))}
        </div>
    </div>
)
