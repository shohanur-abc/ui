'use client';

import { Percent, Tag, Gift, Sparkles, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type PromotionMetric = {
	title: string;
	value: string;
	change: number;
	icon: React.ReactNode;
};

type ActivePromotion = {
	name: string;
	code: string;
	discount: string;
	usageCount: number;
	usageLimit: number;
	revenue: number;
	status: 'active' | 'ending-soon' | 'paused';
};

type PromotionPerformance = {
	type: string;
	count: number;
	revenue: number;
	percentage: number;
};

type BentoLayout10Props = {
	metrics: PromotionMetric[];
	promotions: ActivePromotion[];
	performance: PromotionPerformance[];
};

const MetricCard = ({ metric }: { metric: PromotionMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<div className="flex items-center justify-between">
				<div>
					<p className="text-sm text-muted-foreground">{metric.title}</p>
					<p className="text-2xl font-bold mt-1">{metric.value}</p>
				</div>
				<div className="p-3 rounded-lg bg-primary/10 text-primary">{metric.icon}</div>
			</div>
			<div className={`flex items-center gap-1 mt-2 text-sm ${metric.change >= 0 ? 'text-primary' : 'text-destructive'}`}>
				{metric.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
				{Math.abs(metric.change)}% vs last period
			</div>
		</CardContent>
	</Card>
);

const getStatusVariant = (status: ActivePromotion['status']) => {
	switch (status) {
		case 'active':
			return 'default';
		case 'ending-soon':
			return 'secondary';
		case 'paused':
			return 'outline';
	}
};

const PromotionsCard = ({ promotions }: { promotions: ActivePromotion[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Tag className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Active Promotions</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{promotions.map((promo, idx) => (
				<div key={idx} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
					<div className="flex-1">
						<div className="flex items-center gap-2 mb-1">
							<span className="font-medium">{promo.name}</span>
							<Badge variant={getStatusVariant(promo.status)}>{promo.status}</Badge>
						</div>
						<div className="flex items-center gap-4 text-sm">
							<code className="px-2 py-0.5 rounded bg-muted">{promo.code}</code>
							<span className="text-primary font-medium">{promo.discount}</span>
							<span className="text-muted-foreground">
								${promo.revenue.toLocaleString()} revenue
							</span>
						</div>
					</div>
					<div className="w-32">
						<div className="flex justify-between text-xs mb-1">
							<span>{promo.usageCount}</span>
							<span className="text-muted-foreground">/{promo.usageLimit}</span>
						</div>
						<Progress value={(promo.usageCount / promo.usageLimit) * 100} className="h-1.5" />
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

const PerformanceCard = ({ performance }: { performance: PromotionPerformance[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Sparkles className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Promotion Type Performance</CardTitle>
			</div>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{performance.map((perf, idx) => (
					<div key={idx} className="text-center p-4 rounded-lg bg-muted/30">
						<p className="text-sm font-medium mb-2">{perf.type}</p>
						<p className="text-2xl font-bold">{perf.count}</p>
						<p className="text-xs text-muted-foreground">${perf.revenue.toLocaleString()}</p>
						<Badge variant="outline" className="mt-2">
							{perf.percentage}% of total
						</Badge>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const BentoLayout10 = ({ metrics, promotions, performance }: BentoLayout10Props) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} metric={metric} />
		))}
		<PromotionsCard promotions={promotions} />
		<PerformanceCard performance={performance} />
	</div>
);

export default function Main() {
	const metrics: PromotionMetric[] = [
		{ title: 'Active Promos', value: '12', change: 20, icon: <Tag className="size-5" /> },
		{ title: 'Redeemed Today', value: '284', change: 15.2, icon: <Gift className="size-5" /> },
		{ title: 'Total Discount', value: '$4,820', change: -8.3, icon: <Percent className="size-5" /> },
		{ title: 'Promo Revenue', value: '$42,500', change: 28.5, icon: <Sparkles className="size-5" /> },
	];

	const promotions: ActivePromotion[] = [
		{ name: 'Winter Sale', code: 'WINTER25', discount: '25% off', usageCount: 842, usageLimit: 1000, revenue: 28500, status: 'active' },
		{ name: 'New Customer', code: 'WELCOME10', discount: '$10 off', usageCount: 1250, usageLimit: 2000, revenue: 18200, status: 'active' },
		{ name: 'Flash Deal', code: 'FLASH30', discount: '30% off', usageCount: 450, usageLimit: 500, revenue: 12800, status: 'ending-soon' },
	];

	const performance: PromotionPerformance[] = [
		{ type: 'Percentage', count: 5, revenue: 42500, percentage: 45 },
		{ type: 'Fixed Amount', count: 4, revenue: 28200, percentage: 30 },
		{ type: 'Free Shipping', count: 2, revenue: 18500, percentage: 20 },
		{ type: 'BOGO', count: 1, revenue: 4800, percentage: 5 },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout10 metrics={metrics} promotions={promotions} performance={performance} />
			</div>
		</section>
	);
}
