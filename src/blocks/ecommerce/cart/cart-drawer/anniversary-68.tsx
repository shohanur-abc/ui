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
import { Heart, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface AnniversaryReward {
	years: number;
	discount: number;
	specialMessage: string;
	expiresIn: string;
}

interface CartDrawerProps {
	title: string;
	anniversaryLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	anniversary: AnniversaryReward;
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const AnniversaryBanner = ({
	label,
	anniversary,
}: {
	label: string;
	anniversary: AnniversaryReward;
}) => (
	<div className="rounded-xl bg-gradient-to-br from-rose-500/20 via-red-500/20 to-rose-500/20 border border-rose-300 p-4 space-y-3 relative overflow-hidden">
		<div className="absolute right-2 top-2 flex gap-1">
			{Array.from({ length: 3 }).map((_, i) => (
				<Heart
					key={i}
					className="size-4 text-rose-400 fill-rose-400 animate-pulse"
					style={{ animationDelay: `${i * 0.2}s` }}
				/>
			))}
		</div>
		<div className="flex items-center gap-3">
			<div className="rounded-full bg-rose-500/30 p-3">
				<div className="text-2xl font-bold text-rose-600">
					{anniversary.years}
				</div>
			</div>
			<div>
				<span className="font-bold text-rose-600">{label}</span>
				<p className="text-xs text-muted-foreground">
					{anniversary.years} year{anniversary.years > 1 ? 's' : ''} with us!
				</p>
			</div>
		</div>
		<p className="text-sm text-rose-700 dark:text-rose-300 italic">
			"{anniversary.specialMessage}"
		</p>
		<div className="flex items-center justify-between">
			<Badge className="bg-rose-500 text-lg px-3 py-1">
				{anniversary.discount}% OFF
			</Badge>
			<span className="text-xs text-muted-foreground">
				Expires in {anniversary.expiresIn}
			</span>
		</div>
	</div>
);

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const Summary = ({
	subtotal,
	discount,
	total,
	checkoutLabel,
}: {
	subtotal: number;
	discount: number;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between text-rose-600">
				<span className="flex items-center gap-1">
					<Heart className="size-3 fill-current" />
					Anniversary Discount
				</span>
				<span>-${discount.toFixed(2)}</span>
			</div>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full bg-rose-500 hover:bg-rose-600" size="lg">
			<Sparkles className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		anniversaryLabel: 'Happy Anniversary!',
		checkoutLabel: 'Celebrate & Checkout',
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
		anniversary: {
			years: 3,
			discount: 30,
			specialMessage:
				"Thank you for 3 amazing years! Here's a special gift just for you.",
			expiresIn: '7 days',
		},
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const discount = subtotal * (cartData.anniversary.discount / 100);
	const total = subtotal - discount;
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
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<AnniversaryBanner
							label={cartData.anniversaryLabel}
							anniversary={cartData.anniversary}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							discount={discount}
							total={total}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
