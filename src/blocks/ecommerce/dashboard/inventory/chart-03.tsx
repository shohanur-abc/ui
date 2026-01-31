'use client';

import * as React from 'react';
import {
	ArrowUpDown,
	Package,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type TurnoverItem = {
	id: string;
	name: string;
	sku: string;
	category: string;
	sold: number;
	avgStock: number;
	turnoverRate: number;
	trend: number;
};

type SortField = 'turnoverRate' | 'sold' | 'avgStock';

type TurnoverBarProps = {
	item: TurnoverItem;
	maxRate: number;
};

const TurnoverBar = ({ item, maxRate }: TurnoverBarProps) => {
	const widthPercentage = (item.turnoverRate / maxRate) * 100;

	return (
		<div className="space-y-2 rounded-lg border p-4 transition-colors hover:bg-muted/50">
			<div className="flex items-start justify-between gap-3">
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<span className="truncate font-medium">{item.name}</span>
						<Badge variant="outline" className="shrink-0 text-xs">
							{item.category}
						</Badge>
					</div>
					<p className="text-xs text-muted-foreground">{item.sku}</p>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-xl font-bold tabular-nums">{item.turnoverRate.toFixed(1)}x</span>
					{item.trend !== 0 && (
						<Badge variant={item.trend > 0 ? 'default' : 'destructive'} className="gap-0.5 px-1">
							{item.trend > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
							{Math.abs(item.trend)}%
						</Badge>
					)}
				</div>
			</div>
			<div className="relative h-4 w-full overflow-hidden rounded-full bg-muted">
				<div
					className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>{item.sold.toLocaleString()} sold</span>
				<span>Avg. stock: {item.avgStock.toLocaleString()}</span>
			</div>
		</div>
	);
};

type SummaryCardProps = {
	label: string;
	value: string;
	description: string;
};

const SummaryCard = ({ label, value, description }: SummaryCardProps) => (
	<div className="rounded-lg border p-4">
		<p className="text-sm text-muted-foreground">{label}</p>
		<p className="text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{description}</p>
	</div>
);

export default function Main() {
	const [sortBy, setSortBy] = React.useState<SortField>('turnoverRate');

	const items: TurnoverItem[] = [
		{ id: '1', name: 'USB-C Cable', sku: 'USB-001', category: 'Accessories', sold: 4520, avgStock: 350, turnoverRate: 12.9, trend: 15 },
		{ id: '2', name: 'Phone Case', sku: 'PHC-002', category: 'Accessories', sold: 3890, avgStock: 420, turnoverRate: 9.3, trend: 8 },
		{ id: '3', name: 'Wireless Earbuds', sku: 'WE-003', category: 'Audio', sold: 2450, avgStock: 380, turnoverRate: 6.4, trend: -5 },
		{ id: '4', name: 'Power Bank', sku: 'PB-004', category: 'Electronics', sold: 1890, avgStock: 450, turnoverRate: 4.2, trend: 12 },
		{ id: '5', name: 'Bluetooth Speaker', sku: 'BS-005', category: 'Audio', sold: 1250, avgStock: 520, turnoverRate: 2.4, trend: -8 },
		{ id: '6', name: 'Smart Watch', sku: 'SW-006', category: 'Wearables', sold: 890, avgStock: 620, turnoverRate: 1.4, trend: 3 },
	];

	const sortedItems = [...items].sort((a, b) => b[sortBy] - a[sortBy]);
	const maxRate = Math.max(...items.map((i) => i.turnoverRate));
	const avgTurnover = items.reduce((sum, i) => sum + i.turnoverRate, 0) / items.length;
	const totalSold = items.reduce((sum, i) => sum + i.sold, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Inventory Turnover</CardTitle>
								<CardDescription>How quickly stock is sold and replaced</CardDescription>
							</div>
							<Select value={sortBy} onValueChange={(v) => setSortBy(v as SortField)}>
								<SelectTrigger className="w-40">
									<ArrowUpDown className="mr-2 size-4" />
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="turnoverRate">Turnover Rate</SelectItem>
									<SelectItem value="sold">Units Sold</SelectItem>
									<SelectItem value="avgStock">Average Stock</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							<SummaryCard
								label="Average Turnover"
								value={`${avgTurnover.toFixed(1)}x`}
								description="Across all products"
							/>
							<SummaryCard
								label="Total Sold"
								value={totalSold.toLocaleString()}
								description="Last 30 days"
							/>
							<SummaryCard
								label="Top Performer"
								value={sortedItems[0].name}
								description={`${sortedItems[0].turnoverRate.toFixed(1)}x turnover`}
							/>
						</div>
						<div className="space-y-3">
							{sortedItems.map((item) => (
								<TurnoverBar key={item.id} item={item} maxRate={maxRate} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
