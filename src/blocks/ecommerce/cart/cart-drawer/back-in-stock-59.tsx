'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, CheckCircle, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface BackInStockItem {
	id: string;
	image: string;
	name: string;
	price: number;
	backedInStockAt: string;
}

interface CartDrawerProps {
	title: string;
	backInStockLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	backInStock: BackInStockItem[];
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

const BackInStockCard = ({ item }: { item: BackInStockItem }) => (
	<Card className="p-3 border-green-200 bg-green-50/50 dark:bg-green-950/20">
		<div className="flex gap-3">
			<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				<Badge className="absolute -right-1 -top-1 size-5 p-0 rounded-full bg-green-500">
					<CheckCircle className="size-3" />
				</Badge>
			</div>
			<div className="flex flex-1 flex-col">
				<h4 className="text-sm font-medium">{item.name}</h4>
				<p className="text-xs text-green-600">{item.backedInStockAt}</p>
				<div className="mt-auto flex items-center justify-between">
					<span className="font-medium">${item.price.toFixed(2)}</span>
					<Button size="sm" className="bg-green-600 hover:bg-green-700">
						<Plus className="mr-1 size-3" />
						Add
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const BackInStockSection = ({
	label,
	items,
}: {
	label: string;
	items: BackInStockItem[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<div className="relative">
				<Bell className="size-4 text-green-600" />
				<span className="absolute -right-0.5 -top-0.5 flex size-2">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
					<span className="relative inline-flex size-2 rounded-full bg-green-500" />
				</span>
			</div>
			<span className="text-sm font-medium">{label}</span>
			<Badge className="bg-green-500">{items.length}</Badge>
		</div>
		<div className="space-y-2">
			{items.map((item) => (
				<BackInStockCard key={item.id} item={item} />
			))}
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
		backInStockLabel: 'Back in Stock!',
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
		backInStock: [
			{
				id: 'b1',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				backedInStockAt: 'Just restocked!',
			},
			{
				id: 'b2',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				price: 99.99,
				backedInStockAt: 'Restocked 2 hours ago',
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
							{cartData.backInStock.length > 0 && (
								<>
									<BackInStockSection
										label={cartData.backInStockLabel}
										items={cartData.backInStock}
									/>
									<Separator className="my-4" />
								</>
							)}
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
