'use client';

import {
	Package,
	Warehouse,
	Truck,
	RefreshCw,
	ArrowUpRight,
	ArrowDownRight,
} from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type KpiItem = {
	title: string;
	value: string;
	subValue: string;
	progress: number;
	change: string;
	trend: 'up' | 'down';
	icon: React.ElementType;
	color: string;
};

type KpiCardProps = {
	item: KpiItem;
};

const KpiCard = ({ item }: KpiCardProps) => {
	const { title, value, subValue, progress, change, trend, icon: Icon, color } = item;

	return (
		<Card className="group overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div className={`rounded-xl p-3 ${color}`}>
						<Icon className="size-6" />
					</div>
					<div
						className={`flex items-center gap-1 text-xs font-medium ${
							trend === 'up' ? 'text-emerald-500' : 'text-red-500'
						}`}
					>
						{trend === 'up' ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{change}
					</div>
				</div>
				<div className="mt-4">
					<h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
					<p className="mt-1 text-3xl font-bold tracking-tight">{value}</p>
					<p className="mt-1 text-sm text-muted-foreground">{subValue}</p>
				</div>
				<div className="mt-4 space-y-2">
					<div className="flex justify-between text-xs">
						<span className="text-muted-foreground">Capacity</span>
						<span className="font-medium">{progress}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Total Inventory',
			value: '48,256',
			subValue: 'Items across all locations',
			progress: 72,
			change: '+5.2%',
			trend: 'up',
			icon: Package,
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			title: 'Warehouse Capacity',
			value: '85%',
			subValue: '42,800 of 50,000 slots',
			progress: 85,
			change: '+2.8%',
			trend: 'up',
			icon: Warehouse,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
		{
			title: 'In Transit',
			value: '1,234',
			subValue: 'Items being shipped',
			progress: 45,
			change: '+12.5%',
			trend: 'up',
			icon: Truck,
			color: 'bg-purple-500/10 text-purple-500',
		},
		{
			title: 'Stock Turnover',
			value: '6.2x',
			subValue: 'Average monthly rate',
			progress: 78,
			change: '-3.1%',
			trend: 'down',
			icon: RefreshCw,
			color: 'bg-orange-500/10 text-orange-500',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
					{kpis.map((kpi, i) => (
						<KpiCard key={i} item={kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
