import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, CreditCard, DollarSign, ShoppingBag } from 'lucide-react';

interface OrderItem {
	name: string;
	variant: string;
	quantity: number;
	price: number;
}

interface StatusTimelineProps {
	items: { label: string; time: string; completed: boolean }[];
}

interface OrderSummaryHeaderProps {
	orderNumber: string;
	date: string;
	status: string;
}

interface ItemListProps {
	items: OrderItem[];
	currency: string;
}

interface TotalCardProps {
	rows: {
		label: string;
		value: number;
		isDiscount?: boolean;
		isBold?: boolean;
	}[];
	currency: string;
}

interface PaymentInfoProps {
	method: string;
	last4: string;
	billingAddress: string[];
}

interface ShippingInfoProps {
	method: string;
	address: string[];
	estimatedDelivery: string;
}

const StatusTimeline = ({ items }: StatusTimelineProps) => (
	<div className="flex flex-col @sm:flex-row gap-2">
		{items.map((item, index) => (
			<div key={index} className="flex items-center gap-2 flex-1">
				<div
					className={`size-3 rounded-full ${item.completed ? 'bg-green-500' : 'bg-muted'}`}
				/>
				<div className="text-sm">
					<p
						className={item.completed ? 'font-medium' : 'text-muted-foreground'}
					>
						{item.label}
					</p>
					<p className="text-xs text-muted-foreground">{item.time}</p>
				</div>
				{index < items.length - 1 && (
					<div className="hidden @sm:block flex-1 h-px bg-border mx-2" />
				)}
			</div>
		))}
	</div>
);

const OrderSummaryHeader = ({
	orderNumber,
	date,
	status,
}: OrderSummaryHeaderProps) => (
	<div className="flex flex-col @sm:flex-row @sm:items-center @sm:justify-between gap-3">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<ShoppingBag className="size-5 text-primary" />
			</div>
			<div>
				<p className="font-bold">Order {orderNumber}</p>
				<p className="text-sm text-muted-foreground">{date}</p>
			</div>
		</div>
		<Badge variant="default">{status}</Badge>
	</div>
);

const ItemList = ({ items, currency }: ItemListProps) => (
	<div className="space-y-3">
		{items.map((item, index) => (
			<div
				key={index}
				className="flex items-center justify-between p-3 rounded-lg bg-muted/40"
			>
				<div className="flex items-center gap-3">
					<div className="size-12 rounded-lg bg-muted flex items-center justify-center">
						<ShoppingBag className="size-5 text-muted-foreground" />
					</div>
					<div>
						<p className="font-medium">{item.name}</p>
						<p className="text-sm text-muted-foreground">
							{item.variant} × {item.quantity}
						</p>
					</div>
				</div>
				<p className="font-semibold">
					{currency}
					{(item.quantity * item.price).toFixed(2)}
				</p>
			</div>
		))}
	</div>
);

const TotalCard = ({ rows, currency }: TotalCardProps) => (
	<div className="p-4 rounded-lg border space-y-2">
		{rows.map((row, index) => (
			<div
				key={index}
				className={`flex justify-between ${row.isBold ? 'text-lg font-bold pt-2 border-t mt-2' : 'text-sm'} ${row.isDiscount ? 'text-green-600' : ''}`}
			>
				<span className={row.isBold ? '' : 'text-muted-foreground'}>
					{row.label}
				</span>
				<span>
					{row.isDiscount ? '-' : ''}
					{currency}
					{Math.abs(row.value).toFixed(2)}
				</span>
			</div>
		))}
	</div>
);

const PaymentInfo = ({ method, last4, billingAddress }: PaymentInfoProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center gap-2">
			<CreditCard className="size-4 text-muted-foreground" />
			<p className="font-semibold">Payment</p>
		</div>
		<div className="space-y-1 text-sm">
			<p className="font-medium">
				{method} •••• {last4}
			</p>
			{billingAddress.map((line, index) => (
				<p key={index} className="text-muted-foreground">
					{line}
				</p>
			))}
		</div>
	</div>
);

const ShippingInfo = ({
	method,
	address,
	estimatedDelivery,
}: ShippingInfoProps) => (
	<div className="p-4 rounded-lg border space-y-3">
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<p className="font-semibold">Shipping</p>
		</div>
		<div className="space-y-1 text-sm">
			<p className="font-medium">{method}</p>
			{address.map((line, index) => (
				<p key={index} className="text-muted-foreground">
					{line}
				</p>
			))}
			<p className="text-primary font-medium pt-1">Est. {estimatedDelivery}</p>
		</div>
	</div>
);

export default function Main() {
	const header: OrderSummaryHeaderProps = {
		orderNumber: '#12345',
		date: 'February 2, 2024',
		status: 'Delivered',
	};

	const timeline = [
		{ label: 'Ordered', time: 'Feb 2', completed: true },
		{ label: 'Shipped', time: 'Feb 3', completed: true },
		{ label: 'Out for Delivery', time: 'Feb 5', completed: true },
		{ label: 'Delivered', time: 'Feb 5', completed: true },
	];

	const items: OrderItem[] = [
		{
			name: 'Wireless Earbuds Pro',
			variant: 'Black',
			quantity: 1,
			price: 179.99,
		},
		{ name: 'Silicone Case', variant: 'Navy', quantity: 1, price: 29.99 },
		{ name: 'Charging Dock', variant: 'White', quantity: 1, price: 49.99 },
	];

	const totalRows = [
		{ label: 'Subtotal', value: 259.97 },
		{ label: 'Shipping', value: 0.0 },
		{ label: 'Promo Code (SAVE15)', value: 38.99, isDiscount: true },
		{ label: 'Tax', value: 17.68 },
		{ label: 'Total', value: 238.66, isBold: true },
	];

	const payment: PaymentInfoProps = {
		method: 'Visa',
		last4: '4242',
		billingAddress: ['John Doe', '123 Main St', 'New York, NY 10001'],
	};

	const shipping: ShippingInfoProps = {
		method: 'Standard Shipping',
		address: ['John Doe', '123 Main St', 'New York, NY 10001'],
		estimatedDelivery: 'Feb 5-7, 2024',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<Card>
					<CardHeader className="space-y-6 border-b">
						<OrderSummaryHeader {...header} />
						<StatusTimeline items={timeline} />
					</CardHeader>
					<CardContent className="space-y-6 pt-6">
						<ItemList items={items} currency="$" />
						<TotalCard rows={totalRows} currency="$" />
						<Separator />
						<div className="grid @sm:grid-cols-2 gap-4">
							<PaymentInfo {...payment} />
							<ShippingInfo {...shipping} />
						</div>
						<div className="flex flex-wrap gap-3">
							<Button variant="outline">Track Package</Button>
							<Button variant="ghost">Download Invoice</Button>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
