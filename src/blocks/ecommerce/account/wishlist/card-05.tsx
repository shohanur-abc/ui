import Link from 'next/link';
import { Heart, ShoppingCart, X, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice: number;
	image: string;
	dealEndsIn: string;
	claimed: number;
	total: number;
	isFlashDeal: boolean;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const DealTimer = ({ endsIn }: { endsIn: string }) => (
	<div className="flex items-center gap-1.5 text-xs">
		<Timer className="size-3 text-destructive" />
		<span className="text-destructive font-medium">Ends in {endsIn}</span>
	</div>
);

const ClaimProgress = ({
	claimed,
	total,
}: {
	claimed: number;
	total: number;
}) => {
	const percentage = (claimed / total) * 100;
	return (
		<div className="mt-2">
			<div className="flex items-center justify-between text-xs mb-1">
				<span className="text-muted-foreground">{claimed} claimed</span>
				<span className="text-muted-foreground">{total - claimed} left</span>
			</div>
			<Progress value={percentage} className="h-1.5" />
		</div>
	);
};

const DiscountBadge = ({
	original,
	current,
}: {
	original: number;
	current: number;
}) => {
	const discount = Math.round((1 - current / original) * 100);
	return (
		<Badge className="gap-1 bg-gradient-to-r from-red-500 to-orange-500 text-white border-0">
			<Zap className="size-3" />
			{discount}% OFF
		</Badge>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg border-2 hover:border-primary/20">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 left-2">
				<DiscountBadge original={item.originalPrice} current={item.price} />
			</div>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full"
			>
				<X className="size-4" />
			</Button>
			{item.isFlashDeal && (
				<div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-8">
					<DealTimer endsIn={item.dealEndsIn} />
				</div>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-xl font-bold text-destructive">
					${item.price.toFixed(2)}
				</span>
				<span className="text-sm text-muted-foreground line-through">
					${item.originalPrice.toFixed(2)}
				</span>
			</div>
			<ClaimProgress claimed={item.claimed} total={item.total} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Grab Deal
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-4 @md:gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const DealBanner = () => (
	<div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-red-500/20 mb-6 @md:mb-8">
		<div className="size-12 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center">
			<Zap className="size-6 text-white" />
		</div>
		<div>
			<h2 className="font-bold text-lg">Flash Deals in Your Wishlist!</h2>
			<p className="text-sm text-muted-foreground">
				Limited time offers on items you love
			</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Bluetooth Noise Cancelling Headphones',
			price: 149.99,
			originalPrice: 249.99,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			dealEndsIn: '2h 34m',
			claimed: 78,
			total: 100,
			isFlashDeal: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Fitness Tracker',
			price: 79.99,
			originalPrice: 149.99,
			image:
				'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop',
			dealEndsIn: '5h 12m',
			claimed: 45,
			total: 100,
			isFlashDeal: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Portable Bluetooth Speaker',
			price: 39.99,
			originalPrice: 79.99,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
			dealEndsIn: '1h 08m',
			claimed: 92,
			total: 100,
			isFlashDeal: true,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Wireless Charging Pad',
			price: 19.99,
			originalPrice: 39.99,
			image:
				'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=400&h=400&fit=crop',
			dealEndsIn: '3h 45m',
			claimed: 65,
			total: 100,
			isFlashDeal: true,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Deals in Your Wishlist
				</h1>
				<DealBanner />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
