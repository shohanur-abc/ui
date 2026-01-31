'use client';

import * as React from 'react';
import {
	Package,
	Star,
	TrendingUp,
	TrendingDown,
	Eye,
	MoreHorizontal,
	Trophy,
	Medal,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Product = {
	id: string;
	rank: number;
	name: string;
	sku: string;
	salesCount: number;
	revenue: number;
	stock: number;
	trend: 'up' | 'down' | 'stable';
	trendPercent: number;
	rating: number;
};

type ProductRowProps = {
	product: Product;
};

const ProductRow = ({ product }: ProductRowProps) => {
	const getRankIcon = (rank: number) => {
		if (rank === 1) return <Trophy className="size-5 text-yellow-500" />;
		if (rank === 2) return <Medal className="size-5 text-gray-400" />;
		if (rank === 3) return <Medal className="size-5 text-amber-600" />;
		return <span className="text-lg font-bold text-muted-foreground">{rank}</span>;
	};

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<div className="flex size-10 items-center justify-center">
				{getRankIcon(product.rank)}
			</div>
			<div className="flex size-12 items-center justify-center rounded-lg bg-muted">
				<Package className="size-6 text-muted-foreground" />
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{product.name}</p>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>{product.sku}</span>
					<span>•</span>
					<div className="flex items-center gap-0.5">
						{[...Array(5)].map((_, i) => (
							<Star
								key={i}
								className={`size-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
							/>
						))}
					</div>
				</div>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">Sales</p>
				<p className="font-semibold">{product.salesCount.toLocaleString()}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Revenue</p>
				<p className="font-semibold">${product.revenue.toLocaleString()}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Trend</p>
				<div className="flex items-center justify-center gap-1">
					{product.trend === 'up' ? (
						<TrendingUp className="size-4 text-emerald-500" />
					) : product.trend === 'down' ? (
						<TrendingDown className="size-4 text-destructive" />
					) : null}
					<span className={`font-medium ${product.trend === 'up' ? 'text-emerald-500' : product.trend === 'down' ? 'text-destructive' : ''}`}>
						{product.trend === 'up' ? '+' : product.trend === 'down' ? '-' : ''}{product.trendPercent}%
					</span>
				</div>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Stock</p>
				<p className={`font-semibold ${product.stock < 50 ? 'text-amber-500' : ''}`}>{product.stock}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>View Details</DropdownMenuItem>
					<DropdownMenuItem>Restock</DropdownMenuItem>
					<DropdownMenuItem>View Analytics</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default function Main() {
	const products: Product[] = [
		{ id: '1', rank: 1, name: 'Wireless Pro Earbuds X1', sku: 'WPE-X1', salesCount: 2456, revenue: 122800, stock: 234, trend: 'up', trendPercent: 23, rating: 4.8 },
		{ id: '2', rank: 2, name: 'Smart Watch Ultra', sku: 'SWU-001', salesCount: 1892, revenue: 378400, stock: 89, trend: 'up', trendPercent: 15, rating: 4.7 },
		{ id: '3', rank: 3, name: 'Premium Leather Case', sku: 'PLC-001', salesCount: 1567, revenue: 47010, stock: 567, trend: 'stable', trendPercent: 2, rating: 4.5 },
		{ id: '4', rank: 4, name: 'Fast Charger 100W', sku: 'FC100-001', salesCount: 1234, revenue: 61700, stock: 45, trend: 'up', trendPercent: 18, rating: 4.6 },
		{ id: '5', rank: 5, name: 'Bluetooth Speaker Max', sku: 'BSM-001', salesCount: 1089, revenue: 108900, stock: 156, trend: 'down', trendPercent: 8, rating: 4.4 },
		{ id: '6', rank: 6, name: 'USB-C Hub 10-in-1', sku: 'UCH10-001', salesCount: 987, revenue: 69090, stock: 234, trend: 'up', trendPercent: 12, rating: 4.3 },
		{ id: '7', rank: 7, name: 'Noise Cancelling Headphones', sku: 'NCH-001', salesCount: 856, revenue: 128400, stock: 67, trend: 'stable', trendPercent: 1, rating: 4.7 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Best Sellers</CardTitle>
								<CardDescription>Top performing products this month</CardDescription>
							</div>
							<Button variant="outline">View All</Button>
						</div>
					</CardHeader>
					<CardContent>
						{products.map((product) => (
							<ProductRow key={product.id} product={product} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
