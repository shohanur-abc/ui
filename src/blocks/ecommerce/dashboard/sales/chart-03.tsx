'use client';

import { Activity } from 'lucide-react';
import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type LineDataPoint = {
	month: string;
	current: number;
	previous: number;
};

type LineChartCardProps = {
	title: string;
	description: string;
	data: LineDataPoint[];
	config: ChartConfig;
};

const LineChartCard = ({
	title,
	description,
	data,
	config,
}: LineChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Activity className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<LineChart
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
					<XAxis
						dataKey="month"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `$${value / 1000}k`}
						className="text-xs"
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Line
						type="monotone"
						dataKey="current"
						stroke="var(--color-current)"
						strokeWidth={3}
						dot={{ fill: 'var(--color-current)', strokeWidth: 2, r: 4 }}
						activeDot={{ r: 6, strokeWidth: 2 }}
					/>
					<Line
						type="monotone"
						dataKey="previous"
						stroke="var(--color-previous)"
						strokeWidth={2}
						strokeDasharray="5 5"
						dot={false}
					/>
				</LineChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: LineDataPoint[] = [
		{ month: 'Jan', current: 42000, previous: 35000 },
		{ month: 'Feb', current: 48000, previous: 38000 },
		{ month: 'Mar', current: 52000, previous: 42000 },
		{ month: 'Apr', current: 58000, previous: 48000 },
		{ month: 'May', current: 65000, previous: 52000 },
		{ month: 'Jun', current: 72000, previous: 58000 },
	];

	const chartConfig: ChartConfig = {
		current: {
			label: 'This Year',
			color: 'oklch(0.70 0.18 155)',
		},
		previous: {
			label: 'Last Year',
			color: 'oklch(0.60 0.012 155)',
		},
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<LineChartCard
					title="Year over Year Comparison"
					description="Revenue comparison with previous year"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
