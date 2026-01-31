'use client';

import { Line, LineChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	Calendar,
	DollarSign,
	Package,
	ShoppingCart,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type PeriodKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

const PeriodKpiCard = ({ title, value, change, icon: Icon }: PeriodKpi) => (
	<div className="rounded-xl border bg-card p-4">
		<div className="flex items-center gap-2 text-muted-foreground">
			<Icon className="size-4" />
			<span className="text-sm">{title}</span>
		</div>
		<div className="mt-2 flex items-end justify-between">
			<p className="text-2xl font-bold">{value}</p>
			<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 text-xs">
				<ArrowUpRight className="mr-0.5 size-3" />
				{change}
			</Badge>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

export default function Main() {
	const dailyKpis: PeriodKpi[] = [
		{ title: 'Revenue', value: '$8,432', change: '+12%', icon: DollarSign },
		{ title: 'Orders', value: '234', change: '+8%', icon: ShoppingCart },
		{ title: 'Visitors', value: '4,521', change: '+15%', icon: Users },
		{ title: 'Sold', value: '412', change: '+10%', icon: Package },
	];

	const weeklyKpis: PeriodKpi[] = [
		{ title: 'Revenue', value: '$58,234', change: '+18%', icon: DollarSign },
		{ title: 'Orders', value: '1,567', change: '+14%', icon: ShoppingCart },
		{ title: 'Visitors', value: '32,456', change: '+22%', icon: Users },
		{ title: 'Sold', value: '2,845', change: '+16%', icon: Package },
	];

	const monthlyKpis: PeriodKpi[] = [
		{ title: 'Revenue', value: '$248,632', change: '+28%', icon: DollarSign },
		{ title: 'Orders', value: '6,842', change: '+22%', icon: ShoppingCart },
		{ title: 'Visitors', value: '145,234', change: '+35%', icon: Users },
		{ title: 'Sold', value: '12,456', change: '+24%', icon: Package },
	];

	const dailyData = [
		{ time: '00:00', revenue: 250 },
		{ time: '04:00', revenue: 180 },
		{ time: '08:00', revenue: 520 },
		{ time: '12:00', revenue: 890 },
		{ time: '16:00', revenue: 1250 },
		{ time: '20:00', revenue: 780 },
		{ time: '24:00', revenue: 420 },
	];

	const weeklyData = [
		{ time: 'Mon', revenue: 8200 },
		{ time: 'Tue', revenue: 9500 },
		{ time: 'Wed', revenue: 7800 },
		{ time: 'Thu', revenue: 10200 },
		{ time: 'Fri', revenue: 11500 },
		{ time: 'Sat', revenue: 6800 },
		{ time: 'Sun', revenue: 4234 },
	];

	const monthlyData = [
		{ time: 'W1', revenue: 45000 },
		{ time: 'W2', revenue: 58000 },
		{ time: 'W3', revenue: 62000 },
		{ time: 'W4', revenue: 83632 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Calendar className="size-5 text-primary" />
							Time Period Analysis
						</CardTitle>
						<CardDescription>View metrics across different time periods</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="daily" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="daily">Today</TabsTrigger>
								<TabsTrigger value="weekly">This Week</TabsTrigger>
								<TabsTrigger value="monthly">This Month</TabsTrigger>
							</TabsList>
							<TabsContent value="daily">
								<div className="space-y-6">
									<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
										{dailyKpis.map((kpi, i) => (
											<PeriodKpiCard key={i} {...kpi} />
										))}
									</div>
									<ChartContainer config={chartConfig} className="h-[240px] w-full">
										<LineChart data={dailyData}>
											<XAxis dataKey="time" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
										</LineChart>
									</ChartContainer>
								</div>
							</TabsContent>
							<TabsContent value="weekly">
								<div className="space-y-6">
									<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
										{weeklyKpis.map((kpi, i) => (
											<PeriodKpiCard key={i} {...kpi} />
										))}
									</div>
									<ChartContainer config={chartConfig} className="h-[240px] w-full">
										<LineChart data={weeklyData}>
											<XAxis dataKey="time" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
										</LineChart>
									</ChartContainer>
								</div>
							</TabsContent>
							<TabsContent value="monthly">
								<div className="space-y-6">
									<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
										{monthlyKpis.map((kpi, i) => (
											<PeriodKpiCard key={i} {...kpi} />
										))}
									</div>
									<ChartContainer config={chartConfig} className="h-[240px] w-full">
										<LineChart data={monthlyData}>
											<XAxis dataKey="time" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}K`} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Line type="monotone" dataKey="revenue" stroke="var(--color-revenue)" strokeWidth={2} dot={false} />
										</LineChart>
									</ChartContainer>
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
