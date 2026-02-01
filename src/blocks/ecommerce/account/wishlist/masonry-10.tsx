import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Bookmark,
	FolderOpen,
	Plus,
	MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Collection {
	id: string;
	name: string;
	color: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	collections: Collection[];
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-44',
	medium: 'h-60',
	tall: 'h-76',
};

const CollectionDots = ({ collections }: { collections: Collection[] }) => (
	<div className="flex gap-0.5">
		{collections.slice(0, 4).map((col) => (
			<div
				key={col.id}
				className="size-2.5 rounded-full"
				style={{ backgroundColor: col.color }}
				title={col.name}
			/>
		))}
		{collections.length > 4 && (
			<span className="text-[10px] text-muted-foreground ml-0.5">
				+{collections.length - 4}
			</span>
		)}
	</div>
);

const CollectionBadges = ({ collections }: { collections: Collection[] }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{collections.map((col) => (
			<Badge
				key={col.id}
				variant="outline"
				className="text-[10px] px-1.5 py-0 gap-1"
				style={{ borderColor: col.color, color: col.color }}
			>
				<div
					className="size-1.5 rounded-full"
					style={{ backgroundColor: col.color }}
				/>
				{col.name}
			</Badge>
		))}
	</div>
);

const ItemActions = ({ item }: { item: WishlistItem }) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button
				variant="ghost"
				size="icon-sm"
				className="bg-background/80 backdrop-blur-sm"
			>
				<MoreHorizontal className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem className="gap-2">
				<FolderOpen className="size-4" />
				Move to Collection
			</DropdownMenuItem>
			<DropdownMenuItem className="gap-2">
				<Bookmark className="size-4" />
				Add to More Lists
			</DropdownMenuItem>
			<DropdownMenuSeparator />
			<DropdownMenuItem className="gap-2 text-destructive">
				<X className="size-4" />
				Remove
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card className="overflow-hidden group">
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<div className="absolute top-2 left-2">
					<CollectionDots collections={item.collections} />
				</div>
				<div className="absolute top-2 right-2 flex gap-1">
					<Button
						variant="ghost"
						size="icon-sm"
						className="bg-background/80 backdrop-blur-sm"
					>
						<Heart className="size-4 fill-primary text-primary" />
					</Button>
					<ItemActions item={item} />
				</div>
				<div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform">
					<Button size="sm" className="w-full gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
			<div className="p-3">
				<Link href={item.href}>
					<h3 className="font-medium text-sm line-clamp-1 hover:text-primary transition-colors">
						{item.name}
					</h3>
				</Link>
				<CollectionBadges collections={item.collections} />
				<div className="flex items-center justify-between mt-3">
					<span className="font-bold">${item.price.toFixed(2)}</span>
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @md:columns-3 @xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

const CollectionFilters = ({ collections }: { collections: Collection[] }) => (
	<div className="flex flex-wrap gap-2 mb-6">
		<Badge
			variant="secondary"
			className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
		>
			All Items
		</Badge>
		{collections.map((col) => (
			<Badge
				key={col.id}
				variant="outline"
				className="cursor-pointer hover:bg-primary hover:text-primary-foreground gap-1"
				style={{ borderColor: col.color }}
			>
				<div
					className="size-2 rounded-full"
					style={{ backgroundColor: col.color }}
				/>
				{col.name}
			</Badge>
		))}
		<Button variant="ghost" size="sm" className="h-6 px-2 gap-1 text-xs">
			<Plus className="size-3" />
			New Collection
		</Button>
	</div>
);

export default function Main() {
	const allCollections: Collection[] = [
		{ id: 'home', name: 'Home', color: '#22c55e' },
		{ id: 'work', name: 'Work', color: '#3b82f6' },
		{ id: 'travel', name: 'Travel', color: '#f59e0b' },
		{ id: 'gifts', name: 'Gifts', color: '#ec4899' },
		{ id: 'summer', name: 'Summer', color: '#06b6d4' },
	];

	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Leather Weekender Bag',
			price: 295.0,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=500&fit=crop',
			height: 'tall',
			collections: [allCollections[2], allCollections[1]],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Desk Organizer',
			price: 49.0,
			image:
				'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=350&fit=crop',
			height: 'medium',
			collections: [allCollections[0], allCollections[1]],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Portable Charger',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=280&fit=crop',
			height: 'short',
			collections: [allCollections[2]],
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Linen Throw',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
			height: 'medium',
			collections: [allCollections[0]],
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Jewelry Set',
			price: 175.0,
			image:
				'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=480&fit=crop',
			height: 'tall',
			collections: [allCollections[3]],
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Sunhat',
			price: 55.0,
			image:
				'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=300&fit=crop',
			height: 'short',
			collections: [allCollections[4], allCollections[2]],
			href: '/product/6',
		},
		{
			id: '7',
			name: 'Candle Collection',
			price: 85.0,
			image:
				'https://images.unsplash.com/photo-1602874801007-b88e6c4a5b1e?w=400&h=380&fit=crop',
			height: 'medium',
			collections: [allCollections[0], allCollections[3]],
			href: '/product/7',
		},
		{
			id: '8',
			name: 'Sandals',
			price: 120.0,
			image:
				'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400&h=350&fit=crop',
			height: 'short',
			collections: [allCollections[4], allCollections[2]],
			href: '/product/8',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-4">
					<FolderOpen className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Collections</h1>
				</div>
				<CollectionFilters collections={allCollections} />
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
