import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Lock, Truck } from 'lucide-react';
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

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-xl bg-muted @sm:size-24">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemPrice = ({ price, quantity }: { price: number; quantity: number }) => (
	<div className="text-right">
		<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
		{quantity > 1 && <p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>}
	</div>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<X className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex items-center gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex flex-1 flex-col gap-3 @sm:flex-row @sm:items-center @sm:justify-between">
			<ItemInfo name={item.name} variant={item.variant} />
			<div className="flex items-center gap-4">
				<QuantityControl quantity={item.quantity} />
				<ItemPrice price={item.price} quantity={item.quantity} />
				<RemoveItem />
			</div>
		</div>
	</div>
);

const ShippingBanner = ({ icon: Icon, text }: { icon: React.ComponentType<{ className?: string }>; text: string }) => (
	<div className="flex items-center gap-2 rounded-lg bg-green-500/10 p-3 text-sm text-green-600">
		<Icon className="size-4" />
		<span>{text}</span>
	</div>
);

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const SecureBadge = ({ text }: { text: string }) => (
	<div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
		<Lock className="size-3" />
		{text}
	</div>
);

const StickyOrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b @lg:relative @lg:border-b-0 @lg:bg-transparent @lg:backdrop-blur-none">
		<Card className="shadow-lg rounded-none @lg:rounded-xl @lg:shadow-md">
			<CardHeader className="py-4 @lg:py-6">
				<CardTitle>{title}</CardTitle>
			</CardHeader>
			<CardContent className="py-0 space-y-3">
				{lines.map((line, i) => (
					<div key={i}>
						{line.bold && <Separator className="my-3" />}
						<SummaryLine {...line} />
					</div>
				))}
			</CardContent>
			<CardFooter className="flex-col gap-4 py-4 @lg:py-6">
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href={checkoutHref}>
						{checkoutLabel}
						<ArrowRight className="size-4" />
					</Link>
				</Button>
				<SecureBadge text="Secure 256-bit encryption" />
			</CardFooter>
		</Card>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Premium Running Shoes',
			variant: 'Red/Black • US 10',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Headphones',
			variant: 'Midnight Black',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Timepiece',
			variant: 'Silver • Leather',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy Pattern',
			price: 89.99,
			quantity: 2,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${tax.toFixed(2)}` },
		{ label: 'Total', value: `$${total.toFixed(2)}`, bold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl">
				<div className="grid @lg:grid-cols-5">
					{/* Sticky Summary (top on mobile, right sidebar on desktop) */}
					<div className="order-1 @lg:order-2 @lg:col-span-2">
						<StickyOrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>

					{/* Cart items */}
					<div className="order-2 @lg:order-1 @lg:col-span-3 px-4 py-6 @lg:py-12">
						<PageHeader title="Your Cart" count={items.length} />

						<div className="mt-4">
							<ShippingBanner icon={Truck} text="You qualify for free shipping!" />
						</div>

						<div className="mt-6 divide-y">
							{items.map((item) => (
								<CartItemRow key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
