'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import {
	ArrowRight,
	Check,
	ChevronDown,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface CartItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CollapsibleSection = ({
	title,
	icon: Icon,
	defaultOpen,
	verified,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	defaultOpen?: boolean;
	verified?: boolean;
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<button className="flex w-full items-center justify-between rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50">
					<div className="flex items-center gap-3">
						<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
							<Icon className="size-5 text-primary" />
						</div>
						<span className="font-semibold">{title}</span>
					</div>
					<div className="flex items-center gap-2">
						{verified && (
							<div className="flex size-6 items-center justify-center rounded-full bg-green-500/10">
								<Check className="size-3.5 text-green-500" />
							</div>
						)}
						<ChevronDown
							className={`size-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
						/>
					</div>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				<div className="mt-2 rounded-xl border bg-card p-4">{children}</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

const ItemCard = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 rounded-lg bg-muted/30 p-3">
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

const AddressRow = ({ name, address }: { name: string; address: string }) => (
	<div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
	</div>
);

const DeliveryRow = ({
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

const PaymentRow = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div>
		<p className="font-medium">
			{brand} •••• {last4}
		</p>
		<p className="text-sm text-muted-foreground">Expires {exp}</p>
	</div>
);

const TotalLine = ({
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
			name: 'Yoga Mat',
			variant: 'Extra Thick / Purple',
			price: 49.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Resistance Bands',
			variant: 'Set of 5 / Multi',
			price: 24.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Foam Roller',
			variant: 'High Density / Blue',
			price: 29.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Order Summary
					</h1>
					<p className="mt-1 text-muted-foreground">
						Expand sections to review details
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-3">
						<CollapsibleSection
							title="Order Items (3)"
							icon={Package}
							defaultOpen
							verified
						>
							<div className="space-y-2">
								{items.map((item) => (
									<ItemCard key={item.id} item={item} />
								))}
							</div>
						</CollapsibleSection>

						<CollapsibleSection title="Shipping Address" icon={MapPin} verified>
							<AddressRow
								name="Jessica M."
								address="555 Fitness Blvd, Miami, FL 33101"
							/>
						</CollapsibleSection>

						<CollapsibleSection title="Billing Address" icon={MapPin} verified>
							<AddressRow
								name="Jessica M."
								address="555 Fitness Blvd, Miami, FL 33101"
							/>
						</CollapsibleSection>

						<CollapsibleSection title="Delivery Method" icon={Truck} verified>
							<DeliveryRow
								method="Standard Shipping"
								date="Dec 26-28, 2025"
								price="Free"
							/>
						</CollapsibleSection>

						<CollapsibleSection
							title="Payment Method"
							icon={CreditCard}
							verified
						>
							<PaymentRow brand="Visa" last4="3456" exp="05/26" />
						</CollapsibleSection>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<TotalLine label="Subtotal (3 items)" value="$104.97" />
							<TotalLine label="Shipping" value="$0.00" />
							<TotalLine label="Tax" value="$8.92" />
							<TotalLine label="Discount (FIT15)" value="-$15.75" green />
							<Separator className="my-4" />
							<TotalLine label="Total" value="$98.14" bold />
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
