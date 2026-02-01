'use client';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
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
	CheckCircle,
	ChevronDown,
	CreditCard,
	Lock,
	MapPin,
	Package,
	Shield,
	Sparkles,
	Truck,
} from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface Product {
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
	const [isOpen, setIsOpen] = useState(defaultOpen ?? true);

	return (
		<Collapsible
			open={isOpen}
			onOpenChange={setIsOpen}
			className="rounded-2xl border bg-card"
		>
			<CollapsibleTrigger className="flex w-full items-center justify-between p-5 text-left hover:bg-muted/30">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
						<Icon className="size-5 text-primary" />
					</div>
					<div>
						<h3 className="font-semibold">{title}</h3>
						{verified && (
							<div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
								<CheckCircle className="size-3" />
								Verified
							</div>
						)}
					</div>
				</div>
				<ChevronDown
					className={`size-5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`}
				/>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="border-t px-5 pb-5 pt-4">{children}</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

const ProductItem = ({ product }: { product: Product }) => (
	<div className="flex gap-4 py-3">
		<div className="relative size-18 shrink-0 overflow-hidden rounded-lg">
			<Image
				src={product.image}
				alt={product.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-sm text-muted-foreground">{product.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<Badge variant="secondary">×{product.qty}</Badge>
				<span className="font-semibold">${product.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const AddressCard = ({
	label,
	name,
	lines,
}: {
	label: string;
	name: string;
	lines: string[];
}) => (
	<div className="rounded-xl bg-muted/50 p-4">
		<p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
			{label}
		</p>
		<p className="font-medium">{name}</p>
		{lines.map((line, i) => (
			<p key={i} className="text-sm text-muted-foreground">
				{line}
			</p>
		))}
	</div>
);

const ShippingCard = ({
	method,
	date,
	price,
}: {
	method: string;
	date: string;
	price: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
		<Truck className="size-6 text-primary" />
		<div className="flex-1">
			<p className="font-medium">{method}</p>
			<p className="text-sm text-muted-foreground">{date}</p>
		</div>
		<span className="font-semibold">{price}</span>
	</div>
);

const PaymentCard = ({
	brand,
	last4,
	exp,
}: {
	brand: string;
	last4: string;
	exp: string;
}) => (
	<div className="flex items-center gap-4 rounded-xl bg-muted/50 p-4">
		<div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-600">
			<CreditCard className="size-6 text-white" />
		</div>
		<div>
			<p className="font-medium">
				{brand} •••• {last4}
			</p>
			<p className="text-sm text-muted-foreground">Expires {exp}</p>
		</div>
	</div>
);

const PriceLine = ({
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={bold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={green ? 'text-green-600 dark:text-green-400' : ''}>
			{value}
		</span>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Smart Light Bulb',
			variant: 'RGB / 4-Pack',
			price: 79.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Light Strip',
			variant: '3m / RGB',
			price: 34.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="mx-auto max-w-4xl px-4 py-12 @sm:px-6 @md:py-16 @xl:py-20 @2xl:px-8">
				<div className="mb-8 text-center">
					<Badge className="mb-4 gap-1.5">
						<Sparkles className="size-3.5" />
						Final Review
					</Badge>
					<h1 className="text-2xl font-bold tracking-tight @md:text-3xl">
						Review Your Order
					</h1>
					<p className="mt-1 text-muted-foreground">
						Click sections to expand or collapse
					</p>
				</div>

				<div className="grid gap-4 @lg:grid-cols-[1fr_340px]">
					<div className="space-y-4">
						<CollapsibleSection title="Order Items" icon={Package} verified>
							<div className="divide-y">
								{products.map((product) => (
									<ProductItem key={product.id} product={product} />
								))}
							</div>
						</CollapsibleSection>

						<CollapsibleSection title="Addresses" icon={MapPin} verified>
							<div className="grid gap-4 @sm:grid-cols-2">
								<AddressCard
									label="Shipping"
									name="Nathan Clark"
									lines={['888 Smart Lane', 'San Diego, CA 92101']}
								/>
								<AddressCard
									label="Billing"
									name="Nathan Clark"
									lines={['888 Smart Lane', 'San Diego, CA 92101']}
								/>
							</div>
						</CollapsibleSection>

						<CollapsibleSection title="Delivery" icon={Truck} verified>
							<ShippingCard
								method="Standard Shipping"
								date="Dec 24-27, 2025"
								price="Free"
							/>
						</CollapsibleSection>

						<CollapsibleSection title="Payment" icon={CreditCard} verified>
							<PaymentCard brand="Mastercard" last4="1234" exp="07/27" />
						</CollapsibleSection>
					</div>

					<div className="@lg:sticky @lg:top-8 @lg:self-start">
						<Card className="bg-gradient-to-br from-card to-muted/30">
							<CardHeader>
								<CardTitle>Summary</CardTitle>
							</CardHeader>
							<CardContent className="space-y-3">
								<PriceLine label="Subtotal (3 items)" value="$149.97" />
								<PriceLine label="Shipping" value="$0.00" />
								<PriceLine label="Tax" value="$12.75" />
								<PriceLine label="Promo" value="-$15.00" green />
								<Separator className="my-4" />
								<PriceLine label="Total" value="$147.72" bold />
							</CardContent>
							<CardFooter className="flex-col gap-3">
								<Button size="lg" className="w-full gap-2">
									<Lock className="size-4" />
									Place Order
									<ArrowRight className="size-4" />
								</Button>
								<div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
									<Shield className="size-3" />
									<span>256-bit encryption</span>
								</div>
							</CardFooter>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
}
