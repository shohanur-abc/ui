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
import { Minus, Plus, X, ShoppingCart, ArrowRight, Lock } from 'lucide-react';
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

const PageTitle = ({ text, subtitle }: { text: string; subtitle: string }) => (
	<div className="text-center">
		<h1 className="text-2xl font-bold @md:text-3xl">{text}</h1>
		<p className="mt-1 text-muted-foreground">{subtitle}</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-24">
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
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-1">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
		<p className="mt-1 font-semibold">${price.toFixed(2)}</p>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-8">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RemoveButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 flex flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<ItemDetails
					name={item.name}
					variant={item.variant}
					price={item.price}
				/>
				<RemoveButton />
			</div>
			<div className="flex items-center justify-between">
				<QuantitySelector quantity={item.quantity} />
				<p className="font-semibold">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
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
	<div
		className={`flex justify-between ${bold ? 'text-lg font-bold' : 'text-muted-foreground'}`}
	>
		<span className={bold ? '' : ''}>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const SecureCheckout = ({ label }: { label: string }) => (
	<div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
		<Lock className="size-3" />
		{label}
	</div>
);

const FloatingSummary = ({
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	lines: { label: string; value: string; bold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<div className="fixed bottom-0 left-0 right-0 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-4 @md:relative @md:border-t-0 @md:bg-transparent @md:backdrop-blur-none @md:p-0">
		<Card className="shadow-lg @md:sticky @md:top-4 @md:shadow-md">
			<CardHeader className="hidden @md:block">
				<CardTitle>Summary</CardTitle>
			</CardHeader>
			<CardContent className="space-y-3 py-4 @md:py-0">
				<div className="hidden @md:block space-y-2">
					{lines.slice(0, -1).map((line, i) => (
						<SummaryLine key={i} {...line} />
					))}
					<Separator className="my-3" />
				</div>
				<SummaryLine {...lines[lines.length - 1]} />
			</CardContent>
			<CardFooter className="flex-col gap-3 pt-0 @md:pt-4">
				<Button className="w-full gap-2" size="lg" asChild>
					<Link href={checkoutHref}>
						<ShoppingCart className="size-4" />
						{checkoutLabel}
						<ArrowRight className="size-4" />
					</Link>
				</Button>
				<SecureCheckout label="Secure 256-bit SSL encryption" />
			</CardFooter>
		</Card>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes',
			variant: 'Red • Size 10',
			price: 129.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Gold • Leather',
			price: 249.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=200&h=200&fit=crop',
			name: 'Phone Case',
			variant: 'Clear • iPhone 15',
			price: 29.99,
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
			<div className="mx-auto max-w-6xl px-4 py-8 pb-40 @md:pb-8 @md:py-12">
				<PageTitle
					text="Your Cart"
					subtitle="Review your items before checkout"
				/>

				<div className="mt-8 grid gap-8 @md:grid-cols-5">
					<div className="divide-y @md:col-span-3">
						{items.map((item) => (
							<CartItemRow key={item.id} item={item} />
						))}
					</div>

					<div className="@md:col-span-2">
						<FloatingSummary
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
