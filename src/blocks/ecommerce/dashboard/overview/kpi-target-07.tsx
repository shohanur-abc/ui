import {
	ArrowDown,
	ArrowUp,
	Clock,
	Package,
	RotateCcw,
	Truck,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type KpiItem = {
	title: string;
	value: string;
	target: string;
	progress: number;
	change: string;
	trend: 'up' | 'down';
	status: 'on-track' | 'behind' | 'ahead';
	icon: LucideIcon;
};

const getStatusColor = (status: KpiItem['status']) => {
	switch (status) {
		case 'ahead':
			return 'text-emerald-500 bg-emerald-500/10';
		case 'behind':
			return 'text-red-500 bg-red-500/10';
		default:
			return 'text-primary bg-primary/10';
	}
};

const KpiCardTarget = ({
	title,
	value,
	target,
	progress,
	change,
	trend,
	status,
	icon: Icon,
}: KpiItem) => (
	<Card className="group transition-all duration-300 hover:shadow-lg">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Icon className="size-4 text-muted-foreground" />
					<CardTitle className="text-sm font-medium">{title}</CardTitle>
				</div>
				<Badge variant="secondary" className={getStatusColor(status)}>
					{status === 'ahead'
						? 'Ahead'
						: status === 'behind'
							? 'Behind'
							: 'On Track'}
				</Badge>
			</div>
		</CardHeader>
		<CardContent className="space-y-4 pt-0">
			<div className="flex items-end justify-between">
				<div>
					<span className="text-3xl font-bold tracking-tight">{value}</span>
					<span className="ml-2 text-sm text-muted-foreground">/ {target}</span>
				</div>
				<div
					className={`flex items-center gap-0.5 text-sm font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{trend === 'up' ? (
						<ArrowUp className="size-3" />
					) : (
						<ArrowDown className="size-3" />
					)}
					{change}
				</div>
			</div>
			<div className="space-y-1.5">
				<Progress value={progress} className="h-2" />
				<p className="text-xs text-muted-foreground">{progress}% of target</p>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Orders Fulfilled',
			value: '4,521',
			target: '5,000',
			progress: 90,
			change: '+12%',
			trend: 'up',
			status: 'on-track',
			icon: Package,
		},
		{
			title: 'Avg Delivery Time',
			value: '2.4d',
			target: '3.0d',
			progress: 125,
			change: '-0.6d',
			trend: 'up',
			status: 'ahead',
			icon: Truck,
		},
		{
			title: 'Processing Time',
			value: '4.2h',
			target: '3.0h',
			progress: 71,
			change: '+0.8h',
			trend: 'down',
			status: 'behind',
			icon: Clock,
		},
		{
			title: 'Return Rate',
			value: '3.2%',
			target: '5.0%',
			progress: 156,
			change: '-0.5%',
			trend: 'up',
			status: 'ahead',
			icon: RotateCcw,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCardTarget key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
