'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

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

type ChartDataItem = {
	day: string;
	visitors: number;
	conversions: number;
	bounceRate: number;
};

type StatItem = {
	label: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
};

const StatBadge = ({ label, value, change, trend }: StatItem) => (
	<div className="flex flex-col">
		<span className="text-xs text-muted-foreground">{label}</span>
		<div className="flex items-baseline gap-1">
			<span className="font-semibold">{value}</span>
			<span
				className={`text-xs ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{change}
			</span>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	visitors: {
		label: 'Visitors',
		color: 'var(--chart-1)',
	},
	conversions: {
		label: 'Conversions',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const chartData: ChartDataItem[] = [
		{ day: 'Mon', visitors: 2400, conversions: 98, bounceRate: 32 },
		{ day: 'Tue', visitors: 3100, conversions: 145, bounceRate: 28 },
		{ day: 'Wed', visitors: 2800, conversions: 128, bounceRate: 31 },
		{ day: 'Thu', visitors: 3500, conversions: 168, bounceRate: 25 },
		{ day: 'Fri', visitors: 4200, conversions: 210, bounceRate: 22 },
		{ day: 'Sat', visitors: 5100, conversions: 285, bounceRate: 19 },
		{ day: 'Sun', visitors: 4600, conversions: 248, bounceRate: 21 },
	];

	const stats: StatItem[] = [
		{ label: 'Total Visitors', value: '25.7k', change: '+12%', trend: 'up' },
		{ label: 'Conversions', value: '1,282', change: '+8%', trend: 'up' },
		{ label: 'Bounce Rate', value: '25.4%', change: '-3%', trend: 'up' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @lg:flex-row @lg:items-start @lg:justify-between">
							<div>
								<CardTitle className="text-lg">Weekly Traffic</CardTitle>
								<CardDescription>
									Visitor and conversion trends this week
								</CardDescription>
							</div>
							<div className="flex gap-6">
								{stats.map((stat, i) => (
									<StatBadge key={i} {...stat} />
								))}
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<ChartContainer config={chartConfig} className="h-[280px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="day"
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
								<ChartTooltip
									content={<ChartTooltipContent indicator="line" />}
								/>
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="visitors"
									stroke="var(--color-visitors)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="conversions"
									stroke="var(--color-conversions)"
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
