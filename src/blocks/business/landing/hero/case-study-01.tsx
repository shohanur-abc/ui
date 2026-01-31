import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowRight, Building2, Quote, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-slate">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Building2} text="Case Study" />
                        <Title text="How TechCorp Increased Revenue by 340%" />
                        <Description text="Learn how TechCorp transformed their business operations and achieved record-breaking growth using our platform." />
                        <ResultsHighlight items={[
                            { value: '340%', label: 'Revenue Increase' },
                            { value: '50%', label: 'Cost Reduction' },
                            { value: '3x', label: 'Faster Deployment' },
                        ]} />
                        <CTA items={[
                            { label: 'Read Full Case Study', href: '#case-study', icon: ArrowRight },
                            { label: 'More Success Stories', href: '#stories', variant: 'outline' },
                        ]} />
                    </div>
                    <CaseStudyCard 
                        quote="This platform completely transformed how we operate. The ROI was visible within the first month."
                        author={{
                            name: 'Sarah Johnson',
                            role: 'CEO, TechCorp',
                            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
                        }}
                        companyLogo="https://via.placeholder.com/150x50/f1f5f9/64748b?text=TechCorp"
                        rating={5}
                    />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge variant="outline" className="mb-4 @md:mb-6 gap-2">
        <Icon className="size-3.5" />
        <span>{text}</span>
    </Badge>
)

const Title = ({ text }: { text: string }) => (
    <h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
        {text}
    </h1>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
        {text}
    </p>
)

const ResultsHighlight = ({ items }: { items: { value: string; label: string }[] }) => (
    <div className="grid grid-cols-3 gap-4 mb-8 p-4 rounded-lg bg-muted/50 border border-border/50">
        {items.map(({ value, label }, i) => (
            <div key={i} className="text-center">
                <div className="text-2xl @md:text-3xl font-bold text-primary">{value}</div>
                <div className="text-xs @md:text-sm text-muted-foreground">{label}</div>
            </div>
        ))}
    </div>
)

const CTA = ({ items }: { items: { label: string; href: string; icon?: ComponentType<{ className?: string }>; variant?: 'default' | 'outline' }[] }) => (
    <div className="flex flex-wrap gap-3 @md:gap-4">
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

const CaseStudyCard = ({ quote, author, companyLogo, rating }: { 
    quote: string; 
    author: { name: string; role: string; avatar: string }; 
    companyLogo: string; 
    rating: number 
}) => (
    <div className="bg-card border border-border rounded-2xl p-6 @md:p-8 relative">
        <Quote className="size-10 text-primary/20 absolute top-6 right-6" />
        <div className="mb-6">
            <Image 
                src={companyLogo} 
                alt="Company Logo" 
                width={150} 
                height={50} 
                className="h-8 w-auto object-contain opacity-70"
            />
        </div>
        <div className="flex mb-4">
            {Array.from({ length: rating }).map((_, i) => (
                <Star key={i} className="size-5 text-primary fill-primary" />
            ))}
        </div>
        <blockquote className="text-xl @md:text-2xl font-medium mb-6 leading-relaxed">
            &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="flex items-center gap-3">
            <Avatar className="size-12">
                <AvatarImage src={author.avatar} alt={author.name} />
                <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
                <div className="font-semibold">{author.name}</div>
                <div className="text-sm text-muted-foreground">{author.role}</div>
            </div>
        </div>
    </div>
)
