import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	TrendingUp,
	TrendingDown,
	Minus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface PriceHistory {
	current: number;
	lowest: number;
	highest: number;
	trend: 'up' | 'down' | 'stable';
	changePercent: number;
}

interface WishlistItem {
	id: string;
	name: string;
	image: string;
	height: 'short' | 'medium' | 'tall';
	priceHistory: PriceHistory;
	href: string;
}

interface MasonryProps {
	items: WishlistItem[];
}

const heightClasses = {
	short: 'h-48',
	medium: 'h-64',
	tall: 'h-80',
};

const trendConfig = {
	up: { icon: TrendingUp, color: 'text-red-500', bgColor: 'bg-red-50' },
	down: { icon: TrendingDown, color: 'text-green-500', bgColor: 'bg-green-50' },
	stable: { icon: Minus, color: 'text-muted-foreground', bgColor: 'bg-muted' },
};

const TrendIndicator = ({
	trend,
	changePercent,
}: {
	trend: 'up' | 'down' | 'stable';
	changePercent: number;
}) => {
	const config = trendConfig[trend];
	const Icon = config.icon;
	return (
		<div
			className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${config.bgColor}`}
		>
			<Icon className={`size-3 ${config.color}`} />
			<span className={`text-xs font-medium ${config.color}`}>
				{trend !== 'stable' && (trend === 'up' ? '+' : '-')}
				{changePercent}%
			</span>
		</div>
	);
};

const PriceRange = ({
	lowest,
	highest,
	current,
}: {
	lowest: number;
	highest: number;
	current: number;
}) => {
	const range = highest - lowest;
	const position = range > 0 ? ((current - lowest) / range) * 100 : 50;

	return (
		<div className="mt-2">
			<div className="flex justify-between text-xs text-muted-foreground mb-1">
				<span>${lowest}</span>
				<span>${highest}</span>
			</div>
			<div className="relative h-1.5 bg-muted rounded-full">
				<div
					className="absolute top-1/2 -translate-y-1/2 size-3 bg-primary rounded-full border-2 border-background shadow"
					style={{ left: `calc(${position}% - 6px)` }}
				/>
			</div>
			<p className="text-xs text-center text-muted-foreground mt-1">
				Current vs. price range
			</p>
		</div>
	);
};

const MasonryItem = ({ item }: { item: WishlistItem }) => {
	const isAtLowest = item.priceHistory.current <= item.priceHistory.lowest;

	return (
		<div className="break-inside-avoid mb-4">
			<Card
				className={`overflow-hidden group ${isAtLowest ? 'ring-2 ring-green-500' : ''}`}
			>
				<div className={`relative ${heightClasses[item.height]} bg-muted`}>
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover"
					/>
					<Button
						variant="ghost"
						size="icon-sm"
						className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
					>
						<Heart className="size-4 fill-primary text-primary" />
					</Button>
					{isAtLowest && (
						<Badge className="absolute top-2 left-2 bg-green-500 text-white">
							Lowest Price!
						</Badge>
					)}
					<div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
						<Button size="sm" className="w-full gap-1">
							<ShoppingCart className="size-4" />
							Buy Now
						</Button>
					</div>
				</div>
				<div className="p-3">
					<div className="flex items-start justify-between gap-2">
						<Link href={item.href} className="flex-1">
							<h3 className="font-medium line-clamp-1 hover:text-primary transition-colors">
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
						<span className="text-lg font-bold">
							${item.priceHistory.current.toFixed(2)}
						</span>
						<TrendIndicator
							trend={item.priceHistory.trend}
							changePercent={item.priceHistory.changePercent}
						/>
					</div>
					<PriceRange
						lowest={item.priceHistory.lowest}
						highest={item.priceHistory.highest}
						current={item.priceHistory.current}
					/>
				</div>
			</Card>
		</div>
	);
};

const MasonryGrid = ({ items }: MasonryProps) => (
	<div className="columns-2 @md:columns-3 @xl:columns-4 gap-4">
		{items.map((item) => (
			<MasonryItem key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Smart TV 55"',
			image:
				'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=300&fit=crop',
			height: 'short',
			priceHistory: {
				current: 449.0,
				lowest: 449.0,
				highest: 699.0,
				trend: 'down',
				changePercent: 12,
			},
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Noise-Canceling Headphones',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=500&fit=crop',
			height: 'tall',
			priceHistory: {
				current: 279.0,
				lowest: 249.0,
				highest: 349.0,
				trend: 'up',
				changePercent: 8,
			},
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Robot Vacuum',
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
			height: 'medium',
			priceHistory: {
				current: 399.0,
				lowest: 349.0,
				highest: 449.0,
				trend: 'stable',
				changePercent: 0,
			},
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Air Purifier',
			image:
				'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=350&fit=crop',
			height: 'medium',
			priceHistory: {
				current: 189.0,
				lowest: 189.0,
				highest: 249.0,
				trend: 'down',
				changePercent: 15,
			},
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Electric Kettle',
			image:
				'https://images.unsplash.com/photo-1594213114663-d94db9b13eb3?w=400&h=280&fit=crop',
			height: 'short',
			priceHistory: {
				current: 79.0,
				lowest: 69.0,
				highest: 99.0,
				trend: 'up',
				changePercent: 5,
			},
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Coffee Machine',
			image:
				'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=500&fit=crop',
			height: 'tall',
			priceHistory: {
				current: 599.0,
				lowest: 599.0,
				highest: 799.0,
				trend: 'down',
				changePercent: 20,
			},
			href: '/product/6',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Price Watch</h1>
				<MasonryGrid items={wishlistItems} />
			</div>
		</section>
	);
}
