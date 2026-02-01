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
import { Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative size-12">
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-full p-0 text-xs">
				{count}
			</Badge>
		)}
	</Button>
);

const HorizontalItemCard = ({ item }: { item: CartItem }) => (
	<div className="min-w-[200px] max-w-[200px] flex-shrink-0 snap-center">
		<div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Button
				size="icon"
				variant="secondary"
				className="absolute right-2 top-2 size-8 rounded-full"
			>
				<X className="size-4" />
			</Button>
		</div>
		<div className="mt-3 space-y-2">
			<h4 className="font-semibold truncate">{item.name}</h4>
			<div className="flex items-center justify-between">
				<span className="text-lg font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
				<div className="flex items-center gap-0.5 bg-muted rounded-full p-0.5">
					<Button size="icon" variant="ghost" className="size-7 rounded-full">
						<Minus className="size-3.5" />
					</Button>
					<span className="w-5 text-center font-medium text-sm">
						{item.quantity}
					</span>
					<Button size="icon" variant="ghost" className="size-7 rounded-full">
						<Plus className="size-3.5" />
					</Button>
				</div>
			</div>
		</div>
	</div>
);

const Summary = ({
	total,
	itemCount,
	checkoutLabel,
}: {
	total: number;
	itemCount: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4 pb-safe">
		<div className="flex justify-between items-center">
			<div>
				<span className="text-muted-foreground">{itemCount} items</span>
				<p className="text-xl font-bold">${total.toFixed(2)}</p>
			</div>
			<Button
				className="h-12 px-8 text-lg font-semibold rounded-full"
				size="lg"
			>
				{checkoutLabel}
			</Button>
		</div>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Sport Sneakers',
				price: 99.99,
				quantity: 2,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
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
					<SheetContent
						side="bottom"
						className="flex h-auto max-h-[70dvh] flex-col rounded-t-3xl p-0"
					>
						<div className="mx-auto mt-3 h-1.5 w-12 rounded-full bg-muted" />
						<SheetHeader className="px-6 pt-2 pb-4">
							<SheetTitle className="text-xl">{cartData.title}</SheetTitle>
						</SheetHeader>
						<div className="overflow-x-auto snap-x snap-mandatory -mx-0 px-6 pb-4">
							<div className="flex gap-4">
								{cartData.items.map((item) => (
									<HorizontalItemCard key={item.id} item={item} />
								))}
							</div>
						</div>
						<div className="px-6">
							<Summary
								total={total}
								itemCount={itemCount}
								checkoutLabel={cartData.checkoutLabel}
							/>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
