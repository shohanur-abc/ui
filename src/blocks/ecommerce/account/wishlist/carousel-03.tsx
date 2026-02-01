import Link from 'next/link';
import { Heart, ShoppingCart, X, Circle, Star, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	brand: string;
	isHot: boolean;
	rating: number;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const FeaturedItem = ({ item }: { item: WishlistItem }) => (
	<Card className="overflow-hidden">
		<div className="flex flex-col @md:flex-row">
			<div className="relative @md:w-1/2 aspect-square @md:aspect-auto">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<Button
					variant="ghost"
					size="icon"
					className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm size-10"
				>
					<Heart className="size-5 fill-primary text-primary" />
				</Button>
				{item.isHot && (
					<Badge className="absolute top-4 left-4 gap-1 bg-orange-500 text-white">
						<Flame className="size-3" />
						Hot
					</Badge>
				)}
			</div>
			<div className="p-6 @md:w-1/2 @md:p-8 flex flex-col justify-center">
				<Badge variant="outline" className="w-fit mb-3">
					{item.brand}
				</Badge>
				<Link href={item.href}>
					<h2 className="text-2xl @md:text-3xl font-bold hover:text-primary transition-colors">
						{item.name}
					</h2>
				</Link>
				<div className="flex items-center gap-2 mt-3">
					<div className="flex">
						{[1, 2, 3, 4, 5].map((star) => (
							<Star
								key={star}
								className={`size-4 ${star <= item.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`}
							/>
						))}
					</div>
					<span className="text-sm text-muted-foreground">
						({item.rating}.0)
					</span>
				</div>
				<div className="flex items-center gap-3 mt-4">
					<span className="text-3xl font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-xl text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
				<div className="flex items-center gap-3 mt-6">
					<Button size="lg" className="gap-2">
						<ShoppingCart className="size-5" />
						Add to Cart
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="text-destructive hover:text-destructive"
					>
						<X className="size-5" />
						Remove
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const ThumbnailItem = ({
	item,
	isActive,
	onClick,
}: {
	item: WishlistItem;
	isActive: boolean;
	onClick: () => void;
}) => (
	<button
		onClick={onClick}
		className={`flex-shrink-0 w-20 h-20 @md:w-24 @md:h-24 rounded-lg overflow-hidden border-2 transition-all ${isActive ? 'border-primary ring-2 ring-primary/20' : 'border-transparent hover:border-primary/50'}`}
	>
		<img src={item.image} alt={item.name} className="size-full object-cover" />
	</button>
);

const CarouselDots = ({
	items,
	activeIndex,
}: {
	items: WishlistItem[];
	activeIndex: number;
}) => (
	<div className="flex justify-center gap-2 mt-6">
		{items.map((_, i) => (
			<Circle
				key={i}
				className={`size-2.5 cursor-pointer transition-all ${i === activeIndex ? 'fill-primary text-primary scale-125' : 'text-muted-foreground hover:text-primary'}`}
			/>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Cashmere Wool Overcoat',
			price: 495.0,
			originalPrice: 695.0,
			image:
				'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=600&h=600&fit=crop',
			brand: 'Luxe Collection',
			isHot: true,
			rating: 5,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Italian Leather Boots',
			price: 375.0,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop',
			brand: 'Artisan Footwear',
			isHot: false,
			rating: 4,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Silk Evening Dress',
			price: 289.0,
			originalPrice: 389.0,
			image:
				'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
			brand: 'Elegance',
			isHot: true,
			rating: 5,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Designer Handbag',
			price: 599.0,
			image:
				'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop',
			brand: 'Maison Mode',
			isHot: false,
			rating: 5,
			href: '/product/4',
		},
	];

	const activeIndex = 0;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-5xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Featured Wishlist
				</h1>
				<FeaturedItem item={wishlistItems[activeIndex]} />
				<div className="mt-6">
					<div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide justify-center">
						{wishlistItems.map((item, i) => (
							<ThumbnailItem
								key={item.id}
								item={item}
								isActive={i === activeIndex}
								onClick={() => {}}
							/>
						))}
					</div>
				</div>
				<CarouselDots items={wishlistItems} activeIndex={activeIndex} />
			</div>
		</section>
	);
}
