import Link from 'next/link';
import { Heart, ShoppingCart, X, Palette, Ruler } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ColorOption {
	name: string;
	hex: string;
	available: boolean;
}

interface SizeOption {
	name: string;
	available: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	colors: ColorOption[];
	sizes: SizeOption[];
	selectedColor: string;
	selectedSize: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const ColorSelector = ({ colors, selected }: { colors: ColorOption[]; selected: string }) => (
	<div className="mt-3">
		<div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
			<Palette className="size-3" />
			<span>Color</span>
		</div>
		<div className="flex flex-wrap gap-1.5">
			{colors.map((color) => (
				<button
					key={color.name}
					className={`size-6 rounded-full border-2 transition-all ${
						selected === color.name ? 'border-primary ring-2 ring-primary/30' : 'border-transparent'
					} ${!color.available ? 'opacity-50' : 'hover:scale-110'}`}
					style={{ backgroundColor: color.hex }}
					title={color.name}
					disabled={!color.available}
				>
					{selected === color.name && (
						<span className="sr-only">Selected: {color.name}</span>
					)}
				</button>
			))}
		</div>
	</div>
);

const SizeSelector = ({ sizes, selected }: { sizes: SizeOption[]; selected: string }) => (
	<div className="mt-3">
		<div className="flex items-center gap-1 mb-2 text-xs text-muted-foreground">
			<Ruler className="size-3" />
			<span>Size</span>
		</div>
		<div className="flex flex-wrap gap-1.5">
			{sizes.map((size) => (
				<Badge
					key={size.name}
					variant={selected === size.name ? 'default' : 'outline'}
					className={`cursor-pointer transition-all ${
						!size.available ? 'opacity-50 line-through' : 'hover:bg-primary/10'
					}`}
				>
					{size.name}
				</Badge>
			))}
		</div>
	</div>
);

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
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<ColorSelector colors={item.colors} selected={item.selectedColor} />
			<SizeSelector sizes={item.sizes} selected={item.selectedSize} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Premium Cotton Hoodie', price: 89.00, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop', colors: [{ name: 'Black', hex: '#1a1a1a', available: true }, { name: 'Navy', hex: '#1e3a5f', available: true }, { name: 'Gray', hex: '#6b7280', available: true }, { name: 'Burgundy', hex: '#800020', available: false }], sizes: [{ name: 'XS', available: true }, { name: 'S', available: true }, { name: 'M', available: true }, { name: 'L', available: false }, { name: 'XL', available: true }], selectedColor: 'Black', selectedSize: 'M', href: '/product/1' },
		{ id: '2', name: 'Slim Fit Chinos', price: 65.00, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop', colors: [{ name: 'Khaki', hex: '#c3b091', available: true }, { name: 'Navy', hex: '#1e3a5f', available: true }, { name: 'Olive', hex: '#556b2f', available: true }], sizes: [{ name: '30', available: true }, { name: '32', available: true }, { name: '34', available: true }, { name: '36', available: true }], selectedColor: 'Khaki', selectedSize: '32', href: '/product/2' },
		{ id: '3', name: 'Athletic Sneakers', price: 129.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', colors: [{ name: 'White', hex: '#ffffff', available: true }, { name: 'Black', hex: '#1a1a1a', available: true }, { name: 'Red', hex: '#dc2626', available: false }], sizes: [{ name: '8', available: true }, { name: '9', available: true }, { name: '10', available: false }, { name: '11', available: true }, { name: '12', available: true }], selectedColor: 'White', selectedSize: '9', href: '/product/3' },
		{ id: '4', name: 'Linen Button-Up', price: 75.00, image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop', colors: [{ name: 'White', hex: '#ffffff', available: true }, { name: 'Blue', hex: '#3b82f6', available: true }, { name: 'Pink', hex: '#ec4899', available: true }], sizes: [{ name: 'S', available: true }, { name: 'M', available: true }, { name: 'L', available: true }, { name: 'XL', available: true }], selectedColor: 'Blue', selectedSize: 'L', href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6 @md:mb-8">My Wishlist</h1>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
