'use client';

import * as React from 'react';
import { TrendingUp, TrendingDown, Calendar } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type DataPoint = {
	date: string;
	value: number;
};

type TimeRange = '7d' | '30d' | '90d' | '1y';

type LineChartProps = {
	data: DataPoint[];
	height: number;
	showArea?: boolean;
};

const LineChart = ({ data, height, showArea }: LineChartProps) => {
	const maxValue = Math.max(...data.map((d) => d.value));
	const minValue = Math.min(...data.map((d) => d.value));
	const range = maxValue - minValue;
	const padding = range * 0.1;

	const points = data.map((d, i) => ({
		x: (i / (data.length - 1)) * 100,
		y: ((maxValue + padding - d.value) / (range + padding * 2)) * 100,
	}));

	const pathD = points
		.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
		.join(' ');

	const areaD = `${pathD} L 100 100 L 0 100 Z`;

	return (
		<div className="relative" style={{ height }}>
			<svg
				viewBox="0 0 100 100"
				preserveAspectRatio="none"
				className="size-full"
			>
				{/* Grid lines */}
				{[0, 25, 50, 75, 100].map((y) => (
					<line
						key={y}
						x1="0"
						y1={y}
						x2="100"
						y2={y}
						stroke="currentColor"
						strokeWidth="0.2"
						className="text-muted"
					/>
				))}
				{/* Area fill */}
				{showArea && (
					<path d={areaD} fill="url(#gradient)" className="opacity-30" />
				)}
				{/* Line */}
				<path
					d={pathD}
					fill="none"
					stroke="hsl(var(--primary))"
					strokeWidth="0.8"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
				{/* Points */}
				{points.map((p, i) => (
					<circle
						key={i}
						cx={p.x}
						cy={p.y}
						r="1"
						fill="hsl(var(--primary))"
						className="transition-all hover:r-2"
					/>
				))}
				<defs>
					<linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
						<stop offset="0%" stopColor="hsl(var(--primary))" />
						<stop
							offset="100%"
							stopColor="hsl(var(--primary))"
							stopOpacity="0"
						/>
					</linearGradient>
				</defs>
			</svg>
			{/* Y-axis labels */}
			<div className="absolute left-0 top-0 flex h-full flex-col justify-between text-xs text-muted-foreground">
				<span>{maxValue.toLocaleString()}</span>
				<span>{Math.round((maxValue + minValue) / 2).toLocaleString()}</span>
				<span>{minValue.toLocaleString()}</span>
			</div>
		</div>
	);
};

type StatsRowProps = {
	items: { label: string; value: string; change: number }[];
};

const StatsRow = ({ items }: StatsRowProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		{items.map((item) => (
			<div key={item.label} className="rounded-lg border p-4">
				<p className="text-sm text-muted-foreground">{item.label}</p>
				<div className="mt-1 flex items-center justify-between">
					<span className="text-2xl font-bold">{item.value}</span>
					<Badge
						variant={item.change >= 0 ? 'default' : 'destructive'}
						className="gap-0.5"
					>
						{item.change >= 0 ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(item.change)}%
					</Badge>
				</div>
			</div>
		))}
	</div>
);

export default function Main() {
	const [timeRange, setTimeRange] = React.useState<TimeRange>('30d');

	const stockData: DataPoint[] = [
		{ date: '2024-01-01', value: 12500 },
		{ date: '2024-01-05', value: 13200 },
		{ date: '2024-01-10', value: 12800 },
		{ date: '2024-01-15', value: 14500 },
		{ date: '2024-01-20', value: 13900 },
		{ date: '2024-01-25', value: 15200 },
		{ date: '2024-01-30', value: 14800 },
	];

	const stats = [
		{ label: 'Current Stock', value: '14,800', change: 8.2 },
		{ label: 'Avg Daily Sales', value: '245', change: 12.5 },
		{ label: 'Stock Turnover', value: '5.2x', change: -3.1 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Stock Trend
								</CardTitle>
								<CardDescription>Inventory levels over time</CardDescription>
							</div>
							<Select
								value={timeRange}
								onValueChange={(v) => setTimeRange(v as TimeRange)}
							>
								<SelectTrigger className="w-32">
									<Calendar className="mr-2 size-4" />
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="7d">7 days</SelectItem>
									<SelectItem value="30d">30 days</SelectItem>
									<SelectItem value="90d">90 days</SelectItem>
									<SelectItem value="1y">1 year</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<StatsRow items={stats} />
						<div className="pl-12">
							<LineChart data={stockData} height={200} showArea />
						</div>
						<div className="flex justify-between text-xs text-muted-foreground">
							{stockData.map((d) => (
								<span key={d.date}>
									{new Date(d.date).toLocaleDateString('en-US', {
										month: 'short',
										day: 'numeric',
									})}
								</span>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
