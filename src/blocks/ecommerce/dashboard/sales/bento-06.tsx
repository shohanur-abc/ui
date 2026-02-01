'use client';

import {
	TrendingUp,
	TrendingDown,
	Clock,
	Zap,
	AlertTriangle,
	CheckCircle2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer } from 'recharts';

type RealtimeMetric = {
	label: string;
	value: string;
	change: number;
	chartData: { value: number }[];
	status: 'normal' | 'high' | 'low';
};

type AlertItem = {
	title: string;
	description: string;
	type: 'warning' | 'success' | 'info';
	time: string;
};

type BentoLayout6Props = {
	metrics: RealtimeMetric[];
	alerts: AlertItem[];
	liveStats: { label: string; value: string }[];
};

const MetricCard = ({ metric }: { metric: RealtimeMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-4 pb-2">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm text-muted-foreground">{metric.label}</span>
				<div className="flex items-center gap-1">
					<Zap className="size-3 text-primary animate-pulse" />
					<span className="text-xs text-primary">Live</span>
				</div>
			</div>
			<div className="flex items-end justify-between">
				<div>
					<p className="text-2xl font-bold">{metric.value}</p>
					<div
						className={`flex items-center gap-1 text-xs ${metric.change >= 0 ? 'text-primary' : 'text-destructive'}`}
					>
						{metric.change >= 0 ? (
							<TrendingUp className="size-3" />
						) : (
							<TrendingDown className="size-3" />
						)}
						{Math.abs(metric.change)}%
					</div>
				</div>
				<div className="h-[40px] w-[80px]">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={metric.chartData}>
							<Area
								type="monotone"
								dataKey="value"
								stroke="oklch(0.70 0.18 155)"
								fill="oklch(0.70 0.18 155 / 0.2)"
								strokeWidth={1.5}
							/>
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AlertCard = ({ alerts }: { alerts: AlertItem[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<AlertTriangle className="size-4 text-amber-500" />
				<CardTitle className="text-sm font-medium">Recent Alerts</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-3">
			{alerts.map((alert, idx) => (
				<div
					key={idx}
					className="flex items-start gap-3 p-2 rounded-lg bg-muted/50"
				>
					{alert.type === 'warning' && (
						<AlertTriangle className="size-4 text-amber-500 mt-0.5" />
					)}
					{alert.type === 'success' && (
						<CheckCircle2 className="size-4 text-primary mt-0.5" />
					)}
					{alert.type === 'info' && (
						<Zap className="size-4 text-blue-500 mt-0.5" />
					)}
					<div className="flex-1">
						<p className="text-sm font-medium">{alert.title}</p>
						<p className="text-xs text-muted-foreground">{alert.description}</p>
					</div>
					<span className="text-xs text-muted-foreground">{alert.time}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const LiveStatsCard = ({
	stats,
}: {
	stats: { label: string; value: string }[];
}) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="pb-2">
			<div className="flex items-center gap-2">
				<Clock className="size-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">Live Stats</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			{stats.map((stat, idx) => (
				<div key={idx} className="flex items-center justify-between">
					<span className="text-sm text-muted-foreground">{stat.label}</span>
					<span className="font-semibold">{stat.value}</span>
				</div>
			))}
		</CardContent>
	</Card>
);

const BentoLayout6 = ({ metrics, alerts, liveStats }: BentoLayout6Props) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @xl:grid-cols-4 gap-4">
		{metrics.map((metric, idx) => (
			<MetricCard key={idx} metric={metric} />
		))}
		<AlertCard alerts={alerts} />
		<LiveStatsCard stats={liveStats} />
	</div>
);

export default function Main() {
	const metrics: RealtimeMetric[] = [
		{
			label: 'Active Visitors',
			value: '1,247',
			change: 5.2,
			chartData: [
				{ value: 30 },
				{ value: 45 },
				{ value: 35 },
				{ value: 55 },
				{ value: 48 },
				{ value: 62 },
			],
			status: 'high',
		},
		{
			label: 'Orders (1h)',
			value: '48',
			change: 12.5,
			chartData: [
				{ value: 20 },
				{ value: 35 },
				{ value: 25 },
				{ value: 45 },
				{ value: 38 },
				{ value: 48 },
			],
			status: 'normal',
		},
		{
			label: 'Revenue (1h)',
			value: '$5,240',
			change: 8.3,
			chartData: [
				{ value: 40 },
				{ value: 55 },
				{ value: 45 },
				{ value: 60 },
				{ value: 52 },
				{ value: 70 },
			],
			status: 'normal',
		},
		{
			label: 'Cart Additions',
			value: '156',
			change: -3.1,
			chartData: [
				{ value: 50 },
				{ value: 45 },
				{ value: 55 },
				{ value: 40 },
				{ value: 48 },
				{ value: 42 },
			],
			status: 'low',
		},
	];

	const alerts: AlertItem[] = [
		{
			title: 'Low Stock Alert',
			description: 'Wireless Headphones Pro running low (12 left)',
			type: 'warning',
			time: '2m ago',
		},
		{
			title: 'Large Order',
			description: 'Order #2851 placed for $2,450',
			type: 'success',
			time: '5m ago',
		},
		{
			title: 'Traffic Spike',
			description: '45% increase in visitors from email campaign',
			type: 'info',
			time: '12m ago',
		},
	];

	const liveStats = [
		{ label: 'Cart Value (avg)', value: '$142' },
		{ label: 'Checkout Rate', value: '68%' },
		{ label: 'Page Load', value: '1.2s' },
		{ label: 'Active Carts', value: '89' },
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout6 metrics={metrics} alerts={alerts} liveStats={liveStats} />
			</div>
		</section>
	);
}
