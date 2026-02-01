import Link from 'next/link';
import { Heart, ShoppingCart, X, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	category: string;
	inStock: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
	selectedIds: string[];
}

const HeaderActions = ({ selectedCount }: { selectedCount: number }) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold tracking-tight">
				Wishlist
			</h1>
			<p className="text-muted-foreground mt-1">
				Items you&apos;ve saved for later
			</p>
		</div>
		<div className="flex items-center gap-3">
			{selectedCount > 0 && (
				<Button variant="outline" size="sm" className="gap-2">
					<ShoppingCart className="size-4" />
					Add {selectedCount} to Cart
				</Button>
			)}
			<Button variant="ghost" size="icon">
				<Share2 className="size-4" />
			</Button>
		</div>
	</div>
);

const ProductCard = ({
	item,
	isSelected,
}: {
	item: WishlistItem;
	isSelected: boolean;
}) => (
	<Card
		className={`group relative overflow-hidden transition-all duration-300 ${isSelected ? 'ring-2 ring-primary' : ''}`}
	>
		<div className="absolute top-3 left-3 z-10">
			<Checkbox
				checked={isSelected}
				className="bg-background/80 backdrop-blur-sm"
			/>
		</div>
		<div className="absolute top-3 right-3 z-10">
			<Button
				size="icon-sm"
				variant="ghost"
				className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive hover:text-white"
			>
				<X className="size-4" />
			</Button>
		</div>
		<div className="relative aspect-[4/5] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
			/>
			{!item.inStock && (
				<div className="absolute inset-0 flex items-center justify-center bg-background/60 backdrop-blur-sm">
					<Badge variant="secondary">Out of Stock</Badge>
				</div>
			)}
			<div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-background/90 to-transparent p-4 transition-transform duration-300 group-hover:translate-y-0">
				<div className="flex gap-2">
					<Button size="sm" className="flex-1 gap-1.5">
						<ShoppingCart className="size-3.5" />
						Add to Cart
					</Button>
					<Button size="icon-sm" variant="secondary">
						<Eye className="size-4" />
					</Button>
				</div>
			</div>
		</div>
		<div className="p-4">
			<Badge variant="outline" className="mb-2 text-xs">
				{item.category}
			</Badge>
			<Link href={item.href}>
				<h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
		</div>
	</Card>
);

const WishlistGrid = ({ items, selectedIds }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard
				key={item.id}
				item={item}
				isSelected={selectedIds.includes(item.id)}
			/>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Oversized Cashmere Sweater',
			price: 289.0,
			originalPrice: 389.0,
			image:
				'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop',
			category: 'Sweaters',
			inStock: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Tailored Wool Blazer',
			price: 459.0,
			image:
				'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
			category: 'Outerwear',
			inStock: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Silk Evening Dress',
			price: 599.0,
			image:
				'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
			category: 'Dresses',
			inStock: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Italian Leather Loafers',
			price: 349.0,
			image:
				'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=500&fit=crop',
			category: 'Footwear',
			inStock: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Linen Summer Shirt',
			price: 129.0,
			originalPrice: 159.0,
			image:
				'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
			category: 'Shirts',
			inStock: true,
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Designer Sunglasses',
			price: 245.0,
			image:
				'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=500&fit=crop',
			category: 'Accessories',
			inStock: true,
			href: '/product/6',
		},
	];

	const selectedIds = ['1', '4'];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<HeaderActions selectedCount={selectedIds.length} />
				<WishlistGrid items={wishlistItems} selectedIds={selectedIds} />
			</div>
		</section>
	);
}
