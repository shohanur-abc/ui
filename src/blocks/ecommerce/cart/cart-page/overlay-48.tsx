import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag, Eye, Truck, Shield, CreditCard } from 'lucide-react';
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
		<div className="flex items-center gap-3">
			<ShoppingBag className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">{count} items</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted group-hover:ring-2 ring-primary/30 transition-all">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border bg-background">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const OverlayItem = ({ item }: { item: CartItem }) => (
	<Card className="group overflow-hidden">
		<CardContent className="p-3 relative">
			<ItemImage src={item.image} alt={item.name} />

			{/* Hover overlay */}
			<div className="absolute inset-3 bg-background/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-3">
				<Button size="sm" variant="secondary" className="gap-1">
					<Eye className="size-3" />
					Quick view
				</Button>
				<Button
					size="sm"
					variant="ghost"
					className="gap-1 text-destructive hover:text-destructive"
				>
					<X className="size-3" />
					Remove
				</Button>
			</div>

			<div className="mt-3 space-y-2">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<h3 className="font-semibold text-sm line-clamp-1">{item.name}</h3>
						<p className="text-xs text-muted-foreground">{item.variant}</p>
					</div>
				</div>
				<div className="flex items-center justify-between">
					<QuantityControl quantity={item.quantity} />
					<p className="font-bold text-primary">${(item.price * item.quantity).toFixed(2)}</p>
				</div>
			</div>
		</CardContent>
	</Card>
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

const TrustBadge = ({
	icon: Icon,
	label,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{label}</span>
	</div>
);

const OrderSummary = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>Order Summary</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<div className="space-y-3">
				{lines.map((line, i) => (
					<div key={i}>
						{line.bold && <Separator className="my-3" />}
						<SummaryLine {...line} />
					</div>
				))}
			</div>

			<Separator />

			<div className="space-y-2">
				<TrustBadge icon={Truck} label="Free shipping on orders $100+" />
				<TrustBadge icon={Shield} label="30-day return policy" />
				<TrustBadge icon={CreditCard} label="Secure SSL checkout" />
			</div>
		</CardContent>
		<CardFooter>
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			quantity: 2,
		},
		{
			id: '5',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy pattern',
			price: 89.99,
			quantity: 1,
		},
		{
			id: '6',
			image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop',
			name: 'Leather Bag',
			variant: 'Brown',
			price: 329.99,
			quantity: 1,
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
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-4">
					<div className="@lg:col-span-3">
						<div className="grid grid-cols-2 @md:grid-cols-3 gap-4">
							{items.map((item) => (
								<OverlayItem key={item.id} item={item} />
							))}
						</div>
					</div>

					<div>
						<OrderSummary
							lines={summaryLines}
							checkoutLabel="Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
