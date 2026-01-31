'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';

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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

type ChannelData = {
	week: string;
	organic: number;
	paid: number;
	social: number;
	email: number;
};

type ChannelSummaryProps = {
	channel: string;
	color: string;
	value: string;
	change: string;
};

const ChannelSummary = ({ channel, color, value, change }: ChannelSummaryProps) => (
	<div className="flex items-center justify-between rounded-lg border border-border/50 p-3">
		<div className="flex items-center gap-2">
			<div className={`size-2.5 rounded-full ${color}`} />
			<span className="text-sm">{channel}</span>
		</div>
		<div className="text-right">
			<p className="font-medium">{value}</p>
			<p className="text-xs text-emerald-500">{change}</p>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	organic: {
		label: 'Organic',
		color: 'oklch(0.7 0.18 160)',
	},
	paid: {
		label: 'Paid Ads',
		color: 'oklch(0.7 0.2 280)',
	},
	social: {
		label: 'Social',
		color: 'oklch(0.65 0.2 320)',
	},
	email: {
		label: 'Email',
		color: 'oklch(0.72 0.16 200)',
	},
};

export default function Main() {
	const channels: ChannelSummaryProps[] = [
		{ channel: 'Organic', color: 'bg-[oklch(0.7_0.18_160)]', value: '$142.5K', change: '+18.2%' },
		{ channel: 'Paid Ads', color: 'bg-[oklch(0.7_0.2_280)]', value: '$98.4K', change: '+12.5%' },
		{ channel: 'Social', color: 'bg-[oklch(0.65_0.2_320)]', value: '$67.2K', change: '+24.8%' },
		{ channel: 'Email', color: 'bg-[oklch(0.72_0.16_200)]', value: '$45.8K', change: '+8.3%' },
	];

	const chartData: ChannelData[] = [
		{ week: 'W1', organic: 8500, paid: 6200, social: 3800, email: 2400 },
		{ week: 'W2', organic: 9200, paid: 6800, social: 4200, email: 2800 },
		{ week: 'W3', organic: 10100, paid: 7100, social: 4800, email: 3100 },
		{ week: 'W4', organic: 9800, paid: 7500, social: 5200, email: 3400 },
		{ week: 'W5', organic: 11200, paid: 7800, social: 5600, email: 3200 },
		{ week: 'W6', organic: 12400, paid: 8200, social: 6100, email: 3800 },
		{ week: 'W7', organic: 11800, paid: 8600, social: 5800, email: 4100 },
		{ week: 'W8', organic: 13200, paid: 9100, social: 6400, email: 3900 },
		{ week: 'W9', organic: 14100, paid: 9500, social: 6800, email: 4200 },
		{ week: 'W10', organic: 13800, paid: 9800, social: 7200, email: 4500 },
		{ week: 'W11', organic: 15200, paid: 10200, social: 7600, email: 4800 },
		{ week: 'W12', organic: 16500, paid: 10800, social: 8200, email: 5100 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-4 @sm:flex-row @sm:items-start @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Marketing Channel Report
							</CardTitle>
							<CardDescription>
								Revenue performance across marketing channels
							</CardDescription>
						</div>
						<Select defaultValue="12w">
							<SelectTrigger className="w-[140px]">
								<SelectValue placeholder="Time range" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="4w">Last 4 weeks</SelectItem>
								<SelectItem value="8w">Last 8 weeks</SelectItem>
								<SelectItem value="12w">Last 12 weeks</SelectItem>
								<SelectItem value="24w">Last 24 weeks</SelectItem>
							</SelectContent>
						</Select>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
							{channels.map((channel, i) => (
								<ChannelSummary key={i} {...channel} />
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
									tickFormatter={(value) => `$${value / 1000}k`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									type="monotone"
									dataKey="organic"
									stroke="var(--color-organic)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="paid"
									stroke="var(--color-paid)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="social"
									stroke="var(--color-social)"
									strokeWidth={2}
									dot={false}
								/>
								<Line
									type="monotone"
									dataKey="email"
									stroke="var(--color-email)"
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
