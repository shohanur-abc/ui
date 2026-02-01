import Link from 'next/link';
import { Heart, ShoppingCart, X, GripVertical, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	image: string;
	price: number;
	priority: 'high' | 'medium' | 'low';
	notes?: string;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const PriorityBadge = ({
	priority,
}: {
	priority: 'high' | 'medium' | 'low';
}) => {
	const styles = {
		high: 'bg-red-100 text-red-700 border-red-200',
		medium: 'bg-amber-100 text-amber-700 border-amber-200',
		low: 'bg-blue-100 text-blue-700 border-blue-200',
	};

	return (
		<Badge variant="outline" className={styles[priority]}>
			{priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
		</Badge>
	);
};

const ListItem = ({ item, index }: { item: WishlistItem; index: number }) => (
	<Card className="group p-4 transition-all hover:shadow-md">
		<div className="flex items-center gap-4">
			<div className="flex items-center gap-3">
				<div className="cursor-grab text-muted-foreground hover:text-foreground">
					<GripVertical className="size-5" />
				</div>
				<span className="text-2xl font-bold text-muted-foreground/50 w-8">
					#{index + 1}
				</span>
			</div>
			<div className="relative size-16 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center gap-2 flex-wrap">
					<Link href={item.href}>
						<h3 className="font-semibold hover:text-primary transition-colors">
							{item.name}
						</h3>
					</Link>
					<PriorityBadge priority={item.priority} />
				</div>
				{item.notes && (
					<p className="text-sm text-muted-foreground mt-1 line-clamp-1">
						{item.notes}
					</p>
				)}
			</div>
			<div className="flex items-center gap-4">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				<div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<Button size="icon-sm" variant="ghost">
						<ShoppingCart className="size-4" />
					</Button>
					<Button size="icon-sm" variant="ghost" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-2">
		{items.map((item, index) => (
			<ListItem key={item.id} item={item} index={index} />
		))}
	</div>
);

const DragHint = () => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
		<Move className="size-4" />
		<span>Drag items to reorder your wishlist</span>
	</div>
);

const PriorityLegend = () => (
	<div className="flex flex-wrap gap-3 mb-6">
		{(['high', 'medium', 'low'] as const).map((priority) => (
			<div key={priority} className="flex items-center gap-2">
				<PriorityBadge priority={priority} />
			</div>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'MacBook Pro 16"',
			image:
				'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
			price: 2499.0,
			priority: 'high',
			notes: 'Need for work upgrade',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Bose QuietComfort Ultra',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 429.0,
			priority: 'high',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Herman Miller Aeron Chair',
			image:
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop',
			price: 1395.0,
			priority: 'medium',
			notes: 'Wait for sale',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Kindle Paperwhite',
			image:
				'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&h=100&fit=crop',
			price: 149.0,
			priority: 'low',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Nike Air Max 90',
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			price: 130.0,
			priority: 'low',
			notes: 'Birthday gift idea',
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-2">
					Prioritized Wishlist
				</h1>
				<p className="text-muted-foreground mb-6">
					Organize items by importance
				</p>
				<PriorityLegend />
				<DragHint />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
