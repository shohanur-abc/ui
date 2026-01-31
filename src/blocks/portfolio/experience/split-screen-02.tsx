import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Briefcase, Calendar, MapPin, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Briefcase} text="Current Role" />
                        <Title text="Principal Engineer at TechCorp" />
                        <Description text="Leading technical direction for platform engineering across multiple product teams. Focused on developer experience and system architecture." />

                        <div className="flex flex-wrap gap-4 mt-6 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1"><Calendar className="size-4" />Jan 2023 - Present</span>
                            <span className="flex items-center gap-1"><MapPin className="size-4" />San Francisco, CA</span>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge>Leadership</Badge>
                            <Badge>Architecture</Badge>
                            <Badge>Platform</Badge>
                            <Badge>TypeScript</Badge>
                        </div>

                        <Link href="/experience/techcorp" className="inline-flex items-center gap-1.5 mt-8 text-sm text-primary hover:underline">
                            Learn more about this role <ArrowRight className="size-4" />
                        </Link>
                    </div>

                    <Card className="overflow-hidden">
                        <CardContent className="p-0">
                            <div className="bg-gradient-to-br from-primary/10 to-primary/5 p-8 @md:p-12">
                                <div className="flex items-center gap-4 mb-6">
                                    <Avatar className="size-16 border-4 border-background">
                                        <AvatarImage src="https://github.com/google.png" alt="TechCorp" />
                                        <AvatarFallback>TC</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="text-xl font-bold">TechCorp</h3>
                                        <p className="text-sm text-muted-foreground">Enterprise Software</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <HighlightItem label="Team Size" value="5 product teams" />
                                    <HighlightItem label="Impact" value="200+ engineers using tools" />
                                    <HighlightItem label="Focus" value="Developer Experience" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon?: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-3 @md:mb-4">
        {Icon && <Icon className="size-3.5" />}
        {text}
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h2 className="text-3xl @sm:text-4xl @md:text-5xl font-bold tracking-tight mb-4">{text}</h2>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg text-muted-foreground">{text}</p>
)

const HighlightItem = ({ label, value }: { label: string; value: string }) => (
    <div className="flex items-center justify-between py-3 border-b last:border-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="text-sm font-medium">{value}</span>
    </div>
)
