'use client';

import {
	Wallet,
	TrendingUp,
	TrendingDown,
	BarChart3,
	type LucideIcon,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

type SparklineCardProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: number;
	sparkline: number[];
};

const SparklineCard = ({
	icon: Icon,
	label,
	value,
	change,
	sparkline,
}: SparklineCardProps) => {
	const isPositive = change >= 0;
	const max = Math.max(...sparkline);
	const min = Math.min(...sparkline);
	const range = max - min || 1;

	return (
		<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
			<CardContent className="pt-6">
				<div className="flex items-start justify-between mb-4">
					<div className="p-2 rounded-lg bg-primary/10 text-primary">
						<Icon className="size-4" />
					</div>
					<div
						className={`flex items-center gap-1 text-xs font-medium ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
					>
						{isPositive ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(change)}%
					</div>
				</div>

				<div className="space-y-1 mb-4">
					<p className="text-xs text-muted-foreground">{label}</p>
					<p className="text-2xl font-bold tracking-tight">{value}</p>
				</div>

				<div className="h-12 flex items-end gap-1">
					{sparkline.map((val, idx) => {
						const height = ((val - min) / range) * 100;
						return (
							<div
								key={idx}
								className="flex-1 bg-gradient-to-t from-primary/40 to-primary/80 rounded-t transition-all duration-300 group-hover:from-primary/60 group-hover:to-primary"
								style={{ height: `${Math.max(height, 10)}%` }}
							/>
						);
					})}
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const metrics: SparklineCardProps[] = [
		{
			icon: Wallet,
			label: 'Daily Revenue',
			value: '$8,420',
			change: 14.2,
			sparkline: [45, 52, 38, 65, 72, 58, 80],
		},
		{
			icon: BarChart3,
			label: 'Daily Orders',
			value: '347',
			change: 8.5,
			sparkline: [32, 28, 45, 38, 42, 55, 48],
		},
		{
			icon: TrendingUp,
			label: 'Avg Order Value',
			value: '$124',
			change: 5.3,
			sparkline: [85, 92, 88, 95, 102, 98, 110],
		},
		{
			icon: TrendingDown,
			label: 'Cart Abandonment',
			value: '23%',
			change: -2.8,
			sparkline: [28, 32, 25, 22, 26, 20, 23],
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4 @md:gap-6">
					{metrics.map((metric, idx) => (
						<SparklineCard key={idx} {...metric} />
					))}
				</div>
			</div>
		</section>
	);
}
