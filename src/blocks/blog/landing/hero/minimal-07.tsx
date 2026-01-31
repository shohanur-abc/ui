import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

export default function Main() {
    return (
        <section className="@container relative" data-theme="corporate">
            <div className="relative mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-20 @md:py-28 @xl:py-36">
                <div className="flex flex-col items-center text-center">
                    <Title text="Find what you're looking for" />
                    <SearchInput placeholder="Search articles..." />
                    <Stats
                        items={[
                            { value: '500+', label: 'articles' },
                            { value: '50+', label: 'topics' },
                        ]}
                    />
                </div>
            </div>
        </section>
    )
}

interface TitleProps {
    text: string
}

const Title = ({ text }: TitleProps) => (
    <h1 className="text-2xl @md:text-3xl font-bold tracking-tight mb-8">
        {text}
    </h1>
)

interface SearchInputProps {
    placeholder: string
}

const SearchInput = ({ placeholder }: SearchInputProps) => (
    <div className="relative w-full max-w-md mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <Input
            type="search"
            placeholder={placeholder}
            className="h-12 pl-11 pr-4 rounded-full"
        />
    </div>
)

interface StatItem {
    value: string
    label: string
}

interface StatsProps {
    items: StatItem[]
}

const Stats = ({ items }: StatsProps) => (
    <div className="flex gap-8 text-sm text-muted-foreground">
        {items.map((item) => (
            <span key={item.label}>
                <strong className="text-foreground">{item.value}</strong> {item.label}
            </span>
        ))}
    </div>
)
