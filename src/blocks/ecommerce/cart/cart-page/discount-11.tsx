import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
	Minus,
	Plus,
	X,
	Percent,
	Gift,
	ArrowRight,
	RefreshCw,
	Heart,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface CartItem {
	id: string;
	image: string;
	name: string;
	brand: string;
	price: number;
	originalPrice?: number;
	quantity: number;
	savedForLater?: boolean;
}

const HeaderSection = ({
	title,
	itemCount,
	totalSaved,
}: {
	title: string;
	itemCount: number;
	totalSaved: number;
}) => (
	<div className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
		<div>
			<h1 className="text-2xl font-bold @md:text-3xl">{title}</h1>
			<p className="text-muted-foreground">{itemCount} items in your cart</p>
		</div>
		{totalSaved > 0 && (
			<Badge
				variant="secondary"
				className="w-fit gap-1 text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
			>
				<Percent className="size-3" />
				You're saving ${totalSaved.toFixed(2)}!
			</Badge>
		)}
	</div>
);

const ProductThumbnail = ({
	src,
	alt,
	discount,
}: {
	src: string;
	alt: string;
	discount?: number;
}) => (
	<div className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-muted @sm:w-28">
		<Image src={src} alt={alt} fill className="object-cover" />
		{discount && (
			<Badge className="absolute left-2 top-2 bg-red-500 text-xs">
				-{discount}%
			</Badge>
		)}
	</div>
);

const ProductInfo = ({
	brand,
	name,
	price,
	originalPrice,
}: {
	brand: string;
	name: string;
	price: number;
	originalPrice?: number;
}) => (
	<div className="min-w-0 flex-1">
		<p className="text-xs font-semibold uppercase tracking-wider text-primary">
			{brand}
		</p>
		<h3 className="mt-1 font-medium leading-tight line-clamp-2">{name}</h3>
		<div className="mt-2 flex items-center gap-2">
			<span className="text-lg font-bold">${price.toFixed(2)}</span>
			{originalPrice && (
				<span className="text-sm text-muted-foreground line-through">
					${originalPrice.toFixed(2)}
				</span>
			)}
		</div>
	</div>
);

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2">
		<Button size="icon-sm" variant="outline" className="size-8 rounded-lg">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center font-medium">{quantity}</span>
		<Button size="icon-sm" variant="outline" className="size-8 rounded-lg">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ItemActions = ({
	onSave,
	onRemove,
}: {
	onSave: string;
	onRemove: string;
}) => (
	<div className="flex gap-2 text-sm">
		<Button
			variant="ghost"
			size="sm"
			className="h-auto p-1 text-muted-foreground hover:text-primary gap-1"
		>
			<Heart className="size-3" />
			{onSave}
		</Button>
		<Button
			variant="ghost"
			size="sm"
			className="h-auto p-1 text-muted-foreground hover:text-destructive gap-1"
		>
			<X className="size-3" />
			{onRemove}
		</Button>
	</div>
);

