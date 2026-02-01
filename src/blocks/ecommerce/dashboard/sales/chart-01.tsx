'use client';

import { TrendingUp } from 'lucide-react';
import {
	Area,
	AreaChart,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ChartDataPoint = {
	date: string;
	revenue: number;
	orders: number;
};

type AreaChartCardProps = {
	title: string;
	description: string;
	data: ChartDataPoint[];
	config: ChartConfig;
};

const AreaChartCard = ({
	title,
	description,
	data,
	config,
}: AreaChartCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<TrendingUp className="size-4" />
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
				>
					<defs>
						<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
							<stop
								offset="5%"
								stopColor="var(--color-revenue)"
								stopOpacity={0.4}
							/>
							<stop
								offset="95%"
								stopColor="var(--color-revenue)"
								stopOpacity={0}
							/>
						</linearGradient>
					</defs>
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
						tickFormatter={(value) => `$${value / 1000}k`}
						className="text-xs"
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Area
						type="monotone"
						dataKey="revenue"
						stroke="var(--color-revenue)"
						strokeWidth={2}
						fill="url(#revenueGradient)"
					/>
				</AreaChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

export default function Main() {
	const chartData: ChartDataPoint[] = [
		{ date: 'Jan 1', revenue: 12500, orders: 125 },
		{ date: 'Jan 5', revenue: 18200, orders: 182 },
		{ date: 'Jan 10', revenue: 15800, orders: 158 },
		{ date: 'Jan 15', revenue: 22400, orders: 224 },
		{ date: 'Jan 20', revenue: 28900, orders: 289 },
		{ date: 'Jan 25', revenue: 24500, orders: 245 },
		{ date: 'Jan 31', revenue: 32100, orders: 321 },
	];

	const chartConfig: ChartConfig = {
		revenue: {
			label: 'Revenue',
			color: 'oklch(0.70 0.18 155)',
		},
	};

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<AreaChartCard
					title="Revenue Trend"
					description="Monthly revenue performance"
					data={chartData}
					config={chartConfig}
				/>
			</div>
		</section>
	);
}
