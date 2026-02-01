import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, X, ArrowRight, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	size: 'small' | 'medium' | 'large';
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center gap-3">
		<ShoppingBag className="size-6 text-primary" />
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary">{count}</Badge>
	</div>
);

const ItemImage = ({
	src,
	alt,
	size,
}: {
	src: string;
	alt: string;
	size: 'small' | 'medium' | 'large';
}) => {
	const aspectClass =
		size === 'large'
			? 'aspect-[4/3]'
			: size === 'medium'
				? 'aspect-square'
				: 'aspect-[3/4]';

	return (
		<div
			className={`relative w-full ${aspectClass} overflow-hidden rounded-t-xl bg-muted`}
		>
			<Image src={src} alt={alt} fill className="object-cover" />
		</div>
	);
};

const ItemInfo = ({ name, variant }: { name: string; variant: string }) => (
	<div>
		<h3 className="font-semibold line-clamp-1">{name}</h3>
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

const ItemPrice = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<p className="text-lg font-bold text-primary">
		${(price * quantity).toFixed(2)}
	</p>
);

const RemoveItem = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="absolute top-2 right-2 size-8 rounded-full bg-background/80 backdrop-blur hover:bg-destructive hover:text-destructive-foreground"
	>
		<X className="size-4" />
	</Button>
);

const MasonryItem = ({ item }: { item: CartItem }) => {
	const spanClass =
		item.size === 'large'
			? '@md:col-span-2 @md:row-span-2'
			: item.size === 'medium'
				? '@md:row-span-2'
				: '';

	return (
		<Card className={`overflow-hidden group ${spanClass}`}>
			<div className="relative">
				<ItemImage src={item.image} alt={item.name} size={item.size} />
				<RemoveItem />
			</div>
			<CardContent className="p-4 space-y-3">
				<ItemInfo name={item.name} variant={item.variant} />
				<div className="flex items-center justify-between">
					<QuantityControl quantity={item.quantity} />
					<ItemPrice price={item.price} quantity={item.quantity} />
				</div>
			</CardContent>
		</Card>
	);
};

const SummaryLine = ({
	label,
	value,
	bold,
}: {
	label: string;
	value: string;
	bold?: boolean;
}) => (
	<div
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
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
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
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
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
			name: 'Premium Headphones',
			variant: 'Midnight Black',
			price: 349.99,
			quantity: 1,
			size: 'large',
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
			size: 'medium',
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=267&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
			size: 'small',
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=267&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White',
			price: 179.99,
			quantity: 2,
			size: 'small',
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=300&h=300&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy Pattern',
			price: 89.99,
			quantity: 1,
			size: 'medium',
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

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<div className="grid grid-cols-2 @md:grid-cols-3 gap-4 auto-rows-auto">
							{items.map((item) => (
								<MasonryItem key={item.id} item={item} />
							))}
						</div>
					</div>

					<div>
						<OrderSummary
							title="Order Summary"
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
