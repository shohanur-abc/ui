import Link from 'next/link';
import { Heart, ShoppingCart, X, TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PriceHistory {
	trend: 'up' | 'down' | 'stable';
	change: number;
	lowestPrice: number;
	highestPrice: number;
}

interface WishlistItem {
	id: string;
	name: string;
	image: string;
	currentPrice: number;
	priceHistory: PriceHistory;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const PriceTrend = ({ trend, change }: { trend: 'up' | 'down' | 'stable'; change: number }) => {
	const Icon = trend === 'up' ? TrendingUp : trend === 'down' ? TrendingDown : Minus;
	const color = trend === 'down' ? 'text-green-600' : trend === 'up' ? 'text-red-600' : 'text-muted-foreground';

	return (
		<div className={`flex items-center gap-1 ${color}`}>
			<Icon className="size-4" />
			<span className="text-sm font-medium">
				{trend === 'stable' ? 'Stable' : `${change}% ${trend === 'down' ? 'lower' : 'higher'}`}
			</span>
		</div>
	);
};

const PriceRange = ({ lowest, highest, current }: { lowest: number; highest: number; current: number }) => {
	const position = ((current - lowest) / (highest - lowest)) * 100;

	return (
		<div className="mt-3">
			<div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
				<span>Low: ${lowest}</span>
				<span>High: ${highest}</span>
			</div>
			<div className="relative h-2 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full">
				<div
					className="absolute top-1/2 -translate-y-1/2 size-4 bg-white border-2 border-primary rounded-full shadow"
					style={{ left: `calc(${Math.min(Math.max(position, 0), 100)}% - 8px)` }}
				/>
			</div>
		</div>
	);
};

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4 @sm:p-6">
		<div className="flex gap-4 @sm:gap-6">
			<div className="relative size-20 @sm:size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<Button variant="ghost" size="icon-sm">
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex flex-wrap items-center gap-4 mt-2">
					<span className="text-2xl font-bold">${item.currentPrice.toFixed(2)}</span>
					<PriceTrend trend={item.priceHistory.trend} change={item.priceHistory.change} />
				</div>
				<PriceRange
					lowest={item.priceHistory.lowestPrice}
					highest={item.priceHistory.highestPrice}
					current={item.currentPrice}
				/>
				<div className="flex gap-2 mt-4">
					<Button className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
					{item.priceHistory.trend === 'down' && (
						<Badge variant="secondary" className="bg-green-100 text-green-700">
							Good time to buy!
						</Badge>
					)}
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const PriceAlertBanner = () => (
	<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20 mb-6">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-green-500 flex items-center justify-center">
				<TrendingDown className="size-5 text-white" />
			</div>
			<div>
				<p className="font-medium text-green-700">Price Drops Detected!</p>
				<p className="text-sm text-green-600">2 items in your wishlist are at their lowest price</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Apple AirPods Pro (2nd Gen)', image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop', currentPrice: 199.00, priceHistory: { trend: 'down', change: 20, lowestPrice: 189.00, highestPrice: 249.00 }, href: '/product/1' },
		{ id: '2', name: 'Samsung Galaxy Watch 6', image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=200&h=200&fit=crop', currentPrice: 329.00, priceHistory: { trend: 'stable', change: 0, lowestPrice: 299.00, highestPrice: 399.00 }, href: '/product/2' },
		{ id: '3', name: 'Sony PlayStation 5', image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop', currentPrice: 499.00, priceHistory: { trend: 'down', change: 10, lowestPrice: 449.00, highestPrice: 549.00 }, href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Price Tracker</h1>
				<PriceAlertBanner />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
