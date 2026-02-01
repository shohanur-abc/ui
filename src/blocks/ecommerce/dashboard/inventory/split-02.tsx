'use client';

import * as React from 'react';
import {
	Package,
	Search,
	Filter,
	ChevronRight,
	MoreVertical,
	Eye,
	Edit,
	Trash2,
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
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Product = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	status: 'in-stock' | 'low' | 'out';
	category: string;
	price: number;
	image?: string;
};

type ProductListItemProps = {
	product: Product;
	isSelected: boolean;
	onSelect: (id: string) => void;
};

const ProductListItem = ({
	product,
	isSelected,
	onSelect,
}: ProductListItemProps) => (
	<button
		onClick={() => onSelect(product.id)}
		className={`w-full flex items-center gap-4 p-4 text-left hover:bg-muted/50 transition-colors ${
			isSelected ? 'bg-primary/5 border-l-2 border-l-primary' : ''
		}`}
	>
		<div className="flex size-12 items-center justify-center rounded-lg bg-muted">
			<Package className="size-6 text-muted-foreground" />
		</div>
		<div className="flex-1 min-w-0">
			<p className="font-medium truncate">{product.name}</p>
			<p className="text-sm text-muted-foreground">{product.sku}</p>
		</div>
		<div className="text-right">
			<p className="font-medium">{product.stock}</p>
			<Badge
				variant={
					product.status === 'in-stock'
						? 'default'
						: product.status === 'low'
							? 'secondary'
							: 'destructive'
				}
				className="text-xs"
			>
				{product.status}
			</Badge>
		</div>
		<ChevronRight className="size-5 text-muted-foreground" />
	</button>
);

type ProductDetailProps = {
	product: Product | null;
};

const ProductDetail = ({ product }: ProductDetailProps) => {
	if (!product) {
		return (
			<div className="flex h-full items-center justify-center text-muted-foreground">
				<div className="text-center">
					<Package className="mx-auto size-12 opacity-50" />
					<p className="mt-4">Select a product to view details</p>
				</div>
			</div>
		);
	}

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-4">
					<div className="flex size-16 items-center justify-center rounded-xl bg-muted">
						<Package className="size-8 text-muted-foreground" />
					</div>
					<div>
						<h3 className="text-xl font-semibold">{product.name}</h3>
						<p className="text-muted-foreground">{product.sku}</p>
					</div>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<MoreVertical className="size-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Eye className="mr-2 size-4" />
							View
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Edit className="mr-2 size-4" />
							Edit
						</DropdownMenuItem>
						<DropdownMenuItem className="text-destructive">
							<Trash2 className="mr-2 size-4" />
							Delete
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="grid gap-4 @sm:grid-cols-2">
				<div className="rounded-lg border p-4">
					<p className="text-sm text-muted-foreground">Current Stock</p>
					<p className="text-2xl font-bold">{product.stock}</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-sm text-muted-foreground">Price</p>
					<p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-sm text-muted-foreground">Category</p>
					<p className="text-lg font-medium">{product.category}</p>
				</div>
				<div className="rounded-lg border p-4">
					<p className="text-sm text-muted-foreground">Status</p>
					<Badge
						variant={
							product.status === 'in-stock'
								? 'default'
								: product.status === 'low'
									? 'secondary'
									: 'destructive'
						}
						className="mt-1"
					>
						{product.status === 'in-stock'
							? 'In Stock'
							: product.status === 'low'
								? 'Low Stock'
								: 'Out of Stock'}
					</Badge>
				</div>
			</div>

			<div className="flex gap-3">
				<Button className="flex-1">Update Stock</Button>
				<Button variant="outline" className="flex-1">
					View History
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [selectedId, setSelectedId] = React.useState<string>('1');

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			stock: 245,
			status: 'in-stock',
			category: 'Electronics',
			price: 79.99,
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			stock: 12,
			status: 'low',
			category: 'Electronics',
			price: 29.99,
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			stock: 567,
			status: 'in-stock',
			category: 'Accessories',
			price: 19.99,
		},
		{
			id: '4',
			name: 'Wireless Mouse',
			sku: 'WM-001',
			stock: 0,
			status: 'out',
			category: 'Electronics',
			price: 49.99,
		},
		{
			id: '5',
			name: 'Laptop Stand',
			sku: 'LS-001',
			stock: 89,
			status: 'in-stock',
			category: 'Accessories',
			price: 59.99,
		},
		{
			id: '6',
			name: 'Keyboard Mechanical',
			sku: 'KM-001',
			stock: 34,
			status: 'low',
			category: 'Electronics',
			price: 129.99,
		},
	];

	const selectedProduct = products.find((p) => p.id === selectedId) || null;

	const filteredProducts = products.filter(
		(p) =>
			p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			p.sku.toLowerCase().includes(searchQuery.toLowerCase()),
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card className="overflow-hidden">
					<div className="grid @lg:grid-cols-[360px_1fr]">
						<div className="border-r">
							<div className="border-b p-4">
								<div className="relative">
									<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
									<Input
										value={searchQuery}
										onChange={(e) => setSearchQuery(e.target.value)}
										placeholder="Search products..."
										className="pl-9"
									/>
								</div>
							</div>
							<ScrollArea className="h-96">
								<div className="divide-y">
									{filteredProducts.map((product) => (
										<ProductListItem
											key={product.id}
											product={product}
											isSelected={product.id === selectedId}
											onSelect={setSelectedId}
										/>
									))}
								</div>
							</ScrollArea>
						</div>
						<ProductDetail product={selectedProduct} />
					</div>
				</Card>
			</div>
		</section>
	);
}
