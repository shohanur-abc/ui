'use client';

import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Product = {
	id: string;
	name: string;
	image: string;
	category: string;
	price: number;
	unitsSold: number;
	revenue: number;
	trend: number;
	stock: 'in-stock' | 'low-stock' | 'out-of-stock';
};

type ProductTableCardProps = {
	title: string;
	description: string;
	products: Product[];
};

const getStockVariant = (stock: Product['stock']) => {
	switch (stock) {
		case 'in-stock':
			return 'default';
		case 'low-stock':
			return 'secondary';
		case 'out-of-stock':
			return 'destructive';
	}
};

const ProductTableCard = ({
	title,
	description,
	products,
}: ProductTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Package className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Category</TableHead>
							<TableHead className="text-right">Price</TableHead>
							<TableHead className="text-right">Units Sold</TableHead>
							<TableHead className="text-right">Revenue</TableHead>
							<TableHead className="text-right">Trend</TableHead>
							<TableHead>Stock</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{products.map((product) => (
							<TableRow
								key={product.id}
								className="hover:bg-muted/50 transition-colors"
							>
								<TableCell>
									<div className="flex items-center gap-3">
										<Avatar className="size-10 rounded-lg">
											<AvatarImage src={product.image} alt={product.name} />
											<AvatarFallback className="rounded-lg">
												{product.name.slice(0, 2)}
											</AvatarFallback>
										</Avatar>
										<div>
											<p className="font-medium">{product.name}</p>
											<p className="text-xs text-muted-foreground">
												{product.id}
											</p>
										</div>
									</div>
								</TableCell>
								<TableCell className="text-muted-foreground">
									{product.category}
								</TableCell>
								<TableCell className="text-right font-medium">
									${product.price}
								</TableCell>
								<TableCell className="text-right">
									{product.unitsSold.toLocaleString()}
								</TableCell>
								<TableCell className="text-right font-semibold">
									${product.revenue.toLocaleString()}
								</TableCell>
								<TableCell className="text-right">
									<span
										className={`inline-flex items-center gap-1 ${
											product.trend >= 0 ? 'text-primary' : 'text-destructive'
										}`}
									>
										{product.trend >= 0 ? (
											<TrendingUp className="size-3" />
										) : (
											<TrendingDown className="size-3" />
										)}
										{Math.abs(product.trend)}%
									</span>
								</TableCell>
								<TableCell>
									<Badge variant={getStockVariant(product.stock)}>
										{product.stock.replace('-', ' ')}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const products: Product[] = [
		{
			id: 'PRD-001',
			name: 'Wireless Headphones',
			image: '/placeholder.svg',
			category: 'Electronics',
			price: 199,
			unitsSold: 1250,
			revenue: 248750,
			trend: 12.5,
			stock: 'in-stock',
		},
		{
			id: 'PRD-002',
			name: 'Smart Watch Pro',
			image: '/placeholder.svg',
			category: 'Electronics',
			price: 349,
			unitsSold: 890,
			revenue: 310610,
			trend: 8.3,
			stock: 'low-stock',
		},
		{
			id: 'PRD-003',
			name: 'Laptop Stand',
			image: '/placeholder.svg',
			category: 'Accessories',
			price: 79,
			unitsSold: 2100,
			revenue: 165900,
			trend: -2.1,
			stock: 'in-stock',
		},
		{
			id: 'PRD-004',
			name: 'USB-C Hub',
			image: '/placeholder.svg',
			category: 'Accessories',
			price: 59,
			unitsSold: 1680,
			revenue: 99120,
			trend: 15.7,
			stock: 'out-of-stock',
		},
		{
			id: 'PRD-005',
			name: 'Mechanical Keyboard',
			image: '/placeholder.svg',
			category: 'Electronics',
			price: 149,
			unitsSold: 720,
			revenue: 107280,
			trend: -5.2,
			stock: 'in-stock',
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<ProductTableCard
					title="Top Selling Products"
					description="Best performing products by revenue"
					products={products}
				/>
			</div>
		</section>
	);
}
