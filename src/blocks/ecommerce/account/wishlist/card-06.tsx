import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Package,
	RefreshCw,
	Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductFeature {
	icon: 'package' | 'refresh' | 'shield';
	label: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	brand: string;
	features: ProductFeature[];
	href: string;
}

interface CardGridProps {
	items: WishlistItem[];
}

const FeatureIcon = ({ type }: { type: 'package' | 'refresh' | 'shield' }) => {
	const icons = { package: Package, refresh: RefreshCw, shield: Shield };
	const Icon = icons[type];
	return <Icon className="size-3" />;
};

const ProductFeatures = ({ features }: { features: ProductFeature[] }) => (
	<div className="flex flex-wrap gap-1.5 mt-3">
		{features.map((feature, i) => (
			<Badge key={i} variant="secondary" className="gap-1 text-[10px] py-0.5">
				<FeatureIcon type={feature.icon} />
				{feature.label}
			</Badge>
		))}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
		<CardHeader className="p-0">
			<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/30">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover transition-all duration-700 group-hover:scale-110"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/20" />
				<div className="absolute top-3 right-3">
					<Button
						size="icon-sm"
						variant="secondary"
						className="rounded-full bg-background/80 backdrop-blur-sm"
					>
						<X className="size-4" />
					</Button>
				</div>
				<div className="absolute top-3 left-3">
					<Heart className="size-5 fill-primary text-primary drop-shadow-md" />
				</div>
				{item.originalPrice && (
					<Badge className="absolute bottom-3 left-3" variant="destructive">
						Save ${(item.originalPrice - item.price).toFixed(0)}
					</Badge>
				)}
			</div>
		</CardHeader>
		<CardContent className="p-4">
			<p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
				{item.brand}
			</p>
			<Link href={item.href}>
				<h3 className="mt-1 font-semibold line-clamp-2 leading-snug group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<ProductFeatures features={item.features} />
			<div className="mt-4 flex items-center justify-between">
				<div className="flex items-baseline gap-2">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
			</div>
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

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Wireless Noise Cancelling Earbuds',
			price: 179.99,
			originalPrice: 249.99,
			image:
				'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop',
			brand: 'Sony',
			features: [
				{ icon: 'package', label: 'Free Shipping' },
				{ icon: 'refresh', label: '30-Day Returns' },
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Premium Leather Wallet',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
			brand: 'Bellroy',
			features: [
				{ icon: 'shield', label: '3-Year Warranty' },
				{ icon: 'package', label: 'Gift Box' },
			],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Mechanical Keyboard',
			price: 159.99,
			originalPrice: 199.99,
			image:
				'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&h=400&fit=crop',
			brand: 'Keychron',
			features: [
				{ icon: 'package', label: 'Free Shipping' },
				{ icon: 'shield', label: '1-Year Warranty' },
				{ icon: 'refresh', label: 'Easy Returns' },
			],
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Smart Home Hub',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1558089687-f282ffcbc126?w=400&h=400&fit=crop',
			brand: 'Google',
			features: [
				{ icon: 'package', label: 'Fast Delivery' },
				{ icon: 'shield', label: '2-Year Warranty' },
			],
			href: '/product/4',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center justify-between mb-6 @md:mb-8">
					<div>
						<h1 className="text-2xl @md:text-3xl font-bold">My Wishlist</h1>
						<p className="text-muted-foreground mt-1">
							{wishlistItems.length} items saved
						</p>
					</div>
					<Button variant="outline" className="gap-2">
						<ShoppingCart className="size-4" />
						Add All
					</Button>
				</div>
				<CardGrid items={wishlistItems} />
			</div>
		</section>
	);
}
