import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
	Gauge,
	HardDrive,
	Network,
	RefreshCw,
	Server,
	Timer,
	Zap,
} from 'lucide-react';
import { ComponentType } from 'react';

interface PerformanceMetric {
	icon: ComponentType<{ className?: string }>;
	metric: string;
	value: string;
	description: string;
}

export default function Main() {
	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="corporate"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-16 @md:py-20 @xl:py-24 @3xl:py-32">
				<div className="text-center max-w-3xl mx-auto mb-10 @md:mb-12 @xl:mb-16">
					<Eyebrow icon={Gauge} text="Performance" />
					<Title text="Speed That" highlight="Sets Us Apart" />
					<Description text="We obsess over performance so you don't have to. Every millisecond counts." />
				</div>

				<PerformanceMetrics
					items={[
						{
							icon: Timer,
							metric: 'API Response',
							value: '<50ms',
							description: 'Average response time',
						},
						{
							icon: Gauge,
							metric: 'Page Load',
							value: '<1s',
							description: 'Time to interactive',
						},
						{
							icon: Server,
							metric: 'Uptime',
							value: '99.99%',
							description: 'SLA guaranteed',
						},
						{
							icon: Network,
							metric: 'Edge Nodes',
							value: '200+',
							description: 'Global locations',
						},
						{
							icon: HardDrive,
							metric: 'Data Sync',
							value: 'Real-time',
							description: 'Instant updates',
						},
						{
							icon: RefreshCw,
							metric: 'Backup',
							value: 'Every 5min',
							description: 'Automatic snapshots',
						},
					]}
				/>
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
	<div className="mb-4">
		<Badge variant="outline" className="gap-2">
			<Icon className="size-3.5" />
			{text}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight: string }) => (
	<h2 className="mb-4 text-3xl @sm:text-4xl @xl:text-5xl font-bold tracking-tight">
		{text} <span className="text-primary">{highlight}</span>
	</h2>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-base @md:text-lg text-muted-foreground">{text}</p>
);

const PerformanceMetrics = ({ items }: { items: PerformanceMetric[] }) => (
	<div className="grid gap-4 @md:gap-6 @sm:grid-cols-2 @xl:grid-cols-3 max-w-5xl mx-auto">
		{items.map((metric) => (
			<Card
				key={metric.metric}
				className="group border-border/50 transition-all hover:border-primary/30 text-center"
			>
				<CardContent className="p-6 @md:p-8">
					<div className="mb-4 mx-auto flex size-14 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary/15">
						<metric.icon className="size-7 text-primary" />
					</div>
					<p className="text-3xl @md:text-4xl font-bold text-primary mb-1">
						{metric.value}
					</p>
					<p className="font-semibold mb-1">{metric.metric}</p>
					<p className="text-sm text-muted-foreground">{metric.description}</p>
				</CardContent>
			</Card>
		))}
	</div>
);
