import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	ChevronLeft,
	ChevronRight,
	Tag,
	Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

interface Coupon {
	code: string;
	discount: string;
	expiresIn: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	coupon?: Coupon;
	href: string;
}

interface CarouselProps {
	items: WishlistItem[];
}

const CouponBadge = ({ coupon }: { coupon: Coupon }) => (
	<div className="mt-3 p-2 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Tag className="size-4 text-primary" />
				<span className="font-mono font-bold text-primary">{coupon.code}</span>
			</div>
			<Badge variant="secondary" className="text-xs">
				{coupon.discount}
			</Badge>
		</div>
		<div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
			<Calendar className="size-3" />
			<span>Expires {coupon.expiresIn}</span>
		</div>
	</div>
);

const CarouselItem = ({ item }: { item: WishlistItem }) => (
	<div className="flex-shrink-0 w-64 @sm:w-72 @md:w-80">
		<Card
			className={`overflow-hidden group h-full ${item.coupon ? 'ring-2 ring-primary/30' : ''}`}
		>
			<div className="relative aspect-square bg-muted">
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
				{item.coupon && (
					<Badge className="absolute top-3 left-3 gap-1 bg-primary text-primary-foreground">
						<Tag className="size-3" />
						Coupon Available
					</Badge>
				)}
			</div>
			<div className="p-4">
				<Link href={item.href}>
					<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
						{item.name}
					</h3>
				</Link>
				<div className="flex items-center gap-2 mt-2">
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
				{item.coupon && <CouponBadge coupon={item.coupon} />}
				<div className="flex items-center gap-2 mt-4">
					<Button size="sm" className="flex-1 gap-1">
						<ShoppingCart className="size-4" />
						{item.coupon ? 'Apply & Add' : 'Add to Cart'}
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

const CouponsHeader = () => (
	<div className="flex items-center justify-between mb-6 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
		<div className="flex items-center gap-3">
			<div className="size-10 rounded-full bg-primary/20 flex items-center justify-center">
				<Tag className="size-5 text-primary" />
			</div>
			<div>
				<h1 className="text-xl @md:text-2xl font-bold">Coupons Available</h1>
				<p className="text-sm text-muted-foreground">
					Special offers for your saved items
				</p>
			</div>
		</div>
		<Badge variant="default" className="text-lg px-3 py-1">
			3 Active
		</Badge>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Noise-Canceling Headphones',
			price: 249.0,
			originalPrice: 349.0,
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
			coupon: { code: 'AUDIO20', discount: '20% OFF', expiresIn: '2 days' },
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Smart Watch Pro',
			price: 399.0,
			image:
				'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=400&fit=crop',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Leather Messenger Bag',
			price: 189.0,
			originalPrice: 229.0,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
			coupon: { code: 'STYLE15', discount: '$15 OFF', expiresIn: '5 days' },
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Running Shoes',
			price: 145.0,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Portable Bluetooth Speaker',
			price: 79.0,
			originalPrice: 99.0,
			image:
				'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
			coupon: { code: 'SOUND10', discount: '10% OFF', expiresIn: '1 week' },
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-6xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<CouponsHeader />
				<CarouselSlider items={wishlistItems} />
			</div>
		</section>
	);
}
