import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, Star, Trophy } from 'lucide-react'
import Link from 'next/link'

export default function Main() {
    return (
        <section className="@container relative overflow-hidden" data-theme="amber">
            <div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20">
                <Header
                    title="Top Contributors"
                    cta={{ label: 'View All Authors', href: '/authors' }}
                />
                <AuthorGrid
                    authors={[
                        { name: 'Sarah Chen', avatar: 'https://i.pravatar.cc/200?img=40', role: 'React Expert', articles: 127, followers: '12.5K' },
                        { name: 'Alex Kim', avatar: 'https://i.pravatar.cc/200?img=50', role: 'Full Stack Dev', articles: 89, followers: '8.2K' },
                        { name: 'Maria Johnson', avatar: 'https://i.pravatar.cc/200?img=60', role: 'UI Designer', articles: 64, followers: '6.8K' },
                        { name: 'John Smith', avatar: 'https://i.pravatar.cc/200?img=33', role: 'DevOps Engineer', articles: 52, followers: '5.1K' },
                    ]}
                />
            </div>
        </section>
    )
}

interface HeaderProps {
    title: string
    cta: { label: string; href: string }
}

const Header = ({ title, cta }: HeaderProps) => (
    <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <Trophy className="size-6 text-amber-500" />
            <h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
        </div>
        <Button variant="ghost" asChild className="gap-1">
            <Link href={cta.href}>
                {cta.label}
                <ArrowRight className="size-4" />
            </Link>
        </Button>
    </div>
)

interface Author {
    name: string
    avatar: string
    role: string
    articles: number
    followers: string
}

interface AuthorGridProps {
    authors: Author[]
}

const AuthorGrid = ({ authors }: AuthorGridProps) => (
    <div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-6">
        {authors.map((author, i) => (
            <Card key={author.name} className="group cursor-pointer transition-all hover:border-primary hover:shadow-lg">
                <CardContent className="p-6 text-center">
                    <div className="relative inline-block mb-4">
                        <Avatar className="size-20 ring-4 ring-primary/10">
                            <AvatarImage src={author.avatar} alt={author.name} />
                            <AvatarFallback className="text-xl">{author.name[0]}</AvatarFallback>
                        </Avatar>
                        {i < 3 && (
                            <Badge className="absolute -top-1 -right-1 size-6 p-0 flex items-center justify-center rounded-full bg-amber-500 text-white border-2 border-background">
                                {i + 1}
                            </Badge>
                        )}
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{author.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{author.role}</p>
                    <div className="flex justify-center gap-6 text-sm">
                        <div>
                            <p className="font-bold">{author.articles}</p>
                            <p className="text-muted-foreground text-xs">Articles</p>
                        </div>
                        <div>
                            <p className="font-bold">{author.followers}</p>
                            <p className="text-muted-foreground text-xs">Followers</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        ))}
    </div>
)
