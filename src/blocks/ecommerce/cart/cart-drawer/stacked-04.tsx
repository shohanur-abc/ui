'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	Heart,
	Minus,
	Package,
	Plus,
	ShoppingCart,
	Trash2,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	brand: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	inStock: boolean;
}

interface CartDrawerProps {
	triggerLabel: string;
	headerTitle: string;
	freeShippingThreshold: number;
	freeShippingMessage: string;
	checkoutLabel: string;
	items: CartItem[];
}

const CartBadgeTrigger = ({
	label,
	count,
}: {
	label: string;
	count: number;
}) => (
	<Button variant="secondary" size="lg" className="gap-2">
		<ShoppingCart className="size-5" />
		{label}
		{count > 0 && (
			<Badge variant="default" className="ml-1">
				{count}
			</Badge>
		)}
	</Button>
);

const ShippingProgress = ({
	current,
	threshold,
	message,
}: {
	current: number;
	threshold: number;
	message: string;
}) => {
	const progress = Math.min((current / threshold) * 100, 100);
	const remaining = threshold - current;

	return (
		<div className="space-y-2 rounded-lg bg-muted/50 p-3">
			{remaining > 0 ? (
				<p className="text-xs text-muted-foreground">
					Add{' '}
					<span className="font-semibold text-primary">
						${remaining.toFixed(2)}
					</span>{' '}
					more for free shipping
				</p>
			) : (
				<p className="text-xs font-medium text-primary">{message}</p>
			)}
			<div className="h-1.5 overflow-hidden rounded-full bg-muted">
				<div
					className="h-full bg-primary transition-all duration-500"
					style={{ width: `${progress}%` }}
				/>
			</div>
		</div>
	);
};

const ProductCard = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden p-0">
		<div className="flex">
			<div className="relative aspect-square w-28 shrink-0 bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{item.originalPrice && (
					<Badge className="absolute left-2 top-2 bg-destructive text-xs">
						Sale
					</Badge>
				)}
			</div>
			<div className="flex flex-1 flex-col p-3">
				<div className="flex-1 space-y-1">
					<p className="text-xs text-muted-foreground">{item.brand}</p>
					<h4 className="font-medium leading-tight text-foreground">
						{item.name}
					</h4>
					<div className="flex items-center gap-2">
						<span className="text-sm font-bold text-primary">
							${item.price.toFixed(2)}
						</span>
						{item.originalPrice && (
							<span className="text-xs text-muted-foreground line-through">
								${item.originalPrice.toFixed(2)}
							</span>
						)}
					</div>
				</div>
				<div className="mt-2 flex items-center justify-between">
					<div className="flex items-center gap-1">
						<Button size="icon-sm" variant="outline" className="size-7">
							<Minus className="size-3" />
						</Button>
						<span className="w-8 text-center text-sm font-medium">
							{item.quantity}
						</span>
						<Button size="icon-sm" variant="outline" className="size-7">
							<Plus className="size-3" />
						</Button>
					</div>
					<div className="flex gap-1">
						<Button size="icon-sm" variant="ghost" className="size-7">
							<Heart className="size-3.5" />
						</Button>
						<Button
							size="icon-sm"
							variant="ghost"
							className="size-7 text-destructive hover:bg-destructive/10"
						>
							<Trash2 className="size-3.5" />
						</Button>
					</div>
				</div>
			</div>
		</div>
		{!item.inStock && (
			<div className="border-t border-border bg-destructive/5 px-3 py-2">
				<p className="text-xs text-destructive">Only a few left in stock</p>
			</div>
		)}
	</Card>
);

const OrderTotal = ({
	items,
	checkoutLabel,
}: {
	items: CartItem[];
	checkoutLabel: string;
}) => {
	const subtotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const savings = items.reduce((sum, item) => {
		if (item.originalPrice) {
			return sum + (item.originalPrice - item.price) * item.quantity;
		}
		return sum;
	}, 0);

	return (
		<div className="space-y-4 border-t border-border bg-card/50 p-4">
			{savings > 0 && (
				<div className="flex justify-between text-sm text-primary">
					<span>You save</span>
					<span className="font-medium">-${savings.toFixed(2)}</span>
				</div>
			)}
			<div className="flex justify-between text-lg font-bold">
				<span>Total</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			<Button className="w-full gap-2" size="lg">
				<Package className="size-4" />
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		triggerLabel: 'My Cart',
		headerTitle: 'Shopping Cart',
		freeShippingThreshold: 100,
		freeShippingMessage: '🎉 You qualify for free shipping!',
		checkoutLabel: 'Proceed to Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Air Max 270 React',
				brand: 'Nike',
				price: 149.99,
				originalPrice: 189.99,
				quantity: 1,
				inStock: true,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop',
				name: 'Ultraboost 22',
				brand: 'Adidas',
				price: 179.99,
				quantity: 1,
				inStock: false,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				brand: 'Reebok',
				price: 89.99,
				quantity: 2,
				inStock: true,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartBadgeTrigger
							label={cartData.triggerLabel}
							count={cartData.items.length}
						/>
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col p-0 sm:max-w-md">
						<SheetHeader className="border-b border-border p-4">
							<SheetTitle>{cartData.headerTitle}</SheetTitle>
						</SheetHeader>
						<div className="px-4 pt-4">
							<ShippingProgress
								current={subtotal}
								threshold={cartData.freeShippingThreshold}
								message={cartData.freeShippingMessage}
							/>
						</div>
						<ScrollArea className="flex-1 px-4">
							<div className="space-y-3 py-4">
								{cartData.items.map((item) => (
									<ProductCard key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<OrderTotal
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
