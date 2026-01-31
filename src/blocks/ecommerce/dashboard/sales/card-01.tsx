'use client';

import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type MetricCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	changeLabel: string;
};

const MetricCard = ({
	icon: Icon,
	label,
	value,
	change,
	changeLabel,
}: MetricCardProps) => {
	const isPositive = change >= 0;
	const TrendIcon = isPositive ? TrendingUp : TrendingDown;

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
			<CardContent className="relative pt-6">
				<div className="flex items-start justify-between">
					<div className="space-y-2">
						<div className="flex items-center gap-2">
							<div className="p-2 rounded-lg bg-primary/10 text-primary">
								<Icon className="size-4" />
							</div>
							<span className="text-sm font-medium text-muted-foreground">
								{label}
							</span>
						</div>
						<p className="text-3xl @sm:text-4xl font-bold tracking-tight">
							{value}
						</p>
					</div>
					<div
						className={`flex items-center gap-1 text-sm font-medium ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
					>
						<TrendIcon className="size-4" />
						<span>{Math.abs(change)}%</span>
					</div>
				</div>
				<p className="mt-3 text-xs text-muted-foreground">{changeLabel}</p>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const metrics: MetricCardProps[] = [
		{
			icon: TrendingUp,
			label: 'Total Revenue',
			value: '$48,352',
			change: 12.5,
			changeLabel: 'vs last month',
		},
		{
			icon: TrendingUp,
			label: 'Total Orders',
			value: '2,435',
			change: 8.2,
			changeLabel: 'vs last month',
		},
		{
			icon: TrendingDown,
			label: 'Refunds',
			value: '$1,234',
			change: -3.1,
			changeLabel: 'vs last month',
		},
		{
			icon: TrendingUp,
			label: 'Conversion Rate',
			value: '3.24%',
			change: 0.8,
			changeLabel: 'vs last month',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
					{metrics.map((metric, idx) => (
						<MetricCard key={idx} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
