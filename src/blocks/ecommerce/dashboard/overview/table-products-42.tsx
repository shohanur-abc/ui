import {
	ArrowRight,
	ArrowUpRight,
	Box,
	DollarSign,
	MoreHorizontal,
	Package,
	Star,
	TrendingUp,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type KpiItem = {
	title: string;
	value: string;
	change: string;
	icon: LucideIcon;
};

type ProductRow = {
	id: string;
	name: string;
	category: string;
	price: string;
	stock: number;
	sold: number;
	revenue: string;
	rating: number;
	status: 'active' | 'low-stock' | 'out-of-stock';
	image: string;
};

const KpiMini = ({ title, value, change, icon: Icon }: KpiItem) => (
	<div className="flex items-center gap-3 rounded-xl border bg-card p-4">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-4 text-primary" />
		</div>
		<div className="flex-1">
			<p className="text-xs text-muted-foreground">{title}</p>
			<p className="text-lg font-bold">{value}</p>
		</div>
		<span className="flex items-center text-xs text-emerald-500">
			<ArrowUpRight className="size-3" />
			{change}
		</span>
	</div>
);

const getStatusStyle = (status: ProductRow['status']) => {
	switch (status) {
		case 'active':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'low-stock':
			return 'bg-amber-500/10 text-amber-500';
		case 'out-of-stock':
			return 'bg-red-500/10 text-red-500';
	}
};

export default function Main() {
	const kpis: KpiItem[] = [
		{ title: 'Total Products', value: '1,247', change: '+12', icon: Package },
		{ title: 'Total Revenue', value: '$89.4k', change: '+24%', icon: DollarSign },
		{ title: 'Avg Rating', value: '4.6', change: '+0.2', icon: Star },
		{ title: 'Low Stock', value: '18', change: '-5', icon: Box },
	];

	const products: ProductRow[] = [
		{ id: 'PRD-001', name: 'Wireless Headphones Pro', category: 'Electronics', price: '$129.99', stock: 45, sold: 432, revenue: '$56,157', rating: 4.8, status: 'active', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80' },
		{ id: 'PRD-002', name: 'Smart Watch Ultra', category: 'Electronics', price: '$299.99', stock: 12, sold: 324, revenue: '$97,197', rating: 4.7, status: 'low-stock', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=80' },
		{ id: 'PRD-003', name: 'Ergonomic Laptop Stand', category: 'Accessories', price: '$79.99', stock: 78, sold: 287, revenue: '$22,957', rating: 4.9, status: 'active', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=80' },
		{ id: 'PRD-004', name: 'Mechanical Keyboard', category: 'Electronics', price: '$159.99', stock: 0, sold: 156, revenue: '$24,958', rating: 4.6, status: 'out-of-stock', image: '' },
		{ id: 'PRD-005', name: 'USB-C Hub 7-in-1', category: 'Accessories', price: '$49.99', stock: 234, sold: 512, revenue: '$25,595', rating: 4.5, status: 'active', image: '' },
		{ id: 'PRD-006', name: 'Noise Cancelling Earbuds', category: 'Electronics', price: '$89.99', stock: 8, sold: 189, revenue: '$17,008', rating: 4.4, status: 'low-stock', image: '' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<KpiMini key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Product Inventory</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/products">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead className="hidden @lg:table-cell">Category</TableHead>
										<TableHead>Price</TableHead>
										<TableHead className="hidden @xl:table-cell">Stock</TableHead>
										<TableHead className="hidden @lg:table-cell">Sold</TableHead>
										<TableHead>Revenue</TableHead>
										<TableHead className="hidden @xl:table-cell">Rating</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{products.map((product) => (
										<TableRow key={product.id}>
											<TableCell>
												<div className="flex items-center gap-3">
													<div className="size-10 overflow-hidden rounded-lg bg-muted">
														{product.image && (
															<img
																src={product.image}
																alt={product.name}
																className="size-full object-cover"
															/>
														)}
													</div>
													<div>
														<p className="font-medium">{product.name}</p>
														<p className="text-xs text-muted-foreground">{product.id}</p>
													</div>
												</div>
											</TableCell>
											<TableCell className="hidden @lg:table-cell">{product.category}</TableCell>
											<TableCell className="font-medium">{product.price}</TableCell>
											<TableCell className="hidden @xl:table-cell">{product.stock}</TableCell>
											<TableCell className="hidden @lg:table-cell">{product.sold}</TableCell>
											<TableCell className="font-medium">{product.revenue}</TableCell>
											<TableCell className="hidden @xl:table-cell">
												<div className="flex items-center gap-1 text-amber-500">
													<Star className="size-3 fill-current" />
													{product.rating}
												</div>
											</TableCell>
											<TableCell>
												<Badge variant="secondary" className={getStatusStyle(product.status)}>
													{product.status.replace('-', ' ')}
												</Badge>
											</TableCell>
											<TableCell>
												<Button variant="ghost" size="icon" className="size-8">
													<MoreHorizontal className="size-4" />
												</Button>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
