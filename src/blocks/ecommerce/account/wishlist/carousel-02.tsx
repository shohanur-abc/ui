import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	ChevronLeft,
	ChevronRight,
	Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	images: string[];
	category: string;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const ImageGallery = ({ images, name }: { images: string[]; name: string }) => (
	<div className="relative aspect-[4/3] bg-muted overflow-hidden">
		<div className="flex size-full">
			<div className="w-2/3 h-full">
				<img src={images[0]} alt={name} className="size-full object-cover" />
			</div>
			<div className="w-1/3 h-full flex flex-col">
				{images.slice(1, 3).map((img, i) => (
					<div
						key={i}
						className="h-1/2 border-l border-b border-background last:border-b-0"
					>
						<img
							src={img}
							alt={`${name} ${i + 2}`}
							className="size-full object-cover"
						/>
					</div>
				))}
			</div>
		</div>
		{images.length > 3 && (
			<Badge className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm">
				+{images.length - 3} more
			</Badge>
		)}
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-72 @sm:w-80 @md:w-96">
		<Card className="overflow-hidden group h-full">
			<div className="relative">
				<ImageGallery images={item.images} name={item.name} />
				<Button
					variant="ghost"
					size="icon-sm"
					className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm"
				>
					<Heart className="size-4 fill-primary text-primary" />
				</Button>
				<Badge className="absolute top-3 left-3 bg-background/90 text-foreground">
					{item.category}
				</Badge>
			</div>
			<div className="p-4">
				<Link href={item.href}>
					<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
						{item.name}
					</h3>
				</Link>
				<span className="text-lg font-bold mt-2 block">
					${item.price.toFixed(2)}
				</span>
				<div className="flex items-center gap-2 mt-3">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
					<Link href={item.href}>
						<Button variant="outline" size="icon-sm">
							<Eye className="size-4" />
						</Button>
					</Link>
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
		<div className="flex justify-center gap-2 mt-4">
			<Button variant="outline" size="icon">
				<ChevronLeft className="size-5" />
			</Button>
			<Button variant="outline" size="icon">
				<ChevronRight className="size-5" />
			</Button>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Modern Living Room Set',
			price: 1299.0,
			images: [
				'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=200&h=200&fit=crop',
			],
			category: 'Furniture',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Bedroom Collection',
			price: 899.0,
			images: [
				'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1536990073671-b4e1f7afbb9f?w=200&h=200&fit=crop',
			],
			category: 'Bedroom',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Outdoor Patio Set',
			price: 749.0,
			images: [
				'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&h=200&fit=crop',
			],
			category: 'Outdoor',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Home Office Bundle',
			price: 599.0,
			images: [
				'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400&h=400&fit=crop',
				'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=200&h=200&fit=crop',
				'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=200&h=200&fit=crop',
			],
			category: 'Office',
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Gallery Wishlist
				</h1>
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
