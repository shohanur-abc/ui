import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
	Package,
	Truck,
	Warehouse,
	Clock,
	CheckCircle2,
	AlertTriangle,
} from 'lucide-react';

interface FulfillmentMetric {
	label: string;
	value: number;
	total: number;
	status: 'success' | 'warning' | 'danger';
}

interface FulfillmentCardProps {
	title: string;
	subtitle: string;
	metrics: FulfillmentMetric[];
	stats: {
		label: string;
		value: string;
		icon: React.ComponentType<{ className?: string }>;
	}[];
}

interface MetricRowProps {
	metric: FulfillmentMetric;
}

const MetricRow = ({ metric }: MetricRowProps) => {
	const statusColors = {
		success: '[&>div]:bg-accent',
		warning: '[&>div]:bg-yellow-500',
		danger: '[&>div]:bg-destructive',
	};
	const percentage = Math.round((metric.value / metric.total) * 100);
	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">{metric.label}</span>
				<span className="font-medium">
					{metric.value}/{metric.total}
					<span className="text-muted-foreground ml-1.5">({percentage}%)</span>
				</span>
			</div>
			<Progress
				value={percentage}
				className={`h-2 ${statusColors[metric.status]}`}
			/>
		</div>
	);
};

const StatCard = ({ stat }: { stat: FulfillmentCardProps['stats'][0] }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border/50">
		<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
			<stat.icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-2xl font-bold">{stat.value}</p>
			<p className="text-xs text-muted-foreground">{stat.label}</p>
		</div>
	</div>
);

const FulfillmentCard = ({
	title,
	subtitle,
	metrics,
	stats,
}: FulfillmentCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<div className="flex items-center gap-3">
				<div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center">
					<Warehouse className="size-5 text-primary" />
				</div>
				<div>
					<CardTitle className="text-lg">{title}</CardTitle>
					<CardDescription>{subtitle}</CardDescription>
				</div>
			</div>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="grid grid-cols-3 gap-3">
				{stats.map((stat, i) => (
					<StatCard key={i} stat={stat} />
				))}
			</div>

			<Separator />

			<div className="space-y-4">
				{metrics.map((metric, i) => (
					<MetricRow key={i} metric={metric} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const stats = [
		{ label: 'Pending', value: '23', icon: Clock },
		{ label: 'Processing', value: '45', icon: Package },
		{ label: 'Shipped', value: '156', icon: Truck },
	];

	const metrics: FulfillmentMetric[] = [
		{ label: 'Orders Picked', value: 180, total: 224, status: 'success' },
		{ label: 'Orders Packed', value: 156, total: 224, status: 'warning' },
		{ label: 'Orders Shipped', value: 120, total: 224, status: 'danger' },
		{ label: 'Delivered Today', value: 89, total: 100, status: 'success' },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<FulfillmentCard
					title="Fulfillment Overview"
					subtitle="Today's order processing status"
					metrics={metrics}
					stats={stats}
				/>
			</div>
		</section>
	);
}
