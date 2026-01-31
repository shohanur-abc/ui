import { Badge } from '@/components/ui/badge'



export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24 bg-muted/30">
                <div className="text-center">
                    <Eyebrow text="Technologies" />
                    <Title text="Tools I Use Daily" />
                    <Description text="My go-to technologies for building modern applications" />
                </div>

                <TechBadge items={[
                    { name: 'React', icon: '⚛️', color: 'bg-blue-500/10 hover:bg-blue-500/20' },
                    { name: 'Next.js', icon: '▲', color: 'bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20' },
                    { name: 'TypeScript', icon: 'TS', color: 'bg-blue-600/10 hover:bg-blue-600/20' },
                    { name: 'Node.js', icon: '🟢', color: 'bg-green-500/10 hover:bg-green-500/20' },
                    { name: 'Python', icon: '🐍', color: 'bg-yellow-500/10 hover:bg-yellow-500/20' },
                    { name: 'PostgreSQL', icon: '🐘', color: 'bg-blue-400/10 hover:bg-blue-400/20' },
                    { name: 'MongoDB', icon: '🍃', color: 'bg-green-600/10 hover:bg-green-600/20' },
                    { name: 'Redis', icon: '🔴', color: 'bg-red-500/10 hover:bg-red-500/20' },
                    { name: 'Docker', icon: '🐳', color: 'bg-blue-500/10 hover:bg-blue-500/20' },
                    { name: 'AWS', icon: '☁️', color: 'bg-orange-500/10 hover:bg-orange-500/20' },
                    { name: 'Tailwind', icon: '🎨', color: 'bg-cyan-500/10 hover:bg-cyan-500/20' },
                    { name: 'Figma', icon: '🎯', color: 'bg-purple-500/10 hover:bg-purple-500/20' },
                ]} />

                <Footer text="And many more... I&apos;m always learning new technologies" />
            </div>
        </section>
    )
}



function TechBadge({ items }: { items: { name: string; icon: string; color: string }[] }) {
    return (
        <ul className="flex flex-wrap justify-center gap-3 @md:gap-4 max-w-4xl mx-auto">
            {items.map((tech, index) => (
                <li key={index}>
                    <span className={`flex items-center gap-2 @md:gap-3 px-4 @md:px-5 @xl:px-6 py-3 @md:py-4 rounded-2xl ${tech.color} transition-all duration-300 hover:scale-105 cursor-default`}>
                        <span className="text-xl @md:text-2xl">
                            {tech.icon}
                        </span>
                        <span className="font-medium text-sm @md:text-base">
                            {tech.name}
                        </span>
                    </span>
                </li>
            ))}
        </ul>
    )
}

const Eyebrow = ({ text }: { text: string }) => (
    <div className="mb-3 @md:mb-4">
        <Badge variant="outline">
            {text}
        </Badge>
    </div>
)


const Title = ({ text }: { text: string }) => (
    <div className="mb-3 @md:mb-4">
        <h2 className="text-2xl @sm:text-3xl @md:text-4xl font-bold">
            {text}
        </h2>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <div className="mb-8 @md:mb-10 @xl:mb-12">
        <p className="text-base @md:text-lg text-muted-foreground max-w-2xl mx-auto">
            {text}
        </p>
    </div>
)

const Footer = ({ text }: { text: string }) => (
    <div className="mt-8 @md:mt-10 @xl:mt-12 text-center">
        <p className="text-sm text-muted-foreground">
            {text}
        </p>
    </div>
)