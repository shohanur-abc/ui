import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Terminal, Cpu, Database, Cloud, Zap } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section className="@container relative min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background to-muted/30">
			<TerminalGrid />

			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @2xl:grid-cols-2 gap-10 @lg:gap-12 @3xl:gap-16 items-center">
					{/* Left Content */}
					<div>
						<Eyebrow icon={Terminal} text="Backend Engineer" />
						<Title greeting="Hey, I'm" name="Chris Taylor" />
						<TypewriterText text="Building robust systems at scale" />
						<Description text="Senior Backend Engineer specializing in distributed systems, microservices architecture, and high-performance APIs. Currently leading infrastructure at a Series B startup." />

						<TechStack
							items={[
								{ icon: Cpu, label: 'Go' },
								{ icon: Database, label: 'PostgreSQL' },
								{ icon: Cloud, label: 'AWS' },
								{ icon: Zap, label: 'gRPC' },
							]}
						/>

						<CTA
							items={[
								{ label: 'View Projects', href: '#projects', icon: ArrowRight },
								{ label: 'Read Blog', href: '#blog', variant: 'outline' },
							]}
						/>
					</div>

					{/* Right: Terminal Preview */}
					<div className="hidden @2xl:block">
						<TerminalPreview />
					</div>
				</div>
			</div>
		</section>
	);
}

const TerminalGrid = () => (
	<div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,black_40%,transparent)]" />
);

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge
		variant="outline"
		className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 @md:mb-8 font-mono text-xs"
	>
		<Icon className="size-3.5" />
		{text}
	</Badge>
);

const Title = ({ greeting, name }: { greeting: string; name: string }) => (
	<div className="mb-3 @md:mb-4">
		<p className="text-lg @md:text-xl text-muted-foreground font-mono">
			{greeting}
		</p>
		<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight">
			{name}
		</h1>
	</div>
);

const TypewriterText = ({ text }: { text: string }) => (
	<div className="flex items-center gap-2 mb-6 @md:mb-8 font-mono">
		<span className="text-primary">&gt;</span>
		<span className="text-lg @md:text-xl text-muted-foreground">{text}</span>
		<span className="w-2 h-5 bg-primary animate-pulse" />
	</div>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6 @md:mb-8">
		{text}
	</p>
);

const TechStack = ({
	items,
}: {
	items: { icon: ComponentType<{ className?: string }>; label: string }[];
}) => (
	<div className="flex flex-wrap gap-3 mb-8 @md:mb-10">
		{items.map(({ icon: Icon, label }) => (
			<div
				key={label}
				className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/50 border font-mono text-sm"
			>
				<Icon className="size-4 text-primary" />
				{label}
			</div>
		))}
	</div>
);

const CTA = ({
	items,
}: {
	items: {
		label: string;
		href: string;
		variant?: React.ComponentProps<typeof Button>['variant'];
		icon?: ComponentType<{ className?: string }>;
	}[];
}) => (
	<div className="flex flex-wrap gap-3 @md:gap-4">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

const TerminalPreview = () => (
	<div className="relative">
		<div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/5 rounded-3xl blur-xl" />
		<div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden">
			{/* Terminal Header */}
			<div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b">
				<div className="flex gap-1.5">
					<div className="size-3 rounded-full bg-red-500" />
					<div className="size-3 rounded-full bg-yellow-500" />
					<div className="size-3 rounded-full bg-green-500" />
				</div>
				<span className="text-xs text-muted-foreground font-mono ml-2">
					~/.profile
				</span>
			</div>
			{/* Terminal Content */}
			<div className="p-5 font-mono text-sm space-y-3">
				<div className="flex items-center gap-2">
					<span className="text-green-500">➜</span>
					<span className="text-primary">~</span>
					<span className="text-muted-foreground">whoami</span>
				</div>
				<div className="text-foreground">chris-taylor</div>
				<div className="flex items-center gap-2">
					<span className="text-green-500">➜</span>
					<span className="text-primary">~</span>
					<span className="text-muted-foreground">cat skills.txt</span>
				</div>
				<div className="text-foreground space-y-1">
					<div>• Go, Rust, Python</div>
					<div>• Kubernetes, Docker</div>
					<div>• PostgreSQL, Redis</div>
					<div>• AWS, GCP</div>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-green-500">➜</span>
					<span className="text-primary">~</span>
					<span className="w-2 h-4 bg-foreground animate-pulse" />
				</div>
			</div>
		</div>
	</div>
);
