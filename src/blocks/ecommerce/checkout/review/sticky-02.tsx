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

const ProductRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-3">
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

const InfoLine = ({
	icon: Icon,
	label,
	value,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	value: string;
}) => (
	<div className="flex items-center gap-3">
		<Icon className="size-4 text-primary" />
		<span className="text-sm text-muted-foreground">{label}:</span>
		<span className="text-sm font-medium">{value}</span>
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
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-sm'}`}
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
			name: 'Coffee Maker',
			variant: 'Drip / Stainless',
			price: 149.99,
			qty: 1,
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=200&h=200&fit=crop',
		},
		{
			id: '2',
			name: 'Coffee Beans',
			variant: 'Arabica / 1kg',
			price: 24.99,
			qty: 2,
			image:
				'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=200&h=200&fit=crop',
		},
	];

	return (
		<section className="@container relative overflow-hidden" data-theme="neon">
			<div className="flex min-h-screen flex-col">
				<div className="flex-1 overflow-auto">
					<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @md:py-12">
						<div className="mb-6 text-center">
							<h1 className="text-2xl font-bold tracking-tight">
								Review Order
							</h1>
							<p className="text-sm text-muted-foreground">
								3 items in your cart
							</p>
						</div>

						<Card className="mb-6">
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2 text-lg">
									<Package className="size-5 text-primary" />
									Items
								</CardTitle>
							</CardHeader>
							<CardContent className="divide-y">
								{items.map((item) => (
									<ProductRow key={item.id} item={item} />
								))}
							</CardContent>
						</Card>

						<Card className="mb-6">
							<CardContent className="space-y-3 pt-6">
								<InfoLine
									icon={MapPin}
									label="Ship to"
									value="Rachel T., Los Angeles, CA"
								/>
								<InfoLine
									icon={Truck}
									label="Delivery"
									value="Standard · Dec 26-28"
								/>
								<InfoLine
									icon={CreditCard}
									label="Payment"
									value="Amex •••• 3210"
								/>
							</CardContent>
						</Card>

						<div className="flex flex-wrap gap-2">
							<Badge variant="secondary" className="gap-1">
								<Check className="size-3" />
								Items verified
							</Badge>
							<Badge variant="secondary" className="gap-1">
								<Check className="size-3" />
								Address confirmed
							</Badge>
							<Badge variant="secondary" className="gap-1">
								<Check className="size-3" />
								Payment ready
							</Badge>
						</div>
					</div>
				</div>

				<div className="sticky bottom-0 border-t bg-background/95 backdrop-blur-sm">
					<div className="mx-auto max-w-2xl px-4 py-4 @sm:px-6">
						<div className="mb-4 space-y-2">
							<SummaryLine label="Subtotal" value="$199.97" />
							<SummaryLine label="Shipping" value="$0.00" />
							<SummaryLine label="Tax" value="$17.00" />
							<SummaryLine label="Discount" value="-$20.00" green />
							<Separator />
							<SummaryLine label="Total" value="$196.97" bold />
						</div>

						<Button size="lg" className="w-full gap-2">
							<Lock className="size-4" />
							Pay $196.97
							<ArrowRight className="size-4" />
						</Button>

						<div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
							<Shield className="size-3" />
							<span>Secure checkout</span>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
