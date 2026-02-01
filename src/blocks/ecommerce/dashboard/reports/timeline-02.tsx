'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { TrendingUp, TrendingDown, Users } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';

type GrowthData = {
	quarter: string;
	newCustomers: number;
	returning: number;
	churned: number;
};

type MetricCardProps = {
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down';
};

const MetricCard = ({ label, value, change, trend }: MetricCardProps) => (
	<Card className="border-border/30 bg-card/60">
		<CardContent className="p-4">
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="mt-1 text-2xl font-bold">{value}</p>
			<Badge
				variant="outline"
				className={
					trend === 'up'
						? 'mt-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
						: 'mt-2 border-rose-500/20 bg-rose-500/10 text-rose-500'
				}
			>
				{trend === 'up' ? (
					<TrendingUp className="mr-1 size-3" />
				) : (
					<TrendingDown className="mr-1 size-3" />
				)}
				{change > 0 ? '+' : ''}
				{change}%
			</Badge>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	newCustomers: {
		label: 'New Customers',
		color: 'var(--chart-1)',
	},
	returning: {
		label: 'Returning',
		color: 'var(--chart-2)',
	},
	churned: {
		label: 'Churned',
		color: 'var(--chart-5)',
	},
};

export default function Main() {
	const metrics: MetricCardProps[] = [
		{ label: 'Total Customers', value: '42,850', change: 18.5, trend: 'up' },
		{ label: 'New This Year', value: '12,450', change: 22.4, trend: 'up' },
		{ label: 'Returning Rate', value: '68%', change: 5.2, trend: 'up' },
		{ label: 'Churn Rate', value: '4.2%', change: -1.8, trend: 'down' },
	];

	const chartData: GrowthData[] = [
		{ quarter: 'Q1 2023', newCustomers: 2450, returning: 5800, churned: 280 },
		{ quarter: 'Q2 2023', newCustomers: 2850, returning: 6200, churned: 320 },
		{ quarter: 'Q3 2023', newCustomers: 3120, returning: 6800, churned: 290 },
		{ quarter: 'Q4 2023', newCustomers: 3580, returning: 7400, churned: 350 },
		{ quarter: 'Q1 2024', newCustomers: 2980, returning: 7800, churned: 310 },
		{ quarter: 'Q2 2024', newCustomers: 3420, returning: 8400, churned: 340 },
		{ quarter: 'Q3 2024', newCustomers: 3850, returning: 9200, churned: 320 },
		{ quarter: 'Q4 2024', newCustomers: 4200, returning: 9800, churned: 380 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Users className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Customer Growth Timeline
								</CardTitle>
								<CardDescription>
									Quarterly customer acquisition and retention trends
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<MetricCard key={i} {...m} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="quarter"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis tickLine={false} axisLine={false} tickMargin={8} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Area
									type="monotone"
									dataKey="newCustomers"
									stroke="var(--color-newCustomers)"
									fill="var(--color-newCustomers)"
									fillOpacity={0.3}
									stackId="1"
								/>
								<Area
									type="monotone"
									dataKey="returning"
									stroke="var(--color-returning)"
									fill="var(--color-returning)"
									fillOpacity={0.3}
									stackId="2"
								/>
							</AreaChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
