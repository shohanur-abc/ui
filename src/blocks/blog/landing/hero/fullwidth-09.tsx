import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Headphones, Pause, Play, SkipForward } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden min-h-[85vh]" data-theme="amber">
            <BackgroundImage src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=1920" />
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 @sm:px-6 @2xl:px-8 py-20">
                <Content
                    eyebrow="Latest Episode"
                    episodeNumber={142}
                    title="The Future of JavaScript: What's Coming in ES2026"
                    guest={{ name: 'Jordan Harband', role: 'TC39 Delegate', avatar: 'https://i.pravatar.cc/200?img=67' }}
                    duration="1h 23m"
                />
            </div>
        </section>
    )
}

interface BackgroundImageProps {
    src: string
}

const BackgroundImage = ({ src }: BackgroundImageProps) => (
    <>
        <Image src={src} alt="Background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/80" />
    </>
)

interface Guest {
    name: string
    role: string
    avatar: string
}

interface ContentProps {
    eyebrow: string
    episodeNumber: number
    title: string
    guest: Guest
    duration: string
}

const Content = ({ eyebrow, episodeNumber, title, guest, duration }: ContentProps) => (
    <div className="max-w-3xl mx-auto text-center">
        <Headphones className="size-12 text-primary mx-auto mb-6" />
        <div className="flex items-center justify-center gap-2 mb-4">
            <Badge className="bg-primary/20 text-primary border-primary/30">
                {eyebrow}
            </Badge>
            <Badge variant="outline" className="border-white/20 text-white/70">
                EP {episodeNumber}
            </Badge>
        </div>
        <h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold text-white mb-8">
            {title}
        </h1>
        <div className="flex items-center justify-center gap-4 mb-10">
            <Avatar className="size-14 ring-2 ring-primary/30">
                <AvatarImage src={guest.avatar} alt={guest.name} />
                <AvatarFallback>{guest.name[0]}</AvatarFallback>
            </Avatar>
            <div className="text-left">
                <p className="font-semibold text-white">{guest.name}</p>
                <p className="text-sm text-white/60">{guest.role}</p>
            </div>
        </div>
        <div className="flex items-center justify-center gap-6 mb-8">
            <Button size="icon" variant="ghost" className="size-12 rounded-full text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="size-5 rotate-180" />
            </Button>
            <Button size="icon" className="size-16 rounded-full">
                <Play className="size-7 ml-1" />
            </Button>
            <Button size="icon" variant="ghost" className="size-12 rounded-full text-white/70 hover:text-white hover:bg-white/10">
                <SkipForward className="size-5" />
            </Button>
        </div>
        <p className="text-white/50 text-sm">{duration}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
            {['Apple Podcasts', 'Spotify', 'YouTube'].map((platform) => (
                <Link
                    key={platform}
                    href="#"
                    className="px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm hover:bg-white/20 transition-colors"
                >
                    {platform}
                </Link>
            ))}
        </div>
    </div>
)
