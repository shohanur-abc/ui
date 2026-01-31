'use client';

import { DollarSign, ShoppingCart, TrendingUp, Users, Package, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type MetricCardData = {
	title: string;
	value: string;
	change: number;
	changeLabel: string;
	icon: React.ReactNode;
	color: string;
};

type BentoGridProps = {
	metrics: MetricCardData[];
};

const MetricCard = ({ title, value, change, changeLabel, icon, color }: MetricCardData) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
			<div className={`p-2 rounded-lg ${color}`}>{icon}</div>
		</CardHeader>
		<CardContent>
			<div className="text-2xl @lg:text-3xl font-bold">{value}</div>
			<div className="flex items-center gap-2 mt-2">
				<Badge variant={change >= 0 ? 'default' : 'destructive'} className="text-xs">
					{change >= 0 ? '+' : ''}{change}%
				</Badge>
				<span className="text-xs text-muted-foreground">{changeLabel}</span>
			</div>
		</CardContent>
	</Card>
);

const BentoGrid = ({ metrics }: BentoGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-6 gap-4">
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} {...metric} />
		))}
	</div>
);

export default function Main() {
	const metrics: MetricCardData[] = [
		{ title: 'Total Revenue', value: '$142,580', change: 12.5, changeLabel: 'vs last month', icon: <DollarSign className="size-4 text-primary" />, color: 'bg-primary/10' },
		{ title: 'Orders', value: '1,284', change: 8.2, changeLabel: 'vs last month', icon: <ShoppingCart className="size-4 text-blue-500" />, color: 'bg-blue-500/10' },
		{ title: 'Conversion Rate', value: '3.84%', change: -2.1, changeLabel: 'vs last month', icon: <TrendingUp className="size-4 text-amber-500" />, color: 'bg-amber-500/10' },
		{ title: 'New Customers', value: '324', change: 18.7, changeLabel: 'vs last month', icon: <Users className="size-4 text-violet-500" />, color: 'bg-violet-500/10' },
		{ title: 'Products Sold', value: '4,821', change: 5.4, changeLabel: 'vs last month', icon: <Package className="size-4 text-rose-500" />, color: 'bg-rose-500/10' },
		{ title: 'Avg Order Value', value: '$111', change: 3.8, changeLabel: 'vs last month', icon: <CreditCard className="size-4 text-cyan-500" />, color: 'bg-cyan-500/10' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoGrid metrics={metrics} />
			</div>
		</section>
	);
}
