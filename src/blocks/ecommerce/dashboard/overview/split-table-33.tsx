'use client';

import { Area, AreaChart, XAxis } from 'recharts';
import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type SummaryItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type OrderItem = {
	id: string;
	customer: string;
	product: string;
	amount: string;
	status: 'completed' | 'pending' | 'processing';
};

const SummaryMini = ({ title, value, change, icon: Icon }: SummaryItem) => (
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

const getStatusStyle = (status: OrderItem['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'processing':
			return 'bg-primary/10 text-primary';
	}
};

const chartConfig: ChartConfig = {
	value: { label: 'Revenue', color: 'var(--chart-1)' },
};

export default function Main() {
	const summaries: SummaryItem[] = [
		{ title: 'Revenue', value: '$67.4k', change: '+24%', icon: DollarSign },
		{ title: 'Orders', value: '1,847', change: '+18%', icon: ShoppingCart },
		{ title: 'Products', value: '456', change: '+8%', icon: Package },
		{ title: 'Customers', value: '892', change: '+12%', icon: Users },
	];

	const orders: OrderItem[] = [
		{
			id: 'ORD-4521',
			customer: 'John Doe',
			product: 'Wireless Headphones',
			amount: '$129.99',
			status: 'completed',
		},
		{
			id: 'ORD-4520',
			customer: 'Jane Smith',
			product: 'Smart Watch',
			amount: '$299.99',
			status: 'processing',
		},
		{
			id: 'ORD-4519',
			customer: 'Bob Wilson',
			product: 'Laptop Stand',
			amount: '$79.99',
			status: 'pending',
		},
		{
			id: 'ORD-4518',
			customer: 'Alice Brown',
			product: 'USB Hub',
			amount: '$49.99',
			status: 'completed',
		},
		{
			id: 'ORD-4517',
			customer: 'Mike Johnson',
			product: 'Keyboard',
			amount: '$159.99',
			status: 'completed',
		},
	];

	const chartData = [
		{ day: 'Mon', value: 4200 },
		{ day: 'Tue', value: 5800 },
		{ day: 'Wed', value: 4900 },
		{ day: 'Thu', value: 6400 },
		{ day: 'Fri', value: 7200 },
		{ day: 'Sat', value: 8100 },
		{ day: 'Sun', value: 6800 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-2">
						<Card>
							<CardContent className="grid gap-0 divide-y p-0 @sm:grid-cols-2 @sm:divide-x @sm:divide-y-0">
								{summaries.slice(0, 2).map((item, i) => (
									<SummaryMini key={i} {...item} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardContent className="grid gap-0 divide-y p-0 @sm:grid-cols-2 @sm:divide-x @sm:divide-y-0">
								{summaries.slice(2).map((item, i) => (
									<SummaryMini key={i} {...item} />
								))}
							</CardContent>
						</Card>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-sm">Weekly Trend</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer
									config={chartConfig}
									className="h-[140px] w-full"
								>
									<AreaChart data={chartData}>
										<defs>
											<linearGradient
												id="split33fill"
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
										<XAxis
											dataKey="day"
											tickLine={false}
											axisLine={false}
											fontSize={11}
										/>
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Area
											type="monotone"
											dataKey="value"
											stroke="var(--color-value)"
											fill="url(#split33fill)"
										/>
									</AreaChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card className="@xl:col-span-3">
						<CardHeader className="pb-2">
							<div className="flex items-center justify-between">
								<CardTitle className="text-base">Recent Orders</CardTitle>
								<Badge variant="secondary">5 new</Badge>
							</div>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Order ID</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Product
										</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orders.map((order) => (
										<TableRow key={order.id}>
											<TableCell className="font-medium">{order.id}</TableCell>
											<TableCell>{order.customer}</TableCell>
											<TableCell className="hidden @lg:table-cell">
												{order.product}
											</TableCell>
											<TableCell>{order.amount}</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getStatusStyle(order.status)}
												>
													{order.status}
												</Badge>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
