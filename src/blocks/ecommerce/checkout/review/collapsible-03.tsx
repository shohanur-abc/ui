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
	ChevronRight,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface OrderItem {
	id: string;
	name: string;
	variant: string;
	price: number;
	qty: number;
	image: string;
}

const CollapsibleRow = ({
	title,
	icon: Icon,
	defaultOpen,
	verified,
	summary,
	children,
}: {
	title: string;
	icon: React.ComponentType<{ className?: string }>;
	defaultOpen?: boolean;
	verified?: boolean;
	summary: string;
	children: React.ReactNode;
}) => {
	const [isOpen, setIsOpen] = useState(defaultOpen ?? false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen}>
			<CollapsibleTrigger asChild>
				<button className="flex w-full items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:bg-muted/50">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-5 text-primary" />
					</div>
					<div className="flex-1 text-left">
						<p className="font-semibold">{title}</p>
						<p className="text-sm text-muted-foreground">{summary}</p>
					</div>
					{verified && <Check className="size-5 text-green-500" />}
					<ChevronRight
						className={`size-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-90' : ''}`}
					/>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
				<div className="ml-13 mt-2 rounded-xl border bg-muted/30 p-4">
					{children}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

const ProductRow = ({ item }: { item: OrderItem }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium">{item.name}</p>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="text-right">
			<p className="text-sm font-bold">${item.price.toFixed(2)}</p>
			<Badge variant="secondary" className="text-xs">
				×{item.qty}
			</Badge>
		</div>
	</div>
);

const AddressDisplay = ({
	name,
	address,
	phone,
}: {
	name: string;
	address: string;
	phone: string;
}) => (
	<div>
		<p className="font-medium">{name}</p>
		<p className="text-sm text-muted-foreground">{address}</p>
		<p className="text-sm text-muted-foreground">{phone}</p>
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
	<div className="flex items-center justify-between">
		<div>
			<p className="font-medium">{method}</p>
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
	<div className="flex items-center gap-3">
		<CreditCard className="size-5 text-muted-foreground" />
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
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
			name: 'Drone',
			variant: 'Pro / 4K Camera',
			price: 899.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Extra Batteries',
			variant: 'High Capacity / 2-Pack',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
		{
			id: '3',
			name: 'Carrying Case',
			variant: 'Hard Shell / Foam',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20">
				<div className="mb-8 text-center">
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Expand sections to view details
					</p>
				</div>

				<div className="grid gap-6 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-3">
						<CollapsibleRow
							title="Order Items"
							icon={Package}
							summary="3 items · $1,129.97"
							defaultOpen
							verified
						>
							<div className="divide-y">
								{items.map((item) => (
									<ProductRow key={item.id} item={item} />
								))}
							</div>
						</CollapsibleRow>

						<CollapsibleRow
							title="Shipping Address"
							icon={MapPin}
							summary="San Francisco, CA"
							verified
						>
							<AddressDisplay
								name="Daniel T."
								address="789 Drone Way, San Francisco, CA 94102"
								phone="+1 (415) 555-0199"
							/>
						</CollapsibleRow>

						<CollapsibleRow
							title="Billing Address"
							icon={MapPin}
							summary="Same as shipping"
							verified
						>
							<AddressDisplay
								name="Daniel T."
								address="789 Drone Way, San Francisco, CA 94102"
								phone="+1 (415) 555-0199"
							/>
						</CollapsibleRow>

						<CollapsibleRow
							title="Delivery Method"
							icon={Truck}
							summary="Express · Dec 18-19"
							verified
						>
							<DeliveryDisplay
								method="Express Shipping"
								date="Dec 18-19, 2025"
								price="$24.99"
							/>
						</CollapsibleRow>

						<CollapsibleRow
							title="Payment Method"
							icon={CreditCard}
							summary="Amex •••• 9999"
							verified
						>
							<PaymentDisplay brand="Amex" last4="9999" exp="11/28" />
						</CollapsibleRow>
					</div>

					<Card className="@lg:sticky @lg:top-8 @lg:self-start bg-gradient-to-br from-card to-muted/30">
						<CardHeader>
							<CardTitle>Summary</CardTitle>
						</CardHeader>
						<CardContent className="space-y-3">
							<SummaryLine label="Subtotal (3 items)" value="$1,129.97" />
							<SummaryLine label="Shipping" value="$24.99" />
							<SummaryLine label="Tax" value="$96.05" />
							<SummaryLine label="Tech Bundle" value="-$113.00" green />
							<Separator className="my-4" />
							<SummaryLine label="Total" value="$1,138.01" bold />
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
