'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Line,
	ComposedChart,
	XAxis,
	YAxis,
} from 'recharts';

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
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type ChartDataItem = {
	month: string;
	revenue: number;
	orders: number;
	avgOrderValue: number;
};

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'var(--chart-1)',
	},
	orders: {
		label: 'Orders',
		color: 'var(--chart-2)',
	},
	avgOrderValue: {
		label: 'Avg Order Value',
		color: 'var(--chart-4)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ month: 'Jan', revenue: 24500, orders: 320, avgOrderValue: 76.5 },
		{ month: 'Feb', revenue: 28200, orders: 385, avgOrderValue: 73.2 },
		{ month: 'Mar', revenue: 32100, orders: 420, avgOrderValue: 76.4 },
		{ month: 'Apr', revenue: 35800, orders: 458, avgOrderValue: 78.2 },
		{ month: 'May', revenue: 33400, orders: 425, avgOrderValue: 78.6 },
		{ month: 'Jun', revenue: 38900, orders: 492, avgOrderValue: 79.1 },
		{ month: 'Jul', revenue: 45200, orders: 568, avgOrderValue: 79.6 },
		{ month: 'Aug', revenue: 42100, orders: 524, avgOrderValue: 80.3 },
		{ month: 'Sep', revenue: 48600, orders: 598, avgOrderValue: 81.3 },
		{ month: 'Oct', revenue: 54200, orders: 658, avgOrderValue: 82.4 },
		{ month: 'Nov', revenue: 62400, orders: 748, avgOrderValue: 83.4 },
		{ month: 'Dec', revenue: 72100, orders: 856, avgOrderValue: 84.2 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="text-lg">Performance Overview</CardTitle>
						<CardDescription>
							Revenue, orders, and average order value trends
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[340px] w-full">
							<ComposedChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									yAxisId="left"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<YAxis
									yAxisId="right"
									orientation="right"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value}`}
								/>
								<ChartTooltip
									content={<ChartTooltipContent indicator="dot" />}
								/>
								<ChartLegend content={<ChartLegendContent />} />
								<Bar
									yAxisId="left"
									dataKey="revenue"
									fill="var(--color-revenue)"
									radius={[4, 4, 0, 0]}
									opacity={0.8}
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="avgOrderValue"
									stroke="var(--color-avgOrderValue)"
									strokeWidth={2}
									dot={{ fill: 'var(--color-avgOrderValue)', r: 3 }}
								/>
							</ComposedChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
