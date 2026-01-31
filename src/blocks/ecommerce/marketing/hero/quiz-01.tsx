import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles, Wand2, Palette, Shirt } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

const Eyebrow = ({ icon: Icon, text }: { icon: React.ElementType; text: string }) => (
    <Badge variant="secondary" className="gap-2">
        <Icon className="size-4" />
        {text}
    </Badge>
)

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
    <h1 className="text-4xl @sm:text-5xl @lg:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const StyleQuiz = ({ questions }: { questions: { label: string; options: string[] }[] }) => (
    <div className="max-w-2xl mx-auto space-y-6 mt-8">
        {questions.map(({ label, options }, i) => (
            <div key={i} className="space-y-3">
                <p className="font-medium">{label}</p>
                <div className="flex flex-wrap gap-2">
                    {options.map((option, j) => (
                        <Button key={j} variant="outline" size="sm" className="rounded-full">
                            {option}
                        </Button>
                    ))}
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ label, href }: { label: string; href: string }) => (
    <div className="text-center mt-8">
        <Button size="lg" className="gap-2" asChild>
            <Link href={href}>
                <Wand2 className="size-5" />
                {label}
            </Link>
        </Button>
    </div>
)

const StyleSuggestions = ({ items }: { items: { image: string; style: string }[] }) => (
    <div className="flex justify-center gap-4 mt-12 overflow-hidden">
        {items.map((item, i) => (
            <div key={i} className="relative size-24 @md:size-32 rounded-full overflow-hidden border-4 border-background shadow-lg">
                <Image src={item.image} alt={item.style} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="text-xs text-white font-medium text-center px-2">{item.style}</span>
                </div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Sparkles} text="AI Powered" />
                    <Title text="Discover Your" highlight="Perfect Style" />
                    <Description text="Take our quick style quiz and let AI curate personalized recommendations just for you. No more endless scrolling!" />
                </div>
                <StyleQuiz questions={[
                    { label: "What's your preferred style?", options: ["Casual", "Formal", "Sporty", "Bohemian", "Minimalist"] },
                    { label: "Which colors do you prefer?", options: ["Neutrals", "Bold Colors", "Pastels", "Earth Tones", "Monochrome"] },
                    { label: "What's your budget range?", options: ["Under $50", "$50-$100", "$100-$200", "$200+"] }
                ]} />
                <CTA label="Get My Style Picks" href="/style-quiz" />
                <StyleSuggestions items={[
                    { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop", style: "Street Style" },
                    { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop", style: "Classic" },
                    { image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=200&h=200&fit=crop", style: "Modern" },
                    { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&fit=crop", style: "Bohemian" },
                    { image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=200&fit=crop", style: "Elegant" }
                ]} />
            </div>
        </section>
    )
}
