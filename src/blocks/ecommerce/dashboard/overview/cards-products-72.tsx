import {
	ArrowUpRight,
	MoreHorizontal,
	Star,
	Package,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ProductCard = {
	id: string;
	name: string;
	category: string;
	price: string;
	revenue: string;
	sold: number;
	stock: number;
	rating: number;
	image: string;
	status: 'trending' | 'new' | 'sale' | 'regular';
};

const getStatusBadge = (status: ProductCard['status']) => {
	switch (status) {
		case 'trending':
			return <Badge className="bg-primary text-primary-foreground">Trending</Badge>;
		case 'new':
			return <Badge className="bg-emerald-500 text-white">New</Badge>;
		case 'sale':
			return <Badge className="bg-red-500 text-white">Sale</Badge>;
		default:
			return null;
	}
};

const ProductCardComponent = (product: ProductCard) => {
	const stockLevel = (product.stock / (product.stock + product.sold)) * 100;

	return (
		<Card className="overflow-hidden">
			<div className="relative aspect-square bg-muted">
				<div className="absolute left-2 top-2">
					{getStatusBadge(product.status)}
				</div>
				<div className="flex h-full items-center justify-center">
					<Package className="size-16 text-muted-foreground/50" />
				</div>
			</div>
			<CardContent className="p-4">
				<div className="flex items-start justify-between">
					<div>
						<p className="font-medium">{product.name}</p>
						<p className="text-xs text-muted-foreground">{product.category}</p>
					</div>
					<Button variant="ghost" size="icon" className="size-8">
						<MoreHorizontal className="size-4" />
					</Button>
				</div>
				<div className="mt-3 flex items-center gap-1 text-amber-500">
					<Star className="size-3.5 fill-current" />
					<span className="text-sm font-medium">{product.rating}</span>
					<span className="text-xs text-muted-foreground">({product.sold} sold)</span>
				</div>
				<div className="mt-3 grid grid-cols-2 gap-2 text-sm">
					<div>
						<p className="text-xs text-muted-foreground">Price</p>
						<p className="font-medium">{product.price}</p>
					</div>
					<div>
						<p className="text-xs text-muted-foreground">Revenue</p>
						<p className="font-medium">{product.revenue}</p>
					</div>
				</div>
				<div className="mt-3 space-y-1">
					<div className="flex items-center justify-between text-xs">
						<span className="text-muted-foreground">Stock</span>
						<span>{product.stock} units</span>
					</div>
					<Progress value={stockLevel} className="h-1.5" />
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const products: ProductCard[] = [
		{ id: 'PRD-001', name: 'Wireless Headphones Pro', category: 'Electronics', price: '$129.99', revenue: '$56,157', sold: 432, stock: 45, rating: 4.8, image: '', status: 'trending' },
		{ id: 'PRD-002', name: 'Smart Watch Ultra', category: 'Electronics', price: '$299.99', revenue: '$97,197', sold: 324, stock: 12, rating: 4.7, image: '', status: 'new' },
		{ id: 'PRD-003', name: 'Ergonomic Laptop Stand', category: 'Accessories', price: '$79.99', revenue: '$22,957', sold: 287, stock: 78, rating: 4.9, image: '', status: 'regular' },
		{ id: 'PRD-004', name: 'Mechanical Keyboard', category: 'Electronics', price: '$159.99', revenue: '$24,958', sold: 156, stock: 34, rating: 4.6, image: '', status: 'sale' },
		{ id: 'PRD-005', name: 'USB-C Hub 7-in-1', category: 'Accessories', price: '$49.99', revenue: '$25,595', sold: 512, stock: 234, rating: 4.5, image: '', status: 'trending' },
		{ id: 'PRD-006', name: 'Noise Cancelling Earbuds', category: 'Electronics', price: '$199.99', revenue: '$42,798', sold: 214, stock: 56, rating: 4.7, image: '', status: 'new' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
					{products.map((product) => (
						<ProductCardComponent key={product.id} {...product} />
					))}
				</div>
			</div>
		</section>
	);
}
