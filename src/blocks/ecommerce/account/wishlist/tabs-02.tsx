import Link from 'next/link';
import { Heart, ShoppingCart, Folder, Plus, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	href: string;
}

interface Collection {
	id: string;
	name: string;
	color: string;
	items: WishlistItem[];
}

interface TabsProps {
	collections: Collection[];
}

const ItemCard = ({ item }: { item: WishlistItem }) => (
	<div className="group rounded-xl overflow-hidden bg-card border hover:border-primary transition-colors">
		<div className="aspect-square overflow-hidden bg-muted">
			<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform" />
		</div>
		<div className="p-3">
			<p className="font-medium text-sm truncate">{item.name}</p>
			<div className="flex items-center justify-between mt-2">
				<span className="font-bold">${item.price.toFixed(2)}</span>
				<Button size="sm" variant="ghost">
					<ShoppingCart className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const CollectionHeader = ({ collection }: { collection: Collection }) => (
	<div className="flex items-center justify-between mb-6">
		<div className="flex items-center gap-3">
			<div className="size-4 rounded-full" style={{ backgroundColor: collection.color }} />
			<h2 className="text-lg font-bold">{collection.name}</h2>
			<Badge variant="secondary">{collection.items.length} items</Badge>
		</div>
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontal className="size-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem>
					<Pencil className="size-4 mr-2" /> Rename
				</DropdownMenuItem>
				<DropdownMenuItem className="text-destructive">
					<Trash2 className="size-4 mr-2" /> Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	</div>
);

const ItemGrid = ({ items }: { items: WishlistItem[] }) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-4">
		{items.map((item) => (
			<ItemCard key={item.id} item={item} />
		))}
		<button className="aspect-square rounded-xl border-2 border-dashed flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors">
			<Plus className="size-6" />
			<span className="text-sm mt-1">Add Item</span>
		</button>
	</div>
);

export default function Main() {
	const collections: Collection[] = [
		{
			id: '1',
			name: 'Birthday Wishlist',
			color: '#f472b6',
			items: [
				{ id: '1', name: 'Designer Watch', price: 450, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop', href: '/product/1' },
				{ id: '2', name: 'Leather Bag', price: 299, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', href: '/product/2' },
				{ id: '3', name: 'Perfume Set', price: 185, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop', href: '/product/3' },
			],
		},
		{
			id: '2',
			name: 'Home Office',
			color: '#60a5fa',
			items: [
				{ id: '4', name: 'Ergonomic Chair', price: 549, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop', href: '/product/4' },
				{ id: '5', name: 'Standing Desk', price: 699, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop', href: '/product/5' },
			],
		},
		{
			id: '3',
			name: 'Travel Gear',
			color: '#34d399',
			items: [
				{ id: '6', name: 'Carry-On Luggage', price: 289, image: 'https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=400&h=400&fit=crop', href: '/product/6' },
				{ id: '7', name: 'Travel Backpack', price: 159, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', href: '/product/7' },
				{ id: '8', name: 'Noise-Canceling Headphones', price: 349, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', href: '/product/8' },
				{ id: '9', name: 'Packing Cubes', price: 35, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', href: '/product/9' },
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">My Collections</h1>
					<Button variant="outline" className="gap-2">
						<Folder className="size-4" />
						New Collection
					</Button>
				</div>
				<Tabs defaultValue={collections[0].id} className="w-full">
					<TabsList className="w-full @sm:w-auto mb-6 overflow-x-auto">
						{collections.map((collection) => (
							<TabsTrigger key={collection.id} value={collection.id} className="gap-2">
								<div className="size-2 rounded-full" style={{ backgroundColor: collection.color }} />
								{collection.name}
							</TabsTrigger>
						))}
						<TabsTrigger value="new" className="gap-1 text-muted-foreground">
							<Plus className="size-4" />
						</TabsTrigger>
					</TabsList>
					{collections.map((collection) => (
						<TabsContent key={collection.id} value={collection.id}>
							<CollectionHeader collection={collection} />
							<ItemGrid items={collection.items} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
