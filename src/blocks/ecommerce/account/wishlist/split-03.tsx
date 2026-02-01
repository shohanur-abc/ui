import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	MapPin,
	Truck,
	Clock,
	Star,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Store {
	id: string;
	name: string;
	location: string;
	distance: string;
	price: number;
	inStock: boolean;
	deliveryDays: number;
}

interface WishlistItem {
	id: string;
	name: string;
	image: string;
	rating: number;
	stores: Store[];
	href: string;
}

interface SplitProps {
	item: WishlistItem;
}

const ProductPanel = ({ item }: { item: WishlistItem }) => (
	<div className="h-full flex flex-col">
		<div className="aspect-square rounded-xl overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<h2 className="text-xl font-bold mt-4">{item.name}</h2>
		<div className="flex items-center gap-2 mt-1">
			<div className="flex items-center gap-1">
				<Star className="size-4 fill-amber-400 text-amber-400" />
				<span className="font-medium">{item.rating}</span>
			</div>
		</div>
		<div className="mt-auto pt-4">
			<p className="text-sm text-muted-foreground">
				Available at {item.stores.length} stores
			</p>
			<div className="flex gap-2 mt-2">
				{item.stores.slice(0, 3).map((store) => (
					<Badge key={store.id} variant="outline" className="text-xs">
						{store.name}
					</Badge>
				))}
			</div>
		</div>
	</div>
);

const StoreCard = ({ store }: { store: Store }) => (
	<div
		className={`p-4 rounded-xl border ${store.inStock ? 'hover:border-primary' : 'opacity-60'} transition-colors`}
	>
		<div className="flex items-start justify-between">
			<div>
				<h4 className="font-semibold">{store.name}</h4>
				<div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
					<MapPin className="size-3" />
					{store.location}
				</div>
				<Badge variant="outline" className="mt-2 text-xs">
					{store.distance}
				</Badge>
			</div>
			<div className="text-right">
				<p className="text-lg font-bold">${store.price.toFixed(2)}</p>
				{store.inStock ? (
					<div className="flex items-center gap-1 text-xs text-green-600 mt-1">
						<Truck className="size-3" />
						{store.deliveryDays === 0
							? 'Pickup Today'
							: `${store.deliveryDays} day delivery`}
					</div>
				) : (
					<Badge variant="secondary" className="text-xs mt-1">
						Out of Stock
					</Badge>
				)}
			</div>
		</div>
		{store.inStock && (
			<Button className="w-full mt-3 gap-2" size="sm">
				<ShoppingCart className="size-4" />
				Buy from {store.name}
			</Button>
		)}
	</div>
);

const StoresPanel = ({ stores }: { stores: Store[] }) => (
	<div className="h-full overflow-y-auto space-y-3">
		<div className="flex items-center justify-between mb-4">
			<h3 className="font-bold">Available Stores</h3>
			<Button variant="ghost" size="sm" className="gap-1 text-xs">
				Sort by Price
				<ChevronRight className="size-3" />
			</Button>
		</div>
		{stores
			.sort((a, b) => a.price - b.price)
			.map((store) => (
				<StoreCard key={store.id} store={store} />
			))}
	</div>
);

export default function Main() {
	const wishlistItem: WishlistItem = {
		id: '1',
		name: 'Sony PlayStation 5',
		image:
			'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop',
		rating: 4.9,
		stores: [
			{
				id: '1',
				name: 'Best Buy',
				location: 'Downtown',
				distance: '2.3 mi',
				price: 499.99,
				inStock: true,
				deliveryDays: 0,
			},
			{
				id: '2',
				name: 'Amazon',
				location: 'Warehouse',
				distance: 'Online',
				price: 479.99,
				inStock: true,
				deliveryDays: 2,
			},
			{
				id: '3',
				name: 'Walmart',
				location: 'Mall District',
				distance: '4.1 mi',
				price: 499.99,
				inStock: true,
				deliveryDays: 1,
			},
			{
				id: '4',
				name: 'Target',
				location: 'Eastside',
				distance: '5.8 mi',
				price: 489.99,
				inStock: false,
				deliveryDays: 0,
			},
			{
				id: '5',
				name: 'GameStop',
				location: 'Plaza',
				distance: '1.2 mi',
				price: 529.99,
				inStock: true,
				deliveryDays: 0,
			},
		],
		href: '/product/1',
	};

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">Compare Stores</h1>
				<div className="grid @md:grid-cols-5 gap-8 min-h-[500px]">
					<div className="@md:col-span-2">
						<ProductPanel item={wishlistItem} />
					</div>
					<div className="@md:col-span-3">
						<StoresPanel stores={wishlistItem.stores} />
					</div>
				</div>
			</div>
		</section>
	);
}
