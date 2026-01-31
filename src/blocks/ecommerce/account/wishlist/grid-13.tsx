import Link from 'next/link';
import { Heart, ShoppingCart, X, MapPin, Truck, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface StoreAvailability {
	storeName: string;
	distance: string;
	inStock: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	deliveryDate: string;
	pickupAvailable: boolean;
	stores: StoreAvailability[];
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const FulfillmentOptions = ({
	deliveryDate,
	pickupAvailable,
	stores,
}: {
	deliveryDate: string;
	pickupAvailable: boolean;
	stores: StoreAvailability[];
}) => {
	const availableStore = stores.find((s) => s.inStock);
	
	return (
		<div className="mt-3 space-y-2">
			<RadioGroup defaultValue="delivery" className="gap-2">
				<div className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
					<RadioGroupItem value="delivery" id="delivery" className="shrink-0" />
					<Label htmlFor="delivery" className="flex-1 cursor-pointer">
						<div className="flex items-center gap-2">
							<Truck className="size-4 text-muted-foreground" />
							<div>
								<p className="text-sm font-medium">Delivery</p>
								<p className="text-xs text-muted-foreground">Get it by {deliveryDate}</p>
							</div>
						</div>
					</Label>
				</div>
				{pickupAvailable && availableStore && (
					<div className="flex items-center gap-2 p-2 rounded-lg border bg-muted/30">
						<RadioGroupItem value="pickup" id="pickup" className="shrink-0" />
						<Label htmlFor="pickup" className="flex-1 cursor-pointer">
							<div className="flex items-center gap-2">
								<Store className="size-4 text-muted-foreground" />
								<div>
									<p className="text-sm font-medium">Store Pickup</p>
									<p className="text-xs text-muted-foreground">
										{availableStore.storeName} ({availableStore.distance})
									</p>
								</div>
							</div>
						</Label>
					</div>
				)}
			</RadioGroup>
		</div>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			<div className="absolute top-2 left-2">
				<Heart className="size-5 fill-primary text-primary" />
			</div>
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<FulfillmentOptions
				deliveryDate={item.deliveryDate}
				pickupAvailable={item.pickupAvailable}
				stores={item.stores}
			/>
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const LocationBanner = ({ location }: { location: string }) => (
	<div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 mb-6 @md:mb-8">
		<MapPin className="size-4 text-primary" />
		<span className="text-sm">Showing availability for: <strong>{location}</strong></span>
		<Button variant="link" size="sm" className="ml-auto text-primary">
			Change
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Sony WH-1000XM5 Wireless Headphones',
			price: 349.99,
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			deliveryDate: 'Feb 5',
			pickupAvailable: true,
			stores: [
				{ storeName: 'Downtown Store', distance: '2.3 mi', inStock: true },
				{ storeName: 'Mall Location', distance: '5.1 mi', inStock: false },
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Apple AirPods Pro (2nd Gen)',
			price: 249.00,
			image: 'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
			deliveryDate: 'Feb 4',
			pickupAvailable: true,
			stores: [
				{ storeName: 'Downtown Store', distance: '2.3 mi', inStock: true },
				{ storeName: 'Tech Hub', distance: '3.8 mi', inStock: true },
			],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Samsung Galaxy Tab S9 Ultra',
			price: 1199.99,
			image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
			deliveryDate: 'Feb 7',
			pickupAvailable: false,
			stores: [
				{ storeName: 'Downtown Store', distance: '2.3 mi', inStock: false },
			],
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Bose SoundLink Flex Speaker',
			price: 149.00,
			image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
			deliveryDate: 'Feb 5',
			pickupAvailable: true,
			stores: [
				{ storeName: 'Mall Location', distance: '5.1 mi', inStock: true },
			],
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-4">My Wishlist</h1>
				<LocationBanner location="San Francisco, CA 94102" />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
