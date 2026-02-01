'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

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

type TrafficSourceProps = {
	source: string;
	sessions: string;
	percentage: number;
	convRate: string;
	revenue: string;
	trend: 'up' | 'down' | 'neutral';
	color: string;
};

const TrafficSource = ({
	source,
	sessions,
	percentage,
	convRate,
	revenue,
	trend,
	color,
}: TrafficSourceProps) => (
	<div className="flex items-center gap-4 border-b border-border/30 py-4 last:border-0">
		<div
			className="size-3 shrink-0 rounded-full"
			style={{ backgroundColor: color }}
		/>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{source}</p>
				{trend === 'up' && <TrendingUp className="size-3 text-emerald-500" />}
				{trend === 'down' && <TrendingDown className="size-3 text-rose-500" />}
				{trend === 'neutral' && (
					<Minus className="size-3 text-muted-foreground" />
				)}
			</div>
			<p className="text-xs text-muted-foreground">{sessions} sessions</p>
		</div>
		<div className="text-center">
			<p className="text-sm font-medium">{convRate}</p>
			<p className="text-xs text-muted-foreground">Conv Rate</p>
		</div>
		<div className="text-right">
			<p className="font-bold">{revenue}</p>
			<Badge variant="outline" className="mt-1 text-[10px]">
				{percentage}%
			</Badge>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	sessions: {
		label: 'Sessions',
		color: 'var(--chart-1)',
	},
};

export default function Main() {
	const sources: TrafficSourceProps[] = [
		{
			source: 'Organic Search',
			sessions: '125,400',
			percentage: 35,
			convRate: '4.2%',
			revenue: '$245,800',
			trend: 'up',
			color: 'var(--chart-1)',
		},
		{
			source: 'Paid Search',
			sessions: '82,500',
			percentage: 23,
			convRate: '5.8%',
			revenue: '$198,500',
			trend: 'up',
			color: 'var(--chart-2)',
		},
		{
			source: 'Social Media',
			sessions: '64,200',
			percentage: 18,
			convRate: '2.4%',
			revenue: '$85,400',
			trend: 'down',
			color: 'var(--chart-3)',
		},
		{
			source: 'Direct',
			sessions: '48,500',
			percentage: 14,
			convRate: '6.2%',
			revenue: '$142,300',
			trend: 'neutral',
			color: 'var(--chart-4)',
		},
		{
			source: 'Email',
			sessions: '28,400',
			percentage: 8,
			convRate: '8.5%',
			revenue: '$112,800',
			trend: 'up',
			color: 'var(--chart-5)',
		},
		{
			source: 'Referral',
			sessions: '8,200',
			percentage: 2,
			convRate: '3.8%',
			revenue: '$28,500',
			trend: 'neutral',
			color: 'var(--muted-foreground)',
		},
	];

	const chartData = sources.map((s) => ({
		name: s.source,
		sessions: parseInt(s.sessions.replace(/,/g, '')),
		fill: s.color,
	}));

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Traffic Source Breakdown
						</CardTitle>
						<CardDescription>
							Session and revenue distribution by acquisition channel
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<ChartContainer config={chartConfig} className="h-[240px] w-full">
							<BarChart data={chartData} margin={{ left: 12, right: 12 }}>
								<CartesianGrid strokeDasharray="3 3" vertical={false} />
								<XAxis
									dataKey="name"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickFormatter={(v) => `${v / 1000}K`}
								/>
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar dataKey="sessions" radius={[4, 4, 0, 0]}>
									{chartData.map((entry, index) => (
										<Cell key={`cell-${index}`} fill={entry.fill} />
									))}
								</Bar>
							</BarChart>
						</ChartContainer>
						<Card className="border-border/30 bg-muted/10">
							<CardContent className="p-4">
								{sources.map((s, i) => (
									<TrafficSource key={i} {...s} />
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
