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
	Apple,
	CreditCard,
	Minus,
	Plus,
	ShoppingBag,
	Smartphone,
	X,
} from 'lucide-react';
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

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="text-sm font-medium leading-tight">{item.name}</h4>
				<Button size="icon" variant="ghost" className="size-6">
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
					<Button size="icon" variant="ghost" className="size-6 rounded-full">
						<Minus className="size-3" />
					</Button>
					<span className="w-5 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button size="icon" variant="ghost" className="size-6 rounded-full">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const QuickPaySection = ({ total }: { total: number }) => (
	<div className="space-y-3 pb-safe">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full h-14 text-lg font-semibold rounded-xl bg-black hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
			size="lg"
		>
			<Apple className="mr-2 size-5" />
			Pay
		</Button>
		<Button
			variant="outline"
			className="w-full h-14 text-lg font-semibold rounded-xl"
			size="lg"
		>
			<Smartphone className="mr-2 size-5" />
			Google Pay
		</Button>
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t border-border" />
			</div>
			<div className="relative flex justify-center text-xs uppercase">
				<span className="bg-background px-2 text-muted-foreground">
					or pay with card
				</span>
			</div>
		</div>
		<Button
			variant="secondary"
			className="w-full h-12 text-base rounded-xl"
			size="lg"
		>
			<CreditCard className="mr-2 size-4" />
			Card Payment
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
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
						className="flex h-auto max-h-[90dvh] flex-col rounded-t-3xl"
					>
						<div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-muted" />
						<SheetHeader>
							<SheetTitle className="text-lg">{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 max-h-[40vh] -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<div className="border-t border-border pt-4">
							<QuickPaySection total={total} />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
