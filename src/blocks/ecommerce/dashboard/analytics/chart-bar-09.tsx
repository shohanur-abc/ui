'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

type DistributionBarData = {
	label: string;
	value: number;
	previous: number;
	color: string;
};

const DistributionBarChart = ({ data }: { data: DistributionBarData[] }) => {
	const total = data.reduce((a, b) => a + b.value, 0);

	return (
		<div className="space-y-4">
			<div className="flex h-8 rounded-lg overflow-hidden">
				{data.map((item, i) => {
					const width = (item.value / total) * 100;
					return (
						<div
							key={i}
							className="h-full transition-all duration-500"
							style={{ width: `${width}%`, backgroundColor: item.color }}
						/>
					);
				})}
			</div>
			<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-5 gap-4">
				{data.map((item, i) => {
					const percentage = ((item.value / total) * 100).toFixed(1);
					const change = (
						((item.value - item.previous) / item.previous) *
						100
					).toFixed(1);
					const changeNum = parseFloat(change);
					const TrendIcon: LucideIcon =
						changeNum > 0 ? TrendingUp : changeNum < 0 ? TrendingDown : Minus;
					return (
						<div key={i} className="p-3 rounded-lg bg-muted/20">
							<div className="flex items-center gap-2 mb-1">
								<div
									className="w-2 h-2 rounded-full"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-xs text-muted-foreground">
									{item.label}
								</span>
							</div>
							<p className="text-lg font-bold">{percentage}%</p>
							<div
								className={`flex items-center gap-1 text-xs ${changeNum >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}
							>
								<TrendIcon className="size-3" />
								<span>
									{changeNum >= 0 ? '+' : ''}
									{change}%
								</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

const trafficSources: DistributionBarData[] = [
	{ label: 'Organic', value: 42000, previous: 38000, color: '#22c55e' },
	{ label: 'Paid', value: 28000, previous: 30000, color: '#3b82f6' },
	{ label: 'Social', value: 18000, previous: 15000, color: '#a855f7' },
	{ label: 'Email', value: 12000, previous: 11000, color: '#f59e0b' },
	{ label: 'Direct', value: 10000, previous: 10500, color: '#ec4899' },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Traffic Distribution
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Visitors by acquisition channel
						</p>
					</CardHeader>
					<CardContent>
						<DistributionBarChart data={trafficSources} />
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
