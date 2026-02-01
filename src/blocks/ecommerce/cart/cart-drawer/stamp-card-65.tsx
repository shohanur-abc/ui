'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Coffee, Gift, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface StampCardInfo {
	currentStamps: number;
	totalStamps: number;
	reward: string;
	stampValue: number;
}

interface CartDrawerProps {
	title: string;
	stampCardLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	stampCard: StampCardInfo;
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

const StampCard = ({
	label,
	stampInfo,
	stampsToEarn,
}: {
	label: string;
	stampInfo: StampCardInfo;
	stampsToEarn: number;
}) => {
	const allStamps = Array.from({ length: stampInfo.totalStamps }, (_, i) => i);
	const futureStamps = stampInfo.currentStamps + stampsToEarn;

	return (
		<div className="rounded-xl bg-gradient-to-br from-amber-100 via-orange-50 to-amber-100 dark:from-amber-900/30 dark:via-orange-900/20 dark:to-amber-900/30 p-4 space-y-3">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<Coffee className="size-5 text-amber-700 dark:text-amber-400" />
					<span className="font-medium text-amber-900 dark:text-amber-100">
						{label}
					</span>
				</div>
				<Badge className="bg-amber-600">
					{stampInfo.currentStamps}/{stampInfo.totalStamps}
				</Badge>
			</div>
			<div className="grid grid-cols-5 gap-2">
				{allStamps.map((index) => {
					const isFilled = index < stampInfo.currentStamps;
					const isEarning =
						index >= stampInfo.currentStamps && index < futureStamps;
					const isReward = index === stampInfo.totalStamps - 1;

					return (
						<div
							key={index}
							className={`aspect-square rounded-lg flex items-center justify-center text-lg transition-all ${
								isFilled
									? 'bg-amber-500 text-white'
									: isEarning
										? 'bg-amber-300/50 text-amber-700 border-2 border-dashed border-amber-400 animate-pulse'
										: 'bg-white/50 dark:bg-white/10 text-muted-foreground'
							}`}
						>
							{isReward ? (
								<Gift
									className={`size-5 ${isFilled ? 'text-white' : 'text-amber-500'}`}
								/>
							) : isFilled || isEarning ? (
								<Coffee className="size-4" />
							) : (
								<span className="text-xs">{index + 1}</span>
							)}
						</div>
					);
				})}
			</div>
			<div className="flex items-center justify-between text-sm">
				<span className="text-amber-700 dark:text-amber-300">
					{stampsToEarn > 0 &&
						`+${stampsToEarn} stamp${stampsToEarn > 1 ? 's' : ''} with this order`}
				</span>
				<span className="text-amber-900 dark:text-amber-100 font-medium">
					Reward: {stampInfo.reward}
				</span>
			</div>
		</div>
	);
};

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
		stampCardLabel: 'Loyalty Card',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop',
				name: 'Cappuccino',
				price: 4.99,
				quantity: 2,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1534778101976-62847782c213?w=200&h=200&fit=crop',
				name: 'Croissant',
				price: 3.49,
				quantity: 1,
			},
		],
		stampCard: {
			currentStamps: 6,
			totalStamps: 10,
			reward: 'Free Coffee',
			stampValue: 5,
		},
	};

	const total = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const stampsToEarn = Math.floor(total / cartData.stampCard.stampValue);
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
						<StampCard
							label={cartData.stampCardLabel}
							stampInfo={cartData.stampCard}
							stampsToEarn={stampsToEarn}
						/>
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
