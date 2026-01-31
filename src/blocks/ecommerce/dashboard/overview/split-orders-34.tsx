'use client';

import { Bar, BarChart, XAxis } from 'recharts';
import {
	ArrowRight,
	Box,
	CheckCircle2,
	Clock,
	Package,
	ShoppingCart,
	Truck,
	XCircle,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart';

type StatusItem = {
	label: string;
	count: number;
	icon: LucideIcon;
	color: string;
};

type OrderItem = {
	id: string;
	customer: string;
	initials: string;
	items: number;
	amount: string;
	time: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered';
};

const StatusCard = ({ label, count, icon: Icon, color }: StatusItem) => (
	<div className="rounded-xl border bg-card p-4 transition-all hover:border-primary/50">
		<div className={`inline-flex rounded-lg p-2 ${color}`}>
			<Icon className="size-4" />
		</div>
		<p className="mt-3 text-2xl font-bold">{count}</p>
		<p className="text-sm text-muted-foreground">{label}</p>
	</div>
);

const getStatusIcon = (status: OrderItem['status']) => {
	switch (status) {
		case 'pending':
			return <Clock className="size-4 text-amber-500" />;
		case 'processing':
			return <Package className="size-4 text-primary" />;
		case 'shipped':
			return <Truck className="size-4 text-blue-500" />;
		case 'delivered':
			return <CheckCircle2 className="size-4 text-emerald-500" />;
	}
};

const OrderRow = ({
	id,
	customer,
	initials,
	items,
	amount,
	time,
	status,
}: OrderItem) => (
	<div className="flex items-center gap-4 rounded-lg border bg-card/50 p-4 transition-all hover:bg-card">
		<Avatar className="size-10">
			<AvatarFallback className="text-xs">{initials}</AvatarFallback>
		</Avatar>
		<div className="flex-1 min-w-0">
			<div className="flex items-center gap-2">
				<p className="font-medium">{customer}</p>
				<Badge variant="outline" className="text-xs">
					#{id}
				</Badge>
			</div>
			<p className="text-sm text-muted-foreground">
				{items} items • {time}
			</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">{amount}</p>
			<div className="flex items-center justify-end gap-1.5 text-xs capitalize">
				{getStatusIcon(status)}
				{status}
			</div>
		</div>
	</div>
);

const chartConfig: ChartConfig = {
	orders: { label: 'Orders', color: 'var(--chart-1)' },
};

export default function Main() {
	const statuses: StatusItem[] = [
		{ label: 'Pending', count: 42, icon: Clock, color: 'bg-amber-500/10 text-amber-500' },
		{ label: 'Processing', count: 28, icon: Package, color: 'bg-primary/10 text-primary' },
		{ label: 'Shipped', count: 156, icon: Truck, color: 'bg-blue-500/10 text-blue-500' },
		{ label: 'Delivered', count: 892, icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-500' },
	];

	const recentOrders: OrderItem[] = [
		{ id: '4521', customer: 'John Doe', initials: 'JD', items: 3, amount: '$234.50', time: '2 min ago', status: 'pending' },
		{ id: '4520', customer: 'Jane Smith', initials: 'JS', items: 2, amount: '$189.00', time: '15 min ago', status: 'processing' },
		{ id: '4519', customer: 'Bob Wilson', initials: 'BW', items: 5, amount: '$456.20', time: '1 hour ago', status: 'shipped' },
		{ id: '4518', customer: 'Alice Brown', initials: 'AB', items: 1, amount: '$78.90', time: '2 hours ago', status: 'delivered' },
	];

	const chartData = [
		{ hour: '9AM', orders: 12 },
		{ hour: '10AM', orders: 18 },
		{ hour: '11AM', orders: 24 },
		{ hour: '12PM', orders: 32 },
		{ hour: '1PM', orders: 28 },
		{ hour: '2PM', orders: 22 },
		{ hour: '3PM', orders: 26 },
		{ hour: '4PM', orders: 31 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-6 @xl:grid-cols-2">
					<div className="space-y-6">
						<div className="grid grid-cols-2 gap-4 @lg:grid-cols-4">
							{statuses.map((status, i) => (
								<StatusCard key={i} {...status} />
							))}
						</div>
						<Card>
							<CardHeader className="pb-2">
								<CardTitle className="text-base">Orders Today</CardTitle>
							</CardHeader>
							<CardContent>
								<ChartContainer config={chartConfig} className="h-[180px] w-full">
									<BarChart data={chartData}>
										<XAxis dataKey="hour" tickLine={false} axisLine={false} fontSize={11} />
										<ChartTooltip content={<ChartTooltipContent hideLabel />} />
										<Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
									</BarChart>
								</ChartContainer>
							</CardContent>
						</Card>
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Recent Orders</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/orders">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="space-y-3 pt-0">
							{recentOrders.map((order) => (
								<OrderRow key={order.id} {...order} />
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
