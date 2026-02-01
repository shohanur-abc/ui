'use client';

import * as React from 'react';
import {
	Package,
	BarChart3,
	TrendingUp,
	TrendingDown,
	DollarSign,
	ShoppingCart,
	RefreshCw,
	Layers,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type CategoryStat = {
	id: string;
	category: string;
	itemCount: number;
	value: number;
	percentOfTotal: number;
	turnoverRate: number;
	trend: 'up' | 'down' | 'stable';
};

type CategoryRowProps = {
	stat: CategoryStat;
	maxValue: number;
};

const CategoryRow = ({ stat, maxValue }: CategoryRowProps) => {
	const barWidth = (stat.value / maxValue) * 100;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-8 items-center justify-center rounded bg-muted">
						<Layers className="size-4 text-muted-foreground" />
					</div>
					<div>
						<p className="font-medium">{stat.category}</p>
						<p className="text-xs text-muted-foreground">
							{stat.itemCount} items
						</p>
					</div>
				</div>
				<div className="flex items-center gap-4 text-sm">
					<div className="flex items-center gap-1">
						<RefreshCw className="size-3 text-muted-foreground" />
						<span>{stat.turnoverRate}x</span>
					</div>
					<div className="flex items-center gap-1">
						{stat.trend === 'up' ? (
							<TrendingUp className="size-3 text-emerald-500" />
						) : stat.trend === 'down' ? (
							<TrendingDown className="size-3 text-destructive" />
						) : (
							<BarChart3 className="size-3 text-muted-foreground" />
						)}
					</div>
					<span className="w-24 text-right font-semibold">
						${stat.value.toLocaleString()}
					</span>
					<Badge variant="secondary" className="w-14 justify-center">
						{stat.percentOfTotal}%
					</Badge>
				</div>
			</div>
			<div className="relative h-2 overflow-hidden rounded-full bg-muted">
				<div
					className="absolute inset-y-0 left-0 bg-primary transition-all"
					style={{ width: `${barWidth}%` }}
				/>
			</div>
		</div>
	);
};

type TotalStatsProps = {
	totalValue: number;
	totalItems: number;
	avgTurnover: number;
};

const TotalStats = ({
	totalValue,
	totalItems,
	avgTurnover,
}: TotalStatsProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<DollarSign className="size-5 text-primary" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Total Value</p>
				<p className="text-xl font-bold">${totalValue.toLocaleString()}</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<Package className="size-5 text-primary" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Total Items</p>
				<p className="text-xl font-bold">{totalItems.toLocaleString()}</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<RefreshCw className="size-5 text-primary" />
			</div>
			<div>
				<p className="text-sm text-muted-foreground">Avg Turnover</p>
				<p className="text-xl font-bold">{avgTurnover}x</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const categories: CategoryStat[] = [
		{
			id: '1',
			category: 'Electronics',
			itemCount: 845,
			value: 456000,
			percentOfTotal: 35,
			turnoverRate: 5.2,
			trend: 'up',
		},
		{
			id: '2',
			category: 'Apparel',
			itemCount: 1256,
			value: 312000,
			percentOfTotal: 24,
			turnoverRate: 4.8,
			trend: 'up',
		},
		{
			id: '3',
			category: 'Home & Garden',
			itemCount: 623,
			value: 234000,
			percentOfTotal: 18,
			turnoverRate: 3.2,
			trend: 'stable',
		},
		{
			id: '4',
			category: 'Sports',
			itemCount: 412,
			value: 156000,
			percentOfTotal: 12,
			turnoverRate: 4.1,
			trend: 'down',
		},
		{
			id: '5',
			category: 'Beauty',
			itemCount: 534,
			value: 143000,
			percentOfTotal: 11,
			turnoverRate: 6.5,
			trend: 'up',
		},
	];

	const maxValue = Math.max(...categories.map((c) => c.value));
	const totalValue = categories.reduce((sum, c) => sum + c.value, 0);
	const totalItems = categories.reduce((sum, c) => sum + c.itemCount, 0);
	const avgTurnover = Number(
		(
			categories.reduce((sum, c) => sum + c.turnoverRate, 0) / categories.length
		).toFixed(1),
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Category Statistics
						</CardTitle>
						<CardDescription>
							Inventory value distribution by category
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<TotalStats
							totalValue={totalValue}
							totalItems={totalItems}
							avgTurnover={avgTurnover}
						/>
						<div className="space-y-4">
							{categories.map((stat) => (
								<CategoryRow key={stat.id} stat={stat} maxValue={maxValue} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
