import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	matchScore: number;
	matchReasons: string[];
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const MatchScoreRing = ({ score }: { score: number }) => {
	const color = score >= 90 ? 'text-green-500' : score >= 75 ? 'text-amber-500' : 'text-muted-foreground';
	return (
		<div className="relative size-12 flex items-center justify-center">
			<svg className="size-full -rotate-90" viewBox="0 0 36 36">
				<circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" className="text-muted" />
				<circle
					cx="18"
					cy="18"
					r="16"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeDasharray={`${score} 100`}
					strokeLinecap="round"
					className={color}
				/>
			</svg>
			<span className="absolute text-xs font-bold">{score}%</span>
		</div>
	);
};

const MatchReasons = ({ reasons }: { reasons: string[] }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{reasons.slice(0, 2).map((reason, i) => (
			<Badge key={i} variant="secondary" className="text-[10px]">
				{reason}
			</Badge>
		))}
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-60 @sm:w-64 @md:w-72">
		<Card className={`overflow-hidden group h-full ${item.matchScore >= 90 ? 'ring-2 ring-green-500/30' : ''}`}>
			<div className="relative aspect-square bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				{item.matchScore >= 90 && (
					<Badge className="absolute top-3 left-3 gap-1 bg-gradient-to-r from-violet-500 to-pink-500 text-white border-0">
						<Sparkles className="size-3" />
						Top Match
					</Badge>
				)}
				<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
			</div>
			<div className="p-4">
				<div className="flex items-start gap-3">
					<MatchScoreRing score={item.matchScore} />
					<div className="flex-1 min-w-0">
						<Link href={item.href}>
							<h3 className="font-semibold text-sm line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
						</Link>
						<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
						<MatchReasons reasons={item.matchReasons} />
					</div>
				</div>
				<div className="flex items-center gap-2 mt-4">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add
					</Button>
					<Button variant="ghost" size="icon-sm" className="text-destructive hover:text-destructive">
						<X className="size-4" />
					</Button>
				</div>
			</div>
		</Card>
	</div>
);

const CarouselSlider = ({ items }: CarouselProps) => (
	<div className="relative">
		<div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory">
			{items.map((item) => (
				<div key={item.id} className="snap-start">
					<CarouselItem item={item} />
				</div>
			))}
		</div>
		<Button variant="outline" size="icon" className="absolute left-0 top-1/3 -translate-x-1/2 hidden @lg:flex bg-background shadow-lg">
			<ChevronLeft className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="absolute right-0 top-1/3 translate-x-1/2 hidden @lg:flex bg-background shadow-lg">
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

const AIHeader = () => (
	<div className="flex items-center gap-3 mb-6">
		<div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
			<Sparkles className="size-5 text-white" />
		</div>
		<div>
			<h1 className="text-xl @md:text-2xl font-bold">AI Curated For You</h1>
			<p className="text-sm text-muted-foreground">Based on your style and preferences</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Minimalist Backpack', price: 129.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop', matchScore: 96, matchReasons: ['Matches past purchases', 'Your favorite brand'], href: '/product/1' },
		{ id: '2', name: 'Leather Chelsea Boots', price: 245.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', matchScore: 92, matchReasons: ['Similar to viewed items', 'Trending in your area'], href: '/product/2' },
		{ id: '3', name: 'Wool Overcoat', price: 395.00, image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop', matchScore: 88, matchReasons: ['Complements wardrobe'], href: '/product/3' },
		{ id: '4', name: 'Classic Watch', price: 275.00, image: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop', matchScore: 78, matchReasons: ['Style match'], href: '/product/4' },
		{ id: '5', name: 'Cashmere Sweater', price: 195.00, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop', matchScore: 94, matchReasons: ['Favorite color', 'Preferred material'], href: '/product/5' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<AIHeader />
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
