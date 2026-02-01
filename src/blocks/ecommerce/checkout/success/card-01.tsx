import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	CheckCircle,
	Package,
	Truck,
	CreditCard,
	ArrowRight,
	Clock,
	Mail,
} from 'lucide-react';
import Link from 'next/link';

interface InfoCardProps {
	icon: React.ElementType;
	title: string;
	value: string;
	description?: string;
}

interface OrderItemProps {
	name: string;
	quantity: number;
	price: number;
	currency: string;
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
	<div className="text-center space-y-4">
		<div className="size-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
			<CheckCircle className="size-10 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl @sm:text-3xl @lg:text-4xl font-bold">
				Order Confirmed!
			</h1>
			<p className="text-muted-foreground mt-2">
				Thank you for your purchase. Your order has been received.
			</p>
		</div>
	</div>
);

const InfoCard = ({ icon: Icon, title, value, description }: InfoCardProps) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
					<Icon className="size-6 text-primary" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="font-semibold text-lg">{value}</p>
					{description && (
						<p className="text-xs text-muted-foreground mt-1">{description}</p>
					)}
				</div>
			</div>
		</CardContent>
	</Card>
);

const OrderItem = ({ name, quantity, price, currency }: OrderItemProps) => (
	<div className="flex items-center gap-4">
		<div className="size-14 rounded-xl bg-muted flex items-center justify-center">
			<Package className="size-6 text-muted-foreground" />
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

const OrderItemsCard = ({
	items,
	total,
	currency,
}: {
	items: OrderItemProps[];
	total: number;
	currency: string;
}) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">Order Items</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{items.map((item, i) => (
				<OrderItem key={i} {...item} />
			))}
			<Separator />
			<div className="flex justify-between items-center">
				<span className="font-medium">Total</span>
				<span className="text-xl font-bold">
					{currency}
					{total.toFixed(2)}
				</span>
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
			name: 'Wireless Bluetooth Headphones',
			quantity: 1,
			price: 199.99,
			currency: '$',
		},
		{ name: 'USB-C Fast Charger', quantity: 2, price: 29.99, currency: '$' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<SuccessHeader />

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					<InfoCard
						icon={Package}
						title="Order Number"
						value="ORD-78432"
						description="Save for reference"
					/>
					<InfoCard
						icon={Truck}
						title="Delivery"
						value="Jan 20-22"
						description="Express shipping"
					/>
					<InfoCard
						icon={CreditCard}
						title="Payment"
						value="**** 4242"
						description="Visa"
					/>
				</div>

				<OrderItemsCard items={orderItems} total={259.97} currency="$" />

				<Card className="bg-muted/30">
					<CardContent className="pt-6">
						<div className="flex items-center gap-3">
							<Mail className="size-5 text-muted-foreground" />
							<p className="text-sm text-muted-foreground">
								Confirmation email sent to{' '}
								<span className="font-medium text-foreground">
									customer@example.com
								</span>
							</p>
						</div>
					</CardContent>
				</Card>

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
