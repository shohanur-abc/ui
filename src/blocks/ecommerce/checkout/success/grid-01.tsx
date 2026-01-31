import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	CheckCircle,
	Package,
	Truck,
	CreditCard,
	MapPin,
	ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

interface OrderInfoProps {
	orderNumber: string;
	orderDate: string;
	total: string;
	itemCount: number;
}

interface InfoCardProps {
	icon: React.ElementType;
	title: string;
	lines: string[];
}

interface CTAProps {
	items: {
		label: string;
		href: string;
		variant?: 'default' | 'outline' | 'ghost';
		icon?: React.ElementType;
	}[];
}

const PageHeader = ({ message }: { message: string }) => (
	<div className="text-center space-y-4">
		<div className="size-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
			<CheckCircle className="size-10 text-primary" />
		</div>
		<h1 className="text-2xl @lg:text-4xl font-bold">Order Confirmed!</h1>
		<p className="text-muted-foreground max-w-md mx-auto">{message}</p>
	</div>
);

const OrderSummaryCard = ({
	orderNumber,
	orderDate,
	total,
	itemCount,
}: OrderInfoProps) => (
	<Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
		<CardContent className="pt-6">
			<div className="grid grid-cols-2 @md:grid-cols-4 gap-4 text-center">
				<div>
					<p className="text-sm text-muted-foreground">Order Number</p>
					<p className="font-semibold">{orderNumber}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Date</p>
					<p className="font-semibold">{orderDate}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Total</p>
					<p className="font-semibold">{total}</p>
				</div>
				<div>
					<p className="text-sm text-muted-foreground">Items</p>
					<p className="font-semibold">{itemCount}</p>
				</div>
			</div>
		</CardContent>
	</Card>
);

const InfoCard = ({ icon: Icon, title, lines }: InfoCardProps) => (
	<Card>
		<CardHeader className="pb-3">
			<CardTitle className="text-base flex items-center gap-2">
				<Icon className="size-4 text-primary" />
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-1">
			{lines.map((line, i) => (
				<p
					key={i}
					className={i === 0 ? 'font-medium' : 'text-sm text-muted-foreground'}
				>
					{line}
				</p>
			))}
		</CardContent>
	</Card>
);

const ProductCard = ({
	name,
	quantity,
	price,
	status,
}: {
	name: string;
	quantity: number;
	price: string;
	status: string;
}) => (
	<Card>
		<CardContent className="pt-6">
			<div className="flex items-start gap-4">
				<div className="size-16 rounded-xl bg-muted flex items-center justify-center shrink-0">
					<Package className="size-8 text-muted-foreground" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-semibold truncate">{name}</p>
					<p className="text-sm text-muted-foreground">Qty: {quantity}</p>
					<div className="flex items-center justify-between mt-2">
						<Badge variant="secondary">{status}</Badge>
						<p className="font-semibold">{price}</p>
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CTA = ({ items }: CTAProps) => (
	<div className="flex flex-col @sm:flex-row gap-3 justify-center">
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
	const infoCards: InfoCardProps[] = [
		{
			icon: MapPin,
			title: 'Shipping Address',
			lines: ['John Doe', '123 Main Street', 'New York, NY 10001'],
		},
		{
			icon: Truck,
			title: 'Shipping Method',
			lines: ['Express Delivery', 'Est. Jan 18-20, 2024'],
		},
		{
			icon: CreditCard,
			title: 'Payment',
			lines: ['Visa •••• 4242', 'Paid in full'],
		},
	];

	const products = [
		{ name: 'Wireless Headphones', quantity: 1, price: '$299.99', status: 'Processing' },
		{ name: 'USB-C Charger', quantity: 2, price: '$99.98', status: 'Processing' },
		{ name: 'Carrying Case', quantity: 1, price: '$39.99', status: 'Processing' },
	];

	return (
		<section className="@container min-h-screen py-12 @md:py-16 @xl:py-20">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 space-y-8">
				<PageHeader message="Thank you for your purchase! Your order has been received and is being processed." />

				<OrderSummaryCard
					orderNumber="ORD-78432"
					orderDate="Jan 15, 2024"
					total="$439.96"
					itemCount={4}
				/>

				<div className="grid @sm:grid-cols-3 gap-4">
					{infoCards.map((card, i) => (
						<InfoCard key={i} {...card} />
					))}
				</div>

				<div className="grid @sm:grid-cols-2 @lg:grid-cols-3 gap-4">
					{products.map((product, i) => (
						<ProductCard key={i} {...product} />
					))}
				</div>

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
