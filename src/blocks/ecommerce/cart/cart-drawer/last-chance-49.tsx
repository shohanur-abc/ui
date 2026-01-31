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
import { AlertCircle, Clock, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface LastChanceItem {
	id: string;
	image: string;
	name: string;
	originalPrice: number;
	salePrice: number;
	timeLeft: string;
}

interface CartDrawerProps {
	title: string;
	lastChanceLabel: string;
	lastChanceDescription: string;
	checkoutLabel: string;
	items: CartItem[];
	lastChance: LastChanceItem[];
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

const LastChanceCard = ({ item }: { item: LastChanceItem }) => {
	const discount = Math.round(
		((item.originalPrice - item.salePrice) / item.originalPrice) * 100,
	);

	return (
		<div className="w-36 shrink-0 space-y-2">
			<div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				<Badge
					variant="destructive"
					className="absolute left-2 top-2 px-1.5 py-0 text-[10px]"
				>
					-{discount}%
				</Badge>
				<div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-1.5">
					<div className="flex items-center gap-1 text-white text-[10px]">
						<Clock className="size-2.5" />
						{item.timeLeft}
					</div>
				</div>
				<Button
					size="icon-sm"
					className="absolute right-2 top-2 size-6 rounded-full"
				>
					<Plus className="size-3" />
				</Button>
			</div>
			<div>
				<h4 className="truncate text-xs font-medium">{item.name}</h4>
				<div className="flex items-center gap-2 mt-0.5">
					<span className="text-sm font-bold text-destructive">
						${item.salePrice.toFixed(2)}
					</span>
					<span className="text-xs text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

const LastChanceSection = ({
	label,
	description,
	items,
}: {
	label: string;
	description: string;
	items: LastChanceItem[];
}) => (
	<div className="space-y-3">
		<div className="rounded-lg bg-destructive/10 p-3 flex items-start gap-2">
			<AlertCircle className="size-4 text-destructive shrink-0 mt-0.5" />
			<div>
				<span className="text-sm font-medium text-destructive">{label}</span>
				<p className="text-xs text-muted-foreground mt-0.5">{description}</p>
			</div>
		</div>
		<ScrollArea className="-mx-6">
			<div className="flex gap-3 px-6">
				{items.map((item) => (
					<LastChanceCard key={item.id} item={item} />
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
		lastChanceLabel: 'Last Chance!',
		lastChanceDescription: 'These deals expire soon. Don\'t miss out!',
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
		lastChance: [
			{
				id: 'lc1',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				originalPrice: 179.99,
				salePrice: 99.99,
				timeLeft: '2h 15m',
			},
			{
				id: 'lc2',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				originalPrice: 99.99,
				salePrice: 59.99,
				timeLeft: '45m',
			},
			{
				id: 'lc3',
				image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Air Force One',
				originalPrice: 119.99,
				salePrice: 79.99,
				timeLeft: '1h 30m',
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
							<LastChanceSection
								label={cartData.lastChanceLabel}
								description={cartData.lastChanceDescription}
								items={cartData.lastChance}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
