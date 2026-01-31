'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowRight, Layers, Palette, Code, Zap } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen" data-theme="emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
                <div className="text-center mb-10 @md:mb-14">
                    <Eyebrow icon={Layers} text="Product Tour" />
                    <Title text="Explore Every Feature" />
                    <Description text="Take a deep dive into our platform capabilities. See how each feature works together to power your business." />
                </div>
                <ProductTabs />
                <div className="text-center mt-10 @md:mt-14">
                    <CTA items={[
                        { label: 'Start Free Trial', href: '#trial', icon: ArrowRight },
                        { label: 'Schedule Demo', href: '#demo', variant: 'outline' },
                    ]} />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2 mx-auto">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 max-w-3xl mx-auto">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
        {text}
    </p>
)

const ProductTabs = () => (
    <Tabs defaultValue="design" className="w-full">
        <TabsList className="grid w-full max-w-2xl mx-auto @sm:grid-cols-4 mb-8">
            <TabsTrigger value="design" className="gap-2">
                <Palette className="size-4" />
                <span className="hidden @sm:inline">Design</span>
            </TabsTrigger>
            <TabsTrigger value="develop" className="gap-2">
                <Code className="size-4" />
                <span className="hidden @sm:inline">Develop</span>
            </TabsTrigger>
            <TabsTrigger value="deploy" className="gap-2">
                <Zap className="size-4" />
                <span className="hidden @sm:inline">Deploy</span>
            </TabsTrigger>
            <TabsTrigger value="scale" className="gap-2">
                <Layers className="size-4" />
                <span className="hidden @sm:inline">Scale</span>
            </TabsTrigger>
        </TabsList>
        <TabsContent value="design">
            <TabCard 
                title="Design with Confidence"
                description="Create stunning interfaces with our visual editor. Drag, drop, and customize without writing a single line of code."
                features={['Visual Editor', 'Design Tokens', 'Component Library', 'Brand Kit']}
                image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop"
            />
        </TabsContent>
        <TabsContent value="develop">
            <TabCard 
                title="Build with Speed"
                description="Write clean, maintainable code with our developer tools. Integrated IDE, version control, and collaboration features."
                features={['Code Editor', 'Git Integration', 'API Builder', 'Testing Suite']}
                image="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=500&fit=crop"
            />
        </TabsContent>
        <TabsContent value="deploy">
            <TabCard 
                title="Ship with Confidence"
                description="Deploy to production in seconds. Our infrastructure handles scaling, security, and reliability automatically."
                features={['One-Click Deploy', 'CI/CD Pipeline', 'Preview URLs', 'Rollbacks']}
                image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=500&fit=crop"
            />
        </TabsContent>
        <TabsContent value="scale">
            <TabCard 
                title="Grow Without Limits"
                description="From startup to enterprise, our platform scales with you. Auto-scaling, global CDN, and enterprise features included."
                features={['Auto Scaling', 'Global CDN', 'Multi-Region', 'Enterprise SSO']}
                image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"
            />
        </TabsContent>
    </Tabs>
)

const TabCard = ({ title, description, features, image }: { title: string; description: string; features: string[]; image: string }) => (
    <Card className="overflow-hidden">
        <CardContent className="p-0">
            <div className="grid @xl:grid-cols-2">
                <div className="relative aspect-video @xl:aspect-auto">
                    <Image src={image} alt={title} fill className="object-cover" />
                </div>
                <div className="p-6 @md:p-8 flex flex-col justify-center">
                    <h3 className="text-2xl @md:text-3xl font-bold mb-3">{title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>
                    <div className="grid grid-cols-2 gap-3">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2 text-sm">
                                <span className="size-1.5 rounded-full bg-primary" />
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap justify-center gap-4">
        {items.map(({ label, href, icon: Icon, variant = 'default' }, i) => (
            <Button key={i} size="lg" variant={variant} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)
