'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Gift, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface RewardsInfo {
	availablePoints: number;
	pointsValue: number;
	maxRedeemable: number;
}

interface CartDrawerProps {
	title: string;
	rewardsLabel: string;
	applyLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	rewards: RewardsInfo;
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

const RewardsRedemption = ({
	label,
	applyLabel,
	rewards,
}: {
	label: string;
	applyLabel: string;
	rewards: RewardsInfo;
}) => {
	const pointsToRedeem = 500;
	const dollarValue = (pointsToRedeem / 100).toFixed(2);

	return (
		<div className="rounded-xl border border-primary/30 bg-primary/5 p-4 space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Gift className="size-5 text-primary" />
					<span className="font-medium">{label}</span>
				</div>
				<Badge variant="outline" className="border-primary text-primary">
					{rewards.availablePoints.toLocaleString()} pts
				</Badge>
			</div>
			<div className="space-y-3">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Redeem points</span>
					<span className="font-medium">
						{pointsToRedeem} pts = ${dollarValue}
					</span>
				</div>
				<Slider
					defaultValue={[pointsToRedeem]}
					max={rewards.maxRedeemable}
					step={100}
					className="[&>span:first-child]:bg-primary/20 [&_[role=slider]]:bg-primary"
				/>
				<div className="flex justify-between text-xs text-muted-foreground">
					<span>0</span>
					<span>{rewards.maxRedeemable} pts</span>
				</div>
			</div>
			<Button className="w-full">
				{applyLabel} -${dollarValue}
			</Button>
		</div>
	);
};

const Summary = ({
	total,
	discount,
	checkoutLabel,
}: {
	total: number;
	discount: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="space-y-2 text-sm">
			<div className="flex justify-between">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${total.toFixed(2)}</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-primary">
					<span>Rewards Discount</span>
					<span>-${discount.toFixed(2)}</span>
				</div>
			)}
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(total - discount).toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		rewardsLabel: 'Redeem Rewards',
		applyLabel: 'Apply',
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
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				quantity: 1,
			},
		],
		rewards: {
			availablePoints: 2500,
			pointsValue: 0.01,
			maxRedeemable: 2500,
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
	const discount = 5.0;

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
							<RewardsRedemption
								label={cartData.rewardsLabel}
								applyLabel={cartData.applyLabel}
								rewards={cartData.rewards}
							/>
						</ScrollArea>
						<Summary
							total={total}
							discount={discount}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
