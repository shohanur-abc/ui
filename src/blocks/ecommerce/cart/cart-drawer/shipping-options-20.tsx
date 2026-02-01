'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
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
import { Minus, Package, Plus, ShoppingBag, X } from 'lucide-react';
import Image from 'next/image';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface ShippingOption {
	id: string;
	name: string;
	description: string;
	price: number;
	days: string;
}

interface CartDrawerProps {
	title: string;
	shippingTitle: string;
	insuranceLabel: string;
	insurancePrice: number;
	checkoutLabel: string;
	items: CartItem[];
	shippingOptions: ShippingOption[];
}

const CartBadge = ({ count }: { count: number }) => (
	<Button variant="outline" size="icon" className="relative">
		<ShoppingBag className="size-4" />
		{count > 0 && (
			<Badge className="absolute -right-2 -top-2 size-5 rounded-full p-0 text-[10px]">
				{count}
			</Badge>
		)}
	</Button>
);

const CartItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3">
		<div className="relative size-14 shrink-0 overflow-hidden rounded-md bg-muted">
			<Image src={item.image} alt={item.name} fill className="object-cover" />
		</div>
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="truncate text-sm font-medium">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
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

const ShippingRadio = ({
	title,
	options,
}: {
	title: string;
	options: ShippingOption[];
}) => (
	<div className="space-y-3">
		<h3 className="flex items-center gap-2 text-sm font-medium">
			<Package className="size-4" />
			{title}
		</h3>
		<RadioGroup defaultValue={options[0].id} className="space-y-2">
			{options.map((option) => (
				<Label
					key={option.id}
					htmlFor={option.id}
					className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5"
				>
					<div className="flex items-center gap-3">
						<RadioGroupItem value={option.id} id={option.id} />
						<div>
							<p className="text-sm font-medium">{option.name}</p>
							<p className="text-xs text-muted-foreground">{option.days}</p>
						</div>
					</div>
					<span className="text-sm font-medium">
						{option.price === 0 ? 'Free' : `$${option.price.toFixed(2)}`}
					</span>
				</Label>
			))}
		</RadioGroup>
	</div>
);

const InsuranceOption = ({
	label,
	price,
}: {
	label: string;
	price: number;
}) => (
	<Label className="flex cursor-pointer items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-muted/50 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-primary/5">
		<div className="flex items-center gap-3">
			<Checkbox id="insurance" />
			<span className="text-sm">{label}</span>
		</div>
		<span className="text-sm font-medium">+${price.toFixed(2)}</span>
	</Label>
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
			<span className="text-muted-foreground">Shipping</span>
			<span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
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
		shippingTitle: 'Shipping Method',
		insuranceLabel: 'Add shipping insurance',
		insurancePrice: 4.99,
		checkoutLabel: 'Continue to Payment',
		items: [
			{
				id: '1',
				image:
					'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
				name: 'Wireless Earbuds',
				variant: 'White',
				price: 129.99,
				quantity: 1,
			},
			{
				id: '2',
				image:
					'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=200&h=200&fit=crop',
				name: 'Smart Watch',
				variant: 'Black / 44mm',
				price: 399.99,
				quantity: 1,
			},
		],
		shippingOptions: [
			{
				id: 'standard',
				name: 'Standard Shipping',
				description: 'Free shipping on orders over $50',
				price: 0,
				days: '5-7 business days',
			},
			{
				id: 'express',
				name: 'Express Shipping',
				description: 'Fast delivery',
				price: 9.99,
				days: '2-3 business days',
			},
			{
				id: 'overnight',
				name: 'Overnight',
				description: 'Next business day',
				price: 19.99,
				days: '1 business day',
			},
		],
	};

	const subtotal = cartData.items.reduce(
		(sum, item) => sum + item.price * item.quantity,
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
						<CartBadge count={itemCount} />
					</SheetTrigger>
					<SheetContent className="flex w-full flex-col sm:max-w-md">
						<SheetHeader>
							<SheetTitle>{cartData.title}</SheetTitle>
						</SheetHeader>
						<ScrollArea className="flex-1 -mx-6 px-6">
							<div className="divide-y divide-border">
								{cartData.items.map((item) => (
									<CartItem key={item.id} item={item} />
								))}
							</div>
							<Separator className="my-4" />
							<ShippingRadio
								title={cartData.shippingTitle}
								options={cartData.shippingOptions}
							/>
							<div className="mt-4">
								<InsuranceOption
									label={cartData.insuranceLabel}
									price={cartData.insurancePrice}
								/>
							</div>
						</ScrollArea>
						<Summary
							subtotal={subtotal}
							shipping={0}
							checkoutLabel={cartData.checkoutLabel}
						/>
					</SheetContent>
				</Sheet>
			</div>
		</section>
	);
}
