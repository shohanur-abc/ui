import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Minus,
	Plus,
	X,
	ShoppingBag,
	Heart,
	Clock,
	ArrowRight,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
	id: string;
	image: string;
	name: string;
	price: number;
	quantity?: number;
	addedAt?: string;
}

const TabHeader = ({
	icon: Icon,
	label,
	count,
}: {
	icon: React.ComponentType<{ className?: string }>;
	label: string;
	count: number;
}) => (
	<div className="flex items-center gap-2">
		<Icon className="size-4" />
		<span>{label}</span>
		<Badge variant="secondary" className="ml-1 size-5 rounded-full p-0 text-xs">
			{count}
		</Badge>
	</div>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductDetails = ({ name, price }: { name: string; price: number }) => (
	<div className="min-w-0 flex-1">
		<h3 className="font-medium line-clamp-2 leading-tight">{name}</h3>
		<p className="mt-1 text-lg font-bold text-primary">${price.toFixed(2)}</p>
	</div>
);

const QuantityButtons = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2 rounded-md border bg-muted/50 p-1">
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Minus className="size-3" />
		</Button>
		<span className="w-6 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-6">
			<Plus className="size-3" />
		</Button>
	</div>
);

const RemoveAction = () => (
	<Button
		size="icon-sm"
		variant="ghost"
		className="text-muted-foreground hover:text-destructive"
	>
		<X className="size-4" />
	</Button>
);

const CartItem = ({ product }: { product: Product }) => (
	<div className="flex gap-4 py-4">
		<ProductImage src={product.image} alt={product.name} />
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<ProductDetails name={product.name} price={product.price} />
				<RemoveAction />
			</div>
			<div className="flex items-center justify-between">
				<QuantityButtons quantity={product.quantity || 1} />
				<span className="font-semibold">
					${((product.quantity || 1) * product.price).toFixed(2)}
				</span>
			</div>
		</div>
	</div>
);

const SavedItem = ({
	product,
	moveToCartLabel,
}: {
	product: Product;
	moveToCartLabel: string;
}) => (
	<div className="flex gap-4 py-4">
		<ProductImage src={product.image} alt={product.name} />
		<div className="flex min-w-0 flex-1 flex-col justify-between">
			<div className="flex items-start justify-between gap-2">
				<ProductDetails name={product.name} price={product.price} />
				<RemoveAction />
			</div>
			<div className="flex items-center justify-between">
				{product.addedAt && (
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Clock className="size-3" />
						<span>Saved {product.addedAt}</span>
					</div>
				)}
				<Button size="sm" variant="outline" className="gap-1">
					<ShoppingBag className="size-3" />
					{moveToCartLabel}
				</Button>
			</div>
		</div>
	</div>
);

const SummaryRow = ({
	label,
	value,
	isBold,
}: {
	label: string;
	value: string;
	isBold?: boolean;
}) => (
	<div
		className={`flex justify-between ${isBold ? 'text-lg font-bold' : 'text-sm'}`}
	>
		<span className={isBold ? '' : 'text-muted-foreground'}>{label}</span>
		<span className={isBold ? 'text-primary' : ''}>{value}</span>
	</div>
);

const CheckoutSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
}: {
	title: string;
	lines: { label: string; value: string; isBold?: boolean }[];
	checkoutLabel: string;
	checkoutHref: string;
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle className="text-lg">{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			{lines.map((line, i) => (
				<div key={i}>
					{line.isBold && <Separator className="mb-4" />}
					<SummaryRow {...line} />
				</div>
			))}
			<Button className="mt-4 w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
		</CardContent>
	</Card>
);

const EmptyState = ({
	icon: Icon,
	title,
	description,
	ctaLabel,
	ctaHref,
}: {
	icon: React.ComponentType<{ className?: string }>;
	title: string;
	description: string;
	ctaLabel: string;
	ctaHref: string;
}) => (
	<div className="flex flex-col items-center justify-center py-12 text-center">
		<div className="rounded-full bg-muted p-4 mb-4">
			<Icon className="size-8 text-muted-foreground" />
		</div>
		<h3 className="font-semibold">{title}</h3>
		<p className="mt-1 text-sm text-muted-foreground">{description}</p>
		<Button className="mt-4" asChild>
			<Link href={ctaHref}>{ctaLabel}</Link>
		</Button>
	</div>
);

export default function Main() {
	const cartItems: Product[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=200&h=200&fit=crop',
			name: 'Premium Leather Sneakers',
			price: 189.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=200&h=200&fit=crop',
			name: 'Classic Aviator Sunglasses',
			price: 159.99,
			quantity: 2,
		},
	];

	const savedItems: Product[] = [
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop',
			name: 'Vintage Leather Backpack',
			price: 249.99,
			addedAt: '2 days ago',
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=200&h=200&fit=crop',
			name: 'Minimalist Watch Gold Edition',
			price: 329.99,
			addedAt: '1 week ago',
		},
	];

	const summaryLines = [
		{ label: 'Subtotal (3 items)', value: '$509.97' },
		{ label: 'Shipping', value: '$9.99' },
		{ label: 'Tax', value: '$40.80' },
		{ label: 'Total', value: '$560.76', isBold: true },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl font-bold @md:text-3xl">My Cart</h1>

				<div className="mt-8 grid gap-8 @xl:grid-cols-3">
					<div className="@xl:col-span-2">
						<Tabs defaultValue="cart">
							<TabsList className="w-full">
								<TabsTrigger value="cart" className="flex-1">
									<TabHeader
										icon={ShoppingBag}
										label="Cart"
										count={cartItems.length}
									/>
								</TabsTrigger>
								<TabsTrigger value="saved" className="flex-1">
									<TabHeader
										icon={Heart}
										label="Saved"
										count={savedItems.length}
									/>
								</TabsTrigger>
							</TabsList>

							<TabsContent value="cart" className="mt-4">
								<Card>
									<CardContent className="divide-y p-4">
										{cartItems.length > 0 ? (
											cartItems.map((item) => (
												<CartItem key={item.id} product={item} />
											))
										) : (
											<EmptyState
												icon={ShoppingBag}
												title="Your cart is empty"
												description="Add some items to get started"
												ctaLabel="Start Shopping"
												ctaHref="/shop"
											/>
										)}
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="saved" className="mt-4">
								<Card>
									<CardContent className="divide-y p-4">
										{savedItems.length > 0 ? (
											savedItems.map((item) => (
												<SavedItem
													key={item.id}
													product={item}
													moveToCartLabel="Move to Cart"
												/>
											))
										) : (
											<EmptyState
												icon={Heart}
												title="No saved items"
												description="Items you save for later will appear here"
												ctaLabel="Browse Products"
												ctaHref="/shop"
											/>
										)}
									</CardContent>
								</Card>
							</TabsContent>
						</Tabs>
					</div>

					<div>
						<CheckoutSummary
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
