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
import { Crown, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	designer: string;
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
		className="relative size-11 rounded-full border-2 border-amber-500/50 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 hover:border-amber-500"
	>
		<ShoppingBag className="size-4 text-amber-700 dark:text-amber-400" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full bg-amber-500 p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const LuxuryItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-6">
		<div className="relative w-24 h-32 shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950/50 dark:to-amber-900/50">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="text-xs text-amber-600 dark:text-amber-400 font-medium tracking-wide">
						{item.designer}
					</p>
					<h4 className="font-serif text-lg">{item.name}</h4>
				</div>
				<Button size="icon" variant="ghost" className="size-6">
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-xl font-light mt-1 text-amber-900 dark:text-amber-100">
				${item.price.toLocaleString()}
			</span>
			<div className="mt-auto flex items-center gap-4">
				<div className="flex items-center gap-3 text-sm">
					<Button
						size="icon"
						variant="outline"
						className="size-7 rounded-full border-amber-300"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-4 text-center">{item.quantity}</span>
					<Button
						size="icon"
						variant="outline"
						className="size-7 rounded-full border-amber-300"
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
	<div className="space-y-4 border-t border-amber-200 dark:border-amber-800 pt-6">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Subtotal</span>
			<span className="font-serif text-2xl">${total.toLocaleString()}</span>
		</div>
		<div className="flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400">
			<Crown className="size-4" />
			<span>Complimentary gift wrapping included</span>
		</div>
		<Button
			className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium"
			size="lg"
		>
			<Sparkles className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Selection',
		checkoutLabel: 'Secure Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Artisan Runner',
				designer: 'MAISON ÉLITE',
				price: 1299,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Heritage Boost',
				designer: 'ATELIER LUXE',
				price: 1499,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-b from-background to-amber-50/50 dark:to-amber-950/20">
						<SheetHeader className="pb-4">
							<SheetTitle className="font-serif text-2xl tracking-wide">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-amber-200/50 dark:divide-amber-800/50">
								{cartData.items.map((item) => (
									<LuxuryItemRow key={item.id} item={item} />
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
