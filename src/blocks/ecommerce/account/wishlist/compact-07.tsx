import Link from 'next/link';
import { ShoppingCart, TrendingDown, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	targetPrice: number;
	image: string;
	alertEnabled: boolean;
	href: string;
}

interface CompactProps {
	items: WishlistItem[];
}

const PriceAlertItem = ({ item }: { item: WishlistItem }) => {
	const atTarget = item.price <= item.targetPrice;

	return (
		<div
			className={`flex items-center gap-3 p-2 rounded-lg transition-colors ${atTarget ? 'bg-green-50 border border-green-200' : 'hover:bg-muted'}`}
		>
			<div className="size-10 rounded overflow-hidden bg-muted flex-shrink-0">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
			</div>
			<div className="flex-1 min-w-0">
				<Link href={item.href}>
					<p className="text-sm font-medium truncate hover:text-primary transition-colors">
						{item.name}
					</p>
				</Link>
				<div className="flex items-center gap-2 text-xs">
					<span className={`font-bold ${atTarget ? 'text-green-600' : ''}`}>
						${item.price}
					</span>
					<TrendingDown className="size-3 text-muted-foreground" />
					<span className="text-muted-foreground">
						Target: ${item.targetPrice}
					</span>
				</div>
			</div>
			<div className="flex items-center gap-2 flex-shrink-0">
				{item.alertEnabled ? (
					<Bell className="size-4 text-primary" />
				) : (
					<BellOff className="size-4 text-muted-foreground" />
				)}
				<Switch checked={item.alertEnabled} className="scale-75" />
			</div>
			{atTarget && (
				<Button size="sm" className="gap-1 flex-shrink-0">
					<ShoppingCart className="size-3" />
					Buy
				</Button>
			)}
		</div>
	);
};

const PriceAlertList = ({ items }: CompactProps) => (
	<div className="space-y-2">
		{items.map((item) => (
			<PriceAlertItem key={item.id} item={item} />
		))}
	</div>
);

const AlertSummary = ({ items }: { items: WishlistItem[] }) => {
	const atTarget = items.filter(
		(item) => item.price <= item.targetPrice,
	).length;
	const alertsEnabled = items.filter((item) => item.alertEnabled).length;

	return (
		<div className="flex gap-2 mb-4">
			<Badge
				variant="outline"
				className="gap-1 bg-green-50 text-green-700 border-green-200"
			>
				<TrendingDown className="size-3" />
				{atTarget} at target
			</Badge>
			<Badge variant="outline" className="gap-1">
				<Bell className="size-3" />
				{alertsEnabled} alerts on
			</Badge>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Smart TV 55"',
			price: 449,
			targetPrice: 450,
			image:
				'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=100&h=100&fit=crop',
			alertEnabled: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Soundbar',
			price: 299,
			targetPrice: 250,
			image:
				'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=100&h=100&fit=crop',
			alertEnabled: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Streaming Device',
			price: 49,
			targetPrice: 40,
			image:
				'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=100&h=100&fit=crop',
			alertEnabled: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Gaming Console',
			price: 399,
			targetPrice: 400,
			image:
				'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=100&h=100&fit=crop',
			alertEnabled: true,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-md px-4 py-6">
				<h1 className="text-lg font-bold mb-2">Price Alerts</h1>
				<AlertSummary items={wishlistItems} />
				<PriceAlertList items={wishlistItems} />
			</div>
		</section>
	);
}
