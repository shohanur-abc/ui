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
	Building2,
	ChevronDown,
	Globe,
	Minus,
	Plus,
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
}

interface Country {
	code: string;
	name: string;
	flag: string;
	shippingCost: number;
	deliveryDays: string;
}

interface CartDrawerProps {
	title: string;
	countryLabel: string;
	addressLabel: string;
	checkoutLabel: string;
	items: CartItem[];
	countries: Country[];
	selectedCountry: string;
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

const CountrySelector = ({
	label,
	countries,
	selected,
}: {
	label: string;
	countries: Country[];
	selected: string;
}) => {
	const selectedCountry = countries.find((c) => c.code === selected);

	return (
		<div className="space-y-3">
			<div className="flex items-center gap-2">
				<Globe className="size-4 text-muted-foreground" />
				<span className="text-sm font-medium">{label}</span>
			</div>
			<Button variant="outline" className="w-full justify-between">
				<span className="flex items-center gap-2">
					<span className="text-lg">{selectedCountry?.flag}</span>
					<span>{selectedCountry?.name}</span>
				</span>
				<ChevronDown className="size-4 text-muted-foreground" />
			</Button>
			{selectedCountry && (
				<div className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2 text-sm">
					<span className="text-muted-foreground">
						Shipping to {selectedCountry.name}
					</span>
					<div className="text-right">
						<span className="font-medium">
							${selectedCountry.shippingCost.toFixed(2)}
						</span>
						<p className="text-xs text-muted-foreground">
							{selectedCountry.deliveryDays}
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

const AddressForm = ({ label }: { label: string }) => (
	<div className="space-y-3">
		<div className="flex items-center gap-2">
			<Building2 className="size-4 text-muted-foreground" />
			<span className="text-sm font-medium">{label}</span>
		</div>
		<div className="space-y-2">
			<Input placeholder="Street address" />
			<div className="grid grid-cols-2 gap-2">
				<Input placeholder="City" />
				<Input placeholder="Postal code" />
			</div>
		</div>
	</div>
);

const Summary = ({
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
			<span className="text-muted-foreground">International Shipping</span>
			<span>${shipping.toFixed(2)}</span>
		</div>
		<Separator />
		<div className="flex justify-between text-lg">
			<span className="font-medium">Total</span>
			<span className="font-bold">${(subtotal + shipping).toFixed(2)}</span>
		</div>
		<Button className="w-full gap-2" size="lg">
			<Globe className="size-4" />
			{checkoutLabel}
		</Button>
	</div>
);

export default function Main() {
	const cartData: CartDrawerProps = {
		title: 'International Cart',
		countryLabel: 'Ship to',
		addressLabel: 'Shipping Address',
		checkoutLabel: 'International Checkout',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
				name: 'Premium Sneakers',
				price: 179.99,
				quantity: 1,
			},
		],
		countries: [
			{
				code: 'US',
				name: 'United States',
				flag: '🇺🇸',
				shippingCost: 0,
				deliveryDays: '3-5 days',
			},
			{
				code: 'UK',
				name: 'United Kingdom',
				flag: '🇬🇧',
				shippingCost: 15.99,
				deliveryDays: '5-7 days',
			},
			{
				code: 'DE',
				name: 'Germany',
				flag: '🇩🇪',
				shippingCost: 18.99,
				deliveryDays: '5-7 days',
			},
			{
				code: 'JP',
				name: 'Japan',
				flag: '🇯🇵',
				shippingCost: 24.99,
				deliveryDays: '7-10 days',
			},
			{
				code: 'AU',
				name: 'Australia',
				flag: '🇦🇺',
				shippingCost: 29.99,
				deliveryDays: '10-14 days',
			},
		],
		selectedCountry: 'UK',
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);
	const shipping =
		cartData.countries.find((c) => c.code === cartData.selectedCountry)
			?.shippingCost || 0;
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
							<SheetTitle className="flex items-center gap-2">
								<Globe className="size-5" />
								{cartData.title}
							</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<ItemRow key={item.id} item={item} />
								))}
							</div>
							<div className="mt-4 space-y-4">
								<CountrySelector
									label={cartData.countryLabel}
									countries={cartData.countries}
									selected={cartData.selectedCountry}
								/>
								<Separator />
								<AddressForm label={cartData.addressLabel} />
							</div>
						</ScrollArea>
						<Summary
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
