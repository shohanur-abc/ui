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
import { ChevronLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	variant: string;
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

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<h4 className="text-lg font-semibold leading-tight">{item.name}</h4>
			<span className="text-sm text-muted-foreground">{item.variant}</span>
			<span className="text-lg font-bold mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center gap-1 bg-muted rounded-full p-1">
					<Button size="icon" variant="ghost" className="size-9 rounded-full">
						<Minus className="size-4" />
					</Button>
					<span className="w-8 text-center font-semibold">{item.quantity}</span>
					<Button size="icon" variant="ghost" className="size-9 rounded-full">
						<Plus className="size-4" />
					</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					className="size-10 text-destructive"
				>
					<Trash2 className="size-5" />
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
	<div className="space-y-4 border-t border-border pt-4 pb-safe">
		<div className="flex justify-between text-xl">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full h-14 text-lg font-semibold rounded-2xl" size="lg">
			{checkoutLabel}
		</Button>
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
				variant: 'Size: 10 • Red',
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 2,
				variant: 'Size: 9 • White',
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
					<SheetContent className="flex w-full flex-col sm:max-w-md p-0">
						<SheetHeader className="flex-row items-center gap-2 p-4 border-b border-border">
							<Button size="icon" variant="ghost" className="size-10">
								<ChevronLeft className="size-6" />
							</Button>
							<SheetTitle className="text-xl flex-1">
								{cartData.title}
							</SheetTitle>
							<Badge variant="secondary" className="text-sm">
								{itemCount} items
							</Badge>
						</SheetHeader>
						<ScrollArea className="flex-1 px-4">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<div className="p-4">
							<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
