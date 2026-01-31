'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Award, Minus, Plus, ShoppingBag, X, Zap } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface Tier {
	minSpend: number;
	discount: number;
	label: string;
}

interface CartDrawerProps {
	title: string;
	tiersTitle: string;
	checkoutLabel: string;
	items: CartItem[];
	tiers: Tier[];
}

const TriggerWithBadge = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const TierProgress = ({
	tiers,
	currentSpend,
}: {
	tiers: Tier[];
	currentSpend: number;
}) => {
	const activeTier = tiers.reduce((active, tier) => {
		if (currentSpend >= tier.minSpend) return tier;
		return active;
	}, null as Tier | null);

	const nextTier = tiers.find((tier) => currentSpend < tier.minSpend);

	return (
		<div className="space-y-3 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 p-4">
			<div className="flex items-center gap-2">
				<Zap className="size-4 text-primary" />
				<span className="text-sm font-medium">Spend More, Save More</span>
			</div>
			<div className="flex gap-1">
				{tiers.map((tier, index) => {
					const isActive = currentSpend >= tier.minSpend;
					const width = 100 / tiers.length;

					return (
						<div
							key={tier.minSpend}
							className={`h-2 rounded-full transition-colors ${
								isActive ? 'bg-primary' : 'bg-muted'
							}`}
							style={{ width: `${width}%` }}
						/>
					);
				})}
			</div>
			<div className="flex items-center justify-between text-xs">
				{activeTier ? (
					<div className="flex items-center gap-1 text-primary">
						<Award className="size-3" />
						<span className="font-medium">{activeTier.label} unlocked!</span>
					</div>
				) : (
					<span className="text-muted-foreground">No discount yet</span>
				)}
				{nextTier && (
					<span className="text-muted-foreground">
						${(nextTier.minSpend - currentSpend).toFixed(2)} to {nextTier.label}
					</span>
				)}
			</div>
		</div>
	);
};

const SimpleItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const TieredSummary = ({
	subtotal,
	tiers,
	checkoutLabel,
}: {
	subtotal: number;
	tiers: Tier[];
	checkoutLabel: string;
}) => {
	const activeTier = tiers.reduce((active, tier) => {
		if (subtotal >= tier.minSpend) return tier;
		return active;
	}, null as Tier | null);

	const discount = activeTier ? subtotal * (activeTier.discount / 100) : 0;
	const total = subtotal - discount;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			{activeTier && (
				<div className="flex justify-between text-sm text-primary">
					<span className="flex items-center gap-1">
						<Award className="size-3" />
						{activeTier.label} ({activeTier.discount}% off)
					</span>
					<span>-${discount.toFixed(2)}</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Zap className="size-4" />
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		tiersTitle: 'Spend More, Save More',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
				name: 'Premium Headphones',
				price: 299.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
				name: 'Phone Case',
				price: 29.99,
				quantity: 1,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
				name: 'Wireless Charger',
				price: 49.99,
				quantity: 1,
			},
		],
		tiers: [
			{ minSpend: 100, discount: 5, label: '5% off' },
			{ minSpend: 200, discount: 10, label: '10% off' },
			{ minSpend: 300, discount: 15, label: '15% off' },
			{ minSpend: 500, discount: 20, label: '20% off' },
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerWithBadge count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<TierProgress tiers={cartData.tiers} currentSpend={subtotal} />
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<SimpleItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<TieredSummary
							subtotal={subtotal}
							tiers={cartData.tiers}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
