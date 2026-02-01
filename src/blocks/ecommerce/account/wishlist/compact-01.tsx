import Link from 'next/link';
import { Heart, ShoppingCart, X, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	inStock: boolean;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const CompactItem = ({ item }: { item: WishlistItem }) => (
	<div
		className={`flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors ${!item.inStock ? 'opacity-60' : ''}`}
	>
		<div className="relative size-12 flex-shrink-0 rounded-md overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="font-medium text-sm truncate hover:text-primary transition-colors">
					{item.name}
				</p>
			</Link>
			<div className="flex items-center gap-2">
				<span className="text-sm font-bold">${item.price.toFixed(2)}</span>
				{!item.inStock && (
					<Badge variant="outline" className="text-[10px]">
						Out of Stock
					</Badge>
				)}
			</div>
		</div>
		<div className="flex items-center gap-1">
			<Button variant="ghost" size="icon-sm" disabled={!item.inStock}>
				<ShoppingCart className="size-4" />
			</Button>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View Details</DropdownMenuItem>
					<DropdownMenuItem>Share</DropdownMenuItem>
					<DropdownMenuItem className="text-destructive">
						Remove
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const CompactList = ({ items }: CompactProps) => (
	<div className="divide-y">
		{items.map((item) => (
			<CompactItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			price: 149.0,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&h=100&fit=crop',
			inStock: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Watch Series 5',
			price: 399.0,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=100&h=100&fit=crop',
			inStock: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Leather Wallet',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
			inStock: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Sunglasses Classic',
			price: 175.0,
			image:
				'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=100&h=100&fit=crop',
			inStock: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Canvas Backpack',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=100&h=100&fit=crop',
			inStock: true,
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Mechanical Keyboard',
			price: 159.0,
			image:
				'https://images.unsplash.com/photo-1595225476474-87563907a212?w=100&h=100&fit=crop',
			inStock: true,
			href: '/product/6',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-lg px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center justify-between mb-4">
					<h1 className="text-lg font-bold">Wishlist</h1>
					<Badge variant="secondary">{wishlistItems.length}</Badge>
				</div>
				<CompactList items={wishlistItems} />
			</div>
		</section>
	);
}
