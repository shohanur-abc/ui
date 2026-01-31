import Link from 'next/link';
import { Heart, ShoppingCart, X, Tag, Percent, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

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

interface CardGridProps {
	items: WishlistItem[];
}

const CouponBanner = ({ coupon }: { coupon: Coupon }) => (
	<div className="mt-3 p-2 rounded-lg bg-green-500/10 border border-green-500/30 border-dashed">
		<div className="flex items-center justify-between">
			<div className="flex items-center gap-2">
				<Tag className="size-4 text-green-600" />
				<span className="text-xs font-mono font-bold text-green-700">{coupon.code}</span>
			</div>
			<Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
				{coupon.discount}
			</Badge>
		</div>
		<div className="flex items-center gap-1 mt-1 text-[10px] text-green-600">
			<Clock className="size-2.5" />
			Expires in {coupon.expiresIn}
		</div>
	</div>
);

const PriceDisplay = ({ price, originalPrice, hasCoupon }: { price: number; originalPrice?: number; hasCoupon: boolean }) => (
	<div className="mt-2">
		<div className="flex items-baseline gap-2">
			<span className={`text-xl font-bold ${hasCoupon ? 'text-green-600' : ''}`}>
				${price.toFixed(2)}
			</span>
			{originalPrice && (
				<span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
			)}
		</div>
		{hasCoupon && (
			<p className="text-xs text-green-600 font-medium mt-0.5">Extra savings with coupon!</p>
		)}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
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
			{item.coupon && (
				<Badge className="absolute bottom-2 left-2 gap-1" variant="secondary">
					<Percent className="size-3" />
					Coupon Available
				</Badge>
			)}
			{item.originalPrice && (
				<Badge className="absolute bottom-2 right-2" variant="destructive">
					-{Math.round((1 - item.price / item.originalPrice) * 100)}%
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<PriceDisplay price={item.price} originalPrice={item.originalPrice} hasCoupon={!!item.coupon} />
			{item.coupon && <CouponBanner coupon={item.coupon} />}
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const CardGrid = ({ items }: CardGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const CouponAlert = ({ count }: { count: number }) => (
	<div className="flex items-center gap-3 mb-6 @md:mb-8 p-4 rounded-lg bg-green-500/10 border border-green-500/20">
		<div className="size-10 rounded-full bg-green-500 flex items-center justify-center">
			<Tag className="size-5 text-white" />
		</div>
		<div>
			<p className="font-medium text-green-700">{count} items have coupons!</p>
			<p className="text-sm text-green-600">Apply codes at checkout for extra savings</p>
		</div>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Running Shoes', price: 129.00, originalPrice: 159.00, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop', coupon: { code: 'SPORT20', discount: '20% OFF', expiresIn: '2 days' }, href: '/product/1' },
		{ id: '2', name: 'Yoga Mat Premium', price: 59.00, image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop', coupon: { code: 'FITNESS15', discount: '$15 OFF', expiresIn: '5 days' }, href: '/product/2' },
		{ id: '3', name: 'Resistance Bands Set', price: 29.00, originalPrice: 39.00, image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=400&fit=crop', href: '/product/3' },
		{ id: '4', name: 'Sports Water Bottle', price: 24.00, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop', coupon: { code: 'HYDRATE10', discount: '10% OFF', expiresIn: '1 day' }, href: '/product/4' },
	];

	const couponCount = wishlistItems.filter((item) => item.coupon).length;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">My Wishlist</h1>
				<CouponAlert count={couponCount} />
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
