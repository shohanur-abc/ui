import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Camera, Heart, MessageCircle } from "lucide-react"
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
    <h1 className="text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-bold tracking-tight text-center">
        {text}{" "}
        {highlight && <span className="text-primary">{highlight}</span>}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">{text}</p>
)

const CommunityStats = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="flex justify-center gap-8 @md:gap-12">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-3xl @md:text-4xl font-bold text-primary">{value}</div>
                <div className="text-sm text-muted-foreground">{label}</div>
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

const UGCGrid = ({ posts }: { posts: { image: string; user: { name: string; avatar: string }; likes: string }[] }) => (
    <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-12">
        {posts.map((post, i) => (
            <div key={i} className="group relative aspect-square rounded-xl overflow-hidden">
                <Image src={post.image} alt={`UGC by ${post.user.name}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
                    <div className="flex items-center gap-2">
                        <Avatar className="size-6 border border-white/50">
                            <AvatarImage src={post.user.avatar} />
                            <AvatarFallback>{post.user.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-white font-medium truncate">{post.user.name}</span>
                        <div className="flex items-center gap-1 ml-auto text-white text-xs">
                            <Heart className="size-3 fill-white" />
                            {post.likes}
                        </div>
                    </div>
                </div>
            </div>
        ))}
    </div>
)

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="neon">
            <div className="max-w-7xl mx-auto px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24">
                <div className="space-y-8">
                    <div className="text-center">
                        <Eyebrow icon={Camera} text="#ShopWithUs" />
                    </div>
                    <Title text="Join Our Style" highlight="Community" />
                    <Description text="Share your looks, get inspired by others, and be featured on our page. Tag us with #ShopWithUs for a chance to be featured." />
                    <CommunityStats items={[
                        { value: "500K+", label: "Community Members" },
                        { value: "2M+", label: "Photos Shared" },
                        { value: "50K+", label: "Monthly Features" }
                    ]} />
                    <CTA items={[
                        { label: "Join Community", href: "/community", icon: Users },
                        { label: "Share Your Look", href: "/upload", variant: "outline", icon: Camera }
                    ]} />
                    <UGCGrid posts={[
                        { image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop", user: { name: "Sarah K.", avatar: "https://i.pravatar.cc/150?img=1" }, likes: "2.4K" },
                        { image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=400&h=400&fit=crop", user: { name: "Emma L.", avatar: "https://i.pravatar.cc/150?img=2" }, likes: "1.8K" },
                        { image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=400&fit=crop", user: { name: "Mike R.", avatar: "https://i.pravatar.cc/150?img=3" }, likes: "3.1K" },
                        { image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=400&fit=crop", user: { name: "Lisa M.", avatar: "https://i.pravatar.cc/150?img=4" }, likes: "2.7K" }
                    ]} />
                </div>
            </div>
        </section>
    )
}
