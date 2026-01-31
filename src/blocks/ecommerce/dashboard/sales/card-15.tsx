'use client';

import { Repeat, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ConversionMetric = {
	stage: string;
	value: number;
	total: number;
	dropoff: number;
};

type ConversionFunnelCardProps = {
	title: string;
	metrics: ConversionMetric[];
};

const ConversionFunnelCard = ({ title, metrics }: ConversionFunnelCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-4">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Repeat className="size-4" />
			</div>
			<CardTitle className="text-base font-semibold">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-6">
			{metrics.map((metric, idx) => {
				const percentage = (metric.value / metric.total) * 100;
				return (
					<div key={idx} className="space-y-2">
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-2">
								<span className="flex items-center justify-center size-6 rounded-full bg-primary/10 text-primary text-xs font-bold">
									{idx + 1}
								</span>
								<span className="font-medium">{metric.stage}</span>
							</div>
							<div className="flex items-center gap-3">
								<span className="text-sm font-semibold">
									{metric.value.toLocaleString()}
								</span>
								<span className="text-xs text-muted-foreground">
									({percentage.toFixed(1)}%)
								</span>
							</div>
						</div>
						<Progress value={percentage} className="h-3" />
						{metric.dropoff > 0 && (
							<p className="text-xs text-destructive flex items-center gap-1">
								<TrendingUp className="size-3 rotate-180" />
								{metric.dropoff}% drop-off from previous stage
							</p>
						)}
					</div>
				);
			})}
		</CardContent>
	</Card>
);

export default function Main() {
	const funnelMetrics: ConversionMetric[] = [
		{ stage: 'Visitors', value: 45000, total: 45000, dropoff: 0 },
		{ stage: 'Product Views', value: 28500, total: 45000, dropoff: 36.7 },
		{ stage: 'Add to Cart', value: 8550, total: 45000, dropoff: 70 },
		{ stage: 'Checkout Started', value: 4275, total: 45000, dropoff: 50 },
		{ stage: 'Purchase Complete', value: 2850, total: 45000, dropoff: 33.3 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<div className="max-w-2xl mx-auto">
					<ConversionFunnelCard
						title="Conversion Funnel"
						metrics={funnelMetrics}
					/>
				</div>
			</div>
		</section>
	);
}
