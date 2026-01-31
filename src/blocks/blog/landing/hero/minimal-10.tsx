import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative" data-theme="amber">
            <div className="relative mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
                <div className="flex flex-col items-center text-center">
                    <Logo />
                    <Title text="The Minimalist Developer" />
                    <Tagline text="Less code. More impact." />
                    <NavLinks
                        links={[
                            { label: 'Read', href: '/articles' },
                            { label: 'Subscribe', href: '/subscribe' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

const Logo = () => (
    <div className="size-12 rounded-full bg-primary flex items-center justify-center mb-8">
        <span className="text-primary-foreground font-bold text-xl">M</span>
    </div>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-2xl @md:text-3xl font-bold tracking-tight mb-2">
        {text}
    </h1>
)

interface TaglineProps {
    text: string
}

const Tagline = ({ text }: TaglineProps) => (
    <p className="text-muted-foreground mb-8">{text}</p>
)

interface NavLink {
    label: string
    href: string
}

interface NavLinksProps {
    links: NavLink[]
}

const NavLinks = ({ links }: NavLinksProps) => (
    <nav className="flex gap-8">
        {links.map((link) => (
            <Link
                key={link.label}
                href={link.href}
                className="font-medium hover:text-primary transition-colors"
            >
                {link.label}
            </Link>
        ))}
    </nav>
)
