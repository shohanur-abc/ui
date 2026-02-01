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
import { Heart, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface PersonalizedItem {
	id: string;
	image: string;
	name: string;
	price: number;
	reason: string;
	matchScore: number;
}

interface CartDrawerProps {
	title: string;
	personalizedLabel: string;
	personalizedTagline: string;
	checkoutLabel: string;
	items: CartItem[];
	personalized: PersonalizedItem[];
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

const MatchIndicator = ({ score }: { score: number }) => (
	<div className="flex items-center gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Heart
				key={i}
				className={`size-2.5 ${
					i < score ? 'fill-pink-500 text-pink-500' : 'text-muted-foreground/30'
				}`}
			/>
		))}
	</div>
);

const PersonalizedItemCard = ({ item }: { item: PersonalizedItem }) => (
	<Card className="p-3 space-y-3">
		<div className="flex gap-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
			</div>
			<div className="flex flex-1 flex-col">
				<h4 className="text-sm font-medium">{item.name}</h4>
				<p className="text-xs text-muted-foreground mt-0.5">{item.reason}</p>
				<div className="mt-auto flex items-center gap-2">
					<MatchIndicator score={item.matchScore} />
					<span className="text-[10px] text-muted-foreground">
						{item.matchScore * 20}% match
					</span>
				</div>
			</div>
		</div>
		<div className="flex items-center justify-between">
			<span className="font-medium">${item.price.toFixed(2)}</span>
			<Button size="sm" variant="secondary">
				<Plus className="mr-1 size-3" />
				Add
			</Button>
		</div>
	</Card>
);

const PersonalizedSection = ({
	label,
	tagline,
	items,
}: {
	label: string;
	tagline: string;
	items: PersonalizedItem[];
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<div className="relative">
				<Sparkles className="size-4 text-pink-500" />
				<div className="absolute inset-0 animate-pulse">
					<Sparkles className="size-4 text-pink-400/50" />
				</div>
			</div>
			<span className="text-sm font-medium">{label}</span>
		</div>
		<p className="text-xs text-muted-foreground">{tagline}</p>
		<div className="space-y-2">
			{items.map((item) => (
				<PersonalizedItemCard key={item.id} item={item} />
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
		personalizedLabel: 'Picked Just for You',
		personalizedTagline: 'Based on your style preferences and purchase history',
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
		personalized: [
			{
				id: 'p1',
				image:
					'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=200&fit=crop',
				name: 'Performance Socks',
				price: 24.99,
				reason: "You've bought similar items before",
				matchScore: 5,
			},
			{
				id: 'p2',
				image:
					'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
				name: 'Running Cap',
				price: 29.99,
				reason: 'Matches your active lifestyle',
				matchScore: 4,
			},
			{
				id: 'p3',
				image:
					'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
				name: 'Hydration Bottle',
				price: 34.99,
				reason: 'Other runners love this',
				matchScore: 4,
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
							<PersonalizedSection
								label={cartData.personalizedLabel}
								tagline={cartData.personalizedTagline}
								items={cartData.personalized}
							/>
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
