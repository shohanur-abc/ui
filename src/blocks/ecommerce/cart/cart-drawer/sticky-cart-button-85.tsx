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
import { CreditCard, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react';
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
	freeShippingThreshold: number;
}

const CartTrigger = ({ count }: { count: number }) => (
	<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
		<Button size="lg" className="h-14 px-6 rounded-full shadow-lg gap-3">
			<ShoppingBag className="size-5" />
			<span className="text-lg font-semibold">View Cart</span>
			{count > 0 && (
				<Badge variant="secondary" className="size-6 rounded-full p-0 text-sm">
					{count}
				</Badge>
			)}
		</Button>
	</div>
);

const ShippingProgress = ({
	current,
	threshold,
}: {
	current: number;
	threshold: number;
}) => {
	const progress = Math.min((current / threshold) * 100, 100);
	const remaining = Math.max(threshold - current, 0);

	return (
		<div className="rounded-2xl bg-muted p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Truck className="size-5 text-muted-foreground" />
					<span className="font-medium">Free Shipping</span>
				</div>
				{remaining > 0 ? (
					<span className="text-sm">${remaining.toFixed(2)} away</span>
				) : (
					<Badge className="bg-green-500">Unlocked!</Badge>
				)}
			</div>
			<div className="h-2 bg-background rounded-full overflow-hidden">
				<div
					className="h-full bg-primary rounded-full transition-all duration-500"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-semibold leading-tight">{item.name}</h4>
				<Button size="icon" variant="ghost" className="size-8">
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 bg-muted rounded-full p-0.5">
					<Button size="icon" variant="ghost" className="size-8 rounded-full">
						<Minus className="size-4" />
					</Button>
					<span className="w-6 text-center font-medium">{item.quantity}</span>
					<Button size="icon" variant="ghost" className="size-8 rounded-full">
						<Plus className="size-4" />
					</Button>
				</div>
				<span className="text-lg font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
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
	<div className="space-y-4 border-t border-border pt-4 pb-safe">
		<div className="flex justify-between text-xl">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full h-14 text-lg font-semibold rounded-2xl gap-2"
			size="lg"
		>
			<CreditCard className="size-5" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		checkoutLabel: 'Pay Now',
		freeShippingThreshold: 100,
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 59.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 29.99,
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
					<SheetContent
						side="bottom"
						className="flex h-[85dvh] flex-col rounded-t-3xl"
					>
						<div className="mx-auto mb-2 h-1.5 w-12 rounded-full bg-muted" />
						<SheetHeader>
							<SheetTitle className="text-xl">{cartData.title}</SheetTitle>
						</SheetHeader>
						<ShippingProgress
							current={total}
							threshold={cartData.freeShippingThreshold}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
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
