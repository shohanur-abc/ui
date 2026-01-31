import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FileCode, ExternalLink, Star, GitFork, Download } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container bg-muted/30">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="grid @xl:grid-cols-2 gap-12 @xl:gap-16 items-start">
                    <div className="@xl:sticky @xl:top-8">
                        <Eyebrow icon={FileCode} text="Featured Project" />
                        <Title text="Design System" />
                        <Description text="A comprehensive component library built with React, TypeScript, and Tailwind CSS. Used by over 200 engineers at TechCorp." />

                        <div className="flex flex-wrap gap-2 mt-6">
                            <Badge>React</Badge>
                            <Badge>TypeScript</Badge>
                            <Badge>Tailwind CSS</Badge>
                            <Badge>Radix UI</Badge>
                        </div>

                        <div className="flex flex-wrap gap-3 mt-8">
                            <Button asChild>
                                <Link href="https://github.com/username/design-system" target="_blank">
                                    <ExternalLink className="size-4 mr-2" />
                                    View on GitHub
                                </Link>
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="https://design-system.example.com" target="_blank">
                                    View Docs
                                </Link>
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <Card>
                            <CardContent className="p-6">
                                <div className="grid grid-cols-3 gap-4 text-center mb-6">
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                                            <Star className="size-4 fill-current" />
                                            <span className="text-2xl font-bold text-foreground">2.4k</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Stars</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <GitFork className="size-4 text-muted-foreground" />
                                            <span className="text-2xl font-bold">180</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Forks</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 mb-1">
                                            <Download className="size-4 text-muted-foreground" />
                                            <span className="text-2xl font-bold">50k</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground">Downloads</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    <FeatureItem text="200+ accessible components" />
                                    <FeatureItem text="Full TypeScript support" />
                                    <FeatureItem text="Dark mode built-in" />
                                    <FeatureItem text="Customizable theming" />
                                    <FeatureItem text="Comprehensive documentation" />
                                </ul>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-bold mb-4">Impact</h3>
                                <p className="text-sm text-muted-foreground">
                                    Reduced development time by 50% for new features. Now the standard for all frontend development at TechCorp, used by 200+ engineers across 15 product teams.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
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

const FeatureItem = ({ text }: { text: string }) => (
    <li className="flex items-center gap-2 text-sm">
        <span className="size-1.5 rounded-full bg-primary shrink-0" />
        {text}
    </li>
)