const CartCard = ({ item }: { item: CartItem }) => {
	const discount = item.originalPrice
		? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
		: undefined;

	return (
		<Card className="overflow-hidden transition-shadow hover:shadow-md">
			<CardContent className="flex gap-4 p-4">
				<ProductThumbnail
					src={item.image}
					alt={item.name}
					discount={discount}
				/>
				<div className="flex min-w-0 flex-1 flex-col justify-between">
					<ProductInfo
						brand={item.brand}
						name={item.name}
						price={item.price}
						originalPrice={item.originalPrice}
					/>
					<div className="mt-3 flex items-center justify-between">
						<QuantitySelector quantity={item.quantity} />
						<ItemActions onSave="Save" onRemove="Remove" />
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

const PromoSection = ({
	placeholder,
	applyLabel,
	giftMessage,
}: {
	placeholder: string;
	applyLabel: string;
	giftMessage: string;
}) => (
	<div className="space-y-3">
		<div className="flex gap-2">
			<Input placeholder={placeholder} className="flex-1" />
			<Button variant="secondary">{applyLabel}</Button>
		</div>
		<div className="flex items-center gap-2 text-sm text-muted-foreground">
			<Gift className="size-4 text-primary" />
			<span>{giftMessage}</span>
		</div>
	</div>
);

const SummaryRow = ({
	label,
	value,
	variant,
}: {
	label: string;
	value: string;
	variant?: 'default' | 'discount' | 'total';
}) => (
	<div
		className={`flex justify-between ${variant === 'total' ? 'text-xl font-bold' : ''}`}
	>
		<span className={variant === 'total' ? '' : 'text-muted-foreground'}>
			{label}
		</span>
		<span
			className={
				variant === 'total'
					? 'text-primary'
					: variant === 'discount'
						? 'text-green-500 font-medium'
						: ''
			}
		>
			{value}
		</span>
	</div>
);

const UpdateCartButton = ({ label }: { label: string }) => (
	<Button variant="ghost" className="gap-2 text-muted-foreground">
		<RefreshCw className="size-4" />
		{label}
	</Button>
);

const SummaryPanel = ({
	lines,
	promoConfig,
	checkoutLabel,
	checkoutHref,
	updateLabel,
}: {
	lines: {
		label: string;
		value: string;
		variant?: 'default' | 'discount' | 'total';
	}[];
	promoConfig: { placeholder: string; applyLabel: string; giftMessage: string };
	checkoutLabel: string;
	checkoutHref: string;
	updateLabel: string;
}) => (
	<Card className="sticky top-4">
		<CardContent className="space-y-4 p-6">
			<h2 className="text-lg font-semibold">Order Summary</h2>

			<PromoSection {...promoConfig} />

			<Separator />

			<div className="space-y-2">
				{lines.map((line, i) => (
					<div key={i}>
						{line.variant === 'total' && <Separator className="my-3" />}
						<SummaryRow {...line} />
					</div>
				))}
			</div>
		</CardContent>
		<CardFooter className="flex-col gap-3 p-6 pt-0">
			<Button className="w-full gap-2" size="lg" asChild>
				<Link href={checkoutHref}>
					{checkoutLabel}
					<ArrowRight className="size-4" />
				</Link>
			</Button>
			<UpdateCartButton label={updateLabel} />
		</CardFooter>
	</Card>
);

export default function Main() {
	const items: CartItem[] = [
		{
			id: '1',
			image:
				'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=300&h=300&fit=crop',
			name: 'Premium Leather Weekender Bag',
			brand: 'Artisan Goods',
			price: 189.99,
			originalPrice: 249.99,
			quantity: 1,
		},
		{
			id: '2',
			image:
				'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop',
			name: 'Ultra Comfort Running Shoes',
			brand: 'SportMax',
			price: 149.99,
			quantity: 2,
		},
		{
			id: '3',
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop',
			name: 'Classic Denim Jacket Vintage Wash',
			brand: 'Urban Style',
			price: 129.99,
			originalPrice: 179.99,
			quantity: 1,
		},
	];

	const totalSaved = items.reduce((acc, item) => {
		if (item.originalPrice) {
			return acc + (item.originalPrice - item.price) * item.quantity;
		}
		return acc;
	}, 0);

	const summaryLines = [
		{ label: 'Subtotal', value: '$619.96' },
		{ label: 'Discount', value: '-$110.00', variant: 'discount' as const },
		{ label: 'Shipping', value: 'Free' },
		{ label: 'Estimated Tax', value: '$40.79' },
		{ label: 'Order Total', value: '$550.75', variant: 'total' as const },
	];

	return (
		<section className="@container">
			<div className="mx-auto max-w-6xl px-4 py-8 @md:py-12 @xl:py-16">
				<HeaderSection
					title="Shopping Cart"
					itemCount={items.length}
					totalSaved={totalSaved}
				/>

				<div className="mt-8 grid gap-8 @xl:grid-cols-5">
					<div className="space-y-4 @xl:col-span-3">
						{items.map((item) => (
							<CartCard key={item.id} item={item} />
						))}
					</div>

					<div className="@xl:col-span-2">
						<SummaryPanel
							lines={summaryLines}
							promoConfig={{
								placeholder: 'Enter promo code',
								applyLabel: 'Apply',
								giftMessage: 'Gift wrapping available at checkout',
							}}
							checkoutLabel="Proceed to Checkout"
							checkoutHref="/checkout"
							updateLabel="Update Cart"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
