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
import { Minus, Package, Plus, ShoppingBag, Tag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface BundleItem {
	id: string;
	image: string;
	name: string;
	price: number;
}

interface Bundle {
	id: string;
	name: string;
	bundlePrice: number;
	regularPrice: number;
	items: BundleItem[];
}

interface CartDrawerProps {
	title: string;
	bundleLabel: string;
	addBundleLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	suggestedBundle: Bundle;
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

const BundleCard = ({
	label,
	bundle,
	addLabel,
}: {
	label: string;
	bundle: Bundle;
	addLabel: string;
}) => {
	const savings = bundle.regularPrice - bundle.bundlePrice;
	const savingsPercent = Math.round((savings / bundle.regularPrice) * 100);

	return (
		<div className="rounded-xl border-2 border-primary bg-gradient-to-br from-primary/5 via-primary/10 to-transparent p-4">
			<div className="flex items-center justify-between mb-3">
				<div className="flex items-center gap-2">
					<Package className="size-4 text-primary" />
					<span className="text-sm font-medium">{label}</span>
				</div>
				<Badge className="bg-primary">
					<Tag className="mr-1 size-3" />
					Save {savingsPercent}%
				</Badge>
			</div>
			<h3 className="font-semibold">{bundle.name}</h3>
			<div className="mt-3 flex gap-2">
				{bundle.items.map((item) => (
					<div
						key={item.id}
						className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted"
					>
						<Image src={item.image} alt={item.name} fill className="object-cover" />
					</div>
				))}
			</div>
			<div className="mt-3 flex flex-wrap gap-1">
				{bundle.items.map((item, index) => (
					<span key={item.id} className="text-xs text-muted-foreground">
						{item.name}
						{index < bundle.items.length - 1 && ' + '}
					</span>
				))}
			</div>
			<div className="mt-4 flex items-center justify-between">
				<div>
					<span className="text-lg font-bold text-primary">
						${bundle.bundlePrice.toFixed(2)}
					</span>
					<span className="ml-2 text-sm text-muted-foreground line-through">
						${bundle.regularPrice.toFixed(2)}
					</span>
				</div>
				<Button className="gap-1">
					<Plus className="size-3" />
					{addLabel}
				</Button>
			</div>
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
		bundleLabel: 'Complete the Look',
		addBundleLabel: 'Add Bundle',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
		],
		suggestedBundle: {
			id: 'bundle1',
			name: 'Complete Running Kit',
			bundlePrice: 169.99,
			regularPrice: 219.97,
			items: [
				{
					id: 'b1',
					image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
					name: 'Athletic Socks',
					price: 29.99,
				},
				{
					id: 'b2',
					image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
					name: 'Running Cap',
					price: 29.99,
				},
				{
					id: 'b3',
					image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
					name: 'Sports Bottle',
					price: 29.99,
				},
			],
		},
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
							<BundleCard
								label={cartData.bundleLabel}
								bundle={cartData.suggestedBundle}
								addLabel={cartData.addBundleLabel}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
