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
import { ArrowUp, Check, Minus, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface UpgradeOption {
	id: string;
	currentItem: string;
	upgradeTo: string;
	upgradeImage: string;
	priceDifference: number;
	benefits: string[];
}

interface CartDrawerProps {
	title: string;
	upgradeLabel: string;
	upgradeButton: string;
	checkoutLabel: string;
	items: CartItem[];
	upgrades: UpgradeOption[];
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

const UpgradeCard = ({
	upgrade,
	buttonLabel,
}: {
	upgrade: UpgradeOption;
	buttonLabel: string;
}) => (
	<div className="rounded-xl border-2 border-dashed border-primary/50 bg-gradient-to-br from-primary/5 to-transparent p-4">
		<div className="flex items-center gap-2 mb-3">
			<ArrowUp className="size-4 text-primary" />
			<span className="text-sm font-medium text-primary">Upgrade Available</span>
		</div>
		<div className="flex gap-3">
			<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image
					src={upgrade.upgradeImage}
					alt={upgrade.upgradeTo}
					fill
					className="object-cover"
				/>
				<Badge className="absolute -right-1 -top-1 size-5 rounded-full p-0 text-[9px]">
					<Sparkles className="size-3" />
				</Badge>
			</div>
			<div className="flex-1">
				<h4 className="font-medium">{upgrade.upgradeTo}</h4>
				<p className="mt-0.5 text-xs text-muted-foreground">
					from {upgrade.currentItem}
				</p>
				<ul className="mt-2 space-y-1">
					{upgrade.benefits.map((benefit, index) => (
						<li key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
							<Check className="size-3 text-primary" />
							{benefit}
						</li>
					))}
				</ul>
			</div>
		</div>
		<div className="mt-4 flex items-center justify-between">
			<span className="text-sm">
				<span className="font-medium text-primary">
					+${upgrade.priceDifference.toFixed(2)}
				</span>
				<span className="text-muted-foreground"> only</span>
			</span>
			<Button size="sm" className="gap-1">
				<ArrowUp className="size-3" />
				{buttonLabel}
			</Button>
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
		upgradeLabel: 'Upgrade Available',
		upgradeButton: 'Upgrade',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
				name: 'Basic Headphones',
				price: 79.99,
				quantity: 1,
			},
		],
		upgrades: [
			{
				id: 'u1',
				currentItem: 'Basic Headphones',
				upgradeTo: 'Premium Noise-Cancelling',
				upgradeImage: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop',
				priceDifference: 70.0,
				benefits: [
					'Active noise cancellation',
					'30hr battery life',
					'Premium leather ear cups',
				],
			},
		],
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
							{cartData.upgrades.length > 0 && (
								<div className="mt-4 space-y-3">
									{cartData.upgrades.map((upgrade) => (
										<UpgradeCard
											key={upgrade.id}
											upgrade={upgrade}
											buttonLabel={cartData.upgradeButton}
										/>
									))}
								</div>
							)}
						</ScrollArea>
						<Summary total={total} checkoutLabel={cartData.checkoutLabel} />
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
