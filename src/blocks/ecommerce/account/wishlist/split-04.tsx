import Link from 'next/link';
import { Heart, ShoppingCart, Star, Quote, ThumbsUp, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

interface Review {
	id: string;
	author: string;
	avatar: string;
	rating: number;
	date: string;
	content: string;
	helpful: number;
	verified: boolean;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	reviews: Review[];
	ratingBreakdown: { stars: number; percent: number }[];
	href: string;
}

const ProductPanel = ({ item }: { item: WishlistItem }) => (
	<div className="sticky top-4">
		<div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover"
			/>
		</div>
		<h2 className="text-xl font-bold">{item.name}</h2>
		<p className="text-2xl font-bold text-primary mt-2">
			${item.price.toFixed(2)}
		</p>
		<div className="mt-4 p-4 rounded-xl bg-muted">
			<div className="flex items-center gap-2">
				<span className="text-3xl font-bold">{item.rating}</span>
				<div>
					<div className="flex">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`size-4 ${star <= Math.round(item.rating) ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
							/>
						))}
					</div>
					<p className="text-xs text-muted-foreground mt-0.5">
						{item.reviews.length} reviews
					</p>
				</div>
			</div>
			<div className="mt-3 space-y-1">
				{item.ratingBreakdown.map((rb) => (
					<div key={rb.stars} className="flex items-center gap-2 text-xs">
						<span className="w-3">{rb.stars}</span>
						<Star className="size-3 fill-amber-400 text-amber-400" />
						<Progress value={rb.percent} className="flex-1 h-1.5" />
						<span className="w-8 text-right text-muted-foreground">
							{rb.percent}%
						</span>
					</div>
				))}
			</div>
		</div>
		<Button className="w-full mt-4 gap-2">
			<ShoppingCart className="size-4" />
			Add to Cart
		</Button>
	</div>
);

const ReviewCard = ({ review }: { review: Review }) => (
	<div className="p-4 rounded-xl border">
		<div className="flex items-start gap-3">
			<Avatar className="size-10">
				<AvatarImage src={review.avatar} />
				<AvatarFallback>{review.author[0]}</AvatarFallback>
			</Avatar>
			<div className="flex-1">
				<div className="flex items-center gap-2">
					<span className="font-medium">{review.author}</span>
					{review.verified && (
						<Badge variant="secondary" className="text-[10px]">
							Verified
						</Badge>
					)}
				</div>
				<div className="flex items-center gap-2 mt-0.5">
					<div className="flex">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`size-3 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
							/>
						))}
					</div>
					<span className="text-xs text-muted-foreground">{review.date}</span>
				</div>
			</div>
		</div>
		<p className="text-sm text-muted-foreground mt-3">{review.content}</p>
		<Button variant="ghost" size="sm" className="mt-3 gap-1 text-xs">
			<ThumbsUp className="size-3" />
			Helpful ({review.helpful})
		</Button>
	</div>
);

const ReviewsPanel = ({ reviews }: { reviews: Review[] }) => (
	<div className="space-y-4">
		<div className="flex items-center justify-between">
			<h3 className="font-bold">Customer Reviews</h3>
			<Button variant="outline" size="sm">
				Write Review
			</Button>
		</div>
		{reviews.map((review) => (
			<ReviewCard key={review.id} review={review} />
		))}
	</div>
);

export default function Main() {
	const wishlistItem: WishlistItem = {
		id: '1',
		name: 'Ergonomic Office Chair',
		price: 549.0,
		image:
			'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
		rating: 4.7,
		ratingBreakdown: [
			{ stars: 5, percent: 68 },
			{ stars: 4, percent: 20 },
			{ stars: 3, percent: 8 },
			{ stars: 2, percent: 3 },
			{ stars: 1, percent: 1 },
		],
		reviews: [
			{
				id: '1',
				author: 'Sarah M.',
				avatar: 'https://i.pravatar.cc/100?img=1',
				rating: 5,
				date: '2 days ago',
				content:
					"Best chair I've ever owned! The lumbar support is incredible and it's very comfortable for long work sessions.",
				helpful: 24,
				verified: true,
			},
			{
				id: '2',
				author: 'John D.',
				avatar: 'https://i.pravatar.cc/100?img=2',
				rating: 4,
				date: '1 week ago',
				content:
					'Great quality and build. Assembly was straightforward. Only wish it came in more colors.',
				helpful: 12,
				verified: true,
			},
			{
				id: '3',
				author: 'Emily R.',
				avatar: 'https://i.pravatar.cc/100?img=3',
				rating: 5,
				date: '2 weeks ago',
				content:
					'Worth every penny. My back pain has significantly reduced since switching to this chair.',
				helpful: 45,
				verified: false,
			},
		],
		href: '/product/1',
	};

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 py-6 @md:py-8">
				<h1 className="text-2xl font-bold mb-6">Product Reviews</h1>
				<div className="grid @md:grid-cols-5 gap-8">
					<div className="@md:col-span-2">
						<ProductPanel item={wishlistItem} />
					</div>
					<div className="@md:col-span-3">
						<ReviewsPanel reviews={wishlistItem.reviews} />
					</div>
				</div>
			</div>
		</section>
	);
}
