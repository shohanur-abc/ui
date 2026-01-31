import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, Layers, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	layer: 'front' | 'middle' | 'back';
}

const PageHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="flex items-center gap-3">
		<div className="rounded-xl bg-primary/10 p-2.5">
			<Layers className="size-6 text-primary" />
		</div>
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{subtitle}</p>
		</div>
	</div>
);

const LayerHeader = ({ label, count }: { label: string; count: number }) => (
	<div className="flex items-center gap-2 mb-4">
		<h2 className="text-lg font-semibold">{label}</h2>
		<Badge variant="secondary">{count}</Badge>
	</div>
);

const ItemThumb = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemDetails = ({ name, variant, price }: { name: string; variant: string; price: number }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
		<p className="font-semibold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RemoveItem = () => (
	<Button size="icon-sm" variant="ghost" className="text-muted-foreground hover:text-destructive">
		<X className="size-4" />
	</Button>
);

const LayerCard = ({
	className,
	item,
}: {
	className?: string;
	item: CartItem;
}) => (
	<Card className={`transition-all hover:shadow-lg ${className}`}>
		<CardContent className="flex items-center gap-4 p-4">
			<ItemThumb src={item.image} alt={item.name} />
			<ItemDetails name={item.name} variant={item.variant} price={item.price} />
			<div className="flex items-center gap-3">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold w-16 text-right">${(item.price * item.quantity).toFixed(2)}</p>
				<RemoveItem />
			</div>
		</CardContent>
	</Card>
);

const LayerGroup = ({
	label,
	items,
	offset,
}: {
	label: string;
	items: CartItem[];
	offset: number;
}) => (
	<div className="relative" style={{ marginTop: offset ? -offset * 4 : 0, zIndex: 30 - offset * 10 }}>
		<LayerHeader label={label} count={items.length} />
		<div className="space-y-3">
			{items.map((item, i) => (
				<LayerCard
					key={item.id}
					item={item}
					className={offset > 0 ? 'opacity-90' : ''}
				/>
			))}
		</div>
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

const OrderSummary = ({
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
	<Card className="sticky top-4 z-50 shadow-xl">
		<CardHeader>
			<CardTitle className="flex items-center gap-2">
				<ShoppingBag className="size-5" />
				{title}
			</CardTitle>
		</CardHeader>
		<CardContent className="space-y-3">
			{lines.map((line, i) => (
				<div key={i}>
					{line.bold && <Separator className="my-3" />}
					<SummaryLine {...line} />
				</div>
			))}
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
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			name: 'Premium Running Shoes',
			variant: 'Red/Black • US 10',
			price: 179.99,
			quantity: 1,
			layer: 'front',
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
			name: 'Wireless Headphones',
			variant: 'Midnight Black',
			price: 249.99,
			quantity: 1,
			layer: 'front',
		},
		{
			id: '3',
			image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 199.99,
			quantity: 1,
			layer: 'middle',
		},
		{
			id: '4',
			image: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy Pattern',
			price: 89.99,
			quantity: 2,
			layer: 'back',
		},
	];

	const frontItems = items.filter((i) => i.layer === 'front');
	const middleItems = items.filter((i) => i.layer === 'middle');
	const backItems = items.filter((i) => i.layer === 'back');

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
				<PageHeader title="Your Cart" subtitle="Items organized by priority" />

				<div className="mt-8 grid gap-8 @lg:grid-cols-5">
					<div className="@lg:col-span-3 space-y-8">
						{frontItems.length > 0 && (
							<LayerGroup label="Ready to Ship" items={frontItems} offset={0} />
						)}
						{middleItems.length > 0 && (
							<LayerGroup label="Processing" items={middleItems} offset={1} />
						)}
						{backItems.length > 0 && (
							<LayerGroup label="Pre-Order" items={backItems} offset={2} />
						)}
					</div>

					<div className="@lg:col-span-2">
						<OrderSummary
							title="Summary"
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
