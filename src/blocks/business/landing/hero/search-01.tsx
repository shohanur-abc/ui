import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Search, TrendingUp, Building2, Users } from 'lucide-react'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-neon">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="max-w-4xl mx-auto text-center">
                    <Eyebrow icon={TrendingUp} text="Explore Opportunities" />
                    <Title text="Find the Perfect Business Solution" />
                    <Description text="Search through thousands of verified providers, compare options, and find exactly what your business needs." />
                    <SearchBar 
                        placeholder="Search for tools, services, or solutions..."
                        buttonText="Search"
                    />
                    <QuickFilters items={[
                        { icon: Building2, label: 'Enterprise' },
                        { icon: Users, label: 'Teams' },
                        { icon: TrendingUp, label: 'Startups' },
                    ]} />
                    <Stats items={[
                        { value: '10,000+', label: 'Solutions' },
                        { value: '50,000+', label: 'Reviews' },
                        { value: '99%', label: 'Satisfaction' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-6 @md:mb-8 gap-2 px-4 py-1.5">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-6 @md:mb-8">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg @md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 @md:mb-10 leading-relaxed">
        {text}
    </p>
)

const SearchBar = ({ placeholder, buttonText }: { placeholder: string; buttonText: string }) => (
    <div className="flex flex-col @sm:flex-row gap-3 max-w-xl mx-auto mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-muted-foreground" />
            <Input 
                type="text" 
                placeholder={placeholder} 
                className="pl-12 h-14 text-base rounded-xl border-2 focus-visible:border-primary"
            />
        </div>
        <Button size="lg" className="h-14 px-8 rounded-xl gap-2">
            {buttonText}
            <ArrowRight className="size-4" />
        </Button>
    </div>
)

const QuickFilters = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-2 mb-10 @md:mb-14">
        {items.map(({ icon: Icon, label }, i) => (
            <Button key={i} variant="secondary" size="sm" className="gap-2 rounded-full">
                <Icon className="size-3.5" />
                {label}
            </Button>
        ))}
    </div>
)

const Stats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex flex-wrap justify-center gap-8 @md:gap-16">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold text-primary mb-1">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)
