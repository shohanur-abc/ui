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
	<Button
		variant="outline"
		size="icon"
		className="relative size-11 rounded-none border-2 border-foreground bg-transparent hover:bg-foreground hover:text-background transition-colors"
	>
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-3 -top-3 size-5 rounded-none bg-foreground text-background p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-5 py-6">
		<div className="relative w-24 h-32 shrink-0 overflow-hidden bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="text-sm uppercase tracking-widest font-light">
					{item.name}
				</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-6 rounded-none hover:bg-transparent hover:text-destructive"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-light mt-2">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-4">
				<div className="flex items-center border border-foreground/20">
					<Button
						size="icon"
						variant="ghost"
						className="size-8 rounded-none hover:bg-foreground hover:text-background"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-10 text-center text-sm">{item.quantity}</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-8 rounded-none hover:bg-foreground hover:text-background"
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
	<div className="space-y-6 border-t border-foreground/10 pt-6">
		<div className="flex justify-between text-sm uppercase tracking-widest">
			<span>Total</span>
			<span>${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full h-12 rounded-none bg-foreground text-background hover:bg-foreground/90 uppercase tracking-widest text-sm font-light"
			size="lg"
		>
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Shopping Bag',
		checkoutLabel: 'Proceed to Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Minimalist Runner',
				price: 329.0,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Essential Boost',
				price: 279.0,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md border-l-0 shadow-2xl">
						<SheetHeader className="border-b border-foreground/10 pb-6">
							<SheetTitle className="text-sm uppercase tracking-[0.3em] font-light">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-foreground/10">
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
