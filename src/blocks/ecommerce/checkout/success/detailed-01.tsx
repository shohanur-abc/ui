import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	CreditCard,
	MapPin,
	Mail,
	Phone,
	Clock,
	ArrowRight,
	Copy,
	Printer,
} from 'lucide-react';
import Link from 'next/link';

interface OrderItemProps {
	name: string;
	sku: string;
	quantity: number;
	price: number;
	currency: string;
	image?: string;
}

interface AddressProps {
	name: string;
	company?: string;
	address: string;
	city: string;
	country: string;
	phone: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({
	orderNumber,
	orderDate,
	status,
}: {
	orderNumber: string;
	orderDate: string;
	status: string;
}) => (
	<div className="flex flex-col @lg:flex-row @lg:items-center justify-between gap-4">
		<div className="flex items-center gap-4">
			<div className="size-14 rounded-full bg-primary/10 flex items-center justify-center">
				<CheckCircle className="size-7 text-primary" />
			</div>
			<div>
				<h1 className="text-2xl @lg:text-3xl font-bold">Order Confirmed</h1>
				<p className="text-muted-foreground">
					Order #{orderNumber} • {orderDate}
				</p>
			</div>
		</div>
		<div className="flex items-center gap-2">
			<Badge className="bg-primary">{status}</Badge>
			<Button variant="outline" size="sm" className="gap-2">
				<Printer className="size-4" />
				Print
			</Button>
		</div>
	</div>
);

const OrderItem = ({
	name,
	sku,
	quantity,
	price,
	currency,
}: OrderItemProps) => (
	<div className="flex items-center gap-4 py-4">
		<div className="size-20 rounded-xl bg-muted flex items-center justify-center shrink-0">
			<Package className="size-10 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{name}</p>
			<p className="text-sm text-muted-foreground">SKU: {sku}</p>
			<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
		</div>
		<p className="font-semibold text-lg">
			{currency}
			{(price * quantity).toFixed(2)}
		</p>
	</div>
);

const OrderItemsSection = ({
	items,
	subtotal,
	shipping,
	tax,
	discount,
	total,
	currency,
}: {
	items: OrderItemProps[];
	subtotal: number;
	shipping: number;
	tax: number;
	discount: number;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle>Order Items</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="divide-y">
				{items.map((item, i) => (
					<OrderItem key={i} {...item} />
				))}
			</div>
			<Separator className="my-4" />
			<div className="space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Subtotal</span>
					<span>
						{currency}
						{subtotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Shipping</span>
					<span>
						{shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}
					</span>
				</div>
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Tax</span>
					<span>
						{currency}
						{tax.toFixed(2)}
					</span>
				</div>
				{discount > 0 && (
					<div className="flex justify-between text-sm text-emerald-600">
						<span>Discount</span>
						<span>
							-{currency}
							{discount.toFixed(2)}
						</span>
					</div>
				)}
				<Separator />
				<div className="flex justify-between font-semibold text-lg">
					<span>Total</span>
					<span>
						{currency}
						{total.toFixed(2)}
					</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const AddressCard = ({
	title,
	icon: Icon,
	address,
}: {
	title: string;
	icon: React.ElementType;
	address: AddressProps;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Icon className="size-4" />
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-2 text-sm">
			<p className="font-medium">{address.name}</p>
			{address.company && (
				<p className="text-muted-foreground">{address.company}</p>
			)}
			<p className="text-muted-foreground">{address.address}</p>
			<p className="text-muted-foreground">{address.city}</p>
			<p className="text-muted-foreground">{address.country}</p>
			<div className="flex items-center gap-2 pt-2">
				<Phone className="size-4 text-muted-foreground" />
				<span>{address.phone}</span>
			</div>
		</CardContent>
	</Card>
);

const PaymentCard = ({
	method,
	last4,
	transactionId,
	date,
}: {
	method: string;
	last4: string;
	transactionId: string;
	date: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<CreditCard className="size-4" />
				Payment Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Method</span>
				<span className="font-medium">
					{method} •••• {last4}
				</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Transaction ID</span>
				<div className="flex items-center gap-1">
					<span className="font-mono text-xs">{transactionId}</span>
					<Button variant="ghost" size="icon" className="size-6">
						<Copy className="size-3" />
					</Button>
				</div>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Date</span>
				<span>{date}</span>
			</div>
			<Badge variant="outline" className="text-emerald-600 border-emerald-200">
				Payment Successful
			</Badge>
		</CardContent>
	</Card>
);

const ShippingCard = ({
	method,
	carrier,
	tracking,
	estimatedDelivery,
}: {
	method: string;
	carrier: string;
	tracking?: string;
	estimatedDelivery: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base flex items-center gap-2">
				<Truck className="size-4" />
				Shipping Details
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Method</span>
				<span className="font-medium">{method}</span>
			</div>
			<div className="flex justify-between">
				<span className="text-muted-foreground">Carrier</span>
				<span>{carrier}</span>
			</div>
			{tracking && (
				<div className="flex justify-between">
					<span className="text-muted-foreground">Tracking</span>
					<div className="flex items-center gap-1">
						<span className="font-mono text-xs">{tracking}</span>
						<Button variant="ghost" size="icon" className="size-6">
							<Copy className="size-3" />
						</Button>
					</div>
				</div>
			)}
			<div className="flex justify-between">
				<span className="text-muted-foreground">Est. Delivery</span>
				<span className="font-medium text-primary">{estimatedDelivery}</span>
			</div>
		</CardContent>
	</Card>
);

const EmailNotification = ({ email }: { email: string }) => (
	<div className="flex items-center gap-3 p-4 rounded-xl bg-muted/30">
		<Mail className="size-5 text-muted-foreground" />
		<p className="text-sm">
			Order confirmation sent to{' '}
			<span className="font-medium">{email}</span>
		</p>
	</div>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="flex-1 gap-2"
				asChild
			>
				<Link href={href}>
					{label}
					{Icon && <Icon className="size-4" />}
				</Link>
			</Button>
		))}
	</div>
);

export default function Main() {
	const orderItems: OrderItemProps[] = [
		{
			name: 'Premium Wireless Headphones',
			sku: 'WH-PRO-001',
			quantity: 1,
			price: 299.99,
			currency: '$',
		},
		{
			name: 'USB-C Fast Charger 65W',
			sku: 'CHG-USB-065',
			quantity: 2,
			price: 49.99,
			currency: '$',
		},
		{
			name: 'Protective Carrying Case',
			sku: 'ACC-CASE-01',
			quantity: 1,
			price: 39.99,
			currency: '$',
		},
	];

	const shippingAddress: AddressProps = {
		name: 'John Doe',
		company: 'Acme Corp',
		address: '123 Main Street, Suite 4B',
		city: 'New York, NY 10001',
		country: 'United States',
		phone: '+1 (555) 123-4567',
	};

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader
					orderNumber="ORD-2024-78432"
					orderDate="January 15, 2024"
					status="Confirmed"
				/>

				<div className="grid @lg:grid-cols-3 gap-6">
					<div className="@lg:col-span-2 space-y-6">
						<OrderItemsSection
							items={orderItems}
							subtotal={439.96}
							shipping={0}
							tax={35.20}
							discount={50}
							total={425.16}
							currency="$"
						/>
					</div>
					<div className="space-y-6">
						<AddressCard
							title="Shipping Address"
							icon={MapPin}
							address={shippingAddress}
						/>
						<PaymentCard
							method="Visa"
							last4="4242"
							transactionId="TXN-78432-ABCD"
							date="Jan 15, 2024 at 2:34 PM"
						/>
						<ShippingCard
							method="Express Shipping"
							carrier="FedEx"
							tracking="1Z999AA10123456784"
							estimatedDelivery="Jan 18-20, 2024"
						/>
					</div>
				</div>

				<EmailNotification email="customer@example.com" />

				<CTA
					items={[
						{ label: 'Track Order', href: '/track', icon: ArrowRight },
						{ label: 'Continue Shopping', href: '/shop', variant: 'outline' },
					]}
				/>
			</div>
		</section>
	);
}
