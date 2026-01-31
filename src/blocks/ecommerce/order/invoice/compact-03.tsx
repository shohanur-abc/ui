import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { CreditCard, Package } from 'lucide-react';

interface OrderSummaryProps {
	orderNumber: string;
	orderDate: string;
	status: string;
	estimatedDelivery: string;
}

interface OrderItemProps {
	name: string;
	variant: string;
	quantity: number;
	price: number;
}

interface OrderTotalsProps {
	subtotal: number;
	shipping: number;
	discount: number;
	total: number;
	currency: string;
}

const OrderSummary = ({
	orderNumber,
	orderDate,
	status,
	estimatedDelivery,
}: OrderSummaryProps) => (
	<div className="flex items-center justify-between text-xs">
		<div className="flex items-center gap-2">
			<Package className="size-4 text-primary" />
			<span className="font-mono font-bold">{orderNumber}</span>
		</div>
		<div className="flex items-center gap-2">
			<span className="text-muted-foreground">{orderDate}</span>
			<Badge variant="default" className="text-[10px]">
				{status}
			</Badge>
		</div>
	</div>
);

const OrderItems = ({
	items,
	currency,
}: {
	items: OrderItemProps[];
	currency: string;
}) => (
	<div className="space-y-2">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-3">
				<div className="size-10 rounded bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground">
					{item.quantity}x
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-xs font-medium truncate">{item.name}</p>
					<p className="text-[10px] text-muted-foreground">{item.variant}</p>
				</div>
				<p className="text-xs font-medium">
					{currency}
					{(item.quantity * item.price).toFixed(2)}
				</p>
			</div>
		))}
	</div>
);

const OrderTotals = ({
	subtotal,
	shipping,
	discount,
	total,
	currency,
}: OrderTotalsProps) => (
	<div className="text-xs space-y-1">
		<div className="flex justify-between text-muted-foreground">
			<span>Subtotal</span>
			<span>
				{currency}
				{subtotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-muted-foreground">
			<span>Shipping</span>
			<span>
				{shipping === 0 ? 'FREE' : `${currency}${shipping.toFixed(2)}`}
			</span>
		</div>
		{discount > 0 && (
			<div className="flex justify-between text-green-600">
				<span>Discount</span>
				<span>
					-{currency}
					{discount.toFixed(2)}
				</span>
			</div>
		)}
		<Separator className="my-2" />
		<div className="flex justify-between font-bold text-sm">
			<span>Total</span>
			<span>
				{currency}
				{total.toFixed(2)}
			</span>
		</div>
	</div>
);

export default function Main() {
	const order: OrderSummaryProps = {
		orderNumber: 'ORD-78945',
		orderDate: 'Feb 15, 2024',
		status: 'Shipped',
		estimatedDelivery: 'Feb 18-20',
	};

	const items: OrderItemProps[] = [
		{
			name: 'Wireless Earbuds Pro',
			variant: 'Black / With Case',
			quantity: 1,
			price: 149.99,
		},
		{
			name: 'USB-C Charging Cable',
			variant: '2m / White',
			quantity: 2,
			price: 19.99,
		},
		{ name: 'Phone Stand', variant: 'Silver', quantity: 1, price: 29.99 },
	];

	const totals: OrderTotalsProps = {
		subtotal: 219.96,
		shipping: 0,
		discount: 22.0,
		total: 197.96,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-sm px-4 py-6">
				<div className="rounded-lg border p-4 space-y-4">
					<OrderSummary {...order} />
					<div className="p-2 rounded bg-muted/50 text-[10px] text-center text-muted-foreground">
						Est. Delivery: {order.estimatedDelivery}
					</div>
					<Separator />
					<OrderItems items={items} currency="$" />
					<Separator />
					<OrderTotals {...totals} />
					<div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
						<div className="flex items-center gap-1">
							<CreditCard className="size-3" />
							<span>•••• 4242</span>
						</div>
						<Button variant="link" size="sm" className="h-auto p-0 text-xs">
							Track Order
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
