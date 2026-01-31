'use client';

import { Area, AreaChart, Bar, BarChart, XAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	ShoppingBag,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type ChartDataItem = {
	name: string;
	value: number;
};

const KpiMini = ({ title, value, change, icon: Icon }: KpiItem) => (
	<div className="flex items-center gap-3 p-3">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="font-bold">{value}</p>
		</div>
		<span className="flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const areaConfig: ChartConfig = {
	value: { label: 'Revenue', color: 'var(--chart-1)' },
};

const barConfig: ChartConfig = {
	value: { label: 'Orders', color: 'var(--chart-2)' },
};

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Revenue', value: '$89.4k', change: '+23%', icon: DollarSign },
		{ title: 'Orders', value: '2,847', change: '+18%', icon: ShoppingBag },
		{ title: 'Customers', value: '1.2k', change: '+12%', icon: Users },
		{ title: 'Growth', value: '24.5%', change: '+3%', icon: TrendingUp },
	];

	const revenueData: ChartDataItem[] = [
		{ name: 'Mon', value: 4200 },
		{ name: 'Tue', value: 5800 },
		{ name: 'Wed', value: 4900 },
		{ name: 'Thu', value: 6400 },
		{ name: 'Fri', value: 7200 },
		{ name: 'Sat', value: 8100 },
		{ name: 'Sun', value: 6800 },
	];

	const ordersData: ChartDataItem[] = [
		{ name: 'Mon', value: 42 },
		{ name: 'Tue', value: 58 },
		{ name: 'Wed', value: 49 },
		{ name: 'Thu', value: 64 },
		{ name: 'Fri', value: 72 },
		{ name: 'Sat', value: 81 },
		{ name: 'Sun', value: 68 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @lg:grid-cols-2 @xl:grid-cols-3 @xl:gap-6">
					<Card className="@xl:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Revenue Trend</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={areaConfig} className="h-[200px] w-full">
								<AreaChart data={revenueData}>
									<defs>
										<linearGradient id="bentofill" x1="0" y1="0" x2="0" y2="1">
											<stop
												offset="5%"
												stopColor="var(--color-value)"
												stopOpacity={0.3}
											/>
											<stop
												offset="95%"
												stopColor="var(--color-value)"
												stopOpacity={0}
											/>
										</linearGradient>
									</defs>
									<XAxis dataKey="name" tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Area
										type="monotone"
										dataKey="value"
										stroke="var(--color-value)"
										fill="url(#bentofill)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Quick Stats</CardTitle>
						</CardHeader>
						<CardContent className="divide-y p-0">
							{kpis.slice(0, 3).map((kpi, i) => (
								<KpiMini key={i} {...kpi} />
							))}
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Orders This Week</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={barConfig} className="h-[140px] w-full">
								<BarChart data={ordersData}>
									<XAxis dataKey="name" tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="value"
										fill="var(--color-value)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card className="@xl:col-span-2">
						<CardContent className="grid gap-0 divide-x p-0 @sm:grid-cols-4">
							{kpis.map((kpi, i) => (
								<div key={i} className="p-4 text-center">
									<kpi.icon className="mx-auto size-5 text-primary" />
									<p className="mt-2 text-2xl font-bold">{kpi.value}</p>
									<p className="text-xs text-muted-foreground">{kpi.title}</p>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
