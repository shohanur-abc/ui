'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	ArrowRight,
	Box,
	CheckCircle2,
	CreditCard,
	FileText,
	Home,
	Lock,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';

interface Item {
	id: string;
	name: string;
	options: string;
	price: number;
	qty: number;
	image: string;
}

const TabIcon = ({
	icon: Icon,
	verified,
}: {
	icon: React.ComponentType<{ className?: string }>;
	verified?: boolean;
}) => (
	<div className="relative">
		<Icon className="size-4" />
		{verified && (
			<CheckCircle2 className="absolute -right-1.5 -top-1.5 size-3 rounded-full bg-background text-green-500" />
		)}
	</div>
);

const ProductItem = ({ item }: { item: Item }) => (
	<div className="flex gap-4 rounded-xl bg-muted/30 p-4 transition-colors hover:bg-muted/50">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-muted-foreground">{item.options}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">×{item.qty}</Badge>
				<span className="font-semibold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const InfoSection = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => (
	<div className="rounded-xl border bg-card p-5">
		<h4 className="mb-4 font-semibold">{title}</h4>
		{children}
	</div>
);

const AddressDisplay = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-lg bg-muted/50 p-4">
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">{label}</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const ShippingDisplay = ({
	method,
	eta,
	cost,
}: {
	method: string;
	eta: string;
	cost: string;
}) => (
	<div className="flex items-center gap-4 rounded-lg bg-muted/50 p-4">
		<div className="flex size-12 items-center justify-center rounded-full bg-primary/10">
			<Truck className="size-6 text-primary" />
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{eta}</p>
		</div>
		<span className="font-semibold">{cost}</span>
	</div>
);

const PaymentDisplay = ({
	type,
	last4,
	exp,
}: {
	type: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4">
		<div className="flex size-14 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600">
			<CreditCard className="size-7 text-white" />
		</div>
		<div>
			<p className="font-medium">{type} •••• {last4}</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const PriceRow = ({
	label,
	value,
	bold,
	discount,
}: {
	label: string;
	value: string;
	bold?: boolean;
	discount?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={discount ? 'text-green-600 dark:text-green-400' : ''}>{value}</span>
	</div>
);

export default function Main() {
	const items: Item[] = [
		{
			id: '1',
			name: 'Ultra-Wide Monitor',
			options: '34" / Curved / 144Hz',
			price: 599.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Monitor Arm',
			options: 'Dual / Gas Spring',
			price: 129.99,
			qty: 1,
			image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-5xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8 flex flex-col items-center text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl @lg:text-4xl">
						Review Your Order
					</h1>
					<p className="mt-2 text-muted-foreground">
						Verify all details before completing checkout
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_380px]">
					<Tabs defaultValue="items" className="w-full">
						<TabsList className="grid w-full grid-cols-4 bg-muted/50 p-1">
							<TabsTrigger value="items" className="gap-2">
								<TabIcon icon={Box} verified />
								<span className="hidden @sm:inline">Items</span>
							</TabsTrigger>
							<TabsTrigger value="address" className="gap-2">
								<TabIcon icon={Home} verified />
								<span className="hidden @sm:inline">Address</span>
							</TabsTrigger>
							<TabsTrigger value="shipping" className="gap-2">
								<TabIcon icon={Truck} verified />
								<span className="hidden @sm:inline">Shipping</span>
							</TabsTrigger>
							<TabsTrigger value="payment" className="gap-2">
								<TabIcon icon={CreditCard} verified />
								<span className="hidden @sm:inline">Payment</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="items" className="mt-6 space-y-4">
							{items.map((item) => (
								<ProductItem key={item.id} item={item} />
							))}
						</TabsContent>

						<TabsContent value="address" className="mt-6 grid gap-4 @md:grid-cols-2">
							<AddressDisplay
								label="Shipping"
								name="Michael Scott"
								lines={['1725 Slough Avenue', 'Scranton, PA 18503']}
							/>
							<AddressDisplay
								label="Billing"
								name="Michael Scott"
								lines={['1725 Slough Avenue', 'Scranton, PA 18503']}
							/>
						</TabsContent>

						<TabsContent value="shipping" className="mt-6">
							<InfoSection title="Selected Shipping Method">
								<ShippingDisplay
									method="Standard Delivery"
									eta="Arrives Dec 24-27, 2025"
									cost="Free"
								/>
							</InfoSection>
						</TabsContent>

						<TabsContent value="payment" className="mt-6">
							<InfoSection title="Payment Method">
								<PaymentDisplay type="Mastercard" last4="2222" exp="04/28" />
								<div className="mt-4 flex items-center gap-2 rounded-lg bg-muted/50 p-3 text-sm text-muted-foreground">
									<Shield className="size-4" />
									<span>256-bit SSL encryption protects your data</span>
								</div>
							</InfoSection>
						</TabsContent>
					</Tabs>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="bg-gradient-to-b from-card to-muted/20">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<FileText className="size-5" />
									Order Summary
								</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<PriceRow label="Subtotal (2 items)" value="$729.98" />
								<PriceRow label="Shipping" value="$0.00" />
								<PriceRow label="Tax" value="$62.05" />
								<PriceRow label="Promo (DESK20)" value="-$145.99" discount />
								<Separator className="my-4" />
								<PriceRow label="Total" value="$646.04" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Place Order
									<ArrowRight className="size-4" />
								</Button>
								<p className="text-center text-xs text-muted-foreground">
									By placing this order you agree to our Terms
								</p>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
