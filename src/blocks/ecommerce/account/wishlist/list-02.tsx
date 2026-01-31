import Link from 'next/link';
import { Heart, ShoppingCart, X, Package, Clock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	price: number;
	image: string;
	estimatedDelivery: string;
	freeShipping: boolean;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const DeliveryInfo = ({ estimate, freeShipping }: { estimate: string; freeShipping: boolean }) => (
	<div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
		<div className="flex items-center gap-1 text-muted-foreground">
			<Clock className="size-3" />
			<span>{estimate}</span>
		</div>
		{freeShipping && (
			<div className="flex items-center gap-1 text-green-600">
				<Package className="size-3" />
				<span>Free Shipping</span>
			</div>
		)}
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex gap-4 @sm:gap-6 py-6">
		<div className="relative size-20 @sm:size-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0 flex flex-col">
			<div className="flex items-start justify-between gap-2">
				<div>
					<p className="text-xs text-muted-foreground uppercase tracking-wider">{item.brand}</p>
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
				</div>
				<Button variant="ghost" size="icon-sm" className="text-destructive">
					<X className="size-4" />
				</Button>
			</div>
			<DeliveryInfo estimate={item.estimatedDelivery} freeShipping={item.freeShipping} />
			<div className="flex items-center justify-between mt-auto pt-3">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
				<Button size="sm" className="gap-1.5">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		</div>
	</div>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="divide-y">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const SummaryBar = ({ items }: { items: WishlistItem[] }) => {
	const total = items.reduce((sum, item) => sum + item.price, 0);
	const freeShippingCount = items.filter((i) => i.freeShipping).length;

	return (
		<div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-muted mb-6">
			<div>
				<p className="text-sm text-muted-foreground">{items.length} items</p>
				<p className="text-2xl font-bold">${total.toFixed(2)}</p>
			</div>
			<div className="flex items-center gap-4">
				{freeShippingCount > 0 && (
					<Badge variant="secondary" className="gap-1">
						<Check className="size-3" />
						{freeShippingCount} with free shipping
					</Badge>
				)}
				<Button className="gap-1.5">
					<ShoppingCart className="size-4" />
					Add All to Cart
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Premium Leather Weekender Bag', brand: 'TUMI', price: 495.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop', estimatedDelivery: 'Arrives by Wed, Oct 25', freeShipping: true, href: '/product/1' },
		{ id: '2', name: 'Merino Wool Travel Blazer', brand: 'BONOBOS', price: 325.00, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=200&h=200&fit=crop', estimatedDelivery: 'Arrives by Thu, Oct 26', freeShipping: true, href: '/product/2' },
		{ id: '3', name: 'Wireless Charging Travel Case', brand: 'NOMAD', price: 79.00, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=200&h=200&fit=crop', estimatedDelivery: 'Arrives by Fri, Oct 27', freeShipping: false, href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6">
					<Heart className="size-6 fill-primary text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Saved Items</h1>
				</div>
				<SummaryBar items={wishlistItems} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
