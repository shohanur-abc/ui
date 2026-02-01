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
import { Flame, Minus, Plus, ShoppingBag, Star, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface PopularItem {
	id: string;
	image: string;
	name: string;
	price: number;
	rating: number;
	reviewCount: number;
}

interface CartDrawerProps {
	title: string;
	popularLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	popular: PopularItem[];
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

const RatingStars = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-3 ${
					i < rating ? 'fill-primary text-primary' : 'text-muted-foreground'
				}`}
			/>
		))}
	</div>
);

const PopularItemCard = ({ item }: { item: PopularItem }) => (
	<Card className="flex gap-3 p-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			<Badge
				variant="secondary"
				className="absolute -left-1 -top-1 size-5 p-0 rounded-full"
			>
				<Flame className="size-3 text-orange-500" />
			</Badge>
		</div>
		<div className="flex flex-1 flex-col justify-between">
			<div>
				<h4 className="text-sm font-medium">{item.name}</h4>
				<div className="flex items-center gap-2 mt-1">
					<RatingStars rating={item.rating} />
					<span className="text-[10px] text-muted-foreground">
						({item.reviewCount})
					</span>
				</div>
			</div>
			<div className="flex items-center justify-between">
				<span className="font-medium">${item.price.toFixed(2)}</span>
				<Button size="sm" variant="secondary">
					<Plus className="mr-1 size-3" />
					Add
				</Button>
			</div>
		</div>
	</Card>
);

const PopularSection = ({
	label,
	items,
}: {
	label: string;
	items: PopularItem[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Flame className="size-4 text-orange-500" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="space-y-2">
			{items.map((item) => (
				<PopularItemCard key={item.id} item={item} />
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
		popularLabel: 'Popular with Other Shoppers',
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
		popular: [
			{
				id: 'p1',
				image:
					'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
				name: 'Athletic Socks Pro',
				price: 24.99,
				rating: 5,
				reviewCount: 2847,
			},
			{
				id: 'p2',
				image:
					'https://images.unsplash.com/photo-1576633587382-13ddf37b1fc1?w=200&h=200&fit=crop',
				name: 'Premium Insoles',
				price: 34.99,
				rating: 4,
				reviewCount: 1523,
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
							<PopularSection
								label={cartData.popularLabel}
								items={cartData.popular}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
