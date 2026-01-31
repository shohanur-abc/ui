import Link from 'next/link';
import { Heart, ShoppingCart, X, ExternalLink, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Store {
	name: string;
	logo: string;
	rating: number;
	location: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	store: Store;
	href: string;
	storeUrl: string;
}

interface ListProps {
	items: WishlistItem[];
}

const StoreInfo = ({ store, storeUrl }: { store: Store; storeUrl: string }) => (
	<div className="flex items-center gap-2 mt-2">
		<Avatar className="size-5">
			<AvatarImage src={store.logo} alt={store.name} />
			<AvatarFallback className="text-[8px]">{store.name[0]}</AvatarFallback>
		</Avatar>
		<span className="text-sm text-muted-foreground">{store.name}</span>
		<div className="flex items-center gap-0.5 text-sm">
			<span className="text-amber-500">★</span>
			<span>{store.rating}</span>
		</div>
		<Button variant="ghost" size="icon-sm" asChild className="ml-auto">
			<a href={storeUrl} target="_blank" rel="noopener noreferrer">
				<ExternalLink className="size-3" />
			</a>
		</Button>
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4 hover:shadow-md transition-all">
		<div className="flex gap-4">
			<div className="relative size-20 @sm:size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				<Heart className="absolute top-1.5 left-1.5 size-4 fill-primary text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-2 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="text-destructive flex-shrink-0">
						<X className="size-4" />
					</Button>
				</div>
				<StoreInfo store={item.store} storeUrl={item.storeUrl} />
				<div className="flex items-center justify-between mt-3">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-3">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const StoreFilter = ({ stores }: { stores: string[] }) => (
	<div className="flex flex-wrap gap-2 mb-6">
		<Button variant="default" size="sm">All Stores</Button>
		{stores.map((store) => (
			<Button key={store} variant="outline" size="sm">{store}</Button>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Vintage Leather Messenger Bag', price: 189.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop', store: { name: 'Artisan Goods', logo: 'https://i.pravatar.cc/100?img=1', rating: 4.9, location: 'Brooklyn, NY' }, href: '/product/1', storeUrl: 'https://example.com' },
		{ id: '2', name: 'Handcrafted Ceramic Mug Set', price: 45.00, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=200&h=200&fit=crop', store: { name: 'Clay Studio', logo: 'https://i.pravatar.cc/100?img=2', rating: 4.8, location: 'Portland, OR' }, href: '/product/2', storeUrl: 'https://example.com' },
		{ id: '3', name: 'Organic Cotton Throw Blanket', price: 129.00, image: 'https://images.unsplash.com/photo-1580301762395-21ce84d00bc6?w=200&h=200&fit=crop', store: { name: 'Home & Heart', logo: 'https://i.pravatar.cc/100?img=3', rating: 4.7, location: 'Austin, TX' }, href: '/product/3', storeUrl: 'https://example.com' },
		{ id: '4', name: 'Wooden Desk Organizer', price: 65.00, image: 'https://images.unsplash.com/photo-1586210579191-33b45e38fa2c?w=200&h=200&fit=crop', store: { name: 'Artisan Goods', logo: 'https://i.pravatar.cc/100?img=1', rating: 4.9, location: 'Brooklyn, NY' }, href: '/product/4', storeUrl: 'https://example.com' },
	];

	const uniqueStores = [...new Set(wishlistItems.map((item) => item.store.name))];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6">
					<Heart className="size-6 fill-primary text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Saved from Sellers</h1>
				</div>
				<StoreFilter stores={uniqueStores} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
