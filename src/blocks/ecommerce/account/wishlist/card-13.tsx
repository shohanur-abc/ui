import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	popularity: number;
	viewsToday: number;
	isTrending: boolean;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const PopularityBar = ({ popularity }: { popularity: number }) => (
	<div className="mt-3">
		<div className="flex items-center justify-between text-xs mb-1">
			<span className="text-muted-foreground">Popularity</span>
			<span className="font-medium">{popularity}%</span>
		</div>
		<Progress value={popularity} className="h-1" />
	</div>
);

const ViewCount = ({ views }: { views: number }) => (
	<div className="flex items-center gap-1 text-xs text-muted-foreground">
		<Eye className="size-3" />
		<span>{views} views today</span>
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
			{item.isTrending && (
				<Badge className="absolute bottom-2 left-2 gap-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0">
					<TrendingUp className="size-3" />
					Trending
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<ViewCount views={item.viewsToday} />
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<PopularityBar popularity={item.popularity} />
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

const TrendingHeader = ({ count }: { count: number }) => (
	<div className="flex items-center gap-3 mb-6 @md:mb-8 p-4 rounded-xl bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-purple-500/10 border">
		<div className="size-12 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center">
			<Sparkles className="size-6 text-white" />
		</div>
		<div>
			<h2 className="font-bold text-lg">Trending Items</h2>
			<p className="text-sm text-muted-foreground">{count} items in your wishlist are trending now</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Vintage Polaroid Camera', price: 129.00, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop', popularity: 92, viewsToday: 1234, isTrending: true, href: '/product/1' },
		{ id: '2', name: 'Retro Vinyl Record Player', price: 249.00, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=400&h=400&fit=crop', popularity: 88, viewsToday: 892, isTrending: true, href: '/product/2' },
		{ id: '3', name: 'Neon LED Sign', price: 79.00, image: 'https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?w=400&h=400&fit=crop', popularity: 75, viewsToday: 567, isTrending: false, href: '/product/3' },
		{ id: '4', name: 'Minimalist Wall Clock', price: 55.00, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', popularity: 82, viewsToday: 723, isTrending: true, href: '/product/4' },
	];

	const trendingCount = wishlistItems.filter((item) => item.isTrending).length;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<TrendingHeader count={trendingCount} />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
