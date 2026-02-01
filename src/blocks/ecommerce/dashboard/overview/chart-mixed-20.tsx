'use client';

import {
	Area,
	AreaChart,
	Bar,
	BarChart,
	CartesianGrid,
	Cell,
	Pie,
	PieChart,
	XAxis,
	YAxis,
} from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
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

type RevenueDataItem = {
	month: string;
	revenue: number;
};

type CategoryDataItem = {
	name: string;
	value: number;
	fill: string;
};

const KpiCard = ({ title, value, change, icon: Icon }: KpiItem) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card/50 p-4 transition-colors hover:bg-card">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		<span className="flex items-center text-xs font-medium text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const revenueConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

const categoryConfig: ChartConfig = {
	value: { label: 'Value' },
};

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Revenue', value: '$45.2k', change: '+12%', icon: DollarSign },
		{ title: 'Orders', value: '1,234', change: '+8%', icon: ShoppingCart },
		{ title: 'Products', value: '856', change: '+5%', icon: Package },
		{ title: 'Customers', value: '2.4k', change: '+15%', icon: Users },
	];

	const revenueData: RevenueDataItem[] = [
		{ month: 'Jan', revenue: 12000 },
		{ month: 'Feb', revenue: 15000 },
		{ month: 'Mar', revenue: 18000 },
		{ month: 'Apr', revenue: 22000 },
		{ month: 'May', revenue: 19000 },
		{ month: 'Jun', revenue: 25000 },
	];

	const categoryData: CategoryDataItem[] = [
		{ name: 'Electronics', value: 35, fill: 'var(--chart-1)' },
		{ name: 'Clothing', value: 28, fill: 'var(--chart-2)' },
		{ name: 'Home', value: 22, fill: 'var(--chart-3)' },
		{ name: 'Other', value: 15, fill: 'var(--chart-4)' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @lg:grid-cols-3">
					<div className="space-y-4 @lg:col-span-2">
						<div className="grid gap-3 @sm:grid-cols-2 @xl:grid-cols-4">
							{kpis.map((kpi, i) => (
								<KpiCard key={i} {...kpi} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm font-medium">
									Revenue Trend
								</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={revenueConfig}
									className="h-[200px] w-full"
								>
									<AreaChart data={revenueData}>
										<defs>
											<linearGradient
												id="fillRevenueMixed"
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
										<CartesianGrid strokeDasharray="3 3" vertical={false} />
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Area
											type="monotone"
											dataKey="revenue"
											stroke="var(--color-revenue)"
											fill="url(#fillRevenueMixed)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm font-medium">
								Sales by Category
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col items-center">
							<ChartContainer
								config={categoryConfig}
								className="h-[180px] w-[180px]"
							>
								<PieChart>
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Pie
										data={categoryData}
										dataKey="value"
										nameKey="name"
										innerRadius={50}
										outerRadius={80}
									>
										{categoryData.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={entry.fill} />
										))}
									</Pie>
								</PieChart>
							</ChartContainer>
							<div className="mt-4 grid w-full grid-cols-2 gap-2">
								{categoryData.map((item, i) => (
									<div key={i} className="flex items-center gap-2">
										<div
											className="size-2 rounded-full"
											style={{ backgroundColor: item.fill }}
										/>
										<span className="text-xs text-muted-foreground">
											{item.name}
										</span>
										<span className="ml-auto text-xs font-medium">
											{item.value}%
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
