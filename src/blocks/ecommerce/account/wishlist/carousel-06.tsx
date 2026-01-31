import Link from 'next/link';
import { Heart, ShoppingCart, X, ChevronLeft, ChevronRight, Package, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface ShippingInfo {
	freeShipping: boolean;
	estimatedDays: number;
	returnsWindow: number;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	shipping: ShippingInfo;
	inStock: boolean;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const ShippingBadges = ({ shipping, inStock }: { shipping: ShippingInfo; inStock: boolean }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{shipping.freeShipping && (
			<Badge variant="outline" className="text-[10px] gap-1 bg-green-50 text-green-700 border-green-200">
				<Truck className="size-2.5" />
				Free Shipping
			</Badge>
		)}
		<Badge variant="outline" className="text-[10px] gap-1">
			<Package className="size-2.5" />
			{shipping.estimatedDays}d delivery
		</Badge>
		<Badge variant="outline" className="text-[10px] gap-1">
			<RotateCcw className="size-2.5" />
			{shipping.returnsWindow}d returns
		</Badge>
	</div>
);

const StockStatus = ({ inStock }: { inStock: boolean }) => (
	<div className={`flex items-center gap-1 text-xs ${inStock ? 'text-green-600' : 'text-destructive'}`}>
		<div className={`size-2 rounded-full ${inStock ? 'bg-green-500' : 'bg-destructive'}`} />
		<span>{inStock ? 'In Stock' : 'Out of Stock'}</span>
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-64 @sm:w-72 @md:w-80">
		<Card className={`overflow-hidden group h-full ${!item.inStock ? 'opacity-75' : ''}`}>
			<div className="relative aspect-[4/3] bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				{item.shipping.freeShipping && (
					<Badge className="absolute top-3 left-3 bg-green-500 text-white gap-1">
						<Truck className="size-3" />
						Free
					</Badge>
				)}
				{!item.inStock && (
					<div className="absolute inset-0 bg-background/60 flex items-center justify-center">
						<Badge variant="destructive" className="text-sm">Out of Stock</Badge>
					</div>
				)}
			</div>
			<div className="p-4">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<Link href={item.href}>
							<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
						</Link>
						<StockStatus inStock={item.inStock} />
					</div>
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				</div>
				<ShippingBadges shipping={item.shipping} inStock={item.inStock} />
				<div className="flex items-center gap-2 mt-4">
					<Button size="sm" className="flex-1 gap-1" disabled={!item.inStock}>
						<ShoppingCart className="size-4" />
						{item.inStock ? 'Add to Cart' : 'Notify Me'}
					</Button>
					<Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const CarouselSlider = ({ items }: CarouselProps) => (
	<div className="relative">
		<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
			{items.map((item) => (
				<div key={item.id} className="snap-start">
					<CarouselItem item={item} />
				</div>
			))}
		</div>
		<Button variant="outline" size="icon" className="absolute left-0 top-1/3 -translate-x-1/2 hidden @md:flex bg-background shadow-lg">
			<ChevronLeft className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="absolute right-0 top-1/3 translate-x-1/2 hidden @md:flex bg-background shadow-lg">
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

const ShippingLegend = () => (
	<div className="flex flex-wrap gap-4 mb-6 p-3 rounded-lg bg-muted text-sm">
		<div className="flex items-center gap-2">
			<Truck className="size-4 text-green-600" />
			<span>Free Shipping Available</span>
		</div>
		<div className="flex items-center gap-2">
			<Package className="size-4 text-muted-foreground" />
			<span>Estimated Delivery</span>
		</div>
		<div className="flex items-center gap-2">
			<RotateCcw className="size-4 text-muted-foreground" />
			<span>Return Policy</span>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Ergonomic Office Chair', price: 449.00, image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop', shipping: { freeShipping: true, estimatedDays: 3, returnsWindow: 30 }, inStock: true, href: '/product/1' },
		{ id: '2', name: 'Standing Desk', price: 599.00, image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=300&fit=crop', shipping: { freeShipping: true, estimatedDays: 5, returnsWindow: 30 }, inStock: true, href: '/product/2' },
		{ id: '3', name: 'Monitor Light Bar', price: 79.00, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop', shipping: { freeShipping: false, estimatedDays: 2, returnsWindow: 14 }, inStock: false, href: '/product/3' },
		{ id: '4', name: 'Wireless Keyboard', price: 149.00, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=300&fit=crop', shipping: { freeShipping: true, estimatedDays: 2, returnsWindow: 30 }, inStock: true, href: '/product/4' },
		{ id: '5', name: 'Desk Mat XL', price: 45.00, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop', shipping: { freeShipping: false, estimatedDays: 4, returnsWindow: 14 }, inStock: true, href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-4">Wishlist Delivery</h1>
				<ShippingLegend />
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
