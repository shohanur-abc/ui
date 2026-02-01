import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	Trash2,
	Zap,
	Clock,
	CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	originalPrice?: number;
	image: string;
	priority: 'high' | 'medium' | 'low';
	savingsGoal?: number;
	savedAmount?: number;
	href: string;
}

interface WishlistGridProps {
	items: WishlistItem[];
}

const PriorityBadge = ({
	priority,
}: {
	priority: 'high' | 'medium' | 'low';
}) => {
	const variants = {
		high: { icon: Zap, label: 'Must Have', className: 'bg-red-500 text-white' },
		medium: {
			icon: Clock,
			label: 'Want',
			className: 'bg-amber-500 text-white',
		},
		low: {
			icon: Heart,
			label: 'Nice to Have',
			className: 'bg-blue-500 text-white',
		},
	};
	const { icon: Icon, label, className } = variants[priority];

	return (
		<Badge className={`gap-1 ${className}`}>
			<Icon className="size-3" />
			{label}
		</Badge>
	);
};

const SavingsProgress = ({
	goal,
	saved,
	price,
}: {
	goal: number;
	saved: number;
	price: number;
}) => {
	const progress = Math.min((saved / price) * 100, 100);
	const remaining = Math.max(price - saved, 0);

	return (
		<div className="mt-3 p-3 rounded-lg bg-muted/50">
			<div className="flex items-center justify-between text-sm mb-2">
				<span className="text-muted-foreground">Savings Progress</span>
				<span className="font-medium">
					${saved.toFixed(2)} / ${price.toFixed(2)}
				</span>
			</div>
			<Progress value={progress} className="h-2" />
			{remaining > 0 ? (
				<p className="text-xs text-muted-foreground mt-2">
					${remaining.toFixed(2)} more to go!
				</p>
			) : (
				<p className="text-xs text-green-600 flex items-center gap-1 mt-2">
					<CheckCircle2 className="size-3" />
					Ready to purchase!
				</p>
			)}
		</div>
	);
};

const ProductCard = ({ item }: { item: WishlistItem }) => (
	<Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg">
		<div className="relative aspect-square overflow-hidden bg-muted">
			<img
				src={item.image}
				alt={item.name}
				className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
			<div className="absolute top-2 left-2">
				<PriorityBadge priority={item.priority} />
			</div>
			<Button
				size="icon-sm"
				variant="secondary"
				className="absolute top-2 right-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
			>
				<Trash2 className="size-4 text-destructive" />
			</Button>
			{item.originalPrice && (
				<Badge className="absolute bottom-2 right-2" variant="destructive">
					Save ${(item.originalPrice - item.price).toFixed(2)}
				</Badge>
			)}
		</div>
		<CardContent className="p-4">
			<Link href={item.href}>
				<h3 className="font-semibold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
					{item.name}
				</h3>
			</Link>
			<div className="mt-2 flex items-baseline gap-2">
				<span className="text-xl font-bold">${item.price.toFixed(2)}</span>
				{item.originalPrice && (
					<span className="text-sm text-muted-foreground line-through">
						${item.originalPrice.toFixed(2)}
					</span>
				)}
			</div>
			{item.savingsGoal !== undefined && item.savedAmount !== undefined && (
				<SavingsProgress
					goal={item.savingsGoal}
					saved={item.savedAmount}
					price={item.price}
				/>
			)}
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

const FilterTabs = ({
	priorities,
}: {
	priorities: { label: string; count: number }[];
}) => (
	<div className="flex flex-wrap gap-2 mb-6 @md:mb-8">
		{priorities.map((priority) => (
			<Button
				key={priority.label}
				variant="outline"
				size="sm"
				className="gap-1"
			>
				{priority.label}
				<Badge
					variant="secondary"
					className="ml-1 size-5 p-0 flex items-center justify-center"
				>
					{priority.count}
				</Badge>
			</Button>
		))}
	</div>
);

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'MacBook Pro 16" M3 Max',
			price: 3499.0,
			image:
				'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
			priority: 'high',
			savingsGoal: 3499,
			savedAmount: 2800,
			href: '/product/1',
		},
		{
			id: '2',
			name: 'Sony A7 IV Camera',
			price: 2499.0,
			originalPrice: 2799.0,
			image:
				'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop',
			priority: 'high',
			savingsGoal: 2499,
			savedAmount: 1500,
			href: '/product/2',
		},
		{
			id: '3',
			name: 'Herman Miller Aeron Chair',
			price: 1395.0,
			image:
				'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop',
			priority: 'medium',
			savingsGoal: 1395,
			savedAmount: 700,
			href: '/product/3',
		},
		{
			id: '4',
			name: 'Kindle Paperwhite',
			price: 139.99,
			originalPrice: 159.99,
			image:
				'https://images.unsplash.com/photo-1592434134753-a70f1c2a8f88?w=400&h=400&fit=crop',
			priority: 'low',
			savingsGoal: 140,
			savedAmount: 140,
			href: '/product/4',
		},
	];

	const priorities = [
		{ label: 'All Items', count: 4 },
		{ label: 'Must Have', count: 2 },
		{ label: 'Want', count: 1 },
		{ label: 'Nice to Have', count: 1 },
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="mb-6">
					<h1 className="text-2xl @md:text-3xl font-bold">Wishlist Goals</h1>
					<p className="text-muted-foreground mt-1">
						Track your savings progress for each item
					</p>
				</div>
				<FilterTabs priorities={priorities} />
				<WishlistGrid items={wishlistItems} />
			</div>
		</section>
	);
}
