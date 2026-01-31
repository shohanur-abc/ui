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
import { Clock, Home, MapPin, Minus, Plus, ShoppingBag, Store, Truck, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface FulfillmentOption {
	id: string;
	type: 'delivery' | 'pickup' | 'express';
	label: string;
	description: string;
	price: number;
	time: string;
	icon: 'truck' | 'store' | 'clock';
}

interface CartDrawerProps {
	title: string;
	fulfillmentLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	fulfillmentOptions: FulfillmentOption[];
	selectedOption: string;
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

const FulfillmentIcon = ({ type }: { type: string }) => {
	switch (type) {
		case 'truck':
			return <Truck className="size-5" />;
		case 'store':
			return <Store className="size-5" />;
		case 'clock':
			return <Clock className="size-5" />;
		default:
			return <Home className="size-5" />;
	}
};

const FulfillmentSelector = ({
	label,
	options,
	selected,
}: {
	label: string;
	options: FulfillmentOption[];
	selected: string;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<MapPin className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="grid gap-2">
			{options.map((option) => {
				const isSelected = option.id === selected;

				return (
					<div
						key={option.id}
						className={`relative cursor-pointer rounded-xl border-2 p-4 transition-all ${
							isSelected
								? 'border-primary bg-primary/5'
								: 'border-border hover:border-muted-foreground/50'
						}`}
					>
						<div className="flex items-start gap-3">
							<div
								className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
									isSelected
										? 'bg-primary text-primary-foreground'
										: 'bg-muted text-muted-foreground'
								}`}
							>
								<FulfillmentIcon type={option.icon} />
							</div>
							<div className="flex-1">
								<div className="flex items-center justify-between">
									<h4 className="font-medium">{option.label}</h4>
									<span className="font-medium">
										{option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
									</span>
								</div>
								<p className="mt-0.5 text-sm text-muted-foreground">
									{option.description}
								</p>
								<Badge variant="secondary" className="mt-2 text-xs">
									<Clock className="mr-1 size-3" />
									{option.time}
								</Badge>
							</div>
						</div>
						{isSelected && (
							<div className="absolute right-4 top-4 size-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
								<svg className="size-3" viewBox="0 0 12 12" fill="none">
									<path
										d="M2 6L5 9L10 3"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						)}
					</div>
				);
			})}
		</div>
	</div>
);

const Summary = ({
	subtotal,
	fulfillmentCost,
	checkoutLabel,
}: {
	subtotal: number;
	fulfillmentCost: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>${subtotal.toFixed(2)}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Fulfillment</span>
			<span>{fulfillmentCost === 0 ? 'Free' : `$${fulfillmentCost.toFixed(2)}`}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(subtotal + fulfillmentCost).toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		fulfillmentLabel: 'Choose Fulfillment',
		checkoutLabel: 'Continue to Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Running Shoes',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=200&h=200&fit=crop',
				name: 'Casual Sneakers',
				price: 89.99,
				quantity: 1,
			},
		],
		fulfillmentOptions: [
			{
				id: 'delivery',
				type: 'delivery',
				label: 'Standard Delivery',
				description: 'Delivered to your doorstep',
				price: 5.99,
				time: '3-5 business days',
				icon: 'truck',
			},
			{
				id: 'express',
				type: 'express',
				label: 'Express Delivery',
				description: 'Fastest delivery option',
				price: 14.99,
				time: 'Next day',
				icon: 'clock',
			},
			{
				id: 'pickup',
				type: 'pickup',
				label: 'Store Pickup',
				description: 'Pick up at your nearest store',
				price: 0,
				time: 'Ready in 2 hours',
				icon: 'store',
			},
		],
		selectedOption: 'pickup',
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const selectedFulfillment = cartData.fulfillmentOptions.find(
		(o) => o.id === cartData.selectedOption,
	);
	const fulfillmentCost = selectedFulfillment?.price || 0;
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
							<div className="mt-4">
								<FulfillmentSelector
									label={cartData.fulfillmentLabel}
									options={cartData.fulfillmentOptions}
									selected={cartData.selectedOption}
								/>
							</div>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							fulfillmentCost={fulfillmentCost}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
