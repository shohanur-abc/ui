import Link from 'next/link';
import { Heart, ShoppingCart, X, Calendar, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	addedDate: string;
	notificationsEnabled: boolean;
	priceDropped?: boolean;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const NotificationToggle = ({ enabled }: { enabled: boolean }) => (
	<div className="flex items-center justify-between p-2 rounded-lg bg-muted/50 mt-3">
		<div className="flex items-center gap-2 text-xs">
			{enabled ? <Bell className="size-3 text-primary" /> : <BellOff className="size-3 text-muted-foreground" />}
			<span className={enabled ? 'text-foreground' : 'text-muted-foreground'}>Price Alerts</span>
		</div>
		<Switch checked={enabled} />
	</div>
);

const DateBadge = ({ date }: { date: string }) => (
	<div className="flex items-center gap-1 text-xs text-muted-foreground mt-2">
		<Calendar className="size-3" />
		Added {date}
	</div>
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
			{item.priceDropped && (
				<Badge className="absolute bottom-2 left-2" variant="destructive">
					Price Dropped!
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<DateBadge date={item.addedDate} />
			<div className="mt-2 flex items-center gap-2">
				<span className={`text-xl font-bold ${item.priceDropped ? 'text-destructive' : ''}`}>
					${item.price.toFixed(2)}
				</span>
				{item.priceDropped && (
					<span className="text-xs text-green-600 font-medium">↓ 15% lower</span>
				)}
			</div>
			<NotificationToggle enabled={item.notificationsEnabled} />
			<Button className="w-full mt-3 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
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

const NotificationSummary = ({ items }: { items: WishlistItem[] }) => {
	const enabledCount = items.filter((item) => item.notificationsEnabled).length;
	const priceDrops = items.filter((item) => item.priceDropped).length;

	return (
		<div className="flex flex-wrap gap-4 mb-6 @md:mb-8">
			<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted">
				<Bell className="size-4 text-primary" />
				<span className="text-sm">{enabledCount} alerts active</span>
			</div>
			{priceDrops > 0 && (
				<div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-destructive/10 text-destructive">
					<span className="text-sm font-medium">{priceDrops} price drops!</span>
				</div>
			)}
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Ergonomic Office Chair', price: 399.00, image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop', addedDate: 'Oct 15', notificationsEnabled: true, priceDropped: true, href: '/product/1' },
		{ id: '2', name: 'Standing Desk Converter', price: 249.00, image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop', addedDate: 'Oct 18', notificationsEnabled: true, href: '/product/2' },
		{ id: '3', name: 'Monitor Light Bar', price: 79.00, image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop', addedDate: 'Oct 20', notificationsEnabled: false, href: '/product/3' },
		{ id: '4', name: 'Wireless Keyboard', price: 149.00, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop', addedDate: 'Oct 22', notificationsEnabled: true, priceDropped: true, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Price Watch</h1>
				<NotificationSummary items={wishlistItems} />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
