'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Bell, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface OutOfStockItem {
	id: string;
	image: string;
	name: string;
	price: number;
	expectedRestock: string;
	isNotifying: boolean;
}

interface CartDrawerProps {
	title: string;
	outOfStockLabel: string;
	notifyMeLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	outOfStock: OutOfStockItem[];
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

const OutOfStockCard = ({
	item,
	notifyLabel,
}: {
	item: OutOfStockItem;
	notifyLabel: string;
}) => (
	<div className="rounded-lg border border-dashed border-muted-foreground/30 bg-muted/30 p-3 space-y-3">
		<div className="flex gap-3">
			<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted opacity-60 grayscale">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex flex-1 flex-col">
				<h4 className="text-sm font-medium text-muted-foreground">
					{item.name}
				</h4>
				<p className="text-xs text-muted-foreground mt-1">
					Expected: {item.expectedRestock}
				</p>
				<span className="text-sm font-medium mt-auto">
					${item.price.toFixed(2)}
				</span>
			</div>
		</div>
		{item.isNotifying ? (
			<div className="flex items-center gap-2 rounded-md bg-primary/10 p-2">
				<Bell className="size-4 text-primary" />
				<span className="text-xs text-primary font-medium">
					You'll be notified when this item is back
				</span>
			</div>
		) : (
			<div className="space-y-2">
				<Label htmlFor={`email-${item.id}`} className="text-xs">
					Get notified when available
				</Label>
				<div className="flex gap-2">
					<Input
						id={`email-${item.id}`}
						type="email"
						placeholder="your@email.com"
						className="text-xs"
					/>
					<Button size="sm">
						<Bell className="mr-1 size-3" />
						{notifyLabel}
					</Button>
				</div>
			</div>
		)}
	</div>
);

const OutOfStockSection = ({
	label,
	items,
	notifyLabel,
}: {
	label: string;
	items: OutOfStockItem[];
	notifyLabel: string;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<span className="text-sm font-medium text-muted-foreground">{label}</span>
		</div>
		<div className="space-y-2">
			{items.map((item) => (
				<OutOfStockCard key={item.id} item={item} notifyLabel={notifyLabel} />
			))}
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
		outOfStockLabel: 'Out of Stock',
		notifyMeLabel: 'Notify',
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
		],
		outOfStock: [
			{
				id: 'o1',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				expectedRestock: 'Dec 15',
				isNotifying: true,
			},
			{
				id: 'o2',
				image:
					'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				price: 99.99,
				expectedRestock: 'Dec 20',
				isNotifying: false,
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
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							{cartData.outOfStock.length > 0 && (
								<>
									<Separator className="my-4" />
									<OutOfStockSection
										label={cartData.outOfStockLabel}
										items={cartData.outOfStock}
										notifyLabel={cartData.notifyMeLabel}
									/>
								</>
							)}
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
