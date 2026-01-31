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
import { Layers, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface PriceTier {
	minQty: number;
	pricePerUnit: number;
}

interface CartItem {
	id: string;
	image: string;
	name: string;
	basePrice: number;
	quantity: number;
	priceTiers: PriceTier[];
}

interface CartDrawerProps {
	title: string;
	bulkLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const BulkTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const getCurrentTierPrice = (quantity: number, tiers: PriceTier[]): number => {
	const sortedTiers = [...tiers].sort((a, b) => b.minQty - a.minQty);
	const applicableTier = sortedTiers.find((tier) => quantity >= tier.minQty);
	return applicableTier?.pricePerUnit || tiers[0]?.pricePerUnit || 0;
};

const TierBadges = ({
	tiers,
	currentQty,
}: {
	tiers: PriceTier[];
	currentQty: number;
}) => (
	<div className="flex flex-wrap gap-1">
		{tiers.map((tier) => {
			const isActive = currentQty >= tier.minQty;
			const isNext = tiers.findIndex(
				(t) => currentQty < t.minQty && t.minQty === tier.minQty,
			) === 0;

			return (
				<Badge
					key={tier.minQty}
					variant={isActive ? 'default' : 'outline'}
					className={`text-[9px] ${isNext ? 'border-dashed' : ''}`}
				>
					{tier.minQty}+: ${tier.pricePerUnit.toFixed(2)}
				</Badge>
			);
		})}
	</div>
);

const BulkItem = ({ item }: { item: CartItem }) => {
	const currentPrice = getCurrentTierPrice(item.quantity, item.priceTiers);
	const baseTotalPrice = item.basePrice * item.quantity;
	const currentTotalPrice = currentPrice * item.quantity;
	const savings = baseTotalPrice - currentTotalPrice;

	return (
		<div className="py-4">
			<div className="flex gap-3">
				<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
					<Image src={item.image} alt={item.name} fill className="object-cover" />
				</div>
				<div className="flex min-w-0 flex-1 flex-col">
					<div className="flex items-start justify-between gap-2">
						<h4 className="truncate text-sm font-medium">{item.name}</h4>
						<Button size="icon-sm" variant="ghost" className="size-5">
							<X className="size-3" />
						</Button>
					</div>
					<div className="mt-1 flex items-center gap-2">
						<span className="text-sm font-bold">
							${currentPrice.toFixed(2)}/ea
						</span>
						{currentPrice < item.basePrice && (
							<span className="text-xs text-muted-foreground line-through">
								${item.basePrice.toFixed(2)}
							</span>
						)}
					</div>
					<div className="mt-2">
						<TierBadges tiers={item.priceTiers} currentQty={item.quantity} />
					</div>
				</div>
			</div>
			<div className="mt-3 flex items-center justify-between">
				<div className="flex items-center gap-2 rounded-lg border border-border p-1">
					<Button size="icon-sm" variant="ghost" className="size-7">
						<Minus className="size-3" />
					</Button>
					<span className="w-10 text-center font-medium">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-7">
						<Plus className="size-3" />
					</Button>
				</div>
				<div className="text-right">
					<span className="font-medium">${currentTotalPrice.toFixed(2)}</span>
					{savings > 0 && (
						<p className="text-xs text-green-600">Save ${savings.toFixed(2)}</p>
					)}
				</div>
			</div>
		</div>
	);
};

const BulkSummary = ({
	label,
	items,
	checkoutLabel,
}: {
	label: string;
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const baseTotal = items.reduce(
		(sum, item) => sum + item.basePrice * item.quantity,
		0,
	);
	const discountedTotal = items.reduce((sum, item) => {
		const price = getCurrentTierPrice(item.quantity, item.priceTiers);
		return sum + price * item.quantity;
	}, 0);
	const totalSavings = baseTotal - discountedTotal;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
				<Layers className="size-4 text-primary" />
				<span className="text-sm font-medium text-primary">{label}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Regular Total</span>
				<span className="text-muted-foreground line-through">
					${baseTotal.toFixed(2)}
				</span>
			</div>
			{totalSavings > 0 && (
				<div className="flex justify-between text-sm text-green-600">
					<span>Bulk Savings</span>
					<span>-${totalSavings.toFixed(2)}</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${discountedTotal.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Layers className="size-4" />
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Bulk Order',
		bulkLabel: 'Bulk discounts applied!',
		checkoutLabel: 'Bulk Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
				name: 'Premium Phone Case',
				basePrice: 24.99,
				quantity: 12,
				priceTiers: [
					{ minQty: 1, pricePerUnit: 24.99 },
					{ minQty: 5, pricePerUnit: 22.99 },
					{ minQty: 10, pricePerUnit: 19.99 },
					{ minQty: 25, pricePerUnit: 16.99 },
				],
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
				name: 'USB-C Cable',
				basePrice: 14.99,
				quantity: 6,
				priceTiers: [
					{ minQty: 1, pricePerUnit: 14.99 },
					{ minQty: 5, pricePerUnit: 12.99 },
					{ minQty: 10, pricePerUnit: 10.99 },
				],
			},
		],
	};

	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<BulkTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle className="flex items-center gap-2">
								<Layers className="size-5 text-primary" />
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<BulkItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<BulkSummary
							label={cartData.bulkLabel}
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
