import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Leaf,
	Recycle,
	Droplets,
	Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface EcoRating {
	score: number;
	carbonOffset: string;
	materials: string[];
	certifications: string[];
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	ecoRating: EcoRating;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const EcoScore = ({ score }: { score: number }) => {
	const color =
		score >= 80
			? 'text-green-600'
			: score >= 60
				? 'text-amber-600'
				: 'text-red-600';
	const bgColor =
		score >= 80 ? 'bg-green-100' : score >= 60 ? 'bg-amber-100' : 'bg-red-100';

	return (
		<div
			className={`flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColor}`}
		>
			<Leaf className={`size-4 ${color}`} />
			<span className={`font-bold ${color}`}>{score}/100</span>
		</div>
	);
};

const EcoCertifications = ({
	certifications,
}: {
	certifications: string[];
}) => (
	<div className="flex flex-wrap gap-1 mt-2">
		{certifications.map((cert, i) => (
			<Badge
				key={i}
				variant="outline"
				className="text-xs gap-1 bg-green-50 text-green-700 border-green-200"
			>
				<Award className="size-3" />
				{cert}
			</Badge>
		))}
	</div>
);

const MaterialsList = ({ materials }: { materials: string[] }) => (
	<div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
		<Recycle className="size-3" />
		<span>{materials.join(', ')}</span>
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card className="p-4">
		<div className="flex gap-4">
			<div className="relative size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				{item.ecoRating.score >= 80 && (
					<Badge className="absolute top-1 left-1 gap-0.5 bg-green-500 text-white text-[10px] px-1.5">
						<Leaf className="size-2.5" />
						Eco
					</Badge>
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<div className="flex-1">
						<div className="flex items-center gap-2 flex-wrap">
							<Link href={item.href}>
								<h3 className="font-semibold hover:text-primary transition-colors">
									{item.name}
								</h3>
							</Link>
							<EcoScore score={item.ecoRating.score} />
						</div>
						<MaterialsList materials={item.ecoRating.materials} />
						<EcoCertifications certifications={item.ecoRating.certifications} />
					</div>
					<Button variant="ghost" size="icon-sm" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
				<div className="flex items-center justify-between mt-3">
					<div>
						<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
						<p className="text-xs text-green-600 flex items-center gap-1">
							<Droplets className="size-3" />
							{item.ecoRating.carbonOffset}
						</p>
					</div>
					<Button size="sm" className="gap-1.5">
						<ShoppingCart className="size-4" />
						Add to Cart
					</Button>
				</div>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const EcoSummary = ({ items }: { items: WishlistItem[] }) => {
	const avgScore = Math.round(
		items.reduce((sum, item) => sum + item.ecoRating.score, 0) / items.length,
	);

	return (
		<div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 mb-6">
			<div className="flex items-center gap-4">
				<div className="size-12 rounded-full bg-green-500 flex items-center justify-center">
					<Leaf className="size-6 text-white" />
				</div>
				<div className="flex-1">
					<p className="font-medium">Your Wishlist Eco Score</p>
					<div className="flex items-center gap-3 mt-1">
						<Progress value={avgScore} className="h-2 flex-1" />
						<span className="font-bold text-green-600">{avgScore}/100</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Organic Cotton T-Shirt',
			price: 45.0,
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
			ecoRating: {
				score: 92,
				carbonOffset: '2.3 kg CO₂ saved',
				materials: ['100% Organic Cotton', 'Natural Dyes'],
				certifications: ['GOTS', 'Fair Trade'],
			},
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Recycled Polyester Jacket',
			price: 189.0,
			image:
				'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&h=200&fit=crop',
			ecoRating: {
				score: 78,
				carbonOffset: '5.1 kg CO₂ saved',
				materials: ['Recycled Polyester', 'Recycled Nylon'],
				certifications: ['bluesign', 'GRS'],
			},
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Bamboo Sunglasses',
			price: 79.0,
			image:
				'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=200&h=200&fit=crop',
			ecoRating: {
				score: 88,
				carbonOffset: '1.5 kg CO₂ saved',
				materials: ['Bamboo', 'Bio-acetate'],
				certifications: ['FSC'],
			},
			href: '/product/3',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="flex items-center gap-2 mb-6">
					<Leaf className="size-7 text-green-600" />
					<h1 className="text-2xl @md:text-3xl font-bold">
						Eco-Friendly Wishlist
					</h1>
				</div>
				<EcoSummary items={wishlistItems} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
