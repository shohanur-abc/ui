import Link from "next/link"
import { ArrowRight, Bell, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const DismissButton = () => (
    <Button
        variant="ghost"
        size="icon-sm"
        className="text-muted-foreground hover:text-foreground"
    >
        <X className="size-4" />
    </Button>
)

const NotificationContent = ({
    icon: Icon,
    badge,
    title,
    description,
    cta,
}: {
    icon: React.ElementType
    badge?: string
    title: string
    description: string
    cta: { label: string; href: string }
}) => (
    <div className="flex gap-4">
        <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Icon className="size-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold truncate">{title}</h3>
                {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{description}</p>
            <Button size="sm" className="gap-1.5" asChild>
                <Link href={cta.href}>
                    {cta.label}
                    <ArrowRight className="size-3.5" />
                </Link>
            </Button>
        </div>
        <DismissButton />
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="bg-background py-16 @md:py-20 px-4 @sm:px-6 @2xl:px-8">
                <div className="max-w-md mx-auto">
                    <div className="bg-card rounded-2xl border border-border/50 p-5 shadow-lg">
                        <NotificationContent
                            icon={Bell}
                            badge="New"
                            title="Flash Sale Starting Soon!"
                            description="Get ready for our biggest sale of the year. Up to 70% off on selected items."
                            cta={{ label: "Set Reminder", href: "/flash-sale" }}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
