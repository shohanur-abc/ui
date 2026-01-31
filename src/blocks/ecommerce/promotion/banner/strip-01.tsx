import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const CloseButton = ({ onClick }: { onClick?: () => void }) => (
    <Button
        variant="ghost"
        size="icon-sm"
        onClick={onClick}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground/70 hover:text-primary-foreground hover:bg-primary-foreground/10"
    >
        <X className="size-4" />
    </Button>
)

const BannerContent = ({
    text,
    linkText,
    href,
}: {
    text: string
    linkText: string
    href: string
}) => (
    <div className="flex items-center justify-center gap-2 @sm:gap-3 text-sm @md:text-base text-primary-foreground">
        <span>{text}</span>
        <Link
            href={href}
            className="inline-flex items-center gap-1 font-semibold underline-offset-4 hover:underline transition-all group"
        >
            {linkText}
            <ArrowRight className="size-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
    </div>
)

export default function Main() {
    return (
        <section className="@container relative" data-theme="neon">
            <div className="bg-primary py-2.5 @md:py-3 px-4 @sm:px-6 @2xl:px-8 relative">
                <BannerContent
                    text="🎉 Free shipping on orders over $50"
                    linkText="Shop Now"
                    href="/shop"
                />
                <CloseButton />
            </div>
        </section>
    )
}
