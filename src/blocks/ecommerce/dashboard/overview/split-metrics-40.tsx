'use client';

import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	Activity,
	BarChart3,
	CircleDollarSign,
	Clock,
	CreditCard,
	Eye,
	MousePointerClick,
	Percent,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type MetricItem = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	sparkData: number[];
};

type ComparisonMetric = {
	label: string;
	current: string;
	previous: string;
	change: string;
	trend: 'up' | 'down';
};

const MetricCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	sparkData,
}: MetricItem) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<Icon className="size-4 text-muted-foreground" />
				<div className="flex h-8 items-end gap-0.5">
					{sparkData.map((val, i) => (
						<div
							key={i}
							className="w-1 rounded-full bg-primary/40"
							style={{ height: `${(val / Math.max(...sparkData)) * 100}%` }}
						/>
					))}
				</div>
			</div>
			<div className="mt-3">
				<p className="text-2xl font-bold">{value}</p>
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">{title}</p>
					<span
						className={`flex items-center text-xs ${
							trend === 'up' ? 'text-emerald-500' : 'text-red-500'
						}`}
					>
						{trend === 'up' ? (
							<ArrowUpRight className="size-3" />
						) : (
							<ArrowDownRight className="size-3" />
						)}
						{change}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ComparisonRow = ({
	label,
	current,
	previous,
	change,
	trend,
}: ComparisonMetric) => (
	<div className="flex items-center justify-between rounded-lg border bg-card/50 p-3">
		<span className="text-sm">{label}</span>
		<div className="flex items-center gap-4">
			<div className="text-right">
				<p className="text-sm font-medium">{current}</p>
				<p className="text-xs text-muted-foreground">{previous}</p>
			</div>
			<Badge
				variant="secondary"
				className={`w-16 justify-center ${
					trend === 'up'
						? 'bg-emerald-500/10 text-emerald-500'
						: 'bg-red-500/10 text-red-500'
				}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="mr-1 size-3" />
				) : (
					<ArrowDownRight className="mr-1 size-3" />
				)}
				{change}
			</Badge>
		</div>
	</div>
);

const lineConfig: ChartConfig = {
	current: { label: 'This Week', color: 'var(--chart-1)' },
	previous: { label: 'Last Week', color: 'var(--chart-2)' },
};

const barConfig: ChartConfig = {
	conversions: { label: 'Conversions', color: 'var(--chart-1)' },
};

export default function Main() {
	const metrics: MetricItem[] = [
		{
			title: 'Page Views',
			value: '284,521',
			change: '+24%',
			trend: 'up',
			icon: Eye,
			sparkData: [40, 55, 48, 62, 58, 72, 68],
		},
		{
			title: 'Visitors',
			value: '45,234',
			change: '+18%',
			trend: 'up',
			icon: Users,
			sparkData: [35, 42, 38, 52, 48, 58, 55],
		},
		{
			title: 'Bounce Rate',
			value: '32.4%',
			change: '-5%',
			trend: 'up',
			icon: Activity,
			sparkData: [45, 42, 38, 35, 32, 34, 32],
		},
		{
			title: 'Avg Session',
			value: '4m 32s',
			change: '+12%',
			trend: 'up',
			icon: Clock,
			sparkData: [180, 200, 195, 220, 240, 255, 272],
		},
		{
			title: 'Conversion',
			value: '3.24%',
			change: '+0.5%',
			trend: 'up',
			icon: MousePointerClick,
			sparkData: [2.5, 2.7, 2.8, 3.0, 3.1, 3.2, 3.24],
		},
		{
			title: 'Cart Rate',
			value: '45.2%',
			change: '-2%',
			trend: 'down',
			icon: ShoppingCart,
			sparkData: [48, 47, 46, 45, 44, 45, 45.2],
		},
	];

	const comparisons: ComparisonMetric[] = [
		{
			label: 'Revenue',
			current: '$89,432',
			previous: '$72,145',
			change: '+24%',
			trend: 'up',
		},
		{
			label: 'Orders',
			current: '2,847',
			previous: '2,412',
			change: '+18%',
			trend: 'up',
		},
		{
			label: 'Avg Order Value',
			current: '$31.40',
			previous: '$29.90',
			change: '+5%',
			trend: 'up',
		},
		{
			label: 'Refund Rate',
			current: '2.1%',
			previous: '2.8%',
			change: '-25%',
			trend: 'up',
		},
	];

	const trendData = [
		{ day: 'Mon', current: 4200, previous: 3800 },
		{ day: 'Tue', current: 5800, previous: 4200 },
		{ day: 'Wed', current: 4900, previous: 4500 },
		{ day: 'Thu', current: 6400, previous: 5200 },
		{ day: 'Fri', current: 7200, previous: 5800 },
		{ day: 'Sat', current: 8100, previous: 6400 },
		{ day: 'Sun', current: 6800, previous: 5600 },
	];

	const conversionData = [
		{ hour: '9AM', conversions: 12 },
		{ hour: '10AM', conversions: 18 },
		{ hour: '11AM', conversions: 24 },
		{ hour: '12PM', conversions: 32 },
		{ hour: '1PM', conversions: 28 },
		{ hour: '2PM', conversions: 22 },
		{ hour: '3PM', conversions: 26 },
		{ hour: '4PM', conversions: 31 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4 @lg:grid-cols-3">
							{metrics.map((metric, i) => (
								<MetricCard key={i} {...metric} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Traffic Comparison</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={lineConfig}
									className="h-[180px] w-full"
								>
									<LineChart data={trendData}>
										<XAxis dataKey="day" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent />} />
										<Line
											type="monotone"
											dataKey="current"
											stroke="var(--color-current)"
											strokeWidth={2}
											dot={false}
										/>
										<Line
											type="monotone"
											dataKey="previous"
											stroke="var(--color-previous)"
											strokeWidth={2}
											strokeDasharray="5 5"
											dot={false}
										/>
									</LineChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<div className="flex items-center gap-2">
									<BarChart3 className="size-4 text-muted-foreground" />
									<CardTitle className="text-base">Week over Week</CardTitle>
								</div>
							</CardHeader>
							<CardContent className="space-y-3 pt-0">
								{comparisons.map((item, i) => (
									<ComparisonRow key={i} {...item} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Hourly Conversions</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={barConfig} className="h-[180px] w-full">
									<BarChart data={conversionData}>
										<XAxis
											dataKey="hour"
											tickLine={false}
											axisLine={false}
											fontSize={11}
										/>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Bar
											dataKey="conversions"
											fill="var(--color-conversions)"
											radius={[4, 4, 0, 0]}
										/>
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
