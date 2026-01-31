import Link from 'next/link';
import { Heart, ShoppingCart, MoreHorizontal, Star, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
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
	originalPrice?: number;
	image: string;
	rating: number;
	reviews: number;
	shipping: string;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

interface MenuOption {
	label: string;
	action: string;
}

const ProductImage = ({ src, alt, discount }: { src: string; alt: string; discount?: number }) => (
	<div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-muted to-muted/30">
		<img
			src={src}
			alt={alt}
			className="size-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-105"
		/>
		{discount && (
			<Badge className="absolute bottom-2 left-2 font-bold" variant="destructive">
				-{discount}%
			</Badge>
		)}
	</div>
);

const ProductRating = ({ rating, reviews }: { rating: number; reviews: number }) => (
	<div className="flex items-center gap-1.5">
		<div className="flex items-center gap-0.5">
			<Star className="size-3.5 fill-amber-400 text-amber-400" />
			<span className="text-sm font-medium">{rating}</span>
		</div>
		<span className="text-xs text-muted-foreground">({reviews.toLocaleString()})</span>
	</div>
);

const ProductActions = ({ menuOptions }: { menuOptions: MenuOption[] }) => (
	<DropdownMenu>
		<DropdownMenuTrigger asChild>
			<Button size="icon-sm" variant="ghost" className="rounded-full">
				<MoreHorizontal className="size-4" />
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			{menuOptions.map((option) => (
				<DropdownMenuItem key={option.action}>{option.label}</DropdownMenuItem>
			))}
		</DropdownMenuContent>
	</DropdownMenu>
);

const ProductCard = ({ item, menuOptions }: { item: WishlistItem; menuOptions: MenuOption[] }) => {
	const discount = item.originalPrice
		? Math.round((1 - item.price / item.originalPrice) * 100)
		: undefined;

	return (
		<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
			<ProductImage src={item.image} alt={item.name} discount={discount} />
			<div className="p-4">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href} className="flex-1">
						<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
							{item.name}
						</h3>
					</Link>
					<ProductActions menuOptions={menuOptions} />
				</div>
				<ProductRating rating={item.rating} reviews={item.reviews} />
				<div className="mt-2 flex items-baseline gap-2">
					<span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
				<div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
					<Package className="size-3" />
					{item.shipping}
				</div>
				<Button className="w-full mt-4 gap-2">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		</Card>
	);
};

const WishlistGrid = ({ items, menuOptions }: WishlistGridProps & { menuOptions: MenuOption[] }) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 @3xl:grid-cols-5 gap-4 @md:gap-5">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} menuOptions={menuOptions} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Premium Noise Cancelling Headphones', price: 249.99, originalPrice: 349.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8, reviews: 12543, shipping: 'Free shipping', href: '/product/1' },
		{ id: '2', name: 'Smart Watch Series 8', price: 399.00, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop', rating: 4.9, reviews: 8921, shipping: 'Free shipping', href: '/product/2' },
		{ id: '3', name: 'Portable Bluetooth Speaker', price: 79.99, originalPrice: 99.99, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop', rating: 4.5, reviews: 5678, shipping: 'Ships in 2-3 days', href: '/product/3' },
		{ id: '4', name: 'Wireless Charging Pad', price: 39.99, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=400&fit=crop', rating: 4.3, reviews: 3421, shipping: 'Free shipping', href: '/product/4' },
		{ id: '5', name: 'USB-C Power Bank 20000mAh', price: 59.99, originalPrice: 79.99, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop', rating: 4.6, reviews: 7890, shipping: 'Free shipping', href: '/product/5' },
	];

	const menuOptions: MenuOption[] = [
		{ label: 'Move to Cart', action: 'cart' },
		{ label: 'Share', action: 'share' },
		{ label: 'Compare', action: 'compare' },
		{ label: 'Remove', action: 'remove' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6 @md:mb-8">
					<Heart className="size-6 text-primary fill-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
					<Badge variant="secondary" className="ml-2">{wishlistItems.length}</Badge>
				</div>
				<WishlistGrid items={wishlistItems} menuOptions={menuOptions} />
			</div>
		</section>
	);
}
