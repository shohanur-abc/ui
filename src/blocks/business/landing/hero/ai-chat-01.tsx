import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Bot, Send, User } from 'lucide-react'
import Link from 'next/link'
import { ComponentType } from 'react'

export default function Main() {
    return (
        <section className="@container min-h-screen flex items-center" data-theme="business-emerald">
            <div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
                <div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
                    <div>
                        <Eyebrow icon={Bot} text="AI Assistant" />
                        <Title text="Your Intelligent Business Partner" />
                        <Description text="Get instant answers, automate tasks, and unlock insights with our AI-powered assistant. Like having an expert on your team, 24/7." />
                        <AIFeatures items={[
                            'Answer questions about your data',
                            'Generate reports in seconds',
                            'Automate repetitive tasks',
                            'Provide smart recommendations',
                        ]} />
                        <CTA items={[
                            { label: 'Try AI Assistant', href: '#ai', icon: ArrowRight },
                            { label: 'See Examples', href: '#examples', variant: 'outline' },
                        ]} />
                    </div>
                    <ChatPreview />
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

const AIFeatures = ({ items }: { items: string[] }) => (
    <ul className="space-y-2 mb-8">
        {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2 text-sm @md:text-base">
                <span className="size-1.5 rounded-full bg-primary" />
                {item}
            </li>
        ))}
    </ul>
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

const ChatPreview = () => (
    <div className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden">
        {/* Chat header */}
        <div className="px-4 py-3 bg-muted/50 border-b border-border flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="size-4 text-primary" />
            </div>
            <div>
                <p className="font-medium text-sm">AI Assistant</p>
                <p className="text-xs text-muted-foreground">Always online</p>
            </div>
        </div>
        {/* Chat messages */}
        <div className="p-4 space-y-4 min-h-64">
            <ChatMessage 
                type="user" 
                message="Show me last month's revenue breakdown by region" 
            />
            <ChatMessage 
                type="ai" 
                message="Here's your revenue breakdown for January 2024:" 
            />
            <div className="ml-10 p-3 rounded-lg bg-muted/50 border border-border/50 text-sm">
                <div className="space-y-1">
                    <div className="flex justify-between">
                        <span>North America</span>
                        <span className="font-medium">$1.2M (45%)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Europe</span>
                        <span className="font-medium">$850K (32%)</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Asia Pacific</span>
                        <span className="font-medium">$620K (23%)</span>
                    </div>
                </div>
            </div>
            <ChatMessage 
                type="ai" 
                message="Would you like me to generate a detailed report or compare with previous months?" 
            />
        </div>
        {/* Input */}
        <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                <input 
                    type="text" 
                    placeholder="Ask anything..." 
                    className="flex-1 bg-transparent text-sm outline-none"
                />
                <Button size="icon" variant="ghost" className="size-8">
                    <Send className="size-4" />
                </Button>
            </div>
        </div>
    </div>
)

const ChatMessage = ({ type, message }: { type: 'user' | 'ai'; message: string }) => (
    <div className={`flex gap-2 ${type === 'user' ? 'justify-end' : ''}`}>
        {type === 'ai' && (
            <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Bot className="size-4 text-primary" />
            </div>
        )}
        <div className={`max-w-[80%] px-3 py-2 rounded-lg text-sm ${
            type === 'user' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
        }`}>
            {message}
        </div>
        {type === 'user' && (
            <div className="size-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                <User className="size-4" />
            </div>
        )}
    </div>
)
