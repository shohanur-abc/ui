'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { Clock, Minus, Plus, ShoppingBag, Trash2, Zap } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	stockLevel: 'high' | 'medium' | 'low';
}

interface CartDrawerProps {
	title: string;
	urgentMessage: string;
	expressCheckoutLabel: string;
	standardCheckoutLabel: string;
	items: CartItem[];
}

const UrgentTrigger = ({ count }: { count: number }) => (
	<Button
		variant="default"
		size="icon"
		className="relative animate-pulse bg-destructive hover:bg-destructive/90"
	>
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-background text-[10px] font-bold text-destructive">
				{count}
			</span>
		)}
	</Button>
);

const UrgencyBanner = ({ message }: { message: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-destructive">
		<Clock className="size-4 animate-pulse" />
		<span className="text-sm font-medium">{message}</span>
	</div>
);

const StockIndicator = ({ level }: { level: 'high' | 'medium' | 'low' }) => {
	const config = {
		high: { text: 'In Stock', variant: 'secondary' as const },
		medium: { text: 'Limited Stock', variant: 'outline' as const },
		low: { text: 'Only 2 left!', variant: 'destructive' as const },
	};

	return (
		<Badge variant={config[level].variant} className="text-[10px]">
			{config[level].text}
		</Badge>
	);
};

const UrgentItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-4">
		<div className="relative size-18 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			{item.stockLevel === 'low' && (
				<div className="absolute inset-0 animate-pulse bg-destructive/10" />
			)}
		</div>
		<div className="flex min-w-0 flex-1 flex-col gap-1">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-6 shrink-0">
					<Trash2 className="size-3" />
				</Button>
			</div>
			<StockIndicator level={item.stockLevel} />
			<div className="mt-auto flex items-center justify-between">
				<div className="flex items-center gap-1 rounded-md border border-border">
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-xs">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-6">
						<Plus className="size-3" />
					</Button>
				</div>
				<span className="text-sm font-bold">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const DualCheckout = ({
	total,
	expressLabel,
	standardLabel,
}: {
	total: number;
	expressLabel: string;
	standardLabel: string;
}) => (
	<div className="space-y-4 border-t border-border pt-4">
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">Total</span>
			<span className="text-2xl font-bold">${total.toFixed(2)}</span>
		</div>
		<Button
			className="w-full gap-2 bg-gradient-to-r from-primary to-primary/80"
			size="lg"
		>
			<Zap className="size-4" />
			{expressLabel}
		</Button>
		<Button variant="outline" className="w-full" size="lg">
			{standardLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Cart',
		urgentMessage: 'Items in your cart are selling fast!',
		expressCheckoutLabel: 'Express Checkout',
		standardCheckoutLabel: 'Standard Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&h=200&fit=crop',
				name: 'Limited Edition Sneakers',
				price: 220.0,
				quantity: 1,
				stockLevel: 'low',
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=200&h=200&fit=crop',
				name: 'Designer Sunglasses',
				price: 185.0,
				quantity: 1,
				stockLevel: 'medium',
			},
			{
				id: '3',
				image:
					'https://images.unsplash.com/photo-1627123424574-724758594e93?w=200&h=200&fit=crop',
				name: 'Leather Belt',
				price: 65.0,
				quantity: 1,
				stockLevel: 'high',
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
	const hasLowStock = cartData.items.some((item) => item.stockLevel === 'low');

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						{hasLowStock ? (
							<UrgentTrigger count={itemCount} />
						) : (
							<Button variant="outline" size="icon" className="relative">
								<ShoppingBag className="size-4" />
								{itemCount > 0 && (
									<Badge className="absolute -right-1.5 -top-1.5 size-5 rounded-full p-0 text-[10px]">
										{itemCount}
									</Badge>
								)}
							</Button>
						)}
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						{hasLowStock && <UrgencyBanner message={cartData.urgentMessage} />}
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<UrgentItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<DualCheckout
							total={total}
							expressLabel={cartData.expressCheckoutLabel}
							standardLabel={cartData.standardCheckoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
