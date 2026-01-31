import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Download, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="max-w-2xl mx-auto">
                    <ProfileCard
                        image="https://picsum.photos/seed/about-centered3/600/600"
                        name="Michael Chen"
                        role="UI/UX Designer"
                        bio="I craft intuitive digital experiences that bridge the gap between user needs and business goals. With a background in psychology and design, I bring a unique perspective to every project."
                        tags={['User Research', 'Prototyping', 'Design Systems', 'Accessibility']}
                        socials={[
                            { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
                            { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                            { icon: Github, href: 'https://github.com', label: 'GitHub' },
                            { icon: Mail, href: 'mailto:hello@example.com', label: 'Email' },
                        ]}
                        resumeHref="/resume.pdf"
                        resumeLabel="Download Resume"
                    />
                </div>
            </div>
        </section>
    )
}

interface SocialLink {
    icon: React.ComponentType<{ className?: string }>
    href: string
    label: string
}

interface ProfileCardProps {
    image: string
    name: string
    role: string
    bio: string
    tags: string[]
    socials: SocialLink[]
    resumeHref: string
    resumeLabel: string
}

const ProfileCard = ({ image, name, role, bio, tags, socials, resumeHref, resumeLabel }: ProfileCardProps) => (
    <Card className="overflow-hidden text-center py-0">
        <div className="relative aspect-square @sm:aspect-[4/3] w-full">
            <Image src={image} alt={name} fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-6 left-0 right-0 px-6">
                <h1 className="text-3xl @md:text-4xl font-bold text-foreground mb-1">{name}</h1>
                <p className="text-primary font-medium">{role}</p>
            </div>
        </div>
        <CardContent className="p-6 @md:p-8">
            <p className="text-muted-foreground leading-relaxed mb-6">{bio}</p>
            <div className="flex flex-wrap justify-center gap-2 mb-6">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                        {tag}
                    </Badge>
                ))}
            </div>
            <div className="flex justify-center gap-1 mb-6">
                {socials.map(({ icon: Icon, href, label }) => (
                    <Button key={label} variant="ghost" size="icon" asChild>
                        <Link href={href} aria-label={label}>
                            <Icon className="size-5" />
                        </Link>
                    </Button>
                ))}
            </div>
            <Button variant="outline" className="gap-2" asChild>
                <Link href={resumeHref}>
                    <Download className="size-4" />
                    {resumeLabel}
                </Link>
            </Button>
        </CardContent>
    </Card>
)
