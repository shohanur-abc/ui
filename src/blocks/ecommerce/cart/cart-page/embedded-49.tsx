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
import { Minus, Plus, X, ArrowRight, Box, ShoppingCart } from 'lucide-react';
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

const ContentBlock = ({
	children,
	title,
}: {
	children: React.ReactNode;
	title?: string;
}) => (
	<div className="p-6 border rounded-xl bg-card">
		{title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
		{children}
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Minus className="size-3" />
		</Button>
		<span className="w-5 text-center text-sm">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7">
			<Plus className="size-3" />
		</Button>
	</div>
);

const EmbeddedItem = ({ item }: { item: CartItem }) => (
	<div className="flex gap-3 py-3 border-b last:border-0">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h4 className="font-medium text-sm line-clamp-1">{item.name}</h4>
					<p className="text-xs text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="size-6 text-muted-foreground hover:text-destructive shrink-0"
				>
					<X className="size-3" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-2">
				<QuantityControl quantity={item.quantity} />
				<p className="font-semibold text-sm">
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
		className={`flex justify-between text-sm ${bold ? 'font-bold text-base' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const RecommendedItem = ({
	image,
	name,
	price,
}: {
	image: string;
	name: string;
	price: number;
}) => (
	<div className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
		<div className="relative size-12 shrink-0 overflow-hidden rounded-lg bg-muted">
			<Image src={image} alt={name} fill className="object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium line-clamp-1">{name}</p>
			<p className="text-xs text-primary font-semibold">${price.toFixed(2)}</p>
		</div>
		<Button size="sm" variant="outline" className="shrink-0">
			Add
		</Button>
	</div>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black',
			price: 299.99,
			quantity: 1,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver',
			price: 249.99,
			quantity: 1,
		},
	];

	const recommended = [
		{
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=100&h=100&fit=crop',
			name: 'Wireless Earbuds',
			price: 179.99,
		},
		{
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=100&h=100&fit=crop',
			name: 'Silk Scarf',
			price: 89.99,
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
			<div className="mx-auto max-w-5xl px-4 py-8 @md:py-12">
				{/* Page context - embedded in a larger page */}
				<ContentBlock>
					<div className="flex items-center gap-3 mb-6">
						<Box className="size-6 text-primary" />
						<h1 className="text-xl font-bold">Your Order Details</h1>
					</div>

					<p className="text-muted-foreground mb-6">
						Review your items below. This cart is embedded within the product
						page for easy access.
					</p>

					<div className="grid gap-6 @lg:grid-cols-5">
						{/* Cart Items - Embedded */}
						<div className="@lg:col-span-3 space-y-4">
							<div className="p-4 border rounded-lg bg-muted/30">
								<div className="flex items-center gap-2 mb-3">
									<ShoppingCart className="size-4 text-primary" />
									<h3 className="font-medium">Cart Items</h3>
									<Badge variant="secondary" className="ml-auto">
										{items.length}
									</Badge>
								</div>
								{items.map((item) => (
									<EmbeddedItem key={item.id} item={item} />
								))}
							</div>

							{/* Recommendations - Embedded */}
							<div className="p-4 border rounded-lg">
								<h3 className="font-medium mb-3">You might also like</h3>
								<div className="space-y-2">
									{recommended.map((item, i) => (
										<RecommendedItem key={i} {...item} />
									))}
								</div>
							</div>
						</div>

						{/* Summary - Embedded */}
						<div className="@lg:col-span-2">
							<div className="p-4 border rounded-lg bg-muted/30 sticky top-4">
								<h3 className="font-medium mb-4">Order Summary</h3>
								<div className="space-y-2">
									{summaryLines.map((line, i) => (
										<div key={i}>
											{line.bold && <Separator className="my-2" />}
											<SummaryLine {...line} />
										</div>
									))}
								</div>
								<Button className="w-full gap-2 mt-4" asChild>
									<Link href="/checkout">
										Checkout
										<ArrowRight className="size-4" />
									</Link>
								</Button>
							</div>
						</div>
					</div>
				</ContentBlock>

				{/* Additional content showing embedded context */}
				<div className="mt-8 grid gap-6 @md:grid-cols-2">
					<ContentBlock title="Shipping Information">
						<p className="text-sm text-muted-foreground">
							Your items will be shipped within 3-5 business days after order
							confirmation. Free shipping is available for orders over $100.
						</p>
					</ContentBlock>

					<ContentBlock title="Return Policy">
						<p className="text-sm text-muted-foreground">
							30-day hassle-free returns on all orders. Items must be in
							original condition with tags attached.
						</p>
					</ContentBlock>
				</div>
			</div>
		</section>
	);
}
