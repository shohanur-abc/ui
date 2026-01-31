import Link from 'next/link';
import { Heart, ShoppingCart, X, ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	images: string[];
	brand: string;
	inStock: boolean;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const ImageGallery = ({ images, name }: { images: string[]; name: string }) => (
	<div className="grid grid-cols-3 gap-1">
		<div className="col-span-2 row-span-2">
			<AspectRatio ratio={1}>
				<img src={images[0]} alt={name} className="size-full object-cover rounded-tl-xl" />
			</AspectRatio>
		</div>
		{images.slice(1, 3).map((img, i) => (
			<div key={i}>
				<AspectRatio ratio={1}>
					<img src={img} alt={`${name} ${i + 2}`} className={`size-full object-cover ${i === 0 ? 'rounded-tr-xl' : ''}`} />
				</AspectRatio>
			</div>
		))}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative">
			<ImageGallery images={item.images} name={item.name} />
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full z-10 opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			{!item.inStock && (
				<div className="absolute inset-0 flex items-center justify-center bg-background/70 backdrop-blur-sm z-10">
					<Badge variant="secondary">Out of Stock</Badge>
				</div>
			)}
			{item.originalPrice && (
				<Badge className="absolute bottom-2 left-2 z-10" variant="destructive">
					Sale
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<p className="text-xs text-muted-foreground uppercase tracking-wider">{item.brand}</p>
			<Link href={item.href}>
				<h3 className="mt-1 font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
				)}
			</div>
			<Button className="w-full mt-4 gap-2" disabled={!item.inStock}>
				<ShoppingCart className="size-4" />
				{item.inStock ? 'Add to Cart' : 'Notify Me'}
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Floral Summer Dress', price: 89.00, originalPrice: 129.00, images: ['https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop'], brand: 'Reformation', inStock: true, href: '/product/1' },
		{ id: '2', name: 'Tailored Linen Blazer', price: 245.00, images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=200&h=200&fit=crop'], brand: 'Theory', inStock: true, href: '/product/2' },
		{ id: '3', name: 'Silk Midi Skirt', price: 179.00, images: ['https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop'], brand: 'Vince', inStock: false, href: '/product/3' },
		{ id: '4', name: 'Cashmere Cardigan', price: 325.00, originalPrice: 425.00, images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop', 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=200&h=200&fit=crop', 'https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=200&h=200&fit=crop'], brand: 'Everlane', inStock: true, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6 @md:mb-8">
					<Heart className="size-6 fill-primary text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Wishlist</h1>
					<Badge variant="secondary">{wishlistItems.length}</Badge>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
