import Link from 'next/link';
import { Heart, ShoppingCart, DollarSign, Sparkles, Clock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface WishlistItem {
	id: string;
	name: string;
	price: number;
	image: string;
	priority: 'high' | 'medium' | 'low';
	href: string;
}

interface BudgetCategory {
	id: string;
	name: string;
	budget: number;
	icon: React.ReactNode;
	items: WishlistItem[];
}

const PriorityBadge = ({ priority }: { priority: 'high' | 'medium' | 'low' }) => {
	const config = {
		high: { text: 'Must Have', className: 'bg-red-100 text-red-700' },
		medium: { text: 'Nice to Have', className: 'bg-amber-100 text-amber-700' },
		low: { text: 'Maybe Later', className: 'bg-slate-100 text-slate-700' },
	};
	return (
		<Badge variant="outline" className={`text-[10px] ${config[priority].className}`}>
			{config[priority].text}
		</Badge>
	);
};

const ItemRow = ({ item }: { item: WishlistItem }) => (
	<div className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors">
		<div className="size-12 rounded-lg overflow-hidden bg-muted flex-shrink-0">
			<img src={item.image} alt={item.name} className="size-full object-cover" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium text-sm truncate">{item.name}</p>
			<PriorityBadge priority={item.priority} />
		</div>
		<span className="font-bold">${item.price.toFixed(2)}</span>
		<Button size="sm" variant="ghost">
			<ShoppingCart className="size-4" />
		</Button>
	</div>
);

const BudgetProgress = ({ spent, total }: { spent: number; total: number }) => {
	const percentage = Math.min((spent / total) * 100, 100);
	const isOver = spent > total;

	return (
		<div className="mb-6 p-4 rounded-xl bg-muted">
			<div className="flex items-center justify-between mb-2">
				<span className="text-sm font-medium">Budget Progress</span>
				<span className={`text-sm font-bold ${isOver ? 'text-red-500' : ''}`}>
					${spent.toFixed(2)} / ${total.toFixed(2)}
				</span>
			</div>
			<div className="h-2 bg-background rounded-full overflow-hidden">
				<div
					className={`h-full rounded-full transition-all ${isOver ? 'bg-red-500' : 'bg-primary'}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			{isOver && (
				<p className="text-xs text-red-500 mt-2">
					Over budget by ${(spent - total).toFixed(2)}
				</p>
			)}
		</div>
	);
};

const CategoryContent = ({ category }: { category: BudgetCategory }) => {
	const totalSpent = category.items.reduce((sum, item) => sum + item.price, 0);

	return (
		<div>
			<BudgetProgress spent={totalSpent} total={category.budget} />
			<div className="space-y-1">
				{category.items.map((item) => (
					<ItemRow key={item.id} item={item} />
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const categories: BudgetCategory[] = [
		{
			id: 'essentials',
			name: 'Essentials',
			budget: 500,
			icon: <Sparkles className="size-4" />,
			items: [
				{ id: '1', name: 'Winter Jacket', price: 189, image: 'https://images.unsplash.com/photo-1544923246-77307dd628b4?w=400&h=400&fit=crop', priority: 'high', href: '/product/1' },
				{ id: '2', name: 'Boots', price: 145, image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=400&h=400&fit=crop', priority: 'high', href: '/product/2' },
				{ id: '3', name: 'Scarf', price: 45, image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop', priority: 'medium', href: '/product/3' },
			],
		},
		{
			id: 'tech',
			name: 'Tech',
			budget: 800,
			icon: <DollarSign className="size-4" />,
			items: [
				{ id: '4', name: 'MacBook Air', price: 999, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop', priority: 'high', href: '/product/4' },
				{ id: '5', name: 'AirPods Pro', price: 249, image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&h=400&fit=crop', priority: 'medium', href: '/product/5' },
			],
		},
		{
			id: 'future',
			name: 'Future',
			budget: 1000,
			icon: <Clock className="size-4" />,
			items: [
				{ id: '6', name: 'Camera', price: 1299, image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop', priority: 'low', href: '/product/6' },
				{ id: '7', name: 'Drone', price: 799, image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=400&fit=crop', priority: 'low', href: '/product/7' },
			],
		},
	];

	return (
		<section className="@container" data-theme="wishlist">
			<div className="mx-auto max-w-3xl px-4 @sm:px-6 py-6 @md:py-8">
				<div className="flex items-center justify-between mb-6">
					<h1 className="text-2xl font-bold">Budget Planner</h1>
					<Button variant="outline" className="gap-2">
						<DollarSign className="size-4" />
						Set Budgets
					</Button>
				</div>
				<Tabs defaultValue="essentials" className="w-full">
					<TabsList className="w-full mb-6">
						{categories.map((category) => (
							<TabsTrigger key={category.id} value={category.id} className="flex-1 gap-2">
								{category.icon}
								{category.name}
							</TabsTrigger>
						))}
					</TabsList>
					{categories.map((category) => (
						<TabsContent key={category.id} value={category.id}>
							<CategoryContent category={category} />
						</TabsContent>
					))}
				</Tabs>
			</div>
		</section>
	);
}
