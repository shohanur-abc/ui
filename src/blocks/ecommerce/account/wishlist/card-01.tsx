import Link from 'next/link';
import { Heart, ShoppingCart, Trash2, Star, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WishlistItem {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	image: string;
	rating: number;
	reviews: number;
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const RatingDisplay = ({
	rating,
	reviews,
}: {
	rating: number;
	reviews: number;
}) => (
	<div className="flex items-center gap-1">
		<div className="flex">
			{[...Array(5)].map((_, i) => (
				<Star
					key={i}
					className={`size-3 ${i < Math.floor(rating) ? 'fill-amber-400 text-amber-400' : 'text-muted'}`}
				/>
			))}
		</div>
		<span className="text-xs text-muted-foreground">({reviews})</span>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl">
		<CardHeader className="p-0">
			<div className="relative aspect-[4/3] overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-all duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
				<div className="absolute top-3 right-3 flex gap-2">
					<Button
						size="icon-sm"
						variant="secondary"
						className="rounded-full shadow-lg backdrop-blur-sm bg-background/70"
					>
						<Eye className="size-4" />
					</Button>
					<Button
						size="icon-sm"
						variant="secondary"
						className="rounded-full shadow-lg backdrop-blur-sm bg-background/70 text-destructive"
					>
						<Trash2 className="size-4" />
					</Button>
				</div>
				<div className="absolute bottom-3 left-3">
					<Heart className="size-5 fill-primary text-primary" />
				</div>
				{item.originalPrice && (
					<Badge className="absolute bottom-3 right-3" variant="destructive">
						{Math.round((1 - item.price / item.originalPrice) * 100)}% OFF
					</Badge>
				)}
			</div>
		</CardHeader>
		<CardContent className="flex-1 p-4">
			<RatingDisplay rating={item.rating} reviews={item.reviews} />
			<Link href={item.href}>
				<h3 className="mt-2 font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="mt-1 text-sm text-muted-foreground line-clamp-2">
				{item.description}
			</p>
		</CardContent>
		<CardFooter className="p-4 pt-0 flex items-center justify-between">
			<div className="flex items-baseline gap-2">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			<Button size="sm" className="gap-1.5">
				<ShoppingCart className="size-4" />
				Add
			</Button>
		</CardFooter>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Gaming Mouse',
			description:
				'High precision optical sensor with customizable RGB lighting',
			price: 79.99,
			originalPrice: 99.99,
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop',
			rating: 4.7,
			reviews: 1234,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Mechanical Keyboard',
			description: 'Cherry MX switches with per-key RGB backlighting',
			price: 149.99,
			image:
				'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=300&fit=crop',
			rating: 4.9,
			reviews: 2341,
			href: '/product/2',
		},
		{
			id: '3',
			name: '4K Gaming Monitor',
			description: '27-inch IPS panel with 144Hz refresh rate and HDR support',
			price: 449.99,
			originalPrice: 549.99,
			image:
				'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop',
			rating: 4.6,
			reviews: 892,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Gaming Headset',
			description: 'Surround sound with noise-cancelling microphone',
			price: 129.99,
			image:
				'https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=300&fit=crop',
			rating: 4.5,
			reviews: 1567,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6 @md:mb-8">
					<h1 className="text-2xl @md:text-3xl font-bold">Saved Items</h1>
					<p className="text-muted-foreground mt-1">Your curated collection</p>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
