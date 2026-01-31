'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Bookmark, Minus, Plus, ShoppingBag, ShoppingCart, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface SavedItem {
	id: string;
	image: string;
	name: string;
	price: number;
	savedAt: string;
}

interface CartDrawerProps {
	title: string;
	cartTabLabel: string;
	savedTabLabel: string;
	moveToCartLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	savedItems: SavedItem[];
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

const SavedItemRow = ({
	item,
	moveToCartLabel,
}: {
	item: SavedItem;
	moveToCartLabel: string;
}) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div>
				<div className="flex items-start justify-between gap-2">
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<X className="size-3" />
					</Button>
				</div>
				<p className="text-xs text-muted-foreground">Saved {item.savedAt}</p>
			</div>
			<div className="flex items-center justify-between">
				<span className="text-sm font-medium">${item.price.toFixed(2)}</span>
				<Button size="sm" variant="outline">
					<ShoppingCart className="mr-1 size-3" />
					{moveToCartLabel}
				</Button>
			</div>
		</div>
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
		cartTabLabel: 'Cart',
		savedTabLabel: 'Saved',
		moveToCartLabel: 'Move to Cart',
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
		savedItems: [
			{
				id: 's1',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				savedAt: '2 days ago',
			},
			{
				id: 's2',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				price: 99.99,
				savedAt: '1 week ago',
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
						<Tabs defaultValue="cart" className="flex-1 flex flex-col">
							<TabsList className="grid w-full grid-cols-2">
								<TabsTrigger value="cart" className="gap-1.5">
									<ShoppingCart className="size-3.5" />
									{cartData.cartTabLabel}
									<Badge variant="secondary" className="ml-1 size-5 p-0 text-[10px]">
										{cartData.items.length}
									</Badge>
								</TabsTrigger>
								<TabsTrigger value="saved" className="gap-1.5">
									<Bookmark className="size-3.5" />
									{cartData.savedTabLabel}
									<Badge variant="secondary" className="ml-1 size-5 p-0 text-[10px]">
										{cartData.savedItems.length}
									</Badge>
								</TabsTrigger>
							</TabsList>
							<TabsContent value="cart" className="flex-1 mt-0">
								<ScrollArea className="h-[calc(100vh-22rem)]">
									<div className="divide-y divide-border">
										{cartData.items.map((item) => (
											<ItemRow key={item.id} item={item} />
										))}
									</div>
								</ScrollArea>
							</TabsContent>
							<TabsContent value="saved" className="flex-1 mt-0">
								<ScrollArea className="h-[calc(100vh-22rem)]">
									<div className="divide-y divide-border">
										{cartData.savedItems.map((item) => (
											<SavedItemRow
												key={item.id}
												item={item}
												moveToCartLabel={cartData.moveToCartLabel}
											/>
										))}
									</div>
								</ScrollArea>
							</TabsContent>
						</Tabs>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
