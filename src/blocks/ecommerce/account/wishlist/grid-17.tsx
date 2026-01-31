import Link from 'next/link';
import { Heart, ShoppingCart, X, Calendar, RotateCcw, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	addedDate: string;
	lastViewed: string;
	viewCount: number;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const ActivityIndicator = ({ addedDate, lastViewed, viewCount }: { addedDate: string; lastViewed: string; viewCount: number }) => (
	<div className="mt-3 grid grid-cols-2 gap-2 text-xs">
		<div className="flex items-center gap-1.5 text-muted-foreground">
			<Calendar className="size-3" />
			<span>Added {addedDate}</span>
		</div>
		<div className="flex items-center gap-1.5 text-muted-foreground">
			<RotateCcw className="size-3" />
			<span>Viewed {viewCount}x</span>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
		<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-all duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			{item.originalPrice && (
				<Badge className="absolute top-2 left-2" variant="destructive">
					-{Math.round((1 - item.price / item.originalPrice) * 100)}%
				</Badge>
			)}
			<div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all">
				<Button className="w-full gap-2 shadow-xl">
					<ShoppingCart className="size-4" />
					Quick Add
				</Button>
			</div>
		</div>
		<CardContent className="p-4">
			<Link href={item.href} className="group/link">
				<h3 className="font-semibold line-clamp-1 group-hover/link:text-primary transition-colors inline-flex items-center gap-1">
					{item.name}
					<ArrowRight className="size-3.5 opacity-0 -translate-x-1 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all" />
				</h3>
			</Link>
			<div className="mt-1.5 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<ActivityIndicator addedDate={item.addedDate} lastViewed={item.lastViewed} viewCount={item.viewCount} />
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

const SummaryBanner = ({ totalItems, totalValue, savings }: { totalItems: number; totalValue: number; savings: number }) => (
	<div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 mb-6 @md:mb-8">
		<div className="text-center">
			<p className="text-2xl @md:text-3xl font-bold">{totalItems}</p>
			<p className="text-xs text-muted-foreground">Items Saved</p>
		</div>
		<div className="text-center border-x border-border/50">
			<p className="text-2xl @md:text-3xl font-bold">${totalValue.toFixed(0)}</p>
			<p className="text-xs text-muted-foreground">Total Value</p>
		</div>
		<div className="text-center">
			<p className="text-2xl @md:text-3xl font-bold text-green-600">${savings.toFixed(0)}</p>
			<p className="text-xs text-muted-foreground">Potential Savings</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Minimalist Desk Lamp', price: 89.99, originalPrice: 129.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', addedDate: '2 days ago', lastViewed: 'Today', viewCount: 5, href: '/product/1' },
		{ id: '2', name: 'Ergonomic Mouse', price: 79.00, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop', addedDate: '1 week ago', lastViewed: 'Yesterday', viewCount: 3, href: '/product/2' },
		{ id: '3', name: 'Mechanical Keyboard', price: 159.99, originalPrice: 199.99, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop', addedDate: '3 days ago', lastViewed: 'Today', viewCount: 8, href: '/product/3' },
		{ id: '4', name: 'Monitor Stand', price: 49.99, image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400&h=400&fit=crop', addedDate: '2 weeks ago', lastViewed: '3 days ago', viewCount: 2, href: '/product/4' },
	];

	const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
	const savings = wishlistItems.reduce((sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<SummaryBanner totalItems={wishlistItems.length} totalValue={totalValue} savings={savings} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
