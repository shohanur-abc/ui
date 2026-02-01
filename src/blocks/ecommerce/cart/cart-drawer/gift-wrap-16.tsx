'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Gift, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	isGift: boolean;
}

interface CartDrawerProps {
	title: string;
	giftWrapLabel: string;
	giftWrapPrice: number;
	checkoutLabel: string;
	items: CartItem[];
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

const GiftToggle = ({
	isGift,
	label,
	price,
}: {
	isGift: boolean;
	label: string;
	price: number;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-primary/5 px-3 py-2">
		<div className="flex items-center gap-2">
			<Gift className="size-4 text-primary" />
			<span className="text-sm">{label}</span>
			<Badge variant="secondary" className="text-xs">
				+${price.toFixed(2)}
			</Badge>
		</div>
		<Switch checked={isGift} />
	</div>
);

const ItemWithGift = ({ item }: { item: CartItem }) => (
	<div className="space-y-2 py-4">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{item.isGift && (
					<div className="absolute inset-0 flex items-center justify-center bg-primary/20">
						<Gift className="size-4 text-primary" />
					</div>
				)}
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between">
					<div>
						<h4 className="truncate text-sm font-medium">{item.name}</h4>
						<p className="text-xs text-muted-foreground">{item.variant}</p>
					</div>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<X className="size-3" />
					</Button>
				</div>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-1 rounded border border-border">
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Minus className="size-3" />
						</Button>
						<span className="w-6 text-center text-xs">{item.quantity}</span>
						<Button size="icon-sm" variant="ghost" className="size-6">
							<Plus className="size-3" />
						</Button>
					</div>
					<span className="text-sm font-bold">
						${(item.price * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
		<div className="ml-19 flex items-center gap-2 text-xs">
			<Switch checked={item.isGift} className="scale-75" />
			<span className="text-muted-foreground">Gift wrap this item</span>
		</div>
	</div>
);

const OrderSummary = ({
	items,
	giftWrapPrice,
	checkoutLabel,
}: {
	items: CartItem[];
	giftWrapPrice: number;
	checkoutLabel: string;
}) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const giftTotal = items.filter((item) => item.isGift).length * giftWrapPrice;
	const total = subtotal + giftTotal;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			{giftTotal > 0 && (
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Gift Wrap</span>
					<span>${giftTotal.toFixed(2)}</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Gift className="size-4" />
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		giftWrapLabel: 'Add Gift Wrap to All Items',
		giftWrapPrice: 5.99,
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop',
				name: 'Designer Sneakers',
				variant: 'White / US 10',
				price: 189.0,
				quantity: 1,
				isGift: true,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
				name: 'Leather Belt',
				variant: 'Black / M',
				price: 75.0,
				quantity: 1,
				isGift: false,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Card Holder',
				variant: 'Brown',
				price: 45.0,
				quantity: 2,
				isGift: true,
			},
		],
	};

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
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemWithGift key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<OrderSummary
							items={cartData.items}
							giftWrapPrice={cartData.giftWrapPrice}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
