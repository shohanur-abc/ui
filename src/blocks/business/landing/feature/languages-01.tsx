import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Globe, Languages, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

interface LanguageItem {
    code: string
    name: string
    native: string
    coverage: number
}

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="corporate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
                    <Eyebrow icon={Languages} text="Localization" />
                    <Title text="Available in Your" highlight="Language" />
                    <Description text="Our platform supports 30+ languages with full localization, making it accessible to teams worldwide." />
                </div>

                <LanguageGrid items={[
                    { code: 'en', name: 'English', native: 'English', coverage: 100 },
                    { code: 'es', name: 'Spanish', native: 'Español', coverage: 100 },
                    { code: 'fr', name: 'French', native: 'Français', coverage: 100 },
                    { code: 'de', name: 'German', native: 'Deutsch', coverage: 100 },
                    { code: 'ja', name: 'Japanese', native: '日本語', coverage: 98 },
                    { code: 'zh', name: 'Chinese', native: '中文', coverage: 97 },
                    { code: 'pt', name: 'Portuguese', native: 'Português', coverage: 95 },
                    { code: 'ko', name: 'Korean', native: '한국어', coverage: 94 },
                ]} />

                <MoreLanguages count={22} href="/languages" />
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="mb-4">
        <Badge variant="outline" className="gap-2">
            <Icon className="size-3.5" />
            {text}
        </Badge>
    </div>
)

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
    <h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
        {text} <span className="text-primary">{highlight}</span>
    </h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">
        {text}
    </p>
)

const LanguageGrid = ({ items }: { items: LanguageItem[] }) => (
    <div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4 max-w-4xl mx-auto">
        {items.map((lang) => (
            <Card key={lang.code} className="border-border/50 transition-all hover:border-primary/30">
                <CardContent className="p-4 flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold uppercase">
                        {lang.code}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{lang.native}</p>
                        <p className="text-xs text-muted-foreground">{lang.coverage}% translated</p>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)

const MoreLanguages = ({ count, href }: { count: number; href: string }) => (
    <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground mb-2">
            + {count} more languages supported
        </p>
        <Link 
            href={href}
            className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
        >
            View all languages <ArrowRight className="size-3" />
        </Link>
    </div>
)
