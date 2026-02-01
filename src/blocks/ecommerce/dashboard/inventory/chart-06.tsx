'use client';

import * as React from 'react';
import { Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type Category = {
	id: string;
	name: string;
	value: number;
	percentage: number;
	color: string;
	change: number;
};

type DonutChartProps = {
	categories: Category[];
	centerValue: string;
	centerLabel: string;
};

const DonutChart = ({
	categories,
	centerValue,
	centerLabel,
}: DonutChartProps) => {
	let cumulativePercent = 0;

	const getCoordinatesForPercent = (percent: number) => {
		const x = Math.cos(2 * Math.PI * percent);
		const y = Math.sin(2 * Math.PI * percent);
		return [x, y];
	};

	return (
		<div className="relative mx-auto w-48 h-48">
			<svg viewBox="-1 -1 2 2" className="w-full h-full -rotate-90">
				{categories.map((cat, index) => {
					const [startX, startY] = getCoordinatesForPercent(cumulativePercent);
					cumulativePercent += cat.percentage / 100;
					const [endX, endY] = getCoordinatesForPercent(cumulativePercent);
					const largeArcFlag = cat.percentage > 50 ? 1 : 0;

					const pathData = [
						`M ${startX} ${startY}`,
						`A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
						'L 0 0',
					].join(' ');

					return (
						<path
							key={cat.id}
							d={pathData}
							fill={cat.color}
							className="transition-opacity hover:opacity-80"
						/>
					);
				})}
				<circle cx="0" cy="0" r="0.6" fill="hsl(var(--card))" />
			</svg>
			<div className="absolute inset-0 flex flex-col items-center justify-center">
				<span className="text-2xl font-bold">{centerValue}</span>
				<span className="text-xs text-muted-foreground">{centerLabel}</span>
			</div>
		</div>
	);
};

type LegendItemProps = {
	category: Category;
};

const LegendItem = ({ category }: LegendItemProps) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-2">
			<div
				className="size-3 rounded-full"
				style={{ backgroundColor: category.color }}
			/>
			<span className="font-medium">{category.name}</span>
		</div>
		<div className="flex items-center gap-3">
			<span className="tabular-nums">
				${(category.value / 1000).toFixed(0)}K
			</span>
			<Badge
				variant={category.change >= 0 ? 'default' : 'destructive'}
				className="w-16 justify-center"
			>
				{category.change >= 0 ? '+' : ''}
				{category.change}%
			</Badge>
		</div>
	</div>
);

export default function Main() {
	const categories: Category[] = [
		{
			id: '1',
			name: 'Electronics',
			value: 456000,
			percentage: 35,
			color: 'hsl(var(--primary))',
			change: 12,
		},
		{
			id: '2',
			name: 'Apparel',
			value: 312000,
			percentage: 24,
			color: 'hsl(221 83% 53%)',
			change: 8,
		},
		{
			id: '3',
			name: 'Home & Garden',
			value: 234000,
			percentage: 18,
			color: 'hsl(142 76% 36%)',
			change: -3,
		},
		{
			id: '4',
			name: 'Sports',
			value: 156000,
			percentage: 12,
			color: 'hsl(45 93% 47%)',
			change: 15,
		},
		{
			id: '5',
			name: 'Beauty',
			value: 143000,
			percentage: 11,
			color: 'hsl(280 68% 60%)',
			change: 5,
		},
	];

	const totalValue = categories.reduce((sum, c) => sum + c.value, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Inventory by Category
						</CardTitle>
						<CardDescription>
							Value distribution across product categories
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid gap-8 @lg:grid-cols-2">
							<div className="flex items-center justify-center">
								<DonutChart
									categories={categories}
									centerValue={`$${(totalValue / 1000000).toFixed(1)}M`}
									centerLabel="Total Value"
								/>
							</div>
							<div className="divide-y">
								{categories.map((category) => (
									<LegendItem key={category.id} category={category} />
								))}
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
