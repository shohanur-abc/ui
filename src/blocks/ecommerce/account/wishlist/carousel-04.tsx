import Link from 'next/link';
import { Heart, ShoppingCart, X, ChevronLeft, ChevronRight, Zap, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice: number;
	image: string;
	timeLeft: string;
	claimedPercent: number;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const CountdownBadge = ({ timeLeft }: { timeLeft: string }) => (
	<Badge className="gap-1 bg-black/70 backdrop-blur-sm text-white">
		<Clock className="size-3 animate-pulse" />
		{timeLeft}
	</Badge>
);

const ClaimProgress = ({ percent }: { percent: number }) => (
	<div className="mt-2">
		<div className="flex justify-between text-xs mb-1">
			<span className="text-muted-foreground">Claimed</span>
			<span className="font-medium">{percent}%</span>
		</div>
		<Progress value={percent} className="h-1.5" />
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => {
	const discount = Math.round((1 - item.price / item.originalPrice) * 100);

	return (
		<div className="flex-shrink-0 w-64 @sm:w-72">
			<Card className="overflow-hidden group h-full ring-2 ring-primary/20">
				<div className="relative aspect-square bg-muted">
					<img src={item.image} alt={item.name} className="size-full object-cover" />
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
					<div className="absolute top-3 left-3 flex gap-2">
						<Badge className="bg-destructive text-destructive-foreground gap-1">
							<Zap className="size-3" />
							-{discount}%
						</Badge>
					</div>
					<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
						<Heart className="size-4 fill-primary text-primary" />
					</Button>
					<div className="absolute bottom-3 left-3">
						<CountdownBadge timeLeft={item.timeLeft} />
					</div>
				</div>
				<div className="p-4">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<div className="flex items-center gap-2 mt-2">
						<span className="text-xl font-bold text-primary">${item.price.toFixed(2)}</span>
						<span className="text-sm text-muted-foreground line-through">${item.originalPrice.toFixed(2)}</span>
					</div>
					<ClaimProgress percent={item.claimedPercent} />
					<div className="flex items-center gap-2 mt-4">
						<Button size="sm" className="flex-1 gap-1">
							<ShoppingCart className="size-4" />
							Claim Deal
						</Button>
						<Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
							<X className="size-4" />
						</Button>
					</div>
				</div>
			</Card>
		</div>
	);
};

const CarouselSlider = ({ items }: CarouselProps) => (
	<div className="relative">
		<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
			{items.map((item) => (
				<div key={item.id} className="snap-start">
					<CarouselItem item={item} />
				</div>
			))}
		</div>
		<Button variant="outline" size="icon" className="absolute left-0 top-1/3 -translate-x-1/2 hidden @md:flex bg-background shadow-lg">
			<ChevronLeft className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="absolute right-0 top-1/3 translate-x-1/2 hidden @md:flex bg-background shadow-lg">
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

const FlashHeader = () => (
	<div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-destructive/10 border border-primary/20">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
				<Zap className="size-5 text-primary animate-pulse" />
			</div>
			<div>
				<h1 className="text-xl @md:text-2xl font-bold">Flash Deals Wishlist</h1>
				<p className="text-sm text-muted-foreground">Limited time offers from your saved items</p>
			</div>
		</div>
		<Badge variant="secondary" className="hidden @sm:flex gap-1">
			<Clock className="size-3" />
			Updated 5m ago
		</Badge>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Noise-Canceling Headphones', price: 179.00, originalPrice: 349.00, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', timeLeft: '2h 15m', claimedPercent: 78, href: '/product/1' },
		{ id: '2', name: 'Smart Fitness Watch', price: 149.00, originalPrice: 299.00, image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop', timeLeft: '4h 30m', claimedPercent: 45, href: '/product/2' },
		{ id: '3', name: '4K Webcam', price: 89.00, originalPrice: 159.00, image: 'https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=400&fit=crop', timeLeft: '1h 45m', claimedPercent: 92, href: '/product/3' },
		{ id: '4', name: 'Mechanical Keyboard', price: 129.00, originalPrice: 199.00, image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&h=400&fit=crop', timeLeft: '6h 20m', claimedPercent: 33, href: '/product/4' },
		{ id: '5', name: 'Portable SSD 1TB', price: 79.00, originalPrice: 129.00, image: 'https://images.unsplash.com/photo-1531492746076-161ca9bcad58?w=400&h=400&fit=crop', timeLeft: '3h 10m', claimedPercent: 67, href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<FlashHeader />
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
