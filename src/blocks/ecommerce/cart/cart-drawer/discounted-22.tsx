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
import { Minus, Percent, Plus, ShoppingBag, Sparkles, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	discountPercent?: number;
}

interface CartDrawerProps {
	title: string;
	savingsLabel: string;
	checkoutLabel: string;
	items: CartItem[];
}

const DiscountTrigger = ({
	count,
	hasSavings,
}: {
	count: number;
	hasSavings: boolean;
}) => (
	<Button
		variant={hasSavings ? 'default' : 'outline'}
		size="icon"
		className="relative"
	>
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge
				variant={hasSavings ? 'secondary' : 'default'}
				className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]"
			>
				{count}
			</Badge>
		)}
		{hasSavings && (
			<Sparkles className="absolute -bottom-1 -right-1 size-3 text-yellow-400" />
		)}
	</Button>
);

const DiscountBadge = ({ percent }: { percent: number }) => (
	<Badge variant="destructive" className="gap-0.5 text-[10px]">
		<Percent className="size-2.5" />
		{percent}
	</Badge>
);

const DiscountedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
			{item.discountPercent && (
				<div className="absolute left-1 top-1">
					<DiscountBadge percent={item.discountPercent} />
				</div>
			)}
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<h4 className="truncate text-sm font-medium">{item.name}</h4>
				<Button size="icon-sm" variant="ghost" className="size-5">
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm font-bold text-primary">
					${item.price.toFixed(2)}
				</span>
				{item.originalPrice && (
					<span className="text-xs text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
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
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const SavingsBanner = ({
	label,
	amount,
}: {
	label: string;
	amount: number;
}) => (
	<div className="flex items-center justify-between rounded-lg bg-primary/10 px-4 py-3">
		<div className="flex items-center gap-2">
			<Sparkles className="size-4 text-primary" />
			<span className="text-sm font-medium text-primary">{label}</span>
		</div>
		<span className="text-lg font-bold text-primary">
			${amount.toFixed(2)}
		</span>
	</div>
);

const OrderTotal = ({
	subtotal,
	savings,
	checkoutLabel,
}: {
	subtotal: number;
	savings: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Original Total</span>
			<span className="text-muted-foreground line-through">
				${(subtotal + savings).toFixed(2)}
			</span>
		</div>
		<div className="flex justify-between text-lg">
			<span className="font-medium">You Pay</span>
			<span className="font-bold text-primary">${subtotal.toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			<Sparkles className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		savingsLabel: 'You\'re saving',
		checkoutLabel: 'Checkout & Save',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Air Max 90 Limited',
				price: 119.99,
				originalPrice: 179.99,
				quantity: 1,
				discountPercent: 33,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'React Element',
				price: 99.99,
				originalPrice: 149.99,
				quantity: 1,
				discountPercent: 33,
			},
			{
				id: '3',
				image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=200&h=200&fit=crop',
				name: 'Classic Leather',
				price: 89.99,
				quantity: 2,
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const originalTotal = cartData.items.reduce(
		(sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
		0,
	);
	const savings = originalTotal - subtotal;
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);
	const hasSavings = savings > 0;

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<DiscountTrigger count={itemCount} hasSavings={hasSavings} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						{hasSavings && (
							<SavingsBanner label={cartData.savingsLabel} amount={savings} />
						)}
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<DiscountedItem key={item.id} item={item} />
								))}
							</div>
						</ScrollArea>
						<OrderTotal
							subtotal={subtotal}
							savings={savings}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
