'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const TabProduct = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/30 p-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
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

const AddressBlock = ({
	type,
	name,
	lines,
	phone,
}: {
	type: string;
	name: string;
	lines: string[];
	phone: string;
}) => (
	<div className="rounded-lg bg-muted/30 p-4">
		<p className="mb-2 text-xs font-medium uppercase text-primary">{type}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
		<p className="mt-2 text-sm text-muted-foreground">{phone}</p>
	</div>
);

const DeliveryBlock = ({
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

const PaymentBlock = ({
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
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
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
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			name: 'Pool Float',
			variant: 'Inflatable / Flamingo',
			price: 34.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1560265036-021b3e6dc27e?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Cooler Bag',
			variant: 'Insulated / 30L',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Portable Speaker',
			variant: 'Waterproof / Blue',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Review
					</h1>
					<p className="mt-1 text-muted-foreground">
						Navigate tabs to verify your order
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Card>
						<Tabs defaultValue="items" className="w-full">
							<CardHeader className="pb-0">
								<TabsList className="grid w-full grid-cols-4">
									<TabsTrigger value="items" className="text-xs @sm:text-sm">
										Items
									</TabsTrigger>
									<TabsTrigger value="address" className="text-xs @sm:text-sm">
										Address
									</TabsTrigger>
									<TabsTrigger value="delivery" className="text-xs @sm:text-sm">
										Delivery
									</TabsTrigger>
									<TabsTrigger value="payment" className="text-xs @sm:text-sm">
										Payment
									</TabsTrigger>
								</TabsList>
							</CardHeader>

							<CardContent className="pt-6">
								<TabsContent value="items" className="mt-0 space-y-3">
									{items.map((item) => (
										<TabProduct key={item.id} item={item} />
									))}
								</TabsContent>

								<TabsContent value="address" className="mt-0">
									<div className="grid gap-4 @sm:grid-cols-2">
										<AddressBlock
											type="Shipping"
											name="Brandon S."
											lines={['789 Pool Lane', 'Phoenix, AZ 85001']}
											phone="+1 (602) 555-0188"
										/>
										<AddressBlock
											type="Billing"
											name="Brandon S."
											lines={['789 Pool Lane', 'Phoenix, AZ 85001']}
											phone="+1 (602) 555-0188"
										/>
									</div>
								</TabsContent>

								<TabsContent value="delivery" className="mt-0">
									<DeliveryBlock
										method="Standard"
										date="Dec 26-28, 2025"
										price="Free"
									/>
								</TabsContent>

								<TabsContent value="payment" className="mt-0">
									<PaymentBlock brand="Visa" last4="7777" exp="08/26" />
								</TabsContent>
							</CardContent>
						</Tabs>
					</Card>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (4 items)" value="$199.96" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$17.00" />
							<SummaryLine label="Summer Discount" value="-$20.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$196.96" bold />
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
