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
import {
	Calculator,
	MapPin,
	Minus,
	Plus,
	ShoppingBag,
	Truck,
	X,
} from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	price: number;
	weight: number;
	quantity: number;
}

interface ShippingQuote {
	carrier: string;
	service: string;
	price: number;
	days: string;
}

interface CartDrawerProps {
	title: string;
	zipPlaceholder: string;
	calculateLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	quotes: ShippingQuote[];
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

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.weight} lbs</p>
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
				<span className="text-sm font-medium">
					${(item.price * item.quantity).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const ShippingCalculator = ({
	zipPlaceholder,
	calculateLabel,
}: {
	zipPlaceholder: string;
	calculateLabel: string;
}) => (
	<div className="rounded-lg border border-border p-4">
		<div className="flex items-center gap-2 mb-3">
			<Calculator className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">Calculate Shipping</span>
		</div>
		<div className="flex gap-2">
			<div className="relative flex-1">
				<MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={zipPlaceholder} className="pl-9" />
			</div>
			<Button>{calculateLabel}</Button>
		</div>
	</div>
);

const ShippingQuotes = ({ quotes }: { quotes: ShippingQuote[] }) => (
	<div className="space-y-2">
		<h4 className="flex items-center gap-2 text-sm font-medium">
			<Truck className="size-4" />
			Shipping Options
		</h4>
		<div className="space-y-2">
			{quotes.map((quote, index) => (
				<div
					key={index}
					className={`flex items-center justify-between rounded-lg border p-3 transition-colors cursor-pointer hover:border-primary ${
						index === 0 ? 'border-primary bg-primary/5' : 'border-border'
					}`}
				>
					<div className="flex items-center gap-3">
						<div
							className={`size-4 rounded-full border-2 ${
								index === 0 ? 'border-primary bg-primary' : 'border-border'
							}`}
						>
							{index === 0 && (
								<div className="size-full flex items-center justify-center">
									<div className="size-1.5 rounded-full bg-white" />
								</div>
							)}
						</div>
						<div>
							<p className="text-sm font-medium">
								{quote.carrier} - {quote.service}
							</p>
							<p className="text-xs text-muted-foreground">{quote.days}</p>
						</div>
					</div>
					<span className="font-medium">${quote.price.toFixed(2)}</span>
				</div>
			))}
		</div>
	</div>
);

const CartSummary = ({
	subtotal,
	shipping,
	checkoutLabel,
}: {
	subtotal: number;
	shipping: number;
	checkoutLabel: string;
}) => (
	<div className="space-y-3 border-t border-border pt-4">
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Subtotal</span>
			<span>${subtotal.toFixed(2)}</span>
		</div>
		<div className="flex justify-between text-sm">
			<span className="text-muted-foreground">Shipping</span>
			<span>${shipping.toFixed(2)}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(subtotal + shipping).toFixed(2)}</span>
		</div>
		<Button className="w-full" size="lg">
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'Your Cart',
		zipPlaceholder: 'Enter ZIP code',
		calculateLabel: 'Calculate',
		checkoutLabel: 'Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
				name: 'Premium Headphones',
				price: 249.99,
				weight: 0.8,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
				name: 'Phone Stand',
				price: 39.99,
				weight: 0.3,
				quantity: 2,
			},
		],
		quotes: [
			{
				carrier: 'UPS',
				service: 'Ground',
				price: 9.99,
				days: '5-7 business days',
			},
			{
				carrier: 'FedEx',
				service: 'Express',
				price: 19.99,
				days: '2-3 business days',
			},
			{
				carrier: 'USPS',
				service: 'Priority',
				price: 14.99,
				days: '3-5 business days',
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shipping = cartData.quotes[0]?.price || 0;
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
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<CartItemRow key={item.id} item={item} />
								))}
							</div>
							<div className="mt-4 space-y-4">
								<ShippingCalculator
									zipPlaceholder={cartData.zipPlaceholder}
									calculateLabel={cartData.calculateLabel}
								/>
								<ShippingQuotes quotes={cartData.quotes} />
							</div>
						</ScrollArea>
						<CartSummary
							subtotal={subtotal}
							shipping={shipping}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
