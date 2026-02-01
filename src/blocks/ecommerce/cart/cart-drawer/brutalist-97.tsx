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
		className="relative size-12 border-4 border-foreground bg-transparent hover:bg-foreground hover:text-background transition-all"
	>
		<ShoppingBag className="size-5" strokeWidth={2.5} />
		{count > 0 && (
			<Badge className="absolute -right-3 -top-3 size-6 rounded-none bg-foreground p-0 text-xs font-black border-2 border-background">
				{count}
			</Badge>
		)}
	</Button>
);

const BrutalistItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-5 border-b-4 border-foreground">
		<div className="relative size-24 shrink-0 border-4 border-foreground overflow-hidden">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-black text-lg uppercase tracking-tight">
					{item.name}
				</h4>
				<Button
					size="icon"
					variant="ghost"
					className="size-8 border-2 border-foreground hover:bg-destructive hover:text-destructive-foreground hover:border-destructive"
				>
					<X className="size-4" strokeWidth={3} />
				</Button>
			</div>
			<span className="text-2xl font-black mt-1">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<div className="mt-auto flex items-center gap-2">
				<div className="flex items-center border-4 border-foreground">
					<Button
						size="icon"
						variant="ghost"
						className="size-10 rounded-none border-r-4 border-foreground hover:bg-foreground hover:text-background"
					>
						<Minus className="size-4" strokeWidth={3} />
					</Button>
					<span className="w-12 text-center text-lg font-black">
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="ghost"
						className="size-10 rounded-none border-l-4 border-foreground hover:bg-foreground hover:text-background"
					>
						<Plus className="size-4" strokeWidth={3} />
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
			<span className="text-xl font-black uppercase">Total</span>
			<span className="text-3xl font-black">${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full h-14 rounded-none bg-foreground text-background font-black text-lg uppercase tracking-wide border-4 border-foreground hover:bg-background hover:text-foreground transition-all"
			size="lg"
		>
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'CART',
		checkoutLabel: 'BUY NOW',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'RUNNER X1',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'BOOST PRO',
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
					<SheetContent className="flex w-full flex-col sm:max-w-md border-l-8 border-foreground rounded-none">
						<SheetHeader className="pb-4 border-b-4 border-foreground">
							<SheetTitle className="text-3xl font-black uppercase tracking-tight">
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div>
								{cartData.items.map((item) => (
									<BrutalistItemRow key={item.id} item={item} />
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
