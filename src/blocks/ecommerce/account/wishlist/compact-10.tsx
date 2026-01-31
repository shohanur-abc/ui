import Link from 'next/link';
import { ShoppingCart, Filter, SortAsc, Grid2X2, List, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	category: string;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const SearchAndFilter = () => (
	<div className="space-y-3 mb-4">
		<div className="relative">
			<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
			<Input placeholder="Search wishlist..." className="pl-9" />
		</div>
		<div className="flex gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-1 flex-1">
						<Filter className="size-3" />
						Category
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>All</DropdownMenuItem>
					<DropdownMenuItem>Electronics</DropdownMenuItem>
					<DropdownMenuItem>Fashion</DropdownMenuItem>
					<DropdownMenuItem>Home</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-1 flex-1">
						<SortAsc className="size-3" />
						Sort
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem>Date Added</DropdownMenuItem>
					<DropdownMenuItem>Price: Low to High</DropdownMenuItem>
					<DropdownMenuItem>Price: High to Low</DropdownMenuItem>
					<DropdownMenuItem>Name</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
			<div className="flex border rounded-md">
				<Button variant="ghost" size="icon-sm" className="rounded-r-none">
					<Grid2X2 className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm" className="rounded-l-none border-l">
					<List className="size-4" />
				</Button>
			</div>
		</div>
	</div>
);

const CompactItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex items-center gap-2 p-2 hover:bg-muted rounded-lg transition-colors">
		<div className="size-10 rounded overflow-hidden bg-muted flex-shrink-0">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<Link href={item.href}>
				<p className="text-sm font-medium truncate hover:text-primary transition-colors">{item.name}</p>
			</Link>
			<Badge variant="outline" className="text-[10px]">{item.category}</Badge>
		</div>
		<span className="text-sm font-bold flex-shrink-0">${item.price}</span>
		<Button variant="ghost" size="icon-sm" className="flex-shrink-0">
			<ShoppingCart className="size-4" />
		</Button>
	</div>
);

const CompactList = ({ items }: CompactProps) => (
	<div className="divide-y">
		{items.map((item) => (
			<CompactItem key={item.id} item={item} />
		))}
	</div>
);

const ResultsInfo = ({ count, total }: { count: number; total: number }) => (
	<div className="flex items-center justify-between mb-3 text-sm text-muted-foreground">
		<span>Showing {count} of {total} items</span>
		<Button variant="link" size="sm" className="p-0 h-auto">Clear Filters</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Bluetooth Speaker', price: 79, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop', category: 'Electronics', href: '/product/1' },
		{ id: '2', name: 'Denim Jacket', price: 129, image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=100&h=100&fit=crop', category: 'Fashion', href: '/product/2' },
		{ id: '3', name: 'Plant Pot', price: 35, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=100&h=100&fit=crop', category: 'Home', href: '/product/3' },
		{ id: '4', name: 'Wireless Mouse', price: 49, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop', category: 'Electronics', href: '/product/4' },
		{ id: '5', name: 'Sneakers', price: 145, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop', category: 'Fashion', href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<h1 className="text-lg font-bold mb-4">My Wishlist</h1>
				<SearchAndFilter />
				<ResultsInfo count={5} total={12} />
				<CompactList items={wishlistItems} />
			</div>
		</section>
	);
}
