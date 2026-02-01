import Link from 'next/link';
import {
	Heart,
	ShoppingCart,
	X,
	Target,
	TrendingUp,
	Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	savedAmount: number;
	targetDate?: string;
	href: string;
}

interface ListProps {
	items: WishlistItem[];
}

const SavingsProgress = ({
	price,
	saved,
}: {
	price: number;
	saved: number;
}) => {
	const percentage = Math.min((saved / price) * 100, 100);
	const remaining = Math.max(price - saved, 0);

	return (
		<div className="mt-3 p-3 rounded-lg bg-muted/50">
			<div className="flex items-center justify-between text-sm mb-2">
				<span className="text-muted-foreground">Savings Goal</span>
				<span className="font-medium">
					${saved.toFixed(0)} / ${price.toFixed(0)}
				</span>
			</div>
			<Progress value={percentage} className="h-2" />
			{remaining > 0 ? (
				<p className="text-xs text-muted-foreground mt-2">
					${remaining.toFixed(2)} more to go
				</p>
			) : (
				<p className="text-xs text-green-600 mt-2 flex items-center gap-1">
					<Award className="size-3" />
					Goal reached! Ready to purchase
				</p>
			)}
		</div>
	);
};

const ListItem = ({ item }: { item: WishlistItem }) => {
	const goalReached = item.savedAmount >= item.price;

	return (
		<Card className={`p-4 ${goalReached ? 'ring-2 ring-green-500' : ''}`}>
			<div className="flex gap-4">
				<div className="relative size-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover"
					/>
					{goalReached && (
						<div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
							<Award className="size-8 text-green-600" />
						</div>
					)}
				</div>
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2">
						<div>
							<Link href={item.href}>
								<h3 className="font-semibold line-clamp-1 hover:text-primary transition-colors">
									{item.name}
								</h3>
							</Link>
							{item.targetDate && (
								<p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
									<Target className="size-3" />
									Target: {item.targetDate}
								</p>
							)}
						</div>
						<Button variant="ghost" size="icon-sm" className="text-destructive">
							<X className="size-4" />
						</Button>
					</div>
					<span className="text-xl font-bold mt-1 block">
						${item.price.toFixed(2)}
					</span>
					<SavingsProgress price={item.price} saved={item.savedAmount} />
					<Button size="sm" className="gap-1.5 mt-3" disabled={!goalReached}>
						<ShoppingCart className="size-4" />
						{goalReached ? 'Buy Now' : 'Keep Saving'}
					</Button>
				</div>
			</div>
		</Card>
	);
};

const WishlistList = ({ items }: ListProps) => (
	<div className="space-y-4">
		{items.map((item) => (
			<ListItem key={item.id} item={item} />
		))}
	</div>
);

const SavingsSummary = ({ items }: { items: WishlistItem[] }) => {
	const totalNeeded = items.reduce((sum, item) => sum + item.price, 0);
	const totalSaved = items.reduce((sum, item) => sum + item.savedAmount, 0);
	const goalsReached = items.filter(
		(item) => item.savedAmount >= item.price,
	).length;

	return (
		<div className="grid grid-cols-3 gap-4 mb-6">
			<Card className="p-4 text-center">
				<TrendingUp className="size-5 mx-auto mb-2 text-primary" />
				<p className="text-2xl font-bold">${totalSaved.toFixed(0)}</p>
				<p className="text-xs text-muted-foreground">Total Saved</p>
			</Card>
			<Card className="p-4 text-center">
				<Target className="size-5 mx-auto mb-2 text-muted-foreground" />
				<p className="text-2xl font-bold">
					${(totalNeeded - totalSaved).toFixed(0)}
				</p>
				<p className="text-xs text-muted-foreground">Remaining</p>
			</Card>
			<Card className="p-4 text-center">
				<Award className="size-5 mx-auto mb-2 text-green-600" />
				<p className="text-2xl font-bold">{goalsReached}</p>
				<p className="text-xs text-muted-foreground">Goals Reached</p>
			</Card>
		</div>
	);
};

export default function Main() {
	const wishlistItems: WishlistItem[] = [
		{
			id: '1',
			name: 'Sony A7 IV Camera',
			price: 2498.0,
			image:
				'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop',
			savedAmount: 2498.0,
			targetDate: 'Dec 25',
			href: '/product/1',
		},
		{
			id: '2',
			name: 'DJI Mini 3 Pro Drone',
			price: 759.0,
			image:
				'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop',
			savedAmount: 450.0,
			targetDate: 'Jan 15',
			href: '/product/2',
		},
		{
			id: '3',
			name: 'iPad Pro 12.9"',
			price: 1099.0,
			image:
				'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop',
			savedAmount: 275.0,
			targetDate: 'Feb 28',
			href: '/product/3',
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<h1 className="text-2xl @md:text-3xl font-bold mb-6">Savings Goals</h1>
				<SavingsSummary items={wishlistItems} />
				<WishlistList items={wishlistItems} />
			</div>
		</section>
	);
}
