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
		className="relative size-12 rounded-3xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 border-none hover:opacity-90 shadow-lg"
	>
		<ShoppingBag className="size-5 text-white" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-full bg-white text-violet-600 p-0 text-xs font-bold">
				{count}
			</Badge>
		)}
	</Button>
);

const GradientItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-violet-100 to-pink-100 dark:from-violet-900/50 dark:to-pink-900/50 p-0.5">
			<div className="size-full rounded-2xl overflow-hidden bg-background">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium">{item.name}</h4>
				<Button size="icon" variant="ghost" className="size-6">
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-bold mt-1 bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 rounded-full bg-gradient-to-r from-violet-100 to-pink-100 dark:from-violet-900/30 dark:to-pink-900/30 p-1">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:bg-white/50"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:bg-white/50"
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
	<div className="space-y-4 border-t border-violet-200/50 dark:border-violet-800/50 pt-6">
		<div className="flex justify-between text-lg">
			<span className="text-muted-foreground">Total</span>
			<span className="font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
				${total.toFixed(2)}
			</span>
		</div>
		<Button
			className="w-full h-12 rounded-2xl bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold shadow-lg"
			size="lg"
		>
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-br from-violet-50 via-background to-pink-50 dark:from-violet-950/30 dark:via-background dark:to-pink-950/30">
						<SheetHeader className="pb-4">
							<SheetTitle className="text-xl font-bold bg-gradient-to-r from-violet-600 to-pink-600 bg-clip-text text-transparent">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-violet-200/30 dark:divide-violet-800/30">
								{cartData.items.map((item) => (
									<GradientItemRow key={item.id} item={item} />
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
