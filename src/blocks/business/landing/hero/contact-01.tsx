import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ArrowRight, Phone, MessageCircle, Mail, Clock, Headphones } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Headphones} text="Get in Touch" />
                        <Title text="We&apos;re Here to Help" />
                        <Description text="Have questions? Our team of experts is ready to help you find the right solution. Reach out through any channel." />
                        <ContactOptions items={[
                            { icon: Phone, label: 'Call Us', value: '+1 (555) 123-4567', action: 'tel:+15551234567' },
                            { icon: Mail, label: 'Email Us', value: 'support@company.com', action: 'mailto:support@company.com' },
                            { icon: MessageCircle, label: 'Live Chat', value: 'Available 24/7', action: '#chat' },
                        ]} />
                        <SupportHours />
                    </div>
                    <ContactForm />
                </div>
            </div>
        </section>
    )
}

const Eyebrow = ({ icon: Icon, text }: { icon: ComponentType<{ className?: string }>; text: string }) => (
    <Badge className="mb-4 @md:mb-6 gap-2">
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

const ContactOptions = ({ items }: { items: { icon: ComponentType<{ className?: string }>; label: string; value: string; action: string }[] }) => (
    <div className="space-y-4 mb-8">
        {items.map(({ icon: Icon, label, value, action }, i) => (
            <Link key={i} href={action} className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50 hover:border-primary/30 transition-all group">
                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="size-5 text-primary" />
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">{label}</p>
                    <p className="font-semibold">{value}</p>
                </div>
                <ArrowRight className="size-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
            </Link>
        ))}
    </div>
)

const SupportHours = () => (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Clock className="size-4" />
        <span>Support available Mon-Fri, 9am-6pm PST</span>
    </div>
)

const ContactForm = () => (
    <Card>
        <CardContent className="pt-6">
            <h3 className="text-xl font-semibold mb-4">Send us a message</h3>
            <form className="space-y-4">
                <div className="grid @sm:grid-cols-2 gap-4">
                    <Input placeholder="First Name" />
                    <Input placeholder="Last Name" />
                </div>
                <Input type="email" placeholder="Email Address" />
                <Input placeholder="Company Name" />
                <textarea 
                    className="w-full min-h-32 rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring" 
                    placeholder="How can we help you?"
                />
                <Button className="w-full gap-2" size="lg">
                    Send Message
                    <ArrowRight className="size-4" />
                </Button>
            </form>
        </CardContent>
    </Card>
)
