'use client';

import { Bar, BarChart, Cell, Pie, PieChart, XAxis } from 'recharts';
import {
	ArrowUpRight,
	Calendar,
	Clock,
	DollarSign,
	Eye,
	MousePointerClick,
	Package,
	ShoppingCart,
	Target,
	TrendingUp,
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

type CenterKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type GoalItem = {
	label: string;
	current: number;
	target: number;
};

type HourlyData = {
	hour: string;
	sales: number;
};

const CenterKpiCard = ({ title, value, change, icon: Icon }: CenterKpi) => (
	<Card className="group transition-all hover:border-primary/50">
		<CardContent className="flex flex-col items-center p-6 text-center">
			<div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 ring-1 ring-primary/20">
				<Icon className="size-6 text-primary" />
			</div>
			<p className="mt-4 text-3xl font-bold">{value}</p>
			<p className="text-sm text-muted-foreground">{title}</p>
			<Badge
				variant="secondary"
				className="mt-2 bg-emerald-500/10 text-emerald-500"
			>
				<ArrowUpRight className="mr-1 size-3" />
				{change}
			</Badge>
		</CardContent>
	</Card>
);

const GoalCard = ({ label, current, target }: GoalItem) => {
	const percentage = Math.min((current / target) * 100, 100);
	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">{label}</span>
				<span className="text-xs text-muted-foreground">
					{current.toLocaleString()} / {target.toLocaleString()}
				</span>
			</div>
			<Progress value={percentage} className="mt-2 h-2" />
		</div>
	);
};

const barConfig: ChartConfig = {
	sales: { label: 'Sales', color: 'var(--chart-1)' },
};

const pieConfig: ChartConfig = {
	value: { label: 'Value' },
};

export default function Main() {
	const centerKpis: CenterKpi[] = [
		{
			title: 'Today Revenue',
			value: '$12,847',
			change: '+28%',
			icon: DollarSign,
		},
		{ title: 'Today Orders', value: '342', change: '+18%', icon: ShoppingCart },
		{ title: 'Today Visitors', value: '8,234', change: '+24%', icon: Eye },
		{ title: 'Conversion', value: '4.15%', change: '+0.8%', icon: Target },
	];

	const goals: GoalItem[] = [
		{ label: 'Monthly Revenue', current: 78432, target: 100000 },
		{ label: 'New Customers', current: 234, target: 300 },
		{ label: 'Orders', current: 1847, target: 2000 },
	];

	const hourlyData: HourlyData[] = [
		{ hour: '9AM', sales: 1200 },
		{ hour: '10AM', sales: 1800 },
		{ hour: '11AM', sales: 2400 },
		{ hour: '12PM', sales: 3200 },
		{ hour: '1PM', sales: 2800 },
		{ hour: '2PM', sales: 2200 },
		{ hour: '3PM', sales: 2600 },
		{ hour: '4PM', sales: 3100 },
	];

	const deviceData = [
		{ name: 'Desktop', value: 52, fill: 'var(--chart-1)' },
		{ name: 'Mobile', value: 38, fill: 'var(--chart-2)' },
		{ name: 'Tablet', value: 10, fill: 'var(--chart-3)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4 @xl:gap-6">
					{centerKpis.map((kpi, i) => (
						<CenterKpiCard key={i} {...kpi} />
					))}
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Clock className="size-4 text-muted-foreground" />
								<CardTitle className="text-sm">Hourly Sales</CardTitle>
							</div>
						</CardHeader>
						<CardContent>
							<ChartContainer config={barConfig} className="h-[160px] w-full">
								<BarChart data={hourlyData}>
									<XAxis
										dataKey="hour"
										tickLine={false}
										axisLine={false}
										fontSize={11}
									/>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="sales"
										fill="var(--color-sales)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Target className="size-4 text-muted-foreground" />
								<CardTitle className="text-sm">Monthly Goals</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-0">
							{goals.map((goal, i) => (
								<GoalCard key={i} {...goal} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
