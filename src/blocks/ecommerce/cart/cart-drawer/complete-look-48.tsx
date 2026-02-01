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
import { Grid2X2, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface LookItem {
	id: string;
	image: string;
	name: string;
	price: number;
	selected: boolean;
}

interface CompleteLook {
	id: string;
	name: string;
	items: LookItem[];
}

interface CartDrawerProps {
	title: string;
	lookLabel: string;
	addSelectedLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	completeLook: CompleteLook;
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

const LookItemCard = ({ item }: { item: LookItem }) => (
	<label className="flex gap-3 p-3 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
		<Checkbox checked={item.selected} className="mt-1" />
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex flex-1 flex-col">
			<h4 className="text-sm font-medium">{item.name}</h4>
			<span className="text-sm text-muted-foreground mt-auto">
				${item.price.toFixed(2)}
			</span>
		</div>
	</label>
);

const CompleteLookSection = ({
	label,
	look,
	addSelectedLabel,
}: {
	label: string;
	look: CompleteLook;
	addSelectedLabel: string;
}) => {
	const selectedItems = look.items.filter((item) => item.selected);
	const selectedTotal = selectedItems.reduce(
		(sum, item) => sum + item.price,
		0,
	);

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Grid2X2 className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{label}</span>
			</div>
			<p className="text-xs text-muted-foreground">{look.name}</p>
			<div className="grid grid-cols-2 gap-2">
				{look.items.map((item) => (
					<LookItemCard key={item.id} item={item} />
				))}
			</div>
			{selectedItems.length > 0 && (
				<div className="flex items-center justify-between pt-2">
					<span className="text-sm text-muted-foreground">
						{selectedItems.length} selected • ${selectedTotal.toFixed(2)}
					</span>
					<Button size="sm">
						<Plus className="mr-1 size-3" />
						{addSelectedLabel}
					</Button>
				</div>
			)}
		</div>
	);
};

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
		lookLabel: 'Complete the Look',
		addSelectedLabel: 'Add Selected',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop',
				name: 'White Sneakers',
				price: 89.99,
				quantity: 1,
			},
		],
		completeLook: {
			id: 'look1',
			name: 'Casual Weekend Outfit',
			items: [
				{
					id: 'l1',
					image:
						'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
					name: 'White T-Shirt',
					price: 29.99,
					selected: true,
				},
				{
					id: 'l2',
					image:
						'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
					name: 'Slim Fit Jeans',
					price: 79.99,
					selected: true,
				},
				{
					id: 'l3',
					image:
						'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
					name: 'Canvas Backpack',
					price: 59.99,
					selected: false,
				},
				{
					id: 'l4',
					image:
						'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=200&h=200&fit=crop',
					name: 'Sunglasses',
					price: 49.99,
					selected: false,
				},
			],
		},
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
							<Separator className="my-4" />
							<CompleteLookSection
								label={cartData.lookLabel}
								look={cartData.completeLook}
								addSelectedLabel={cartData.addSelectedLabel}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
