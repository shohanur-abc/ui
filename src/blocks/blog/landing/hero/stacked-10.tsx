import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search, Sparkles, TrendingUp } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-28">
                <div className="flex flex-col items-center text-center gap-6">
                    <Eyebrow label="Discover" icon={Sparkles} />
                    <Title text="Search Thousands of Articles" />
                    <Description text="Find exactly what you need across our entire library of tutorials, guides, and resources." />
                    <SearchBox placeholder="Search articles, topics, authors..." />
                    <TrendingSearches
                        searches={['React hooks', 'TypeScript generics', 'Next.js 15', 'Tailwind CSS', 'Node.js']}
                    />
                    <PopularTags
                        tags={[
                            { label: 'JavaScript', count: 1234 },
                            { label: 'React', count: 856 },
                            { label: 'CSS', count: 645 },
                            { label: 'Python', count: 534 },
                        ]}
                    />
                </div>
            </div>
            <BackgroundDecorative />
        </section>
    )
}

interface EyebrowProps {
    label: string
    icon: React.ComponentType<{ className?: string }>
}

const Eyebrow = ({ label, icon: Icon }: EyebrowProps) => (
    <Badge variant="secondary" className="px-4 py-1.5">
        <Icon className="size-3.5 mr-2" />
        {label}
    </Badge>
)

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight">
        {text}
    </h1>
)

interface DescriptionProps {
    text: string
}

const Description = ({ text }: DescriptionProps) => (
    <p className="text-lg text-muted-foreground max-w-xl">
        {text}
    </p>
)

interface SearchBoxProps {
    placeholder: string
}

const SearchBox = ({ placeholder }: SearchBoxProps) => (
    <div className="relative w-full max-w-xl mt-2">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
        <Input
            type="search"
            placeholder={placeholder}
            className="h-14 pl-12 pr-4 text-lg rounded-2xl"
        />
    </div>
)

interface TrendingSearchesProps {
    searches: string[]
}

const TrendingSearches = ({ searches }: TrendingSearchesProps) => (
    <div className="flex flex-wrap justify-center items-center gap-2 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
            <TrendingUp className="size-3.5" />
            Trending:
        </span>
        {searches.map((search) => (
            <Link
                key={search}
                href={`/search?q=${encodeURIComponent(search)}`}
                className="text-primary hover:underline"
            >
                {search}
            </Link>
        ))}
    </div>
)

interface Tag {
    label: string
    count: number
}

interface PopularTagsProps {
    tags: Tag[]
}

const PopularTags = ({ tags }: PopularTagsProps) => (
    <div className="flex flex-wrap justify-center gap-3 mt-4">
        {tags.map((tag) => (
            <Link
                key={tag.label}
                href={`/tag/${tag.label.toLowerCase()}`}
                className="group flex items-center gap-2 px-4 py-2 bg-card rounded-full border transition-all hover:border-primary"
            >
                <span className="font-medium group-hover:text-primary transition-colors">{tag.label}</span>
                <span className="text-xs text-muted-foreground">{tag.count}</span>
            </Link>
        ))}
    </div>
)

const BackgroundDecorative = () => (
    <>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 size-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    </>
)
