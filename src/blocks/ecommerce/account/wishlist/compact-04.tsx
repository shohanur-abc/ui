import Link from 'next/link';
import { Heart, Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const ThumbnailItem = ({ item }: { item: WishlistItem }) => (
	<div className="relative group">
		<Link href={item.href}>
			<div className="aspect-square rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform" />
			</div>
		</Link>
		<Button
			variant="ghost"
			size="icon-sm"
			className="absolute -top-1 -right-1 size-5 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
		>
			<X className="size-3" />
		</Button>
		<p className="text-xs truncate mt-1">{item.name}</p>
		<p className="text-xs font-bold">${item.price}</p>
	</div>
);

const ThumbnailGrid = ({ items }: CompactProps) => (
	<div className="grid grid-cols-4 @sm:grid-cols-5 @md:grid-cols-6 gap-3">
		{items.map((item) => (
			<ThumbnailItem key={item.id} item={item} />
		))}
		<button className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-muted-foreground hover:border-primary hover:text-primary transition-colors">
			<Plus className="size-5" />
			<span className="text-[10px] mt-1">Add</span>
		</button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Watch', price: 249, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=100&h=100&fit=crop', href: '/product/1' },
		{ id: '2', name: 'Sneakers', price: 95, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=100&h=100&fit=crop', href: '/product/2' },
		{ id: '3', name: 'Backpack', price: 129, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop', href: '/product/3' },
		{ id: '4', name: 'Sunglasses', price: 175, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&h=100&fit=crop', href: '/product/4' },
		{ id: '5', name: 'Hat', price: 45, image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=100&h=100&fit=crop', href: '/product/5' },
		{ id: '6', name: 'Wallet', price: 89, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop', href: '/product/6' },
		{ id: '7', name: 'Belt', price: 59, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop', href: '/product/7' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<div className="flex items-center justify-between mb-4">
					<div className="flex items-center gap-2">
						<Heart className="size-5 fill-primary text-primary" />
						<h1 className="text-lg font-bold">Saved</h1>
					</div>
					<Badge variant="secondary">{wishlistItems.length}</Badge>
				</div>
				<ThumbnailGrid items={wishlistItems} />
			</div>
		</section>
	);
}
