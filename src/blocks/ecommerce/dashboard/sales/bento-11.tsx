'use client';

import {
	BarChart3,
	DollarSign,
	ShoppingCart,
	Users,
	TrendingUp,
	TrendingDown,
	ArrowUpRight,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Area, AreaChart, ResponsiveContainer, Bar, BarChart } from 'recharts';

type HeroMetric = {
	title: string;
	value: string;
	change: number;
	period: string;
	chartData: { value: number }[];
	chartType: 'area' | 'bar';
};

type QuickStat = {
	label: string;
	value: string;
	icon: React.ReactNode;
};

type BentoLayout11Props = {
	heroMetric: HeroMetric;
	secondaryMetrics: HeroMetric[];
	quickStats: QuickStat[];
};

const HeroCard = ({ metric }: { metric: HeroMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2 @xl:row-span-2">
		<CardHeader className="pb-2">
			<div className="flex items-center justify-between">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{metric.title}
				</CardTitle>
				<Badge variant="outline">{metric.period}</Badge>
			</div>
		</CardHeader>
		<CardContent>
			<div className="mb-4">
				<div className="text-4xl @xl:text-5xl font-bold">{metric.value}</div>
				<div
					className={`flex items-center gap-1 mt-2 ${metric.change >= 0 ? 'text-primary' : 'text-destructive'}`}
				>
					{metric.change >= 0 ? (
						<TrendingUp className="size-4" />
					) : (
						<TrendingDown className="size-4" />
					)}
					<span className="font-medium">{Math.abs(metric.change)}%</span>
					<span className="text-muted-foreground text-sm">vs last period</span>
				</div>
			</div>
			<div className="h-[180px]">
				<ResponsiveContainer width="100%" height="100%">
					{metric.chartType === 'area' ? (
						<AreaChart data={metric.chartData}>
							<defs>
								<linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
									<stop
										offset="5%"
										stopColor="oklch(0.70 0.18 155)"
										stopOpacity={0.4}
									/>
									<stop
										offset="95%"
										stopColor="oklch(0.70 0.18 155)"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>
							<Area
								type="monotone"
								dataKey="value"
								stroke="oklch(0.70 0.18 155)"
								strokeWidth={2}
								fill="url(#heroGradient)"
							/>
						</AreaChart>
					) : (
						<BarChart data={metric.chartData}>
							<Bar
								dataKey="value"
								fill="oklch(0.70 0.18 155)"
								radius={[4, 4, 0, 0]}
							/>
						</BarChart>
					)}
				</ResponsiveContainer>
			</div>
		</CardContent>
	</Card>
);

const SecondaryCard = ({ metric }: { metric: HeroMetric }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardContent className="pt-6">
			<div className="flex items-start justify-between mb-4">
				<div>
					<p className="text-sm text-muted-foreground">{metric.title}</p>
					<p className="text-2xl font-bold mt-1">{metric.value}</p>
				</div>
				<Badge variant={metric.change >= 0 ? 'default' : 'destructive'}>
					{metric.change >= 0 ? '+' : ''}
					{metric.change}%
				</Badge>
			</div>
			<div className="h-[60px]">
				<ResponsiveContainer width="100%" height="100%">
					<AreaChart data={metric.chartData}>
						<Area
							type="monotone"
							dataKey="value"
							stroke="oklch(0.70 0.18 155)"
							fill="oklch(0.70 0.18 155 / 0.1)"
							strokeWidth={1.5}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</div>
		</CardContent>
	</Card>
);

const QuickStatsCard = ({ stats }: { stats: QuickStat[] }) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 @xl:col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Quick Stats</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4">
				{stats.map((stat, idx) => (
					<div
						key={idx}
						className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
					>
						<div className="p-2 rounded-lg bg-primary/10 text-primary">
							{stat.icon}
						</div>
						<div>
							<p className="text-lg font-bold">{stat.value}</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

const BentoLayout11 = ({
	heroMetric,
	secondaryMetrics,
	quickStats,
}: BentoLayout11Props) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-4 gap-4">
		<HeroCard metric={heroMetric} />
		{secondaryMetrics.map((metric, idx) => (
			<SecondaryCard key={idx} metric={metric} />
		))}
		<QuickStatsCard stats={quickStats} />
	</div>
);

export default function Main() {
	const heroMetric: HeroMetric = {
		title: 'Total Revenue',
		value: '$142,580',
		change: 12.5,
		period: 'This Month',
		chartData: [
			{ value: 20 },
			{ value: 35 },
			{ value: 28 },
			{ value: 45 },
			{ value: 38 },
			{ value: 52 },
			{ value: 48 },
			{ value: 65 },
			{ value: 58 },
			{ value: 72 },
			{ value: 68 },
			{ value: 85 },
		],
		chartType: 'area',
	};

	const secondaryMetrics: HeroMetric[] = [
		{
			title: 'Orders',
			value: '1,284',
			change: 8.2,
			period: 'This Month',
			chartData: [
				{ value: 30 },
				{ value: 45 },
				{ value: 35 },
				{ value: 55 },
				{ value: 48 },
				{ value: 62 },
			],
			chartType: 'area',
		},
		{
			title: 'Customers',
			value: '324',
			change: 18.7,
			period: 'New',
			chartData: [
				{ value: 20 },
				{ value: 35 },
				{ value: 42 },
				{ value: 38 },
				{ value: 55 },
				{ value: 68 },
			],
			chartType: 'area',
		},
	];

	const quickStats: QuickStat[] = [
		{
			label: 'Avg Order',
			value: '$111',
			icon: <DollarSign className="size-4" />,
		},
		{
			label: 'Products',
			value: '4,821',
			icon: <ShoppingCart className="size-4" />,
		},
		{
			label: 'Active Users',
			value: '2.4K',
			icon: <Users className="size-4" />,
		},
		{
			label: 'Conversion',
			value: '3.8%',
			icon: <BarChart3 className="size-4" />,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<BentoLayout11
					heroMetric={heroMetric}
					secondaryMetrics={secondaryMetrics}
					quickStats={quickStats}
				/>
			</div>
		</section>
	);
}
