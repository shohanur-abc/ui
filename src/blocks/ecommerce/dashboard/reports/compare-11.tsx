'use client';

import { ArrowUpRight, ArrowDownRight, DollarSign, Target, TrendingUp, ShoppingBag } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type PlanMetricProps = {
	metric: string;
	actual: string;
	planned: string;
	variance: number;
	status: 'on-track' | 'ahead' | 'behind';
};

const PlanMetric = ({ metric, actual, planned, variance, status }: PlanMetricProps) => (
	<div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/20 p-4">
		<div>
			<p className="text-sm text-muted-foreground">{metric}</p>
			<div className="mt-1 flex items-baseline gap-2">
				<span className="text-xl font-bold">{actual}</span>
				<span className="text-sm text-muted-foreground">/ {planned}</span>
			</div>
		</div>
		<div className="text-right">
			<Badge
				variant="outline"
				className={
					status === 'ahead'
						? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
						: status === 'behind'
							? 'border-rose-500/20 bg-rose-500/10 text-rose-500'
							: 'border-amber-500/20 bg-amber-500/10 text-amber-500'
				}
			>
				{status === 'ahead' ? <ArrowUpRight className="mr-1 size-3" /> : status === 'behind' ? <ArrowDownRight className="mr-1 size-3" /> : null}
				{variance >= 0 ? '+' : ''}{variance}%
			</Badge>
			<p className="mt-1 text-xs text-muted-foreground capitalize">{status.replace('-', ' ')}</p>
		</div>
	</div>
);

type GoalCardProps = {
	title: string;
	icon: React.ElementType;
	progress: number;
	current: string;
	target: string;
	daysLeft: number;
};

const GoalCard = ({ title, icon: Icon, progress, current, target, daysLeft }: GoalCardProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-5">
			<div className="flex items-center gap-3">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<p className="font-medium">{title}</p>
			</div>
			<div className="mt-4">
				<div className="relative h-2.5 overflow-hidden rounded-full bg-muted">
					<div
						className="absolute left-0 top-0 h-full rounded-full bg-primary transition-all"
						style={{ width: `${Math.min(progress, 100)}%` }}
					/>
				</div>
				<div className="mt-2 flex justify-between text-xs">
					<span className="font-medium">{current}</span>
					<span className="text-muted-foreground">{target}</span>
				</div>
			</div>
			<div className="mt-3 flex items-center justify-between">
				<Badge variant="outline" className="text-xs">
					{progress}% complete
				</Badge>
				<span className="text-xs text-muted-foreground">{daysLeft} days left</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: PlanMetricProps[] = [
		{ metric: 'Monthly Revenue', actual: '$1.24M', planned: '$1.15M', variance: 7.8, status: 'ahead' },
		{ metric: 'New Customers', actual: '2,845', planned: '3,000', variance: -5.2, status: 'behind' },
		{ metric: 'Conversion Rate', actual: '4.2%', planned: '4.0%', variance: 5.0, status: 'ahead' },
		{ metric: 'Customer Retention', actual: '78%', planned: '80%', variance: -2.5, status: 'on-track' },
	];

	const goals: GoalCardProps[] = [
		{ title: 'Annual Revenue Goal', icon: DollarSign, progress: 78, current: '$11.7M', target: '$15M', daysLeft: 82 },
		{ title: 'Customer Acquisition', icon: Target, progress: 65, current: '32.5K', target: '50K', daysLeft: 82 },
		{ title: 'Market Expansion', icon: TrendingUp, progress: 40, current: '4 markets', target: '10 markets', daysLeft: 82 },
		{ title: 'Product Launches', icon: ShoppingBag, progress: 83, current: '5 launched', target: '6 planned', daysLeft: 82 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Plan vs Actual Report
						</CardTitle>
						<CardDescription>
							Tracking performance against planned targets
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2">
							{metrics.map((m, i) => (
								<PlanMetric key={i} {...m} />
							))}
						</div>
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{goals.map((g, i) => (
								<GoalCard key={i} {...g} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
