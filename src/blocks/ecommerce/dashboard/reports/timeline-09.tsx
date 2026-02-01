'use client';

import { Line, LineChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart3, Star, ArrowUp, ArrowDown, Minus } from 'lucide-react';

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

type RatingData = {
	month: string;
	avgRating: number;
	reviewCount: number;
	nps: number;
};

type MetricCardProps = {
	label: string;
	value: string;
	change: number;
	trend: 'up' | 'down' | 'neutral';
};

const MetricCard = ({ label, value, change, trend }: MetricCardProps) => {
	const trendConfig = {
		up: {
			icon: ArrowUp,
			color: 'text-emerald-500',
			bgColor: 'bg-emerald-500/10',
		},
		down: {
			icon: ArrowDown,
			color: 'text-rose-500',
			bgColor: 'bg-rose-500/10',
		},
		neutral: {
			icon: Minus,
			color: 'text-amber-500',
			bgColor: 'bg-amber-500/10',
		},
	};
	const { icon: Icon, color, bgColor } = trendConfig[trend];

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-4">
				<p className="text-sm text-muted-foreground">{label}</p>
				<div className="mt-1 flex items-baseline gap-2">
					<span className="text-2xl font-bold">{value}</span>
					<Badge
						variant="outline"
						className={`${color} ${bgColor} border-current/20`}
					>
						<Icon className="mr-1 size-3" />
						{change > 0 ? '+' : ''}
						{change}%
					</Badge>
				</div>
			</CardContent>
		</Card>
	);
};

const chartConfig: ChartConfig = {
	avgRating: {
		label: 'Avg Rating',
		color: 'var(--chart-1)',
	},
	nps: {
		label: 'NPS Score',
		color: 'var(--chart-2)',
	},
};

export default function Main() {
	const metrics: MetricCardProps[] = [
		{ label: 'Current Rating', value: '4.6', change: 5.2, trend: 'up' },
		{ label: 'Total Reviews', value: '28,540', change: 18.5, trend: 'up' },
		{ label: 'NPS Score', value: '72', change: 8.0, trend: 'up' },
		{ label: 'Response Rate', value: '94%', change: 0, trend: 'neutral' },
	];

	const chartData: RatingData[] = [
		{ month: 'Jan', avgRating: 4.2, reviewCount: 1850, nps: 58 },
		{ month: 'Feb', avgRating: 4.3, reviewCount: 2120, nps: 62 },
		{ month: 'Mar', avgRating: 4.4, reviewCount: 2450, nps: 64 },
		{ month: 'Apr', avgRating: 4.3, reviewCount: 2280, nps: 60 },
		{ month: 'May', avgRating: 4.5, reviewCount: 2680, nps: 68 },
		{ month: 'Jun', avgRating: 4.4, reviewCount: 2520, nps: 66 },
		{ month: 'Jul', avgRating: 4.5, reviewCount: 2750, nps: 70 },
		{ month: 'Aug', avgRating: 4.6, reviewCount: 2920, nps: 72 },
		{ month: 'Sep', avgRating: 4.5, reviewCount: 2650, nps: 68 },
		{ month: 'Oct', avgRating: 4.6, reviewCount: 2980, nps: 74 },
		{ month: 'Nov', avgRating: 4.6, reviewCount: 3150, nps: 72 },
		{ month: 'Dec', avgRating: 4.7, reviewCount: 3420, nps: 76 },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Star className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Rating History Timeline
								</CardTitle>
								<CardDescription>
									Customer ratings and NPS score over time
								</CardDescription>
							</div>
						</div>
						<Badge className="bg-primary/20 text-primary">
							<Star className="mr-1 size-3 fill-current" />
							4.6 Average
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{metrics.map((m, i) => (
								<MetricCard key={i} {...m} />
							))}
						</div>
						<ChartContainer config={chartConfig} className="h-[320px] w-full">
							<LineChart data={chartData} margin={{ left: 12, right: 12 }}>
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
									domain={[3, 5]}
								/>
								<YAxis
									yAxisId="right"
									orientation="right"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									domain={[0, 100]}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<ChartLegend content={<ChartLegendContent />} />
								<Line
									yAxisId="left"
									type="monotone"
									dataKey="avgRating"
									stroke="var(--color-avgRating)"
									strokeWidth={3}
									dot={{ fill: 'var(--color-avgRating)', strokeWidth: 2, r: 4 }}
								/>
								<Line
									yAxisId="right"
									type="monotone"
									dataKey="nps"
									stroke="var(--color-nps)"
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
