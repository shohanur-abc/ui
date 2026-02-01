import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecommendedItem {
	id: string;
	name: string;
	price: number;
	image: string;
	matchScore: number;
	reason: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	recommendations: RecommendedItem[];
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const MatchBadge = ({ score }: { score: number }) => (
	<Badge className="gap-1 bg-gradient-to-r from-violet-500 to-purple-500 text-white">
		<Sparkles className="size-3" />
		{score}% Match
	</Badge>
);

const RecommendationCard = ({ item }: { item: RecommendedItem }) => (
	<div className="flex gap-3 p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
		<div className="size-16 shrink-0 rounded-md overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<div className="flex-1 min-w-0">
			<p className="text-sm font-medium line-clamp-1">{item.name}</p>
			<p className="text-xs text-muted-foreground line-clamp-1">
				{item.reason}
			</p>
			<div className="flex items-center justify-between mt-1">
				<span className="text-sm font-semibold">${item.price.toFixed(2)}</span>
				<MatchBadge score={item.matchScore} />
			</div>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
			<Button className="w-full mt-3 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
			{item.recommendations.length > 0 && (
				<div className="mt-4 pt-4 border-t">
					<div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-2">
						<Wand2 className="size-3" />
						Pairs well with
					</div>
					<div className="space-y-2">
						{item.recommendations.slice(0, 2).map((rec) => (
							<RecommendationCard key={rec.id} item={rec} />
						))}
					</div>
				</div>
			)}
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const AIBanner = () => (
	<div className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/10 via-purple-500/10 to-fuchsia-500/10 border border-violet-500/20 mb-6 @md:mb-8">
		<div className="size-10 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
			<Sparkles className="size-5 text-white" />
		</div>
		<div className="flex-1">
			<h2 className="font-semibold">AI-Powered Recommendations</h2>
			<p className="text-sm text-muted-foreground">
				We&apos;ve found items that pair perfectly with your wishlist
			</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Navy Blazer',
			price: 299.0,
			image:
				'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
			href: '/product/1',
			recommendations: [
				{
					id: 'r1',
					name: 'White Oxford Shirt',
					price: 89.0,
					image:
						'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop',
					matchScore: 95,
					reason: 'Classic pairing',
				},
				{
					id: 'r2',
					name: 'Gray Wool Trousers',
					price: 149.0,
					image:
						'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=100&h=100&fit=crop',
					matchScore: 92,
					reason: 'Complete the look',
				},
			],
		},
		{
			id: '2',
			name: 'Leather Messenger Bag',
			price: 245.0,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
			href: '/product/2',
			recommendations: [
				{
					id: 'r3',
					name: 'Leather Belt',
					price: 79.0,
					image:
						'https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=100&h=100&fit=crop',
					matchScore: 88,
					reason: 'Matching leather',
				},
				{
					id: 'r4',
					name: 'Leather Card Wallet',
					price: 55.0,
					image:
						'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
					matchScore: 85,
					reason: 'Complete set',
				},
			],
		},
		{
			id: '3',
			name: 'Desert Boots',
			price: 189.0,
			image:
				'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=400&h=400&fit=crop',
			href: '/product/3',
			recommendations: [
				{
					id: 'r5',
					name: 'Chino Pants',
					price: 95.0,
					image:
						'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=100&h=100&fit=crop',
					matchScore: 90,
					reason: 'Classic match',
				},
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<AIBanner />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
