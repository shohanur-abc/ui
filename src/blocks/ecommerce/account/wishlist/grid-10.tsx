import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ExternalLink, Share } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	store: string;
	storeUrl: string;
	inStock: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const ActionBar = ({ itemCount }: { itemCount: number }) => (
	<div className="flex flex-wrap items-center gap-4 mb-6 @md:mb-8">
		<div className="flex items-center gap-2">
			<Heart className="size-5 text-primary fill-primary" />
			<span className="text-lg font-semibold">{itemCount} Saved Items</span>
		</div>
		<div className="ml-auto flex items-center gap-2">
			<Button variant="ghost" size="sm" className="gap-2">
				<Share className="size-4" />
				Share List
			</Button>
			<Button variant="outline" size="sm" className="gap-2">
				<ShoppingCart className="size-4" />
				Add All to Cart
			</Button>
		</div>
	</div>
);

const StoreLink = ({ store, url }: { store: string; url: string }) => (
	<Link
		href={url}
		className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
	>
		{store}
		<ExternalLink className="size-3" />
	</Link>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<CardHeader className="p-0">
			<div className="relative aspect-square overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				{!item.inStock && (
					<div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm">
						<Badge variant="secondary">Out of Stock</Badge>
					</div>
				)}
				<div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
					<Button
						size="icon-sm"
						variant="destructive"
						className="rounded-full shadow-lg"
					>
						<Trash2 className="size-3.5" />
					</Button>
				</div>
				{item.originalPrice && (
					<Badge className="absolute top-2 left-2" variant="destructive">
						-{Math.round((1 - item.price / item.originalPrice) * 100)}%
					</Badge>
				)}
			</div>
		</CardHeader>
		<CardContent className="p-4">
			<StoreLink store={item.store} url={item.storeUrl} />
			<Link href={item.href}>
				<h3 className="mt-1 font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<Separator className="my-3" />
			<Button className="w-full gap-2" size="sm" disabled={!item.inStock}>
				<ShoppingCart className="size-4" />
				{item.inStock ? 'Add to Cart' : 'Notify Me'}
			</Button>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 @2xl:grid-cols-5 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Earbuds Pro',
			price: 149.99,
			originalPrice: 199.99,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
			store: 'TechWorld',
			storeUrl: '/store/techworld',
			inStock: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Home Speaker',
			price: 79.99,
			image:
				'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop',
			store: 'HomeHub',
			storeUrl: '/store/homehub',
			inStock: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Mechanical Keyboard RGB',
			price: 129.99,
			image:
				'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop',
			store: 'GamersEdge',
			storeUrl: '/store/gamersedge',
			inStock: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'USB-C Hub 7-in-1',
			price: 49.99,
			originalPrice: 69.99,
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=400&fit=crop',
			store: 'TechWorld',
			storeUrl: '/store/techworld',
			inStock: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Webcam 4K Ultra HD',
			price: 199.99,
			image:
				'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop',
			store: 'StreamPro',
			storeUrl: '/store/streampro',
			inStock: true,
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-2">My Wishlist</h1>
				<ActionBar itemCount={wishlistItems.length} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
