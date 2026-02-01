import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Trash2,
	Star,
	ChevronDown,
	ArrowUpDown,
	Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
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
	image: string;
	price: number;
	originalPrice?: number;
	rating: number;
	reviews: number;
	inStock: boolean;
	addedDate: string;
	isSelected: boolean;
	href: string;
}

interface TableProps {
	items: WishlistItem[];
}

const SortDropdown = () => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button variant="outline" size="sm" className="gap-1.5">
				<ArrowUpDown className="size-4" />
				Sort
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem>Date Added</DropdownMenuItem>
			<DropdownMenuItem>Price: Low to High</DropdownMenuItem>
			<DropdownMenuItem>Price: High to Low</DropdownMenuItem>
			<DropdownMenuItem>Rating</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
);

const WishlistTable = ({ items }: TableProps) => (
	<div className="border rounded-xl overflow-hidden">
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="w-12">
						<Checkbox />
					</TableHead>
					<TableHead>Product</TableHead>
					<TableHead className="hidden @md:table-cell">Rating</TableHead>
					<TableHead className="hidden @lg:table-cell">Added</TableHead>
					<TableHead>Price</TableHead>
					<TableHead className="text-right">Actions</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item) => (
					<TableRow
						key={item.id}
						className={item.isSelected ? 'bg-primary/5' : ''}
					>
						<TableCell>
							<Checkbox checked={item.isSelected} />
						</TableCell>
						<TableCell>
							<div className="flex items-center gap-3">
								<div className="relative size-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
									<img
										src={item.image}
										alt={item.name}
										className="size-full object-cover"
									/>
								</div>
								<div>
									<Link href={item.href}>
										<p className="font-medium line-clamp-1 hover:text-primary transition-colors">
											{item.name}
										</p>
									</Link>
									<Badge
										variant={item.inStock ? 'secondary' : 'outline'}
										className={`text-xs ${!item.inStock ? 'text-destructive' : ''}`}
									>
										{item.inStock ? 'In Stock' : 'Out of Stock'}
									</Badge>
								</div>
							</div>
						</TableCell>
						<TableCell className="hidden @md:table-cell">
							<div className="flex items-center gap-1">
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<span className="text-sm">{item.rating}</span>
								<span className="text-xs text-muted-foreground">
									({item.reviews})
								</span>
							</div>
						</TableCell>
						<TableCell className="hidden @lg:table-cell">
							<span className="text-sm text-muted-foreground">
								{item.addedDate}
							</span>
						</TableCell>
						<TableCell>
							<div>
								<span className="font-bold">${item.price.toFixed(2)}</span>
								{item.originalPrice && (
									<span className="text-xs text-muted-foreground line-through ml-1">
										${item.originalPrice.toFixed(2)}
									</span>
								)}
							</div>
						</TableCell>
						<TableCell className="text-right">
							<div className="flex items-center justify-end gap-1">
								<Button
									size="sm"
									variant="ghost"
									className="gap-1"
									disabled={!item.inStock}
								>
									<ShoppingCart className="size-4" />
									<span className="hidden @xl:inline">Add</span>
								</Button>
								<Button
									size="icon-sm"
									variant="ghost"
									className="text-destructive"
								>
									<Trash2 className="size-4" />
								</Button>
							</div>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	</div>
);

const TableToolbar = ({ items }: { items: WishlistItem[] }) => {
	const selectedCount = items.filter((i) => i.isSelected).length;

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 mb-4">
			<div className="flex items-center gap-2">
				{selectedCount > 0 && (
					<>
						<span className="text-sm text-muted-foreground">
							{selectedCount} selected
						</span>
						<Button
							variant="outline"
							size="sm"
							className="gap-1.5 text-destructive"
						>
							<Trash2 className="size-4" />
							Remove
						</Button>
					</>
				)}
			</div>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="sm" className="gap-1.5">
					<Filter className="size-4" />
					Filter
				</Button>
				<SortDropdown />
			</div>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Sony WH-1000XM5 Headphones',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 349.0,
			originalPrice: 399.0,
			rating: 4.8,
			reviews: 2341,
			inStock: true,
			addedDate: 'Oct 15, 2024',
			isSelected: false,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Apple MacBook Pro 14"',
			image:
				'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=100&h=100&fit=crop',
			price: 1999.0,
			rating: 4.9,
			reviews: 892,
			inStock: true,
			addedDate: 'Oct 12, 2024',
			isSelected: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Logitech MX Master 3S',
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
			price: 99.0,
			rating: 4.7,
			reviews: 1567,
			inStock: false,
			addedDate: 'Oct 10, 2024',
			isSelected: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Samsung 49" Odyssey G9',
			image:
				'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
			price: 1299.0,
			originalPrice: 1499.0,
			rating: 4.6,
			reviews: 423,
			inStock: true,
			addedDate: 'Oct 8, 2024',
			isSelected: false,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Wishlist</h1>
				<TableToolbar items={wishlistItems} />
				<WishlistTable items={wishlistItems} />
			</div>
		</section>
	);
}
