'use client';

import { Grid3X3, Package, TrendingUp } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type CategoryData = {
	category: string;
	products: {
		name: string;
		sales: number;
		stock: number;
	}[];
};

type ProductCellProps = {
	name: string;
	sales: number;
	stock: number;
	maxSales: number;
};

const getIntensityColor = (sales: number, maxSales: number, stock: number) => {
	const ratio = sales / maxSales;
	const isLowStock = stock < 50;

	if (isLowStock) {
		if (ratio > 0.6) return 'bg-rose-500/80 text-rose-50';
		return 'bg-amber-500/60 text-amber-50';
	}

	if (ratio > 0.8) return 'bg-primary text-primary-foreground';
	if (ratio > 0.6) return 'bg-primary/80 text-primary-foreground';
	if (ratio > 0.4) return 'bg-primary/60 text-primary-foreground';
	if (ratio > 0.2) return 'bg-primary/40 text-foreground';
	return 'bg-primary/20 text-foreground';
};

const ProductCell = ({ name, sales, stock, maxSales }: ProductCellProps) => (
	<div
		className={`rounded-lg p-3 ${getIntensityColor(sales, maxSales, stock)}`}
		title={`${name}: ${sales} sales, ${stock} in stock`}
	>
		<p className="truncate text-xs font-medium">{name}</p>
		<p className="text-lg font-bold">{sales}</p>
		<p className="text-xs opacity-75">{stock} in stock</p>
	</div>
);

export default function Main() {
	const categories: CategoryData[] = [
		{
			category: 'Electronics',
			products: [
				{ name: 'Wireless Earbuds', sales: 1250, stock: 85 },
				{ name: 'Smart Watch', sales: 980, stock: 32 },
				{ name: 'Phone Case', sales: 1450, stock: 245 },
				{ name: 'Charger', sales: 720, stock: 180 },
			],
		},
		{
			category: 'Clothing',
			products: [
				{ name: 'T-Shirts', sales: 1850, stock: 420 },
				{ name: 'Jeans', sales: 920, stock: 18 },
				{ name: 'Sneakers', sales: 680, stock: 95 },
				{ name: 'Jackets', sales: 450, stock: 62 },
			],
		},
		{
			category: 'Home & Garden',
			products: [
				{ name: 'Plant Pots', sales: 580, stock: 210 },
				{ name: 'LED Lights', sales: 920, stock: 45 },
				{ name: 'Throw Pillows', sales: 750, stock: 128 },
				{ name: 'Wall Art', sales: 420, stock: 85 },
			],
		},
		{
			category: 'Sports',
			products: [
				{ name: 'Yoga Mat', sales: 1120, stock: 92 },
				{ name: 'Dumbbells', sales: 650, stock: 28 },
				{ name: 'Running Shoes', sales: 890, stock: 65 },
				{ name: 'Water Bottle', sales: 1380, stock: 315 },
			],
		},
	];

	const allProducts = categories.flatMap((c) => c.products);
	const maxSales = Math.max(...allProducts.map((p) => p.sales));

	const summaryStats = [
		{ label: 'Total Sales', value: '13,010', subtext: 'This month' },
		{ label: 'Low Stock Items', value: '4', subtext: 'Need restock' },
		{ label: 'Top Category', value: 'Clothing', subtext: '3,900 sales' },
		{ label: 'Top Product', value: 'T-Shirts', subtext: '1,850 sales' },
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div className="flex items-start gap-3">
							<div className="rounded-lg bg-primary/10 p-2">
								<Grid3X3 className="size-5 text-primary" />
							</div>
							<div>
								<CardTitle className="text-lg @sm:text-xl">
									Product Performance Heatmap
								</CardTitle>
								<CardDescription>
									Sales volume and stock levels by category
								</CardDescription>
							</div>
						</div>
						<div className="flex gap-2">
							<Badge variant="outline" className="bg-rose-500/10 text-rose-500">
								Low Stock Alert
							</Badge>
							<Badge className="bg-primary/20 text-primary">
								<TrendingUp className="mr-1 size-3" />
								+12%
							</Badge>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
							{summaryStats.map((s, i) => (
								<Card key={i} className="border-border/30 bg-muted/20">
									<CardContent className="p-4">
										<p className="text-sm text-muted-foreground">{s.label}</p>
										<p className="mt-1 text-xl font-bold">{s.value}</p>
										<p className="text-xs text-muted-foreground">{s.subtext}</p>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="space-y-4">
							{categories.map((cat, catIndex) => (
								<Card key={catIndex} className="border-border/30 bg-muted/10">
									<CardContent className="p-4">
										<p className="mb-3 font-medium">{cat.category}</p>
										<div className="grid gap-3 @sm:grid-cols-2 @lg:grid-cols-4">
											{cat.products.map((prod, prodIndex) => (
												<ProductCell
													key={prodIndex}
													{...prod}
													maxSales={maxSales}
												/>
											))}
										</div>
									</CardContent>
								</Card>
							))}
						</div>
						<div className="flex items-center justify-center gap-4 text-sm">
							<div className="flex items-center gap-2">
								<div className="size-4 rounded bg-primary/20" />
								<span className="text-muted-foreground">Low Sales</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="size-4 rounded bg-primary" />
								<span className="text-muted-foreground">High Sales</span>
							</div>
							<div className="flex items-center gap-2">
								<div className="size-4 rounded bg-rose-500/80" />
								<span className="text-muted-foreground">Low Stock</span>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
