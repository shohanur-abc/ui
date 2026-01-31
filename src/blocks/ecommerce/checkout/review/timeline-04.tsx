import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
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

const TimelineStep = ({
	step,
	title,
	completed,
	last,
	children,
}: {
	step: number;
	title: string;
	completed?: boolean;
	last?: boolean;
	children: React.ReactNode;
}) => (
	<div className="flex gap-4">
		<div className="flex flex-col items-center">
			<div
				className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
					completed
						? 'bg-green-500 text-white'
						: 'bg-primary text-primary-foreground'
				}`}
			>
				{completed ? <Check className="size-5" /> : step}
			</div>
			{!last && <div className="h-full w-0.5 bg-border" />}
		</div>
		<div className="flex-1 pb-8">
			<h3 className="mb-3 font-semibold">{title}</h3>
			{children}
		</div>
	</div>
);

const ProductItem = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">{product.name}</p>
			<p className="text-xs text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">×{product.qty}</Badge>
		</div>
	</div>
);

const AddressBox = ({
	type,
	name,
	address,
}: {
	type: string;
	name: string;
	address: string;
}) => (
	<div className="rounded-lg bg-muted/30 p-3">
		<p className="mb-1 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="text-sm font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryBox = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/30 p-3">
		<div className="flex items-center gap-2">
			<Truck className="size-4 text-primary" />
			<div>
				<p className="text-sm font-medium">{method}</p>
				<p className="text-xs text-muted-foreground">{date}</p>
			</div>
		</div>
		<span className="text-sm font-semibold">{price}</span>
	</div>
);

const PaymentBox = ({
	brand,
	last4,
}: {
	brand: string;
	last4: string;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/30 p-3">
		<CreditCard className="size-4 text-primary" />
		<span className="text-sm font-medium">{brand} •••• {last4}</span>
		<Check className="ml-auto size-4 text-green-500" />
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
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Baby Monitor',
			variant: 'HD / Night Vision',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Crib Mobile',
			variant: 'Musical / Stars',
			price: 44.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1566004100631-35d015d6a491?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Package className="size-3.5" />
						Review Order
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Confirm Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Follow the steps to complete checkout
					</p>
				</div>

				<div className="grid gap-8 @lg:grid-cols-[1fr_340px]">
					<div>
						<TimelineStep step={1} title="Order Items" completed>
							<div className="space-y-2">
								{products.map((product) => (
									<ProductItem key={product.id} product={product} />
								))}
							</div>
						</TimelineStep>

						<TimelineStep step={2} title="Addresses" completed>
							<div className="grid gap-3 @sm:grid-cols-2">
								<AddressBox type="Shipping" name="Emma W." address="123 Baby Lane, Nashville, TN 37201" />
								<AddressBox type="Billing" name="Emma W." address="123 Baby Lane, Nashville, TN 37201" />
							</div>
						</TimelineStep>

						<TimelineStep step={3} title="Delivery" completed>
							<DeliveryBox method="Standard" date="Dec 24-26, 2025" price="Free" />
						</TimelineStep>

						<TimelineStep step={4} title="Payment" completed last>
							<PaymentBox brand="Mastercard" last4="2468" />
						</TimelineStep>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$174.98" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$14.87" />
							<SummaryLine label="New Parent Discount" value="-$17.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$172.35" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
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
