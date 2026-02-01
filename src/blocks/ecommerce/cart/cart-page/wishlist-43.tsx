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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Minus,
	Plus,
	X,
	ArrowRight,
	ShoppingCart,
	Heart,
	MoveRight,
	ShoppingBag,
} from 'lucide-react';
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

interface WishlistItem {
	id: string;
	image: string;
	name: string;
	variant: string;
	price: number;
	originalPrice?: number;
	inStock: boolean;
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div>
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const ItemImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const CartItemRow = ({ item }: { item: CartItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="text-muted-foreground hover:text-destructive shrink-0"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center justify-between mt-3">
				<div className="flex items-center rounded-lg border">
					<Button size="icon-sm" variant="ghost" className="size-8">
						<Minus className="size-3" />
					</Button>
					<span className="w-6 text-center text-sm">{item.quantity}</span>
					<Button size="icon-sm" variant="ghost" className="size-8">
						<Plus className="size-3" />
					</Button>
				</div>
				<p className="font-bold text-primary">
					${(item.price * item.quantity).toFixed(2)}
				</p>
			</div>
			<Button
				variant="ghost"
				size="sm"
				className="mt-2 gap-1 text-muted-foreground"
			>
				<Heart className="size-3" />
				Move to wishlist
			</Button>
		</div>
	</div>
);

const WishlistItemRow = ({ item }: { item: WishlistItem }) => (
	<div className="flex gap-4 py-4">
		<ItemImage src={item.image} alt={item.name} />
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<h3 className="font-semibold line-clamp-1">{item.name}</h3>
					<p className="text-sm text-muted-foreground">{item.variant}</p>
					{!item.inStock && (
						<Badge
							variant="outline"
							className="mt-1 text-xs text-orange-500 border-orange-500/30"
						>
							Out of stock
						</Badge>
					)}
				</div>
				<Button
					size="icon-sm"
					variant="ghost"
					className="text-muted-foreground hover:text-destructive shrink-0"
				>
					<X className="size-4" />
				</Button>
			</div>
			<div className="flex items-center gap-2 mt-2">
				<p className="font-bold text-primary">${item.price.toFixed(2)}</p>
				{item.originalPrice && (
					<p className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</p>
				)}
			</div>
			<Button
				variant="outline"
				size="sm"
				className="mt-2 gap-1"
				disabled={!item.inStock}
			>
				<ShoppingCart className="size-3" />
				Add to cart
			</Button>
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
		className={`flex justify-between ${bold ? 'text-xl font-bold' : 'text-muted-foreground'}`}
	>
		<span>{label}</span>
		<span className={bold ? 'text-primary' : ''}>{value}</span>
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
	const cartItems: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
			name: 'Running Shoes Pro',
			variant: 'Red • US 10',
			price: 149.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			name: 'Studio Headphones',
			variant: 'Black • Wireless',
			price: 299.99,
			quantity: 1,
		},
	];

	const wishlistItems: WishlistItem[] = [
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop',
			name: 'Classic Watch',
			variant: 'Silver • Leather band',
			price: 199.99,
			originalPrice: 249.99,
			inStock: true,
		},
		{
			id: '4',
			image:
				'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=200&h=200&fit=crop',
			name: 'Wireless Earbuds',
			variant: 'White • ANC',
			price: 179.99,
			inStock: false,
		},
		{
			id: '5',
			image:
				'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=200&h=200&fit=crop',
			name: 'Silk Scarf',
			variant: 'Navy pattern',
			price: 89.99,
			inStock: true,
		},
	];

	const subtotal = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
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
				<PageHeader title="Your Items" subtitle="Cart and saved for later" />

				<div className="mt-8 grid gap-8 @lg:grid-cols-3">
					<div className="@lg:col-span-2">
						<Tabs defaultValue="cart">
							<TabsList className="w-full">
								<TabsTrigger value="cart" className="flex-1 gap-2">
									<ShoppingBag className="size-4" />
									Cart ({cartItems.length})
								</TabsTrigger>
								<TabsTrigger value="wishlist" className="flex-1 gap-2">
									<Heart className="size-4" />
									Wishlist ({wishlistItems.length})
								</TabsTrigger>
							</TabsList>

							<TabsContent value="cart">
								<Card>
									<CardContent className="divide-y p-4">
										{cartItems.map((item) => (
											<CartItemRow key={item.id} item={item} />
										))}
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent value="wishlist">
								<Card>
									<CardContent className="divide-y p-4">
										{wishlistItems.map((item) => (
											<WishlistItemRow key={item.id} item={item} />
										))}
									</CardContent>
									<CardFooter>
										<Button variant="outline" className="w-full gap-2">
											Add all to cart
											<MoveRight className="size-4" />
										</Button>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
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
