'use client';

import * as React from 'react';
import {
	Package,
	Filter,
	Tag,
	MapPin,
	Layers,
	Image as ImageIcon,
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
import { Checkbox } from '@/components/ui/checkbox';

type Product = {
	id: string;
	name: string;
	sku: string;
	category: string;
	stock: number;
	price: number;
	image?: string;
	location: string;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
};

type ProductCardProps = {
	product: Product;
	isSelected: boolean;
	onSelect: (id: string) => void;
};

const ProductCard = ({ product, isSelected, onSelect }: ProductCardProps) => {
	const statusConfig = {
		'in-stock': { label: 'In Stock', color: 'bg-emerald-500' },
		'low-stock': { label: 'Low Stock', color: 'bg-amber-500' },
		'out-of-stock': { label: 'Out of Stock', color: 'bg-destructive' },
	};

	const { label, color } = statusConfig[product.status];

	return (
		<Card
			className={`transition-all ${isSelected ? 'ring-2 ring-primary' : ''}`}
		>
			<CardContent className="p-4">
				<div className="flex items-start gap-3">
					<Checkbox
						checked={isSelected}
						onCheckedChange={() => onSelect(product.id)}
					/>
					<div className="flex size-16 items-center justify-center rounded-lg bg-muted">
						<ImageIcon className="size-8 text-muted-foreground" />
					</div>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-2">
							<p className="truncate font-medium">{product.name}</p>
							<span className={`size-2 rounded-full ${color}`} />
						</div>
						<p className="text-xs text-muted-foreground">{product.sku}</p>
						<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
							<div className="flex items-center gap-1">
								<Layers className="size-3" />
								{product.category}
							</div>
							<span>•</span>
							<div className="flex items-center gap-1">
								<MapPin className="size-3" />
								{product.location}
							</div>
						</div>
					</div>
				</div>
				<div className="mt-4 flex items-center justify-between border-t pt-4">
					<div>
						<p className="text-xs text-muted-foreground">Stock</p>
						<p className="font-semibold">{product.stock}</p>
					</div>
					<div className="text-right">
						<p className="text-xs text-muted-foreground">Price</p>
						<p className="font-semibold">${product.price}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

type SelectionToolbarProps = {
	selectedCount: number;
	totalCount: number;
	onSelectAll: () => void;
	onClearSelection: () => void;
};

const SelectionToolbar = ({
	selectedCount,
	totalCount,
	onSelectAll,
	onClearSelection,
}: SelectionToolbarProps) => (
	<div className="flex items-center justify-between rounded-lg border bg-muted/50 p-3">
		<div className="flex items-center gap-3">
			<Checkbox
				checked={selectedCount === totalCount}
				onCheckedChange={() =>
					selectedCount === totalCount ? onClearSelection() : onSelectAll()
				}
			/>
			<span className="text-sm">
				{selectedCount} of {totalCount} selected
			</span>
		</div>
		{selectedCount > 0 && (
			<div className="flex gap-2">
				<Button variant="outline" size="sm">
					Bulk Edit
				</Button>
				<Button variant="outline" size="sm">
					Update Stock
				</Button>
				<Button variant="outline" size="sm">
					Export
				</Button>
			</div>
		)}
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones',
			sku: 'WBH-001',
			category: 'Electronics',
			stock: 145,
			price: 89.99,
			location: 'WH-001',
			status: 'in-stock',
		},
		{
			id: '2',
			name: 'USB-C Fast Charging Cable',
			sku: 'USB-002',
			category: 'Accessories',
			stock: 23,
			price: 14.99,
			location: 'WH-001',
			status: 'low-stock',
		},
		{
			id: '3',
			name: 'Portable Power Bank 20000mAh',
			sku: 'PPB-003',
			category: 'Electronics',
			stock: 0,
			price: 49.99,
			location: 'WH-002',
			status: 'out-of-stock',
		},
		{
			id: '4',
			name: 'Premium Phone Case - Clear',
			sku: 'PPC-004',
			category: 'Accessories',
			stock: 289,
			price: 24.99,
			location: 'WH-001',
			status: 'in-stock',
		},
		{
			id: '5',
			name: 'Wireless Charging Pad',
			sku: 'WCP-005',
			category: 'Electronics',
			stock: 67,
			price: 34.99,
			location: 'WH-002',
			status: 'in-stock',
		},
		{
			id: '6',
			name: 'Bluetooth Speaker Mini',
			sku: 'BSM-006',
			category: 'Electronics',
			stock: 12,
			price: 39.99,
			location: 'WH-001',
			status: 'low-stock',
		},
	];

	const handleSelect = (id: string) => {
		setSelectedIds((prev) =>
			prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
		);
	};

	const handleSelectAll = () => {
		setSelectedIds(products.map((p) => p.id));
	};

	const handleClearSelection = () => {
		setSelectedIds([]);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">
								Product Grid
							</h2>
							<p className="text-sm text-muted-foreground">
								Select products for bulk actions
							</p>
						</div>
						<Button variant="outline">
							<Filter className="mr-2 size-4" />
							Filters
						</Button>
					</div>

					<SelectionToolbar
						selectedCount={selectedIds.length}
						totalCount={products.length}
						onSelectAll={handleSelectAll}
						onClearSelection={handleClearSelection}
					/>

					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
						{products.map((product) => (
							<ProductCard
								key={product.id}
								product={product}
								isSelected={selectedIds.includes(product.id)}
								onSelect={handleSelect}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
