import Link from 'next/link';
import { ShoppingCart, History, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	addedDate: string;
	daysAgo: number;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const TimelineItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex gap-3 relative">
		<div className="flex flex-col items-center">
			<div className="size-3 rounded-full bg-primary" />
			<div className="w-0.5 flex-1 bg-muted -mb-2" />
		</div>
		<div className="flex-1 pb-4">
			<div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
				<Calendar className="size-3" />
				<span>{item.addedDate}</span>
				<span>•</span>
				<span>
					{item.daysAgo === 0
						? 'Today'
						: item.daysAgo === 1
							? 'Yesterday'
							: `${item.daysAgo} days ago`}
				</span>
			</div>
			<div className="flex items-center gap-3 p-2 rounded-lg bg-card border hover:border-primary transition-colors">
				<div className="size-10 rounded overflow-hidden bg-muted flex-shrink-0">
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover"
					/>
				</div>
				<div className="flex-1 min-w-0">
					<Link href={item.href}>
						<p className="text-sm font-medium truncate hover:text-primary transition-colors">
							{item.name}
						</p>
					</Link>
				</div>
				<span className="text-sm font-bold flex-shrink-0">${item.price}</span>
				<Button variant="ghost" size="icon-sm" className="flex-shrink-0">
					<ShoppingCart className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const TimelineList = ({ items }: CompactProps) => (
	<div className="mt-4">
		{items.map((item) => (
			<TimelineItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Ceramic Vase',
			price: 65,
			image:
				'https://images.unsplash.com/photo-1612196808214-b7e41ee33e5d?w=100&h=100&fit=crop',
			addedDate: 'Nov 10, 2024',
			daysAgo: 0,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Throw Pillow',
			price: 45,
			image:
				'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=100&h=100&fit=crop',
			addedDate: 'Nov 9, 2024',
			daysAgo: 1,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Table Lamp',
			price: 89,
			image:
				'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=100&h=100&fit=crop',
			addedDate: 'Nov 7, 2024',
			daysAgo: 3,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Candle Set',
			price: 35,
			image:
				'https://images.unsplash.com/photo-1602874801007-b88e6c4a5b1e?w=100&h=100&fit=crop',
			addedDate: 'Nov 3, 2024',
			daysAgo: 7,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Wall Art',
			price: 129,
			image:
				'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=100&h=100&fit=crop',
			addedDate: 'Oct 28, 2024',
			daysAgo: 13,
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<div className="flex items-center gap-2 mb-4">
					<History className="size-5 text-primary" />
					<h1 className="text-lg font-bold">Recently Added</h1>
				</div>
				<TimelineList items={wishlistItems} />
			</div>
		</section>
	);
}
