import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	ChevronLeft,
	ChevronRight,
	Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const RatingStars = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[1, 2, 3, 4, 5].map((star) => (
			<Star
				key={star}
				className={`size-3 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
			/>
		))}
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-64 @sm:w-72 @md:w-80">
		<Card className="overflow-hidden group h-full">
			<div className="relative aspect-square bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover group-hover:scale-105 transition-transform duration-300"
				/>
				<Button
					variant="ghost"
					size="icon-sm"
					className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
				>
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				{item.originalPrice && (
					<Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
						{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
					</Badge>
				)}
			</div>
			<div className="p-4">
				<Link href={item.href}>
					<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
						{item.name}
					</h3>
				</Link>
				<div className="flex items-center gap-1 mt-1">
					<RatingStars rating={item.rating} />
					<span className="text-xs text-muted-foreground">({item.rating})</span>
				</div>
				<div className="flex items-center gap-2 mt-2">
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
				<div className="flex items-center gap-2 mt-3">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
					<Button
						variant="outline"
						size="icon-sm"
						className="text-destructive hover:text-destructive"
					>
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const CarouselSlider = ({ items }: CarouselProps) => (
	<div className="relative">
		<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
			{items.map((item) => (
				<div key={item.id} className="snap-start">
					<CarouselItem item={item} />
				</div>
			))}
		</div>
		<Button
			variant="outline"
			size="icon"
			className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronLeft className="size-5" />
		</Button>
		<Button
			variant="outline"
			size="icon"
			className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Minimalist Leather Watch',
			price: 189.0,
			originalPrice: 249.0,
			image:
				'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop',
			rating: 5,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Premium Headphones',
			price: 299.0,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			rating: 4,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Canvas Sneakers',
			price: 95.0,
			image:
				'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
			rating: 4,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Leather Backpack',
			price: 175.0,
			originalPrice: 225.0,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
			rating: 5,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Wireless Earbuds',
			price: 149.0,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
			rating: 4,
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Smart Watch',
			price: 399.0,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			rating: 5,
			href: '/product/6',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
					<Badge variant="secondary">{wishlistItems.length} items</Badge>
				</div>
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
