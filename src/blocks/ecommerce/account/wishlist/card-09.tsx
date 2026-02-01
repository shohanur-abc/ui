import Link from 'next/link';
import { Heart, ShoppingCart, X, Boxes, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductVariant {
	name: string;
	price: number;
	inStock: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	basePrice: number;
	image: string;
	variants: ProductVariant[];
	selectedVariant: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const VariantSelector = ({
	variants,
	selected,
}: {
	variants: ProductVariant[];
	selected: string;
}) => (
	<div className="mt-3">
		<p className="text-xs text-muted-foreground mb-2 flex items-center gap-1">
			<Boxes className="size-3" />
			Available Options
		</p>
		<div className="flex flex-wrap gap-1.5">
			{variants.map((variant) => (
				<Badge
					key={variant.name}
					variant={selected === variant.name ? 'default' : 'outline'}
					className={`cursor-pointer transition-all ${!variant.inStock ? 'opacity-50 line-through' : 'hover:bg-primary/10'}`}
				>
					{variant.name}
				</Badge>
			))}
		</div>
	</div>
);

const PriceRange = ({ variants }: { variants: ProductVariant[] }) => {
	const prices = variants.map((v) => v.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);

	if (minPrice === maxPrice) {
		return <span className="text-xl font-bold">${minPrice.toFixed(2)}</span>;
	}

	return (
		<span className="text-xl font-bold">
			${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}
		</span>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full"
			>
				<X className="size-4" />
			</Button>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
			<Badge className="absolute bottom-2 right-2" variant="secondary">
				{item.variants.filter((v) => v.inStock).length} options
			</Badge>
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2">
				<PriceRange variants={item.variants} />
			</div>
			<VariantSelector
				variants={item.variants}
				selected={item.selectedVariant}
			/>
			<div className="flex gap-2 mt-4">
				<Button className="flex-1 gap-2">
					<ShoppingCart className="size-4" />
					Add
				</Button>
				<Button variant="outline" size="icon">
					<Scale className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'iPhone 15 Pro Case',
			basePrice: 49.0,
			image:
				'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop',
			variants: [
				{ name: 'Black', price: 49.0, inStock: true },
				{ name: 'White', price: 49.0, inStock: true },
				{ name: 'Blue', price: 54.0, inStock: false },
				{ name: 'Green', price: 54.0, inStock: true },
			],
			selectedVariant: 'Black',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'MacBook Pro Sleeve',
			basePrice: 79.0,
			image:
				'https://images.unsplash.com/photo-1541807360746-044d76e479ff?w=400&h=400&fit=crop',
			variants: [
				{ name: '13"', price: 79.0, inStock: true },
				{ name: '14"', price: 89.0, inStock: true },
				{ name: '16"', price: 99.0, inStock: true },
			],
			selectedVariant: '14"',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'AirPods Pro Case',
			basePrice: 24.99,
			image:
				'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop',
			variants: [
				{ name: 'Silicone', price: 24.99, inStock: true },
				{ name: 'Leather', price: 39.99, inStock: true },
				{ name: 'Fabric', price: 29.99, inStock: false },
			],
			selectedVariant: 'Silicone',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Apple Watch Band',
			basePrice: 39.0,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			variants: [
				{ name: 'S/M', price: 39.0, inStock: true },
				{ name: 'M/L', price: 39.0, inStock: true },
			],
			selectedVariant: 'M/L',
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
					<Button variant="outline" size="sm" className="gap-2">
						<Scale className="size-4" />
						Compare
					</Button>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
