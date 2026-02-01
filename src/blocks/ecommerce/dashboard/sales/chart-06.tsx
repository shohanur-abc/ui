'use client';

import { Layers } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type StackedDataPoint = {
	date: string;
	desktop: number;
	mobile: number;
	tablet: number;
};

type StackedAreaChartCardProps = {
	title: string;
	description: string;
	data: StackedDataPoint[];
	config: ChartConfig;
};

const StackedAreaChartCard = ({
	title,
	description,
	data,
	config,
}: StackedAreaChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Layers className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<AreaChart
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
					stackOffset="expand"
				>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
					<XAxis
						dataKey="date"
						tickLine={false}
						axisLine={false}
						className="text-xs"
					/>
					<YAxis
						tickLine={false}
						axisLine={false}
						tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
						className="text-xs"
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area
						type="monotone"
						dataKey="desktop"
						stackId="1"
						stroke="var(--color-desktop)"
						fill="var(--color-desktop)"
						fillOpacity={0.6}
					/>
					<Area
						type="monotone"
						dataKey="mobile"
						stackId="1"
						stroke="var(--color-mobile)"
						fill="var(--color-mobile)"
						fillOpacity={0.6}
					/>
					<Area
						type="monotone"
						dataKey="tablet"
						stackId="1"
						stroke="var(--color-tablet)"
						fill="var(--color-tablet)"
						fillOpacity={0.6}
					/>
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: StackedDataPoint[] = [
		{ date: 'Jan', desktop: 4200, mobile: 2800, tablet: 1000 },
		{ date: 'Feb', desktop: 4800, mobile: 3200, tablet: 1200 },
		{ date: 'Mar', desktop: 5200, mobile: 3800, tablet: 1100 },
		{ date: 'Apr', desktop: 5800, mobile: 4200, tablet: 1300 },
		{ date: 'May', desktop: 6200, mobile: 4800, tablet: 1400 },
		{ date: 'Jun', desktop: 7000, mobile: 5200, tablet: 1500 },
	];

	const chartConfig: ChartConfig = {
		desktop: { label: 'Desktop', color: 'oklch(0.70 0.18 155)' },
		mobile: { label: 'Mobile', color: 'oklch(0.65 0.16 175)' },
		tablet: { label: 'Tablet', color: 'oklch(0.62 0.14 200)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<StackedAreaChartCard
					title="Sales by Device"
					description="Revenue breakdown by device type"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
