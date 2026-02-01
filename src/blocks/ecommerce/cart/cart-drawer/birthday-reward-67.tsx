'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Cake,
	Gift,
	Minus,
	PartyPopper,
	Plus,
	ShoppingBag,
	Sparkles,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface BirthdayReward {
	discount: number;
	expiresIn: string;
	freeGift?: {
		name: string;
		image: string;
	};
}

interface CartDrawerProps {
	title: string;
	birthdayLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	birthdayReward: BirthdayReward;
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

const BirthdayBanner = ({
	label,
	reward,
}: {
	label: string;
	reward: BirthdayReward;
}) => (
	<div className="rounded-xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-pink-500/20 border-2 border-dashed border-pink-400 p-4 space-y-3 relative overflow-hidden">
		<div className="absolute -right-4 -top-4 opacity-20">
			<Cake className="size-24 text-pink-500" />
		</div>
		<div className="relative">
			<div className="flex items-center gap-2">
				<div className="rounded-full bg-pink-500/20 p-2">
					<PartyPopper className="size-5 text-pink-600" />
				</div>
				<div>
					<span className="font-bold text-pink-600">{label}</span>
					<p className="text-xs text-muted-foreground">
						Expires in {reward.expiresIn}
					</p>
				</div>
			</div>
			<div className="mt-3 flex items-center gap-3">
				<Badge className="bg-pink-500 text-lg px-3 py-1">
					{reward.discount}% OFF
				</Badge>
				{reward.freeGift && (
					<div className="flex items-center gap-2">
						<Gift className="size-4 text-pink-500" />
						<span className="text-sm">+ Free {reward.freeGift.name}</span>
					</div>
				)}
			</div>
		</div>
	</div>
);

const FreeGiftItem = ({ gift }: { gift: { name: string; image: string } }) => (
	<div className="flex gap-3 py-3 bg-pink-50/50 dark:bg-pink-950/20 -mx-6 px-6">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={gift.image} alt={gift.name} fill className="object-cover" />
			<Badge className="absolute -right-1 -top-1 size-5 p-0 rounded-full bg-pink-500">
				<Gift className="size-3" />
			</Badge>
		</div>
		<div className="flex flex-1 flex-col justify-center">
			<div className="flex items-center gap-2">
				<h4 className="text-sm font-medium">{gift.name}</h4>
				<Badge
					variant="outline"
					className="text-[10px] border-pink-500 text-pink-600"
				>
					Birthday Gift
				</Badge>
			</div>
			<span className="text-sm text-pink-600 font-medium">FREE</span>
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
			<div className="flex justify-between text-pink-600">
				<span className="flex items-center gap-1">
					<Cake className="size-3" />
					Birthday Discount
				</span>
				<span>-${discount.toFixed(2)}</span>
			</div>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full bg-pink-500 hover:bg-pink-600" size="lg">
			<Sparkles className="mr-2 size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		birthdayLabel: 'Happy Birthday! 🎂',
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
		birthdayReward: {
			discount: 25,
			expiresIn: '5 days',
			freeGift: {
				name: 'Premium Socks',
				image:
					'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
			},
		},
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const discount = subtotal * (cartData.birthdayReward.discount / 100);
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
						<BirthdayBanner
							label={cartData.birthdayLabel}
							reward={cartData.birthdayReward}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							{cartData.birthdayReward.freeGift && (
								<FreeGiftItem gift={cartData.birthdayReward.freeGift} />
							)}
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
