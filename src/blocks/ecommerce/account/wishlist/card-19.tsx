import Link from 'next/link';
import { Heart, ShoppingCart, X, Clock, RotateCcw, PackageCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	addedDate: string;
	daysOnList: number;
	purchaseHistory: number;
	lastPurchased?: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const TimeOnList = ({ days }: { days: number }) => {
	const color = days > 30 ? 'text-amber-600' : days > 7 ? 'text-muted-foreground' : 'text-green-600';
	const label = days > 30 ? 'Been waiting' : days > 7 ? 'On list' : 'Recently added';

	return (
		<div className={`flex items-center gap-1 text-xs ${color}`}>
			<Clock className="size-3" />
			<span>{label}: {days} days</span>
		</div>
	);
};

const PurchaseHistory = ({ count, lastDate }: { count: number; lastDate?: string }) => {
	if (count === 0) return null;

	return (
		<div className="mt-2 p-2 rounded-lg bg-muted/50">
			<div className="flex items-center gap-2 text-xs">
				<RotateCcw className="size-3 text-primary" />
				<span>Purchased {count} time{count > 1 ? 's' : ''}</span>
			</div>
			{lastDate && (
				<p className="text-[10px] text-muted-foreground mt-1">Last: {lastDate}</p>
			)}
		</div>
	);
};

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
			{item.purchaseHistory > 0 && (
				<Badge className="absolute bottom-2 left-2 gap-1" variant="secondary">
					<PackageCheck className="size-3" />
					Repeat Buy
				</Badge>
			)}
			{item.daysOnList > 30 && (
				<Badge className="absolute bottom-2 right-2" variant="outline" className="bg-amber-500/10 text-amber-700 border-amber-300">
					Long-term
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<TimeOnList days={item.daysOnList} />
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<PurchaseHistory count={item.purchaseHistory} lastDate={item.lastPurchased} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				{item.purchaseHistory > 0 ? 'Buy Again' : 'Add to Cart'}
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const StatsHeader = ({ items }: { items: WishlistItem[] }) => {
	const avgDays = Math.round(items.reduce((sum, item) => sum + item.daysOnList, 0) / items.length);
	const repeatItems = items.filter((item) => item.purchaseHistory > 0).length;

	return (
		<div className="flex flex-wrap gap-4 mb-6 @md:mb-8">
			<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
				<Clock className="size-4 text-muted-foreground" />
				<span className="text-sm">Avg. {avgDays} days on list</span>
			</div>
			<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
				<RotateCcw className="size-4 text-primary" />
				<span className="text-sm">{repeatItems} repeat purchases</span>
			</div>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Organic Coffee Beans', price: 24.99, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop', addedDate: 'Sept 1', daysOnList: 45, purchaseHistory: 3, lastPurchased: 'Aug 15', href: '/product/1' },
		{ id: '2', name: 'Protein Powder', price: 49.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=400&fit=crop', addedDate: 'Oct 10', daysOnList: 12, purchaseHistory: 5, lastPurchased: 'Sept 28', href: '/product/2' },
		{ id: '3', name: 'Green Tea Matcha', price: 29.99, image: 'https://images.unsplash.com/photo-1565799943715-8c3f4e1f3e1c?w=400&h=400&fit=crop', addedDate: 'Oct 18', daysOnList: 4, purchaseHistory: 0, href: '/product/3' },
		{ id: '4', name: 'Vitamin D Supplements', price: 19.99, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop', addedDate: 'Aug 25', daysOnList: 58, purchaseHistory: 2, lastPurchased: 'July 20', href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Wishlist History</h1>
				<StatsHeader items={wishlistItems} />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
