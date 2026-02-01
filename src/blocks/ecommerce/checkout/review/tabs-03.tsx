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

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const TabItem = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-4 rounded-xl border bg-card p-4">
		<div className="relative size-18 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium">{item.name}</p>
			<p className="text-sm text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-lg font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary">×{item.qty}</Badge>
		</div>
	</div>
);

const AddressCard = ({
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
	<div className="rounded-xl border bg-card p-4">
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

const DeliveryCard = ({
	method,
	date,
	price,
	selected,
}: {
	method: string;
	date: string;
	price: string;
	selected?: boolean;
}) => (
	<div
		className={`flex items-center gap-4 rounded-xl border p-4 ${selected ? 'border-primary bg-primary/5' : 'bg-card'}`}
	>
		<div
			className={`flex size-12 items-center justify-center rounded-full ${selected ? 'bg-primary' : 'bg-muted'}`}
		>
			<Truck
				className={`size-6 ${selected ? 'text-primary-foreground' : 'text-muted-foreground'}`}
			/>
		</div>
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
		{selected && <Check className="size-5 text-primary" />}
	</div>
);

const PaymentCard = ({
	brand,
	last4,
	exp,
	selected,
}: {
	brand: string;
	last4: string;
	exp: string;
	selected?: boolean;
}) => (
	<div
		className={`flex items-center gap-4 rounded-xl border p-4 ${selected ? 'border-primary bg-primary/5' : 'bg-card'}`}
	>
		<div
			className={`flex size-12 items-center justify-center rounded-xl ${selected ? 'bg-primary' : 'bg-gradient-to-br from-slate-600 to-slate-800'}`}
		>
			<CreditCard
				className={`size-6 ${selected ? 'text-primary-foreground' : 'text-white'}`}
			/>
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
		{selected && <Check className="ml-auto size-5 text-primary" />}
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
	const items: OrderItem[] = [
		{
			id: '1',
			name: 'Portable Speaker',
			variant: 'Waterproof / Black',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Speaker Stand',
			variant: 'Adjustable / Metal',
			price: 34.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop',
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
						Navigate tabs to review your order
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<Tabs defaultValue="items" className="w-full">
						<TabsList className="mb-6 grid w-full grid-cols-4">
							<TabsTrigger value="items" className="gap-1.5">
								<Package className="size-4" />
								<span className="hidden @sm:inline">Items</span>
							</TabsTrigger>
							<TabsTrigger value="address" className="gap-1.5">
								<MapPin className="size-4" />
								<span className="hidden @sm:inline">Address</span>
							</TabsTrigger>
							<TabsTrigger value="delivery" className="gap-1.5">
								<Truck className="size-4" />
								<span className="hidden @sm:inline">Delivery</span>
							</TabsTrigger>
							<TabsTrigger value="payment" className="gap-1.5">
								<CreditCard className="size-4" />
								<span className="hidden @sm:inline">Payment</span>
							</TabsTrigger>
						</TabsList>

						<TabsContent value="items" className="space-y-4">
							{items.map((item) => (
								<TabItem key={item.id} item={item} />
							))}
						</TabsContent>

						<TabsContent value="address" className="space-y-4">
							<div className="grid gap-4 @sm:grid-cols-2">
								<AddressCard
									type="Shipping"
									name="Lisa P."
									lines={['789 Sound Street', 'Austin, TX 78701']}
									phone="+1 (512) 555-0123"
								/>
								<AddressCard
									type="Billing"
									name="Lisa P."
									lines={['789 Sound Street', 'Austin, TX 78701']}
									phone="+1 (512) 555-0123"
								/>
							</div>
						</TabsContent>

						<TabsContent value="delivery" className="space-y-4">
							<DeliveryCard
								method="Standard Shipping"
								date="Dec 24-27, 2025"
								price="Free"
							/>
							<DeliveryCard
								method="Express Shipping"
								date="Dec 20-21, 2025"
								price="$12.99"
								selected
							/>
						</TabsContent>

						<TabsContent value="payment" className="space-y-4">
							<PaymentCard
								brand="Mastercard"
								last4="5678"
								exp="11/26"
								selected
							/>
						</TabsContent>
					</Tabs>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (2 items)" value="$114.98" />
							<SummaryLine label="Shipping" value="$12.99" />
							<SummaryLine label="Tax" value="$9.77" />
							<SummaryLine label="Discount" value="-$11.50" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$126.24" bold />
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
