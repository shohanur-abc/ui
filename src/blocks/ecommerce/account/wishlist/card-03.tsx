import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	images: string[];
	currentImageIndex: number;
	category: string;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const ImageCarousel = ({ images, currentIndex, name }: { images: string[]; currentIndex: number; name: string }) => (
	<div className="relative aspect-square overflow-hidden bg-muted group/carousel">
		<img
			src={images[currentIndex]}
			alt={name}
			className="size-full object-cover transition-transform duration-500 group-hover/carousel:scale-105"
		/>
		{images.length > 1 && (
			<>
				<Button
					size="icon-sm"
					variant="secondary"
					className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
				>
					<ChevronLeft className="size-4" />
				</Button>
				<Button
					size="icon-sm"
					variant="secondary"
					className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full opacity-0 group-hover/carousel:opacity-100 transition-opacity"
				>
					<ChevronRight className="size-4" />
				</Button>
				<div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
					{images.map((_, i) => (
						<div
							key={i}
							className={`size-1.5 rounded-full transition-colors ${
								i === currentIndex ? 'bg-white' : 'bg-white/50'
							}`}
						/>
					))}
				</div>
			</>
		)}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative">
			<ImageCarousel images={item.images} currentIndex={item.currentImageIndex} name={item.name} />
			<div className="absolute top-3 left-3 right-3 flex items-start justify-between">
				<Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
					{item.category}
				</Badge>
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full bg-background/80 backdrop-blur-sm text-destructive"
				>
					<Trash2 className="size-4" />
				</Button>
			</div>
			{item.originalPrice && (
				<Badge className="absolute bottom-3 left-3" variant="destructive">
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
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
				)}
			</div>
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Vintage Leather Messenger Bag', price: 189.00, originalPrice: 249.00, images: ['https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop'], currentImageIndex: 0, category: 'Bags', href: '/product/1' },
		{ id: '2', name: 'Canvas Backpack', price: 79.00, images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?w=400&h=400&fit=crop'], currentImageIndex: 0, category: 'Bags', href: '/product/2' },
		{ id: '3', name: 'Suede Loafers', price: 159.00, images: ['https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop'], currentImageIndex: 0, category: 'Shoes', href: '/product/3' },
		{ id: '4', name: 'Wool Fedora Hat', price: 65.00, originalPrice: 85.00, images: ['https://images.unsplash.com/photo-1521369909029-2afed882baee?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=400&h=400&fit=crop'], currentImageIndex: 0, category: 'Accessories', href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6 @md:mb-8">My Wishlist</h1>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
