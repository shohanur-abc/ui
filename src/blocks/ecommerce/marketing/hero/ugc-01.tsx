import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Camera, Share2, Heart, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

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

const UGCGrid = ({ photos }: { photos: { image: string; user: { name: string; avatar: string }; likes: string }[] }) => (
    <div className="grid grid-cols-3 @md:grid-cols-6 gap-3">
        {photos.map((photo, i) => (
            <div key={i} className={`group relative rounded-2xl overflow-hidden ${i === 0 ? "@md:col-span-2 @md:row-span-2" : ""}`}>
                <div className="aspect-square relative">
                    <Image src={photo.image} alt={`Photo by ${photo.user.name}`} fill className="object-cover group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-end">
                        <div className="p-3 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex items-center gap-2">
                                <Avatar className="size-6">
                                    <AvatarImage src={photo.user.avatar} />
                                    <AvatarFallback>{photo.user.name[0]}</AvatarFallback>
                                </Avatar>
                                <span className="text-white text-xs truncate">{photo.user.name}</span>
                                <div className="ml-auto flex items-center gap-1 text-white text-xs">
                                    <Heart className="size-3 fill-current" />
                                    {photo.likes}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: React.ElementType; variant?: "default" | "outline" }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = "default" }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-5" />}
                </Link>
            </Button>
        ))}
    </div>
)

const Hashtag = ({ tag }: { tag: string }) => (
    <p className="text-center text-lg font-medium text-primary">{tag}</p>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 space-y-12">
                <div className="text-center space-y-6">
                    <Eyebrow icon={Camera} text="Community" />
                    <Title text="Real People," highlight="Real Style" />
                    <Description text="See how our community styles their favorite pieces. Share your look and get featured!" />
                    <Hashtag tag="#StyleWithUs" />
                </div>
                <UGCGrid photos={[
                    { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", user: { name: "Sarah M.", avatar: "https://i.pravatar.cc/150?img=1" }, likes: "2.4K" },
                    { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop", user: { name: "Alex K.", avatar: "https://i.pravatar.cc/150?img=2" }, likes: "1.8K" },
                    { image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=200&h=200&fit=crop", user: { name: "Emma L.", avatar: "https://i.pravatar.cc/150?img=3" }, likes: "3.1K" },
                    { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&fit=crop", user: { name: "Mike R.", avatar: "https://i.pravatar.cc/150?img=4" }, likes: "987" },
                    { image: "https://images.unsplash.com/photo-1485968579169-51d4b4f8a526?w=200&h=200&fit=crop", user: { name: "Jess W.", avatar: "https://i.pravatar.cc/150?img=5" }, likes: "2.1K" },
                    { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", user: { name: "Tom B.", avatar: "https://i.pravatar.cc/150?img=6" }, likes: "1.5K" },
                    { image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&h=200&fit=crop", user: { name: "Nina S.", avatar: "https://i.pravatar.cc/150?img=7" }, likes: "890" }
                ]} />
                <CTA items={[
                    { label: "Share Your Look", href: "/share", icon: Upload },
                    { label: "Browse Gallery", href: "/community", variant: "outline", icon: ArrowRight }
                ]} />
            </div>
        </section>
    )
}
