import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Trash2,
	Eye,
	Clock,
	TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface PriceHistory {
	date: string;
	price: number;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	lowestPrice: number;
	highestPrice: number;
	image: string;
	priceHistory: PriceHistory[];
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const PriceChart = ({
	history,
	currentPrice,
}: {
	history: PriceHistory[];
	currentPrice: number;
}) => {
	const maxPrice = Math.max(...history.map((h) => h.price));
	const minPrice = Math.min(...history.map((h) => h.price));
	const range = maxPrice - minPrice || 1;

	return (
		<div className="h-12 flex items-end gap-0.5">
			{history.map((point, i) => {
				const height = ((point.price - minPrice) / range) * 100;
				const isCurrentPrice = point.price === currentPrice;
				return (
					<TooltipProvider key={i}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div
									className={`flex-1 rounded-t transition-colors ${
										isCurrentPrice
											? 'bg-primary'
											: 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
									}`}
									style={{ height: `${Math.max(height, 10)}%` }}
								/>
							</TooltipTrigger>
							<TooltipContent>
								<p className="text-xs">
									{point.date}: ${point.price.toFixed(2)}
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				);
			})}
		</div>
	);
};

const PriceStats = ({
	lowest,
	highest,
	current,
}: {
	lowest: number;
	highest: number;
	current: number;
}) => {
	const isLowest = current <= lowest;
	return (
		<div className="flex items-center justify-between text-xs mt-2">
			<div className="flex items-center gap-1 text-muted-foreground">
				<span>Low: ${lowest.toFixed(2)}</span>
			</div>
			{isLowest && (
				<Badge className="gap-1 text-[10px]" variant="default">
					<TrendingDown className="size-3" />
					Best Price
				</Badge>
			)}
			<div className="flex items-center gap-1 text-muted-foreground">
				<span>High: ${highest.toFixed(2)}</span>
			</div>
		</div>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<div className="group rounded-xl border bg-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full shadow-md"
				>
					<Eye className="size-3.5" />
				</Button>
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full shadow-md text-destructive"
				>
					<Trash2 className="size-3.5" />
				</Button>
			</div>
		</div>
		<div className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
			</div>
			<div className="mt-3 p-3 rounded-lg bg-muted/50">
				<div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
					<Clock className="size-3" />
					Price History (30 days)
				</div>
				<PriceChart history={item.priceHistory} currentPrice={item.price} />
				<PriceStats
					lowest={item.lowestPrice}
					highest={item.highestPrice}
					current={item.price}
				/>
			</div>
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
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

export default function Main() {
	const priceHistory: PriceHistory[] = [
		{ date: 'Jan 1', price: 89.99 },
		{ date: 'Jan 8', price: 79.99 },
		{ date: 'Jan 15', price: 84.99 },
		{ date: 'Jan 22', price: 74.99 },
		{ date: 'Jan 29', price: 69.99 },
	];

	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Smart LED Light Bulbs (4-Pack)',
			price: 39.99,
			lowestPrice: 34.99,
			highestPrice: 49.99,
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
			priceHistory: [
				{ date: 'Jan 1', price: 49.99 },
				{ date: 'Jan 8', price: 44.99 },
				{ date: 'Jan 15', price: 42.99 },
				{ date: 'Jan 22', price: 39.99 },
				{ date: 'Jan 29', price: 39.99 },
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Ergonomic Office Chair',
			price: 299.0,
			lowestPrice: 279.0,
			highestPrice: 349.0,
			image:
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
			priceHistory: [
				{ date: 'Jan 1', price: 349.0 },
				{ date: 'Jan 8', price: 329.0 },
				{ date: 'Jan 15', price: 299.0 },
				{ date: 'Jan 22', price: 309.0 },
				{ date: 'Jan 29', price: 299.0 },
			],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Standing Desk Converter',
			price: 189.99,
			lowestPrice: 189.99,
			highestPrice: 229.99,
			image:
				'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=400&h=400&fit=crop',
			priceHistory: [
				{ date: 'Jan 1', price: 229.99 },
				{ date: 'Jan 8', price: 219.99 },
				{ date: 'Jan 15', price: 209.99 },
				{ date: 'Jan 22', price: 199.99 },
				{ date: 'Jan 29', price: 189.99 },
			],
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Noise Cancelling Earbuds',
			price: 179.99,
			lowestPrice: 149.99,
			highestPrice: 199.99,
			image:
				'https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop',
			priceHistory: [
				{ date: 'Jan 1', price: 199.99 },
				{ date: 'Jan 8', price: 189.99 },
				{ date: 'Jan 15', price: 179.99 },
				{ date: 'Jan 22', price: 169.99 },
				{ date: 'Jan 29', price: 179.99 },
			],
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Price Tracker</h1>
					<p className="text-muted-foreground mt-1">
						Track prices of your saved items
					</p>
				</div>
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
