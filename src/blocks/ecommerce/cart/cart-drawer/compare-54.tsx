'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { ArrowLeftRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	selected: boolean;
}

interface CartDrawerProps {
	title: string;
	compareLabel: string;
	selectedLabel: string;
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

const ItemRow = ({ item }: { item: CartItem }) => (
	<label className="flex gap-3 py-4 cursor-pointer">
		<Checkbox checked={item.selected} className="mt-2" />
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="font-medium">{item.name}</h4>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button size="icon-sm" variant="ghost" className="size-6">
					<X className="size-3.5" />
				</Button>
			</div>
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center gap-1 rounded border border-border">
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="font-semibold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</label>
);

const CompareBar = ({
	selectedCount,
	selectedLabel,
	compareLabel,
}: {
	selectedCount: number;
	selectedLabel: string;
	compareLabel: string;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-muted p-3">
		<span className="text-sm text-muted-foreground">
			{selectedCount} {selectedLabel}
		</span>
		<Button size="sm" disabled={selectedCount < 2}>
			<ArrowLeftRight className="mr-1.5 size-3.5" />
			{compareLabel}
		</Button>
	</div>
);

const Summary = ({
	total,
	checkoutLabel,
}: {
	total: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${total.toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		compareLabel: 'Compare',
		selectedLabel: 'items selected',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				variant: 'Red / Size 10',
				price: 129.99,
				quantity: 1,
				selected: true,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				variant: 'White / Size 11',
				price: 179.99,
				quantity: 1,
				selected: true,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				variant: 'Black / Size 10',
				price: 99.99,
				quantity: 1,
				selected: false,
			},
		],
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
	const selectedCount = cartData.items.filter((item) => item.selected).length;

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
						{selectedCount > 0 && (
							<CompareBar
								selectedCount={selectedCount}
								selectedLabel={cartData.selectedLabel}
								compareLabel={cartData.compareLabel}
							/>
						)}
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
