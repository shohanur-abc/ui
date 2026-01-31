import Link from 'next/link';
import { Heart, Plus, Eye, Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	colors: string[];
	sizes: string[];
	notifyOnSale: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const NotificationToggle = ({ enabled }: { enabled: boolean }) => (
	<div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50">
		{enabled ? (
			<Bell className="size-4 text-primary" />
		) : (
			<BellOff className="size-4 text-muted-foreground" />
		)}
		<Label htmlFor="notify" className="text-sm flex-1 cursor-pointer">
			Notify on price drop
		</Label>
		<Switch id="notify" checked={enabled} />
	</div>
);

const ColorOptions = ({ colors }: { colors: string[] }) => (
	<div className="flex items-center gap-1">
		{colors.map((color, i) => (
			<div
				key={i}
				className="size-4 rounded-full border border-border"
				style={{ backgroundColor: color }}
			/>
		))}
		{colors.length > 4 && (
			<span className="text-xs text-muted-foreground ml-1">+{colors.length - 4}</span>
		)}
	</div>
);

const SizeOptions = ({ sizes }: { sizes: string[] }) => (
	<div className="flex flex-wrap gap-1">
		{sizes.slice(0, 4).map((size) => (
			<Badge key={size} variant="outline" className="text-xs px-1.5 py-0">
				{size}
			</Badge>
		))}
		{sizes.length > 4 && (
			<Badge variant="outline" className="text-xs px-1.5 py-0">
				+{sizes.length - 4}
			</Badge>
		)}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<div className="group flex flex-col rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
		<div className="relative aspect-[4/5] overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
				<Button size="icon" variant="secondary" className="rounded-full">
					<Eye className="size-4" />
				</Button>
				<Button size="icon" className="rounded-full">
					<Plus className="size-4" />
				</Button>
			</div>
			{item.originalPrice && (
				<Badge className="absolute top-3 left-3" variant="destructive">
					Sale
				</Badge>
			)}
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-3 right-3 rounded-full"
			>
				<Heart className="size-4 fill-primary text-primary" />
			</Button>
		</div>
		<div className="flex flex-1 flex-col p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<div className="mt-3 space-y-2">
				<ColorOptions colors={item.colors} />
				<SizeOptions sizes={item.sizes} />
			</div>
			<div className="mt-auto pt-4">
				<NotificationToggle enabled={item.notifyOnSale} />
			</div>
		</div>
	</div>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const PageHeader = ({ count }: { count: number }) => (
	<div className="flex items-center justify-between mb-8">
		<div>
			<h1 className="text-2xl @md:text-3xl font-bold">Wishlist</h1>
			<p className="text-muted-foreground mt-1">{count} items saved</p>
		</div>
		<Button variant="outline" className="gap-2">
			<Bell className="size-4" />
			Manage Alerts
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Classic Oxford Shirt', price: 79.00, originalPrice: 99.00, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=400&h=500&fit=crop', colors: ['#ffffff', '#87CEEB', '#FFC0CB', '#000000'], sizes: ['XS', 'S', 'M', 'L', 'XL'], notifyOnSale: true, href: '/product/1' },
		{ id: '2', name: 'Slim Fit Chinos', price: 89.00, image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=500&fit=crop', colors: ['#C3B091', '#000080', '#808080'], sizes: ['28', '30', '32', '34', '36'], notifyOnSale: false, href: '/product/2' },
		{ id: '3', name: 'Merino V-Neck Sweater', price: 129.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', colors: ['#800020', '#000000', '#808080', '#228B22', '#000080'], sizes: ['S', 'M', 'L', 'XL'], notifyOnSale: true, href: '/product/3' },
		{ id: '4', name: 'Leather Chelsea Boots', price: 245.00, originalPrice: 295.00, image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=500&fit=crop', colors: ['#8B4513', '#000000'], sizes: ['7', '8', '9', '10', '11', '12'], notifyOnSale: true, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader count={wishlistItems.length} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
