import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	ArrowRight,
	Download,
	Mail,
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
	name: string;
	quantity: number;
	price: number;
	image: string;
}

interface OrderSummaryProps {
	items: OrderItem[];
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	currency: string;
}

interface SuccessIconProps {
	icon: React.ElementType;
	label: string;
}

interface OrderDetailsProps {
	orderNumber: string;
	orderDate: string;
	estimatedDelivery: string;
	email: string;
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const SuccessIcon = ({ icon: Icon, label }: SuccessIconProps) => (
	<div className="flex flex-col items-center gap-4">
		<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center ring-4 ring-primary/20">
			<Icon className="size-10 text-primary" />
		</div>
		<Badge variant="secondary" className="text-sm">
			{label}
		</Badge>
	</div>
);

const Title = ({ text, highlight }: { text: string; highlight?: string }) => (
	<h1 className="text-3xl @sm:text-4xl @lg:text-5xl font-bold tracking-tight text-center">
		{text} {highlight && <span className="text-primary">{highlight}</span>}
	</h1>
);

const Description = ({ text }: { text: string }) => (
	<p className="text-muted-foreground text-center max-w-md mx-auto text-base @md:text-lg">
		{text}
	</p>
);

const OrderDetails = ({
	orderNumber,
	orderDate,
	estimatedDelivery,
	email,
}: OrderDetailsProps) => (
	<Card className="w-full max-w-md">
		<CardContent className="grid grid-cols-2 gap-4 text-sm pt-6">
			<div>
				<p className="text-muted-foreground">Order Number</p>
				<p className="font-mono font-semibold">{orderNumber}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Order Date</p>
				<p className="font-medium">{orderDate}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Estimated Delivery</p>
				<p className="font-medium">{estimatedDelivery}</p>
			</div>
			<div>
				<p className="text-muted-foreground">Confirmation Email</p>
				<p className="font-medium truncate">{email}</p>
			</div>
		</CardContent>
	</Card>
);

const OrderSummary = ({
	items,
	subtotal,
	shipping,
	tax,
	total,
	currency,
}: OrderSummaryProps) => (
	<Card className="w-full max-w-md">
		<CardContent className="space-y-4 pt-6">
			<div className="space-y-3">
				{items.map((item, i) => (
					<div key={i} className="flex items-center gap-3">
						<div className="size-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
							<Package className="size-6 text-muted-foreground" />
						</div>
						<div className="flex-1 min-w-0">
							<p className="font-medium truncate">{item.name}</p>
							<p className="text-sm text-muted-foreground">
								Qty: {item.quantity}
							</p>
						</div>
						<p className="font-semibold">
							{currency}
							{item.price.toFixed(2)}
						</p>
					</div>
				))}
			</div>
			<Separator />
			<div className="space-y-2 text-sm">
				<div className="flex justify-between">
					<span className="text-muted-foreground">Subtotal</span>
					<span>
						{currency}
						{subtotal.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Shipping</span>
					<span>
						{currency}
						{shipping.toFixed(2)}
					</span>
				</div>
				<div className="flex justify-between">
					<span className="text-muted-foreground">Tax</span>
					<span>
						{currency}
						{tax.toFixed(2)}
					</span>
				</div>
			</div>
			<Separator />
			<div className="flex justify-between font-semibold text-lg">
				<span>Total</span>
				<span>
					{currency}
					{total.toFixed(2)}
				</span>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-wrap justify-center gap-3 @md:gap-4">
		{items.map(({ label, href, variant, icon: Icon }, i) => (
			<Button
				key={i}
				size="lg"
				variant={variant || 'default'}
				className="gap-2"
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
	const orderItems: OrderItem[] = [
		{ name: 'Wireless Headphones Pro', quantity: 1, price: 299.99, image: '' },
		{ name: 'USB-C Charging Cable', quantity: 2, price: 24.99, image: '' },
	];

	return (
		<section className="@container min-h-screen flex items-center py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 w-full">
				<div className="flex flex-col items-center gap-8 @md:gap-10">
					<SuccessIcon icon={CheckCircle} label="Order Confirmed" />

					<div className="space-y-4 text-center">
						<Title text="Thank you for your" highlight="order!" />
						<Description text="We've received your order and will begin processing it right away. You'll receive a confirmation email shortly." />
					</div>

					<OrderDetails
						orderNumber="ORD-2024-78432"
						orderDate="January 15, 2024"
						estimatedDelivery="January 22-25, 2024"
						email="customer@example.com"
					/>

					<OrderSummary
						items={orderItems}
						subtotal={349.97}
						shipping={9.99}
						tax={28.8}
						total={388.76}
						currency="$"
					/>

					<CTA
						items={[
							{
								label: 'Track Order',
								href: '/orders',
								icon: Truck,
							},
							{
								label: 'Continue Shopping',
								href: '/shop',
								variant: 'outline',
								icon: ArrowRight,
							},
						]}
					/>
				</div>
			</div>
		</section>
	);
}
