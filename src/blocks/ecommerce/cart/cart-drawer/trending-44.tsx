'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag, TrendingUp, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface TrendingItem {
	id: string;
	image: string;
	name: string;
	price: number;
	soldCount: number;
}

interface CartDrawerProps {
	title: string;
	trendingLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	trending: TrendingItem[];
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

const ItemRow = ({ item }: { item: CartItem }) => (
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

const TrendingProductCard = ({ item }: { item: TrendingItem }) => (
	<div className="w-32 shrink-0 space-y-2">
		<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Button
				size="icon-sm"
				className="absolute bottom-2 right-2 size-6 rounded-full"
			>
				<Plus className="size-3" />
			</Button>
		</div>
		<div>
			<h4 className="truncate text-xs font-medium">{item.name}</h4>
			<div className="flex items-center justify-between mt-0.5">
				<span className="text-sm font-bold">${item.price.toFixed(2)}</span>
				<span className="text-[10px] text-muted-foreground">
					{item.soldCount}+ sold
				</span>
			</div>
		</div>
	</div>
);

const TrendingCarousel = ({
	label,
	items,
}: {
	label: string;
	items: TrendingItem[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<TrendingUp className="size-4 text-primary" />
				<span className="text-sm font-medium">{label}</span>
			</div>
			<div className="flex gap-1">
				<Button size="icon-sm" variant="outline" className="size-6">
					<ChevronLeft className="size-3" />
				</Button>
				<Button size="icon-sm" variant="outline" className="size-6">
					<ChevronRight className="size-3" />
				</Button>
			</div>
		</div>
		<ScrollArea className="-mx-6">
			<div className="flex gap-3 px-6">
				{items.map((item) => (
					<TrendingProductCard key={item.id} item={item} />
				))}
			</div>
			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	</div>
);

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
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
		trendingLabel: 'Trending Now',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
		],
		trending: [
			{
				id: 't1',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				soldCount: 2500,
			},
			{
				id: 't2',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				price: 99.99,
				soldCount: 1800,
			},
			{
				id: 't3',
				image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Air Force One',
				price: 119.99,
				soldCount: 3200,
			},
			{
				id: 't4',
				image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=200&h=200&fit=crop',
				name: 'Jordan Retro',
				price: 189.99,
				soldCount: 4100,
			},
			{
				id: 't5',
				image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=200&h=200&fit=crop',
				name: 'NB 574',
				price: 89.99,
				soldCount: 1500,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

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
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<TrendingCarousel
								label={cartData.trendingLabel}
								items={cartData.trending}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
