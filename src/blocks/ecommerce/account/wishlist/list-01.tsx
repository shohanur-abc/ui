import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WishlistItem {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	inStock: boolean;
	isSelected: boolean;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const RatingStars = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-0.5">
		{[...Array(5)].map((_, i) => (
			<Star
				key={i}
				className={`size-3 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
			/>
		))}
	</div>
);

const ItemActions = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="icon-sm">
				<MoreHorizontal className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem>Move to cart</DropdownMenuItem>
			<DropdownMenuItem>Share item</DropdownMenuItem>
			<DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<div className={`flex gap-4 p-4 rounded-xl border bg-card transition-all hover:shadow-md ${item.isSelected ? 'ring-2 ring-primary' : ''}`}>
		<div className="flex items-center">
			<Checkbox checked={item.isSelected} />
		</div>
		<div className="relative size-24 @md:size-32 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
			<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
		</div>
		<div className="flex-1 min-w-0">
			<div className="flex items-start justify-between gap-2">
				<div>
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>
				</div>
				<ItemActions />
			</div>
			<div className="flex items-center gap-2 mt-2">
				<RatingStars rating={item.rating} />
				<Badge variant={item.inStock ? 'secondary' : 'outline'} className={!item.inStock ? 'text-destructive' : ''}>
					{item.inStock ? 'In Stock' : 'Out of Stock'}
				</Badge>
			</div>
			<div className="flex items-center justify-between mt-3">
				<div className="flex items-baseline gap-2">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
					)}
				</div>
				<Button size="sm" className="gap-1.5" disabled={!item.inStock}>
					<ShoppingCart className="size-4" />
					<span className="hidden @sm:inline">Add to Cart</span>
				</Button>
			</div>
		</div>
	</div>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-3">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const ListHeader = ({ items }: { items: WishlistItem[] }) => {
	const selectedCount = items.filter((i) => i.isSelected).length;

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 mb-6">
			<div className="flex items-center gap-3">
				<Checkbox checked={selectedCount === items.length && items.length > 0} />
				<span className="text-sm text-muted-foreground">
					{selectedCount > 0 ? `${selectedCount} selected` : 'Select all'}
				</span>
			</div>
			{selectedCount > 0 && (
				<div className="flex gap-2">
					<Button variant="outline" size="sm" className="gap-1.5 text-destructive">
						<Trash2 className="size-4" />
						Remove
					</Button>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add All
					</Button>
				</div>
			)}
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Wireless Noise-Cancelling Headphones', description: 'Premium audio with 30-hour battery life', price: 299.00, originalPrice: 349.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop', rating: 4.8, inStock: true, isSelected: true, href: '/product/1' },
		{ id: '2', name: 'Mechanical Gaming Keyboard', description: 'RGB backlit with Cherry MX switches', price: 149.00, image: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=200&h=200&fit=crop', rating: 4.6, inStock: true, isSelected: false, href: '/product/2' },
		{ id: '3', name: 'Ultra-Wide Curved Monitor', description: '34-inch QHD display with 144Hz refresh', price: 599.00, originalPrice: 699.00, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop', rating: 4.7, inStock: false, isSelected: false, href: '/product/3' },
		{ id: '4', name: 'Ergonomic Wireless Mouse', description: 'Precision sensor with programmable buttons', price: 79.00, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop', rating: 4.5, inStock: true, isSelected: true, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<ListHeader items={wishlistItems} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
