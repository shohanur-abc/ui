import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	aiMatchScore: number;
	matchReasons: string[];
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const MatchScore = ({ score }: { score: number }) => {
	const color = score >= 90 ? 'text-green-600' : score >= 75 ? 'text-amber-600' : 'text-muted-foreground';
	const bgColor = score >= 90 ? 'bg-green-500' : score >= 75 ? 'bg-amber-500' : 'bg-muted';

	return (
		<div className="flex items-center gap-2">
			<div className="flex-1">
				<Progress value={score} className="h-1.5" />
			</div>
			<span className={`text-sm font-bold ${color}`}>{score}%</span>
		</div>
	);
};

const MatchReasons = ({ reasons }: { reasons: string[] }) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{reasons.map((reason, i) => (
			<Badge key={i} variant="outline" className="text-xs bg-primary/5">
				{reason}
			</Badge>
		))}
	</div>
);

const FeedbackButtons = () => (
	<div className="flex items-center gap-1 mt-2">
		<span className="text-xs text-muted-foreground mr-2">Was this helpful?</span>
		<Button variant="ghost" size="icon-sm" className="size-7">
			<ThumbsUp className="size-3" />
		</Button>
		<Button variant="ghost" size="icon-sm" className="size-7">
			<ThumbsDown className="size-3" />
		</Button>
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4">
		<div className="flex gap-4">
			<div className="relative size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img src={item.image} alt={item.name} className="size-full object-cover" />
				{item.aiMatchScore >= 90 && (
					<Badge className="absolute top-1 left-1 gap-0.5 bg-gradient-to-r from-violet-500 to-pink-500 text-white text-[10px] px-1.5 border-0">
						<Sparkles className="size-2.5" />
						Top Match
					</Badge>
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<Link href={item.href}>
							<h3 className="font-semibold hover:text-primary transition-colors">{item.name}</h3>
						</Link>
						<div className="flex items-center gap-2 mt-1">
							<Sparkles className="size-3 text-primary" />
							<span className="text-xs text-muted-foreground">AI Match Score</span>
						</div>
						<MatchScore score={item.aiMatchScore} />
						<MatchReasons reasons={item.matchReasons} />
						<FeedbackButtons />
					</div>
					<Button variant="ghost" size="icon-sm" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-3 pt-3 border-t">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const AIHeader = () => (
	<div className="p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-pink-500/10 border border-violet-500/20 mb-6">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center">
				<Sparkles className="size-5 text-white" />
			</div>
			<div>
				<p className="font-medium">AI-Powered Recommendations</p>
				<p className="text-sm text-muted-foreground">Matched to your style preferences and purchase history</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Minimalist Leather Backpack', price: 189.00, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop', aiMatchScore: 96, matchReasons: ['Matches past purchases', 'Your favorite brand', 'Preferred color'], href: '/product/1' },
		{ id: '2', name: 'Classic Aviator Sunglasses', price: 145.00, image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop', aiMatchScore: 88, matchReasons: ['Similar to viewed items', 'Popular in your area'], href: '/product/2' },
		{ id: '3', name: 'Wireless Charging Stand', price: 59.00, image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=200&h=200&fit=crop', aiMatchScore: 72, matchReasons: ['Complements recent purchase'], href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Smart Wishlist</h1>
				<AIHeader />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
