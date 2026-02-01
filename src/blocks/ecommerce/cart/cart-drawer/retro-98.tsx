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
import { Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
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
	<Button
		variant="outline"
		size="icon"
		className="relative size-12 rounded-full bg-amber-100 border-2 border-amber-700 text-amber-700 hover:bg-amber-200 shadow-md"
	>
		<ShoppingBag className="size-5" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-full bg-red-600 border-2 border-amber-100 p-0 text-xs font-bold">
				{count}
			</Badge>
		)}
	</Button>
);

const RetroItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5 border-b-2 border-dashed border-amber-300">
		<div className="relative size-20 shrink-0 border-2 border-amber-600 rounded-lg overflow-hidden bg-amber-50 shadow-md rotate-1">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col -rotate-0.5">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-bold text-amber-900">{item.name}</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-6 text-amber-600 hover:text-red-600 hover:bg-red-50"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-xl font-bold text-amber-800 mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 bg-amber-100 border-2 border-amber-400 rounded-full p-0.5 shadow-inner">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full text-amber-700 hover:bg-amber-200"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm font-bold text-amber-800">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full text-amber-700 hover:bg-amber-200"
					>
						<Plus className="size-3" />
					</Button>
				</div>
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
	<div className="space-y-4 pt-6">
		<div className="flex justify-between items-center">
			<span className="text-lg font-bold text-amber-800">Total</span>
			<div className="flex items-center gap-2">
				<Star className="size-5 text-amber-500 fill-amber-500" />
				<span className="text-2xl font-bold text-amber-900">
					${total.toFixed(2)}
				</span>
			</div>
		</div>
		<Button
			className="w-full h-12 rounded-full bg-gradient-to-b from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white font-bold shadow-lg border-2 border-amber-700 transform active:scale-95 transition-transform"
			size="lg"
		>
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: '★ Shopping Cart ★',
		checkoutLabel: '✓ Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Classic Kicks',
				price: 79.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Vintage Runner',
				price: 89.99,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-b from-amber-50 to-orange-50 border-l-4 border-amber-400">
						<SheetHeader className="pb-4 border-b-2 border-amber-300">
							<SheetTitle className="text-xl font-bold text-amber-900 tracking-wide">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div>
								{cartData.items.map((item) => (
									<RetroItemRow key={item.id} item={item} />
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
