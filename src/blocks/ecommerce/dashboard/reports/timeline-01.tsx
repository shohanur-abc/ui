'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Calendar, TrendingUp } from 'lucide-react';

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
import { Badge } from '@/components/ui/badge';

type RevenueData = {
	month: string;
	revenue: number;
	orders: number;
};

type SummaryProps = {
	label: string;
	value: string;
	subtext: string;
};

const Summary = ({ label, value, subtext }: SummaryProps) => (
	<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
		<p className="text-sm text-muted-foreground">{label}</p>
		<p className="mt-1 text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{subtext}</p>
	</div>
);

const chartConfig: ChartConfig = {
	revenue: {
		label: 'Revenue',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const summaries: SummaryProps[] = [
		{ label: 'Total Revenue', value: '$14.8M', subtext: '+18.5% vs last year' },
		{ label: 'Total Orders', value: '148,500', subtext: '+15.2% vs last year' },
		{ label: 'Avg Monthly Revenue', value: '$1.23M', subtext: '12 months' },
		{ label: 'Peak Month', value: 'December', subtext: '$1.85M revenue' },
	];

	const chartData: RevenueData[] = [
		{ month: 'Jan', revenue: 1050000, orders: 8500 },
		{ month: 'Feb', revenue: 1120000, orders: 9200 },
		{ month: 'Mar', revenue: 1280000, orders: 10500 },
		{ month: 'Apr', revenue: 1180000, orders: 9800 },
		{ month: 'May', revenue: 1320000, orders: 11200 },
		{ month: 'Jun', revenue: 1450000, orders: 12100 },
		{ month: 'Jul', revenue: 1280000, orders: 10800 },
		{ month: 'Aug', revenue: 1380000, orders: 11500 },
		{ month: 'Sep', revenue: 1520000, orders: 12800 },
		{ month: 'Oct', revenue: 1480000, orders: 12400 },
		{ month: 'Nov', revenue: 1680000, orders: 14200 },
		{ month: 'Dec', revenue: 1850000, orders: 15500 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Calendar className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Annual Revenue Timeline
								</CardTitle>
								<CardDescription>
									Monthly revenue performance for 2024
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">
							<TrendingUp className="mr-1 size-3" />
							+18.5% YoY
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaries.map((s, i) => (
								<Summary key={i} {...s} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[350px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
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
									tickFormatter={(v) => `$${v / 1000000}M`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Line
									type="monotone"
									dataKey="revenue"
									stroke="var(--color-revenue)"
									strokeWidth={3}
									dot={{ fill: 'var(--color-revenue)', strokeWidth: 2, r: 4 }}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
