import Link from 'next/link';
import { Heart, ShoppingCart, X, Truck, MapPin, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface DeliveryOption {
	type: 'delivery' | 'pickup';
	label: string;
	estimate: string;
	price?: number;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	deliveryOptions: DeliveryOption[];
	selectedDelivery: 'delivery' | 'pickup';
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const DeliverySelector = ({ options, selected }: { options: DeliveryOption[]; selected: 'delivery' | 'pickup' }) => (
	<RadioGroup defaultValue={selected} className="mt-3 space-y-2">
		{options.map((option) => (
			<div
				key={option.type}
				className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
					selected === option.type ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
				}`}
			>
				<RadioGroupItem value={option.type} id={`${option.type}-option`} />
				<div className="flex items-center gap-2 flex-1">
					{option.type === 'delivery' ? (
						<Truck className="size-4 text-muted-foreground" />
					) : (
						<Store className="size-4 text-muted-foreground" />
					)}
					<div className="flex-1">
						<p className="text-xs font-medium">{option.label}</p>
						<p className="text-[10px] text-muted-foreground">{option.estimate}</p>
					</div>
					{option.price !== undefined && (
						<span className="text-xs font-medium">{option.price === 0 ? 'FREE' : `$${option.price.toFixed(2)}`}</span>
					)}
				</div>
			</div>
		))}
	</RadioGroup>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden bg-muted">
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
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<DeliverySelector options={item.deliveryOptions} selected={item.selectedDelivery} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const LocationBanner = () => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8 p-4 rounded-lg bg-muted">
		<div className="flex items-center gap-3">
			<MapPin className="size-5 text-primary" />
			<div>
				<p className="text-sm font-medium">Delivering to San Francisco, CA 94107</p>
				<p className="text-xs text-muted-foreground">Update location for accurate delivery estimates</p>
			</div>
		</div>
		<Button variant="outline" size="sm">Change</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Smart Home Speaker', price: 199.00, image: 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=400&h=400&fit=crop', deliveryOptions: [{ type: 'delivery', label: 'Standard Shipping', estimate: 'Arrives Wed, Oct 25', price: 0 }, { type: 'pickup', label: 'Store Pickup', estimate: 'Ready in 2 hours', price: 0 }], selectedDelivery: 'delivery', href: '/product/1' },
		{ id: '2', name: 'Robot Vacuum', price: 349.00, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop', deliveryOptions: [{ type: 'delivery', label: 'Express Shipping', estimate: 'Arrives Tomorrow', price: 9.99 }, { type: 'pickup', label: 'Curbside Pickup', estimate: 'Ready Today', price: 0 }], selectedDelivery: 'pickup', href: '/product/2' },
		{ id: '3', name: 'Air Purifier', price: 249.00, image: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop', deliveryOptions: [{ type: 'delivery', label: 'Free Shipping', estimate: 'Arrives Fri, Oct 27', price: 0 }, { type: 'pickup', label: 'Store Pickup', estimate: 'Ready in 1 hour', price: 0 }], selectedDelivery: 'delivery', href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<LocationBanner />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
