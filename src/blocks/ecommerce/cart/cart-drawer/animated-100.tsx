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
import { Minus, Plus, Rocket, ShoppingBag, X } from 'lucide-react';
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
		className="relative size-12 rounded-xl animate-pulse hover:animate-none bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 border-none hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
	>
		<ShoppingBag className="size-5 text-white animate-bounce" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-6 rounded-full bg-white text-purple-600 p-0 text-xs font-bold shadow-md animate-ping-slow">
				{count}
			</Badge>
		)}
	</Button>
);

const AnimatedItemRow = ({
	item,
	index,
}: {
	item: CartItem;
	index: number;
}) => (
	<div
		className="flex gap-4 py-5 animate-in slide-in-from-right-5 fade-in duration-300"
		style={{ animationDelay: `${index * 100}ms` }}
	>
		<div className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 group">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover group-hover:scale-110 transition-transform duration-500"
			/>
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium hover:text-purple-600 transition-colors cursor-pointer">
					{item.name}
				</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-7 rounded-full hover:rotate-90 hover:bg-red-100 hover:text-red-500 transition-all duration-300"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-bold mt-1 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full p-1">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:scale-110 hover:bg-indigo-100 transition-all duration-200"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm font-bold">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:scale-110 hover:bg-purple-100 transition-all duration-200"
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
	<div className="space-y-4 border-t border-purple-200/50 pt-6 animate-in slide-in-from-bottom-5 fade-in duration-500">
		<div className="flex justify-between text-lg">
			<span className="text-muted-foreground">Total</span>
			<span className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent animate-pulse">
				${total.toFixed(2)}
			</span>
		</div>
		<Button
			className="w-full h-14 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
			size="lg"
		>
			<Rocket className="mr-2 size-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
				name: 'Speed Runner',
				price: 149.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Turbo Boost',
				price: 189.99,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-br from-indigo-50/90 via-purple-50/90 to-pink-50/90 dark:from-indigo-950/90 dark:via-purple-950/90 dark:to-pink-950/90 backdrop-blur-xl border-l-2 border-purple-200/50 animate-in slide-in-from-right duration-500">
						<SheetHeader className="pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
							<SheetTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-purple-100/50 dark:divide-purple-800/30">
								{cartData.items.map((item, index) => (
									<AnimatedItemRow key={item.id} item={item} index={index} />
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
