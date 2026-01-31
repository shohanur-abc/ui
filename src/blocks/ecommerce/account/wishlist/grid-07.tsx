import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, Filter, SortAsc } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
	category: string;
	dateAdded: string;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

interface FilterOption {
	label: string;
	value: string;
}

const Toolbar = ({
	sortOptions,
	filterOptions,
}: {
	sortOptions: FilterOption[];
	filterOptions: FilterOption[];
}) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8">
		<div className="flex items-center gap-2">
			<Heart className="size-5 text-primary fill-primary" />
			<h1 className="text-xl @md:text-2xl font-bold">Saved Items</h1>
		</div>
		<div className="flex items-center gap-2">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<Filter className="size-4" />
						Filter
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{filterOptions.map((option) => (
						<DropdownMenuItem key={option.value}>{option.label}</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="sm" className="gap-2">
						<SortAsc className="size-4" />
						Sort
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{sortOptions.map((option) => (
						<DropdownMenuItem key={option.value}>{option.label}</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden border-0 shadow-none bg-transparent">
		<div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
			<div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
				<Button size="icon-sm" variant="secondary" className="rounded-full shadow-md">
					<Trash2 className="size-3.5 text-destructive" />
				</Button>
			</div>
			<div className="absolute inset-x-2 bottom-2 opacity-0 group-hover:opacity-100 transition-all">
				<Button size="sm" className="w-full gap-1.5 shadow-lg">
					<ShoppingBag className="size-3.5" />
					Add to Bag
				</Button>
			</div>
		</div>
		<CardContent className="p-0 pt-3">
			<Badge variant="secondary" className="mb-1.5 text-[10px] uppercase tracking-wider">
				{item.category}
			</Badge>
			<Link href={item.href}>
				<h3 className="font-medium text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="mt-1.5 font-semibold">${item.price.toFixed(2)}</p>
			<p className="text-xs text-muted-foreground mt-1">Added {item.dateAdded}</p>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 @3xl:grid-cols-6 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Merino Wool Cardigan', price: 120.00, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=300&h=300&fit=crop', category: 'Knitwear', dateAdded: 'Today', href: '/product/1' },
		{ id: '2', name: 'High-Rise Straight Jeans', price: 89.00, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop', category: 'Denim', dateAdded: 'Yesterday', href: '/product/2' },
		{ id: '3', name: 'Silk Wrap Blouse', price: 145.00, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=300&h=300&fit=crop', category: 'Tops', dateAdded: '2 days ago', href: '/product/3' },
		{ id: '4', name: 'Leather Crossbody Bag', price: 195.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=300&h=300&fit=crop', category: 'Bags', dateAdded: '3 days ago', href: '/product/4' },
		{ id: '5', name: 'Cashmere Scarf', price: 85.00, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=300&h=300&fit=crop', category: 'Accessories', dateAdded: '1 week ago', href: '/product/5' },
		{ id: '6', name: 'Suede Ankle Boots', price: 225.00, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=300&h=300&fit=crop', category: 'Shoes', dateAdded: '1 week ago', href: '/product/6' },
	];

	const sortOptions: FilterOption[] = [
		{ label: 'Recently Added', value: 'recent' },
		{ label: 'Price: Low to High', value: 'price-asc' },
		{ label: 'Price: High to Low', value: 'price-desc' },
		{ label: 'Name: A-Z', value: 'name-asc' },
	];

	const filterOptions: FilterOption[] = [
		{ label: 'All Items', value: 'all' },
		{ label: 'In Stock', value: 'in-stock' },
		{ label: 'On Sale', value: 'sale' },
		{ label: 'Price Drop', value: 'price-drop' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Toolbar sortOptions={sortOptions} filterOptions={filterOptions} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
