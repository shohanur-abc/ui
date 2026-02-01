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
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
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
		className="relative size-14 rounded-2xl"
	>
		<ShoppingBag className="size-6" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-7 rounded-full p-0 text-sm font-bold">
				{count}
			</Badge>
		)}
	</Button>
);

const AccessibleItemRow = ({ item }: { item: CartItem }) => (
	<div
		role="listitem"
		className="flex gap-4 py-5 focus-within:bg-accent rounded-xl px-2 -mx-2"
	>
		<div className="relative size-24 shrink-0 overflow-hidden rounded-2xl bg-muted">
			<Image src={item.image} alt="" fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div>
				<h3 className="text-lg font-semibold">{item.name}</h3>
				<p
					className="text-xl font-bold mt-1"
					aria-label={`Price: $${(item.price * item.quantity).toFixed(2)}`}
				>
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
			<div className="flex items-center justify-between">
				<div
					role="group"
					aria-label={`Quantity controls for ${item.name}`}
					className="flex items-center gap-2"
				>
					<Button
						size="icon"
						variant="outline"
						className="size-12 rounded-xl"
						aria-label={`Decrease quantity of ${item.name}`}
					>
						<Minus className="size-5" />
					</Button>
					<span
						className="w-12 text-center text-xl font-bold"
						aria-live="polite"
						aria-label={`Quantity: ${item.quantity}`}
					>
						{item.quantity}
					</span>
					<Button
						size="icon"
						variant="outline"
						className="size-12 rounded-xl"
						aria-label={`Increase quantity of ${item.name}`}
					>
						<Plus className="size-5" />
					</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					className="size-12 text-destructive hover:bg-destructive/10"
					aria-label={`Remove ${item.name} from cart`}
				>
					<Trash2 className="size-6" />
				</Button>
			</div>
		</div>
	</div>
);

const Summary = ({
	total,
	itemCount,
	checkoutLabel,
}: {
	total: number;
	itemCount: number;
	checkoutLabel: string;
}) => (
	<div
		className="space-y-4 border-t border-border pt-4 pb-safe"
		role="region"
		aria-label="Cart summary"
	>
		<div className="flex justify-between text-xl">
			<span className="font-medium">Total ({itemCount} items)</span>
			<span className="font-bold" aria-label={`Total: $${total.toFixed(2)}`}>
				${total.toFixed(2)}
			</span>
		</div>
		<Button
			className="w-full h-16 text-xl font-semibold rounded-2xl"
			size="lg"
			aria-label={`Proceed to checkout. Total: $${total.toFixed(2)}`}
		>
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
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
						className="flex w-full flex-col sm:max-w-lg"
						aria-label="Shopping cart"
					>
						<SheetHeader>
							<SheetTitle className="text-2xl">{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div
								role="list"
								aria-label="Cart items"
								className="divide-y divide-border"
							>
								{cartData.items.map((item) => (
									<AccessibleItemRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<Summary
							total={total}
							itemCount={itemCount}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
