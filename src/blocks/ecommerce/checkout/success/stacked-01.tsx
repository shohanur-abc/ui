import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	CreditCard,
	ArrowRight,
	Mail,
	MapPin,
} from 'lucide-react';
import Link from 'next/link';

interface OrderSummaryItemProps {
	name: string;
	quantity: number;
	price: number;
	currency: string;
}

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessHeader = ({
	orderNumber,
	email,
}: {
	orderNumber: string;
	email: string;
}) => (
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
			<CheckCircle className="size-10 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Thank You for Your Order!
			</h1>
			<p className="text-muted-foreground mt-2">
				Order #{orderNumber} has been placed successfully
			</p>
		</div>
		<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
			<Mail className="size-4" />
			<span>Confirmation sent to {email}</span>
		</div>
	</div>
);

const Section = ({ title, children }: SectionProps) => (
	<div className="space-y-4">
		<h2 className="font-semibold text-lg">{title}</h2>
		{children}
	</div>
);

const OrderItem = ({
	name,
	quantity,
	price,
	currency,
}: OrderSummaryItemProps) => (
	<div className="flex items-center gap-4 py-3">
		<div className="size-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
			<Package className="size-8 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
		</div>
		<p className="font-semibold">
			{currency}
			{price.toFixed(2)}
		</p>
	</div>
);

const OrderSummary = ({
	items,
	subtotal,
	shipping,
	tax,
	total,
	currency,
}: {
	items: OrderSummaryItemProps[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	currency: string;
}) => (
	<Section title="Order Summary">
		<div className="divide-y">
			{items.map((item, i) => (
				<OrderItem key={i} {...item} />
			))}
		</div>
		<div className="space-y-2 pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>
					{currency}
					{subtotal.toFixed(2)}
				</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Shipping</span>
				<span>{shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Tax</span>
				<span>
					{currency}
					{tax.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</div>
	</Section>
);

const ShippingInfo = ({
	name,
	address,
	city,
	method,
	estimate,
}: {
	name: string;
	address: string;
	city: string;
	method: string;
	estimate: string;
}) => (
	<Section title="Shipping Information">
		<div className="grid @sm:grid-cols-2 gap-6">
			<div className="flex items-start gap-3">
				<MapPin className="size-5 text-muted-foreground mt-0.5" />
				<div>
					<p className="font-medium">{name}</p>
					<p className="text-sm text-muted-foreground">{address}</p>
					<p className="text-sm text-muted-foreground">{city}</p>
				</div>
			</div>
			<div className="flex items-start gap-3">
				<Truck className="size-5 text-muted-foreground mt-0.5" />
				<div>
					<p className="font-medium">{method}</p>
					<p className="text-sm text-muted-foreground">
						Estimated: {estimate}
					</p>
				</div>
			</div>
		</div>
	</Section>
);

const PaymentInfo = ({
	method,
	last4,
	amount,
	currency,
}: {
	method: string;
	last4: string;
	amount: number;
	currency: string;
}) => (
	<Section title="Payment Information">
		<div className="flex items-center justify-between p-4 rounded-xl bg-muted/50">
			<div className="flex items-center gap-3">
				<CreditCard className="size-5 text-muted-foreground" />
				<div>
					<p className="font-medium">
						{method} •••• {last4}
					</p>
					<Badge variant="outline" className="text-xs mt-1">
						Paid
					</Badge>
				</div>
			</div>
			<p className="font-semibold">
				{currency}
				{amount.toFixed(2)}
			</p>
		</div>
	</Section>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 pt-4">
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
	const orderItems: OrderSummaryItemProps[] = [
		{ name: 'Premium Wireless Headphones', quantity: 1, price: 299.99, currency: '$' },
		{ name: 'USB-C Charging Cable', quantity: 2, price: 19.99, currency: '$' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-2xl px-4 @sm:px-6 @2xl:px-8 space-y-10">
				<SuccessHeader
					orderNumber="ORD-2024-78432"
					email="customer@example.com"
				/>

				<Separator />

				<OrderSummary
					items={orderItems}
					subtotal={339.97}
					shipping={0}
					tax={27.20}
					total={367.17}
					currency="$"
				/>

				<Separator />

				<ShippingInfo
					name="John Doe"
					address="123 Main Street, Apt 4B"
					city="New York, NY 10001"
					method="Express Shipping"
					estimate="Jan 18-20, 2024"
				/>

				<Separator />

				<PaymentInfo
					method="Visa"
					last4="4242"
					amount={367.17}
					currency="$"
				/>

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
