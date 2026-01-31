'use client';

import { Area, AreaChart, XAxis, YAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	TrendingUp,
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

type KpiItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type ChartDataPoint = {
	name: string;
	revenue: number;
	orders: number;
	customers: number;
};

const KpiCard = ({ title, value, change, icon: Icon }: KpiItem) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className="rounded-lg bg-primary/10 p-2.5">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
				<ArrowUpRight className="mr-1 size-3" />
				{change}
			</Badge>
		</CardContent>
	</Card>
);

const chartConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
	orders: { label: 'Orders', color: 'var(--chart-2)' },
	customers: { label: 'Customers', color: 'var(--chart-3)' },
};

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Revenue', value: '$248,632', change: '+28%', icon: DollarSign },
		{ title: 'Orders', value: '6,842', change: '+22%', icon: ShoppingCart },
		{ title: 'Customers', value: '3,847', change: '+18%', icon: Users },
		{ title: 'Products', value: '1,247', change: '+12%', icon: Package },
	];

	const chartData: ChartDataPoint[] = [
		{ name: 'Jan', revenue: 45000, orders: 1200, customers: 450 },
		{ name: 'Feb', revenue: 52000, orders: 1350, customers: 520 },
		{ name: 'Mar', revenue: 48000, orders: 1280, customers: 480 },
		{ name: 'Apr', revenue: 61000, orders: 1560, customers: 620 },
		{ name: 'May', revenue: 55000, orders: 1420, customers: 560 },
		{ name: 'Jun', revenue: 67000, orders: 1720, customers: 680 },
		{ name: 'Jul', revenue: 72000, orders: 1850, customers: 740 },
		{ name: 'Aug', revenue: 69000, orders: 1780, customers: 710 },
		{ name: 'Sep', revenue: 78000, orders: 2010, customers: 800 },
		{ name: 'Oct', revenue: 85000, orders: 2180, customers: 870 },
		{ name: 'Nov', revenue: 92000, orders: 2350, customers: 940 },
		{ name: 'Dec', revenue: 98000, orders: 2520, customers: 1000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<KpiCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader>
							<CardTitle>Performance Overview</CardTitle>
							<CardDescription>View metrics across different time periods</CardDescription>
						</CardHeader>
						<CardContent>
							<Tabs defaultValue="revenue" className="w-full">
								<TabsList className="mb-4">
									<TabsTrigger value="revenue">Revenue</TabsTrigger>
									<TabsTrigger value="orders">Orders</TabsTrigger>
									<TabsTrigger value="customers">Customers</TabsTrigger>
								</TabsList>
								<TabsContent value="revenue">
									<ChartContainer config={chartConfig} className="h-[300px] w-full">
										<AreaChart data={chartData}>
											<defs>
												<linearGradient id="tabs61revenue" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="var(--color-revenue)" stopOpacity={0.3} />
													<stop offset="95%" stopColor="var(--color-revenue)" stopOpacity={0} />
												</linearGradient>
											</defs>
											<XAxis dataKey="name" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}K`} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Area type="monotone" dataKey="revenue" stroke="var(--color-revenue)" fill="url(#tabs61revenue)" />
										</AreaChart>
									</ChartContainer>
								</TabsContent>
								<TabsContent value="orders">
									<ChartContainer config={chartConfig} className="h-[300px] w-full">
										<AreaChart data={chartData}>
											<defs>
												<linearGradient id="tabs61orders" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.3} />
													<stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0} />
												</linearGradient>
											</defs>
											<XAxis dataKey="name" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Area type="monotone" dataKey="orders" stroke="var(--color-orders)" fill="url(#tabs61orders)" />
										</AreaChart>
									</ChartContainer>
								</TabsContent>
								<TabsContent value="customers">
									<ChartContainer config={chartConfig} className="h-[300px] w-full">
										<AreaChart data={chartData}>
											<defs>
												<linearGradient id="tabs61customers" x1="0" y1="0" x2="0" y2="1">
													<stop offset="5%" stopColor="var(--color-customers)" stopOpacity={0.3} />
													<stop offset="95%" stopColor="var(--color-customers)" stopOpacity={0} />
												</linearGradient>
											</defs>
											<XAxis dataKey="name" tickLine={false} axisLine={false} />
											<YAxis tickLine={false} axisLine={false} />
											<ChartTooltip content={<ChartTooltipContent />} />
											<Area type="monotone" dataKey="customers" stroke="var(--color-customers)" fill="url(#tabs61customers)" />
										</AreaChart>
									</ChartContainer>
								</TabsContent>
							</Tabs>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
