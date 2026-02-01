'use client';

import { Diff } from 'lucide-react';
import { Area, AreaChart, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type ComparisonDataPoint = {
	time: string;
	actual: number;
	forecast: number;
};

type ForecastComparisonChartCardProps = {
	title: string;
	description: string;
	accuracy: number;
	data: ComparisonDataPoint[];
	config: ChartConfig;
};

const ForecastComparisonChartCard = ({
	title,
	description,
	accuracy,
	data,
	config,
}: ForecastComparisonChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Diff className="size-4" />
				</div>
				<div>
					<CardTitle className="text-base font-semibold">{title}</CardTitle>
					<p className="text-sm text-muted-foreground">{description}</p>
				</div>
			</div>
			<Badge variant="secondary" className="gap-1">
				{accuracy}% accuracy
			</Badge>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[300px] w-full">
				<AreaChart
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				>
					<defs>
						<linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-actual)"
								stopOpacity={0.4}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-actual)"
								stopOpacity={0}
							/>
						</linearGradient>
						<linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-forecast)"
								stopOpacity={0.2}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-forecast)"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
					<CartesianGrid strokeDasharray="3 3" className="stroke-border/50" />
					<XAxis
						dataKey="time"
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
					<Area
						type="monotone"
						dataKey="forecast"
						stroke="var(--color-forecast)"
						strokeWidth={2}
						strokeDasharray="5 5"
						fill="url(#forecastGradient)"
					/>
					<Area
						type="monotone"
						dataKey="actual"
						stroke="var(--color-actual)"
						strokeWidth={2}
						fill="url(#actualGradient)"
					/>
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: ComparisonDataPoint[] = [
		{ time: 'Week 1', actual: 32000, forecast: 30000 },
		{ time: 'Week 2', actual: 38000, forecast: 35000 },
		{ time: 'Week 3', actual: 42000, forecast: 45000 },
		{ time: 'Week 4', actual: 48000, forecast: 50000 },
		{ time: 'Week 5', actual: 52000, forecast: 52000 },
		{ time: 'Week 6', actual: 58000, forecast: 55000 },
		{ time: 'Week 7', actual: 62000, forecast: 60000 },
		{ time: 'Week 8', actual: 68000, forecast: 65000 },
	];

	const chartConfig: ChartConfig = {
		actual: { label: 'Actual', color: 'oklch(0.70 0.18 155)' },
		forecast: { label: 'Forecast', color: 'oklch(0.60 0.012 155)' },
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ForecastComparisonChartCard
					title="Forecast vs Actual"
					description="Revenue prediction accuracy"
					accuracy={94}
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
