import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	MapPin,
	ArrowRight,
	Mail,
	Calendar,
} from 'lucide-react';
import Link from 'next/link';

interface OrderItemProps {
	name: string;
	variant: string;
	quantity: number;
	price: number;
	currency: string;
}

interface AddressProps {
	name: string;
	street: string;
	city: string;
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

const SuccessHeader = () => (
	<div className="flex items-center gap-4">
		<div className="size-16 rounded-2xl bg-primary flex items-center justify-center">
			<CheckCircle className="size-8 text-primary-foreground" />
		</div>
		<div>
			<h1 className="text-2xl @lg:text-3xl font-bold">Order Confirmed!</h1>
			<p className="text-muted-foreground">Thank you for your purchase</p>
		</div>
	</div>
);

const OrderMeta = ({
	orderNumber,
	date,
	email,
}: {
	orderNumber: string;
	date: string;
	email: string;
}) => (
	<div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-muted/50 border">
		<div>
			<p className="text-xs text-muted-foreground">Order Number</p>
			<p className="font-mono font-semibold text-sm">{orderNumber}</p>
		</div>
		<div>
			<p className="text-xs text-muted-foreground">Order Date</p>
			<p className="font-medium text-sm">{date}</p>
		</div>
		<div>
			<p className="text-xs text-muted-foreground">Email</p>
			<p className="font-medium text-sm truncate">{email}</p>
		</div>
	</div>
);

const OrderItem = ({
	name,
	variant,
	quantity,
	price,
	currency,
}: OrderItemProps) => (
	<div className="flex items-center gap-4">
		<div className="size-16 rounded-xl bg-muted flex items-center justify-center">
			<Package className="size-7 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{name}</p>
			<p className="text-sm text-muted-foreground">
				{variant} · Qty: {quantity}
			</p>
		</div>
		<p className="font-semibold">
			{currency}
			{price.toFixed(2)}
		</p>
	</div>
);

const OrderItemsList = ({ items }: { items: OrderItemProps[] }) => (
	<div className="space-y-4">
		<h3 className="font-semibold">Order Items</h3>
		<div className="space-y-4">
			{items.map((item, i) => (
				<OrderItem key={i} {...item} />
			))}
		</div>
	</div>
);

const ShippingAddress = ({ name, street, city, phone }: AddressProps) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<MapPin className="size-4 text-muted-foreground" />
			<h3 className="font-semibold">Shipping Address</h3>
		</div>
		<div className="pl-6 space-y-1 text-sm text-muted-foreground">
			<p className="font-medium text-foreground">{name}</p>
			<p>{street}</p>
			<p>{city}</p>
			<p>{phone}</p>
		</div>
	</div>
);

const DeliveryEstimate = ({
	date,
	method,
}: {
	date: string;
	method: string;
}) => (
	<div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/10 flex items-center justify-center">
				<Truck className="size-5 text-primary" />
			</div>
			<div>
				<p className="font-medium">{method}</p>
				<p className="text-sm text-muted-foreground">{date}</p>
			</div>
		</div>
	</div>
);

const OrderSummaryRow = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className="flex justify-between">
		<span className={bold ? 'font-semibold' : 'text-muted-foreground'}>
			{label}
		</span>
		<span className={bold ? 'font-bold text-lg' : 'font-medium'}>{value}</span>
	</div>
);

const OrderSummary = ({
	subtotal,
	shipping,
	tax,
	total,
	currency,
}: {
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	currency: string;
}) => (
	<Card>
		<CardContent className="pt-6 space-y-4">
			<h3 className="font-semibold">Order Summary</h3>
			<div className="space-y-3">
				<OrderSummaryRow
					label="Subtotal"
					value={`${currency}${subtotal.toFixed(2)}`}
				/>
				<OrderSummaryRow
					label="Shipping"
					value={shipping === 0 ? 'Free' : `${currency}${shipping.toFixed(2)}`}
				/>
				<OrderSummaryRow
					label="Tax"
					value={`${currency}${tax.toFixed(2)}`}
				/>
				<Separator />
				<OrderSummaryRow
					label="Total"
					value={`${currency}${total.toFixed(2)}`}
					bold
				/>
			</div>
		</CardContent>
	</Card>
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
			name: 'Wireless Noise-Canceling Headphones',
			variant: 'Matte Black',
			quantity: 1,
			price: 299.99,
			currency: '$',
		},
		{
			name: 'Premium Leather Case',
			variant: 'Brown',
			quantity: 1,
			price: 49.99,
			currency: '$',
		},
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8">
				<div className="grid @lg:grid-cols-2 gap-8 @xl:gap-12">
					<div className="space-y-6">
						<SuccessHeader />

						<OrderMeta
							orderNumber="ORD-2024-78432"
							date="Jan 15, 2024"
							email="customer@example.com"
						/>

						<OrderItemsList items={orderItems} />

						<div className="grid @sm:grid-cols-2 gap-4">
							<ShippingAddress
								name="John Doe"
								street="123 Main Street, Apt 4B"
								city="New York, NY 10001"
								phone="+1 (555) 123-4567"
							/>
							<DeliveryEstimate
								date="Jan 20-22, 2024"
								method="Express Shipping"
							/>
						</div>
					</div>

					<div className="space-y-6">
						<OrderSummary
							subtotal={349.98}
							shipping={0}
							tax={28.0}
							total={377.98}
							currency="$"
						/>

						<CTA
							items={[
								{
									label: 'Track Order',
									href: '/orders/track',
									icon: ArrowRight,
								},
								{
									label: 'Continue Shopping',
									href: '/shop',
									variant: 'outline',
								},
							]}
						/>

						<div className="p-4 rounded-xl bg-muted/50 border">
							<div className="flex items-center gap-3">
								<Mail className="size-5 text-muted-foreground" />
								<p className="text-sm text-muted-foreground">
									Confirmation sent to{' '}
									<span className="font-medium text-foreground">
										customer@example.com
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
