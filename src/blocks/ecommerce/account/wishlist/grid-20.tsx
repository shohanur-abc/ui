import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Grid3X3, LayoutList, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Input } from '@/components/ui/input';

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	price: number;
	originalPrice?: number;
	image: string;
	category: string;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const Toolbar = () => (
	<div className="flex flex-wrap items-center gap-4 mb-6 @md:mb-8">
		<div className="flex-1 min-w-[200px]">
			<Input placeholder="Search wishlist..." className="max-w-xs" />
		</div>
		<div className="flex items-center gap-2">
			<Button variant="outline" size="sm" className="gap-2">
				<SlidersHorizontal className="size-4" />
				Filters
			</Button>
			<ToggleGroup type="single" defaultValue="grid">
				<ToggleGroupItem value="grid" aria-label="Grid view" className="size-9 p-0">
					<Grid3X3 className="size-4" />
				</ToggleGroupItem>
				<ToggleGroupItem value="list" aria-label="List view" className="size-9 p-0">
					<LayoutList className="size-4" />
				</ToggleGroupItem>
			</ToggleGroup>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
		<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/30">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-all duration-700 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
			<div className="absolute top-2 left-2 right-2 flex items-start justify-between">
				<Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
					{item.category}
				</Badge>
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<Trash2 className="size-3.5 text-destructive" />
				</Button>
			</div>
			<div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
				<Button className="w-full gap-2 shadow-xl backdrop-blur-sm">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		</div>
		<CardContent className="p-4">
			<p className="text-xs text-primary font-medium uppercase tracking-wider">{item.brand}</p>
			<Link href={item.href}>
				<h3 className="mt-1 font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<>
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
						<Badge variant="destructive" className="text-[10px]">
							-{Math.round((1 - item.price / item.originalPrice) * 100)}%
						</Badge>
					</>
				)}
			</div>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @sm:grid-cols-3 @lg:grid-cols-4 @xl:grid-cols-5 @3xl:grid-cols-6 gap-4 @md:gap-5">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const QuickStats = ({ items }: { items: WishlistItem[] }) => {
	const totalValue = items.reduce((sum, item) => sum + item.price, 0);
	const savings = items.reduce((sum, item) => sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0);
	
	return (
		<div className="flex items-center gap-6 text-sm mb-4">
			<div className="flex items-center gap-2">
				<Heart className="size-4 text-primary fill-primary" />
				<span className="text-muted-foreground">{items.length} items</span>
			</div>
			<div className="text-muted-foreground">
				Total: <span className="font-semibold text-foreground">${totalValue.toFixed(2)}</span>
			</div>
			{savings > 0 && (
				<div className="text-green-600">
					Savings: <span className="font-semibold">${savings.toFixed(2)}</span>
				</div>
			)}
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Premium Running Shoes', brand: 'Nike', price: 159.99, originalPrice: 189.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', category: 'Footwear', href: '/product/1' },
		{ id: '2', name: 'Classic Aviator Sunglasses', brand: 'Ray-Ban', price: 165.00, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop', category: 'Accessories', href: '/product/2' },
		{ id: '3', name: 'Leather Crossbody Bag', brand: 'Coach', price: 295.00, originalPrice: 395.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', category: 'Bags', href: '/product/3' },
		{ id: '4', name: 'Cotton Crew Neck Sweater', brand: 'J.Crew', price: 89.50, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', category: 'Tops', href: '/product/4' },
		{ id: '5', name: 'Slim Fit Chinos', brand: 'Bonobos', price: 98.00, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop', category: 'Pants', href: '/product/5' },
		{ id: '6', name: 'Automatic Watch', brand: 'Seiko', price: 425.00, originalPrice: 495.00, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop', category: 'Watches', href: '/product/6' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-2">My Wishlist</h1>
				<QuickStats items={wishlistItems} />
				<Toolbar />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
