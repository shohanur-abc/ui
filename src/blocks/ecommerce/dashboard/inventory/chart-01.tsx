'use client';

import * as React from 'react';
import {
	TrendingUp,
	TrendingDown,
	Package,
	DollarSign,
	AlertTriangle,
	BarChart3,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';

type ChartDataPoint = {
	label: string;
	value: number;
	previousValue?: number;
};

type BarChartProps = {
	data: ChartDataPoint[];
	maxValue: number;
	showTrend?: boolean;
};

const BarChart = ({ data, maxValue, showTrend }: BarChartProps) => (
	<div className="space-y-3">
		{data.map((item) => {
			const percentage = (item.value / maxValue) * 100;
			const previousPercentage = item.previousValue ? (item.previousValue / maxValue) * 100 : 0;
			const trend = item.previousValue ? ((item.value - item.previousValue) / item.previousValue) * 100 : 0;

			return (
				<div key={item.label} className="space-y-1">
					<div className="flex items-center justify-between">
						<span className="text-sm font-medium">{item.label}</span>
						<div className="flex items-center gap-2">
							<span className="font-semibold tabular-nums">{item.value.toLocaleString()}</span>
							{showTrend && item.previousValue && (
								<Badge
									variant={trend >= 0 ? 'default' : 'destructive'}
									className="gap-0.5 px-1 py-0 text-[10px]"
								>
									{trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
									{Math.abs(trend).toFixed(0)}%
								</Badge>
							)}
						</div>
					</div>
					<div className="relative h-6 w-full overflow-hidden rounded bg-muted">
						{item.previousValue && (
							<div
								className="absolute inset-y-0 left-0 bg-primary/30"
								style={{ width: `${previousPercentage}%` }}
							/>
						)}
						<div
							className="absolute inset-y-0 left-0 rounded bg-gradient-to-r from-primary to-primary/70 transition-all duration-500"
							style={{ width: `${percentage}%` }}
						/>
					</div>
				</div>
			);
		})}
	</div>
);

type DonutChartProps = {
	data: { label: string; value: number; color: string }[];
	centerLabel: string;
	centerValue: string;
};

const DonutChart = ({ data, centerLabel, centerValue }: DonutChartProps) => {
	const total = data.reduce((sum, d) => sum + d.value, 0);
	let cumulativePercentage = 0;

	const segments = data.map((item) => {
		const percentage = (item.value / total) * 100;
		const strokeDasharray = `${percentage} ${100 - percentage}`;
		const strokeDashoffset = -cumulativePercentage;
		cumulativePercentage += percentage;
		return { ...item, strokeDasharray, strokeDashoffset };
	});

	return (
		<div className="relative mx-auto size-48">
			<svg viewBox="0 0 36 36" className="size-full -rotate-90">
				{segments.map((segment, i) => (
					<circle
						key={i}
						cx="18"
						cy="18"
						r="15.9"
						fill="none"
						stroke={segment.color}
						strokeWidth="3"
						strokeDasharray={segment.strokeDasharray}
						strokeDashoffset={segment.strokeDashoffset}
						className="transition-all duration-500"
					/>
				))}
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-2xl font-bold">{centerValue}</span>
				<span className="text-sm text-muted-foreground">{centerLabel}</span>
			</div>
		</div>
	);
};

type LegendProps = {
	items: { label: string; value: number; color: string }[];
};

const Legend = ({ items }: LegendProps) => (
	<div className="space-y-2">
		{items.map((item) => (
			<div key={item.label} className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="size-3 rounded-full" style={{ backgroundColor: item.color }} />
					<span className="text-sm">{item.label}</span>
				</div>
				<span className="font-medium tabular-nums">{item.value.toLocaleString()}</span>
			</div>
		))}
	</div>
);

export default function Main() {
	const stockByCategory: ChartDataPoint[] = [
		{ label: 'Electronics', value: 4520, previousValue: 4100 },
		{ label: 'Accessories', value: 3240, previousValue: 3500 },
		{ label: 'Audio', value: 2180, previousValue: 1950 },
		{ label: 'Peripherals', value: 1890, previousValue: 1750 },
		{ label: 'Wearables', value: 1250, previousValue: 1100 },
	];

	const stockStatus = [
		{ label: 'In Stock', value: 8420, color: 'hsl(var(--chart-1))' },
		{ label: 'Low Stock', value: 1250, color: 'hsl(var(--chart-2))' },
		{ label: 'Out of Stock', value: 320, color: 'hsl(var(--chart-3))' },
		{ label: 'Incoming', value: 890, color: 'hsl(var(--chart-4))' },
	];

	const totalItems = stockStatus.reduce((sum, s) => sum + s.value, 0);
	const maxCategoryValue = Math.max(...stockByCategory.map((d) => d.value));

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Inventory Overview</CardTitle>
						<CardDescription>Stock distribution and status breakdown</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="category" className="w-full">
							<TabsList>
								<TabsTrigger value="category">By Category</TabsTrigger>
								<TabsTrigger value="status">By Status</TabsTrigger>
							</TabsList>
							<TabsContent value="category" className="mt-6">
								<BarChart
									data={stockByCategory}
									maxValue={maxCategoryValue}
									showTrend
								/>
							</TabsContent>
							<TabsContent value="status" className="mt-6">
								<div className="grid gap-6 @lg:grid-cols-2">
									<DonutChart
										data={stockStatus}
										centerLabel="Total Items"
										centerValue={totalItems.toLocaleString()}
									/>
									<Legend items={stockStatus} />
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
