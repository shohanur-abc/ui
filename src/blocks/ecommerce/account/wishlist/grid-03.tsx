import Link from 'next/link';
import { Heart, ShoppingBag, Trash2, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	price: number;
	originalPrice?: number;
	image: string;
	addedAt: string;
	priceDropped: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const PageHeader = ({
	title,
	subtitle,
}: {
	title: string;
	subtitle: string;
}) => (
	<div className="text-center mb-8 @md:mb-12">
		<div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm text-primary mb-4">
			<Heart className="size-4 fill-current" />
			<span>Your Collection</span>
		</div>
		<h1 className="text-3xl @md:text-4xl font-bold tracking-tight">{title}</h1>
		<p className="text-muted-foreground mt-2 max-w-md mx-auto">{subtitle}</p>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<div className="group relative">
		<div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-90"
			/>
			{item.priceDropped && (
				<Badge className="absolute top-3 left-3 gap-1 bg-green-500 text-white">
					<TrendingUp className="size-3" />
					Price Drop
				</Badge>
			)}
			<Button
				size="icon-sm"
				variant="destructive"
				className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100 rounded-full"
			>
				<Trash2 className="size-4" />
			</Button>
			<div className="absolute inset-x-3 bottom-3 opacity-0 transition-all duration-300 group-hover:opacity-100">
				<Button className="w-full gap-2 shadow-lg">
					<ShoppingBag className="size-4" />
					Add to Bag
				</Button>
			</div>
		</div>
		<div className="mt-4">
			<p className="text-xs text-muted-foreground uppercase tracking-wider">
				{item.brand}
			</p>
			<Link href={item.href}>
				<h3 className="font-medium mt-1 line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-center gap-2">
				<span className="font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<>
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
						<Badge variant="destructive" className="text-xs">
							-{Math.round((1 - item.price / item.originalPrice) * 100)}%
						</Badge>
					</>
				)}
			</div>
			<div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
				<Clock className="size-3" />
				Added {item.addedAt}
			</div>
		</div>
	</div>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @lg:grid-cols-4 @2xl:grid-cols-5 gap-6 @md:gap-8">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Air Max Sneakers',
			brand: 'Nike',
			price: 159.99,
			originalPrice: 189.99,
			image:
				'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
			addedAt: '2 days ago',
			priceDropped: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Crossbody Leather Bag',
			brand: 'Coach',
			price: 295.0,
			image:
				'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
			addedAt: '1 week ago',
			priceDropped: false,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Cotton Hoodie',
			brand: 'Essentials',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
			addedAt: '3 days ago',
			priceDropped: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Chronograph Watch',
			brand: 'Fossil',
			price: 199.0,
			originalPrice: 275.0,
			image:
				'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop',
			addedAt: '5 days ago',
			priceDropped: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Aviator Sunglasses',
			brand: 'Ray-Ban',
			price: 165.0,
			image:
				'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
			addedAt: '2 weeks ago',
			priceDropped: false,
			href: '/product/5',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<PageHeader
					title="Saved Items"
					subtitle="Your curated collection of favorite pieces, ready when you are"
				/>
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
