import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
	Minus,
	Plus,
	Trash2,
	ArrowRight,
	Truck,
	Shield,
	RotateCcw,
	Star,
	Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	description: string;
	variant: string;
	sku: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	inStock: boolean;
	rating: number;
}

const PageHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between">
		<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
		<Badge variant="secondary" className="text-base px-3 py-1">
			{count} items
		</Badge>
	</div>
);

const ProductImage = ({ src, alt }: { src: string; alt: string }) => (
	<div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-40">
		<Image src={src} alt={alt} fill className="object-cover" />
	</div>
);

const ProductRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		{Array.from({ length: 5 }).map((_, i) => (
			<Star
				key={i}
				className={`size-3 ${i < rating ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`}
			/>
		))}
		<span className="text-xs text-muted-foreground ml-1">({rating}.0)</span>
	</div>
);

const ProductInfo = ({
	name,
	description,
	variant,
	sku,
	rating,
}: {
	name: string;
	description: string;
	variant: string;
	sku: string;
	rating: number;
}) => (
	<div className="space-y-2">
		<h3 className="font-semibold text-lg">{name}</h3>
		<p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
		<div className="flex flex-wrap items-center gap-3 text-sm">
			<Badge variant="outline">{variant}</Badge>
			<span className="text-muted-foreground">SKU: {sku}</span>
		</div>
		<ProductRating rating={rating} />
	</div>
);

const StockStatus = ({ inStock }: { inStock: boolean }) => (
	<Badge variant={inStock ? 'default' : 'destructive'} className="text-xs">
		{inStock ? 'In Stock' : 'Low Stock'}
	</Badge>
);

const ProductPricing = ({
	price,
	originalPrice,
}: {
	price: number;
	originalPrice?: number;
}) => (
	<div className="flex items-baseline gap-2">
		<span className="text-2xl font-bold text-primary">${price.toFixed(2)}</span>
		{originalPrice && (
			<span className="text-sm text-muted-foreground line-through">
				${originalPrice.toFixed(2)}
			</span>
		)}
	</div>
);

const QuantityControl = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center rounded-lg border">
		<Button size="icon-sm" variant="ghost" className="size-9">
			<Minus className="size-4" />
		</Button>
		<span className="w-10 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-9">
			<Plus className="size-4" />
		</Button>
	</div>
);

const ItemActions = ({
	saveLabel,
	removeLabel,
}: {
	saveLabel: string;
	removeLabel: string;
}) => (
	<div className="flex gap-2">
		<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
			<Heart className="size-4" />
			{saveLabel}
		</Button>
		<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-destructive">
			<Trash2 className="size-4" />
			{removeLabel}
		</Button>
	</div>
);

const CartItemCard = ({ item }: { item: CartItem }) => (
	<Card>
		<CardContent className="p-4 @sm:p-6">
			<div className="flex flex-col gap-4 @sm:flex-row @sm:gap-6">
				<ProductImage src={item.image} alt={item.name} />
				<div className="flex-1 space-y-4">
					<div className="flex items-start justify-between gap-4">
						<ProductInfo
							name={item.name}
							description={item.description}
							variant={item.variant}
							sku={item.sku}
							rating={item.rating}
						/>
						<StockStatus inStock={item.inStock} />
					</div>
					<div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t">
						<ProductPricing price={item.price} originalPrice={item.originalPrice} />
						<div className="flex items-center gap-4">
							<QuantityControl quantity={item.quantity} />
							<p className="text-lg font-bold w-24 text-right">
								${(item.price * item.quantity).toFixed(2)}
							</p>
						</div>
					</div>
					<ItemActions saveLabel="Save for later" removeLabel="Remove" />
				</div>
			</div>
		</CardContent>
	</Card>
);

const PromoCodeInput = ({
	placeholder,
	buttonLabel,
}: {
	placeholder: string;
	buttonLabel: string;
}) => (
	<div className="flex gap-2">
		<Input placeholder={placeholder} className="flex-1" />
		<Button variant="secondary">{buttonLabel}</Button>
	</div>
);

const FeatureBadge = ({
	icon: Icon,
	text,
}: {
	icon: React.ComponentType<{ className?: string }>;
	text: string;
}) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Icon className="size-4 text-primary" />
		<span>{text}</span>
	</div>
);

const PriceLine = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'discount' | 'total';
}) => (
	<div className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>{label}</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'discount'
						? 'text-green-500'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const OrderSummary = ({
	title,
	lines,
	checkoutLabel,
	checkoutHref,
	features,
}: {
	title: string;
	lines: { label: string; value: string; variant?: 'default' | 'discount' | 'total' }[];
	checkoutLabel: string;
	checkoutHref: string;
	features: { icon: React.ComponentType<{ className?: string }>; text: string }[];
}) => (
	<Card className="sticky top-4">
		<CardHeader>
			<CardTitle>{title}</CardTitle>
		</CardHeader>
		<CardContent className="space-y-4">
			<PromoCodeInput placeholder="Promo code" buttonLabel="Apply" />
			<Separator />
			<div className="space-y-3">
				{lines.map((line, i) => (
					<div key={i}>
						{line.variant === 'total' && <Separator className="my-3" />}
						<PriceLine {...line} />
					</div>
				))}
			</div>
		</CardContent>
		<CardFooter className="flex-col gap-4">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<div className="grid gap-2 w-full">
				{features.map((f, i) => (
					<FeatureBadge key={i} icon={f.icon} text={f.text} />
				))}
			</div>
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop',
			name: 'Premium Wireless Headphones',
			description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
			variant: 'Midnight Black',
			sku: 'WH-1000XM5',
			price: 299.99,
			originalPrice: 349.99,
			quantity: 1,
			inStock: true,
			rating: 5,
		},
		{
			id: '2',
			image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop',
			name: 'Smart Fitness Watch',
			description: 'Track your health metrics with precision. Water resistant to 50m.',
			variant: 'Silver • 44mm',
			sku: 'FW-PRO-44',
			price: 399.99,
			quantity: 1,
			inStock: false,
			rating: 4,
		},
	];

	const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
	const savings = items.reduce((sum, i) => sum + ((i.originalPrice || i.price) - i.price) * i.quantity, 0);

	const summaryLines = [
		{ label: 'Subtotal', value: `$${subtotal.toFixed(2)}` },
		{ label: 'You Save', value: `-$${savings.toFixed(2)}`, variant: 'discount' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Tax', value: `$${(subtotal * 0.08).toFixed(2)}` },
		{ label: 'Total', value: `$${(subtotal * 1.08).toFixed(2)}`, variant: 'total' as const },
	];

	const features = [
		{ icon: Truck, text: 'Free shipping on orders over $50' },
		{ icon: Shield, text: '2-year warranty included' },
		{ icon: RotateCcw, text: '30-day easy returns' },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-7xl px-4 py-8 @md:py-12 @xl:py-16">
				<PageHeader title="Shopping Cart" count={items.length} />

				<div className="mt-8 grid gap-8 @xl:grid-cols-3">
					<div className="space-y-4 @xl:col-span-2">
						{items.map((item) => (
							<CartItemCard key={item.id} item={item} />
						))}
					</div>

					<div>
						<OrderSummary
							title="Order Summary"
							lines={summaryLines}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
							features={features}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
