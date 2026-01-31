'use client';

import {
	Package,
	TrendingUp,
	TrendingDown,
	AlertTriangle,
	ArrowUpRight,
	ArrowDownRight,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

const KpiCard = ({ title, value, change, trend, icon: Icon }: KpiItem) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
		<div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<CardTitle className="text-sm font-medium text-muted-foreground">
				{title}
			</CardTitle>
			<div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
				<Icon className="size-4 text-primary" />
			</div>
		</CardHeader>
		<CardContent className="pt-0">
			<div className="text-2xl font-bold tracking-tight @sm:text-3xl">
				{value}
			</div>
			<div
				className={`mt-1 flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="size-3" />
				) : (
					<ArrowDownRight className="size-3" />
				)}
				<span>{change} from last month</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Total Stock Value',
			value: '$1,284,532',
			change: '+8.2%',
			trend: 'up',
			icon: Package,
		},
		{
			title: 'Stock Turnover',
			value: '4.8x',
			change: '+12.5%',
			trend: 'up',
			icon: TrendingUp,
		},
		{
			title: 'Low Stock Items',
			value: '23',
			change: '+15.0%',
			trend: 'down',
			icon: AlertTriangle,
		},
		{
			title: 'Dead Stock',
			value: '8',
			change: '-25.0%',
			trend: 'up',
			icon: TrendingDown,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiCard key={i} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
