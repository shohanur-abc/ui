import Link from 'next/link';
import { Heart, ShoppingCart, X, Check, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface WishlistItem {
	id: string;
	name: string;
	description: string;
	price: number;
	originalPrice?: number;
	image: string;
	sellerName: string;
	sellerAvatar: string;
	isVerified: boolean;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const HeaderSection = ({ title, subtitle }: { title: string; subtitle: string }) => (
	<div className="mb-8 @md:mb-10">
		<div className="flex items-center gap-3 mb-2">
			<div className="p-2 rounded-lg bg-primary/10">
				<Bookmark className="size-5 text-primary" />
			</div>
			<h1 className="text-2xl @md:text-3xl font-bold">{title}</h1>
		</div>
		<p className="text-muted-foreground">{subtitle}</p>
	</div>
);

const SellerInfo = ({
	name,
	avatar,
	isVerified,
}: {
	name: string;
	avatar: string;
	isVerified: boolean;
}) => (
	<div className="flex items-center gap-2">
		<Avatar className="size-6">
			<AvatarImage src={avatar} alt={name} />
			<AvatarFallback className="text-xs">{name[0]}</AvatarFallback>
		</Avatar>
		<span className="text-sm text-muted-foreground">{name}</span>
		{isVerified && (
			<div className="flex size-4 items-center justify-center rounded-full bg-blue-500">
				<Check className="size-2.5 text-white" />
			</div>
		)}
	</div>
);

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1">
		<div className="relative aspect-square overflow-hidden bg-gradient-to-br from-muted to-muted/50">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-700 group-hover:scale-110"
			/>
			<div className="absolute top-3 right-3">
				<Button
					size="icon-sm"
					variant="secondary"
					className="rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
				>
					<X className="size-4" />
				</Button>
			</div>
			{item.originalPrice && (
				<div className="absolute top-3 left-3">
					<Badge variant="destructive">
						{Math.round((1 - item.price / item.originalPrice) * 100)}% Off
					</Badge>
				</div>
			)}
		</div>
		<CardContent className="p-4">
			<SellerInfo name={item.sellerName} avatar={item.sellerAvatar} isVerified={item.isVerified} />
			<Link href={item.href}>
				<h3 className="mt-2 font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="mt-1 text-sm text-muted-foreground line-clamp-2">{item.description}</p>
			<div className="mt-3 flex items-center justify-between">
				<div className="flex items-baseline gap-2">
					<span className="text-lg font-bold">${item.price.toFixed(2)}</span>
					{item.originalPrice && (
						<span className="text-sm text-muted-foreground line-through">
							${item.originalPrice.toFixed(2)}
						</span>
					)}
				</div>
				<Button size="icon-sm" className="rounded-full">
					<ShoppingCart className="size-4" />
				</Button>
			</div>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{ id: '1', name: 'Handcrafted Ceramic Vase', description: 'Beautiful handmade ceramic vase with unique glazing pattern', price: 89.00, originalPrice: 129.00, image: 'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=400&h=400&fit=crop', sellerName: 'Artisan Studio', sellerAvatar: 'https://i.pravatar.cc/100?img=1', isVerified: true, href: '/product/1' },
		{ id: '2', name: 'Organic Cotton Throw Blanket', description: 'Soft and cozy throw made from 100% organic cotton', price: 75.00, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop', sellerName: 'Eco Home', sellerAvatar: 'https://i.pravatar.cc/100?img=2', isVerified: true, href: '/product/2' },
		{ id: '3', name: 'Vintage Brass Table Lamp', description: 'Mid-century modern brass lamp with fabric shade', price: 145.00, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', sellerName: 'Retro Finds', sellerAvatar: 'https://i.pravatar.cc/100?img=3', isVerified: false, href: '/product/3' },
		{ id: '4', name: 'Minimalist Wall Clock', description: 'Clean design wall clock with silent movement', price: 65.00, originalPrice: 85.00, image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop', sellerName: 'Modern Living', sellerAvatar: 'https://i.pravatar.cc/100?img=4', isVerified: true, href: '/product/4' },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<HeaderSection title="My Wishlist" subtitle="Products you've saved from various sellers" />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
