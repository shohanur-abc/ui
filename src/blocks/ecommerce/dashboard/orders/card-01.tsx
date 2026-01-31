import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Package, Truck, MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';

interface OrderItem {
	name: string;
	quantity: number;
	price: string;
}

interface OrderCardProps {
	order: {
		id: string;
		status: 'processing' | 'shipped' | 'delivered';
		items: OrderItem[];
		total: string;
		shippingAddress: string;
		orderDate: string;
		estimatedDelivery: string;
	};
	labels: {
		items: string;
		total: string;
		shipping: string;
		ordered: string;
		delivery: string;
		viewDetails: string;
		trackOrder: string;
	};
}

interface StatusBadgeProps {
	status: OrderCardProps['order']['status'];
}

interface OrderItemRowProps {
	item: OrderItem;
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<OrderCardProps['order']['status'], { icon: typeof Package; variant: 'default' | 'secondary'; label: string }> = {
		processing: { icon: Clock, variant: 'secondary', label: 'Processing' },
		shipped: { icon: Truck, variant: 'default', label: 'Shipped' },
		delivered: { icon: Package, variant: 'default', label: 'Delivered' },
	};
	const { icon: Icon, variant, label } = config[status];
	return (
		<Badge variant={variant} className="gap-1.5">
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const OrderItemRow = ({ item }: OrderItemRowProps) => (
	<div className="flex items-center justify-between py-2">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-lg bg-muted flex items-center justify-center">
				<Package className="size-5 text-muted-foreground" />
			</div>
			<div>
				<p className="font-medium text-sm">{item.name}</p>
				<p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
			</div>
		</div>
		<span className="font-semibold text-sm">{item.price}</span>
	</div>
);

const InfoRow = ({ icon: Icon, label, value }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string }) => (
	<div className="flex items-center gap-2 text-sm">
		<Icon className="size-4 text-muted-foreground" />
		<span className="text-muted-foreground">{label}:</span>
		<span className="font-medium">{value}</span>
	</div>
);

const OrderCard = ({ order, labels }: OrderCardProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
		<CardHeader className="pb-3">
			<div className="flex items-center justify-between">
				<div>
					<CardTitle className="text-base font-mono">{order.id}</CardTitle>
					<CardDescription className="flex items-center gap-1.5 mt-1">
						<Calendar className="size-3" />
						{labels.ordered} {order.orderDate}
					</CardDescription>
				</div>
				<StatusBadge status={order.status} />
			</div>
		</CardHeader>
		<CardContent className="space-y-4">
			<div>
				<p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">{labels.items}</p>
				<div className="divide-y divide-border/50">
					{order.items.map((item, i) => (
						<OrderItemRow key={i} item={item} />
					))}
				</div>
			</div>
			<Separator />
			<div className="space-y-2">
				<InfoRow icon={MapPin} label={labels.shipping} value={order.shippingAddress} />
				<InfoRow icon={Truck} label={labels.delivery} value={order.estimatedDelivery} />
			</div>
			<div className="flex items-center justify-between pt-2 border-t border-border/50">
				<span className="text-sm text-muted-foreground">{labels.total}</span>
				<span className="text-lg font-bold">{order.total}</span>
			</div>
		</CardContent>
		<CardFooter className="gap-3">
			<Button variant="outline" className="flex-1">{labels.viewDetails}</Button>
			<Button className="flex-1 gap-1.5">
				{labels.trackOrder}
				<ArrowRight className="size-4" />
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const labels = {
		items: 'Order Items',
		total: 'Total',
		shipping: 'Ships to',
		ordered: 'Ordered',
		delivery: 'Est. Delivery',
		viewDetails: 'View Details',
		trackOrder: 'Track Order',
	};

	const order = {
		id: 'ORD-2024-001',
		status: 'shipped' as const,
		items: [
			{ name: 'Wireless Headphones Pro', quantity: 1, price: '$199.00' },
			{ name: 'USB-C Charging Cable', quantity: 2, price: '$29.98' },
			{ name: 'Phone Stand', quantity: 1, price: '$24.99' },
		],
		total: '$253.97',
		shippingAddress: 'New York, NY 10001',
		orderDate: 'Jan 25, 2026',
		estimatedDelivery: 'Jan 30, 2026',
	};

	return (
		<section className="@container" data-theme="orders">
			<div className="mx-auto max-w-md px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-10 @xl:py-12">
				<OrderCard order={order} labels={labels} />
			</div>
		</section>
	);
}
