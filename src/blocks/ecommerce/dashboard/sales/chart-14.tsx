'use client';

import { Combine } from 'lucide-react';
import {
	Bar,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	ComposedChart,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ComposedDataPoint = {
	month: string;
	revenue: number;
	orders: number;
	avgOrder: number;
};

type ComposedChartCardProps = {
	title: string;
	description: string;
	data: ComposedDataPoint[];
	config: ChartConfig;
};

const ComposedChartCard = ({
	title,
	description,
	data,
	config,
}: ComposedChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Combine className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<ComposedChart
					data={data}
					margin={{ top: 20, right: 30, bottom: 20, left: 20 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						className="stroke-border/50"
						vertical={false}
					/>
					<XAxis
						dataKey="month"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<YAxis
						yAxisId="left"
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value / 1000}k`}
						className="text-xs"
					/>
					<YAxis
						yAxisId="right"
						orientation="right"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar
						yAxisId="left"
						dataKey="revenue"
						fill="var(--color-revenue)"
						radius={[4, 4, 0, 0]}
						fillOpacity={0.8}
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="orders"
						stroke="var(--color-orders)"
						strokeWidth={3}
						dot={{ fill: 'var(--color-orders)', strokeWidth: 2, r: 4 }}
					/>
					<Line
						yAxisId="right"
						type="monotone"
						dataKey="avgOrder"
						stroke="var(--color-avgOrder)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
					/>
				</ComposedChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: ComposedDataPoint[] = [
		{ month: 'Jan', revenue: 42000, orders: 480, avgOrder: 87 },
		{ month: 'Feb', revenue: 48000, orders: 520, avgOrder: 92 },
		{ month: 'Mar', revenue: 52000, orders: 560, avgOrder: 93 },
		{ month: 'Apr', revenue: 58000, orders: 610, avgOrder: 95 },
		{ month: 'May', revenue: 65000, orders: 680, avgOrder: 96 },
		{ month: 'Jun', revenue: 72000, orders: 750, avgOrder: 96 },
	];

	const chartConfig: ChartConfig = {
		revenue: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
		orders: { label: 'Orders', color: 'oklch(0.65 0.16 175)' },
		avgOrder: { label: 'Avg Order', color: 'oklch(0.62 0.14 200)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ComposedChartCard
					title="Combined Metrics"
					description="Revenue, orders, and average order value"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
