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
import { ArrowUpDown, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	addedAt: Date;
}

interface CartDrawerProps {
	title: string;
	sortByPriceLabel: string;
	sortByDateLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const SortTrigger = ({ count }: { count: number }) => (
	<Button variant="outline" className="gap-2">
		<ShoppingBag className="size-4" />
		{count > 0 && <Badge>{count}</Badge>}
	</Button>
);

const SortButtons = ({
	priceLabel,
	dateLabel,
}: {
	priceLabel: string;
	dateLabel: string;
}) => (
	<div className="flex items-center gap-2 rounded-lg bg-muted/50 p-1">
		<Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
			<ArrowUpDown className="size-3" />
			{priceLabel}
		</Button>
		<Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
			<ArrowUpDown className="size-3" />
			{dateLabel}
		</Button>
	</div>
);

const DraggableItem = ({ item, index }: { item: CartItem; index: number }) => (
	<div className="group flex gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-border hover:bg-muted/30">
		<div className="flex items-center text-muted-foreground">
			<span className="w-6 text-center text-xs font-medium">{index + 1}</span>
		</div>
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div>
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<p className="text-xs text-muted-foreground">{item.variant}</p>
			</div>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border bg-background">
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Minus className="size-2.5" />
					</Button>
					<span className="w-5 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<Plus className="size-2.5" />
					</Button>
				</div>
				<span className="text-sm font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
		<Button
			size="icon-sm"
			variant="ghost"
			className="size-6 self-center opacity-0 transition-opacity group-hover:opacity-100"
		>
			<Trash2 className="size-3 text-destructive" />
		</Button>
	</div>
);

const OrderFooter = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span>Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Shopping Cart',
		sortByPriceLabel: 'Price',
		sortByDateLabel: 'Date Added',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Minimalist Watch',
				variant: 'Silver',
				price: 199.99,
				quantity: 1,
				addedAt: new Date('2024-01-15'),
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Leather Wallet',
				variant: 'Brown',
				price: 79.99,
				quantity: 1,
				addedAt: new Date('2024-01-14'),
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
				name: 'Premium Headphones',
				variant: 'Black',
				price: 349.99,
				quantity: 1,
				addedAt: new Date('2024-01-16'),
			},
			{
				id: '4',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				variant: 'White',
				price: 149.99,
				quantity: 2,
				addedAt: new Date('2024-01-13'),
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<SortTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<SortButtons
							priceLabel={cartData.sortByPriceLabel}
							dateLabel={cartData.sortByDateLabel}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="space-y-2 py-2">
								{cartData.items.map((item, index) => (
									<DraggableItem key={item.id} item={item} index={index} />
								))}
							</div>
						</ScrollArea>
						<OrderFooter total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
