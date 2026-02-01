'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Product = {
	name: string;
	category: string;
	price: number;
	sales: number;
	stock: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
};

const ProductRow = ({ product }: { product: Product }) => (
	<TableRow className="hover:bg-muted/30">
		<TableCell className="font-medium">{product.name}</TableCell>
		<TableCell>{product.category}</TableCell>
		<TableCell>${product.price.toFixed(2)}</TableCell>
		<TableCell>{product.sales.toLocaleString()}</TableCell>
		<TableCell>{product.stock}</TableCell>
		<TableCell>
			<Badge
				variant="outline"
				className={
					product.status === 'in-stock'
						? 'text-emerald-500 border-emerald-500/30'
						: product.status === 'low-stock'
							? 'text-amber-500 border-amber-500/30'
							: 'text-rose-500 border-rose-500/30'
				}
			>
				{product.status === 'in-stock'
					? 'In Stock'
					: product.status === 'low-stock'
						? 'Low Stock'
						: 'Out of Stock'}
			</Badge>
		</TableCell>
	</TableRow>
);

const products: Product[] = [
	{
		name: 'Wireless Headphones Pro',
		category: 'Electronics',
		price: 149.99,
		sales: 1245,
		stock: 58,
		status: 'in-stock',
	},
	{
		name: 'Smart Watch Ultra',
		category: 'Electronics',
		price: 299.99,
		sales: 892,
		stock: 12,
		status: 'low-stock',
	},
	{
		name: 'Portable Speaker',
		category: 'Electronics',
		price: 79.99,
		sales: 2156,
		stock: 0,
		status: 'out-of-stock',
	},
	{
		name: 'Bluetooth Earbuds',
		category: 'Electronics',
		price: 59.99,
		sales: 3421,
		stock: 124,
		status: 'in-stock',
	},
	{
		name: 'Gaming Mouse RGB',
		category: 'Accessories',
		price: 49.99,
		sales: 1876,
		stock: 45,
		status: 'in-stock',
	},
	{
		name: 'Mechanical Keyboard',
		category: 'Accessories',
		price: 129.99,
		sales: 987,
		stock: 8,
		status: 'low-stock',
	},
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium">
							Product Inventory
						</CardTitle>
						<p className="text-xs text-muted-foreground">
							Stock levels and sales performance
						</p>
					</CardHeader>
					<CardContent>
						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead>Category</TableHead>
										<TableHead>Price</TableHead>
										<TableHead>Sales</TableHead>
										<TableHead>Stock</TableHead>
										<TableHead>Status</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{products.map((product, i) => (
										<ProductRow key={i} product={product} />
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
