'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
} from '@/components/ui/chart';

type GrowthData = {
	quarter: string;
	growth: number;
};

type StatItemProps = {
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
};

const StatItem = ({ label, value, change, trend }: StatItemProps) => (
	<div className="rounded-lg bg-muted/50 p-4">
		<p className="text-xs text-muted-foreground">{label}</p>
		<p className="text-xl font-bold @sm:text-2xl">{value}</p>
		<div
			className={`mt-1 flex items-center gap-1 text-sm ${trend === 'up' ? 'text-emerald-500' : 'text-rose-500'}`}
		>
			{trend === 'up' ? (
				<TrendingUp className="size-3" />
			) : (
				<TrendingDown className="size-3" />
			)}
			{change}
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	growth: {
		label: 'Growth %',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const stats: StatItemProps[] = [
		{ label: 'Avg Growth Rate', value: '18.4%', change: '+2.1% YoY', trend: 'up' },
		{ label: 'Best Quarter', value: 'Q4 2025', change: '+28.5%', trend: 'up' },
		{ label: 'Lowest Quarter', value: 'Q2 2024', change: '-8.2%', trend: 'down' },
	];

	const chartData: GrowthData[] = [
		{ quarter: 'Q1 24', growth: 12.5 },
		{ quarter: 'Q2 24', growth: -8.2 },
		{ quarter: 'Q3 24', growth: 15.8 },
		{ quarter: 'Q4 24', growth: 22.4 },
		{ quarter: 'Q1 25', growth: 18.9 },
		{ quarter: 'Q2 25', growth: 14.2 },
		{ quarter: 'Q3 25', growth: 21.6 },
		{ quarter: 'Q4 25', growth: 28.5 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<div className="flex items-start justify-between">
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Quarterly Growth Report
								</CardTitle>
								<CardDescription>
									Revenue growth percentage by quarter
								</CardDescription>
							</div>
							<Badge
								variant="outline"
								className="border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
							>
								<TrendingUp className="mr-1 size-3" />
								+28.5% Current
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							{stats.map((stat, i) => (
								<StatItem key={i} {...stat} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[300px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="quarter"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `${value}%`}
								/>
								<ReferenceLine y={0} stroke="var(--border)" />
								<ChartTooltip
									content={<ChartTooltipContent />}
									cursor={{ fill: 'var(--muted)', opacity: 0.3 }}
								/>
								<Bar
									dataKey="growth"
									fill="var(--color-growth)"
									radius={[4, 4, 4, 4]}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
