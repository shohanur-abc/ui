'use client';

import { Area, AreaChart, Bar, BarChart, XAxis, YAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	Banknote,
	CircleDollarSign,
	CreditCard,
	DollarSign,
	TrendingDown,
	TrendingUp,
	Wallet,
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

type RevenueKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	description: string;
};

type RevenueBreakdown = {
	label: string;
	amount: string;
	percentage: number;
	color: string;
};

type MonthlyRevenue = {
	month: string;
	revenue: number;
	target: number;
};

const RevenueKpiCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	description,
}: RevenueKpi) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-5 text-primary" />
				</div>
				<Badge
					variant="secondary"
					className={
						trend === 'up'
							? 'bg-emerald-500/10 text-emerald-500'
							: 'bg-red-500/10 text-red-500'
					}
				>
					{trend === 'up' ? (
						<ArrowUpRight className="mr-1 size-3" />
					) : (
						<ArrowDownRight className="mr-1 size-3" />
					)}
					{change}
				</Badge>
			</div>
			<div className="mt-4">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
				<p className="mt-1 text-xs text-muted-foreground">{description}</p>
			</div>
		</CardContent>
	</Card>
);

const BreakdownRow = ({
	label,
	amount,
	percentage,
	color,
}: RevenueBreakdown) => (
	<div className="space-y-2">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<div className={`size-3 rounded-full ${color}`} />
				<span className="text-sm">{label}</span>
			</div>
			<div className="text-right">
				<span className="font-medium">{amount}</span>
				<span className="ml-2 text-xs text-muted-foreground">
					{percentage}%
				</span>
			</div>
		</div>
		<Progress value={percentage} className="h-1.5" />
	</div>
);

const areaConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

const barConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
	target: { label: 'Target', color: 'var(--chart-2)' },
};

export default function Main() {
	const revenueKpis: RevenueKpi[] = [
		{
			title: 'Total Revenue',
			value: '$248,632',
			change: '+28%',
			trend: 'up',
			icon: CircleDollarSign,
			description: 'Total earnings this month',
		},
		{
			title: 'Net Profit',
			value: '$67,842',
			change: '+22%',
			trend: 'up',
			icon: Wallet,
			description: 'After expenses and taxes',
		},
		{
			title: 'Avg Transaction',
			value: '$36.70',
			change: '-2%',
			trend: 'down',
			icon: CreditCard,
			description: 'Per order value',
		},
		{
			title: 'Refunds',
			value: '$4,521',
			change: '-15%',
			trend: 'up',
			icon: Banknote,
			description: 'Total refunds issued',
		},
	];

	const breakdown: RevenueBreakdown[] = [
		{
			label: 'Product Sales',
			amount: '$186,474',
			percentage: 75,
			color: 'bg-chart-1',
		},
		{
			label: 'Subscriptions',
			amount: '$37,295',
			percentage: 15,
			color: 'bg-chart-2',
		},
		{
			label: 'Services',
			amount: '$18,637',
			percentage: 7,
			color: 'bg-chart-3',
		},
		{ label: 'Other', amount: '$6,226', percentage: 3, color: 'bg-chart-4' },
	];

	const dailyData = [
		{ day: 'Mon', revenue: 12400 },
		{ day: 'Tue', revenue: 18200 },
		{ day: 'Wed', revenue: 14800 },
		{ day: 'Thu', revenue: 22100 },
		{ day: 'Fri', revenue: 28400 },
		{ day: 'Sat', revenue: 32100 },
		{ day: 'Sun', revenue: 24800 },
	];

	const monthlyData: MonthlyRevenue[] = [
		{ month: 'Jan', revenue: 124000, target: 150000 },
		{ month: 'Feb', revenue: 156000, target: 150000 },
		{ month: 'Mar', revenue: 142000, target: 160000 },
		{ month: 'Apr', revenue: 189000, target: 170000 },
		{ month: 'May', revenue: 234000, target: 200000 },
		{ month: 'Jun', revenue: 248632, target: 220000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							{revenueKpis.map((kpi, i) => (
								<RevenueKpiCard key={i} {...kpi} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Daily Revenue</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={areaConfig}
									className="h-[180px] w-full"
								>
									<AreaChart data={dailyData}>
										<defs>
											<linearGradient
												id="split37fill"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
												<stop
													offset="5%"
													stopColor="var(--color-revenue)"
													stopOpacity={0.3}
												/>
												<stop
													offset="95%"
													stopColor="var(--color-revenue)"
													stopOpacity={0}
												/>
											</linearGradient>
										</defs>
										<XAxis dataKey="day" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Area
											type="monotone"
											dataKey="revenue"
											stroke="var(--color-revenue)"
											strokeWidth={2}
											fill="url(#split37fill)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Revenue Breakdown</CardTitle>
							</CardHeader>
							<CardContent className="space-y-4 pt-0">
								{breakdown.map((item, i) => (
									<BreakdownRow key={i} {...item} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Revenue vs Target</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={barConfig} className="h-[200px] w-full">
									<BarChart data={monthlyData}>
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<YAxis
											tickLine={false}
											axisLine={false}
											tickFormatter={(v) => `$${v / 1000}k`}
										/>
										<ChartTooltip content={<ChartTooltipContent />} />
										<Bar
											dataKey="revenue"
											fill="var(--color-revenue)"
											radius={[4, 4, 0, 0]}
										/>
										<Bar
											dataKey="target"
											fill="var(--color-target)"
											radius={[4, 4, 0, 0]}
											opacity={0.5}
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
