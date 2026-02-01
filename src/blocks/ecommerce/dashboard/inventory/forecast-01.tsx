'use client';

import * as React from 'react';
import {
	Package,
	ShoppingCart,
	TrendingUp,
	TrendingDown,
	BarChart3,
	RefreshCw,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type ForecastItem = {
	id: string;
	name: string;
	sku: string;
	currentStock: number;
	predictedDemand: number;
	suggestedReorder: number;
	confidence: number;
	trend: 'up' | 'down' | 'stable';
	daysUntilStockout: number | null;
};

type TrendIconProps = {
	trend: 'up' | 'down' | 'stable';
};

const TrendIcon = ({ trend }: TrendIconProps) => {
	if (trend === 'up') return <TrendingUp className="size-4 text-emerald-500" />;
	if (trend === 'down') return <TrendingDown className="size-4 text-red-500" />;
	return <RefreshCw className="size-4 text-muted-foreground" />;
};

type ForecastRowProps = {
	item: ForecastItem;
};

const ForecastRow = ({ item }: ForecastRowProps) => {
	const getStockoutColor = (days: number | null) => {
		if (days === null) return 'text-emerald-500';
		if (days <= 7) return 'text-destructive';
		if (days <= 14) return 'text-amber-500';
		return 'text-muted-foreground';
	};

	return (
		<div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Package className="size-5 text-muted-foreground" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.sku}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Current</p>
				<p className="font-semibold tabular-nums">{item.currentStock}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Predicted (30d)</p>
				<div className="flex items-center justify-center gap-1">
					<TrendIcon trend={item.trend} />
					<p className="font-semibold tabular-nums">{item.predictedDemand}</p>
				</div>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Stockout in</p>
				<p
					className={`font-semibold tabular-nums ${getStockoutColor(item.daysUntilStockout)}`}
				>
					{item.daysUntilStockout === null
						? 'Safe'
						: `${item.daysUntilStockout}d`}
				</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Confidence</p>
				<Badge variant="secondary">{item.confidence}%</Badge>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Reorder Qty</p>
				<p className="font-semibold text-primary tabular-nums">
					{item.suggestedReorder}
				</p>
			</div>
			<Button size="sm">
				<ShoppingCart className="mr-2 size-4" />
				Reorder
			</Button>
		</div>
	);
};

type SummaryProps = {
	totalItems: number;
	atRisk: number;
	avgConfidence: number;
};

const Summary = ({ totalItems, atRisk, avgConfidence }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Products Analyzed</span>
			</div>
			<p className="mt-2 text-2xl font-bold">{totalItems}</p>
		</div>
		<div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
			<div className="flex items-center gap-2">
				<TrendingDown className="size-5 text-amber-500" />
				<span className="text-sm text-muted-foreground">At Risk (14 days)</span>
			</div>
			<p className="mt-2 text-2xl font-bold text-amber-500">{atRisk}</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<BarChart3 className="size-5 text-emerald-500" />
				<span className="text-sm text-muted-foreground">Avg. Confidence</span>
			</div>
			<p className="mt-2 text-2xl font-bold text-emerald-500">
				{avgConfidence}%
			</p>
		</div>
	</div>
);

export default function Main() {
	const items: ForecastItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			currentStock: 245,
			predictedDemand: 320,
			suggestedReorder: 150,
			confidence: 92,
			trend: 'up',
			daysUntilStockout: 23,
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			currentStock: 89,
			predictedDemand: 180,
			suggestedReorder: 200,
			confidence: 88,
			trend: 'up',
			daysUntilStockout: 12,
		},
		{
			id: '3',
			name: 'Bluetooth Speaker',
			sku: 'BS-001',
			currentStock: 156,
			predictedDemand: 95,
			suggestedReorder: 0,
			confidence: 85,
			trend: 'down',
			daysUntilStockout: null,
		},
		{
			id: '4',
			name: 'Power Bank 20000mAh',
			sku: 'PB-001',
			currentStock: 34,
			predictedDemand: 120,
			suggestedReorder: 150,
			confidence: 78,
			trend: 'stable',
			daysUntilStockout: 6,
		},
		{
			id: '5',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			currentStock: 567,
			predictedDemand: 280,
			suggestedReorder: 0,
			confidence: 91,
			trend: 'stable',
			daysUntilStockout: null,
		},
	];

	const atRiskCount = items.filter(
		(i) => i.daysUntilStockout !== null && i.daysUntilStockout <= 14,
	).length;
	const avgConfidence = Math.round(
		items.reduce((sum, i) => sum + i.confidence, 0) / items.length,
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Demand Forecast
								</CardTitle>
								<CardDescription>
									AI-powered inventory predictions for the next 30 days
								</CardDescription>
							</div>
							<Button variant="outline">
								<RefreshCw className="mr-2 size-4" />
								Refresh Forecast
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary
							totalItems={items.length}
							atRisk={atRiskCount}
							avgConfidence={avgConfidence}
						/>
						<div className="space-y-2">
							{items.map((item) => (
								<ForecastRow key={item.id} item={item} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
