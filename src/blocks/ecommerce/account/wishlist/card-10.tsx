import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Trash2,
	Bookmark,
	FolderPlus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	collection?: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
	collections: string[];
}

const CollectionDropdown = ({
	currentCollection,
	collections,
}: {
	currentCollection?: string;
	collections: string[];
}) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="ghost" size="sm" className="gap-1.5 h-7 text-xs">
				<Bookmark className="size-3" />
				{currentCollection || 'Add to Collection'}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="start">
			{collections.map((collection) => (
				<DropdownMenuItem key={collection}>{collection}</DropdownMenuItem>
			))}
			<DropdownMenuSeparator />
			<DropdownMenuItem className="gap-2">
				<FolderPlus className="size-4" />
				New Collection
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const ProductCard = ({
	item,
	collections,
}: {
	item: WishlistItem;
	collections: string[];
}) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<CardHeader className="p-0">
			<div className="relative aspect-square overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="absolute top-2 right-2 flex gap-1">
					<Button
						size="icon-sm"
						variant="secondary"
						className="rounded-full bg-background/80 backdrop-blur-sm text-destructive"
					>
						<Trash2 className="size-4" />
					</Button>
				</div>
				<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
				{item.collection && (
					<Badge className="absolute bottom-2 left-2" variant="secondary">
						{item.collection}
					</Badge>
				)}
			</div>
		</CardHeader>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-lg font-bold mt-2">${item.price.toFixed(2)}</p>
			<CollectionDropdown
				currentCollection={item.collection}
				collections={collections}
			/>
			<Button className="w-full mt-3 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items, collections }: CardGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} collections={collections} />
		))}
	</div>
);

const CollectionTabs = ({
	collections,
	activeCollection,
}: {
	collections: string[];
	activeCollection?: string;
}) => (
	<div className="flex flex-wrap gap-2 mb-6">
		<Button variant={!activeCollection ? 'default' : 'outline'} size="sm">
			All Items
		</Button>
		{collections.map((collection) => (
			<Button
				key={collection}
				variant={activeCollection === collection ? 'default' : 'outline'}
				size="sm"
			>
				{collection}
			</Button>
		))}
		<Button variant="ghost" size="sm" className="gap-1.5">
			<FolderPlus className="size-4" />
			New
		</Button>
	</div>
);

export default function Main() {
	const collections = ['Summer Picks', 'Gift Ideas', 'Home Office'];

	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Linen Beach Shirt',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
			collection: 'Summer Picks',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Straw Sun Hat',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop',
			collection: 'Summer Picks',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Desk Organizer Set',
			price: 55.0,
			image:
				'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=400&h=400&fit=crop',
			collection: 'Home Office',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Leather Journal',
			price: 35.0,
			image:
				'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop',
			collection: 'Gift Ideas',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Wireless Earbuds',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Ceramic Mug Set',
			price: 42.0,
			image:
				'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400&h=400&fit=crop',
			collection: 'Gift Ideas',
			href: '/product/6',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Collections</h1>
				<CollectionTabs collections={collections} />
				<CardGrid items={wishlistItems} collections={collections} />
			</div>
		</section>
	);
}
