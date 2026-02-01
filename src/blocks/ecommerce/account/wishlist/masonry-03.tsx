import Link from 'next/link';
import { Heart, ShoppingCart, X, Flame, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	height: 'short' | 'medium' | 'tall';
	urgency?: 'hot' | 'limited' | 'flash';
	timeLeft?: string;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-40',
	medium: 'h-56',
	tall: 'h-72',
};

const urgencyConfig = {
	hot: { icon: Flame, label: 'Hot Deal', class: 'bg-orange-500 text-white' },
	limited: {
		icon: Clock,
		label: 'Limited Stock',
		class: 'bg-amber-500 text-white',
	},
	flash: { icon: Zap, label: 'Flash Sale', class: 'bg-violet-500 text-white' },
};

const UrgencyBadge = ({ type }: { type: 'hot' | 'limited' | 'flash' }) => {
	const config = urgencyConfig[type];
	const Icon = config.icon;
	return (
		<Badge className={`gap-1 ${config.class} animate-pulse`}>
			<Icon className="size-3" />
			{config.label}
		</Badge>
	);
};

const CountdownTimer = ({ timeLeft }: { timeLeft: string }) => (
	<div className="flex items-center gap-1 text-xs text-white bg-black/60 px-2 py-1 rounded-full">
		<Clock className="size-3" />
		<span>{timeLeft}</span>
	</div>
);

const MasonryItem = ({ item }: { item: WishlistItem }) => (
	<div className="break-inside-avoid mb-4">
		<Card
			className={`overflow-hidden group ${item.urgency ? 'ring-2 ring-primary' : ''}`}
		>
			<div className={`relative ${heightClasses[item.height]} bg-muted`}>
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<div className="absolute top-2 left-2 flex flex-col gap-1">
					{item.urgency && <UrgencyBadge type={item.urgency} />}
				</div>
				{item.timeLeft && (
					<div className="absolute top-2 right-2">
						<CountdownTimer timeLeft={item.timeLeft} />
					</div>
				)}
				<div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
					<Button
						size="sm"
						className="w-full gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
					>
						<ShoppingCart className="size-4" />
						Quick Add
					</Button>
				</div>
			</div>
			<div className="p-3">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href} className="flex-1">
						<h3 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
							{item.name}
						</h3>
					</Link>
					<Button
						variant="ghost"
						size="icon-sm"
						className="flex-shrink-0 text-destructive hover:text-destructive"
					>
						<X className="size-3" />
					</Button>
				</div>
				<div className="flex items-center gap-2 mt-2">
					<span className="font-bold text-primary">
						${item.price.toFixed(2)}
					</span>
					{item.originalPrice && (
						<span className="text-xs text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
			</div>
		</Card>
	</div>
);

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @sm:columns-3 @lg:columns-4 @2xl:columns-5 gap-3">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

const FilterBar = () => (
	<div className="flex flex-wrap gap-2 mb-6">
		<Badge
			variant="secondary"
			className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
		>
			All
		</Badge>
		<Badge
			variant="outline"
			className="cursor-pointer hover:bg-primary hover:text-primary-foreground gap-1"
		>
			<Flame className="size-3" />
			Hot Deals
		</Badge>
		<Badge
			variant="outline"
			className="cursor-pointer hover:bg-primary hover:text-primary-foreground gap-1"
		>
			<Zap className="size-3" />
			Flash Sales
		</Badge>
		<Badge
			variant="outline"
			className="cursor-pointer hover:bg-primary hover:text-primary-foreground gap-1"
		>
			<Clock className="size-3" />
			Ending Soon
		</Badge>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Smart Fitness Tracker',
			price: 79.0,
			originalPrice: 149.0,
			image:
				'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop',
			height: 'medium',
			urgency: 'flash',
			timeLeft: '2h 45m',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Portable Speaker',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop',
			height: 'short',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Premium Headphones',
			price: 189.0,
			originalPrice: 299.0,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
			height: 'tall',
			urgency: 'hot',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Wireless Charger',
			price: 35.0,
			image:
				'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=280&fit=crop',
			height: 'short',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Mechanical Keyboard',
			price: 129.0,
			originalPrice: 179.0,
			image:
				'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=350&fit=crop',
			height: 'medium',
			urgency: 'limited',
			timeLeft: '5 left',
			href: '/product/5',
		},
		{
			id: '6',
			name: 'USB-C Hub',
			price: 49.0,
			image:
				'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=400&h=250&fit=crop',
			height: 'short',
			href: '/product/6',
		},
		{
			id: '7',
			name: 'Laptop Stand',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=450&fit=crop',
			height: 'tall',
			href: '/product/7',
		},
		{
			id: '8',
			name: 'Smart Watch Band',
			price: 29.0,
			originalPrice: 49.0,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=320&fit=crop',
			height: 'medium',
			urgency: 'flash',
			timeLeft: '45m',
			href: '/product/8',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-4">
					Deals Watchlist
				</h1>
				<FilterBar />
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
