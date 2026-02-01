import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Clock,
	CheckCircle,
	AlertTriangle,
	Truck,
	Package,
	Timer,
	Gauge,
	Target,
} from 'lucide-react';

interface FulfillmentSummaryProps {
	metrics: {
		avgFulfillment: string;
		avgShipping: string;
		onTimeRate: string;
		slaCompliance: string;
	};
	stages: {
		stage: string;
		avgTime: string;
		target: string;
		status: 'on-track' | 'at-risk' | 'exceeded';
	}[];
	warehouse: {
		name: string;
		pending: number;
		inProgress: number;
		completed: number;
	}[];
}

const statusColors = {
	'on-track': 'text-accent',
	'at-risk': 'text-yellow-600',
	exceeded: 'text-destructive',
};

const MetricCard = ({
	label,
	value,
	icon: Icon,
	color,
}: {
	label: string;
	value: string;
	icon: React.ComponentType<{ className?: string }>;
	color: string;
}) => (
	<div className="p-4 rounded-xl bg-muted/20 border border-border/50 text-center">
		<Icon className={`size-6 mx-auto mb-2 ${color}`} />
		<p className="text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{label}</p>
	</div>
);

const StageRow = ({
	stage,
}: {
	stage: FulfillmentSummaryProps['stages'][0];
}) => (
	<div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
		<div className="flex items-center gap-3">
			<Timer className="size-5 text-muted-foreground" />
			<span className="font-medium">{stage.stage}</span>
		</div>
		<div className="flex items-center gap-4">
			<div className="text-right">
				<p className={`font-semibold ${statusColors[stage.status]}`}>
					{stage.avgTime}
				</p>
				<p className="text-xs text-muted-foreground">Target: {stage.target}</p>
			</div>
			{stage.status === 'on-track' && (
				<CheckCircle className="size-5 text-accent" />
			)}
			{stage.status === 'at-risk' && (
				<AlertTriangle className="size-5 text-yellow-600" />
			)}
			{stage.status === 'exceeded' && (
				<AlertTriangle className="size-5 text-destructive" />
			)}
		</div>
	</div>
);

const FulfillmentSummary = ({
	metrics,
	stages,
	warehouse,
}: FulfillmentSummaryProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="pb-4">
			<CardTitle className="text-lg">Fulfillment Performance</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">
			<div className="grid grid-cols-4 gap-3">
				<MetricCard
					label="Avg Fulfillment"
					value={metrics.avgFulfillment}
					icon={Clock}
					color="text-primary"
				/>
				<MetricCard
					label="Avg Shipping"
					value={metrics.avgShipping}
					icon={Truck}
					color="text-blue-500"
				/>
				<MetricCard
					label="On-Time Rate"
					value={metrics.onTimeRate}
					icon={Target}
					color="text-accent"
				/>
				<MetricCard
					label="SLA Compliance"
					value={metrics.slaCompliance}
					icon={Gauge}
					color="text-primary"
				/>
			</div>

			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-3">
					Processing Stages
				</p>
				<div className="space-y-2">
					{stages.map((stage, i) => (
						<StageRow key={i} stage={stage} />
					))}
				</div>
			</div>

			<div>
				<p className="text-sm font-semibold text-muted-foreground mb-3">
					Warehouse Status
				</p>
				<div className="space-y-3">
					{warehouse.map((wh, i) => {
						const total = wh.pending + wh.inProgress + wh.completed;
						return (
							<div
								key={i}
								className="p-3 rounded-lg bg-muted/20 border border-border/50"
							>
								<div className="flex items-center justify-between mb-2">
									<span className="font-medium">{wh.name}</span>
									<Badge variant="secondary">{total} orders</Badge>
								</div>
								<div className="flex gap-1 h-3 rounded-full overflow-hidden">
									<div
										className="bg-yellow-500"
										style={{ width: `${(wh.pending / total) * 100}%` }}
									/>
									<div
										className="bg-blue-500"
										style={{ width: `${(wh.inProgress / total) * 100}%` }}
									/>
									<div
										className="bg-accent"
										style={{ width: `${(wh.completed / total) * 100}%` }}
									/>
								</div>
								<div className="flex justify-between mt-2 text-xs text-muted-foreground">
									<span className="flex items-center gap-1">
										<span className="size-2 rounded-full bg-yellow-500" />{' '}
										Pending: {wh.pending}
									</span>
									<span className="flex items-center gap-1">
										<span className="size-2 rounded-full bg-blue-500" /> In
										Progress: {wh.inProgress}
									</span>
									<span className="flex items-center gap-1">
										<span className="size-2 rounded-full bg-accent" />{' '}
										Completed: {wh.completed}
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics = {
		avgFulfillment: '1.8 days',
		avgShipping: '3.2 days',
		onTimeRate: '94.5%',
		slaCompliance: '97.2%',
	};

	const stages = [
		{
			stage: 'Order Processing',
			avgTime: '2.5 hrs',
			target: '4 hrs',
			status: 'on-track' as const,
		},
		{
			stage: 'Picking & Packing',
			avgTime: '4.2 hrs',
			target: '4 hrs',
			status: 'at-risk' as const,
		},
		{
			stage: 'Quality Check',
			avgTime: '45 min',
			target: '1 hr',
			status: 'on-track' as const,
		},
		{
			stage: 'Carrier Handoff',
			avgTime: '1.5 hrs',
			target: '1 hr',
			status: 'exceeded' as const,
		},
	];

	const warehouse = [
		{
			name: 'East Coast (Newark)',
			pending: 45,
			inProgress: 78,
			completed: 234,
		},
		{ name: 'West Coast (LA)', pending: 32, inProgress: 56, completed: 189 },
		{ name: 'Central (Dallas)', pending: 28, inProgress: 42, completed: 145 },
	];

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<FulfillmentSummary
					metrics={metrics}
					stages={stages}
					warehouse={warehouse}
				/>
			</div>
		</section>
	);
}
