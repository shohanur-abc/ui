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
import { Clock, Flame, Minus, Plus, ShoppingBag, X, Zap } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	originalPrice: number;
	salePrice: number;
	quantity: number;
}

interface FlashSaleData {
	endsAt: string;
	hours: number;
	minutes: number;
	seconds: number;
}

interface CartDrawerProps {
	title: string;
	flashSaleLabel: string;
	endsInLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	flashSale: FlashSaleData;
}

const FlashTrigger = ({ count }: { count: number }) => (
	<Button variant="default" size="icon" className="relative animate-pulse">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge
				variant="secondary"
				className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]"
			>
				{count}
			</Badge>
		)}
		<Flame className="absolute -bottom-1 -right-1 size-3 text-orange-500" />
	</Button>
);

const FlashSaleTimer = ({
	label,
	endsIn,
	hours,
	minutes,
	seconds,
}: {
	label: string;
	endsIn: string;
	hours: number;
	minutes: number;
	seconds: number;
}) => (
	<div className="rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-4 text-white">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Zap className="size-5" fill="currentColor" />
				<span className="font-bold">{label}</span>
			</div>
			<Badge
				variant="secondary"
				className="bg-white/20 text-white hover:bg-white/30"
			>
				<Clock className="mr-1 size-3" />
				{endsIn}
			</Badge>
		</div>
		<div className="mt-3 flex items-center justify-center gap-2">
			<div className="flex flex-col items-center rounded bg-white/20 px-3 py-1">
				<span className="font-mono text-2xl font-bold">
					{String(hours).padStart(2, '0')}
				</span>
				<span className="text-[10px]">Hours</span>
			</div>
			<span className="text-2xl font-bold">:</span>
			<div className="flex flex-col items-center rounded bg-white/20 px-3 py-1">
				<span className="font-mono text-2xl font-bold">
					{String(minutes).padStart(2, '0')}
				</span>
				<span className="text-[10px]">Min</span>
			</div>
			<span className="text-2xl font-bold">:</span>
			<div className="flex flex-col items-center rounded bg-white/20 px-3 py-1">
				<span className="font-mono text-2xl font-bold">
					{String(seconds).padStart(2, '0')}
				</span>
				<span className="text-[10px]">Sec</span>
			</div>
		</div>
	</div>
);

const FlashSaleItem = ({ item }: { item: CartItem }) => {
	const discountPercent = Math.round(
		((item.originalPrice - item.salePrice) / item.originalPrice) * 100,
	);

	return (
		<div className="flex gap-3 py-3">
			<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				<Badge
					variant="destructive"
					className="absolute left-1 top-1 text-[10px] px-1"
				>
					-{discountPercent}%
				</Badge>
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between gap-2">
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<Button size="icon-sm" variant="ghost" className="size-5">
						<X className="size-3" />
					</Button>
				</div>
				<div className="flex items-center gap-2">
					<span className="text-base font-bold text-red-500">
						${item.salePrice.toFixed(2)}
					</span>
					<span className="text-xs text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				</div>
				<div className="flex items-center justify-between pt-1">
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
						${(item.salePrice * item.quantity).toFixed(2)}
					</span>
				</div>
			</div>
		</div>
	);
};

const FlashSaleSummary = ({
	originalTotal,
	saleTotal,
	checkoutLabel,
}: {
	originalTotal: number;
	saleTotal: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Regular Total</span>
			<span className="text-muted-foreground line-through">
				${originalTotal.toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-sm text-red-500">
			<span className="flex items-center gap-1">
				<Flame className="size-3" />
				Flash Sale Savings
			</span>
			<span>-${(originalTotal - saleTotal).toFixed(2)}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Flash Price</span>
			<span className="font-bold text-red-500">${saleTotal.toFixed(2)}</span>
		</div>
		<Button
			className="w-full gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600"
			size="lg"
		>
			<Zap className="size-4" />
			{checkoutLabel}
		</Button>
		<p className="text-center text-xs text-muted-foreground">
			Prices only valid during flash sale
		</p>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Flash Sale Cart',
		flashSaleLabel: 'Flash Sale',
		endsInLabel: 'Ends in',
		checkoutLabel: 'Checkout Now',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Air Max Limited',
				originalPrice: 199.99,
				salePrice: 99.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Ultra Boost Pro',
				originalPrice: 249.99,
				salePrice: 149.99,
				quantity: 1,
			},
		],
		flashSale: {
			endsAt: '11:59 PM',
			hours: 2,
			minutes: 45,
			seconds: 32,
		},
	};

	const originalTotal = cartData.items.reduce(
		(sum, item) => sum + item.originalPrice * item.quantity,
		0,
	);
	const saleTotal = cartData.items.reduce(
		(sum, item) => sum + item.salePrice * item.quantity,
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
						<FlashTrigger count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle className="flex items-center gap-2">
								<Flame className="size-5 text-orange-500" />
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<FlashSaleTimer
							label={cartData.flashSaleLabel}
							endsIn={cartData.endsInLabel}
							hours={cartData.flashSale.hours}
							minutes={cartData.flashSale.minutes}
							seconds={cartData.flashSale.seconds}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<FlashSaleItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<FlashSaleSummary
							originalTotal={originalTotal}
							saleTotal={saleTotal}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
