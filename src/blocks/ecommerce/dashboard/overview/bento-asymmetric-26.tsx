'use client';

import { Area, AreaChart, Bar, BarChart, XAxis } from 'recharts';
import {
	ArrowDownRight,
	ArrowUpRight,
	Box,
	CircleDollarSign,
	Clock,
	CreditCard,
	Package,
	Percent,
	RefreshCw,
	ShoppingBag,
	TrendingUp,
	Truck,
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

type MiniStat = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
};

type OrderStatus = {
	label: string;
	count: number;
	percentage: number;
	color: string;
};

const MiniStatCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
}: MiniStat) => (
	<div className="flex items-center gap-3 rounded-lg border bg-card/50 p-3 transition-all hover:bg-card">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-xs text-muted-foreground">{title}</p>
			<p className="font-bold">{value}</p>
		</div>
		<span
			className={`flex items-center text-xs ${trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}
		>
			{trend === 'up' ? (
				<ArrowUpRight className="size-3" />
			) : (
				<ArrowDownRight className="size-3" />
			)}
			{change}
		</span>
	</div>
);

const OrderStatusRow = ({ label, count, percentage, color }: OrderStatus) => (
	<div className="flex items-center gap-3">
		<div className={`size-2 rounded-full ${color}`} />
		<span className="flex-1 text-sm">{label}</span>
		<span className="text-sm font-medium">{count}</span>
		<span className="w-10 text-right text-xs text-muted-foreground">
			{percentage}%
		</span>
	</div>
);

const areaConfig: ChartConfig = {
	revenue: { label: 'Revenue', color: 'var(--chart-1)' },
};

const barConfig: ChartConfig = {
	orders: { label: 'Orders', color: 'var(--chart-2)' },
};

export default function Main() {
	const miniStats: MiniStat[] = [
		{
			title: 'Revenue',
			value: '$67.8k',
			change: '+22%',
			trend: 'up',
			icon: CircleDollarSign,
		},
		{
			title: 'Orders',
			value: '1,847',
			change: '+15%',
			trend: 'up',
			icon: ShoppingBag,
		},
		{
			title: 'Avg Order',
			value: '$36.70',
			change: '-3%',
			trend: 'down',
			icon: CreditCard,
		},
		{
			title: 'Customers',
			value: '892',
			change: '+18%',
			trend: 'up',
			icon: TrendingUp,
		},
		{
			title: 'Products',
			value: '456',
			change: '+8%',
			trend: 'up',
			icon: Package,
		},
		{
			title: 'Returns',
			value: '2.1%',
			change: '-0.5%',
			trend: 'up',
			icon: RefreshCw,
		},
	];

	const orderStatuses: OrderStatus[] = [
		{
			label: 'Delivered',
			count: 1245,
			percentage: 68,
			color: 'bg-emerald-500',
		},
		{ label: 'Shipped', count: 342, percentage: 18, color: 'bg-primary' },
		{ label: 'Processing', count: 186, percentage: 10, color: 'bg-amber-500' },
		{
			label: 'Pending',
			count: 74,
			percentage: 4,
			color: 'bg-muted-foreground',
		},
	];

	const revenueData = [
		{ day: 'Mon', revenue: 8400 },
		{ day: 'Tue', revenue: 12200 },
		{ day: 'Wed', revenue: 9800 },
		{ day: 'Thu', revenue: 14500 },
		{ day: 'Fri', revenue: 16200 },
		{ day: 'Sat', revenue: 18900 },
		{ day: 'Sun', revenue: 15400 },
	];

	const ordersData = [
		{ day: 'Mon', orders: 145 },
		{ day: 'Tue', orders: 198 },
		{ day: 'Wed', orders: 167 },
		{ day: 'Thu', orders: 234 },
		{ day: 'Fri', orders: 278 },
		{ day: 'Sat', orders: 312 },
		{ day: 'Sun', orders: 256 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @lg:grid-cols-3 @xl:gap-6">
					<div className="grid gap-3 @sm:grid-cols-2 @lg:col-span-2 @lg:grid-cols-3">
						{miniStats.map((stat, i) => (
							<MiniStatCard key={i} {...stat} />
						))}
					</div>
					<Card>
						<CardHeader className="pb-2">
							<div className="flex items-center gap-2">
								<Truck className="size-4 text-muted-foreground" />
								<CardTitle className="text-sm">Order Status</CardTitle>
							</div>
						</CardHeader>
						<CardContent className="space-y-3 pt-0">
							{orderStatuses.map((status, i) => (
								<OrderStatusRow key={i} {...status} />
							))}
						</CardContent>
					</Card>
					<Card className="@lg:col-span-2">
						<CardHeader className="pb-2">
							<CardTitle className="text-sm">Weekly Revenue</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={areaConfig} className="h-[180px] w-full">
								<AreaChart data={revenueData}>
									<defs>
										<linearGradient
											id="bento26fill"
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
										fill="url(#bento26fill)"
									/>
								</AreaChart>
							</ChartContainer>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="pb-2">
							<CardTitle className="text-sm">Weekly Orders</CardTitle>
						</CardHeader>
						<CardContent>
							<ChartContainer config={barConfig} className="h-[180px] w-full">
								<BarChart data={ordersData}>
									<XAxis dataKey="day" tickLine={false} axisLine={false} />
									<ChartTooltip content={<ChartTooltipContent hideLabel />} />
									<Bar
										dataKey="orders"
										fill="var(--color-orders)"
										radius={[4, 4, 0, 0]}
									/>
								</BarChart>
							</ChartContainer>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
