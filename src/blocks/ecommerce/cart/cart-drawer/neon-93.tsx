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
import { Minus, Plus, ShoppingBag, Zap, X } from 'lucide-react';
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
		className="relative size-11 rounded-xl border-2 border-cyan-500/50 bg-black/80 backdrop-blur-sm hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)]"
	>
		<ShoppingBag className="size-4 text-cyan-400" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-lg bg-cyan-500 p-0 text-[10px] shadow-[0_0_10px_rgba(6,182,212,0.5)]">
				{count}
			</Badge>
		)}
	</Button>
);

const NeonItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 ring-1 ring-cyan-500/30">
			<Image
				src={item.image}
				alt={item.name}
				fill
				className="object-cover mix-blend-luminosity"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium text-cyan-100">{item.name}</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-6 text-cyan-400/50 hover:text-cyan-400"
				>
					<X className="size-4" />
				</Button>
			</div>
			<span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-3">
				<div className="flex items-center gap-1 bg-cyan-500/10 rounded-lg p-0.5 ring-1 ring-cyan-500/30">
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-lg text-cyan-400 hover:bg-cyan-500/20"
					>
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm text-cyan-100">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-7 rounded-lg text-cyan-400 hover:bg-cyan-500/20"
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
	<div className="space-y-4 border-t border-cyan-500/20 pt-6">
		<div className="flex justify-between text-lg">
			<span className="text-cyan-200/70">Total</span>
			<span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
				${total.toFixed(2)}
			</span>
		</div>
		<Button
			className="w-full h-12 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold shadow-[0_0_30px_rgba(6,182,212,0.4)] hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all"
			size="lg"
		>
			<Zap className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Checkout Now',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Neon Runner X',
				price: 189.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Cyber Boost Pro',
				price: 229.99,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md bg-gradient-to-b from-slate-950 to-slate-900 border-l-cyan-500/30">
						<SheetHeader className="pb-4">
							<SheetTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-cyan-500/10">
								{cartData.items.map((item) => (
									<NeonItemRow key={item.id} item={item} />
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
