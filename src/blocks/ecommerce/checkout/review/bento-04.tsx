import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Gift,
	Lock,
	MapPin,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Product {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const BentoItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="truncate text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">×{product.qty}</Badge>
		</div>
	</div>
);

const BentoTile = ({
	title,
	icon: Icon,
	span,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	span?: 'col' | 'row' | 'both';
	children: React.ReactNode;
}) => {
	const spanClasses = {
		col: '@lg:col-span-2',
		row: '@lg:row-span-2',
		both: '@lg:col-span-2 @lg:row-span-2',
	};

	return (
		<div className={`overflow-hidden rounded-2xl border bg-card ${span ? spanClasses[span] : ''}`}>
			<div className="flex items-center gap-2 border-b px-4 py-3">
				<Icon className="size-4 text-primary" />
				<h3 className="text-sm font-semibold">{title}</h3>
				<Check className="ml-auto size-4 text-green-500" />
			</div>
			<div className="p-4">{children}</div>
		</div>
	);
};

const AddressContent = ({
	name,
	address,
}: {
	name: string;
	address: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryContent = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center justify-between">
		<div>
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentContent = ({
	brand,
	last4,
}: {
	brand: string;
	last4: string;
}) => (
	<div className="flex items-center gap-2">
		<CreditCard className="size-4 text-muted-foreground" />
		<span className="font-medium">{brand} •••• {last4}</span>
	</div>
);

const GiftContent = ({
	code,
	discount,
}: {
	code: string;
	discount: string;
}) => (
	<div className="flex items-center justify-between">
		<span className="font-mono text-sm">{code}</span>
		<span className="font-semibold text-green-600 dark:text-green-400">{discount}</span>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
	green,
}: {
	label: string;
	value: string;
	bold?: boolean;
	green?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Wine Glasses',
			variant: 'Crystal / Set of 4',
			price: 79.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Decanter',
			variant: 'Hand-blown / 1.5L',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1569945195021-9f8d4d3e3b0e?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Wine Opener',
			variant: 'Electric / Rechargeable',
			price: 34.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Gift Collection
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Confirm your wine accessories order
					</p>
				</div>

				<div className="grid gap-4 @md:grid-cols-2 @lg:grid-cols-3">
					<BentoTile title="Order Items" icon={Gift} span="col">
						<div className="space-y-2">
							{products.map((product) => (
								<BentoItem key={product.id} product={product} />
							))}
						</div>
					</BentoTile>

					<BentoTile title="Shipping" icon={MapPin}>
						<AddressContent name="Victoria C." address="321 Wine Way, Napa, CA 94558" />
					</BentoTile>

					<BentoTile title="Billing" icon={MapPin}>
						<AddressContent name="Victoria C." address="321 Wine Way, Napa, CA 94558" />
					</BentoTile>

					<BentoTile title="Delivery" icon={Truck}>
						<DeliveryContent method="Premium" date="Dec 22-23, 2025" price="$9.99" />
					</BentoTile>

					<BentoTile title="Payment" icon={CreditCard}>
						<PaymentContent brand="Amex" last4="1111" />
					</BentoTile>

					<BentoTile title="Promo Code" icon={Gift}>
						<GiftContent code="WINE20" discount="-$35.00" />
					</BentoTile>

					<Card className="@md:col-span-2 @lg:col-span-1 bg-gradient-to-br from-card to-muted/30">
						<CardHeader className="pb-3">
							<CardTitle className="text-lg">Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-2">
							<SummaryLine label="Subtotal (3 items)" value="$174.97" />
							<SummaryLine label="Shipping" value="$9.99" />
							<SummaryLine label="Tax" value="$14.87" />
							<SummaryLine label="Discount" value="-$35.00" green />
							<Separator className="my-3" />
							<SummaryLine label="Total" value="$164.83" bold />
						</CardContent>
						<CardFooter className="flex-col gap-2">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Complete Order
								<ArrowRight className="size-4" />
							</Button>
							<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
								<Shield className="size-3" />
								<span>Secure checkout</span>
							</div>
						</CardFooter>
					</Card>
				</div>
			</div>
		</section>
	);
}
