import {
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	DollarSign,
	Package,
	ShoppingCart,
	Star,
	TrendingUp,
	Users,
	XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type SummaryMetric = {
	id: string;
	label: string;
	value: string;
	icon: React.ElementType;
	status?: 'success' | 'warning' | 'error';
};

type AlertItem = {
	id: string;
	message: string;
	type: 'info' | 'warning' | 'error';
};

type GoalItem = {
	id: string;
	label: string;
	current: number;
	target: number;
};

const getStatusColor = (status?: 'success' | 'warning' | 'error') => {
	switch (status) {
		case 'success':
			return 'text-emerald-500';
		case 'warning':
			return 'text-amber-500';
		case 'error':
			return 'text-red-500';
		default:
			return 'text-primary';
	}
};

const MetricBadge = ({ label, value, icon: Icon, status }: SummaryMetric) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 px-3 py-2">
		<Icon className={`size-4 ${getStatusColor(status)}`} />
		<span className="text-sm text-muted-foreground">{label}:</span>
		<span className="font-semibold">{value}</span>
	</div>
);

const AlertBadge = ({ message, type }: AlertItem) => {
	const config = {
		info: { icon: CheckCircle2, color: 'bg-primary/10 text-primary' },
		warning: { icon: AlertCircle, color: 'bg-amber-500/10 text-amber-500' },
		error: { icon: XCircle, color: 'bg-red-500/10 text-red-500' },
	}[type];
	const Icon = config.icon;

	return (
		<Badge variant="secondary" className={`gap-1 ${config.color}`}>
			<Icon className="size-3" />
			{message}
		</Badge>
	);
};

const GoalBar = ({ label, current, target }: GoalItem) => (
	<div className="flex-1">
		<div className="flex items-center justify-between text-xs">
			<span>{label}</span>
			<span className="font-medium">{Math.round((current / target) * 100)}%</span>
		</div>
		<Progress value={(current / target) * 100} className="mt-1 h-1.5" />
	</div>
);

export default function Main() {
	const metrics: SummaryMetric[] = [
		{ id: '1', label: 'Revenue', value: '$48.2K', icon: DollarSign, status: 'success' },
		{ id: '2', label: 'Orders', value: '1,284', icon: ShoppingCart, status: 'success' },
		{ id: '3', label: 'Customers', value: '3,845', icon: Users },
		{ id: '4', label: 'Products', value: '542', icon: Package },
		{ id: '5', label: 'Avg Order', value: '$87.50', icon: TrendingUp },
		{ id: '6', label: 'Rating', value: '4.72', icon: Star, status: 'success' },
	];

	const alerts: AlertItem[] = [
		{ id: '1', message: '12 low stock items', type: 'warning' },
		{ id: '2', message: '3 pending orders', type: 'info' },
		{ id: '3', message: '2 failed payments', type: 'error' },
	];

	const goals: GoalItem[] = [
		{ id: '1', label: 'Revenue', current: 48200, target: 60000 },
		{ id: '2', label: 'Orders', current: 1284, target: 1500 },
		{ id: '3', label: 'Customers', current: 845, target: 1000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardContent className="p-4">
						<div className="flex flex-wrap items-center gap-3">
							<div className="flex items-center gap-2 text-sm font-medium">
								<Clock className="size-4 text-muted-foreground" />
								Dashboard Summary
							</div>
							<div className="h-4 w-px bg-border" />
							<div className="flex flex-wrap gap-2">
								{metrics.map((metric) => (
									<MetricBadge key={metric.id} {...metric} />
								))}
							</div>
						</div>
						<div className="mt-4 flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
							<div className="flex flex-wrap gap-2">
								{alerts.map((alert) => (
									<AlertBadge key={alert.id} {...alert} />
								))}
							</div>
							<div className="flex items-center gap-4">
								{goals.map((goal) => (
									<GoalBar key={goal.id} {...goal} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
