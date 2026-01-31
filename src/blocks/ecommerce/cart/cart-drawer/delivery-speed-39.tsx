'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet';
import { Box, CalendarDays, Clock, Minus, Plus, Rocket, ShoppingBag, X, Zap } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity: number;
}

interface SpeedOption {
	id: string;
	label: string;
	description: string;
	deliveryDate: string;
	price: number;
	icon: 'standard' | 'express' | 'same-day' | 'scheduled';
}

interface CartDrawerProps {
	title: string;
	speedLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	speedOptions: SpeedOption[];
	selectedSpeed: string;
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

const SpeedIcon = ({ type }: { type: string }) => {
	switch (type) {
		case 'express':
			return <Zap className="size-5" />;
		case 'same-day':
			return <Rocket className="size-5" />;
		case 'scheduled':
			return <CalendarDays className="size-5" />;
		default:
			return <Box className="size-5" />;
	}
};

const DeliverySpeedSelector = ({
	label,
	options,
	selected,
}: {
	label: string;
	options: SpeedOption[];
	selected: string;
}) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Clock className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<RadioGroup defaultValue={selected} className="space-y-2">
			{options.map((option) => (
				<div
					key={option.id}
					className={`relative flex cursor-pointer items-start gap-4 rounded-xl border-2 p-4 transition-all ${
						option.id === selected
							? 'border-primary bg-primary/5'
							: 'border-border hover:border-muted-foreground/50'
					}`}
				>
					<RadioGroupItem value={option.id} id={option.id} className="mt-0.5" />
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
							option.id === selected
								? 'bg-primary text-primary-foreground'
								: 'bg-muted text-muted-foreground'
						}`}
					>
						<SpeedIcon type={option.icon} />
					</div>
					<div className="flex-1">
						<div className="flex items-center gap-2">
							<label htmlFor={option.id} className="font-medium cursor-pointer">
								{option.label}
							</label>
							{option.icon === 'same-day' && (
								<Badge className="text-[10px]">Fastest</Badge>
							)}
						</div>
						<p className="text-sm text-muted-foreground">{option.description}</p>
						<Badge variant="outline" className="mt-2">
							{option.deliveryDate}
						</Badge>
					</div>
					<span className="font-medium">
						{option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
					</span>
				</div>
			))}
		</RadioGroup>
	</div>
);

const Summary = ({
	subtotal,
	shippingCost,
	checkoutLabel,
}: {
	subtotal: number;
	shippingCost: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>${subtotal.toFixed(2)}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Shipping</span>
			<span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(subtotal + shippingCost).toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			<Rocket className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		speedLabel: 'Delivery Speed',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
				name: 'Smart Watch Pro',
				price: 349.99,
				quantity: 1,
			},
			{
				id: '2',
				image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				price: 199.99,
				quantity: 1,
			},
		],
		speedOptions: [
			{
				id: 'standard',
				label: 'Standard Shipping',
				description: 'Reliable delivery for everyday needs',
				deliveryDate: 'Dec 15-18',
				price: 0,
				icon: 'standard',
			},
			{
				id: 'express',
				label: 'Express Shipping',
				description: 'Fast delivery for urgent orders',
				deliveryDate: 'Dec 12-13',
				price: 9.99,
				icon: 'express',
			},
			{
				id: 'same-day',
				label: 'Same Day Delivery',
				description: 'Get it today before 8 PM',
				deliveryDate: 'Today',
				price: 19.99,
				icon: 'same-day',
			},
			{
				id: 'scheduled',
				label: 'Scheduled Delivery',
				description: 'Choose your preferred date',
				deliveryDate: 'Select date',
				price: 4.99,
				icon: 'scheduled',
			},
		],
		selectedSpeed: 'express',
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shippingCost =
		cartData.speedOptions.find((o) => o.id === cartData.selectedSpeed)?.price || 0;
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
								<DeliverySpeedSelector
									label={cartData.speedLabel}
									options={cartData.speedOptions}
									selected={cartData.selectedSpeed}
								/>
							</div>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							shippingCost={shippingCost}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
