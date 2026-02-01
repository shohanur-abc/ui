import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Minus, Plus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	quantity: number;
	inStock: boolean;
}

interface SummaryLine {
	label: string;
	value: string;
	highlight?: boolean;
}

const PageHeader = ({
	title,
	itemCount,
}: {
	title: string;
	itemCount: number;
}) => (
	<div className="flex items-center justify-between">
		<div className="flex items-center gap-3">
			<ShoppingBag className="size-6 text-primary" />
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		</div>
		<Badge variant="secondary" className="text-sm">
			{itemCount} items
		</Badge>
	</div>
);

const CartItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted @sm:size-24">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const CartItemDetails = ({
	name,
	variant,
	inStock,
}: {
	name: string;
	variant: string;
	inStock: boolean;
}) => (
	<div className="min-w-0 flex-1 space-y-1">
		<h3 className="truncate font-medium">{name}</h3>
		<p className="text-sm text-muted-foreground">{variant}</p>
		<Badge variant={inStock ? 'outline' : 'destructive'} className="text-xs">
			{inStock ? 'In Stock' : 'Low Stock'}
		</Badge>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-1 rounded-md border bg-muted/50 p-0.5">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
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
	<div className="text-right">
		<p className="font-semibold">${(price * quantity).toFixed(2)}</p>
		<p className="text-xs text-muted-foreground">${price.toFixed(2)} each</p>
	</div>
);

const RemoveItemButton = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<Trash2 className="size-4" />
	</Button>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<CartItemImage src={item.image} alt={item.name} />
		<div className="flex min-w-0 flex-1 flex-col gap-3">
			<div className="flex items-start justify-between gap-2">
				<CartItemDetails
					name={item.name}
					variant={item.variant}
					inStock={item.inStock}
				/>
				<RemoveItemButton />
			</div>
			<div className="flex items-center justify-between gap-2">
				<QuantitySelector quantity={item.quantity} />
				<ItemPrice price={item.price} quantity={item.quantity} />
			</div>
		</div>
	</div>
);

const SummaryRow = ({ label, value, highlight }: SummaryLine) => (
	<div
		className={`flex justify-between ${highlight ? 'text-lg font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={highlight ? 'text-primary' : ''}>{value}</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: SummaryLine[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{lines.map((line, i) => (
				<div key={i}>
					{line.highlight && <Separator className="my-4" />}
					<SummaryRow {...line} />
				</div>
			))}
			<Button className="mt-6 w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

const EmptyCart = ({
	message,
	ctaLabel,
	ctaHref,
}: {
	message: string;
	ctaLabel: string;
	ctaHref: string;
}) => (
	<div className="flex flex-col items-center justify-center py-16 text-center">
		<ShoppingBag className="mb-4 size-16 text-muted-foreground/50" />
		<p className="mb-6 text-lg text-muted-foreground">{message}</p>
		<Button asChild>
			<Link href={ctaHref}>{ctaLabel}</Link>
		</Button>
	</div>
);

export default function Main() {
	const cartItems: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Premium Running Sneakers',
			variant: 'Size: 10 / Color: Red',
			price: 189.99,
			quantity: 1,
			inStock: true,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Wristwatch',
			variant: 'Band: Leather / Gold',
			price: 299.99,
			quantity: 1,
			inStock: true,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Noise-Canceling Headphones',
			variant: 'Color: Matte Black',
			price: 349.99,
			quantity: 2,
			inStock: false,
		},
	];

	const summaryLines: SummaryLine[] = [
		{ label: 'Subtotal', value: '$1,189.96' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$95.20' },
		{ label: 'Total', value: '$1,295.15', highlight: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Shopping Cart" itemCount={cartItems.length} />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Card>
							<CardContent className="divide-y p-4 @sm:p-6">
								{cartItems.length > 0 ? (
									cartItems.map((item) => (
										<CartItemRow key={item.id} item={item} />
									))
								) : (
									<EmptyCart
										message="Your cart is empty"
										ctaLabel="Continue Shopping"
										ctaHref="/products"
									/>
								)}
							</CardContent>
						</Card>
					</div>

					<div>
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
