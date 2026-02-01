'use client';

import { Calendar, TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Bar,
	BarChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
	CartesianGrid,
} from 'recharts';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type PeriodData = {
	period: string;
	revenue: number;
	orders: number;
	customers: number;
};

type ComparisonMetric = {
	label: string;
	current: string;
	previous: string;
	change: number;
};

type BentoLayout7Props = {
	chartData: PeriodData[];
	metrics: ComparisonMetric[];
	chartConfig: ChartConfig;
};

const ComparisonChart = ({
	data,
	config,
}: {
	data: PeriodData[];
	config: ChartConfig;
}) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2 @xl:row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Calendar className="size-4 text-muted-foreground" />
					<CardTitle className="text-sm font-medium">
						Weekly Performance
					</CardTitle>
				</div>
				<Badge variant="outline">Last 4 Weeks</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<ChartContainer config={config} className="h-[280px] w-full">
				<BarChart
					data={data}
					margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
				>
					<CartesianGrid
						strokeDasharray="3 3"
						className="stroke-border/50"
						vertical={false}
					/>
					<XAxis
						dataKey="period"
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
					<Bar
						dataKey="revenue"
						fill="var(--color-revenue)"
						radius={[4, 4, 0, 0]}
					/>
				</BarChart>
			</ChartContainer>
		</CardContent>
	</Card>
);

const MetricCard = ({ metric }: { metric: ComparisonMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-2xl font-bold">{metric.current}</p>
					<p className="text-xs text-muted-foreground flex items-center gap-1">
						<span>vs {metric.previous}</span>
						<ArrowRight className="size-3" />
					</p>
				</div>
				<Badge
					variant={metric.change >= 0 ? 'default' : 'destructive'}
					className="gap-1"
				>
					{metric.change >= 0 ? (
						<TrendingUp className="size-3" />
					) : (
						<TrendingDown className="size-3" />
					)}
					{Math.abs(metric.change)}%
				</Badge>
			</div>
		</CardContent>
	</Card>
);

const BentoLayout7 = ({
	chartData,
	metrics,
	chartConfig,
}: BentoLayout7Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		<ComparisonChart data={chartData} config={chartConfig} />
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} metric={metric} />
		))}
	</div>
);

export default function Main() {
	const chartData: PeriodData[] = [
		{ period: 'Week 1', revenue: 28500, orders: 285, customers: 142 },
		{ period: 'Week 2', revenue: 32400, orders: 324, customers: 168 },
		{ period: 'Week 3', revenue: 38200, orders: 382, customers: 195 },
		{ period: 'Week 4', revenue: 43480, orders: 435, customers: 218 },
	];

	const chartConfig: ChartConfig = {
		revenue: { label: 'Revenue', color: 'oklch(0.70 0.18 155)' },
	};

	const metrics: ComparisonMetric[] = [
		{
			label: 'Avg Weekly Revenue',
			current: '$35,645',
			previous: '$31,200',
			change: 14.2,
		},
		{
			label: 'Avg Weekly Orders',
			current: '356',
			previous: '312',
			change: 14.1,
		},
		{ label: 'Avg Order Value', current: '$100', previous: '$98', change: 2.0 },
		{
			label: 'Customer Retention',
			current: '72%',
			previous: '68%',
			change: 5.9,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout7
					chartData={chartData}
					metrics={metrics}
					chartConfig={chartConfig}
				/>
			</div>
		</section>
	);
}
