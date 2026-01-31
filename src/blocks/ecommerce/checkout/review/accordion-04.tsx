'use client';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const AccordionProduct = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 py-2">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const AddressDisplay = ({
	type,
	name,
	address,
	phone,
}: {
	type: string;
	name: string;
	address: string;
	phone: string;
}) => (
	<div className="rounded-lg bg-muted/30 p-4">
		<p className="mb-1 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
		<p className="mt-1 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const DeliveryDisplay = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
		<div className="flex items-center gap-3">
			<Truck className="size-5 text-primary" />
			<div>
				<p className="font-medium">{method}</p>
				<p className="text-sm text-muted-foreground">{date}</p>
			</div>
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
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-4">
		<CreditCard className="size-5 text-primary" />
		<div>
			<p className="font-medium">{brand} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
		<Check className="ml-auto size-5 text-green-500" />
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
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Desk Organizer',
			variant: 'Bamboo / Multi-tier',
			price: 54.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Filing Cabinet',
			variant: '3-Drawer / White',
			price: 149.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Desk Mat',
			variant: 'Leather / Dark Brown',
			price: 39.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-10 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Almost There
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Summary
					</h1>
					<p className="mt-1 text-muted-foreground">
						Expand sections to review details
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Accordion type="multiple" defaultValue={['items']} className="space-y-3">
						<AccordionItem value="items" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-2">
									<Package className="size-5 text-primary" />
									<span className="font-semibold">Order Items (3)</span>
								</div>
							</AccordionTrigger>
							<AccordionContent>
								<div className="divide-y pb-2">
									{items.map((item) => (
										<AccordionProduct key={item.id} item={item} />
									))}
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="address" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-2">
									<MapPin className="size-5 text-primary" />
									<span className="font-semibold">Addresses</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<div className="grid gap-3 @sm:grid-cols-2">
									<AddressDisplay
										type="Shipping"
										name="Paul K."
										address="456 Office Park, Atlanta, GA 30301"
										phone="+1 (404) 555-0177"
									/>
									<AddressDisplay
										type="Billing"
										name="Paul K."
										address="456 Office Park, Atlanta, GA 30301"
										phone="+1 (404) 555-0177"
									/>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="delivery" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-2">
									<Truck className="size-5 text-primary" />
									<span className="font-semibold">Delivery</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<DeliveryDisplay method="Office Delivery" date="Dec 21-23, 2025" price="$14.99" />
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="payment" className="rounded-xl border bg-card px-4">
							<AccordionTrigger className="hover:no-underline">
								<div className="flex items-center gap-2">
									<CreditCard className="size-5 text-primary" />
									<span className="font-semibold">Payment</span>
								</div>
							</AccordionTrigger>
							<AccordionContent className="pb-4">
								<PaymentDisplay brand="Amex" last4="7890" exp="04/28" />
							</AccordionContent>
						</AccordionItem>
					</Accordion>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$244.97" />
							<SummaryLine label="Shipping" value="$14.99" />
							<SummaryLine label="Tax" value="$20.82" />
							<SummaryLine label="Office Discount" value="-$24.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$256.28" bold />
						</CardContent>
						<CardFooter className="flex-col gap-3">
							<Button size="lg" className="w-full gap-2">
								<Lock className="size-4" />
								Place Order
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
