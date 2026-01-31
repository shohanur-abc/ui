'use client';

import * as React from 'react';
import {
	Package,
	ChevronRight,
	Box,
	Tag,
	AlertTriangle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type CategoryItem = {
	id: string;
	name: string;
	productCount: number;
	totalStock: number;
	lowStockCount: number;
	value: number;
	icon: React.ReactNode;
};

type CategoryCardProps = {
	category: CategoryItem;
};

const CategoryCard = ({ category }: CategoryCardProps) => (
	<Card className="group cursor-pointer transition-all hover:border-primary/50">
		<CardContent className="p-6">
			<div className="flex items-start justify-between">
				<div className="flex size-12 items-center justify-center rounded-xl bg-primary/10">
					{category.icon}
				</div>
				<ChevronRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
			</div>

			<div className="mt-4">
				<h3 className="font-semibold">{category.name}</h3>
				<p className="text-sm text-muted-foreground">{category.productCount} products</p>
			</div>

			<div className="mt-4 grid grid-cols-2 gap-4">
				<div className="rounded-lg bg-muted/50 p-3">
					<p className="text-xs text-muted-foreground">Total Stock</p>
					<p className="text-lg font-bold">{category.totalStock.toLocaleString()}</p>
				</div>
				<div className="rounded-lg bg-muted/50 p-3">
					<p className="text-xs text-muted-foreground">Value</p>
					<p className="text-lg font-bold">${(category.value / 1000).toFixed(0)}K</p>
				</div>
			</div>

			{category.lowStockCount > 0 && (
				<div className="mt-4 flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-3">
					<AlertTriangle className="size-4 text-amber-500" />
					<span className="text-sm text-amber-500">{category.lowStockCount} items need attention</span>
				</div>
			)}
		</CardContent>
	</Card>
);

type SummaryCardProps = {
	title: string;
	value: string;
	subtitle: string;
};

const SummaryCard = ({ title, value, subtitle }: SummaryCardProps) => (
	<div className="rounded-lg border p-4 text-center">
		<p className="text-sm text-muted-foreground">{title}</p>
		<p className="mt-1 text-2xl font-bold">{value}</p>
		<p className="text-xs text-muted-foreground">{subtitle}</p>
	</div>
);

export default function Main() {
	const categories: CategoryItem[] = [
		{ id: '1', name: 'Electronics', productCount: 234, totalStock: 15680, lowStockCount: 12, value: 456000, icon: <Box className="size-6 text-primary" /> },
		{ id: '2', name: 'Accessories', productCount: 456, totalStock: 28450, lowStockCount: 8, value: 234000, icon: <Tag className="size-6 text-primary" /> },
		{ id: '3', name: 'Audio', productCount: 89, totalStock: 4560, lowStockCount: 0, value: 189000, icon: <Package className="size-6 text-primary" /> },
		{ id: '4', name: 'Wearables', productCount: 67, totalStock: 2340, lowStockCount: 15, value: 312000, icon: <Box className="size-6 text-primary" /> },
		{ id: '5', name: 'Cables & Adapters', productCount: 312, totalStock: 45000, lowStockCount: 5, value: 78000, icon: <Tag className="size-6 text-primary" /> },
		{ id: '6', name: 'Cases & Covers', productCount: 189, totalStock: 12300, lowStockCount: 3, value: 156000, icon: <Package className="size-6 text-primary" /> },
	];

	const totalProducts = categories.reduce((sum, c) => sum + c.productCount, 0);
	const totalStock = categories.reduce((sum, c) => sum + c.totalStock, 0);
	const totalValue = categories.reduce((sum, c) => sum + c.value, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">Categories</h2>
							<p className="text-sm text-muted-foreground">Inventory by product category</p>
						</div>
						<Button variant="outline">Add Category</Button>
					</div>

					<div className="grid gap-4 @sm:grid-cols-3">
						<SummaryCard title="Total Categories" value={categories.length.toString()} subtitle="Active categories" />
						<SummaryCard title="Total Products" value={totalProducts.toLocaleString()} subtitle="Across all categories" />
						<SummaryCard title="Total Value" value={`$${(totalValue / 1000000).toFixed(2)}M`} subtitle="Inventory value" />
					</div>

					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
						{categories.map((category) => (
							<CategoryCard key={category.id} category={category} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
