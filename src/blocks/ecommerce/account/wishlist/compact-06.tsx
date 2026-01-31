import Link from 'next/link';
import { Heart, ShoppingCart, X, Grip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	priority: number;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const PriorityItem = ({ item, index }: { item: WishlistItem; index: number }) => (
	<div className="flex items-center gap-2 p-2 rounded-lg bg-card border hover:border-primary transition-colors cursor-move">
		<Grip className="size-4 text-muted-foreground flex-shrink-0" />
		<div className="size-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">
			{index + 1}
		</div>
		<div className="size-10 rounded overflow-hidden bg-muted flex-shrink-0">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="text-sm font-medium truncate hover:text-primary transition-colors">{item.name}</p>
			</Link>
		</div>
		<span className="text-sm font-bold flex-shrink-0">${item.price}</span>
		<Button variant="ghost" size="icon-sm" className="flex-shrink-0">
			<ShoppingCart className="size-4" />
		</Button>
	</div>
);

const PriorityList = ({ items }: CompactProps) => (
	<div className="space-y-2">
		{items
			.sort((a, b) => a.priority - b.priority)
			.map((item, index) => (
				<PriorityItem key={item.id} item={item} index={index} />
			))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Camera Lens 50mm', price: 449, image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&h=100&fit=crop', priority: 1, href: '/product/1' },
		{ id: '2', name: 'Camera Body', price: 1299, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=100&h=100&fit=crop', priority: 2, href: '/product/2' },
		{ id: '3', name: 'Tripod Stand', price: 189, image: 'https://images.unsplash.com/photo-1586253634026-8cb574908d1e?w=100&h=100&fit=crop', priority: 3, href: '/product/3' },
		{ id: '4', name: 'Camera Bag', price: 129, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop', priority: 4, href: '/product/4' },
		{ id: '5', name: 'SD Card 256GB', price: 79, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=100&h=100&fit=crop', priority: 5, href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-lg font-bold">Priority List</h1>
					<p className="text-xs text-muted-foreground">Drag to reorder</p>
				</div>
				<PriorityList items={wishlistItems} />
			</div>
		</section>
	);
}
