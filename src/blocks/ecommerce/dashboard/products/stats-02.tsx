'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	ArrowRight,
	MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface TopProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	revenue: number;
	sales: number;
	trend: number;
	percentOfTotal: number;
}

interface CategoryPerformance {
	name: string;
	revenue: number;
	products: number;
	percentOfTotal: number;
	trend: number;
}

interface TopProductRowProps {
	product: TopProduct;
	rank: number;
}

const TopProductRow = ({ product, rank }: TopProductRowProps) => {
	const getRankStyle = () => {
		switch (rank) {
			case 1:
				return 'bg-amber-500 text-white';
			case 2:
				return 'bg-gray-400 text-white';
			case 3:
				return 'bg-amber-700 text-white';
			default:
				return 'bg-muted text-muted-foreground';
		}
	};

	return (
		<div className="flex items-center gap-3 py-3">
			<div className={`flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${getRankStyle()}`}>
				{rank}
			</div>
			<div className="size-10 shrink-0 overflow-hidden rounded-md bg-muted">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-5 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.sales} sales</p>
			</div>
			<div className="text-right">
				<p className="font-semibold">${product.revenue.toLocaleString()}</p>
				<p className={`flex items-center justify-end gap-1 text-xs ${product.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
					{product.trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{Math.abs(product.trend)}%
				</p>
			</div>
		</div>
	);
};

interface TopProductsCardProps {
	title: string;
	products: TopProduct[];
	viewAllLabel: string;
	onViewAll: () => void;
}

const TopProductsCard = ({ title, products, viewAllLabel, onViewAll }: TopProductsCardProps) => (
	<Card>
		<CardHeader className="flex flex-row items-center justify-between">
			<CardTitle className="text-base">{title}</CardTitle>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>By Revenue</DropdownMenuItem>
					<DropdownMenuItem>By Sales</DropdownMenuItem>
					<DropdownMenuItem>By Growth</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</CardHeader>
		<CardContent>
			<div className="divide-y">
				{products.map((product, idx) => (
					<TopProductRow key={product.id} product={product} rank={idx + 1} />
				))}
			</div>
			<Button variant="ghost" className="mt-4 w-full gap-2" onClick={onViewAll}>
				{viewAllLabel}
				<ArrowRight className="size-4" />
			</Button>
		</CardContent>
	</Card>
);

interface CategoryRowProps {
	category: CategoryPerformance;
}

const CategoryRow = ({ category }: CategoryRowProps) => (
	<div className="space-y-2 py-3">
		<div className="flex items-center justify-between">
			<div>
				<p className="font-medium">{category.name}</p>
				<p className="text-xs text-muted-foreground">{category.products} products</p>
			</div>
			<div className="text-right">
				<p className="font-semibold">${category.revenue.toLocaleString()}</p>
				<p className={`flex items-center justify-end gap-1 text-xs ${category.trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
					{category.trend >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{Math.abs(category.trend)}%
				</p>
			</div>
		</div>
		<Progress value={category.percentOfTotal} className="h-2" />
		<p className="text-right text-xs text-muted-foreground">
			{category.percentOfTotal.toFixed(1)}% of total
		</p>
	</div>
);

interface CategoryPerformanceCardProps {
	title: string;
	categories: CategoryPerformance[];
}

const CategoryPerformanceCard = ({ title, categories }: CategoryPerformanceCardProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="divide-y">
				{categories.map((category) => (
					<CategoryRow key={category.name} category={category} />
				))}
			</div>
		</CardContent>
	</Card>
);

interface LowPerformersCardProps {
	title: string;
	products: TopProduct[];
	labels: { noSales: string; lowStock: string };
}

const LowPerformersCard = ({ title, products, labels }: LowPerformersCardProps) => (
	<Card className="border-amber-500/20 bg-amber-500/5">
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="space-y-3">
				{products.map((product) => (
					<div key={product.id} className="flex items-center gap-3 rounded-lg border bg-background p-2">
						<div className="size-10 shrink-0 overflow-hidden rounded-md bg-muted">
							{product.image ? (
								<img src={product.image} alt={product.name} className="size-full object-cover" />
							) : (
								<div className="flex size-full items-center justify-center">
									<Package className="size-5 text-muted-foreground" />
								</div>
							)}
						</div>
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">{product.name}</p>
							<div className="flex items-center gap-2">
								<Badge variant="outline" className="text-xs text-amber-500">
									{product.sales === 0 ? labels.noSales : `${product.trend}% decline`}
								</Badge>
							</div>
						</div>
						<div className="text-right">
							<p className="font-semibold">${product.revenue.toLocaleString()}</p>
							<p className="text-xs text-muted-foreground">{product.sales} sales</p>
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const topProducts: TopProduct[] = [
		{ id: '1', name: 'Premium Wireless Headphones', sku: 'WHP-001', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop', revenue: 45230, sales: 156, trend: 23, percentOfTotal: 15.2 },
		{ id: '2', name: 'Smart Fitness Watch', sku: 'SFW-002', image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=100&h=100&fit=crop', revenue: 38900, sales: 130, trend: 18, percentOfTotal: 13.1 },
		{ id: '3', name: 'Portable Power Bank', sku: 'PPB-003', image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=100&h=100&fit=crop', revenue: 28450, sales: 569, trend: 12, percentOfTotal: 9.6 },
		{ id: '4', name: 'Mechanical Keyboard', sku: 'MKB-004', image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop', revenue: 21800, sales: 145, trend: 8, percentOfTotal: 7.3 },
		{ id: '5', name: 'USB-C Hub Pro', sku: 'UCH-005', image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop', revenue: 18650, sales: 207, trend: 5, percentOfTotal: 6.3 },
	];

	const categories: CategoryPerformance[] = [
		{ name: 'Electronics', revenue: 125600, products: 234, percentOfTotal: 42.3, trend: 15 },
		{ name: 'Audio', revenue: 78900, products: 89, percentOfTotal: 26.6, trend: 12 },
		{ name: 'Accessories', revenue: 45300, products: 156, percentOfTotal: 15.3, trend: -3 },
		{ name: 'Wearables', revenue: 29800, products: 45, percentOfTotal: 10.0, trend: 22 },
		{ name: 'Home', revenue: 17200, products: 67, percentOfTotal: 5.8, trend: -8 },
	];

	const lowPerformers: TopProduct[] = [
		{ id: 'l1', name: 'Basic USB Cable', sku: 'USC-006', image: '', revenue: 234, sales: 12, trend: -45, percentOfTotal: 0.1 },
		{ id: 'l2', name: 'Phone Stand Basic', sku: 'PSB-007', image: '', revenue: 156, sales: 8, trend: -52, percentOfTotal: 0.05 },
		{ id: 'l3', name: 'Screen Protector Pack', sku: 'SPP-008', image: '', revenue: 89, sales: 0, trend: -100, percentOfTotal: 0.03 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @lg:grid-cols-2">
					<TopProductsCard
						title="Top Performing Products"
						products={topProducts}
						viewAllLabel="View All Products"
						onViewAll={() => console.log('View all')}
					/>
					<CategoryPerformanceCard
						title="Category Performance"
						categories={categories}
					/>
				</div>
				<LowPerformersCard
					title="Needs Attention"
					products={lowPerformers}
					labels={{ noSales: 'No sales', lowStock: 'Low stock' }}
				/>
			</div>
		</section>
	);
}
