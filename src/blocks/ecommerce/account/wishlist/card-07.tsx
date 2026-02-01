import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Check, X as XIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	inStock: boolean;
	isSelected: boolean;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
	selectedCount: number;
}

const SelectionToolbar = ({
	selectedCount,
	totalCount,
}: {
	selectedCount: number;
	totalCount: number;
}) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 rounded-lg bg-muted/50 border">
		<div className="flex items-center gap-3">
			<Checkbox checked={selectedCount === totalCount} />
			<span className="text-sm">
				{selectedCount} of {totalCount} selected
			</span>
		</div>
		{selectedCount > 0 && (
			<div className="flex gap-2">
				<Button variant="outline" size="sm" className="gap-2 text-destructive">
					<Trash2 className="size-4" />
					Remove
				</Button>
				<Button size="sm" className="gap-2">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		)}
	</div>
);

const StockStatus = ({ inStock }: { inStock: boolean }) => (
	<div
		className={`flex items-center gap-1 text-xs ${inStock ? 'text-green-600' : 'text-destructive'}`}
	>
		{inStock ? <Check className="size-3" /> : <XIcon className="size-3" />}
		{inStock ? 'In Stock' : 'Out of Stock'}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card
		className={`group overflow-hidden transition-all duration-300 ${item.isSelected ? 'ring-2 ring-primary' : ''}`}
	>
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 left-2">
				<div className="size-6 flex items-center justify-center rounded-md bg-background/90 backdrop-blur-sm border shadow-sm">
					<Checkbox checked={item.isSelected} className="size-4" />
				</div>
			</div>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Trash2 className="size-4 text-destructive" />
			</Button>
			{!item.inStock && (
				<div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]" />
			)}
			{item.originalPrice && (
				<Badge className="absolute bottom-2 left-2" variant="destructive">
					-{Math.round((1 - item.price / item.originalPrice) * 100)}%
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<StockStatus inStock={item.inStock} />
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<Button className="w-full mt-4 gap-2" disabled={!item.inStock}>
				<ShoppingCart className="size-4" />
				{item.inStock ? 'Add to Cart' : 'Notify Me'}
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items, selectedCount }: CardGridProps) => (
	<>
		<SelectionToolbar selectedCount={selectedCount} totalCount={items.length} />
		<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
			{items.map((item) => (
				<ProductCard key={item.id} item={item} />
			))}
		</div>
	</>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Organic Cotton Hoodie',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
			inStock: true,
			isSelected: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Vintage Graphic Tee',
			price: 35.0,
			originalPrice: 45.0,
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
			inStock: true,
			isSelected: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'High-Rise Joggers',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=400&h=400&fit=crop',
			inStock: false,
			isSelected: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Canvas Low-Top Sneakers',
			price: 89.0,
			originalPrice: 109.0,
			image:
				'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
			inStock: true,
			isSelected: false,
			href: '/product/4',
		},
	];

	const selectedCount = wishlistItems.filter((item) => item.isSelected).length;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<CardGrid items={wishlistItems} selectedCount={selectedCount} />
			</div>
		</section>
	);
}
