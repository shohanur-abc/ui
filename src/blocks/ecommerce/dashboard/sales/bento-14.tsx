'use client';

import { Eye, MousePointer, ShoppingCart, CreditCard, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type FunnelStep = {
	label: string;
	value: number;
	percentage: number;
	dropoff: number;
	icon: React.ReactNode;
};

type ConversionMetric = {
	label: string;
	value: string;
	change: number;
};

type BentoLayout14Props = {
	funnelSteps: FunnelStep[];
	metrics: ConversionMetric[];
};

const FunnelCard = ({ steps }: { steps: FunnelStep[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-3">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Conversion Funnel</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="flex flex-col @md:flex-row items-stretch gap-2 @md:gap-0">
				{steps.map((step, idx) => (
					<div key={idx} className="flex-1 flex flex-col @md:flex-row items-center">
						<div
							className="w-full @md:flex-1 p-4 rounded-lg @md:rounded-none first:@md:rounded-l-lg last:@md:rounded-r-lg relative"
							style={{
								backgroundColor: `oklch(0.70 0.18 155 / ${1 - idx * 0.2})`,
							}}
						>
							<div className="flex items-center gap-3 text-white">
								<div className="p-2 rounded-lg bg-white/20">{step.icon}</div>
								<div>
									<p className="font-medium">{step.label}</p>
									<p className="text-2xl font-bold">{step.value.toLocaleString()}</p>
								</div>
							</div>
							<div className="mt-2 flex items-center justify-between text-white/80 text-sm">
								<span>{step.percentage}%</span>
								{step.dropoff > 0 && (
									<span className="text-xs">-{step.dropoff}% dropoff</span>
								)}
							</div>
						</div>
						{idx < steps.length - 1 && (
							<ArrowRight className="size-5 text-muted-foreground hidden @md:block mx-1" />
						)}
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const MetricCard = ({ metric }: { metric: ConversionMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<p className="text-sm text-muted-foreground">{metric.label}</p>
			<div className="flex items-center justify-between mt-2">
				<p className="text-2xl font-bold">{metric.value}</p>
				<Badge variant={metric.change >= 0 ? 'default' : 'destructive'} className="gap-1">
					{metric.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{Math.abs(metric.change)}%
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const BentoLayout14 = ({ funnelSteps, metrics }: BentoLayout14Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		<FunnelCard steps={funnelSteps} />
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} metric={metric} />
		))}
	</div>
);

export default function Main() {
	const funnelSteps: FunnelStep[] = [
		{ label: 'Visitors', value: 45000, percentage: 100, dropoff: 0, icon: <Eye className="size-4" /> },
		{ label: 'Product Views', value: 28500, percentage: 63, dropoff: 37, icon: <MousePointer className="size-4" /> },
		{ label: 'Add to Cart', value: 8550, percentage: 19, dropoff: 70, icon: <ShoppingCart className="size-4" /> },
		{ label: 'Purchases', value: 1728, percentage: 3.8, dropoff: 80, icon: <CreditCard className="size-4" /> },
	];

	const metrics: ConversionMetric[] = [
		{ label: 'Overall Conversion', value: '3.84%', change: 12.5 },
		{ label: 'Cart Abandonment', value: '79.8%', change: -5.2 },
		{ label: 'Avg Session Duration', value: '4m 32s', change: 8.3 },
		{ label: 'Bounce Rate', value: '42.5%', change: -3.1 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout14 funnelSteps={funnelSteps} metrics={metrics} />
			</div>
		</section>
	);
}
