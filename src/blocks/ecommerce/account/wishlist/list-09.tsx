import Link from 'next/link';
import { Heart, ShoppingCart, X, Scale, Check, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductSpec {
	label: string;
	value: string;
}

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	specs: ProductSpec[];
	isComparing: boolean;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const ProductSpecs = ({ specs }: { specs: ProductSpec[] }) => (
	<div className="flex flex-wrap gap-2 mt-2">
		{specs.slice(0, 3).map((spec, i) => (
			<Badge key={i} variant="outline" className="text-xs">
				{spec.label}: {spec.value}
			</Badge>
		))}
		{specs.length > 3 && (
			<Badge variant="outline" className="text-xs text-muted-foreground">
				+{specs.length - 3} more
			</Badge>
		)}
	</div>
);

const CompareToggle = ({ isComparing }: { isComparing: boolean }) => (
	<div
		className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border cursor-pointer transition-colors ${
			isComparing ? 'bg-primary/10 border-primary' : 'hover:bg-muted'
		}`}
	>
		<Checkbox checked={isComparing} />
		<span className="text-sm">{isComparing ? 'Comparing' : 'Compare'}</span>
	</div>
);

const ListItem = ({ item }: { item: WishlistItem }) => (
	<Card
		className={`p-4 transition-all ${item.isComparing ? 'ring-2 ring-primary' : ''}`}
	>
		<div className="flex gap-4 @sm:gap-6">
			<div className="relative size-24 @sm:size-28 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
				<img
					src={item.image}
					alt={item.name}
					className="size-full object-cover"
				/>
				<Heart className="absolute top-2 left-2 size-4 fill-primary text-primary" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2">
					<Link href={item.href}>
						<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
							{item.name}
						</h3>
					</Link>
					<Button variant="ghost" size="icon-sm" className="text-destructive">
						<X className="size-4" />
					</Button>
				</div>
				<ProductSpecs specs={item.specs} />
				<div className="flex flex-wrap items-center gap-3 mt-3">
					<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
					<CompareToggle isComparing={item.isComparing} />
				</div>
				<Button size="sm" className="gap-1.5 mt-3">
					<ShoppingCart className="size-4" />
					Add to Cart
				</Button>
			</div>
		</div>
	</Card>
);

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-3">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const CompareBar = ({ comparingCount }: { comparingCount: number }) => {
	if (comparingCount === 0) return null;

	return (
		<div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
			<div className="flex items-center gap-4 px-6 py-3 rounded-full bg-primary text-primary-foreground shadow-lg">
				<Scale className="size-5" />
				<span className="font-medium">{comparingCount} items selected</span>
				<Button variant="secondary" size="sm" className="gap-1.5">
					Compare Now
				</Button>
			</div>
		</div>
	);
};

const CompareHint = () => (
	<div className="flex items-center gap-2 p-4 rounded-lg bg-muted mb-6">
		<Scale className="size-5 text-muted-foreground" />
		<p className="text-sm text-muted-foreground">
			Select items to compare specifications side by side
		</p>
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'iPhone 15 Pro Max',
			price: 1199.0,
			image:
				'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=200&h=200&fit=crop',
			specs: [
				{ label: 'Storage', value: '256GB' },
				{ label: 'Display', value: '6.7"' },
				{ label: 'Chip', value: 'A17 Pro' },
				{ label: 'Camera', value: '48MP' },
			],
			isComparing: true,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Samsung Galaxy S24 Ultra',
			price: 1299.0,
			image:
				'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop',
			specs: [
				{ label: 'Storage', value: '256GB' },
				{ label: 'Display', value: '6.8"' },
				{ label: 'Chip', value: 'Snapdragon 8' },
				{ label: 'Camera', value: '200MP' },
			],
			isComparing: true,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Google Pixel 8 Pro',
			price: 999.0,
			image:
				'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=200&h=200&fit=crop',
			specs: [
				{ label: 'Storage', value: '128GB' },
				{ label: 'Display', value: '6.7"' },
				{ label: 'Chip', value: 'Tensor G3' },
				{ label: 'Camera', value: '50MP' },
			],
			isComparing: false,
			href: '/product/3',
		},
	];

	const comparingCount = wishlistItems.filter(
		(item) => item.isComparing,
	).length;

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16 pb-24">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">
					Compare Products
				</h1>
				<CompareHint />
				<WishlistList items={wishlistItems} />
				<CompareBar comparingCount={comparingCount} />
			</div>
		</section>
	);
}
