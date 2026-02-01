import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Star,
	Quote,
	ChevronLeft,
	ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Review {
	author: string;
	avatar: string;
	rating: number;
	text: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	reviewCount: number;
	topReview: Review;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const RatingDisplay = ({
	rating,
	count,
}: {
	rating: number;
	count: number;
}) => (
	<div className="flex items-center gap-2">
		<div className="flex">
			{[1, 2, 3, 4, 5].map((star) => (
				<Star
					key={star}
					className={`size-3.5 ${star <= rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
				/>
			))}
		</div>
		<span className="text-sm text-muted-foreground">({count})</span>
	</div>
);

const TopReview = ({ review }: { review: Review }) => (
	<div className="mt-3 p-3 rounded-lg bg-muted/50">
		<div className="flex items-start gap-2">
			<Quote className="size-4 text-muted-foreground flex-shrink-0 mt-0.5" />
			<div className="flex-1 min-w-0">
				<p className="text-xs text-muted-foreground line-clamp-2">
					{review.text}
				</p>
				<div className="flex items-center gap-2 mt-2">
					<Avatar className="size-5">
						<AvatarImage src={review.avatar} alt={review.author} />
						<AvatarFallback className="text-[8px]">
							{review.author[0]}
						</AvatarFallback>
					</Avatar>
					<span className="text-xs font-medium">{review.author}</span>
					<div className="flex">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`size-2.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-72 @sm:w-80 @md:w-96">
		<Card className="overflow-hidden group h-full">
			<div className="relative aspect-[4/3] bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<Button
					variant="ghost"
					size="icon-sm"
					className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
				>
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<Badge className="absolute bottom-3 left-3 bg-background/90 text-foreground gap-1">
					<Star className="size-3 fill-amber-400 text-amber-400" />
					{item.rating.toFixed(1)}
				</Badge>
			</div>
			<div className="p-4">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1 min-w-0">
						<Link href={item.href}>
							<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
								{item.name}
							</h3>
						</Link>
						<RatingDisplay rating={item.rating} count={item.reviewCount} />
					</div>
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				</div>
				<TopReview review={item.topReview} />
				<div className="flex items-center gap-2 mt-4">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
					<Button
						variant="ghost"
						size="icon-sm"
						className="text-destructive hover:text-destructive"
					>
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
		<Button
			variant="outline"
			size="icon"
			className="absolute left-0 top-1/3 -translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronLeft className="size-5" />
		</Button>
		<Button
			variant="outline"
			size="icon"
			className="absolute right-0 top-1/3 translate-x-1/2 hidden @md:flex bg-background shadow-lg"
		>
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Premium Yoga Mat',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop',
			rating: 4.9,
			reviewCount: 1247,
			topReview: {
				author: 'Sarah M.',
				avatar: 'https://i.pravatar.cc/100?img=1',
				rating: 5,
				text: "Best yoga mat I've ever owned. Perfect grip and cushioning for all my practices.",
			},
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Resistance Bands Set',
			price: 34.0,
			image:
				'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop',
			rating: 4.7,
			reviewCount: 892,
			topReview: {
				author: 'Mike T.',
				avatar: 'https://i.pravatar.cc/100?img=2',
				rating: 5,
				text: 'Great variety of resistance levels. Quality is excellent for the price.',
			},
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Foam Roller',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=400&h=300&fit=crop',
			rating: 4.8,
			reviewCount: 654,
			topReview: {
				author: 'Lisa K.',
				avatar: 'https://i.pravatar.cc/100?img=3',
				rating: 5,
				text: 'Perfect for post-workout recovery. Firm but not too hard.',
			},
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Adjustable Dumbbells',
			price: 299.0,
			image:
				'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop',
			rating: 4.6,
			reviewCount: 423,
			topReview: {
				author: 'John D.',
				avatar: 'https://i.pravatar.cc/100?img=4',
				rating: 4,
				text: 'Space-saving design. Easy to adjust between sets.',
			},
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Top Rated Wishlist
				</h1>
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
