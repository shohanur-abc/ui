import {
	CheckCircle2,
	Clock,
	MoreHorizontal,
	Package,
	ShoppingCart,
	Truck,
	XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type OrderItem = {
	id: string;
	customer: string;
	email: string;
	amount: string;
	date: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
};

const getStatusIcon = (status: OrderItem['status']) => {
	switch (status) {
		case 'pending':
			return <Clock className="size-4 text-amber-500" />;
		case 'processing':
			return <Package className="size-4 text-blue-500" />;
		case 'shipped':
			return <Truck className="size-4 text-primary" />;
		case 'delivered':
			return <CheckCircle2 className="size-4 text-emerald-500" />;
		case 'cancelled':
			return <XCircle className="size-4 text-red-500" />;
	}
};

const getStatusStyle = (status: OrderItem['status']) => {
	switch (status) {
		case 'pending':
			return 'bg-amber-500/10 text-amber-500';
		case 'processing':
			return 'bg-blue-500/10 text-blue-500';
		case 'shipped':
			return 'bg-primary/10 text-primary';
		case 'delivered':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'cancelled':
			return 'bg-red-500/10 text-red-500';
	}
};

const OrderRow = (order: OrderItem) => (
	<TableRow>
		<TableCell className="font-medium">{order.id}</TableCell>
		<TableCell>
			<div>
				<p className="font-medium">{order.customer}</p>
				<p className="text-xs text-muted-foreground">{order.email}</p>
			</div>
		</TableCell>
		<TableCell className="font-medium">{order.amount}</TableCell>
		<TableCell className="hidden @lg:table-cell text-muted-foreground">
			{order.date}
		</TableCell>
		<TableCell>
			<Badge variant="secondary" className={getStatusStyle(order.status)}>
				{order.status}
			</Badge>
		</TableCell>
		<TableCell>
			<Button variant="ghost" size="icon" className="size-8">
				<MoreHorizontal className="size-4" />
			</Button>
		</TableCell>
	</TableRow>
);

export default function Main() {
	const allOrders: OrderItem[] = [
		{
			id: 'ORD-4521',
			customer: 'John Doe',
			email: 'john@example.com',
			amount: '$234.50',
			date: 'Dec 12, 2024',
			status: 'pending',
		},
		{
			id: 'ORD-4520',
			customer: 'Jane Smith',
			email: 'jane@example.com',
			amount: '$189.00',
			date: 'Dec 12, 2024',
			status: 'processing',
		},
		{
			id: 'ORD-4519',
			customer: 'Bob Wilson',
			email: 'bob@example.com',
			amount: '$456.20',
			date: 'Dec 11, 2024',
			status: 'shipped',
		},
		{
			id: 'ORD-4518',
			customer: 'Alice Brown',
			email: 'alice@example.com',
			amount: '$78.90',
			date: 'Dec 11, 2024',
			status: 'delivered',
		},
		{
			id: 'ORD-4517',
			customer: 'Mike Johnson',
			email: 'mike@example.com',
			amount: '$321.00',
			date: 'Dec 10, 2024',
			status: 'delivered',
		},
		{
			id: 'ORD-4516',
			customer: 'Sarah Davis',
			email: 'sarah@example.com',
			amount: '$145.50',
			date: 'Dec 10, 2024',
			status: 'cancelled',
		},
	];

	const pending = allOrders.filter(
		(o) => o.status === 'pending' || o.status === 'processing',
	);
	const shipped = allOrders.filter((o) => o.status === 'shipped');
	const completed = allOrders.filter((o) => o.status === 'delivered');
	const cancelled = allOrders.filter((o) => o.status === 'cancelled');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ShoppingCart className="size-5 text-primary" />
							Order Management
						</CardTitle>
						<CardDescription>Track and manage orders by status</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="all">All ({allOrders.length})</TabsTrigger>
								<TabsTrigger value="pending">
									Pending ({pending.length})
								</TabsTrigger>
								<TabsTrigger value="shipped">
									Shipped ({shipped.length})
								</TabsTrigger>
								<TabsTrigger value="completed">
									Completed ({completed.length})
								</TabsTrigger>
								<TabsTrigger value="cancelled">
									Cancelled ({cancelled.length})
								</TabsTrigger>
							</TabsList>
							<TabsContent value="all">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Order ID</TableHead>
											<TableHead>Customer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Date
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{allOrders.map((order) => (
											<OrderRow key={order.id} {...order} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="pending">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Order ID</TableHead>
											<TableHead>Customer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Date
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{pending.map((order) => (
											<OrderRow key={order.id} {...order} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="shipped">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Order ID</TableHead>
											<TableHead>Customer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Date
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{shipped.map((order) => (
											<OrderRow key={order.id} {...order} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="completed">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Order ID</TableHead>
											<TableHead>Customer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Date
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{completed.map((order) => (
											<OrderRow key={order.id} {...order} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="cancelled">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Order ID</TableHead>
											<TableHead>Customer</TableHead>
											<TableHead>Amount</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Date
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{cancelled.map((order) => (
											<OrderRow key={order.id} {...order} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
