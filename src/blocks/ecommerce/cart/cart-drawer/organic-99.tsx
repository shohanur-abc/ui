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
import { Leaf, Minus, Plus, ShoppingBag, X } from 'lucide-react';
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
		className="relative size-14 rounded-[40%_60%_55%_45%/60%_40%_60%_40%] bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/50 dark:to-emerald-900/50 border-2 border-green-300 hover:border-green-400 shadow-lg"
	>
		<ShoppingBag className="size-5 text-green-700 dark:text-green-400" />
		{count > 0 && (
			<Badge className="absolute -right-1 -top-1 size-6 rounded-full bg-green-600 p-0 text-xs shadow-md">
				{count}
			</Badge>
		)}
	</Button>
);

const OrganicItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5">
		<div className="relative size-20 shrink-0 rounded-[30%_70%_70%_30%/60%_40%_60%_40%] overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium text-green-900 dark:text-green-100">
					{item.name}
				</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-7 rounded-full text-green-600 hover:bg-green-100 dark:hover:bg-green-900/50"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-semibold text-green-800 dark:text-green-200 mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 bg-green-50 dark:bg-green-900/30 rounded-full p-1 border border-green-200">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50"
					>
						<Minus className="size-3 text-green-700" />
					</Button>
					<span className="w-6 text-center text-sm font-medium text-green-800 dark:text-green-200">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-full hover:bg-green-100 dark:hover:bg-green-800/50"
					>
						<Plus className="size-3 text-green-700" />
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
	<div className="space-y-4 border-t border-green-200 pt-6">
		<div className="flex justify-between text-lg">
			<span className="text-green-700 dark:text-green-300">Total</span>
			<span className="font-bold text-green-900 dark:text-green-100">
				${total.toFixed(2)}
			</span>
		</div>
		<Button
			className="w-full h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-medium shadow-lg"
			size="lg"
		>
			<Leaf className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Basket',
		checkoutLabel: 'Continue',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Eco Runner',
				price: 139.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Natural Step',
				price: 119.99,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-b from-green-50/80 to-emerald-50/80 dark:from-green-950/50 dark:to-emerald-950/50 backdrop-blur-sm border-l border-green-200">
						<SheetHeader className="pb-4">
							<SheetTitle className="text-xl font-semibold text-green-900 dark:text-green-100 flex items-center gap-2">
								<Leaf className="size-5 text-green-600" />
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-green-100 dark:divide-green-800/50">
								{cartData.items.map((item) => (
									<OrganicItemRow key={item.id} item={item} />
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
