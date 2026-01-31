import Link from 'next/link';
import { Heart, ShoppingCart, X, MessageCircle, ThumbsUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Review {
	author: string;
	avatar: string;
	rating: number;
	text: string;
	helpful: number;
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

interface CardGridProps {
	items: WishlistItem[];
}

const StarRating = ({ rating }: { rating: number }) => (
	<div className="flex items-center gap-1">
		<div className="flex">
			{[...Array(5)].map((_, i) => (
				<span key={i} className={`text-sm ${i < rating ? 'text-amber-400' : 'text-muted'}`}>★</span>
			))}
		</div>
	</div>
);

const TopReview = ({ review }: { review: Review }) => (
	<div className="mt-3 p-3 rounded-lg bg-muted/50">
		<div className="flex items-center gap-2 mb-2">
			<Avatar className="size-6">
				<AvatarImage src={review.avatar} alt={review.author} />
				<AvatarFallback className="text-xs">{review.author[0]}</AvatarFallback>
			</Avatar>
			<span className="text-xs font-medium">{review.author}</span>
			<StarRating rating={review.rating} />
		</div>
		<p className="text-xs text-muted-foreground line-clamp-2">&ldquo;{review.text}&rdquo;</p>
		<div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
			<ThumbsUp className="size-3" />
			<span>{review.helpful} found helpful</span>
		</div>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full"
			>
				<X className="size-4" />
			</Button>
			<Heart className="absolute top-2 left-2 size-5 fill-primary text-primary" />
		</div>
		<CardContent className="flex-1 p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="flex items-center gap-2 mt-1">
				<StarRating rating={Math.round(item.rating)} />
				<span className="text-xs text-muted-foreground">({item.reviewCount} reviews)</span>
			</div>
			<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
			<TopReview review={item.topReview} />
		</CardContent>
		<Separator />
		<CardFooter className="p-4 flex gap-2">
			<Button className="flex-1 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
			<Button variant="outline" size="icon">
				<MessageCircle className="size-4" />
			</Button>
		</CardFooter>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Aromatherapy Diffuser', price: 49.99, image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop', rating: 4.8, reviewCount: 1234, topReview: { author: 'Sarah M.', avatar: 'https://i.pravatar.cc/100?img=1', rating: 5, text: 'Love this diffuser! It runs quietly and the mist output is perfect. Great addition to my home office.', helpful: 89 }, href: '/product/1' },
		{ id: '2', name: 'Himalayan Salt Lamp', price: 34.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop', rating: 4.6, reviewCount: 892, topReview: { author: 'Mike T.', avatar: 'https://i.pravatar.cc/100?img=2', rating: 5, text: 'Beautiful warm glow. Creates such a relaxing atmosphere in my bedroom. Highly recommend!', helpful: 56 }, href: '/product/2' },
		{ id: '3', name: 'Bamboo Plant Stand', price: 65.00, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop', rating: 4.7, reviewCount: 567, topReview: { author: 'Emily R.', avatar: 'https://i.pravatar.cc/100?img=3', rating: 4, text: 'Sturdy and well-made. Assembly was easy. Perfect for displaying my plant collection.', helpful: 34 }, href: '/product/3' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Wishlist</h1>
					<p className="text-muted-foreground mt-1">See what others are saying about your saved items</p>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
