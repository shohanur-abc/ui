import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mic, Radio, Wifi } from 'lucide-react';
import Link from 'next/link';

export default function Main() {
	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="relative mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="max-w-4xl mx-auto text-center">
					<LiveBadge icon={Wifi} text="Live Now" />
					<Title text="Watch & Learn" highlight="In Real-Time" />
					<Description text="Live streams, podcasts, and interactive sessions with industry experts. Ask questions, get answers, and learn alongside a global community." />
					<UpcomingEvent
						title="Building Scalable APIs with GraphQL"
						host={{
							name: 'Maria Santos',
							avatar: 'https://i.pravatar.cc/100?img=5',
							initials: 'MS',
							role: 'Staff Engineer at Stripe',
						}}
						viewers={847}
						startsIn="Starting in 15 min"
					/>
					<CTA
						items={[
							{ label: 'Join Live Stream', href: '/live', icon: Radio },
							{ label: 'View Schedule', href: '/schedule', variant: 'outline' },
						]}
					/>
				</div>
			</div>
			<LiveDecorative />
		</section>
	);
}

const LiveBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="mb-4 @md:mb-6">
		<Badge className="gap-2 px-4 py-1.5 bg-red-500/90 text-white border-0 animate-pulse">
			<Icon className="size-4" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h1 className="text-4xl @sm:text-5xl @md:text-6xl @xl:text-7xl font-bold tracking-tight mb-4 @md:mb-6">
		{text} <span className="text-primary">{highlight}</span>
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8 @md:mb-10">
		{text}
	</p>
);

interface Host {
	name: string;
	avatar: string;
	initials: string;
	role: string;
}

interface UpcomingEventProps {
	title: string;
	host: Host;
	viewers: number;
	startsIn: string;
}

const UpcomingEvent = ({
	title,
	host,
	viewers,
	startsIn,
}: UpcomingEventProps) => (
	<div className="inline-flex flex-col @sm:flex-row items-center gap-4 @sm:gap-6 p-5 @md:p-6 rounded-2xl bg-card border mb-8 @md:mb-10">
		<div className="relative">
			<Avatar className="size-16 @md:size-20 ring-4 ring-primary/20">
				<AvatarImage src={host.avatar} alt={host.name} />
				<AvatarFallback className="text-lg bg-primary text-primary-foreground">
					{host.initials}
				</AvatarFallback>
			</Avatar>
			<div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-red-500 flex items-center justify-center ring-2 ring-background">
				<Mic className="size-3 text-white" />
			</div>
		</div>
		<div className="text-center @sm:text-left">
			<h3 className="text-lg @md:text-xl font-semibold mb-1">{title}</h3>
			<p className="text-sm text-muted-foreground mb-2">
				with {host.name} · {host.role}
			</p>
			<div className="flex items-center justify-center @sm:justify-start gap-4 text-sm">
				<span className="flex items-center gap-1.5 text-muted-foreground">
					<span className="relative flex size-2">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
						<span className="relative inline-flex size-2 rounded-full bg-primary" />
					</span>
					{viewers} watching
				</span>
				<Badge variant="secondary">{startsIn}</Badge>
			</div>
		</div>
	</div>
);

interface CTAItem {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	variant?: 'default' | 'outline' | 'secondary' | 'ghost';
}

const CTA = ({ items }: { items: CTAItem[] }) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, icon: Icon, variant = 'default' }) => (
			<Button key={label} size="lg" variant={variant} asChild className="gap-2">
				<Link href={href}>
					{Icon && <Icon className="size-4" />}
					{label}
				</Link>
			</Button>
		))}
	</div>
);

const LiveDecorative = () => (
	<>
		<div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[800px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
		<div className="pointer-events-none absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-500/50 to-transparent" />
	</>
);
