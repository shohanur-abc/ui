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
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface CartDrawerProps {
	triggerLabel: string;
	title: string;
	emptyMessage: string;
	checkoutLabel: string;
	subtotalLabel: string;
	items: CartItem[];
}

const CartTrigger = ({ label, count }: { label: string; count: number }) => (
	<Button variant="outline" className="relative gap-2">
		<ShoppingBag className="size-4" />
		{label}
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-xs">
				{count}
			</Badge>
		)}
	</Button>
);

const CartItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const CartItemInfo = ({
	name,
	variant,
	price,
}: {
	name: string;
	variant: string;
	price: number;
}) => (
	<div className="min-w-0 flex-1 space-y-1">
		<h4 className="truncate text-sm font-medium text-foreground">{name}</h4>
		<p className="text-xs text-muted-foreground">{variant}</p>
		<p className="text-sm font-semibold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-md border border-border">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-xs font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RemoveItemButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="size-6 text-muted-foreground hover:text-destructive"
	>
		<X className="size-3" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-4">
		<CartItemImage src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<CartItemInfo
					name={item.name}
					variant={item.variant}
					price={item.price}
				/>
				<RemoveItemButton />
			</div>
			<QuantitySelector quantity={item.quantity} />
		</div>
	</div>
);

const EmptyCart = ({ message }: { message: string }) => (
	<div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
		<div className="rounded-full bg-muted p-4">
			<ShoppingBag className="size-8 text-muted-foreground" />
		</div>
		<p className="text-sm text-muted-foreground">{message}</p>
	</div>
);

const CartSummary = ({
	subtotalLabel,
	total,
	checkoutLabel,
}: {
	subtotalLabel: string;
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">{subtotalLabel}</span>
			<span className="text-lg font-bold text-foreground">
				${total.toFixed(2)}
			</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		triggerLabel: 'Cart',
		title: 'Shopping Cart',
		emptyMessage: 'Your cart is empty',
		checkoutLabel: 'Proceed to Checkout',
		subtotalLabel: 'Subtotal',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Air Max Premium',
				variant: 'Size 10 / Red',
				price: 189.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Classic Watch',
				variant: 'Gold / Leather',
				price: 249.99,
				quantity: 2,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				variant: 'White',
				price: 129.99,
				quantity: 1,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<CartTrigger
							label={cartData.triggerLabel}
							count={cartData.items.length}
						/>
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader className="border-b border-border pb-4">
							<SheetTitle className="flex items-center gap-2">
								<ShoppingBag className="size-5" />
								{cartData.title}
								<Badge variant="secondary">{cartData.items.length}</Badge>
							</SheetTitle>
						</SheetHeader>
						{cartData.items.length === 0 ? (
							<EmptyCart message={cartData.emptyMessage} />
						) : (
							<>
								<ScrollArea className="flex-1 -mx-4 px-4">
									<div className="divide-y divide-border">
										{cartData.items.map((item) => (
											<CartItemRow key={item.id} item={item} />
										))}
									</div>
								</ScrollArea>
								<CartSummary
									subtotalLabel={cartData.subtotalLabel}
									total={total}
									checkoutLabel={cartData.checkoutLabel}
								/>
							</>
						)}
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
