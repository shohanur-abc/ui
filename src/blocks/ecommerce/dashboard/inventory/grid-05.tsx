'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	Search,
	MoreHorizontal,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

type Product = {
	id: string;
	name: string;
	sku: string;
	image: string;
	stock: number;
	maxStock: number;
	sold: number;
	revenue: number;
	change: number;
};

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	const stockPercentage = (product.stock / product.maxStock) * 100;
	const isLowStock = stockPercentage < 25;

	return (
		<Card className="overflow-hidden transition-all hover:shadow-lg">
			<div className="relative aspect-square bg-muted">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-12 text-muted-foreground" />
					</div>
				)}
				{isLowStock && (
					<Badge variant="destructive" className="absolute right-2 top-2">
						Low Stock
					</Badge>
				)}
			</div>
			<CardContent className="p-4">
				<div className="space-y-3">
					<div>
						<h3 className="line-clamp-1 font-semibold">{product.name}</h3>
						<p className="text-xs text-muted-foreground">{product.sku}</p>
					</div>
					<div className="space-y-1">
						<div className="flex items-center justify-between text-sm">
							<span className="text-muted-foreground">Stock</span>
							<span className="font-medium">{product.stock} / {product.maxStock}</span>
						</div>
						<Progress value={stockPercentage} className="h-2" />
					</div>
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm text-muted-foreground">Revenue</p>
							<p className="font-semibold">${product.revenue.toLocaleString()}</p>
						</div>
						<Badge variant={product.change >= 0 ? 'default' : 'destructive'} className="gap-0.5">
							{product.change >= 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
							{Math.abs(product.change)}%
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

type GridHeaderProps = {
	title: string;
	count: number;
	onSearch: (query: string) => void;
};

const GridHeader = ({ title, count, onSearch }: GridHeaderProps) => (
	<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
		<div>
			<h2 className="text-xl font-semibold @lg:text-2xl">{title}</h2>
			<p className="text-sm text-muted-foreground">{count} products</p>
		</div>
		<div className="relative w-full @sm:w-64">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input
				placeholder="Search products..."
				className="pl-10"
				onChange={(e) => onSearch(e.target.value)}
			/>
		</div>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{ id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001', image: '', stock: 245, maxStock: 500, sold: 1250, revenue: 99875, change: 15 },
		{ id: '2', name: 'Smart Watch Ultra', sku: 'SWU-002', image: '', stock: 89, maxStock: 300, sold: 456, revenue: 91143, change: -8 },
		{ id: '3', name: 'USB-C Fast Charger', sku: 'UFC-003', image: '', stock: 654, maxStock: 800, sold: 2340, revenue: 35100, change: 22 },
		{ id: '4', name: 'Mechanical Keyboard', sku: 'MK-004', image: '', stock: 12, maxStock: 200, sold: 189, revenue: 28350, change: -3 },
		{ id: '5', name: 'Bluetooth Speaker', sku: 'BS-005', image: '', stock: 456, maxStock: 600, sold: 780, revenue: 39000, change: 5 },
		{ id: '6', name: 'Gaming Mouse', sku: 'GM-006', image: '', stock: 234, maxStock: 400, sold: 567, revenue: 34020, change: 18 },
		{ id: '7', name: 'Webcam HD', sku: 'WC-007', image: '', stock: 56, maxStock: 150, sold: 234, revenue: 21060, change: -12 },
		{ id: '8', name: 'USB Hub 4-Port', sku: 'UH-008', image: '', stock: 789, maxStock: 1000, sold: 1456, revenue: 50960, change: 8 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<GridHeader
						title="Product Inventory"
						count={products.length}
						onSearch={(query) => console.log(query)}
					/>
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
