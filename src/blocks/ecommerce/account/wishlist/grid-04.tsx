import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	reviewCount: number;
	stockLevel: number;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const StatsBar = ({
	itemCount,
	totalValue,
}: {
	itemCount: number;
	totalValue: number;
}) => (
	<div className="flex flex-wrap items-center gap-4 @md:gap-8 mb-6 @md:mb-8 p-4 rounded-lg bg-muted/50">
		<div>
			<p className="text-sm text-muted-foreground">Total Items</p>
			<p className="text-2xl font-bold">{itemCount}</p>
		</div>
		<div className="h-10 w-px bg-border hidden @sm:block" />
		<div>
			<p className="text-sm text-muted-foreground">Total Value</p>
			<p className="text-2xl font-bold">${totalValue.toFixed(2)}</p>
		</div>
		<div className="ml-auto flex gap-2">
			<Button variant="outline" size="sm">
				Clear All
			</Button>
			<Button size="sm" className="gap-2">
				<ShoppingCart className="size-4" />
				Add All to Cart
			</Button>
		</div>
	</div>
);

const StockIndicator = ({ level }: { level: number }) => {
	const isLow = level < 30;
	return (
		<div className="mt-3">
			<div className="flex items-center justify-between text-xs mb-1">
				<span
					className={
						isLow
							? 'text-destructive flex items-center gap-1'
							: 'text-muted-foreground'
					}
				>
					{isLow && <AlertCircle className="size-3" />}
					{isLow ? 'Low stock' : 'In stock'}
				</span>
				<span className="text-muted-foreground">{level}%</span>
			</div>
			<Progress
				value={level}
				className={`h-1 ${isLow ? '[&>div]:bg-destructive' : ''}`}
			/>
		</div>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<div className="relative aspect-square overflow-hidden">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="ghost"
				className="absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			{item.originalPrice && (
				<Badge className="absolute bottom-2 left-2" variant="destructive">
					{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-1 flex items-center gap-2">
				<div className="flex items-center gap-0.5">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < Math.floor(item.rating) ? 'fill-primary text-primary' : 'text-muted'}`}
						/>
					))}
				</div>
				<span className="text-xs text-muted-foreground">
					({item.reviewCount})
				</span>
			</div>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<StockIndicator level={item.stockLevel} />
		</CardContent>
		<CardFooter className="p-4 pt-0">
			<Button className="w-full gap-2" disabled={item.stockLevel === 0}>
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardFooter>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Noise-Canceling Headphones',
			price: 279.99,
			originalPrice: 349.99,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			rating: 4.8,
			reviewCount: 2431,
			stockLevel: 65,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Fitness Watch',
			price: 199.0,
			image:
				'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
			rating: 4.5,
			reviewCount: 1829,
			stockLevel: 12,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Premium Yoga Mat',
			price: 89.99,
			originalPrice: 119.99,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop',
			rating: 4.7,
			reviewCount: 892,
			stockLevel: 45,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Stainless Steel Water Bottle',
			price: 34.99,
			image:
				'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop',
			rating: 4.6,
			reviewCount: 3102,
			stockLevel: 78,
			href: '/product/4',
		},
	];

	const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<StatsBar itemCount={wishlistItems.length} totalValue={totalValue} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
