'use client';

import { Area, AreaChart, Bar, BarChart, XAxis } from 'recharts';
import {
	ArrowRight,
	ArrowUpRight,
	Calendar,
	Clock,
	DollarSign,
	Package,
	ShoppingCart,
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

type MainKpi = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type TopProduct = {
	name: string;
	sales: number;
	revenue: string;
	image: string;
};

type RecentCustomer = {
	name: string;
	email: string;
	avatar: string;
	initials: string;
	spent: string;
};

const MainKpiCard = ({ title, value, change, icon: Icon }: MainKpi) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4 transition-all hover:border-primary/50">
		<div className="rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 p-3">
			<Icon className="size-5 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-sm text-muted-foreground">{title}</p>
			<p className="text-2xl font-bold tracking-tight">{value}</p>
		</div>
		<Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">
			<ArrowUpRight className="mr-1 size-3" />
			{change}
		</Badge>
	</div>
);

const TopProductRow = ({ name, sales, revenue, image }: TopProduct) => (
	<div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-muted/50">
		<div className="size-10 overflow-hidden rounded-lg bg-muted">
			<img src={image} alt={name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate font-medium">{name}</p>
			<p className="text-xs text-muted-foreground">{sales} sold</p>
		</div>
		<p className="font-semibold">{revenue}</p>
	</div>
);

const RecentCustomerRow = ({
	name,
	email,
	avatar,
	initials,
	spent,
}: RecentCustomer) => (
	<div className="flex items-center gap-3 py-2">
		<Avatar className="size-9">
			<AvatarImage src={avatar} />
			<AvatarFallback className="text-xs">{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{name}</p>
			<p className="truncate text-xs text-muted-foreground">{email}</p>
		</div>
		<p className="text-sm font-medium">{spent}</p>
	</div>
);

const chartConfig: ChartConfig = {
	value: { label: 'Value', color: 'var(--chart-1)' },
};

export default function Main() {
	const mainKpis: MainKpi[] = [
		{
			title: 'Total Revenue',
			value: '$156,432',
			change: '+24%',
			icon: DollarSign,
		},
		{
			title: 'Total Orders',
			value: '4,521',
			change: '+18%',
			icon: ShoppingCart,
		},
	];

	const topProducts: TopProduct[] = [
		{
			name: 'Wireless Headphones Pro',
			sales: 234,
			revenue: '$12,450',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80',
		},
		{
			name: 'Smart Watch Ultra',
			sales: 189,
			revenue: '$10,280',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80',
		},
		{
			name: 'Laptop Stand Ergonomic',
			sales: 156,
			revenue: '$8,920',
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80',
		},
	];

	const recentCustomers: RecentCustomer[] = [
		{
			name: 'Sarah Wilson',
			email: 'sarah@example.com',
			avatar: '',
			initials: 'SW',
			spent: '$1,234',
		},
		{
			name: 'Mike Johnson',
			email: 'mike@example.com',
			avatar: '',
			initials: 'MJ',
			spent: '$987',
		},
		{
			name: 'Emily Davis',
			email: 'emily@example.com',
			avatar: '',
			initials: 'ED',
			spent: '$756',
		},
	];

	const chartData = [
		{ name: 'Jan', value: 12000 },
		{ name: 'Feb', value: 15000 },
		{ name: 'Mar', value: 18000 },
		{ name: 'Apr', value: 22000 },
		{ name: 'May', value: 19000 },
		{ name: 'Jun', value: 25000 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @xl:grid-cols-3 @xl:gap-6">
					<div className="space-y-4 @xl:col-span-2">
						<div className="grid gap-4 @sm:grid-cols-2">
							{mainKpis.map((kpi, i) => (
								<MainKpiCard key={i} {...kpi} />
							))}
						</div>
						<Card>
							<CardHeader className="flex-row items-center justify-between pb-2">
								<CardTitle className="text-base">Revenue Overview</CardTitle>
								<Button variant="ghost" size="sm" className="gap-1" asChild>
									<Link href="/dashboard/revenue">
										View All
										<ArrowRight className="size-3" />
									</Link>
								</Button>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={chartConfig}
									className="h-[200px] w-full"
								>
									<AreaChart data={chartData}>
										<defs>
											<linearGradient
												id="bento24fill"
												x1="0"
												y1="0"
												x2="0"
												y2="1"
											>
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
											strokeWidth={2}
											fill="url(#bento24fill)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<div className="space-y-4">
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Top Products</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2 pt-0">
								{topProducts.map((product, i) => (
									<TopProductRow key={i} {...product} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Recent Customers</CardTitle>
							</CardHeader>
							<CardContent className="space-y-1 pt-0">
								{recentCustomers.map((customer, i) => (
									<RecentCustomerRow key={i} {...customer} />
								))}
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
