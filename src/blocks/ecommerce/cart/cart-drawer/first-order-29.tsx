'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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

interface FirstOrderOffer {
	discountPercent: number;
	message: string;
	welcomeTitle: string;
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
	firstOrderOffer: FirstOrderOffer;
}

const WelcomeTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
		<Sparkles className="absolute -bottom-1 -right-1 size-3 text-purple-500" />
	</Button>
);

const WelcomeBanner = ({ offer }: { offer: FirstOrderOffer }) => (
	<Card className="border-purple-200 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-indigo-500/10 p-4 dark:border-purple-800">
		<div className="flex items-start gap-3">
			<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500">
				<PartyPopper className="size-5 text-white" />
			</div>
			<div className="flex-1">
				<h3 className="font-bold text-purple-700 dark:text-purple-300">
					{offer.welcomeTitle}
				</h3>
				<p className="mt-1 text-sm text-muted-foreground">{offer.message}</p>
				<Badge className="mt-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
					<Gift className="mr-1 size-3" />
					{offer.discountPercent}% OFF First Order
				</Badge>
			</div>
		</div>
	</Card>
);

const SimpleCartItem = ({ item }: { item: CartItem }) => (
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

const FirstOrderSummary = ({
	subtotal,
	discountPercent,
	checkoutLabel,
}: {
	subtotal: number;
	discountPercent: number;
	checkoutLabel: string;
}) => {
	const discount = subtotal * (discountPercent / 100);
	const total = subtotal - discount;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<div className="flex justify-between text-sm">
				<span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
					<Gift className="size-3" />
					First Order Discount ({discountPercent}%)
				</span>
				<span className="text-purple-600 dark:text-purple-400">
					-${discount.toFixed(2)}
				</span>
			</div>
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button
				className="w-full gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
				size="lg"
			>
				<Sparkles className="size-4" />
				{checkoutLabel}
			</Button>
			<p className="text-center text-xs text-muted-foreground">
				🎉 Your first order discount is automatically applied!
			</p>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Complete First Order',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 149.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Casual Sneakers',
				price: 89.99,
				quantity: 1,
			},
		],
		firstOrderOffer: {
			discountPercent: 15,
			welcomeTitle: 'Welcome to Our Store!',
			message:
				'Enjoy an exclusive discount on your first order. This offer is automatically applied at checkout.',
		},
	};

	const subtotal = cartData.items.reduce(
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
						<WelcomeTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<WelcomeBanner offer={cartData.firstOrderOffer} />
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<SimpleCartItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<FirstOrderSummary
							subtotal={subtotal}
							discountPercent={cartData.firstOrderOffer.discountPercent}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
