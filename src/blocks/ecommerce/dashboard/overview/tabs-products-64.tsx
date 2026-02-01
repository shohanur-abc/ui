import {
	ArrowUpRight,
	MoreHorizontal,
	Package,
	ShoppingCart,
	Star,
	type LucideIcon,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type ProductItem = {
	id: string;
	name: string;
	category: string;
	price: string;
	stock: number;
	sold: number;
	revenue: string;
	rating: number;
	status: 'active' | 'low-stock' | 'out-of-stock';
};

const getStatusStyle = (status: ProductItem['status']) => {
	switch (status) {
		case 'active':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'low-stock':
			return 'bg-amber-500/10 text-amber-500';
		case 'out-of-stock':
			return 'bg-red-500/10 text-red-500';
	}
};

const ProductRow = (product: ProductItem) => (
	<TableRow>
		<TableCell>
			<div>
				<p className="font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.id}</p>
			</div>
		</TableCell>
		<TableCell className="hidden @lg:table-cell">{product.category}</TableCell>
		<TableCell>{product.price}</TableCell>
		<TableCell className="hidden @xl:table-cell">{product.stock}</TableCell>
		<TableCell>{product.sold}</TableCell>
		<TableCell className="hidden @lg:table-cell">{product.revenue}</TableCell>
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
);

export default function Main() {
	const allProducts: ProductItem[] = [
		{
			id: 'PRD-001',
			name: 'Wireless Headphones Pro',
			category: 'Electronics',
			price: '$129.99',
			stock: 45,
			sold: 432,
			revenue: '$56,157',
			rating: 4.8,
			status: 'active',
		},
		{
			id: 'PRD-002',
			name: 'Smart Watch Ultra',
			category: 'Electronics',
			price: '$299.99',
			stock: 12,
			sold: 324,
			revenue: '$97,197',
			rating: 4.7,
			status: 'low-stock',
		},
		{
			id: 'PRD-003',
			name: 'Ergonomic Laptop Stand',
			category: 'Accessories',
			price: '$79.99',
			stock: 78,
			sold: 287,
			revenue: '$22,957',
			rating: 4.9,
			status: 'active',
		},
		{
			id: 'PRD-004',
			name: 'Mechanical Keyboard',
			category: 'Electronics',
			price: '$159.99',
			stock: 0,
			sold: 156,
			revenue: '$24,958',
			rating: 4.6,
			status: 'out-of-stock',
		},
		{
			id: 'PRD-005',
			name: 'USB-C Hub 7-in-1',
			category: 'Accessories',
			price: '$49.99',
			stock: 234,
			sold: 512,
			revenue: '$25,595',
			rating: 4.5,
			status: 'active',
		},
	];

	const electronics = allProducts.filter((p) => p.category === 'Electronics');
	const accessories = allProducts.filter((p) => p.category === 'Accessories');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="size-5 text-primary" />
							Product Catalog
						</CardTitle>
						<CardDescription>Browse products by category</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="all">
									All Products ({allProducts.length})
								</TabsTrigger>
								<TabsTrigger value="electronics">
									Electronics ({electronics.length})
								</TabsTrigger>
								<TabsTrigger value="accessories">
									Accessories ({accessories.length})
								</TabsTrigger>
							</TabsList>
							<TabsContent value="all">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Category
											</TableHead>
											<TableHead>Price</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Stock
											</TableHead>
											<TableHead>Sold</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Revenue
											</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Rating
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{allProducts.map((product) => (
											<ProductRow key={product.id} {...product} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="electronics">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Category
											</TableHead>
											<TableHead>Price</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Stock
											</TableHead>
											<TableHead>Sold</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Revenue
											</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Rating
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{electronics.map((product) => (
											<ProductRow key={product.id} {...product} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
							<TabsContent value="accessories">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Product</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Category
											</TableHead>
											<TableHead>Price</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Stock
											</TableHead>
											<TableHead>Sold</TableHead>
											<TableHead className="hidden @lg:table-cell">
												Revenue
											</TableHead>
											<TableHead className="hidden @xl:table-cell">
												Rating
											</TableHead>
											<TableHead>Status</TableHead>
											<TableHead className="w-10"></TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{accessories.map((product) => (
											<ProductRow key={product.id} {...product} />
										))}
									</TableBody>
								</Table>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
