import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	reviewCount: number;
	height: 'short' | 'medium' | 'tall';
	category: string;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-44',
	medium: 'h-60',
	tall: 'h-72',
};

const RatingStars = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<Star key={star} className={`size-3 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
		))}
	</div>
);

const QuickActions = ({ href }: { href: string }) => (
	<div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
		<Button size="icon" className="size-10 rounded-full">
			<ShoppingCart className="size-5" />
		</Button>
		<Link href={href}>
			<Button size="icon" variant="secondary" className="size-10 rounded-full">
				<Eye className="size-5" />
			</Button>
		</Link>
	</div>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className="overflow-hidden group">
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform duration-300" />
				<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity" />
				<Badge className="absolute top-2 left-2 bg-background/90 text-foreground">{item.category}</Badge>
				<Button variant="ghost" size="icon-sm" className="absolute top-2 right-2">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<QuickActions href={item.href} />
			</div>
			<div className="p-3">
				<Link href={item.href}>
					<h3 className="font-medium line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
				</Link>
				<div className="flex items-center gap-2 mt-1.5">
					<RatingStars rating={item.rating} />
					<span className="text-xs text-muted-foreground">({item.reviewCount})</span>
				</div>
				<div className="flex items-center justify-between mt-2">
					<span className="font-bold text-lg">${item.price.toFixed(2)}</span>
					<Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @lg:columns-3 @2xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Vintage Leather Messenger Bag', price: 245.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop', rating: 5, reviewCount: 128, height: 'tall', category: 'Bags', href: '/product/1' },
		{ id: '2', name: 'Minimalist Watch', price: 329.00, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=350&fit=crop', rating: 4, reviewCount: 89, height: 'medium', category: 'Watches', href: '/product/2' },
		{ id: '3', name: 'Wireless Earbuds', price: 159.00, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop', rating: 4, reviewCount: 256, height: 'short', category: 'Audio', href: '/product/3' },
		{ id: '4', name: 'Premium Sunglasses', price: 189.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', rating: 5, reviewCount: 67, height: 'medium', category: 'Eyewear', href: '/product/4' },
		{ id: '5', name: 'Designer Sneakers', price: 275.00, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=350&fit=crop', rating: 4, reviewCount: 312, height: 'short', category: 'Shoes', href: '/product/5' },
		{ id: '6', name: 'Cashmere Turtleneck', price: 195.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=550&fit=crop', rating: 5, reviewCount: 45, height: 'tall', category: 'Clothing', href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Saved Items</h1>
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
