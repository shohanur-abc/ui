import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Share2, Heart, Copy, Users } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'


export default function Component() {
    return (
        <section className="@container relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
            <ReferralPattern />

            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @2xl:grid-cols-2 gap-8 @lg:gap-12 @3xl:gap-16 items-center">
                    {/* Content */}
                    <div>
                        <Badge className="inline-flex items-center gap-2 px-4 py-2 mb-4 @md:mb-6 bg-white/20 text-white border-0">
                            <Share2 className="size-4" /> Referral Program
                        </Badge>

                        <h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold leading-tight tracking-tight mb-4 @md:mb-6">
                            Give $20,<br />
                            <span className="text-yellow-300">Get $20</span>
                        </h1>

                        <p className="text-base @md:text-lg text-white/80 leading-relaxed max-w-lg mb-8 @md:mb-10">
                            Share the love! Invite friends to shop with us. They get $20 off their first order, and you earn $20 in store credit for every friend who makes a purchase.
                        </p>

                        <ReferralLink />

                        <ReferralStats items={[
                            { icon: Users, value: '50K+', label: 'Happy Referrers' },
                            { icon: Heart, value: '$2M+', label: 'Given Away' },
                        ]} />
                    </div>

                    {/* Visual */}
                    <div className="relative">
                        <ReferralVisual />
                    </div>
                </div>
            </div>
        </section>
    )
}

const ReferralPattern = () => {
    const positions = [
        { top: '5%', left: '8%', width: 24, rotate: 15 },
        { top: '12%', left: '72%', width: 32, rotate: 100 },
        { top: '22%', left: '18%', width: 28, rotate: 185 },
        { top: '32%', left: '62%', width: 36, rotate: 70 },
        { top: '42%', left: '5%', width: 30, rotate: 280 },
        { top: '52%', left: '85%', width: 24, rotate: 135 },
        { top: '62%', left: '28%', width: 38, rotate: 225 },
        { top: '72%', left: '52%', width: 26, rotate: 40 },
        { top: '82%', left: '12%', width: 34, rotate: 165 },
        { top: '8%', left: '48%', width: 22, rotate: 85 },
        { top: '38%', left: '38%', width: 32, rotate: 255 },
        { top: '68%', left: '78%', width: 28, rotate: 315 },
        { top: '88%', left: '42%', width: 36, rotate: 55 },
        { top: '28%', left: '88%', width: 24, rotate: 195 },
        { top: '58%', left: '48%', width: 34, rotate: 120 },
        { top: '15%', left: '35%', width: 28, rotate: 240 },
        { top: '48%', left: '92%', width: 30, rotate: 30 },
        { top: '78%', left: '68%', width: 26, rotate: 150 },
        { top: '92%', left: '22%', width: 32, rotate: 270 },
        { top: '35%', left: '75%', width: 24, rotate: 300 },
    ]
    return (
        <div className="absolute inset-0 opacity-10">
            {positions.map((pos, i) => (
                <Share2
                    key={i}
                    className="absolute text-white"
                    style={{
                        top: pos.top,
                        left: pos.left,
                        width: `${pos.width}px`,
                        transform: `rotate(${pos.rotate}deg)`,
                    }}
                />
            ))}
        </div>
    )
}

const ReferralLink = () => (
    <div className="mb-8 @md:mb-10">
        <div className="text-sm text-white/70 mb-2">Your unique referral link</div>
        <div className="flex gap-2">
            <Input
                readOnly
                value="shop.example.com/ref/FRIEND20"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="bg-white text-indigo-600 hover:bg-white/90 gap-2 shrink-0">
                <Copy className="size-4" /> Copy
            </Button>
        </div>
        <div className="flex gap-3 mt-4">
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                Share on Facebook
            </Button>
            <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                Share on Twitter
            </Button>
        </div>
    </div>
)

const ReferralStats = ({ items }: { items: { icon: React.ComponentType<{ className?: string }>; value: string; label: string }[] }) => (
    <div className="flex gap-8">
        {items.map(({ icon: Icon, value, label }) => (
            <div key={label} className="text-center">
                <Icon className="size-6 mx-auto mb-2 text-yellow-300" />
                <div className="text-2xl font-bold">{value}</div>
                <div className="text-sm text-white/70">{label}</div>
            </div>
        ))}
    </div>
)

const ReferralVisual = () => (
    <div className="relative">
        {/* Glowing orbs */}
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="size-64 rounded-full bg-white/10 blur-3xl" />
        </div>

        {/* Main visual */}
        <div className="relative aspect-square max-w-md mx-auto flex flex-col items-center justify-center">
            {/* You */}
            <div className="relative z-10">
                <Avatar className="size-20 border-4 border-white shadow-xl">
                    <AvatarImage src="https://i.pravatar.cc/200?img=1" />
                    <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-yellow-400 text-black text-xs font-bold rounded">
                    +$20
                </div>
            </div>

            {/* Connection lines */}
            <div className="w-px h-8 bg-white/30" />
            <Share2 className="size-6 text-yellow-300" />
            <div className="w-px h-8 bg-white/30" />

            {/* Friends */}
            <div className="flex gap-4">
                {[2, 3, 4].map((i) => (
                    <div key={i} className="relative">
                        <Avatar className="size-14 border-2 border-white/50 shadow-lg">
                            <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                            <AvatarFallback>F{i}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-green-400 text-black text-xs font-bold rounded whitespace-nowrap">
                            -$20
                        </div>
                    </div>
                ))}
            </div>

            {/* Reward card */}
            <div className="absolute bottom-0 right-0 p-4 bg-white rounded-2xl shadow-xl text-gray-900">
                <div className="text-sm font-medium">Your Earnings</div>
                <div className="text-2xl font-bold text-green-600">$60.00</div>
                <div className="text-xs text-gray-500">3 successful referrals</div>
            </div>
        </div>
    </div>
)
