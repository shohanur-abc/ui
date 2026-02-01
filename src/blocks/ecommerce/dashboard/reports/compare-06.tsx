'use client';

import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import {
	Line,
	LineChart,
	CartesianGrid,
	XAxis,
	YAxis,
	ResponsiveContainer,
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
	ChartTooltip,
	ChartTooltipContent,
	ChartLegend,
	ChartLegendContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';

type TrendData = {
	week: string;
	channelA: number;
	channelB: number;
	channelC: number;
};

type ChannelSummaryProps = {
	channel: string;
	color: string;
	revenue: string;
	growth: number;
};

const ChannelSummary = ({
	channel,
	color,
	revenue,
	growth,
}: ChannelSummaryProps) => (
	<div className="flex items-center justify-between rounded-lg border border-border/30 bg-muted/20 p-4">
		<div className="flex items-center gap-3">
			<div className="size-3 rounded-full" style={{ backgroundColor: color }} />
			<div>
				<p className="text-sm font-medium">{channel}</p>
				<p className="text-lg font-bold">{revenue}</p>
			</div>
		</div>
		<Badge
			variant="outline"
			className={
				growth >= 0
					? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500'
					: 'border-rose-500/20 bg-rose-500/10 text-rose-500'
			}
		>
			{growth >= 0 ? (
				<ArrowUpRight className="mr-1 size-3" />
			) : (
				<ArrowDownRight className="mr-1 size-3" />
			)}
			{growth >= 0 ? '+' : ''}
			{growth}%
		</Badge>
	</div>
);

const chartConfig: ChartConfig = {
	channelA: {
		label: 'Organic Search',
		color: 'var(--chart-1)',
	},
	channelB: {
		label: 'Paid Ads',
		color: 'var(--chart-2)',
	},
	channelC: {
		label: 'Social Media',
		color: 'var(--chart-3)',
	},
};

export default function Main() {
	const channels: ChannelSummaryProps[] = [
		{
			channel: 'Organic Search',
			color: 'var(--chart-1)',
			revenue: '$245,800',
			growth: 15.2,
		},
		{
			channel: 'Paid Ads',
			color: 'var(--chart-2)',
			revenue: '$198,500',
			growth: 8.4,
		},
		{
			channel: 'Social Media',
			color: 'var(--chart-3)',
			revenue: '$142,300',
			growth: -3.2,
		},
	];

	const chartData: TrendData[] = [
		{ week: 'W1', channelA: 28000, channelB: 22000, channelC: 18000 },
		{ week: 'W2', channelA: 32000, channelB: 24000, channelC: 17500 },
		{ week: 'W3', channelA: 35000, channelB: 26000, channelC: 19000 },
		{ week: 'W4', channelA: 38000, channelB: 28000, channelC: 16800 },
		{ week: 'W5', channelA: 42000, channelB: 30000, channelC: 18200 },
		{ week: 'W6', channelA: 45000, channelB: 32000, channelC: 17000 },
		{ week: 'W7', channelA: 48000, channelB: 34000, channelC: 19500 },
		{ week: 'W8', channelA: 52000, channelB: 36000, channelC: 18800 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<TrendingUp className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Channel Performance Comparison
								</CardTitle>
								<CardDescription>
									Revenue trends across marketing channels (8 weeks)
								</CardDescription>
							</div>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							{channels.map((ch, i) => (
								<ChannelSummary key={i} {...ch} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="week"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={(value) => `$${value / 1000}K`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									type="monotone"
									dataKey="channelA"
									stroke="var(--color-channelA)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="channelB"
									stroke="var(--color-channelB)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="channelC"
									stroke="var(--color-channelC)"
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
