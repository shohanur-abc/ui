import Link from 'next/link';
import { Heart, ShoppingCart, X, Leaf, Recycle, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Certification {
	name: string;
	icon: 'leaf' | 'recycle' | 'award';
}

interface WishlistItem {
	id: string;
	name: string;
	brand: string;
	price: number;
	image: string;
	sustainabilityScore: number;
	certifications: Certification[];
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const CertificationIcon = ({
	type,
}: {
	type: 'leaf' | 'recycle' | 'award';
}) => {
	const icons = {
		leaf: Leaf,
		recycle: Recycle,
		award: Award,
	};
	const Icon = icons[type];
	return <Icon className="size-3" />;
};

const SustainabilityMeter = ({ score }: { score: number }) => {
	const getColor = (s: number) => {
		if (s >= 80) return 'bg-green-500';
		if (s >= 60) return 'bg-lime-500';
		if (s >= 40) return 'bg-yellow-500';
		return 'bg-orange-500';
	};

	return (
		<div className="mt-3">
			<div className="flex items-center justify-between text-xs mb-1">
				<span className="text-muted-foreground flex items-center gap-1">
					<Leaf className="size-3" />
					Sustainability Score
				</span>
				<span className="font-medium">{score}/100</span>
			</div>
			<div className="h-1.5 rounded-full bg-muted overflow-hidden">
				<div
					className={`h-full rounded-full ${getColor(score)} transition-all`}
					style={{ width: `${score}%` }}
				/>
			</div>
		</div>
	);
};

const CertificationBadges = ({
	certifications,
}: {
	certifications: Certification[];
}) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{certifications.map((cert, i) => (
			<Badge key={i} variant="outline" className="gap-1 text-[10px] py-0 h-5">
				<CertificationIcon type={cert.icon} />
				{cert.name}
			</Badge>
		))}
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
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<X className="size-4" />
			</Button>
			{item.sustainabilityScore >= 80 && (
				<Badge className="absolute top-2 left-2 gap-1 bg-green-600 text-white">
					<Leaf className="size-3" />
					Eco Choice
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<p className="text-xs text-muted-foreground uppercase tracking-wider">
				{item.brand}
			</p>
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<p className="text-lg font-bold mt-1">${item.price.toFixed(2)}</p>
			<SustainabilityMeter score={item.sustainabilityScore} />
			<CertificationBadges certifications={item.certifications} />
			<Button className="w-full mt-4 gap-2">
				<ShoppingCart className="size-4" />
				Add to Cart
			</Button>
		</CardContent>
	</Card>
);

const WishlistGrid = ({ items }: WishlistGridProps) => (
	<div className="grid grid-cols-1 @sm:grid-cols-2 @lg:grid-cols-3 @xl:grid-cols-4 gap-6">
		{items.map((item) => (
			<ProductCard key={item.id} item={item} />
		))}
	</div>
);

const EcoHeader = ({ ecoScore }: { ecoScore: number }) => (
	<div className="flex flex-wrap items-center justify-between gap-4 mb-6 @md:mb-8 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
		<div className="flex items-center gap-3">
			<div className="size-12 rounded-full bg-green-500/20 flex items-center justify-center">
				<Leaf className="size-6 text-green-600" />
			</div>
			<div>
				<h2 className="font-semibold">Your Eco Impact</h2>
				<p className="text-sm text-muted-foreground">
					Average sustainability score: {ecoScore}/100
				</p>
			</div>
		</div>
		<Button
			variant="outline"
			className="gap-2 border-green-500/30 text-green-700 hover:bg-green-500/10"
		>
			<Leaf className="size-4" />
			Shop Sustainable
		</Button>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Organic Cotton Tee',
			brand: 'EcoWear',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
			sustainabilityScore: 92,
			certifications: [
				{ name: 'GOTS', icon: 'leaf' },
				{ name: 'Fair Trade', icon: 'award' },
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Recycled Denim Jacket',
			brand: 'ReThread',
			price: 129.0,
			image:
				'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
			sustainabilityScore: 85,
			certifications: [
				{ name: 'Recycled', icon: 'recycle' },
				{ name: 'B Corp', icon: 'award' },
			],
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Bamboo Sneakers',
			brand: 'GreenStep',
			price: 98.0,
			image:
				'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=400&fit=crop',
			sustainabilityScore: 78,
			certifications: [{ name: 'Carbon Neutral', icon: 'leaf' }],
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Hemp Canvas Bag',
			brand: 'NatureCraft',
			price: 65.0,
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
			sustainabilityScore: 95,
			certifications: [
				{ name: 'Organic', icon: 'leaf' },
				{ name: 'Handmade', icon: 'award' },
				{ name: 'Zero Waste', icon: 'recycle' },
			],
			href: '/product/4',
		},
	];

	const avgScore = Math.round(
		wishlistItems.reduce((sum, item) => sum + item.sustainabilityScore, 0) /
			wishlistItems.length,
	);

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Sustainable Wishlist
				</h1>
				<EcoHeader ecoScore={avgScore} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
