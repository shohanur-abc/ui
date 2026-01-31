'use client';

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	CheckCircle2,
	CreditCard,
	Leaf,
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
	eco?: boolean;
}

const AccordionProduct = ({ product }: { product: Product }) => (
	<div className="flex items-center gap-4 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
			<Image src={product.image} alt={product.name} fill className="object-cover" />
			{product.eco && (
				<div className="absolute bottom-0 right-0 rounded-tl bg-green-500 p-0.5">
					<Leaf className="size-3 text-white" />
				</div>
			)}
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-semibold">${product.price.toFixed(2)}</p>
			<Badge variant="secondary">×{product.qty}</Badge>
		</div>
	</div>
);

const AddressDisplay = ({
	name,
	lines,
}: {
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg bg-muted/50 p-3">
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const DeliveryDisplay = ({
	method,
	date,
	price,
	eco,
}: {
	method: string;
	date: string;
	price: string;
	eco?: boolean;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<div className={`flex size-10 items-center justify-center rounded-full ${eco ? 'bg-green-500/10' : 'bg-primary/10'}`}>
			{eco ? <Leaf className="size-5 text-green-500" /> : <Truck className="size-5 text-primary" />}
		</div>
		<div className="flex-1">
			<div className="flex items-center gap-2">
				<p className="font-medium">{method}</p>
				{eco && <Badge variant="secondary" className="text-xs">Eco</Badge>}
			</div>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentDisplay = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
		<CreditCard className="size-5 text-primary" />
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
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
			name: 'Bamboo Desk Organizer',
			variant: 'Natural / Large',
			price: 59.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544181093-c91c3b22c3c7?w=200&h=200&fit=crop',
			eco: true,
		},
		{
			id: '2',
			name: 'Recycled Notebook Set',
			variant: 'A5 / 3-Pack',
			price: 24.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=200&h=200&fit=crop',
			eco: true,
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5 border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-400">
						<Leaf className="size-3.5" />
						Eco-Friendly Order
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Expand sections to review details
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Accordion type="multiple" defaultValue={['items', 'shipping', 'payment']} className="space-y-4">
						<AccordionItem value="items" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-3">
									<Package className="size-5 text-primary" />
									<span className="font-semibold">Items ({products.length})</span>
									<CheckCircle2 className="size-4 text-green-500" />
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="divide-y">
									{products.map((product) => (
										<AccordionProduct key={product.id} product={product} />
									))}
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="shipping" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-3">
									<MapPin className="size-5 text-primary" />
									<span className="font-semibold">Shipping</span>
									<CheckCircle2 className="size-4 text-green-500" />
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="space-y-4">
									<AddressDisplay
										name="Jennifer L."
										lines={['456 Green Street', 'Portland, OR 97201']}
									/>
									<DeliveryDisplay
										method="Carbon Neutral Shipping"
										date="Dec 23-26, 2025"
										price="$4.99"
										eco
									/>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="payment" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-3">
									<CreditCard className="size-5 text-primary" />
									<span className="font-semibold">Payment</span>
									<CheckCircle2 className="size-4 text-green-500" />
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<PaymentDisplay brand="Visa" last4="3456" exp="04/27" />
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$84.98" />
							<SummaryLine label="Eco Shipping" value="$4.99" />
							<SummaryLine label="Tax" value="$7.22" />
							<SummaryLine label="Eco Discount" value="-$8.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$88.69" bold />
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
