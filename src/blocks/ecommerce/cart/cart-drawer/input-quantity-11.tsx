'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
	Check,
	Edit2,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	maxQuantity: number;
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
}

const CartTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingCart className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const QuantityInput = ({
	quantity,
	max,
}: {
	quantity: number;
	max: number;
}) => (
	<div className="flex items-center gap-1">
		<Button
			size="icon-sm"
			variant="outline"
			className="size-8"
			disabled={quantity <= 1}
		>
			<Minus className="size-3" />
		</Button>
		<Input
			type="number"
			value={quantity}
			min={1}
			max={max}
			className="h-8 w-14 text-center text-sm [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
		/>
		<Button
			size="icon-sm"
			variant="outline"
			className="size-8"
			disabled={quantity >= max}
		>
			<Plus className="size-3" />
		</Button>
	</div>
);

const EditableVariant = ({ variant }: { variant: string }) => (
	<div className="group flex items-center gap-1">
		<span className="text-xs text-muted-foreground">{variant}</span>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
		>
			<Edit2 className="size-2.5" />
		</Button>
	</div>
);

const ProductRow = ({ item }: { item: CartItem }) => (
	<div className="group flex gap-4 py-4">
		<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="space-y-1">
				<div className="flex items-start justify-between gap-2">
					<h4 className="truncate font-medium">{item.name}</h4>
					<Button
						size="icon-sm"
						variant="ghost"
						className="size-6 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
					>
						<Trash2 className="size-3.5 text-destructive" />
					</Button>
				</div>
				<EditableVariant variant={item.variant} />
			</div>
			<div className="flex items-center justify-between">
				<QuantityInput quantity={item.quantity} max={item.maxQuantity} />
				<span className="font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const OrderFooter = ({
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

	return (
		<div className="space-y-4 border-t border-border pt-4">
			<div className="flex items-center justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span className="text-xl font-bold">${subtotal.toFixed(2)}</span>
			</div>
			<Button className="w-full" size="lg">
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Shopping Cart',
		checkoutLabel: 'Proceed to Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes Pro',
				variant: 'US 10 / Red',
				price: 129.99,
				quantity: 2,
				maxQuantity: 10,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Classic Sneakers',
				variant: 'US 9 / White',
				price: 89.99,
				quantity: 1,
				maxQuantity: 5,
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
				name: 'Sport Sandals',
				variant: 'US 11 / Black',
				price: 59.99,
				quantity: 1,
				maxQuantity: 8,
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
									<ProductRow key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<OrderFooter
							items={cartData.items}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
