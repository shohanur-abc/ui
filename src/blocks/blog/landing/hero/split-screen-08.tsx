import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle2, Globe, Languages, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid grid-cols-1 @3xl:grid-cols-2 gap-10 @xl:gap-16 items-center">
                    <ContentSection
                        eyebrow={{ icon: Globe, text: 'Global Community' }}
                        title="Tech Insights"
                        highlight="In Your Language"
                        description="High-quality content available in 12+ languages. Learn in your native tongue with professionally translated articles and tutorials."
                        features={[
                            'Professional translations by native speakers',
                            'Synchronized content across all languages',
                            'Language-specific community forums',
                            'AI-powered translation assistance',
                        ]}
                        cta={[
                            { label: 'Choose Your Language', href: '/languages', icon: ArrowRight },
                            { label: 'Become a Translator', href: '/translate', variant: 'outline' },
                        ]}
                    />
                    <LanguageGrid
                        items={[
                            { code: 'EN', name: 'English', articles: 5000, flag: '🇺🇸' },
                            { code: 'ES', name: 'Español', articles: 3200, flag: '🇪🇸' },
                            { code: 'PT', name: 'Português', articles: 2800, flag: '🇧🇷' },
                            { code: 'DE', name: 'Deutsch', articles: 2100, flag: '🇩🇪' },
                            { code: 'FR', name: 'Français', articles: 1900, flag: '🇫🇷' },
                            { code: 'JA', name: '日本語', articles: 1500, flag: '🇯🇵' },
                            { code: 'KO', name: '한국어', articles: 1200, flag: '🇰🇷' },
                            { code: 'ZH', name: '中文', articles: 2500, flag: '🇨🇳' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface CTAItem {
    label: string
    href: string
    icon?: React.ComponentType<{ className?: string }>
    variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}

interface ContentSectionProps {
    eyebrow: { icon: React.ComponentType<{ className?: string }>; text: string }
    title: string
    highlight: string
    description: string
    features: string[]
    cta: CTAItem[]
}

const ContentSection = ({ eyebrow, title, highlight, description, features, cta }: ContentSectionProps) => (
    <div className="space-y-6">
        <Eyebrow icon={eyebrow.icon} text={eyebrow.text} />
        <Title text={title} highlight={highlight} />
        <Description text={description} />
        <Features items={features} />
        <CTA items={cta} />
    </div>
)

const Eyebrow = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="secondary" className="gap-2 px-4 py-1.5">
        <Icon className="size-4 text-primary" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight">
        {text}
        <span className="block bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
            {highlight}
        </span>
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-lg">
        {text}
    </p>
)

const Features = ({ items }: { items: string[] }) => (
    <ul className="space-y-3">
        {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <span className="text-sm @md:text-base">{item}</span>
            </li>
        ))}
    </ul>
)

const CTA = ({ items }: { items: CTAItem[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, icon: Icon, variant = 'default' }) => (
            <Button key={label} size="lg" variant={variant} asChild className="gap-2">
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

interface Language {
    code: string
    name: string
    articles: number
    flag: string
}

const LanguageGrid = ({ items }: { items: Language[] }) => (
    <div className="grid grid-cols-2 gap-3">
        {items.map((lang) => (
            <LanguageCard key={lang.code} language={lang} />
        ))}
    </div>
)

const LanguageCard = ({ language }: { language: Language }) => (
    <Link
        href={`/lang/${language.code.toLowerCase()}`}
        className="group flex items-center gap-3 p-4 rounded-xl bg-card border transition-all hover:border-primary hover:shadow-lg"
    >
        <span className="text-2xl">{language.flag}</span>
        <div className="flex-1 min-w-0">
            <p className="font-semibold truncate">{language.name}</p>
            <p className="text-xs text-muted-foreground">{language.articles.toLocaleString()} articles</p>
        </div>
        <Languages className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </Link>
)
