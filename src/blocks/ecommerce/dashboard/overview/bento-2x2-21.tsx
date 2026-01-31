import {
	ArrowUpRight,
	DollarSign,
	Package,
	ShoppingCart,
	Users,
	type LucideIcon,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
	progress: number;
};

type RecentOrderItem = {
	id: string;
	customer: string;
	amount: string;
	status: 'completed' | 'pending' | 'processing';
};

const KpiCard = ({ title, value, change, icon: Icon, progress }: KpiItem) => (
	<Card className="group transition-all duration-300 hover:border-primary/50">
		<CardContent className="p-5">
			<div className="flex items-start justify-between">
				<div className="rounded-lg bg-primary/10 p-2">
					<Icon className="size-4 text-primary" />
				</div>
				<span className="flex items-center text-xs font-medium text-emerald-500">
					<ArrowUpRight className="size-3" />
					{change}
				</span>
			</div>
			<div className="mt-3">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<Progress value={progress} className="mt-3 h-1" />
		</CardContent>
	</Card>
);

const getStatusColor = (status: RecentOrderItem['status']) => {
	switch (status) {
		case 'completed':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'processing':
			return 'bg-primary/10 text-primary';
	}
};

const RecentOrdersCard = ({ orders }: { orders: RecentOrderItem[] }) => (
	<Card className="row-span-2">
		<CardHeader>
			<CardTitle className="text-base">Recent Orders</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4 pt-0">
			{orders.map((order) => (
				<div
					key={order.id}
					className="flex items-center justify-between rounded-lg border bg-card/50 p-3"
				>
					<div>
						<p className="font-medium">{order.customer}</p>
						<p className="text-xs text-muted-foreground">#{order.id}</p>
					</div>
					<div className="text-right">
						<p className="font-medium">{order.amount}</p>
						<span
							className={`inline-block rounded-full px-2 py-0.5 text-xs ${getStatusColor(order.status)}`}
						>
							{order.status}
						</span>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

export default function Main() {
	const kpis: KpiItem[] = [
		{
			title: 'Total Revenue',
			value: '$45,231',
			change: '+20%',
			icon: DollarSign,
			progress: 75,
		},
		{
			title: 'Total Orders',
			value: '2,350',
			change: '+15%',
			icon: ShoppingCart,
			progress: 82,
		},
		{
			title: 'Products',
			value: '1,234',
			change: '+8%',
			icon: Package,
			progress: 65,
		},
		{
			title: 'Customers',
			value: '573',
			change: '+12%',
			icon: Users,
			progress: 58,
		},
	];

	const recentOrders: RecentOrderItem[] = [
		{ id: 'ORD-001', customer: 'John Doe', amount: '$234.50', status: 'completed' },
		{ id: 'ORD-002', customer: 'Jane Smith', amount: '$189.00', status: 'processing' },
		{ id: 'ORD-003', customer: 'Bob Wilson', amount: '$456.20', status: 'pending' },
		{ id: 'ORD-004', customer: 'Alice Brown', amount: '$78.90', status: 'completed' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3 @xl:gap-6">
					{kpis.slice(0, 2).map((kpi, i) => (
						<KpiCard key={i} {...kpi} />
					))}
					<RecentOrdersCard orders={recentOrders} />
					{kpis.slice(2).map((kpi, i) => (
						<KpiCard key={i + 2} {...kpi} />
					))}
				</div>
			</div>
		</section>
	);
}
