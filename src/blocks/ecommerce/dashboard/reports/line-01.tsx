'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';

type RevenueData = {
	date: string;
	thisYear: number;
	lastYear: number;
};

type MetricProps = {
	label: string;
	value: string;
	change: string;
	positive: boolean;
};

const Metric = ({ label, value, change, positive }: MetricProps) => (
	<div>
		<p className="text-xs text-muted-foreground">{label}</p>
		<p className="text-lg font-bold @sm:text-xl">{value}</p>
		<p className={`text-xs ${positive ? 'text-emerald-500' : 'text-rose-500'}`}>
			{change}
		</p>
	</div>
);

const chartConfig: ChartConfig = {
	thisYear: {
		label: 'This Year',
		color: 'var(--chart-1)',
	},
	lastYear: {
		label: 'Last Year',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const metrics: MetricProps[] = [
		{ label: 'Total Revenue', value: '$1.24M', change: '+18.5% vs last year', positive: true },
		{ label: 'Avg Monthly', value: '$103.3K', change: '+15.2% growth', positive: true },
	];

	const chartData: RevenueData[] = [
		{ date: 'Jan', thisYear: 86000, lastYear: 72000 },
		{ date: 'Feb', thisYear: 92000, lastYear: 78000 },
		{ date: 'Mar', thisYear: 108000, lastYear: 85000 },
		{ date: 'Apr', thisYear: 98000, lastYear: 89000 },
		{ date: 'May', thisYear: 115000, lastYear: 92000 },
		{ date: 'Jun', thisYear: 128000, lastYear: 98000 },
		{ date: 'Jul', thisYear: 118000, lastYear: 102000 },
		{ date: 'Aug', thisYear: 132000, lastYear: 108000 },
		{ date: 'Sep', thisYear: 142000, lastYear: 112000 },
		{ date: 'Oct', thisYear: 138000, lastYear: 118000 },
		{ date: 'Nov', thisYear: 156000, lastYear: 125000 },
		{ date: 'Dec', thisYear: 172000, lastYear: 145000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Revenue Trend Report
							</CardTitle>
							<CardDescription>
								Year-over-year revenue comparison
							</CardDescription>
						</div>
						<div className="flex gap-6">
							{metrics.map((metric, i) => (
								<Metric key={i} {...metric} />
							))}
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="date"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									type="monotone"
									dataKey="thisYear"
									stroke="var(--color-thisYear)"
									strokeWidth={2.5}
									dot={false}
									activeDot={{ r: 6, strokeWidth: 2 }}
								/>
								<Line
									type="monotone"
									dataKey="lastYear"
									stroke="var(--color-lastYear)"
									strokeWidth={2}
									strokeDasharray="5 5"
									dot={false}
									activeDot={{ r: 5, strokeWidth: 2 }}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
