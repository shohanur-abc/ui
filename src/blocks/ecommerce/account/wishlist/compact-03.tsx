import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, TrendingDown, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	priceChange?: 'up' | 'down';
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const PriceChangeIndicator = ({ change }: { change?: 'up' | 'down' }) => {
	if (!change) return null;
	return change === 'down' ? (
		<TrendingDown className="size-3 text-green-500" />
	) : (
		<TrendingUp className="size-3 text-red-500" />
	);
};

const CompactItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex items-center gap-2 py-2 border-b last:border-0">
		<div className="size-8 flex-shrink-0 rounded overflow-hidden bg-muted">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="text-sm truncate hover:text-primary transition-colors">{item.name}</p>
			</Link>
		</div>
		<div className="flex items-center gap-0.5 text-xs text-muted-foreground flex-shrink-0">
			<Star className="size-3 fill-amber-400 text-amber-400" />
			{item.rating}
		</div>
		<div className="flex items-center gap-1 flex-shrink-0">
			<PriceChangeIndicator change={item.priceChange} />
			<span className="text-sm font-bold">${item.price}</span>
		</div>
		<Button variant="ghost" size="icon-sm" className="size-7 flex-shrink-0">
			<ShoppingCart className="size-3.5" />
		</Button>
	</div>
);

const CompactList = ({ items }: CompactProps) => (
	<div className="bg-card rounded-lg border p-3">
		{items.map((item) => (
			<CompactItem key={item.id} item={item} />
		))}
	</div>
);

const QuickStats = ({ items }: { items: WishlistItem[] }) => {
	const total = items.reduce((sum, item) => sum + item.price, 0);
	const priceDrops = items.filter((item) => item.priceChange === 'down').length;

	return (
		<div className="flex gap-3 mb-4">
			<div className="flex-1 p-3 rounded-lg bg-muted text-center">
				<p className="text-xl font-bold">{items.length}</p>
				<p className="text-xs text-muted-foreground">Items</p>
			</div>
			<div className="flex-1 p-3 rounded-lg bg-muted text-center">
				<p className="text-xl font-bold">${total.toFixed(0)}</p>
				<p className="text-xs text-muted-foreground">Total</p>
			</div>
			<div className="flex-1 p-3 rounded-lg bg-green-50 text-center">
				<p className="text-xl font-bold text-green-600">{priceDrops}</p>
				<p className="text-xs text-green-600">Drops</p>
			</div>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Wireless Mouse', price: 49, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop', rating: 4.8, priceChange: 'down', href: '/product/1' },
		{ id: '2', name: 'USB-C Hub', price: 79, image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop', rating: 4.5, href: '/product/2' },
		{ id: '3', name: 'Webcam HD', price: 89, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=100&h=100&fit=crop', rating: 4.3, priceChange: 'up', href: '/product/3' },
		{ id: '4', name: 'Desk Lamp', price: 59, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop', rating: 4.7, priceChange: 'down', href: '/product/4' },
		{ id: '5', name: 'Monitor Stand', price: 45, image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=100&h=100&fit=crop', rating: 4.6, href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-sm px-4 py-6">
				<h1 className="text-lg font-bold mb-4">Quick View</h1>
				<QuickStats items={wishlistItems} />
				<CompactList items={wishlistItems} />
			</div>
		</section>
	);
}
