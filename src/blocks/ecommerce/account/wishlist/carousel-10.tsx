import Link from 'next/link';
import { Heart, ShoppingCart, X, ChevronLeft, ChevronRight, Layers, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface BundleItem {
	name: string;
	price: number;
	image: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	bundleItems?: BundleItem[];
	bundleDiscount?: number;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const BundlePreview = ({ items, discount }: { items: BundleItem[]; discount: number }) => (
	<div className="mt-3 p-3 rounded-lg bg-muted/50 border border-dashed">
		<div className="flex items-center justify-between mb-2">
			<div className="flex items-center gap-1 text-sm font-medium">
				<Package className="size-4 text-primary" />
				Bundle Deal
			</div>
			<Badge variant="secondary" className="bg-green-100 text-green-700">Save {discount}%</Badge>
		</div>
		<div className="flex gap-2">
			{items.slice(0, 3).map((item, i) => (
				<div key={i} className="relative">
					<div className="size-12 rounded overflow-hidden bg-muted">
						<img src={item.image} alt={item.name} className="size-full object-cover" />
					</div>
					{i < items.length - 1 && (
						<span className="absolute -right-1.5 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">+</span>
					)}
				</div>
			))}
		</div>
		<p className="text-xs text-muted-foreground mt-2">
			{items.map((item) => item.name).join(' + ')}
		</p>
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => {
	const hasBundle = item.bundleItems && item.bundleItems.length > 0;
	const bundleTotal = hasBundle
		? item.bundleItems!.reduce((sum, b) => sum + b.price, 0) + item.price
		: item.price;
	const bundleSavings = hasBundle
		? bundleTotal * (item.bundleDiscount! / 100)
		: 0;

	return (
		<div className="flex-shrink-0 w-72 @sm:w-80 @md:w-96">
			<Card className={`overflow-hidden group h-full ${hasBundle ? 'ring-2 ring-primary/30' : ''}`}>
				<div className="relative aspect-[4/3] bg-muted">
					<img src={item.image} alt={item.name} className="size-full object-cover" />
					<Button variant="ghost" size="icon-sm" className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm">
						<Heart className="size-4 fill-primary text-primary" />
					</Button>
					{hasBundle && (
						<Badge className="absolute top-3 left-3 gap-1 bg-primary text-primary-foreground">
							<Layers className="size-3" />
							Bundle Available
						</Badge>
					)}
				</div>
				<div className="p-4">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">{item.name}</h3>
					</Link>
					<span className="text-lg font-bold mt-1 block">${item.price.toFixed(2)}</span>
					{hasBundle && (
						<BundlePreview items={item.bundleItems!} discount={item.bundleDiscount!} />
					)}
					<div className="flex flex-col gap-2 mt-4">
						<Button size="sm" className="w-full gap-1">
							<ShoppingCart className="size-4" />
							Add to Cart
						</Button>
						{hasBundle && (
							<Button variant="secondary" size="sm" className="w-full gap-1">
								<Package className="size-4" />
								Add Bundle (Save ${bundleSavings.toFixed(2)})
							</Button>
						)}
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
		<Button variant="outline" size="icon" className="absolute left-0 top-1/3 -translate-x-1/2 hidden @lg:flex bg-background shadow-lg">
			<ChevronLeft className="size-5" />
		</Button>
		<Button variant="outline" size="icon" className="absolute right-0 top-1/3 translate-x-1/2 hidden @lg:flex bg-background shadow-lg">
			<ChevronRight className="size-5" />
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'DSLR Camera Body',
			price: 1299.00,
			image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop',
			bundleItems: [
				{ name: '50mm Lens', price: 449.00, image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?w=100&h=100&fit=crop' },
				{ name: 'Camera Bag', price: 89.00, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop' },
			],
			bundleDiscount: 15,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Gaming Console',
			price: 499.00,
			image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=300&fit=crop',
			bundleItems: [
				{ name: 'Extra Controller', price: 69.00, image: 'https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=100&h=100&fit=crop' },
				{ name: 'Game Pass', price: 59.00, image: 'https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=100&h=100&fit=crop' },
			],
			bundleDiscount: 10,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Laptop Pro 16"',
			price: 2399.00,
			image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Drawing Tablet',
			price: 349.00,
			image: 'https://images.unsplash.com/photo-1631281956016-3cdc1b2fe5fb?w=400&h=300&fit=crop',
			bundleItems: [
				{ name: 'Stylus Set', price: 49.00, image: 'https://images.unsplash.com/photo-1588440218037-e090c68e65e8?w=100&h=100&fit=crop' },
			],
			bundleDiscount: 12,
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-3 mb-6">
					<Layers className="size-7 text-primary" />
					<h1 className="text-2xl @md:text-3xl font-bold">Bundle Deals</h1>
				</div>
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
