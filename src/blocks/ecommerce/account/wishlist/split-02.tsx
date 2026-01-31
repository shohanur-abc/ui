import Link from 'next/link';
import { Heart, ShoppingCart, Star, Scale, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	rating: number;
	specs: { label: string; value: string }[];
	href: string;
}

interface SplitProps {
	leftItem: WishlistItem;
	rightItem: WishlistItem;
}

const CompareColumn = ({ item, side }: { item: WishlistItem; side: 'left' | 'right' }) => (
	<div className="flex-1 p-4">
		<div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<h3 className="font-bold text-lg">{item.name}</h3>
		<div className="flex items-center gap-1 mt-1">
			<Star className="size-4 fill-amber-400 text-amber-400" />
			<span className="text-sm">{item.rating}</span>
		</div>
		<p className="text-xl font-bold mt-2">${item.price.toFixed(2)}</p>
		<div className="mt-4 space-y-2">
			{item.specs.map((spec) => (
				<div key={spec.label} className="flex justify-between text-sm">
					<span className="text-muted-foreground">{spec.label}</span>
					<span className="font-medium">{spec.value}</span>
				</div>
			))}
		</div>
		<Button className="w-full mt-4 gap-2">
			<ShoppingCart className="size-4" />
			Add to Cart
		</Button>
	</div>
);

const CompareIndicator = ({ leftValue, rightValue }: { leftValue: number; rightValue: number }) => {
	if (leftValue === rightValue) return null;
	return leftValue > rightValue ? (
		<Badge className="absolute left-1/4 -translate-x-1/2 bg-green-500">Better</Badge>
	) : (
		<Badge className="absolute right-1/4 translate-x-1/2 bg-green-500">Better</Badge>
	);
};

const ItemSelector = ({ items, selectedId }: { items: WishlistItem[]; selectedId: string }) => (
	<div className="flex gap-2 overflow-x-auto p-2 bg-muted rounded-lg">
		{items.map((item) => (
			<div
				key={item.id}
				className={`size-14 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all ${item.id === selectedId ? 'ring-2 ring-primary' : 'opacity-60 hover:opacity-100'}`}
			>
				<img src={item.image} alt={item.name} className="size-full object-cover" />
			</div>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'iPhone 15 Pro',
			price: 999,
			image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
			rating: 4.9,
			specs: [
				{ label: 'Display', value: '6.1" OLED' },
				{ label: 'Storage', value: '256GB' },
				{ label: 'Camera', value: '48MP' },
				{ label: 'Battery', value: '3274mAh' },
				{ label: 'Weight', value: '187g' },
			],
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Samsung Galaxy S24',
			price: 899,
			image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
			rating: 4.8,
			specs: [
				{ label: 'Display', value: '6.2" AMOLED' },
				{ label: 'Storage', value: '256GB' },
				{ label: 'Camera', value: '50MP' },
				{ label: 'Battery', value: '4000mAh' },
				{ label: 'Weight', value: '167g' },
			],
			href: '/product/2',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-4xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center gap-3 mb-6">
					<Scale className="size-6 text-primary" />
					<h1 className="text-2xl font-bold">Compare Products</h1>
				</div>
				<div className="grid @sm:grid-cols-2 gap-4 mb-6">
					<ItemSelector items={wishlistItems} selectedId="1" />
					<ItemSelector items={wishlistItems} selectedId="2" />
				</div>
				<div className="flex border rounded-xl overflow-hidden">
					<CompareColumn item={wishlistItems[0]} side="left" />
					<div className="w-px bg-border" />
					<CompareColumn item={wishlistItems[1]} side="right" />
				</div>
			</div>
		</section>
	);
}
