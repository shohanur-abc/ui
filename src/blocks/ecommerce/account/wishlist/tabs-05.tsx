import Link from 'next/link';
import { Heart, ShoppingCart, LayoutGrid, LayoutList, Table, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	brand: string;
	inStock: boolean;
	href: string;
}

interface ViewProps {
	items: WishlistItem[];
}

const GridView = ({ items }: ViewProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @md:grid-cols-4 gap-4">
		{items.map((item) => (
			<div key={item.id} className="group rounded-xl overflow-hidden bg-card border hover:border-primary transition-colors">
				<div className="aspect-square relative overflow-hidden bg-muted">
					<img src={item.image} alt={item.name} className="size-full object-cover group-hover:scale-105 transition-transform" />
					{item.originalPrice && (
						<Badge className="absolute top-2 left-2 bg-red-500">Sale</Badge>
					)}
				</div>
				<div className="p-3">
					<p className="text-xs text-muted-foreground">{item.brand}</p>
					<p className="font-medium text-sm truncate mt-0.5">{item.name}</p>
					<div className="flex items-center gap-1 mt-1">
						<Star className="size-3 fill-amber-400 text-amber-400" />
						<span className="text-xs">{item.rating}</span>
					</div>
					<div className="flex items-center justify-between mt-2">
						<div className="flex items-baseline gap-1">
							<span className="font-bold">${item.price}</span>
							{item.originalPrice && (
								<span className="text-xs text-muted-foreground line-through">${item.originalPrice}</span>
							)}
						</div>
						<Button size="sm" variant="ghost" disabled={!item.inStock}>
							<ShoppingCart className="size-4" />
						</Button>
					</div>
				</div>
			</div>
		))}
	</div>
);

const ListView = ({ items }: ViewProps) => (
	<div className="space-y-3">
		{items.map((item) => (
			<div key={item.id} className="flex items-center gap-4 p-4 rounded-xl bg-card border hover:border-primary transition-colors">
				<div className="size-20 rounded-lg overflow-hidden bg-muted flex-shrink-0">
					<img src={item.image} alt={item.name} className="size-full object-cover" />
				</div>
				<div className="flex-1 min-w-0">
					<p className="text-xs text-muted-foreground">{item.brand}</p>
					<p className="font-medium truncate">{item.name}</p>
					<div className="flex items-center gap-2 mt-1">
						<div className="flex items-center gap-1">
							<Star className="size-3 fill-amber-400 text-amber-400" />
							<span className="text-sm">{item.rating}</span>
						</div>
						<Badge variant={item.inStock ? 'default' : 'secondary'} className="text-xs">
							{item.inStock ? 'In Stock' : 'Out of Stock'}
						</Badge>
					</div>
				</div>
				<div className="text-right flex-shrink-0">
					<p className="text-lg font-bold">${item.price}</p>
					{item.originalPrice && (
						<p className="text-sm text-muted-foreground line-through">${item.originalPrice}</p>
					)}
				</div>
				<Button disabled={!item.inStock}>
					<ShoppingCart className="size-4 mr-2" />
					Add to Cart
				</Button>
			</div>
		))}
	</div>
);

const TableView = ({ items }: ViewProps) => (
	<div className="rounded-xl border overflow-hidden">
		<table className="w-full">
			<thead className="bg-muted">
				<tr>
					<th className="text-left p-3 text-sm font-medium">Product</th>
					<th className="text-left p-3 text-sm font-medium hidden @sm:table-cell">Brand</th>
					<th className="text-center p-3 text-sm font-medium hidden @md:table-cell">Rating</th>
					<th className="text-center p-3 text-sm font-medium">Stock</th>
					<th className="text-right p-3 text-sm font-medium">Price</th>
					<th className="p-3"></th>
				</tr>
			</thead>
			<tbody className="divide-y">
				{items.map((item) => (
					<tr key={item.id} className="hover:bg-muted/50">
						<td className="p-3">
							<div className="flex items-center gap-3">
								<div className="size-10 rounded overflow-hidden bg-muted flex-shrink-0">
									<img src={item.image} alt={item.name} className="size-full object-cover" />
								</div>
								<span className="font-medium text-sm truncate max-w-[150px]">{item.name}</span>
							</div>
						</td>
						<td className="p-3 text-sm text-muted-foreground hidden @sm:table-cell">{item.brand}</td>
						<td className="p-3 text-center hidden @md:table-cell">
							<div className="flex items-center justify-center gap-1">
								<Star className="size-3 fill-amber-400 text-amber-400" />
								<span className="text-sm">{item.rating}</span>
							</div>
						</td>
						<td className="p-3 text-center">
							<Badge variant={item.inStock ? 'default' : 'secondary'} className="text-xs">
								{item.inStock ? 'Yes' : 'No'}
							</Badge>
						</td>
						<td className="p-3 text-right font-bold">${item.price}</td>
						<td className="p-3">
							<Button size="sm" variant="ghost" disabled={!item.inStock}>
								<ShoppingCart className="size-4" />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Premium Wireless Headphones', price: 249, originalPrice: 299, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8, brand: 'Sony', inStock: true, href: '/product/1' },
		{ id: '2', name: 'Smart Fitness Watch', price: 399, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop', rating: 4.6, brand: 'Apple', inStock: true, href: '/product/2' },
		{ id: '3', name: 'Leather Messenger Bag', price: 189, originalPrice: 229, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', rating: 4.9, brand: 'Coach', inStock: false, href: '/product/3' },
		{ id: '4', name: 'Vintage Sunglasses', price: 175, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop', rating: 4.5, brand: 'Ray-Ban', inStock: true, href: '/product/4' },
		{ id: '5', name: 'Canvas Backpack', price: 129, originalPrice: 159, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', rating: 4.7, brand: 'Herschel', inStock: true, href: '/product/5' },
		{ id: '6', name: 'Mechanical Keyboard', price: 159, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop', rating: 4.8, brand: 'Keychron', inStock: true, href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">My Wishlist</h1>
					<Badge variant="secondary">{wishlistItems.length} items</Badge>
				</div>
				<Tabs defaultValue="grid" className="w-full">
					<TabsList className="mb-6">
						<TabsTrigger value="grid" className="gap-2">
							<LayoutGrid className="size-4" />
							Grid
						</TabsTrigger>
						<TabsTrigger value="list" className="gap-2">
							<LayoutList className="size-4" />
							List
						</TabsTrigger>
						<TabsTrigger value="table" className="gap-2">
							<Table className="size-4" />
							Table
						</TabsTrigger>
					</TabsList>
					<TabsContent value="grid">
						<GridView items={wishlistItems} />
					</TabsContent>
					<TabsContent value="list">
						<ListView items={wishlistItems} />
					</TabsContent>
					<TabsContent value="table">
						<TableView items={wishlistItems} />
					</TabsContent>
				</Tabs>
			</div>
		</section>
	);
}
