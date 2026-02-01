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
import {
	Crown,
	Lock,
	Minus,
	Plus,
	ShoppingBag,
	Sparkles,
	Star,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	vipPrice?: number;
	quantity: number;
}

interface VipBenefit {
	id: string;
	title: string;
	description: string;
}

interface CartDrawerProps {
	title: string;
	vipLabel: string;
	joinVipLabel: string;
	checkoutLabel: string;
	isVip: boolean;
	items: CartItem[];
	vipBenefits: VipBenefit[];
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

const VipBanner = ({
	label,
	isVip,
	joinLabel,
	savings,
	benefits,
}: {
	label: string;
	isVip: boolean;
	joinLabel: string;
	savings: number;
	benefits: VipBenefit[];
}) => (
	<div className="rounded-xl bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 border border-amber-500/30 p-4 space-y-3">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Crown className="size-5 text-amber-600" />
				<span className="font-semibold text-amber-700 dark:text-amber-400">
					{label}
				</span>
			</div>
			{isVip ? (
				<Badge className="bg-amber-500">
					<Star className="mr-1 size-3 fill-current" />
					VIP Member
				</Badge>
			) : (
				<Button size="sm" className="bg-amber-500 hover:bg-amber-600">
					{joinLabel}
				</Button>
			)}
		</div>
		{isVip ? (
			<div className="flex items-center gap-2 text-amber-700 dark:text-amber-300">
				<Sparkles className="size-4" />
				<span className="text-sm">
					You're saving ${savings.toFixed(2)} with VIP pricing!
				</span>
			</div>
		) : (
			<div className="space-y-2">
				{benefits.slice(0, 3).map((benefit) => (
					<div
						key={benefit.id}
						className="flex items-center gap-2 text-xs text-muted-foreground"
					>
						<Lock className="size-3" />
						<span>{benefit.title}</span>
					</div>
				))}
			</div>
		)}
	</div>
);

const ItemRow = ({ item, isVip }: { item: CartItem; isVip: boolean }) => {
	const displayPrice = isVip && item.vipPrice ? item.vipPrice : item.price;
	const hasVipDiscount = isVip && item.vipPrice && item.vipPrice < item.price;

	return (
		<div className="flex gap-3 py-4">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{hasVipDiscount && (
					<Badge className="absolute -left-1 -top-1 size-5 p-0 rounded-full bg-amber-500">
						<Crown className="size-3" />
					</Badge>
				)}
			</div>
			<div className="flex min-w-0 flex-1 flex-col">
				<div className="flex items-start justify-between gap-2">
					<h4 className="font-medium">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<X className="size-3.5" />
					</Button>
				</div>
				{hasVipDiscount && (
					<span className="text-xs text-amber-600">VIP Price</span>
				)}
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
					<div className="text-right">
						<span
							className={`font-semibold ${hasVipDiscount ? 'text-amber-600' : ''}`}
						>
							${(displayPrice * item.quantity).toFixed(2)}
						</span>
						{hasVipDiscount && (
							<span className="ml-1.5 text-sm text-muted-foreground line-through">
								${(item.price * item.quantity).toFixed(2)}
							</span>
						)}
					</div>
				</div>
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
		vipLabel: 'VIP Exclusive',
		joinVipLabel: 'Join VIP',
		checkoutLabel: 'Checkout',
		isVip: true,
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				vipPrice: 103.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost',
				price: 179.99,
				vipPrice: 143.99,
				quantity: 1,
			},
		],
		vipBenefits: [
			{ id: '1', title: '20% off all purchases', description: '' },
			{ id: '2', title: 'Free express shipping', description: '' },
			{ id: '3', title: 'Early access to sales', description: '' },
		],
	};

	const total = cartData.items.reduce((sum, item) => {
		const price = cartData.isVip && item.vipPrice ? item.vipPrice : item.price;
		return sum + price * item.quantity;
	}, 0);

	const savings = cartData.items.reduce((sum, item) => {
		if (cartData.isVip && item.vipPrice) {
			return sum + (item.price - item.vipPrice) * item.quantity;
		}
		return sum;
	}, 0);

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
						<VipBanner
							label={cartData.vipLabel}
							isVip={cartData.isVip}
							joinLabel={cartData.joinVipLabel}
							savings={savings}
							benefits={cartData.vipBenefits}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} isVip={cartData.isVip} />
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
