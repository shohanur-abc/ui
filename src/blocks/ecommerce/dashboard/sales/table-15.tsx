'use client';

import {
	ShoppingBag,
	Package,
	DollarSign,
	Truck,
	Calendar,
	Eye,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type OrderDetail = {
	orderId: string;
	customer: string;
	email: string;
	items: {
		name: string;
		quantity: number;
		price: number;
	}[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	paymentMethod: string;
	status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
	orderDate: string;
	shippingAddress: string;
};

type OrderDetailTableCardProps = {
	title: string;
	description: string;
	orders: OrderDetail[];
	actionLabel: string;
	onViewDetails: (orderId: string) => void;
};

const getStatusVariant = (status: OrderDetail['status']) => {
	switch (status) {
		case 'pending':
			return 'secondary';
		case 'processing':
			return 'outline';
		case 'shipped':
			return 'default';
		case 'delivered':
			return 'default';
		case 'cancelled':
			return 'destructive';
	}
};

const OrderDetailTableCard = ({
	title,
	description,
	orders,
	actionLabel,
	onViewDetails,
}: OrderDetailTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<ShoppingBag className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Order Info</TableHead>
							<TableHead>Items</TableHead>
							<TableHead className="text-right">Subtotal</TableHead>
							<TableHead className="text-right">Shipping</TableHead>
							<TableHead className="text-right">Total</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{orders.map((order) => (
							<TableRow
								key={order.orderId}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell>
									<div className="space-y-1">
										<p className="font-mono font-semibold">{order.orderId}</p>
										<p className="text-sm font-medium">{order.customer}</p>
										<div className="flex items-center gap-1 text-xs text-muted-foreground">
											<Calendar className="size-3" />
											{order.orderDate}
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="space-y-1">
										{order.items.slice(0, 2).map((item, idx) => (
											<div
												key={idx}
												className="flex items-center gap-2 text-sm"
											>
												<Package className="size-3 text-muted-foreground" />
												<span className="truncate max-w-[150px]">
													{item.name}
												</span>
												<span className="text-muted-foreground">
													×{item.quantity}
												</span>
											</div>
										))}
										{order.items.length > 2 && (
											<span className="text-xs text-muted-foreground">
												+{order.items.length - 2} more items
											</span>
										)}
									</div>
								</TableCell>
								<TableCell className="text-right">
									${order.subtotal.toLocaleString()}
								</TableCell>
								<TableCell className="text-right text-muted-foreground">
									<div className="flex items-center justify-end gap-1">
										<Truck className="size-3" />${order.shipping}
									</div>
								</TableCell>
								<TableCell className="text-right font-semibold">
									<div className="flex items-center justify-end gap-1">
										<DollarSign className="size-3 text-primary" />
										{order.total.toLocaleString()}
									</div>
								</TableCell>
								<TableCell>
									<Badge variant={getStatusVariant(order.status)}>
										{order.status}
									</Badge>
								</TableCell>
								<TableCell>
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onViewDetails(order.orderId)}
									>
										<Eye className="size-4 mr-1" />
										{actionLabel}
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const orders: OrderDetail[] = [
		{
			orderId: 'ORD-2024-001',
			customer: 'Alice Johnson',
			email: 'alice@example.com',
			items: [
				{ name: 'Wireless Headphones Pro', quantity: 1, price: 299 },
				{ name: 'USB-C Charging Cable', quantity: 2, price: 25 },
				{ name: 'Headphone Case', quantity: 1, price: 45 },
			],
			subtotal: 394,
			shipping: 12,
			tax: 35,
			total: 441,
			paymentMethod: 'Credit Card',
			status: 'shipped',
			orderDate: 'Jan 15, 2024',
			shippingAddress: '123 Main St, New York, NY 10001',
		},
		{
			orderId: 'ORD-2024-002',
			customer: 'Bob Smith',
			email: 'bob@example.com',
			items: [
				{ name: 'Smart Watch Ultra', quantity: 1, price: 499 },
				{ name: 'Extra Watch Band', quantity: 3, price: 29 },
			],
			subtotal: 586,
			shipping: 0,
			tax: 52,
			total: 638,
			paymentMethod: 'PayPal',
			status: 'processing',
			orderDate: 'Jan 15, 2024',
			shippingAddress: '456 Oak Ave, Los Angeles, CA 90001',
		},
		{
			orderId: 'ORD-2024-003',
			customer: 'Carol White',
			email: 'carol@example.com',
			items: [{ name: 'Laptop Stand Adjustable', quantity: 1, price: 89 }],
			subtotal: 89,
			shipping: 8,
			tax: 8,
			total: 105,
			paymentMethod: 'Debit Card',
			status: 'delivered',
			orderDate: 'Jan 14, 2024',
			shippingAddress: '789 Pine Rd, Chicago, IL 60601',
		},
		{
			orderId: 'ORD-2024-004',
			customer: 'David Brown',
			email: 'david@example.com',
			items: [
				{ name: 'Mechanical Keyboard RGB', quantity: 1, price: 149 },
				{ name: 'Mouse Pad XL', quantity: 1, price: 29 },
				{ name: 'Wrist Rest', quantity: 1, price: 25 },
			],
			subtotal: 203,
			shipping: 10,
			tax: 18,
			total: 231,
			paymentMethod: 'Credit Card',
			status: 'pending',
			orderDate: 'Jan 15, 2024',
			shippingAddress: '321 Elm St, Houston, TX 77001',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<OrderDetailTableCard
					title="Order Details"
					description="Complete order information and line items"
					orders={orders}
					actionLabel="View"
					onViewDetails={(id) => console.log('View order:', id)}
				/>
			</div>
		</section>
	);
}
