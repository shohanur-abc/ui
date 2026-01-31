'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, Trash2, ChevronDown, Store, Truck, MapPin, CreditCard } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
}

interface Seller {
	id: string;
	name: string;
	items: CartItem[];
	shippingCost: number;
}

const SellerHeader = ({
	name,
	itemCount,
	shippingCost,
}: {
	name: string;
	itemCount: number;
	shippingCost: number;
}) => (
	<div className="flex items-center justify-between w-full py-4">
		<div className="flex items-center gap-3">
			<div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
				<Store className="size-5 text-primary" />
			</div>
			<div>
				<h3 className="font-semibold">{name}</h3>
				<p className="text-sm text-muted-foreground">{itemCount} items</p>
			</div>
		</div>
		<div className="flex items-center gap-4">
			<Badge variant="outline" className="gap-1">
				<Truck className="size-3" />
				{shippingCost > 0 ? `$${shippingCost.toFixed(2)}` : 'Free'}
			</Badge>
			<ChevronDown className="size-5 text-muted-foreground transition-transform group-data-[state=open]:rotate-180" />
		</div>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant, price }: { name: string; variant: string; price: number }) => (
	<div className="min-w-0 flex-1">
		<h4 className="font-medium text-sm line-clamp-1">{name}</h4>
		<p className="text-xs text-muted-foreground">{variant}</p>
		<p className="mt-1 font-semibold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityInput = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded border bg-background">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RemoveIcon = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<Trash2 className="size-4" />
	</Button>
);

const SellerItem = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-3 py-3">
		<ItemImage src={item.image} alt={item.name} />
		<ItemInfo name={item.name} variant={item.variant} price={item.price} />
		<div className="flex items-center gap-3">
			<QuantityInput quantity={item.quantity} />
			<RemoveIcon />
		</div>
	</div>
);

const SellerCard = ({ seller }: { seller: Seller }) => (
	<Card className="overflow-hidden">
		<Collapsible defaultOpen className="group">
			<CollapsibleTrigger asChild>
				<button type="button" className="w-full px-4 hover:bg-muted/50 transition-colors">
					<SellerHeader
						name={seller.name}
						itemCount={seller.items.length}
						shippingCost={seller.shippingCost}
					/>
				</button>
			</CollapsibleTrigger>
			<CollapsibleContent>
				<Separator />
				<CardContent className="divide-y p-4">
					{seller.items.map((item) => (
						<SellerItem key={item.id} item={item} />
					))}
				</CardContent>
			</CollapsibleContent>
		</Collapsible>
	</Card>
);

const SummaryEntry = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'highlight' | 'success';
}) => (
	<div className={`flex justify-between ${variant === 'highlight' ? 'text-lg font-bold' : ''}`}>
		<span className={variant === 'highlight' ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				variant === 'highlight'
					? 'text-primary'
					: variant === 'success'
						? 'text-green-500'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const DeliveryOption = ({
	icon: Icon,
	title,
	description,
	selected,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	selected?: boolean;
}) => (
	<button
		type="button"
		className={`flex items-start gap-3 rounded-lg border p-4 text-left transition-colors w-full ${
			selected ? 'border-primary bg-primary/5' : 'hover:border-primary/50'
		}`}
	>
		<Icon className={`size-5 shrink-0 ${selected ? 'text-primary' : 'text-muted-foreground'}`} />
		<div>
			<p className="font-medium">{title}</p>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
	</button>
);

const OrderPanel = ({
	subtotal,
	shipping,
	tax,
	total,
	checkoutLabel,
	checkoutHref,
}: {
	subtotal: number;
	shipping: number;
	tax: number;
	total: number;
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardContent className="p-6 space-y-6">
			<h2 className="font-semibold text-lg">Delivery Options</h2>

			<div className="space-y-3">
				<DeliveryOption
					icon={Truck}
					title="Standard Delivery"
					description="3-5 business days"
					selected
				/>
				<DeliveryOption
					icon={MapPin}
					title="Pickup in Store"
					description="Ready in 2 hours"
				/>
			</div>

			<Separator />

			<div className="space-y-3">
				<h2 className="font-semibold text-lg">Order Summary</h2>
				<SummaryEntry label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
				<SummaryEntry
					label="Shipping"
					value={shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}
					variant={shipping === 0 ? 'success' : 'default'}
				/>
				<SummaryEntry label="Tax" value={`$${tax.toFixed(2)}`} />
				<Separator />
				<SummaryEntry label="Total" value={`$${total.toFixed(2)}`} variant="highlight" />
			</div>

			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					<CreditCard className="size-4" />
					{checkoutLabel}
				</Link>
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const sellers: Seller[] = [
		{
			id: '1',
			name: 'TechZone Electronics',
			shippingCost: 0,
			items: [
				{
					id: '1a',
					image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=150&h=150&fit=crop',
					name: 'Wireless Gaming Mouse',
					variant: 'RGB / Black',
					price: 79.99,
					quantity: 1,
				},
				{
					id: '1b',
					image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=150&h=150&fit=crop',
					name: 'Mechanical Keyboard TKL',
					variant: 'Blue Switches',
					price: 149.99,
					quantity: 1,
				},
			],
		},
		{
			id: '2',
			name: 'Home & Living Co.',
			shippingCost: 12.99,
			items: [
				{
					id: '2a',
					image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=150&h=150&fit=crop',
					name: 'Modern Table Lamp',
					variant: 'Brass / White Shade',
					price: 89.99,
					quantity: 2,
				},
			],
		},
		{
			id: '3',
			name: 'Fashion Forward',
			shippingCost: 5.99,
			items: [
				{
					id: '3a',
					image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&h=150&fit=crop',
					name: 'Oversized Denim Jacket',
					variant: 'Size: L / Washed Blue',
					price: 129.99,
					quantity: 1,
				},
			],
		},
	];

	const subtotal = sellers.flatMap((s) => s.items).reduce((sum, i) => sum + i.price * i.quantity, 0);
	const shipping = sellers.reduce((sum, s) => sum + s.shippingCost, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + shipping + tax;

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between">
					<h1 className="text-2xl font-bold @md:text-3xl">Shopping Cart</h1>
					<p className="text-muted-foreground">
						{sellers.length} sellers • {sellers.flatMap((s) => s.items).length} items
					</p>
				</div>

				<div className="mt-8 grid gap-8 @xl:grid-cols-3">
					<div className="space-y-4 @xl:col-span-2">
						{sellers.map((seller) => (
							<SellerCard key={seller.id} seller={seller} />
						))}
					</div>

					<div>
						<OrderPanel
							subtotal={subtotal}
							shipping={shipping}
							tax={tax}
							total={total}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
