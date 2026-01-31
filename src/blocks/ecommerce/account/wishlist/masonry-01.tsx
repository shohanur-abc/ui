import Link from 'next/link';
import { Heart, ShoppingCart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-48',
	medium: 'h-64',
	tall: 'h-80',
};

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className="overflow-hidden group">
			<div className={`relative ${heightClasses[item.height]}`}>
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive">
					<X className="size-4" />
				</Button>
				<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
				{item.originalPrice && (
					<Badge className="absolute top-2 left-8 bg-destructive text-destructive-foreground">
						{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
					</Badge>
				)}
				<div className="absolute bottom-0 inset-x-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform">
					<Button size="sm" className="w-full gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
			<div className="p-3">
				<Link href={item.href}>
					<h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
				</Link>
				<div className="flex items-center gap-2 mt-1">
					<span className="font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
					)}
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @md:columns-3 @xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Oversized Blazer', price: 189.00, originalPrice: 249.00, image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=500&fit=crop', height: 'tall', href: '/product/1' },
		{ id: '2', name: 'Canvas Sneakers', price: 89.00, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop', height: 'short', href: '/product/2' },
		{ id: '3', name: 'Denim Jacket', price: 129.00, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop', height: 'medium', href: '/product/3' },
		{ id: '4', name: 'Leather Belt', price: 59.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=250&fit=crop', height: 'short', href: '/product/4' },
		{ id: '5', name: 'Wool Coat', price: 299.00, originalPrice: 399.00, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=550&fit=crop', height: 'tall', href: '/product/5' },
		{ id: '6', name: 'Knit Sweater', price: 95.00, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop', height: 'medium', href: '/product/6' },
		{ id: '7', name: 'Silk Scarf', price: 75.00, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=400&h=300&fit=crop', height: 'short', href: '/product/7' },
		{ id: '8', name: 'Pleated Skirt', price: 119.00, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj1f?w=400&h=500&fit=crop', height: 'tall', href: '/product/8' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
					<Badge variant="secondary">{wishlistItems.length} items</Badge>
				</div>
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
