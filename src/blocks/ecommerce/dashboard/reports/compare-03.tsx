'use client';

import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
} from 'recharts';
import { Calendar } from 'lucide-react';

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

type YearData = {
	month: string;
	thisYear: number;
	lastYear: number;
};

type SummaryProps = {
	label: string;
	thisYear: string;
	lastYear: string;
	change: string;
};

const Summary = ({ label, thisYear, lastYear, change }: SummaryProps) => (
	<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
		<p className="text-sm text-muted-foreground">{label}</p>
		<div className="mt-2 flex items-baseline gap-3">
			<span className="text-xl font-bold">{thisYear}</span>
			<span className="text-sm text-muted-foreground">vs {lastYear}</span>
		</div>
		<Badge
			variant="outline"
			className="mt-2 border-emerald-500/20 bg-emerald-500/10 text-emerald-500"
		>
			{change}
		</Badge>
	</div>
);

const chartConfig: ChartConfig = {
	thisYear: {
		label: '2024',
		color: 'var(--chart-1)',
	},
	lastYear: {
		label: '2023',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const summaries: SummaryProps[] = [
		{
			label: 'Total Revenue',
			thisYear: '$14.8M',
			lastYear: '$12.4M',
			change: '+19.4%',
		},
		{
			label: 'Total Orders',
			thisYear: '148.5K',
			lastYear: '125.2K',
			change: '+18.6%',
		},
		{
			label: 'Avg Order Value',
			thisYear: '$99.70',
			lastYear: '$99.04',
			change: '+0.7%',
		},
	];

	const chartData: YearData[] = [
		{ month: 'Jan', thisYear: 1050000, lastYear: 880000 },
		{ month: 'Feb', thisYear: 1120000, lastYear: 920000 },
		{ month: 'Mar', thisYear: 1280000, lastYear: 1050000 },
		{ month: 'Apr', thisYear: 1180000, lastYear: 980000 },
		{ month: 'May', thisYear: 1320000, lastYear: 1100000 },
		{ month: 'Jun', thisYear: 1450000, lastYear: 1180000 },
		{ month: 'Jul', thisYear: 1280000, lastYear: 1050000 },
		{ month: 'Aug', thisYear: 1380000, lastYear: 1120000 },
		{ month: 'Sep', thisYear: 1520000, lastYear: 1250000 },
		{ month: 'Oct', thisYear: 1480000, lastYear: 1280000 },
		{ month: 'Nov', thisYear: 1680000, lastYear: 1420000 },
		{ month: 'Dec', thisYear: 1850000, lastYear: 1520000 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Calendar className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Year-over-Year Comparison
								</CardTitle>
								<CardDescription>
									2024 vs 2023 performance metrics
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							{summaries.map((s, i) => (
								<Summary key={i} {...s} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000000}M`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Bar
									dataKey="thisYear"
									fill="var(--color-thisYear)"
									radius={[4, 4, 0, 0]}
								/>
								<Bar
									dataKey="lastYear"
									fill="var(--color-lastYear)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
