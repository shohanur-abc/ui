'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	ArrowDown,
	Minus,
	Plus,
	ShoppingBag,
	TrendingDown,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	originalPrice: number;
	currentPrice: number;
	priceDrop: number;
	quantity: number;
	droppedAt: string;
}

interface CartDrawerProps {
	title: string;
	priceDropLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const PriceDropBanner = ({
	item,
	label,
}: {
	item: CartItem;
	label: string;
}) => {
	if (item.priceDrop <= 0) return null;

	return (
		<div className="mt-2 flex items-center gap-2 rounded-md bg-green-500/10 px-2 py-1.5">
			<TrendingDown className="size-4 text-green-600" />
			<div className="flex-1">
				<span className="text-xs font-medium text-green-700">{label}</span>
				<span className="ml-1 text-xs text-green-600">
					Save ${item.priceDrop.toFixed(2)}
				</span>
			</div>
			<span className="text-[10px] text-muted-foreground">
				{item.droppedAt}
			</span>
		</div>
	);
};

const ItemRow = ({
	item,
	priceDropLabel,
}: {
	item: CartItem;
	priceDropLabel: string;
}) => (
	<div className="py-4">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{item.priceDrop > 0 && (
					<Badge className="absolute -right-1 -top-1 size-5 p-0 rounded-full bg-green-500">
						<ArrowDown className="size-3" />
					</Badge>
				)}
			</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h4 className="font-medium">{item.name}</h4>
						<p className="text-sm text-muted-foreground">{item.variant}</p>
					</div>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<X className="size-3.5" />
					</Button>
				</div>
				<div className="mt-auto flex items-center justify-between">
					<div className="flex items-center gap-1 rounded border border-border">
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-sm">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Plus className="size-3" />
						</Button>
					</div>
					<div className="text-right">
						<span className="font-semibold text-green-600">
							${item.currentPrice.toFixed(2)}
						</span>
						{item.priceDrop > 0 && (
							<span className="ml-1.5 text-sm text-muted-foreground line-through">
								${item.originalPrice.toFixed(2)}
							</span>
						)}
					</div>
				</div>
			</div>
		</div>
		<PriceDropBanner item={item} label={priceDropLabel} />
	</div>
);

const SavingsSummary = ({ totalSaved }: { totalSaved: number }) => (
	<div className="flex items-center justify-center gap-2 rounded-lg bg-green-500/10 p-3">
		<TrendingDown className="size-5 text-green-600" />
		<span className="font-medium text-green-700">
			You're saving ${totalSaved.toFixed(2)} with price drops!
		</span>
	</div>
);

const Summary = ({
	total,
	totalSaved,
	checkoutLabel,
}: {
	total: number;
	totalSaved: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		{totalSaved > 0 && <SavingsSummary totalSaved={totalSaved} />}
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		priceDropLabel: 'Price Drop!',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				variant: 'Red / Size 10',
				originalPrice: 149.99,
				currentPrice: 129.99,
				priceDrop: 20.0,
				quantity: 1,
				droppedAt: '2 days ago',
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				variant: 'White / Size 11',
				originalPrice: 179.99,
				currentPrice: 179.99,
				priceDrop: 0,
				quantity: 1,
				droppedAt: '',
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.currentPrice * item.quantity,
		0,
	);
	const totalSaved = cartData.items.reduce(
		(sum, item) => sum + item.priceDrop * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce(
		(sum, item) => sum + item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow
										key={item.id}
										item={item}
										priceDropLabel={cartData.priceDropLabel}
									/>
								))}
							</div>
						</ScrollArea>
						<Summary
							total={total}
							totalSaved={totalSaved}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
