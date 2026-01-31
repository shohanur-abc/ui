import { Badge } from '@/components/ui/badge'
import Image from 'next/image'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @md:px-8 @xl:px-12 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="text-center max-w-3xl mx-auto mb-10 @md:mb-14">
                    <Eyebrow text="Trusted By" />
                    <Title text="Companies I've Worked With" />
                    <Description text="Proud to have contributed to these amazing organizations." />
                </div>

                <LogoGrid
                    items={[
                        { name: 'TechCorp', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=TechCorp' },
                        { name: 'StartupX', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=StartupX' },
                        { name: 'DataFlow', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=DataFlow' },
                        { name: 'CloudScale', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=CloudScale' },
                        { name: 'InnovateLab', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=InnovateLab' },
                        { name: 'FutureTech', logo: 'https://via.placeholder.com/200x80/1f2937/ffffff?text=FutureTech' },
                    ]}
                />
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
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4 @md:mb-6">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground leading-relaxed">{text}</p>
)

interface LogoItem {
    name: string
    logo: string
}

const LogoGrid = ({ items }: { items: LogoItem[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-6 gap-6 @md:gap-8 items-center">
        {items.map(({ name, logo }, i) => (
            <div
                key={i}
                className="flex items-center justify-center p-4 @md:p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors grayscale hover:grayscale-0"
            >
                <Image
                    src={logo}
                    alt={name}
                    width={120}
                    height={48}
                    className="opacity-70 hover:opacity-100 transition-opacity"
                />
            </div>
        ))}
    </div>
)
