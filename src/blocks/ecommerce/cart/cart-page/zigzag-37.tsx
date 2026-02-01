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
import { Minus, Plus, X, ArrowRight, Zap } from 'lucide-react';
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
			<Zap className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full overflow-hidden rounded-xl bg-muted @md:w-48 @md:shrink-0">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ItemDetails = ({
	name,
	variant,
	price,
}: {
	name: string;
	variant: string;
	price: number;
}) => (
	<div className="space-y-2">
		<h3 className="font-semibold text-lg">{name}</h3>
		<p className="text-muted-foreground">{variant}</p>
		<p className="text-xl font-bold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-xl border-2">
		<Button size="icon" variant="ghost" className="size-10">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-medium">{quantity}</span>
		<Button size="icon" variant="ghost" className="size-10">
			<Plus className="size-4" />
		</Button>
	</div>
);

const ItemTotal = ({
	price,
	quantity,
}: {
	price: number;
	quantity: number;
}) => (
	<div className="text-right">
		<p className="text-sm text-muted-foreground">Total</p>
		<p className="text-2xl font-bold">${(price * quantity).toFixed(2)}</p>
	</div>
);

const RemoveButton = ({ label }: { label: string }) => (
	<Button
		variant="ghost"
		size="sm"
		className="gap-1 text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
		{label}
	</Button>
);

const ZigzagItemLeft = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0 flex flex-col @md:flex-row">
			<ItemImage src={item.image} alt={item.name} />
			<div className="flex-1 p-6 flex flex-col justify-between">
				<div className="flex items-start justify-between">
					<ItemDetails
						name={item.name}
						variant={item.variant}
						price={item.price}
					/>
					<RemoveButton label="Remove" />
				</div>
				<div className="flex items-center justify-between mt-4">
					<QuantityControl quantity={item.quantity} />
					<ItemTotal price={item.price} quantity={item.quantity} />
				</div>
			</div>
		</CardContent>
	</Card>
);

const ZigzagItemRight = ({ item }: { item: CartItem }) => (
	<Card className="overflow-hidden">
		<CardContent className="p-0 flex flex-col @md:flex-row-reverse">
			<ItemImage src={item.image} alt={item.name} />
			<div className="flex-1 p-6 flex flex-col justify-between @md:text-right">
				<div className="flex items-start justify-between @md:flex-row-reverse">
					<ItemDetails
						name={item.name}
						variant={item.variant}
						price={item.price}
					/>
					<RemoveButton label="Remove" />
				</div>
				<div className="flex items-center justify-between @md:flex-row-reverse mt-4">
					<QuantityControl quantity={item.quantity} />
					<ItemTotal price={item.price} quantity={item.quantity} />
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
	<Card className="max-w-2xl mx-auto mt-8">
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
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
			name: 'Premium Running Shoes',
			variant: 'Red/Black • US 10',
			price: 179.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Studio Headphones',
			variant: 'Midnight Black • Wireless',
			price: 349.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather Band',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=300&h=300&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • Active Noise Cancellation',
			price: 199.99,
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
			<div className="mx-auto max-w-4xl px-4 py-8 @md:py-12">
				<PageHeader title="Your Cart" count={items.length} />

				<div className="mt-8 space-y-6">
					{items.map((item, i) =>
						i % 2 === 0 ? (
							<ZigzagItemLeft key={item.id} item={item} />
						) : (
							<ZigzagItemRight key={item.id} item={item} />
						),
					)}
				</div>

				<OrderSummary
					title="Order Summary"
					lines={summaryLines}
					checkoutLabel="Proceed to Checkout"
					checkoutHref="/checkout"
				/>
			</div>
		</section>
	);
}
