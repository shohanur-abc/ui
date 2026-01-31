'use client';

import { Area, AreaChart, Cell, Pie, PieChart, XAxis } from 'recharts';
import {
	ArrowRight,
	ArrowUpRight,
	DollarSign,
	Mail,
	MapPin,
	ShoppingBag,
	Star,
	TrendingUp,
	Users,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type CustomerKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type TopCustomer = {
	name: string;
	email: string;
	avatar: string;
	initials: string;
	orders: number;
	spent: string;
	location: string;
};

type SegmentData = {
	name: string;
	value: number;
	fill: string;
};

const CustomerKpiCard = ({ title, value, change, icon: Icon }: CustomerKpi) => (
	<div className="rounded-xl border bg-card p-4">
		<Icon className="size-5 text-primary" />
		<p className="mt-3 text-2xl font-bold">{value}</p>
		<div className="flex items-center justify-between">
			<p className="text-sm text-muted-foreground">{title}</p>
			<span className="flex items-center text-xs text-emerald-500">
				<ArrowUpRight className="size-3" />
				{change}
			</span>
		</div>
	</div>
);

const TopCustomerRow = ({
	name,
	email,
	avatar,
	initials,
	orders,
	spent,
	location,
}: TopCustomer) => (
	<div className="flex items-center gap-4 rounded-lg border bg-card/50 p-4 transition-all hover:bg-card">
		<Avatar className="size-12">
			<AvatarImage src={avatar} />
			<AvatarFallback>{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="truncate font-medium">{name}</p>
			<p className="truncate text-sm text-muted-foreground">{email}</p>
			<div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
				<MapPin className="size-3" />
				{location}
			</div>
		</div>
		<div className="text-right">
			<p className="font-semibold">{spent}</p>
			<p className="text-sm text-muted-foreground">{orders} orders</p>
		</div>
	</div>
);

const areaConfig: ChartConfig = {
	customers: { label: 'Customers', color: 'var(--chart-1)' },
};

const pieConfig: ChartConfig = {
	value: { label: 'Value' },
};

export default function Main() {
	const customerKpis: CustomerKpi[] = [
		{ title: 'Total Customers', value: '3,847', change: '+18%', icon: Users },
		{ title: 'New This Month', value: '234', change: '+24%', icon: TrendingUp },
		{ title: 'Avg Lifetime Value', value: '$456', change: '+12%', icon: DollarSign },
		{ title: 'Retention Rate', value: '78%', change: '+5%', icon: Star },
	];

	const topCustomers: TopCustomer[] = [
		{ name: 'Sarah Wilson', email: 'sarah@example.com', avatar: '', initials: 'SW', orders: 45, spent: '$4,521', location: 'New York, US' },
		{ name: 'Michael Chen', email: 'michael@example.com', avatar: '', initials: 'MC', orders: 38, spent: '$3,892', location: 'San Francisco, US' },
		{ name: 'Emma Johnson', email: 'emma@example.com', avatar: '', initials: 'EJ', orders: 32, spent: '$3,245', location: 'London, UK' },
	];

	const segmentData: SegmentData[] = [
		{ name: 'VIP', value: 15, fill: 'var(--chart-1)' },
		{ name: 'Regular', value: 45, fill: 'var(--chart-2)' },
		{ name: 'New', value: 25, fill: 'var(--chart-3)' },
		{ name: 'Inactive', value: 15, fill: 'var(--chart-4)' },
	];

	const growthData = [
		{ month: 'Jan', customers: 2400 },
		{ month: 'Feb', customers: 2800 },
		{ month: 'Mar', customers: 3100 },
		{ month: 'Apr', customers: 3400 },
		{ month: 'May', customers: 3600 },
		{ month: 'Jun', customers: 3847 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-4">
						<div className="grid grid-cols-2 gap-4">
							{customerKpis.map((kpi, i) => (
								<CustomerKpiCard key={i} {...kpi} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Customer Segments</CardTitle>
							</CardHeader>
							<CardContent className="flex items-center gap-6">
								<ChartContainer config={pieConfig} className="h-[140px] w-[140px]">
									<PieChart>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Pie
											data={segmentData}
											dataKey="value"
											nameKey="name"
											innerRadius={40}
											outerRadius={65}
										>
											{segmentData.map((entry, index) => (
												<Cell key={`cell-${index}`} fill={entry.fill} />
											))}
										</Pie>
									</PieChart>
								</ChartContainer>
								<div className="flex-1 space-y-2">
									{segmentData.map((item, i) => (
										<div key={i} className="flex items-center justify-between">
											<div className="flex items-center gap-2">
												<div
													className="size-2.5 rounded-full"
													style={{ backgroundColor: item.fill }}
												/>
												<span className="text-sm">{item.name}</span>
											</div>
											<span className="text-sm font-medium">{item.value}%</span>
										</div>
									))}
								</div>
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Customer Growth</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={areaConfig} className="h-[140px] w-full">
									<AreaChart data={growthData}>
										<defs>
											<linearGradient id="split36fill" x1="0" y1="0" x2="0" y2="1">
												<stop offset="5%" stopColor="var(--color-customers)" stopOpacity={0.3} />
												<stop offset="95%" stopColor="var(--color-customers)" stopOpacity={0} />
											</linearGradient>
										</defs>
										<XAxis dataKey="month" tickLine={false} axisLine={false} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Area
											type="monotone"
											dataKey="customers"
											stroke="var(--color-customers)"
											fill="url(#split36fill)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Top Customers</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/customers">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="space-y-4 pt-0">
							{topCustomers.map((customer, i) => (
								<TopCustomerRow key={i} {...customer} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
