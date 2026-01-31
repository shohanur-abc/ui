import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, ThumbsUp, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface RatingBreakdown {
	stars: number;
	percentage: number;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	totalReviews: number;
	ratingBreakdown: RatingBreakdown[];
	recommended: number;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const RatingDisplay = ({ rating, reviews }: { rating: number; reviews: number }) => (
	<div className="flex items-center gap-2">
		<div className="flex items-center gap-1 px-2 py-1 rounded-md bg-amber-500/10">
			<Star className="size-4 fill-amber-500 text-amber-500" />
			<span className="font-bold text-amber-700">{rating.toFixed(1)}</span>
		</div>
		<span className="text-sm text-muted-foreground">({reviews.toLocaleString()})</span>
	</div>
);

const MiniRatingBreakdown = ({ breakdown }: { breakdown: RatingBreakdown[] }) => (
	<div className="mt-3 space-y-1">
		{breakdown.map((item) => (
			<div key={item.stars} className="flex items-center gap-2">
				<span className="text-xs w-3">{item.stars}</span>
				<Progress value={item.percentage} className="h-1.5 flex-1" />
				<span className="text-xs text-muted-foreground w-8">{item.percentage}%</span>
			</div>
		))}
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
			{item.rating >= 4.5 && (
				<Badge className="absolute bottom-2 left-2 gap-1 bg-amber-500 text-white border-0">
					<BadgeCheck className="size-3" />
					Top Rated
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2">
				<RatingDisplay rating={item.rating} reviews={item.totalReviews} />
			</div>
			<MiniRatingBreakdown breakdown={item.ratingBreakdown} />
			<div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
				<ThumbsUp className="size-3 text-green-600" />
				<span>{item.recommended}% would recommend</span>
			</div>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Professional DSLR Camera', price: 1299.00, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', rating: 4.8, totalReviews: 3456, ratingBreakdown: [{ stars: 5, percentage: 72 }, { stars: 4, percentage: 18 }, { stars: 3, percentage: 6 }, { stars: 2, percentage: 3 }, { stars: 1, percentage: 1 }], recommended: 94, href: '/product/1' },
		{ id: '2', name: 'Prime Camera Lens 50mm', price: 449.00, image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop', rating: 4.9, totalReviews: 1234, ratingBreakdown: [{ stars: 5, percentage: 85 }, { stars: 4, percentage: 10 }, { stars: 3, percentage: 3 }, { stars: 2, percentage: 1 }, { stars: 1, percentage: 1 }], recommended: 98, href: '/product/2' },
		{ id: '3', name: 'Camera Tripod Stand', price: 129.00, image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=400&h=400&fit=crop', rating: 4.3, totalReviews: 892, ratingBreakdown: [{ stars: 5, percentage: 55 }, { stars: 4, percentage: 25 }, { stars: 3, percentage: 12 }, { stars: 2, percentage: 5 }, { stars: 1, percentage: 3 }], recommended: 82, href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Wishlist</h1>
					<p className="text-muted-foreground mt-1">Detailed ratings for your saved items</p>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
