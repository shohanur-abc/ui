import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, MapPin, Mail, Calendar, Github, Linkedin, Twitter, Dribbble } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'


export default function Main() {
    return (
        <section className="@container">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-12 @md:py-16 @xl:py-20 @3xl:py-24">
                <div className="grid @md:grid-cols-2 @2xl:grid-cols-4 gap-4 @md:gap-5 @xl:gap-6">
                    {/* Main Profile Card - Spans 2 columns on larger screens */}
                    <Card className="@md:col-span-2 @2xl:row-span-2 overflow-hidden group py-0">
                        <CardContent className="p-6 @md:p-8 @xl:p-10 h-full flex flex-col justify-between">
                            <div>
                                <ProfileImage src="https://i.pravatar.cc/400?img=12" fallback="EW" />
                                <Eyebrow icon={MapPin} text="New York, USA" />
                                <Title name="Emma Wilson" role="Product Designer" />
                                <Description text="Creating meaningful digital experiences through thoughtful design and user research." />
                            </div>
                            <CTA items={[
                                { label: 'View Work', href: '#work', icon: ArrowRight },
                                { label: 'Contact', href: '#contact', variant: 'outline' },
                            ]} />
                        </CardContent>
                    </Card>

                    {/* Status Card */}
                    <Card className="group hover:shadow-lg transition-all py-0">
                        <CardContent className="p-5 @md:p-6 h-full flex flex-col justify-center items-center text-center">
                            <div className="relative mb-3">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
                                </span>
                            </div>
                            <div className="text-lg @md:text-xl font-semibold">Available</div>
                            <div className="text-sm text-muted-foreground">For new projects</div>
                        </CardContent>
                    </Card>

                    {/* Experience Card */}
                    <Card className="group hover:shadow-lg transition-all py-0">
                        <CardContent className="p-5 @md:p-6 h-full flex flex-col justify-center items-center text-center">
                            <div className="text-4xl @md:text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent mb-2">
                                8+
                            </div>
                            <div className="text-sm text-muted-foreground">Years Experience</div>
                        </CardContent>
                    </Card>

                    {/* Contact Card */}
                    <Card className="group hover:shadow-lg transition-all py-0">
                        <CardContent className="p-5 @md:p-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Mail className="size-5 text-primary" />
                                <span className="font-medium">Get in Touch</span>
                            </div>
                            <a href="mailto:emma@example.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                emma@example.com
                            </a>
                        </CardContent>
                    </Card>

                    {/* Social Links Card */}
                    <Card className="group hover:shadow-lg transition-all py-0">
                        <CardContent className="p-5 @md:p-6">
                            <div className="text-sm font-medium mb-4">Connect</div>
                            <SocialLinks items={[
                                { icon: Github, href: '#', label: 'GitHub' },
                                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                                { icon: Twitter, href: '#', label: 'Twitter' },
                                { icon: Dribbble, href: '#', label: 'Dribbble' },
                            ]} />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    )
}

const ProfileImage = ({ src, fallback }: { src?: string; fallback: string }) => (
    <Avatar className="size-20 @md:size-24 @xl:size-28 mb-6 ring-4 ring-background shadow-lg">
        <AvatarImage src={src} />
        <AvatarFallback className="text-2xl @md:text-3xl bg-primary text-primary-foreground">{fallback}</AvatarFallback>
    </Avatar>
)

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
        <Icon className="size-4" />
        {text}
    </div>
)

const Title = ({ name, role }: { name: string; role: string }) => (
    <div className="mb-4">
        <h1 className="text-2xl @sm:text-3xl @md:text-4xl font-bold tracking-tight">{name}</h1>
        <p className="text-lg @md:text-xl text-primary font-medium mt-1">{role}</p>
    </div>
)

const Description = ({ text }: { text: string }) => (
    <p className="text-base text-muted-foreground leading-relaxed mb-6 @md:mb-8">
        {text}
    </p>
)

const CTA = ({ items }: { items: { label: string; href: string; variant?: React.ComponentProps<typeof Button>['variant']; icon?: ComponentType<{ className?: string }> }[] }) => (
    <div className="flex flex-wrap gap-3">
        {items.map(({ label, href, variant, icon: Icon }, i) => (
            <Button key={i} size="lg" variant={variant || 'default'} className="gap-2" asChild>
                <Link href={href}>
                    {label}
                    {Icon && <Icon className="size-4" />}
                </Link>
            </Button>
        ))}
    </div>
)

const SocialLinks = ({ items }: { items: { icon: ComponentType<{ className?: string }>; href: string; label: string }[] }) => (
    <div className="flex gap-2">
        {items.map(({ icon: Icon, href, label }) => (
            <Button key={label} variant="ghost" size="icon" className="rounded-full hover:bg-primary/10" asChild>
                <Link href={href} aria-label={label}>
                    <Icon className="size-4" />
                </Link>
            </Button>
        ))}
    </div>
)
