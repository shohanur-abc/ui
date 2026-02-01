import Link from 'next/link';
import { Heart, ShoppingCart, X, Sparkles, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	price: number;
	originalPrice?: number;
	image: string;
	isNew: boolean;
	isTrending: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const GlowDecorative = () => (
	<div className="absolute -top-1/2 left-1/2 -translate-x-1/2 size-96 bg-primary/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
);

const PageTitle = ({ title, count }: { title: string; count: number }) => (
	<div className="relative text-center mb-10 @md:mb-14">
		<GlowDecorative />
		<Badge variant="outline" className="mb-4 gap-1">
			<Heart className="size-3 fill-primary text-primary" />
			{count} saved
		</Badge>
		<h1 className="text-3xl @md:text-4xl @xl:text-5xl font-bold tracking-tight">
			{title}
		</h1>
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<div className="group relative">
		<div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-muted/50">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-all duration-700 group-hover:scale-110"
			/>
			<div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

			{/* Status badges */}
			<div className="absolute top-3 left-3 flex flex-col gap-2">
				{item.isNew && (
					<Badge className="gap-1 bg-blue-500 text-white">
						<Sparkles className="size-3" />
						New
					</Badge>
				)}
				{item.isTrending && (
					<Badge className="gap-1 bg-orange-500 text-white">
						<Flame className="size-3" />
						Hot
					</Badge>
				)}
			</div>

			{/* Remove button */}
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-3 right-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>

			{/* Quick action */}
			<div className="absolute inset-x-4 bottom-4 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
				<Button className="w-full gap-2 shadow-xl">
					<ShoppingCart className="size-4" />
					Quick Add
				</Button>
			</div>
		</div>

		<div className="mt-4 px-1">
			<p className="text-xs font-medium text-primary uppercase tracking-wider">
				{item.brand}
			</p>
			<Link href={item.href}>
				<h3 className="mt-1 font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
		</div>
	</div>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-2 @md:grid-cols-3 @xl:grid-cols-4 gap-6 @lg:gap-8">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Structured Blazer',
			brand: 'Zara',
			price: 149.0,
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=533&fit=crop',
			isNew: true,
			isTrending: false,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Pleated Midi Skirt',
			brand: 'H&M',
			price: 59.99,
			originalPrice: 79.99,
			image:
				'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=400&h=533&fit=crop',
			isNew: false,
			isTrending: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Ribbed Knit Top',
			brand: 'Mango',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=533&fit=crop',
			isNew: false,
			isTrending: false,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Wide Leg Trousers',
			brand: 'COS',
			price: 125.0,
			image:
				'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=533&fit=crop',
			isNew: true,
			isTrending: true,
			href: '/product/4',
		},
		{
			id: '5',
			name: 'Oversized Shirt',
			brand: 'Arket',
			price: 89.0,
			image:
				'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=533&fit=crop',
			isNew: false,
			isTrending: false,
			href: '/product/5',
		},
		{
			id: '6',
			name: 'Leather Ankle Boots',
			brand: 'Massimo Dutti',
			price: 199.0,
			originalPrice: 259.0,
			image:
				'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=533&fit=crop',
			isNew: false,
			isTrending: true,
			href: '/product/6',
		},
	];

	return (
		<section
			className="@container relative overflow-hidden"
			data-theme="wishlist"
		>
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-10 @md:py-16 @xl:py-20">
				<PageTitle title="Your Favorites" count={wishlistItems.length} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
