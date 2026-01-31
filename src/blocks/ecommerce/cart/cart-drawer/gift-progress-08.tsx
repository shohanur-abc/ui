'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Gift, Minus, Plus, ShoppingCart, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface FreeGift {
	name: string;
	image: string;
	minSpend: number;
}

interface CartDrawerProps {
	title: string;
	giftProgressLabel: string;
	freeGift: FreeGift;
	checkoutLabel: string;
	items: CartItem[];
}

const AnimatedTrigger = ({ count }: { count: number }) => (
	<Button
		variant="outline"
		size="icon"
		className="relative overflow-hidden transition-all hover:border-primary hover:shadow-md hover:shadow-primary/20"
	>
		<ShoppingCart className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-1.5 -top-1.5 size-5 animate-pulse rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const GiftProgress = ({
	current,
	gift,
	label,
}: {
	current: number;
	gift: FreeGift;
	label: string;
}) => {
	const progress = Math.min((current / gift.minSpend) * 100, 100);
	const remaining = gift.minSpend - current;
	const unlocked = remaining <= 0;

	return (
		<div className="space-y-3 rounded-xl border border-dashed border-primary/50 bg-primary/5 p-4">
			<div className="flex items-center gap-3">
				<div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
					<Image
						src={gift.image}
						alt={gift.name}
						fill
						className={`object-cover ${!unlocked && 'opacity-50 grayscale'}`}
					/>
					{unlocked && (
						<div className="absolute inset-0 flex items-center justify-center bg-primary/20">
							<Sparkles className="size-5 text-primary" />
						</div>
					)}
				</div>
				<div className="flex-1 space-y-1">
					{unlocked ? (
						<p className="text-sm font-medium text-primary">
							🎉 Free {gift.name} unlocked!
						</p>
					) : (
						<p className="text-sm text-muted-foreground">
							{label}{' '}
							<span className="font-semibold text-foreground">
								${remaining.toFixed(2)}
							</span>{' '}
							more for a free {gift.name}
						</p>
					)}
					<Progress value={progress} className="h-2" />
				</div>
			</div>
		</div>
	);
};

const CartProduct = ({ item }: { item: CartItem }) => (
	<div className="group flex gap-3 py-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted ring-1 ring-border transition-all group-hover:ring-primary/50">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<div className="min-w-0">
					<h4 className="truncate font-medium">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 opacity-0 transition-opacity group-hover:opacity-100"
				>
					<X className="size-3" />
				</Button>
			</div>
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center rounded-full border border-border bg-muted/50">
					<Button size="icon-sm" variant="ghost" className="size-7 rounded-full">
						<Minus className="size-3" />
					</Button>
					<span className="w-8 text-center text-sm font-medium">
						{item.quantity}
					</span>
					<Button size="icon-sm" variant="ghost" className="size-7 rounded-full">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
			</div>
		</div>
	</div>
);

const CartSummary = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<div className="space-y-4 pt-4">
			<Separator />
			<div className="flex items-center justify-between text-lg">
				<span className="font-medium">Subtotal</span>
				<span className="font-bold">${subtotal.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Gift className="size-4" />
				{checkoutLabel}
			</Button>
			<p className="text-center text-xs text-muted-foreground">
				Taxes and shipping calculated at checkout
			</p>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		giftProgressLabel: 'Spend',
		freeGift: {
			name: 'Travel Pouch',
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			minSpend: 150,
		},
		checkoutLabel: 'Checkout with Gift',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1609003841768-c7022adc8b2f?w=200&h=200&fit=crop',
				name: 'Vitamin C Serum',
				variant: '30ml',
				price: 45.00,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=200&h=200&fit=crop',
				name: 'Retinol Night Cream',
				variant: '50ml',
				price: 68.00,
				quantity: 1,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
				name: 'SPF 50 Sunscreen',
				variant: '60ml',
				price: 32.00,
				quantity: 1,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<AnimatedTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle className="flex items-center gap-2">
								{cartData.title}
								<Badge variant="outline">{itemCount} items</Badge>
							</SheetTitle>
						</SheetHeader>
						<GiftProgress
							current={subtotal}
							gift={cartData.freeGift}
							label={cartData.giftProgressLabel}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<CartProduct key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<CartSummary
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
