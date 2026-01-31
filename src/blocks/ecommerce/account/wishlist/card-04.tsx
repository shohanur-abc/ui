import Link from 'next/link';
import { Heart, ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	quantity: number;
	size: string;
	color: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const QuantitySelector = ({ quantity }: { quantity: number }) => (
	<div className="flex items-center gap-2 rounded-lg border bg-muted/50 p-1">
		<Button size="icon-sm" variant="ghost" className="size-7 rounded-md">
			<Minus className="size-3" />
		</Button>
		<span className="w-8 text-center text-sm font-medium">{quantity}</span>
		<Button size="icon-sm" variant="ghost" className="size-7 rounded-md">
			<Plus className="size-3" />
		</Button>
	</div>
);

const ProductVariants = ({ size, color }: { size: string; color: string }) => (
	<div className="flex gap-2 mt-2">
		<Badge variant="outline" className="text-xs">
			Size: {size}
		</Badge>
		<Badge variant="outline" className="text-xs">
			{color}
		</Badge>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<div className="relative aspect-[4/3] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full"
			>
				<X className="size-4" />
			</Button>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<ProductVariants size={item.size} color={item.color} />
			<div className="mt-3 flex items-center justify-between">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
				<QuantitySelector quantity={item.quantity} />
			</div>
		</CardContent>
		<Separator />
		<CardFooter className="p-4">
			<Button className="w-full gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardFooter>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const SummaryCard = ({ items }: { items: WishlistItem[] }) => {
	const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
	const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

	return (
		<Card className="p-6 mb-6 @md:mb-8">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<div>
					<p className="text-sm text-muted-foreground">Wishlist Summary</p>
					<p className="text-2xl font-bold">{totalItems} items · ${totalPrice.toFixed(2)}</p>
				</div>
				<Button size="lg" className="gap-2">
					<ShoppingCart className="size-4" />
					Add All to Cart
				</Button>
			</div>
		</Card>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Classic White T-Shirt', price: 35.00, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop', quantity: 2, size: 'M', color: 'White', href: '/product/1' },
		{ id: '2', name: 'Slim Fit Denim Jeans', price: 89.00, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=300&fit=crop', quantity: 1, size: '32', color: 'Indigo', href: '/product/2' },
		{ id: '3', name: 'Cotton Polo Shirt', price: 55.00, image: 'https://images.unsplash.com/photo-1625910513413-5fc69d8a0b88?w=400&h=300&fit=crop', quantity: 1, size: 'L', color: 'Navy', href: '/product/3' },
		{ id: '4', name: 'Leather Oxford Shoes', price: 175.00, image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=300&fit=crop', quantity: 1, size: '10', color: 'Brown', href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<SummaryCard items={wishlistItems} />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
