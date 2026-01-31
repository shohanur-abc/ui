'use client';

import { Layers, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type CategoryData = {
	name: string;
	revenue: string;
	percentage: number;
	change: number;
	icon: string;
};

type CategoryBreakdownCardProps = {
	title: string;
	totalRevenue: string;
	categories: CategoryData[];
};

const CategoryBreakdownCard = ({
	title,
	totalRevenue,
	categories,
}: CategoryBreakdownCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center justify-between pb-4">
			<div className="flex items-center gap-3">
				<div className="p-2 rounded-lg bg-primary/10 text-primary">
					<Layers className="size-4" />
				</div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
			</div>
			<span className="text-lg font-bold">{totalRevenue}</span>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-2 @md:grid-cols-3 gap-4">
				{categories.map((category, idx) => {
					const isPositive = category.change >= 0;
					return (
						<div
							key={idx}
							className="p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
						>
							<div className="text-2xl mb-2">{category.icon}</div>
							<p className="font-medium text-sm mb-1">{category.name}</p>
							<p className="text-xl font-bold mb-2">{category.revenue}</p>
							<div className="flex items-center justify-between">
								<span className="text-xs text-muted-foreground">
									{category.percentage}% of total
								</span>
								<div
									className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-emerald-500' : 'text-destructive'}`}
								>
									{isPositive ? (
										<TrendingUp className="size-3" />
									) : (
										<TrendingDown className="size-3" />
									)}
									{Math.abs(category.change)}%
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const categories: CategoryData[] = [
		{
			name: 'Electronics',
			revenue: '$48,520',
			percentage: 35,
			change: 18.5,
			icon: '📱',
		},
		{
			name: 'Clothing',
			revenue: '$32,150',
			percentage: 23,
			change: 12.2,
			icon: '👕',
		},
		{
			name: 'Home & Garden',
			revenue: '$24,890',
			percentage: 18,
			change: -5.8,
			icon: '🏡',
		},
		{
			name: 'Sports',
			revenue: '$18,340',
			percentage: 13,
			change: 8.4,
			icon: '⚽',
		},
		{
			name: 'Beauty',
			revenue: '$10,250',
			percentage: 7,
			change: 22.1,
			icon: '💄',
		},
		{
			name: 'Books',
			revenue: '$5,850',
			percentage: 4,
			change: -2.3,
			icon: '📚',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<CategoryBreakdownCard
					title="Category Breakdown"
					totalRevenue="$140,000"
					categories={categories}
				/>
			</div>
		</section>
	);
}
