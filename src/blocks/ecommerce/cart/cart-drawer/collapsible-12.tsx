'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	category: string;
}

interface CartDrawerProps {
	title: string;
	checkoutLabel: string;
	items: CartItem[];
}

const TriggerBadge = ({ count }: { count: number }) => (
	<Button variant="secondary" className="gap-2">
		<ShoppingBag className="size-4" />
		<Badge>{count}</Badge>
	</Button>
);

const CompactItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-2">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="min-w-0 flex-1">
			<h5 className="truncate text-sm font-medium">{item.name}</h5>
			<p className="text-xs text-muted-foreground">{item.variant}</p>
		</div>
		<div className="flex items-center gap-2">
			<div className="flex items-center gap-1 rounded border border-border">
				<Button size="icon-sm" variant="ghost" className="size-6">
					<Minus className="size-2.5" />
				</Button>
				<span className="w-5 text-center text-xs">{item.quantity}</span>
				<Button size="icon-sm" variant="ghost" className="size-6">
					<Plus className="size-2.5" />
				</Button>
			</div>
			<span className="w-16 text-right text-sm font-medium">
				${(item.price * item.quantity).toFixed(2)}
			</span>
			<Button size="icon-sm" variant="ghost" className="size-6">
				<Trash2 className="size-3" />
			</Button>
		</div>
	</div>
);

const CategoryGroup = ({
	category,
	items,
}: {
	category: string;
	items: CartItem[];
}) => {
	const categoryTotal = items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<Collapsible defaultOpen>
			<CollapsibleTrigger className="flex w-full items-center justify-between rounded-lg bg-muted/50 px-3 py-2 hover:bg-muted">
				<div className="flex items-center gap-2">
					<span className="font-medium">{category}</span>
					<Badge variant="secondary" className="text-xs">
						{itemCount}
					</Badge>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">
						${categoryTotal.toFixed(2)}
					</span>
					<ChevronDown className="size-4 transition-transform [[data-state=open]>&]:rotate-180" />
				</div>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<div className="divide-y divide-border/50 pl-2">
					{items.map((item) => (
						<CompactItem key={item.id} item={item} />
					))}
				</div>
			</CollapsibleContent>
		</Collapsible>
	);
};

const CartTotal = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between">
			<span className="font-medium">Total</span>
			<span className="text-xl font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
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
				image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Smart Watch',
				variant: 'Black / 44mm',
				price: 299.99,
				quantity: 1,
				category: 'Electronics',
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				variant: 'White',
				price: 149.99,
				quantity: 1,
				category: 'Electronics',
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				variant: 'US 10 / Red',
				price: 129.99,
				quantity: 2,
				category: 'Footwear',
			},
			{
				id: '4',
				image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Leather Wallet',
				variant: 'Brown',
				price: 79.99,
				quantity: 1,
				category: 'Accessories',
			},
		],
	};

	const groupedItems = cartData.items.reduce(
		(acc, item) => {
			if (!acc[item.category]) {
				acc[item.category] = [];
			}
			acc[item.category].push(item);
			return acc;
		},
		{} as Record<string, CartItem[]>,
	);

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
						<TriggerBadge count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-lg">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="space-y-4 py-2">
								{Object.entries(groupedItems).map(([category, items]) => (
									<CategoryGroup key={category} category={category} items={items} />
								))}
							</div>
						</ScrollArea>
						<CartTotal total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
