'use client';

import { Bar, BarChart, Cell, Pie, PieChart, XAxis } from 'recharts';
import {
	ArrowUpRight,
	Box,
	CreditCard,
	DollarSign,
	Globe,
	ShoppingCart,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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

type TrafficSource = {
	name: string;
	visitors: number;
	percentage: number;
};

type CountryData = {
	country: string;
	sales: number;
	fill: string;
};

const KpiSquare = ({ title, value, change, icon: Icon }: KpiItem) => (
	<div className="group flex flex-col items-center justify-center rounded-xl border bg-card p-4 text-center transition-all hover:border-primary/50 hover:shadow-lg">
		<div className="rounded-lg bg-primary/10 p-2 transition-colors group-hover:bg-primary/20">
			<Icon className="size-5 text-primary" />
		</div>
		<p className="mt-3 text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{title}</p>
		<span className="mt-1 flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const TrafficRow = ({ name, visitors, percentage }: TrafficSource) => (
	<div className="space-y-1.5">
		<div className="flex items-center justify-between text-sm">
			<span>{name}</span>
			<span className="font-medium">{visitors.toLocaleString()}</span>
		</div>
		<Progress value={percentage} className="h-1.5" />
	</div>
);

const chartConfig: ChartConfig = {
	sales: { label: 'Sales' },
};

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Revenue', value: '$89.4k', change: '+23%', icon: DollarSign },
		{ title: 'Orders', value: '2,847', change: '+18%', icon: ShoppingCart },
		{ title: 'Customers', value: '1.2k', change: '+12%', icon: Users },
		{ title: 'Conversion', value: '3.2%', change: '+0.5%', icon: TrendingUp },
	];

	const trafficSources: TrafficSource[] = [
		{ name: 'Organic Search', visitors: 45234, percentage: 42 },
		{ name: 'Direct', visitors: 28456, percentage: 26 },
		{ name: 'Social Media', visitors: 18234, percentage: 17 },
		{ name: 'Referral', visitors: 12456, percentage: 12 },
		{ name: 'Email', visitors: 3234, percentage: 3 },
	];

	const countryData: CountryData[] = [
		{ country: 'United States', sales: 45000, fill: 'var(--chart-1)' },
		{ country: 'United Kingdom', sales: 28000, fill: 'var(--chart-2)' },
		{ country: 'Germany', sales: 18000, fill: 'var(--chart-3)' },
		{ country: 'France', sales: 12000, fill: 'var(--chart-4)' },
		{ country: 'Other', sales: 8000, fill: 'var(--chart-5)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4 @xl:gap-6">
					{kpis.map((kpi, i) => (
						<KpiSquare key={i} {...kpi} />
					))}
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Globe className="size-4 text-muted-foreground" />
								<CardTitle className="text-base">Traffic Sources</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-0">
							{trafficSources.map((source, i) => (
								<TrafficRow key={i} {...source} />
							))}
						</CardContent>
					</Card>
					<Card className="@sm:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-base">Sales by Country</CardTitle>
						</CardHeader>
						<CardContent className="flex items-center gap-4">
							<ChartContainer config={chartConfig} className="h-[160px] w-[160px]">
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Pie
										data={countryData}
										dataKey="sales"
										nameKey="country"
										innerRadius={45}
										outerRadius={75}
									>
										{countryData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="flex-1 space-y-2">
								{countryData.map((item, i) => (
									<div key={i} className="flex items-center gap-2 text-sm">
										<div
											className="size-2 rounded-full"
											style={{ backgroundColor: item.fill }}
										/>
										<span className="flex-1 truncate">{item.country}</span>
										<span className="font-medium">
											${(item.sales / 1000).toFixed(0)}k
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
