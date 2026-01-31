import Link from "next/link"
import { Tag, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const PromoCode = ({ code }: { code: string }) => (
    <span className="font-mono font-bold bg-background/20 px-2 py-0.5 rounded text-sm @md:text-base">
        {code}
    </span>
)

const BannerMessage = ({
    icon: Icon,
    text,
    code,
}: {
    icon: React.ElementType
    text: string
    code: string
}) => (
    <div className="flex flex-wrap items-center justify-center gap-2 @sm:gap-3 text-sm @md:text-base">
        <Icon className="size-4 @md:size-5" />
        <span>{text}</span>
        <PromoCode code={code} />
    </div>
)

const CTALink = ({ text, href }: { text: string; href: string }) => (
    <Link
        href={href}
        className="inline-flex items-center gap-1 font-semibold hover:gap-2 transition-all group"
    >
        {text}
        <ArrowRight className="size-3.5" />
    </Link>
)

export default function Main() {
    return (
        <section className="@container relative" data-theme="neon">
            <div className="bg-primary py-3 @md:py-4 px-4 @sm:px-6 @2xl:px-8 text-primary-foreground">
                <div className="flex flex-wrap items-center justify-center gap-4 @md:gap-6">
                    <BannerMessage
                        icon={Tag}
                        text="Use code"
                        code="SAVE20"
                    />
                    <span className="opacity-60">|</span>
                    <CTALink text="Get 20% Off" href="/checkout" />
                </div>
            </div>
        </section>
    )
}
