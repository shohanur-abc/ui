'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Layers, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface AccessoryItem {
	id: string;
	image: string;
	name: string;
	price: number;
	compatibility: string;
}

interface CartDrawerProps {
	title: string;
	accessoriesLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	accessories: AccessoryItem[];
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

const AccessoryCard = ({ accessory }: { accessory: AccessoryItem }) => (
	<Card className="flex gap-3 p-3 hover:bg-muted/50 transition-colors cursor-pointer">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image
				src={accessory.image}
				alt={accessory.name}
				fill
				className="object-cover"
			/>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<h4 className="text-sm font-medium">{accessory.name}</h4>
				<Badge variant="outline" className="mt-1 text-[10px]">
					<Layers className="mr-1 size-2.5" />
					{accessory.compatibility}
				</Badge>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">${accessory.price.toFixed(2)}</span>
				<Button size="sm" variant="secondary">
					<Plus className="mr-1 size-3" />
					Add
				</Button>
			</div>
		</div>
	</Card>
);

const AccessoriesSection = ({
	label,
	accessories,
}: {
	label: string;
	accessories: AccessoryItem[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Layers className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="space-y-2">
			{accessories.map((accessory) => (
				<AccessoryCard key={accessory.id} accessory={accessory} />
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
		accessoriesLabel: 'Compatible Accessories',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop',
				name: 'iPhone 15 Pro',
				price: 999.99,
				quantity: 1,
			},
		],
		accessories: [
			{
				id: 'a1',
				image:
					'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
				name: 'Clear MagSafe Case',
				price: 49.99,
				compatibility: 'iPhone 15 Pro',
			},
			{
				id: 'a2',
				image:
					'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop',
				name: 'MagSafe Charger',
				price: 39.99,
				compatibility: 'iPhone 15 Pro',
			},
			{
				id: 'a3',
				image:
					'https://images.unsplash.com/photo-1605464315542-bda3e2f4e605?w=200&h=200&fit=crop',
				name: 'Screen Protector',
				price: 19.99,
				compatibility: 'iPhone 15 Pro',
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
							<Separator className="my-4" />
							<AccessoriesSection
								label={cartData.accessoriesLabel}
								accessories={cartData.accessories}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
