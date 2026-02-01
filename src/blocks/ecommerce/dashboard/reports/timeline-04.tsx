'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Activity, Circle } from 'lucide-react';

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

type HourlyData = {
	hour: string;
	orders: number;
	visitors: number;
};

type LiveMetricProps = {
	label: string;
	value: string;
	status: 'live' | 'normal';
};

const LiveMetric = ({ label, value, status }: LiveMetricProps) => (
	<div className="rounded-lg border border-border/30 bg-muted/20 p-4">
		<div className="flex items-center gap-2">
			{status === 'live' && (
				<span className="relative flex size-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
					<span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
				</span>
			)}
			<span className="text-sm text-muted-foreground">{label}</span>
		</div>
		<p className="mt-1 text-2xl font-bold">{value}</p>
	</div>
);

const chartConfig: ChartConfig = {
	orders: {
		label: 'Orders',
		color: 'var(--chart-1)',
	},
	visitors: {
		label: 'Visitors',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const liveMetrics: LiveMetricProps[] = [
		{ label: 'Active Visitors', value: '1,247', status: 'live' },
		{ label: 'Orders Today', value: '845', status: 'normal' },
		{ label: 'Revenue Today', value: '$68,420', status: 'normal' },
		{ label: 'Conversion Rate', value: '4.2%', status: 'normal' },
	];

	const chartData: HourlyData[] = [
		{ hour: '00:00', orders: 12, visitors: 245 },
		{ hour: '02:00', orders: 8, visitors: 180 },
		{ hour: '04:00', orders: 5, visitors: 120 },
		{ hour: '06:00', orders: 15, visitors: 280 },
		{ hour: '08:00', orders: 45, visitors: 850 },
		{ hour: '10:00', orders: 85, visitors: 1420 },
		{ hour: '12:00', orders: 120, visitors: 1850 },
		{ hour: '14:00', orders: 95, visitors: 1620 },
		{ hour: '16:00', orders: 88, visitors: 1480 },
		{ hour: '18:00', orders: 110, visitors: 1720 },
		{ hour: '20:00', orders: 145, visitors: 1980 },
		{ hour: '22:00', orders: 65, visitors: 980 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Activity className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Daily Activity Timeline
								</CardTitle>
								<CardDescription>
									Hourly orders and visitor activity
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-emerald-500/20 text-emerald-500">
							<span className="mr-2 inline-flex size-2 rounded-full bg-emerald-500" />
							Live
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{liveMetrics.map((m, i) => (
								<LiveMetric key={i} {...m} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="hour"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									yAxisId="left"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									yAxisId="right"
									orientation="right"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="orders"
									stroke="var(--color-orders)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="visitors"
									stroke="var(--color-visitors)"
									strokeWidth={2}
									dot={false}
								/>
							</LineChart>
						</ChartContainer>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
