import Link from 'next/link';
import { Heart, ShoppingCart, X, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	images: string[];
	rating: number;
	reviews: number;
	description: string;
	inStock: boolean;
	href: string;
}

interface SplitProps {
	items: WishlistItem[];
	selectedItem: WishlistItem;
}

const ItemList = ({ items, selectedId }: { items: WishlistItem[]; selectedId: string }) => (
	<div className="space-y-2 overflow-y-auto h-full pr-2">
		{items.map((item) => (
			<div
				key={item.id}
				className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${item.id === selectedId ? 'bg-primary/10 border-2 border-primary' : 'bg-card border hover:border-primary/50'}`}
			>
				<div className="size-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
					<img src={item.image} alt={item.name} className="size-full object-cover" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="font-medium text-sm truncate">{item.name}</p>
					<div className="flex items-center gap-1 text-xs text-muted-foreground">
						<Star className="size-3 fill-amber-400 text-amber-400" />
						{item.rating} ({item.reviews})
					</div>
					<p className="text-sm font-bold mt-0.5">${item.price.toFixed(2)}</p>
				</div>
			</div>
		))}
	</div>
);

const DetailPanel = ({ item }: { item: WishlistItem }) => (
	<div className="h-full flex flex-col">
		<div className="aspect-square rounded-xl overflow-hidden bg-muted relative">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
			{item.originalPrice && (
				<Badge className="absolute top-3 left-3 bg-red-500">
					{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
				</Badge>
			)}
			<div className="absolute bottom-3 left-3 right-3 flex gap-1">
				{item.images.slice(0, 4).map((img, i) => (
					<div key={i} className="size-12 rounded-lg overflow-hidden bg-muted/90 border-2 border-white">
						<img src={img} alt="" className="size-full object-cover" />
					</div>
				))}
			</div>
		</div>
		<div className="flex-1 py-4">
			<h2 className="text-xl font-bold">{item.name}</h2>
			<div className="flex items-center gap-2 mt-1">
				<div className="flex items-center gap-1 text-sm">
					<Star className="size-4 fill-amber-400 text-amber-400" />
					{item.rating}
				</div>
				<span className="text-muted-foreground text-sm">({item.reviews} reviews)</span>
			</div>
			<div className="flex items-baseline gap-2 mt-3">
				<span className="text-2xl font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
				)}
			</div>
			<p className="text-muted-foreground text-sm mt-3">{item.description}</p>
			<Badge variant={item.inStock ? 'default' : 'secondary'} className="mt-3">
				{item.inStock ? 'In Stock' : 'Out of Stock'}
			</Badge>
		</div>
		<div className="flex gap-2">
			<Button className="flex-1 gap-2" disabled={!item.inStock}>
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
			<Button variant="outline" size="icon">
				<X className="size-4" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Premium Wireless Headphones',
			price: 249.99,
			originalPrice: 349.99,
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=100&h=100&fit=crop', 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=100&h=100&fit=crop'],
			rating: 4.8,
			reviews: 2453,
			description: 'Experience premium sound quality with active noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
			inStock: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Watch Pro',
			price: 399.00,
			image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			images: [],
			rating: 4.6,
			reviews: 1829,
			description: 'Advanced health monitoring with GPS and cellular connectivity.',
			inStock: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Leather Messenger Bag',
			price: 189.00,
			image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
			images: [],
			rating: 4.9,
			reviews: 567,
			description: 'Handcrafted genuine leather with laptop compartment.',
			inStock: false,
			href: '/product/3',
		},
	];

	const selectedItem = wishlistItems[0];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">My Wishlist</h1>
				<div className="grid @md:grid-cols-5 gap-6 h-[600px]">
					<div className="@md:col-span-2 overflow-hidden">
						<ItemList items={wishlistItems} selectedId={selectedItem.id} />
					</div>
					<div className="@md:col-span-3">
						<DetailPanel item={selectedItem} />
					</div>
				</div>
			</div>
		</section>
	);
}
