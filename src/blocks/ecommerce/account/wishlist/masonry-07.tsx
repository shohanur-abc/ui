import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, Tag, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	brand: string;
	brandLogo?: string;
	isPartner: boolean;
	rating: number;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-44',
	medium: 'h-60',
	tall: 'h-76',
};

const BrandBadge = ({ brand, isPartner }: { brand: string; isPartner: boolean }) => (
	<Badge variant={isPartner ? 'default' : 'outline'} className="gap-1 text-xs">
		{isPartner && <Star className="size-2.5 fill-current" />}
		{brand}
	</Badge>
);

const RatingBadge = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1 bg-background/90 backdrop-blur-sm rounded-full px-2 py-0.5">
		<Star className="size-3 fill-amber-400 text-amber-400" />
		<span className="text-xs font-medium">{rating.toFixed(1)}</span>
	</div>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className={`overflow-hidden group ${item.isPartner ? 'ring-1 ring-primary/30' : ''}`}>
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-500" />
				<div className="absolute top-2 left-2 right-10 flex flex-wrap gap-1">
					<BrandBadge brand={item.brand} isPartner={item.isPartner} />
				</div>
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<div className="absolute bottom-2 right-2">
					<RatingBadge rating={item.rating} />
				</div>
				<div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
					<Button size="sm" className="w-full gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
			<div className="p-3">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href} className="flex-1">
						<h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="flex-shrink-0 text-destructive hover:text-destructive size-6">
						<X className="size-3" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-2">
					<span className="font-bold">${item.price.toFixed(2)}</span>
					{item.isPartner && (
						<Badge variant="secondary" className="text-[10px] gap-0.5">
							<Tag className="size-2.5" />
							Partner
						</Badge>
					)}
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @sm:columns-3 @lg:columns-4 @2xl:columns-5 gap-3">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

const BrandFilter = ({ brands }: { brands: { name: string; isPartner: boolean }[] }) => (
	<div className="flex flex-wrap gap-2 mb-6">
		<Badge variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">
			All Brands
		</Badge>
		{brands.map((brand) => (
			<Badge
				key={brand.name}
				variant="outline"
				className={`cursor-pointer hover:bg-primary hover:text-primary-foreground gap-1 ${brand.isPartner ? 'border-primary/50' : ''}`}
			>
				{brand.isPartner && <Star className="size-2.5 fill-primary text-primary" />}
				{brand.name}
			</Badge>
		))}
	</div>
);

export default function Main() {
	const brands = [
		{ name: 'Nike', isPartner: true },
		{ name: 'Apple', isPartner: true },
		{ name: 'Sony', isPartner: false },
		{ name: 'Samsung', isPartner: false },
		{ name: 'Adidas', isPartner: true },
	];

	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Nike Air Max 270', price: 150.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', height: 'medium', brand: 'Nike', isPartner: true, rating: 4.8, href: '/product/1' },
		{ id: '2', name: 'Apple AirPods Pro', price: 249.00, image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=350&fit=crop', height: 'short', brand: 'Apple', isPartner: true, rating: 4.9, href: '/product/2' },
		{ id: '3', name: 'Sony WH-1000XM5', price: 349.00, image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=500&fit=crop', height: 'tall', brand: 'Sony', isPartner: false, rating: 4.7, href: '/product/3' },
		{ id: '4', name: 'Samsung Galaxy Buds', price: 179.00, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop', height: 'short', brand: 'Samsung', isPartner: false, rating: 4.5, href: '/product/4' },
		{ id: '5', name: 'Adidas Ultraboost', price: 190.00, image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400&h=450&fit=crop', height: 'medium', brand: 'Adidas', isPartner: true, rating: 4.6, href: '/product/5' },
		{ id: '6', name: 'Apple Watch Series 9', price: 399.00, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', height: 'medium', brand: 'Apple', isPartner: true, rating: 4.8, href: '/product/6' },
		{ id: '7', name: 'Nike Dunk Low', price: 110.00, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=350&fit=crop', height: 'short', brand: 'Nike', isPartner: true, rating: 4.7, href: '/product/7' },
		{ id: '8', name: 'Sony LinkBuds', price: 199.00, image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=450&fit=crop', height: 'tall', brand: 'Sony', isPartner: false, rating: 4.3, href: '/product/8' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-4">
					<Store className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Brands I Love</h1>
				</div>
				<BrandFilter brands={brands} />
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
