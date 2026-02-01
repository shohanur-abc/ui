'use client';

import {
	CircleDollarSign,
	Truck,
	Clock,
	Star,
	ThumbsUp,
	RotateCcw,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type MetricProps = {
	icon: LucideIcon;
	title: string;
	value: string;
	subValue: string;
	benchmark: string;
	progress: number;
	status: 'good' | 'warning' | 'critical';
};

const MetricCard = ({
	icon: Icon,
	title,
	value,
	subValue,
	benchmark,
	progress,
	status,
}: MetricProps) => {
	const statusColors = {
		good: 'text-emerald-500',
		warning: 'text-amber-500',
		critical: 'text-rose-500',
	};
	const progressColors = {
		good: '[&>[role=progressbar]]:bg-emerald-500',
		warning: '[&>[role=progressbar]]:bg-amber-500',
		critical: '[&>[role=progressbar]]:bg-rose-500',
	};

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-5">
				<div className="flex items-center gap-3">
					<div className="rounded-lg bg-muted/50 p-2.5">
						<Icon className="size-5 text-muted-foreground" />
					</div>
					<div className="flex-1">
						<p className="text-sm font-medium">{title}</p>
						<p className="text-xs text-muted-foreground">{subValue}</p>
					</div>
				</div>
				<div className="mt-4">
					<div className="flex items-baseline justify-between">
						<span className={`text-3xl font-bold ${statusColors[status]}`}>
							{value}
						</span>
						<span className="text-xs text-muted-foreground">
							Benchmark: {benchmark}
						</span>
					</div>
					<Progress
						value={progress}
						className={`mt-3 h-1.5 ${progressColors[status]}`}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const metrics: MetricProps[] = [
		{
			icon: CircleDollarSign,
			title: 'Average Order Value',
			value: '$148.50',
			subValue: '↑ $12.30 from last month',
			benchmark: '$135.00',
			progress: 100,
			status: 'good',
		},
		{
			icon: Truck,
			title: 'Delivery Time',
			value: '2.4 days',
			subValue: '↓ 0.3 days improvement',
			benchmark: '3.0 days',
			progress: 100,
			status: 'good',
		},
		{
			icon: Clock,
			title: 'Response Time',
			value: '4.2 hrs',
			subValue: '↑ 0.8 hrs slower',
			benchmark: '2.0 hrs',
			progress: 48,
			status: 'warning',
		},
		{
			icon: Star,
			title: 'Customer Rating',
			value: '4.7',
			subValue: '↑ 0.2 from last quarter',
			benchmark: '4.5',
			progress: 100,
			status: 'good',
		},
		{
			icon: ThumbsUp,
			title: 'NPS Score',
			value: '62',
			subValue: '↓ 5 points decline',
			benchmark: '70',
			progress: 89,
			status: 'warning',
		},
		{
			icon: RotateCcw,
			title: 'Return Rate',
			value: '8.5%',
			subValue: '↑ 1.2% increase',
			benchmark: '5.0%',
			progress: 59,
			status: 'critical',
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Quality Metrics Report
						</CardTitle>
						<CardDescription>
							Key quality indicators compared to benchmarks
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{metrics.map((metric, i) => (
								<MetricCard key={i} {...metric} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
