'use client';

import * as React from 'react';
import {
	Package,
	Star,
	TrendingUp,
	TrendingDown,
	ShoppingCart,
	Eye,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Product = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	maxStock: number;
	sales: number;
	revenue: number;
	trend: 'up' | 'down' | 'stable';
	rating: number;
	rank: number;
};

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	const stockPercent = (product.stock / product.maxStock) * 100;

	const getRankBadge = (rank: number) => {
		if (rank === 1) return <Badge className="bg-yellow-500">🏆 #1</Badge>;
		if (rank === 2) return <Badge className="bg-gray-400">#2</Badge>;
		if (rank === 3) return <Badge className="bg-amber-600">#3</Badge>;
		return <Badge variant="outline">#{rank}</Badge>;
	};

	return (
		<Card className="overflow-hidden">
			<div className="flex h-32 items-center justify-center bg-gradient-to-br from-muted to-muted/50">
				<Package className="size-12 text-muted-foreground" />
			</div>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div className="min-w-0 flex-1">
						<p className="truncate font-medium">{product.name}</p>
						<p className="text-xs text-muted-foreground">{product.sku}</p>
					</div>
					{getRankBadge(product.rank)}
				</div>

				<div className="mt-4 flex items-center gap-1">
					{[...Array(5)].map((_, i) => (
						<Star
							key={i}
							className={`size-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-muted'}`}
						/>
					))}
					<span className="ml-1 text-xs text-muted-foreground">
						{product.rating}
					</span>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Stock Level</span>
						<span className="font-medium">
							{product.stock}/{product.maxStock}
						</span>
					</div>
					<Progress value={stockPercent} />
				</div>

				<div className="mt-4 grid grid-cols-2 gap-4 border-t pt-4">
					<div>
						<p className="text-xs text-muted-foreground">Sales</p>
						<div className="flex items-center gap-1">
							<span className="font-semibold">{product.sales}</span>
							{product.trend === 'up' ? (
								<TrendingUp className="size-3 text-emerald-500" />
							) : product.trend === 'down' ? (
								<TrendingDown className="size-3 text-destructive" />
							) : null}
						</div>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Revenue</p>
						<p className="font-semibold">${product.revenue.toLocaleString()}</p>
					</div>
				</div>

				<div className="mt-4 flex gap-2">
					<Button variant="outline" size="sm" className="flex-1">
						<Eye className="mr-1 size-3" />
						View
					</Button>
					<Button size="sm" className="flex-1">
						<ShoppingCart className="mr-1 size-3" />
						Restock
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Pro Earbuds',
			sku: 'WPE-001',
			stock: 234,
			maxStock: 500,
			sales: 1245,
			revenue: 62250,
			trend: 'up',
			rating: 4.8,
			rank: 1,
		},
		{
			id: '2',
			name: 'Smart Watch Series X',
			sku: 'SWX-001',
			stock: 89,
			maxStock: 200,
			sales: 892,
			revenue: 178400,
			trend: 'up',
			rating: 4.6,
			rank: 2,
		},
		{
			id: '3',
			name: 'Premium Leather Case',
			sku: 'PLC-001',
			stock: 567,
			maxStock: 800,
			sales: 756,
			revenue: 22680,
			trend: 'stable',
			rating: 4.4,
			rank: 3,
		},
		{
			id: '4',
			name: 'Fast Charger 65W',
			sku: 'FC65-001',
			stock: 123,
			maxStock: 300,
			sales: 634,
			revenue: 25360,
			trend: 'down',
			rating: 4.5,
			rank: 4,
		},
		{
			id: '5',
			name: 'Bluetooth Speaker Max',
			sku: 'BSM-001',
			stock: 45,
			maxStock: 150,
			sales: 521,
			revenue: 52100,
			trend: 'up',
			rating: 4.7,
			rank: 5,
		},
		{
			id: '6',
			name: 'USB Hub 7-Port',
			sku: 'UH7P-001',
			stock: 312,
			maxStock: 400,
			sales: 445,
			revenue: 17800,
			trend: 'stable',
			rating: 4.3,
			rank: 6,
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div>
						<h2 className="text-xl font-semibold @lg:text-2xl">
							Top Performing Products
						</h2>
						<p className="text-sm text-muted-foreground">
							Ranked by sales volume this month
						</p>
					</div>
					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
						{products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
