import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle2,
	CreditCard,
	Edit2,
	MapPin,
	Package,
	ShieldCheck,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	image: string;
}

interface Address {
	name: string;
	street: string;
	city: string;
	state: string;
	zip: string;
	country: string;
}

interface PaymentMethod {
	type: string;
	last4: string;
	expiry: string;
	icon: React.ComponentType<{ className?: string }>;
}

interface OrderSummary {
	subtotal: number;
	shipping: number;
	tax: number;
	discount: number;
	total: number;
}

interface ReviewProps {
	items: OrderItem[];
	shippingAddress: Address;
	billingAddress: Address;
	paymentMethod: PaymentMethod;
	summary: OrderSummary;
	deliveryEstimate: string;
	onEdit?: (section: string) => void;
	onConfirm?: () => void;
}

const SectionHeader = ({
	icon: Icon,
	title,
	onEdit,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	onEdit?: () => void;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-2">
			<Icon className="size-5 text-primary" />
			<h3 className="font-semibold">{title}</h3>
		</div>
		{onEdit && (
			<Button variant="ghost" size="sm" onClick={onEdit} className="gap-1.5">
				<Edit2 className="size-3.5" />
				Edit
			</Button>
		)}
	</div>
);

const OrderItemCard = ({ item }: { item: OrderItem }) => (
	<div className="flex gap-4 py-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-sm text-muted-foreground">
					Qty: {item.quantity}
				</span>
				<span className="font-semibold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressBlock = ({
	address,
	label,
}: {
	address: Address;
	label: string;
}) => (
	<div>
		<p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
		<p className="font-medium">{address.name}</p>
		<p className="text-sm text-muted-foreground">{address.street}</p>
		<p className="text-sm text-muted-foreground">
			{address.city}, {address.state} {address.zip}
		</p>
		<p className="text-sm text-muted-foreground">{address.country}</p>
	</div>
);

const PaymentDisplay = ({ payment }: { payment: PaymentMethod }) => {
	const Icon = payment.icon;
	return (
		<div className="flex items-center gap-3">
			<div className="flex size-12 items-center justify-center rounded-lg bg-muted">
				<Icon className="size-6" />
			</div>
			<div>
				<p className="font-medium">
					{payment.type} •••• {payment.last4}
				</p>
				<p className="text-sm text-muted-foreground">
					Expires {payment.expiry}
				</p>
			</div>
		</div>
	);
};

const SummaryLine = ({
	label,
	value,
	isTotal,
	isDiscount,
}: {
	label: string;
	value: number;
	isTotal?: boolean;
	isDiscount?: boolean;
}) => (
	<div
		className={`flex justify-between ${isTotal ? 'text-lg font-bold' : 'text-sm'} ${isDiscount ? 'text-green-600 dark:text-green-400' : ''}`}
	>
		<span className={isTotal ? '' : 'text-muted-foreground'}>{label}</span>
		<span>
			{isDiscount ? '-' : ''}${Math.abs(value).toFixed(2)}
		</span>
	</div>
);

const DeliveryBadge = ({ estimate }: { estimate: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
		<Truck className="size-4 text-primary" />
		<span className="text-sm font-medium">Estimated delivery: {estimate}</span>
	</div>
);

export default function Main() {
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Premium Wireless Headphones',
			variant: 'Midnight Black',
			price: 299.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Leather Laptop Sleeve',
			variant: '15" - Brown',
			price: 89.99,
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
		},
	];

	const shippingAddress: Address = {
		name: 'John Doe',
		street: '123 Main Street, Apt 4B',
		city: 'San Francisco',
		state: 'CA',
		zip: '94102',
		country: 'United States',
	};

	const billingAddress: Address = shippingAddress;

	const paymentMethod: PaymentMethod = {
		type: 'Visa',
		last4: '4242',
		expiry: '12/25',
		icon: CreditCard,
	};

	const summary: OrderSummary = {
		subtotal: 389.98,
		shipping: 0,
		tax: 32.25,
		discount: 39.0,
		total: 383.23,
	};

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-16 @sm:px-6 @md:py-20 @xl:py-24 @2xl:px-8">
				<div className="mb-8 text-center">
					<Badge variant="secondary" className="mb-4 gap-1.5">
						<CheckCircle2 className="size-3.5" />
						Review Your Order
					</Badge>
					<h1 className="text-3xl font-bold tracking-tight @md:text-4xl">
						Almost there!
					</h1>
					<p className="mt-2 text-muted-foreground">
						Please review your order details before confirming
					</p>
				</div>

				<div className="space-y-6">
					<Card>
						<CardHeader>
							<SectionHeader
								icon={Package}
								title="Order Items"
								onEdit={() => {}}
							/>
						</CardHeader>
						<CardContent>
							<div className="divide-y">
								{items.map((item) => (
									<OrderItemCard key={item.id} item={item} />
								))}
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<SectionHeader
								icon={MapPin}
								title="Shipping & Billing"
								onEdit={() => {}}
							/>
						</CardHeader>
						<CardContent>
							<div className="grid gap-6 @md:grid-cols-2">
								<AddressBlock
									address={shippingAddress}
									label="Shipping Address"
								/>
								<AddressBlock
									address={billingAddress}
									label="Billing Address"
								/>
							</div>
							<div className="mt-4">
								<DeliveryBadge estimate="Dec 24-26, 2025" />
							</div>
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<SectionHeader
								icon={CreditCard}
								title="Payment Method"
								onEdit={() => {}}
							/>
						</CardHeader>
						<CardContent>
							<PaymentDisplay payment={paymentMethod} />
						</CardContent>
					</Card>

					<Card>
						<CardHeader>
							<CardTitle>Order Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal" value={summary.subtotal} />
							<SummaryLine label="Shipping" value={summary.shipping} />
							<SummaryLine label="Tax" value={summary.tax} />
							{summary.discount > 0 && (
								<SummaryLine
									label="Discount"
									value={summary.discount}
									isDiscount
								/>
							)}
							<Separator className="my-4" />
							<SummaryLine label="Total" value={summary.total} isTotal />
						</CardContent>
						<CardFooter className="flex-col gap-4">
							<Button size="lg" className="w-full gap-2">
								<ShieldCheck className="size-4" />
								Confirm Order
							</Button>
							<p className="text-center text-xs text-muted-foreground">
								By confirming, you agree to our Terms of Service and Privacy
								Policy
							</p>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
