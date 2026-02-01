'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Coins, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	pointsEarned: number;
}

interface PointsInfo {
	currentPoints: number;
	pointsToEarn: number;
	pointsMultiplier: number;
	pointsToNextTier: number;
	nextTierName: string;
}

interface CartDrawerProps {
	title: string;
	pointsLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	pointsInfo: PointsInfo;
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

const PointsBanner = ({ pointsInfo }: { pointsInfo: PointsInfo }) => {
	const progress =
		((pointsInfo.pointsToNextTier - pointsInfo.pointsToEarn) /
			pointsInfo.pointsToNextTier) *
		100;

	return (
		<div className="rounded-xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-orange-500/10 p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<div className="rounded-full bg-amber-500/20 p-1.5">
						<Coins className="size-4 text-amber-600" />
					</div>
					<div>
						<span className="text-sm font-medium">Earning</span>
						{pointsInfo.pointsMultiplier > 1 && (
							<Badge className="ml-2 bg-amber-500" variant="default">
								{pointsInfo.pointsMultiplier}x Points
							</Badge>
						)}
					</div>
				</div>
				<div className="text-right">
					<span className="text-2xl font-bold text-amber-600">
						+{pointsInfo.pointsToEarn}
					</span>
					<span className="text-sm text-muted-foreground ml-1">pts</span>
				</div>
			</div>
			<div className="space-y-1.5">
				<div className="flex justify-between text-xs">
					<span className="text-muted-foreground">
						Progress to {pointsInfo.nextTierName}
					</span>
					<span className="font-medium">
						{pointsInfo.currentPoints.toLocaleString()} /{' '}
						{pointsInfo.pointsToNextTier.toLocaleString()}
					</span>
				</div>
				<Progress value={progress} className="h-2 [&>div]:bg-amber-500" />
			</div>
		</div>
	);
};

const ItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-4">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col">
			<div className="flex items-start justify-between gap-2">
				<h4 className="font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-6">
					<X className="size-3.5" />
				</Button>
			</div>
			<div className="flex items-center gap-1.5 mt-0.5">
				<Sparkles className="size-3 text-amber-500" />
				<span className="text-xs text-amber-600">
					+{item.pointsEarned} points
				</span>
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
		pointsLabel: 'Points Earned',
		checkoutLabel: 'Checkout & Earn Points',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
				pointsEarned: 260,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
				pointsEarned: 360,
			},
		],
		pointsInfo: {
			currentPoints: 2500,
			pointsToEarn: 620,
			pointsMultiplier: 2,
			pointsToNextTier: 5000,
			nextTierName: 'Gold',
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
						<PointsBanner pointsInfo={cartData.pointsInfo} />
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
