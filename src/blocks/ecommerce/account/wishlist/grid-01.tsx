import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	inStock: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const WishlistHeader = ({ title, count }: { title: string; count: number }) => (
	<div className="flex items-center justify-between mb-6 @md:mb-8">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<Heart className="size-5 text-primary" />
			</div>
			<div>
				<h1 className="text-xl @md:text-2xl font-bold">{title}</h1>
				<p className="text-sm text-muted-foreground">{count} items saved</p>
			</div>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			{item.originalPrice && (
				<Badge className="absolute top-3 left-3" variant="destructive">
					Sale
				</Badge>
			)}
			<div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 transition-opacity group-hover:opacity-100">
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full shadow-md"
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
		</div>
		<CardContent className="p-4">
			<Link href={item.href} className="block">
				<h3 className="font-medium line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-1 flex items-center gap-1">
				<Star className="size-3.5 fill-primary text-primary" />
				<span className="text-sm text-muted-foreground">{item.rating}</span>
			</div>
			<div className="mt-2 flex items-center gap-2">
				<span className="font-semibold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<div className="mt-3 flex gap-2">
				<Button size="sm" className="flex-1 gap-1.5" disabled={!item.inStock}>
					<ShoppingCart className="size-3.5" />
					{item.inStock ? 'Add to Cart' : 'Out of Stock'}
				</Button>
			</div>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Premium Leather Jacket',
			price: 199.99,
			originalPrice: 299.99,
			image:
				'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
			rating: 4.8,
			inStock: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Classic Denim Jeans',
			price: 89.99,
			image:
				'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
			rating: 4.5,
			inStock: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Wool Blend Sweater',
			price: 129.99,
			image:
				'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
			rating: 4.7,
			inStock: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Minimalist Watch',
			price: 249.99,
			originalPrice: 349.99,
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
			rating: 4.9,
			inStock: true,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<WishlistHeader title="My Wishlist" count={wishlistItems.length} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
