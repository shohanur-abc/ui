import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Ruler, Info, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground max-w-xl">{text}</p>
)

const SizeChart = ({ sizes }: { sizes: { size: string; chest: string; waist: string; hips: string }[] }) => (
    <div className="rounded-2xl border bg-card overflow-hidden">
        <div className="grid grid-cols-4 gap-px bg-border">
            <div className="bg-muted p-3 font-medium text-center">Size</div>
            <div className="bg-muted p-3 font-medium text-center">Chest</div>
            <div className="bg-muted p-3 font-medium text-center">Waist</div>
            <div className="bg-muted p-3 font-medium text-center">Hips</div>
            {sizes.map((row, i) => (
                <>
                    <div key={`size-${i}`} className="bg-card p-3 text-center font-medium">{row.size}</div>
                    <div key={`chest-${i}`} className="bg-card p-3 text-center text-muted-foreground">{row.chest}</div>
                    <div key={`waist-${i}`} className="bg-card p-3 text-center text-muted-foreground">{row.waist}</div>
                    <div key={`hips-${i}`} className="bg-card p-3 text-center text-muted-foreground">{row.hips}</div>
                </>
            ))}
        </div>
    </div>
)

const SizeQuiz = ({ questions }: { questions: { label: string; options: string[] }[] }) => (
    <div className="space-y-4">
        {questions.map(({ label, options }, i) => (
            <div key={i} className="space-y-2">
                <p className="font-medium text-sm">{label}</p>
                <div className="flex flex-wrap gap-2">
                    {options.map((option, j) => (
                        <Button key={j} variant="outline" size="sm" className="rounded-full">{option}</Button>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

const Benefits = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-4">
        {items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="size-4 text-primary" />
                <span>{item}</span>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <Button size="lg" className="gap-2" asChild>
        <Link href={href}>
            {label}
            <ArrowRight className="size-5" />
        </Link>
    </Button>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="grid @lg:grid-cols-2 gap-12 @xl:gap-20 items-start">
                    <div className="space-y-8">
                        <Eyebrow icon={Ruler} text="Size Guide" />
                        <Title text="Find Your" highlight="Perfect Fit" />
                        <Description text="Not sure about your size? Use our comprehensive size guide or take our quick quiz to get personalized size recommendations." />
                        <SizeQuiz questions={[
                            { label: "What's your usual size?", options: ["XS", "S", "M", "L", "XL", "XXL"] },
                            { label: "How do you prefer your fit?", options: ["Slim", "Regular", "Relaxed"] }
                        ]} />
                        <Benefits items={["Free exchanges", "Easy returns", "Fit guarantee"]} />
                        <CTA label="Get My Size" href="/size-guide" />
                    </div>
                    <SizeChart sizes={[
                        { size: "XS", chest: '32-34"', waist: '26-28"', hips: '34-36"' },
                        { size: "S", chest: '34-36"', waist: '28-30"', hips: '36-38"' },
                        { size: "M", chest: '38-40"', waist: '32-34"', hips: '40-42"' },
                        { size: "L", chest: '42-44"', waist: '36-38"', hips: '44-46"' },
                        { size: "XL", chest: '46-48"', waist: '40-42"', hips: '48-50"' }
                    ]} />
                </div>
            </div>
        </section>
    )
}
