import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Star,
	Clock,
	TrendingDown,
	Package,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	category: 'all' | 'on-sale' | 'in-stock' | 'recent';
	inStock: boolean;
	onSale: boolean;
	addedDaysAgo: number;
	href: string;
}

interface TabsProps {
	items: WishlistItem[];
}

const ItemCard = ({ item }: { item: WishlistItem }) => (
	<div className="group rounded-xl overflow-hidden bg-card border hover:border-primary transition-colors">
		<div className="aspect-square relative overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover group-hover:scale-105 transition-transform"
			/>
			{item.onSale && (
				<Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
			)}
			{!item.inStock && (
				<div className="absolute inset-0 bg-black/50 flex items-center justify-center">
					<Badge variant="secondary">Out of Stock</Badge>
				</div>
			)}
		</div>
		<div className="p-3">
			<p className="font-medium text-sm truncate">{item.name}</p>
			<div className="flex items-center justify-between mt-2">
				<span className="font-bold">${item.price.toFixed(2)}</span>
				<Button size="sm" variant="ghost" disabled={!item.inStock}>
					<ShoppingCart className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const ItemGrid = ({ items }: { items: WishlistItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-4">
		{items.map((item) => (
			<ItemCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds',
			price: 149,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
			category: 'all',
			inStock: true,
			onSale: true,
			addedDaysAgo: 1,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Watch',
			price: 299,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			category: 'all',
			inStock: true,
			onSale: false,
			addedDaysAgo: 3,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Leather Wallet',
			price: 79,
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
			category: 'all',
			inStock: false,
			onSale: true,
			addedDaysAgo: 7,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Sunglasses',
			price: 175,
			image:
				'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
			category: 'all',
			inStock: true,
			onSale: false,
			addedDaysAgo: 2,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Backpack',
			price: 129,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
			category: 'all',
			inStock: true,
			onSale: true,
			addedDaysAgo: 0,
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Mechanical Keyboard',
			price: 159,
			image:
				'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop',
			category: 'all',
			inStock: true,
			onSale: false,
			addedDaysAgo: 14,
			href: '/product/6',
		},
	];

	const onSaleItems = wishlistItems.filter((item) => item.onSale);
	const inStockItems = wishlistItems.filter((item) => item.inStock);
	const recentItems = wishlistItems.filter((item) => item.addedDaysAgo <= 7);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
				<Tabs defaultValue="all" className="w-full">
					<TabsList className="w-full @sm:w-auto mb-6">
						<TabsTrigger value="all" className="gap-1">
							<Heart className="size-4" />
							All ({wishlistItems.length})
						</TabsTrigger>
						<TabsTrigger value="on-sale" className="gap-1">
							<TrendingDown className="size-4" />
							On Sale ({onSaleItems.length})
						</TabsTrigger>
						<TabsTrigger value="in-stock" className="gap-1">
							<Package className="size-4" />
							In Stock ({inStockItems.length})
						</TabsTrigger>
						<TabsTrigger value="recent" className="gap-1">
							<Clock className="size-4" />
							Recent ({recentItems.length})
						</TabsTrigger>
					</TabsList>
					<TabsContent value="all">
						<ItemGrid items={wishlistItems} />
					</TabsContent>
					<TabsContent value="on-sale">
						<ItemGrid items={onSaleItems} />
					</TabsContent>
					<TabsContent value="in-stock">
						<ItemGrid items={inStockItems} />
					</TabsContent>
					<TabsContent value="recent">
						<ItemGrid items={recentItems} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
