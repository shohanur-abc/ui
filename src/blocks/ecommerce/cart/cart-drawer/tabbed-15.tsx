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
import { Clock, Heart, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	title: string;
	cartTabLabel: string;
	savedTabLabel: string;
	recentTabLabel: string;
	checkoutLabel: string;
	cartItems: CartItem[];
	savedItems: CartItem[];
	recentItems: CartItem[];
}

const TabTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const ItemRow = ({
	item,
	showQuantity = true,
}: {
	item: CartItem;
	showQuantity?: boolean;
}) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div>
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				{showQuantity ? (
					<div className="flex items-center gap-1 rounded border border-border">
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-xs">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Plus className="size-3" />
						</Button>
					</div>
				) : (
					<Button size="sm" variant="outline" className="h-7 text-xs">
						Add to Cart
					</Button>
				)}
				<span className="text-sm font-bold">${item.price.toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const CartContent = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="flex flex-1 flex-col">
			<ScrollArea className="flex-1 -mx-6 px-6">
				<div className="divide-y divide-border">
					{items.map((item) => (
						<ItemRow key={item.id} item={item} showQuantity />
					))}
				</div>
			</ScrollArea>
			<div className="space-y-4 border-t border-border pt-4">
				<div className="flex justify-between text-lg">
					<span>Subtotal</span>
					<span className="font-bold">${total.toFixed(2)}</span>
				</div>
				<Button className="w-full" size="lg">
					{checkoutLabel}
				</Button>
			</div>
		</div>
	);
};

const SavedContent = ({ items }: { items: CartItem[] }) => (
	<ScrollArea className="flex-1 -mx-6 px-6">
		{items.length === 0 ? (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<Heart className="size-12 text-muted-foreground/50" />
				<p className="mt-4 text-sm text-muted-foreground">
					No saved items yet
				</p>
			</div>
		) : (
			<div className="divide-y divide-border">
				{items.map((item) => (
					<ItemRow key={item.id} item={item} showQuantity={false} />
				))}
			</div>
		)}
	</ScrollArea>
);

const RecentContent = ({ items }: { items: CartItem[] }) => (
	<ScrollArea className="flex-1 -mx-6 px-6">
		{items.length === 0 ? (
			<div className="flex flex-col items-center justify-center py-12 text-center">
				<Clock className="size-12 text-muted-foreground/50" />
				<p className="mt-4 text-sm text-muted-foreground">
					No recent items
				</p>
			</div>
		) : (
			<div className="divide-y divide-border">
				{items.map((item) => (
					<ItemRow key={item.id} item={item} showQuantity={false} />
				))}
			</div>
		)}
	</ScrollArea>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Shopping',
		cartTabLabel: 'Cart',
		savedTabLabel: 'Saved',
		recentTabLabel: 'Recent',
		checkoutLabel: 'Checkout',
		cartItems: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1491553895911-0055uj8g27j?w=200&h=200&fit=crop',
				name: 'Classic Watch',
				variant: 'Silver / Leather',
				price: 249.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Leather Wallet',
				variant: 'Brown',
				price: 89.99,
				quantity: 1,
			},
		],
		savedItems: [
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=200&h=200&fit=crop',
				name: 'Canvas Bag',
				variant: 'Beige',
				price: 65.00,
				quantity: 1,
			},
		],
		recentItems: [
			{
				id: '4',
				image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop',
				name: 'Sunglasses',
				variant: 'Black',
				price: 159.00,
				quantity: 1,
			},
			{
				id: '5',
				image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
				name: 'Belt',
				variant: 'Black / M',
				price: 55.00,
				quantity: 1,
			},
		],
	};

	const cartCount = cartData.cartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TabTrigger count={cartCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
						<SheetHeader className="p-6 pb-0">
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<Tabs defaultValue="cart" className="flex flex-1 flex-col px-6 pb-6">
							<TabsList className="grid w-full grid-cols-3">
								<TabsTrigger value="cart" className="gap-1">
									{cartData.cartTabLabel}
									<Badge variant="secondary" className="h-4 px-1 text-[10px]">
										{cartCount}
									</Badge>
								</TabsTrigger>
								<TabsTrigger value="saved">{cartData.savedTabLabel}</TabsTrigger>
								<TabsTrigger value="recent">{cartData.recentTabLabel}</TabsTrigger>
							</TabsList>
							<TabsContent value="cart" className="flex-1 mt-4">
								<CartContent
									items={cartData.cartItems}
									checkoutLabel={cartData.checkoutLabel}
								/>
							</TabsContent>
							<TabsContent value="saved" className="flex-1 mt-4">
								<SavedContent items={cartData.savedItems} />
							</TabsContent>
							<TabsContent value="recent" className="flex-1 mt-4">
								<RecentContent items={cartData.recentItems} />
							</TabsContent>
						</Tabs>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
