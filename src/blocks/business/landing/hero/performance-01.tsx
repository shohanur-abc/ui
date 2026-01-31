import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Gauge, Zap, TrendingUp, Activity } from 'lucide-react';
import Link from 'next/link';
import { ComponentType } from 'react';

export default function Main() {
	return (
		<section
			className="@container min-h-screen flex items-center"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32 w-full">
				<div className="grid @3xl:grid-cols-2 gap-8 @xl:gap-16 items-center">
					<div>
						<Eyebrow icon={Gauge} text="Performance" />
						<Title text="Blazing Fast by Design" />
						<Description text="Every millisecond matters. Our platform is engineered for speed, with optimizations at every layer of the stack." />
						<PerformanceMetrics
							items={[
								{
									icon: Zap,
									label: 'API Latency',
									value: '<50ms',
									description: 'Average response time',
								},
								{
									icon: TrendingUp,
									label: 'Throughput',
									value: '100K+',
									description: 'Requests per second',
								},
								{
									icon: Activity,
									label: 'Uptime',
									value: '99.99%',
									description: 'Over the past year',
								},
							]}
						/>
						<CTA
							items={[
								{ label: 'Run Speed Test', href: '#test', icon: ArrowRight },
								{
									label: 'View Benchmarks',
									href: '#benchmarks',
									variant: 'outline',
								},
							]}
						/>
					</div>
					<SpeedVisualization />
				</div>
			</div>
		</section>
	);
}

const Eyebrow = ({
	icon: Icon,
	text,
}: {
	icon: ComponentType<{ className?: string }>;
	text: string;
}) => (
	<Badge variant="secondary" className="mb-4 @md:mb-6 gap-2">
		<Icon className="size-3.5" />
		<span>{text}</span>
	</Badge>
);

const Title = ({ text }: { text: string }) => (
	<h1 className="text-3xl @sm:text-4xl @md:text-5xl @xl:text-6xl font-bold tracking-tight mb-4 @md:mb-6 leading-tight">
		{text}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg @xl:text-xl text-muted-foreground mb-6 @md:mb-8 leading-relaxed">
		{text}
	</p>
);

const PerformanceMetrics = ({
	items,
}: {
	items: {
		icon: ComponentType<{ className?: string }>;
		label: string;
		value: string;
		description: string;
	}[];
}) => (
	<div className="space-y-4 mb-8">
		{items.map(({ icon: Icon, label, value, description }, i) => (
			<div
				key={i}
				className="flex items-center gap-4 p-4 rounded-lg bg-muted/50 border border-border/50"
			>
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-5 text-primary" />
				</div>
				<div className="flex-1">
					<p className="text-sm text-muted-foreground">{label}</p>
					<p className="font-semibold">{description}</p>
				</div>
				<div className="text-2xl font-bold text-primary">{value}</div>
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
		icon?: ComponentType<{ className?: string }>;
		variant?: 'default' | 'outline';
	}[];
}) => (
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
);

const SpeedVisualization = () => (
	<div className="relative aspect-square rounded-2xl bg-card/50 border border-border overflow-hidden">
		{/* Animated speed visualization */}
		<div className="absolute inset-0 flex items-center justify-center">
			<div className="relative size-64">
				{/* Outer ring */}
				<div className="absolute inset-0 rounded-full border-4 border-border" />
				{/* Progress ring */}
				<svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100">
					<circle
						cx="50"
						cy="50"
						r="45"
						fill="none"
						stroke="currentColor"
						strokeWidth="4"
						strokeDasharray="283"
						strokeDashoffset="28"
						className="text-primary"
					/>
				</svg>
				{/* Center content */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<span className="text-5xl font-bold text-primary">98</span>
					<span className="text-sm text-muted-foreground">
						Performance Score
					</span>
				</div>
			</div>
		</div>
		{/* Speed lines */}
		<div className="absolute top-4 right-4 space-y-2">
			<div className="flex items-center gap-2 text-xs">
				<span className="size-2 rounded-full bg-green-500" />
				<span className="text-muted-foreground">
					First Contentful Paint: 0.8s
				</span>
			</div>
			<div className="flex items-center gap-2 text-xs">
				<span className="size-2 rounded-full bg-green-500" />
				<span className="text-muted-foreground">Time to Interactive: 1.2s</span>
			</div>
			<div className="flex items-center gap-2 text-xs">
				<span className="size-2 rounded-full bg-green-500" />
				<span className="text-muted-foreground">
					Cumulative Layout Shift: 0.01
				</span>
			</div>
		</div>
	</div>
);
