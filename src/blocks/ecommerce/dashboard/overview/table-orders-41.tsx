'use client';

import {
	ArrowRight,
	ArrowUpRight,
	CheckCircle2,
	Clock,
	DollarSign,
	MoreHorizontal,
	Package,
	ShoppingCart,
	Truck,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type SummaryItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
	color: string;
};

type OrderRow = {
	id: string;
	customer: string;
	email: string;
	products: number;
	amount: string;
	date: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	payment: 'paid' | 'pending' | 'refunded';
};

const SummaryCard = ({
	title,
	value,
	change,
	icon: Icon,
	color,
}: SummaryItem) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className={`rounded-lg p-2.5 ${color}`}>
				<Icon className="size-5" />
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

const getStatusStyle = (status: OrderRow['status']) => {
	switch (status) {
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'processing':
			return 'bg-primary/10 text-primary';
		case 'shipped':
			return 'bg-blue-500/10 text-blue-500';
		case 'delivered':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'cancelled':
			return 'bg-red-500/10 text-red-500';
	}
};

const getPaymentStyle = (payment: OrderRow['payment']) => {
	switch (payment) {
		case 'paid':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'refunded':
			return 'bg-red-500/10 text-red-500';
	}
};

export default function Main() {
	const summaries: SummaryItem[] = [
		{
			title: 'Total Orders',
			value: '2,847',
			change: '+18%',
			icon: ShoppingCart,
			color: 'bg-primary/10 text-primary',
		},
		{
			title: 'Pending',
			value: '42',
			change: '-5%',
			icon: Clock,
			color: 'bg-amber-500/10 text-amber-500',
		},
		{
			title: 'Shipped',
			value: '156',
			change: '+12%',
			icon: Truck,
			color: 'bg-blue-500/10 text-blue-500',
		},
		{
			title: 'Delivered',
			value: '892',
			change: '+24%',
			icon: CheckCircle2,
			color: 'bg-emerald-500/10 text-emerald-500',
		},
	];

	const orders: OrderRow[] = [
		{
			id: 'ORD-4521',
			customer: 'John Doe',
			email: 'john@example.com',
			products: 3,
			amount: '$234.50',
			date: 'Dec 12, 2024',
			status: 'pending',
			payment: 'paid',
		},
		{
			id: 'ORD-4520',
			customer: 'Jane Smith',
			email: 'jane@example.com',
			products: 2,
			amount: '$189.00',
			date: 'Dec 12, 2024',
			status: 'processing',
			payment: 'paid',
		},
		{
			id: 'ORD-4519',
			customer: 'Bob Wilson',
			email: 'bob@example.com',
			products: 5,
			amount: '$456.20',
			date: 'Dec 11, 2024',
			status: 'shipped',
			payment: 'paid',
		},
		{
			id: 'ORD-4518',
			customer: 'Alice Brown',
			email: 'alice@example.com',
			products: 1,
			amount: '$78.90',
			date: 'Dec 11, 2024',
			status: 'delivered',
			payment: 'paid',
		},
		{
			id: 'ORD-4517',
			customer: 'Mike Johnson',
			email: 'mike@example.com',
			products: 4,
			amount: '$321.00',
			date: 'Dec 10, 2024',
			status: 'delivered',
			payment: 'paid',
		},
		{
			id: 'ORD-4516',
			customer: 'Sarah Davis',
			email: 'sarah@example.com',
			products: 2,
			amount: '$145.50',
			date: 'Dec 10, 2024',
			status: 'cancelled',
			payment: 'refunded',
		},
		{
			id: 'ORD-4515',
			customer: 'Tom Wilson',
			email: 'tom@example.com',
			products: 3,
			amount: '$267.80',
			date: 'Dec 09, 2024',
			status: 'delivered',
			payment: 'paid',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{summaries.map((item, i) => (
							<SummaryCard key={i} {...item} />
						))}
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
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Order ID</TableHead>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Products
										</TableHead>
										<TableHead>Amount</TableHead>
										<TableHead className="hidden @xl:table-cell">
											Date
										</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="hidden @lg:table-cell">
											Payment
										</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{orders.map((order) => (
										<TableRow key={order.id}>
											<TableCell className="font-medium">{order.id}</TableCell>
											<TableCell>
												<div>
													<p className="font-medium">{order.customer}</p>
													<p className="text-xs text-muted-foreground">
														{order.email}
													</p>
												</div>
											</TableCell>
											<TableCell className="hidden @lg:table-cell">
												{order.products}
											</TableCell>
											<TableCell className="font-medium">
												{order.amount}
											</TableCell>
											<TableCell className="hidden @xl:table-cell text-muted-foreground">
												{order.date}
											</TableCell>
											<TableCell>
												<Badge
													variant="secondary"
													className={getStatusStyle(order.status)}
												>
													{order.status}
												</Badge>
											</TableCell>
											<TableCell className="hidden @lg:table-cell">
												<Badge
													variant="secondary"
													className={getPaymentStyle(order.payment)}
												>
													{order.payment}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" className="size-8">
													<MoreHorizontal className="size-4" />
												</Button>
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
