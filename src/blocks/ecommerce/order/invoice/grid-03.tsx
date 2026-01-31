import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Box, MapPin, Package, Truck } from 'lucide-react';

interface OrderHeaderProps {
	orderNumber: string;
	orderDate: string;
	status: string;
}

interface ProductProps {
	name: string;
	variant: string;
	quantity: number;
	price: number;
	image: string;
}

interface ShippingProps {
	method: string;
	carrier: string;
	tracking: string;
	estimatedDelivery: string;
}

interface AddressProps {
	type: string;
	name: string;
	address: string;
	city: string;
}

interface TotalsProps {
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	currency: string;
}

const OrderHeader = ({ orderNumber, orderDate, status }: OrderHeaderProps) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Package className="size-5 text-primary" />
					<div>
						<p className="font-mono font-bold">{orderNumber}</p>
						<p className="text-xs text-muted-foreground">{orderDate}</p>
					</div>
				</div>
				<Badge variant="default">{status}</Badge>
			</div>
		</CardContent>
	</Card>
);

const ProductCard = ({
	product,
	currency,
}: {
	product: ProductProps;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-4">
			<div className="flex gap-3">
				<div className="size-16 rounded-lg bg-muted flex items-center justify-center">
					<Box className="size-8 text-muted-foreground" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium text-sm truncate">{product.name}</p>
					<p className="text-xs text-muted-foreground">{product.variant}</p>
					<div className="flex items-center justify-between mt-2">
						<Badge variant="outline">Qty: {product.quantity}</Badge>
						<p className="font-bold">
							{currency}
							{product.price.toFixed(2)}
						</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const ShippingCard = ({
	method,
	carrier,
	tracking,
	estimatedDelivery,
}: ShippingProps) => (
	<Card>
		<CardContent className="pt-4 space-y-3">
			<div className="flex items-center gap-2">
				<Truck className="size-4 text-primary" />
				<span className="text-sm font-medium">{method}</span>
			</div>
			<div className="grid grid-cols-2 gap-2 text-xs">
				<div>
					<p className="text-muted-foreground">Carrier</p>
					<p className="font-medium">{carrier}</p>
				</div>
				<div>
					<p className="text-muted-foreground">Est. Delivery</p>
					<p className="font-medium">{estimatedDelivery}</p>
				</div>
			</div>
			<div className="text-xs">
				<p className="text-muted-foreground">Tracking</p>
				<p className="font-mono text-primary">{tracking}</p>
			</div>
		</CardContent>
	</Card>
);

const AddressCard = ({ type, name, address, city }: AddressProps) => (
	<Card>
		<CardContent className="pt-4 space-y-2">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span className="text-xs text-muted-foreground uppercase">{type}</span>
			</div>
			<div className="text-sm">
				<p className="font-medium">{name}</p>
				<p className="text-muted-foreground">{address}</p>
				<p className="text-muted-foreground">{city}</p>
			</div>
		</CardContent>
	</Card>
);

const TotalsCard = ({
	subtotal,
	shipping,
	tax,
	total,
	currency,
}: TotalsProps) => (
	<Card className="bg-primary text-primary-foreground">
		<CardContent className="pt-4 space-y-2">
			<div className="flex justify-between text-sm opacity-80">
				<span>Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Shipping</span>
				<span>
					{shipping === 0 ? 'FREE' : `${currency}${shipping.toFixed(2)}`}
				</span>
			</div>
			<div className="flex justify-between text-sm opacity-80">
				<span>Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator className="bg-primary-foreground/20" />
			<div className="flex justify-between font-bold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const order: OrderHeaderProps = {
		orderNumber: 'ORD-2024-78945',
		orderDate: 'February 15, 2024',
		status: 'Shipped',
	};

	const products: ProductProps[] = [
		{
			name: 'Wireless Headphones',
			variant: 'Black / Over-ear',
			quantity: 1,
			price: 249.99,
			image: '',
		},
		{
			name: 'USB-C Hub',
			variant: '7-in-1 / Space Gray',
			quantity: 1,
			price: 79.99,
			image: '',
		},
		{
			name: 'Laptop Stand',
			variant: 'Aluminum / Adjustable',
			quantity: 1,
			price: 89.99,
			image: '',
		},
		{
			name: 'Webcam HD',
			variant: '1080p / Black',
			quantity: 1,
			price: 129.99,
			image: '',
		},
	];

	const shipping: ShippingProps = {
		method: 'Express Shipping',
		carrier: 'FedEx',
		tracking: 'FX789456123',
		estimatedDelivery: 'Feb 18-19',
	};

	const shippingAddress: AddressProps = {
		type: 'Ship To',
		name: 'John Smith',
		address: '123 Main Street, Apt 4B',
		city: 'New York, NY 10001',
	};

	const billingAddress: AddressProps = {
		type: 'Bill To',
		name: 'John Smith',
		address: '123 Main Street, Apt 4B',
		city: 'New York, NY 10001',
	};

	const totals: TotalsProps = {
		subtotal: 549.96,
		shipping: 0,
		tax: 44.0,
		total: 593.96,
		currency: '$',
	};

	return (
		<section className="@container">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-8">
				<div className="grid @md:grid-cols-3 gap-4">
					<div className="@md:col-span-2">
						<OrderHeader {...order} />
					</div>
					<ShippingCard {...shipping} />
				</div>
				<div className="grid @sm:grid-cols-2 @lg:grid-cols-4 gap-4 mt-4">
					{products.map((product, index) => (
						<ProductCard key={index} product={product} currency="$" />
					))}
				</div>
				<div className="grid @md:grid-cols-3 gap-4 mt-4">
					<AddressCard {...shippingAddress} />
					<AddressCard {...billingAddress} />
					<TotalsCard {...totals} />
				</div>
				<div className="flex justify-end mt-4">
					<Button>Track Shipment</Button>
				</div>
			</div>
		</section>
	);
}
