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
import { Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
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
		className="relative size-12 rounded-2xl bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-none shadow-lg hover:shadow-xl transition-shadow"
	>
		<ShoppingBag className="size-5 text-slate-600 dark:text-slate-300" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-xl bg-slate-900 dark:bg-white dark:text-slate-900 p-0 text-xs shadow-lg">
				{count}
			</Badge>
		)}
	</Button>
);

const GlassItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5 group">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-white/80 dark:bg-white/10 shadow-lg">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium">{item.name}</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-7 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-semibold mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 bg-white/80 dark:bg-white/10 rounded-xl p-1 shadow-sm backdrop-blur-sm">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-lg hover:bg-white/50"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-lg hover:bg-white/50"
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
	<div className="space-y-4 border-t border-white/20 pt-6">
		<div className="flex justify-between text-lg">
			<span className="text-muted-foreground">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full h-12 rounded-2xl bg-slate-900 dark:bg-white dark:text-slate-900 font-semibold shadow-lg hover:shadow-xl transition-all"
			size="lg"
		>
			<Sparkles className="mr-2 size-4" />
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-br from-slate-100/95 to-white/95 dark:from-slate-900/95 dark:to-slate-800/95 backdrop-blur-xl border-l-white/20">
						<SheetHeader className="pb-4">
							<SheetTitle className="text-xl font-semibold">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-slate-200/50 dark:divide-slate-700/50">
								{cartData.items.map((item) => (
									<GlassItemRow key={item.id} item={item} />
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
