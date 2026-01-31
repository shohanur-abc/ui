'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Check, Minus, Plus, ShoppingBag, Tag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface AppliedPromo {
	code: string;
	discount: number;
	type: 'percent' | 'fixed';
}

interface CartDrawerProps {
	title: string;
	promoPlaceholder: string;
	applyLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	appliedPromo?: AppliedPromo;
}

const TriggerIcon = ({ count }: { count: number }) => (
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

const PromoCodeInput = ({
	placeholder,
	applyLabel,
}: {
	placeholder: string;
	applyLabel: string;
}) => (
	<div className="flex gap-2">
		<div className="relative flex-1">
			<Tag className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={placeholder} className="pl-9" />
		</div>
		<Button variant="secondary">{applyLabel}</Button>
	</div>
);

const AppliedPromoTag = ({ promo }: { promo: AppliedPromo }) => (
	<div className="flex items-center justify-between rounded-lg bg-primary/10 px-3 py-2">
		<div className="flex items-center gap-2">
			<Check className="size-4 text-primary" />
			<span className="text-sm font-medium text-primary">{promo.code}</span>
			<Badge variant="secondary" className="text-xs">
				{promo.type === 'percent' ? `${promo.discount}% off` : `$${promo.discount} off`}
			</Badge>
		</div>
		<Button size="icon-sm" variant="ghost" className="size-5 text-primary hover:text-primary">
			<X className="size-3" />
		</Button>
	</div>
);

const OrderSummary = ({
	subtotal,
	promo,
	checkoutLabel,
}: {
	subtotal: number;
	promo?: AppliedPromo;
	checkoutLabel: string;
}) => {
	const discount = promo
		? promo.type === 'percent'
			? subtotal * (promo.discount / 100)
			: promo.discount
		: 0;
	const total = subtotal - discount;

	return (
		<div className="space-y-3 border-t border-border pt-4">
			<div className="flex justify-between text-sm">
				<span className="text-muted-foreground">Subtotal</span>
				<span>${subtotal.toFixed(2)}</span>
			</div>
			{discount > 0 && (
				<div className="flex justify-between text-sm text-primary">
					<span>Discount</span>
					<span>-${discount.toFixed(2)}</span>
				</div>
			)}
			<Separator />
			<div className="flex justify-between text-lg">
				<span className="font-medium">Total</span>
				<span className="font-bold">${total.toFixed(2)}</span>
			</div>
			<Button className="w-full" size="lg">
				{checkoutLabel}
			</Button>
		</div>
	);
};

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		promoPlaceholder: 'Enter promo code',
		applyLabel: 'Apply',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Classic Watch',
				price: 199.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				price: 129.99,
				quantity: 2,
			},
		],
		appliedPromo: {
			code: 'SAVE20',
			discount: 20,
			type: 'percent',
		},
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const itemCount = cartData.items.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<section className="@container">
			<div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-16 @sm:px-6 @2xl:px-8">
				<Sheet>
					<SheetTrigger asChild>
						<TriggerIcon count={itemCount} />
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
						</ScrollArea>
						<div className="space-y-3 py-4">
							<PromoCodeInput
								placeholder={cartData.promoPlaceholder}
								applyLabel={cartData.applyLabel}
							/>
							{cartData.appliedPromo && (
								<AppliedPromoTag promo={cartData.appliedPromo} />
							)}
						</div>
						<OrderSummary
							subtotal={subtotal}
							promo={cartData.appliedPromo}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
