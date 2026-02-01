'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import {
	CalendarClock,
	Minus,
	Plus,
	RefreshCw,
	ShoppingBag,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
	subscriptionEligible: boolean;
	subscriptionDiscount?: number;
}

interface SubscriptionFrequency {
	id: string;
	label: string;
	savings: number;
}

interface CartDrawerProps {
	title: string;
	subscribeLabel: string;
	frequencyLabel: string;
	oneTimeLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	frequencies: SubscriptionFrequency[];
	selectedFrequency: string;
	subscribeEnabled: boolean;
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

const ItemRow = ({
	item,
	subscribeEnabled,
}: {
	item: CartItem;
	subscribeEnabled: boolean;
}) => {
	const displayPrice =
		subscribeEnabled && item.subscriptionDiscount
			? item.price * (1 - item.subscriptionDiscount / 100)
			: item.price;

	return (
		<div className="flex gap-3 py-3">
			<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
				<Image src={item.image} alt={item.name} fill className="object-cover" />
				{item.subscriptionEligible && subscribeEnabled && (
					<div className="absolute -right-1 -top-1">
						<RefreshCw className="size-4 rounded-full bg-primary p-0.5 text-primary-foreground" />
					</div>
				)}
			</div>
			<div className="flex min-w-0 flex-1 flex-col justify-between">
				<div className="flex items-start justify-between gap-2">
					<div>
						<h4 className="truncate text-sm font-medium">{item.name}</h4>
						{subscribeEnabled && item.subscriptionDiscount && (
							<Badge variant="secondary" className="mt-0.5 text-[10px]">
								<RefreshCw className="mr-1 size-2.5" />
								{item.subscriptionDiscount}% off
							</Badge>
						)}
					</div>
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
					<div className="text-right">
						<span className="text-sm font-medium">
							${(displayPrice * item.quantity).toFixed(2)}
						</span>
						{subscribeEnabled && item.subscriptionDiscount && (
							<p className="text-xs text-muted-foreground line-through">
								${(item.price * item.quantity).toFixed(2)}
							</p>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

const SubscriptionToggle = ({
	label,
	oneTimeLabel,
	enabled,
}: {
	label: string;
	oneTimeLabel: string;
	enabled: boolean;
}) => (
	<Card className={`p-4 ${enabled ? 'border-primary bg-primary/5' : ''}`}>
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-3">
				<div
					className={`flex size-10 items-center justify-center rounded-lg ${
						enabled ? 'bg-primary text-primary-foreground' : 'bg-muted'
					}`}
				>
					<RefreshCw className="size-5" />
				</div>
				<div>
					<p className="font-medium">{label}</p>
					<p className="text-xs text-muted-foreground">
						Save up to 20% on every order
					</p>
				</div>
			</div>
			<Switch checked={enabled} />
		</div>
		{!enabled && (
			<p className="mt-3 text-center text-sm text-muted-foreground">
				{oneTimeLabel}
			</p>
		)}
	</Card>
);

const FrequencySelector = ({
	label,
	frequencies,
	selected,
	enabled,
}: {
	label: string;
	frequencies: SubscriptionFrequency[];
	selected: string;
	enabled: boolean;
}) => {
	if (!enabled) return null;

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<CalendarClock className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{label}</span>
			</div>
			<div className="grid grid-cols-2 gap-2">
				{frequencies.map((freq) => (
					<Button
						key={freq.id}
						variant={freq.id === selected ? 'default' : 'outline'}
						className="h-auto flex-col gap-0.5 py-3"
					>
						<span className="text-sm">{freq.label}</span>
						<span
							className={`text-xs ${freq.id === selected ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}
						>
							Save {freq.savings}%
						</span>
					</Button>
				))}
			</div>
		</div>
	);
};

const Summary = ({
	subtotal,
	subscriptionSavings,
	checkoutLabel,
	subscribeEnabled,
}: {
	subtotal: number;
	subscriptionSavings: number;
	checkoutLabel: string;
	subscribeEnabled: boolean;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>${(subtotal + subscriptionSavings).toFixed(2)}</span>
		</div>
		{subscribeEnabled && subscriptionSavings > 0 && (
			<div className="flex justify-between text-sm text-primary">
				<span className="flex items-center gap-1">
					<RefreshCw className="size-3" />
					Subscription Savings
				</span>
				<span>-${subscriptionSavings.toFixed(2)}</span>
			</div>
		)}
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${subtotal.toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			{subscribeEnabled ? <RefreshCw className="size-4" /> : null}
			{checkoutLabel}
		</Button>
		{subscribeEnabled && (
			<p className="text-center text-xs text-muted-foreground">
				Cancel or modify your subscription anytime
			</p>
		)}
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		subscribeLabel: 'Subscribe & Save',
		frequencyLabel: 'Delivery Frequency',
		oneTimeLabel: 'One-time purchase',
		checkoutLabel: 'Subscribe & Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop',
				name: 'Premium Coffee Beans',
				price: 24.99,
				quantity: 2,
				subscriptionEligible: true,
				subscriptionDiscount: 15,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1563822249366-3efb23b8e0c9?w=200&h=200&fit=crop',
				name: 'Organic Tea Collection',
				price: 18.99,
				quantity: 1,
				subscriptionEligible: true,
				subscriptionDiscount: 10,
			},
		],
		frequencies: [
			{ id: 'weekly', label: 'Weekly', savings: 20 },
			{ id: 'biweekly', label: 'Every 2 weeks', savings: 15 },
			{ id: 'monthly', label: 'Monthly', savings: 10 },
			{ id: 'bimonthly', label: 'Every 2 months', savings: 5 },
		],
		selectedFrequency: 'monthly',
		subscribeEnabled: true,
	};

	const regularSubtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const subscriptionSubtotal = cartData.items.reduce((sum, item) => {
		const discount =
			item.subscriptionEligible && item.subscriptionDiscount
				? item.subscriptionDiscount / 100
				: 0;
		return sum + item.price * (1 - discount) * item.quantity;
	}, 0);
	const subscriptionSavings = regularSubtotal - subscriptionSubtotal;
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
						<SubscriptionToggle
							label={cartData.subscribeLabel}
							oneTimeLabel={cartData.oneTimeLabel}
							enabled={cartData.subscribeEnabled}
						/>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow
										key={item.id}
										item={item}
										subscribeEnabled={cartData.subscribeEnabled}
									/>
								))}
							</div>
							<div className="mt-4">
								<FrequencySelector
									label={cartData.frequencyLabel}
									frequencies={cartData.frequencies}
									selected={cartData.selectedFrequency}
									enabled={cartData.subscribeEnabled}
								/>
							</div>
						</ScrollArea>
						<Summary
							subtotal={
								cartData.subscribeEnabled
									? subscriptionSubtotal
									: regularSubtotal
							}
							subscriptionSavings={
								cartData.subscribeEnabled ? subscriptionSavings : 0
							}
							checkoutLabel={cartData.checkoutLabel}
							subscribeEnabled={cartData.subscribeEnabled}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
