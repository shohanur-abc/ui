import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative" data-theme="emerald">
            <div className="relative mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-24 @xl:py-32">
                <div className="flex flex-col items-center text-center">
                    <AuthorAvatar
                        src="https://i.pravatar.cc/200?img=40"
                        name="Sarah Chen"
                        initials="SC"
                    />
                    <AuthorName name="Sarah Chen" />
                    <Bio text="Product designer turned developer. I write about building digital products, creative coding, and the intersection of design and technology." />
                    <CTA label="Read my articles" href="/articles" />
                </div>
            </div>
        </section>
    )
}

interface AuthorAvatarProps {
    src: string
    name: string
    initials: string
}

const AuthorAvatar = ({ src, name, initials }: AuthorAvatarProps) => (
    <Avatar className="size-20 @md:size-24 mb-6">
        <AvatarImage src={src} alt={name} />
        <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
    </Avatar>
)

interface AuthorNameProps {
    name: string
}

const AuthorName = ({ name }: AuthorNameProps) => (
    <h1 className="text-2xl @md:text-3xl font-bold mb-4">{name}</h1>
)

interface BioProps {
    text: string
}

const Bio = ({ text }: BioProps) => (
    <p className="text-muted-foreground leading-relaxed mb-8">{text}</p>
)

interface CTAProps {
    label: string
    href: string
}

const CTA = ({ label, href }: CTAProps) => (
    <Button variant="outline" asChild className="gap-2">
        <Link href={href}>
            {label}
            <ArrowRight className="size-4" />
        </Link>
    </Button>
)
