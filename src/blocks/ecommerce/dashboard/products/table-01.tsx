'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	ArrowUpDown,
	Search,
	Filter,
	Plus,
	Package,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	stock: number;
	status: 'active' | 'draft' | 'archived';
	category: string;
}

interface HeaderProps {
	title: string;
	description: string;
	addButtonLabel: string;
	searchPlaceholder: string;
	filterLabel: string;
	onAdd?: () => void;
}

interface ProductRowProps {
	product: Product;
	actions: { label: string; onClick: (id: string) => void }[];
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
}

interface StatusBadgeProps {
	status: 'active' | 'draft' | 'archived';
	labels: Record<'active' | 'draft' | 'archived', string>;
}

const Header = ({
	title,
	description,
	addButtonLabel,
	searchPlaceholder,
	filterLabel,
	onAdd,
}: HeaderProps) => (
	<div className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<h2 className="text-xl font-semibold tracking-tight @lg:text-2xl">
				{title}
			</h2>
			<p className="text-sm text-muted-foreground">{description}</p>
		</div>
		<div className="flex flex-col gap-2 @sm:flex-row @sm:items-center">
			<div className="relative">
				<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input
					placeholder={searchPlaceholder}
					className="w-full pl-9 @sm:w-64"
				/>
			</div>
			<Button variant="outline" size="default">
				<Filter className="size-4" />
				{filterLabel}
			</Button>
			<Button onClick={onAdd}>
				<Plus className="size-4" />
				{addButtonLabel}
			</Button>
		</div>
	</div>
);

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<
		'active' | 'draft' | 'archived',
		'default' | 'secondary' | 'outline'
	> = {
		active: 'default',
		draft: 'secondary',
		archived: 'outline',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

const ProductRow = ({
	product,
	actions,
	selected,
	onSelect,
}: ProductRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(product.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<Avatar className="size-10 rounded-md">
					<AvatarImage src={product.image} alt={product.name} />
					<AvatarFallback className="rounded-md">
						<Package className="size-5" />
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{product.name}</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>{product.category}</TableCell>
		<TableCell className="font-medium">${product.price.toFixed(2)}</TableCell>
		<TableCell>{product.stock}</TableCell>
		<TableCell>
			<StatusBadge
				status={product.status}
				labels={{ active: 'Active', draft: 'Draft', archived: 'Archived' }}
			/>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action) => (
						<DropdownMenuItem
							key={action.label}
							onClick={() => action.onClick(product.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

interface ColumnHeader {
	key: string;
	label: string;
	sortable?: boolean;
}

interface ProductTableProps {
	columns: ColumnHeader[];
	onSort?: (key: string) => void;
}

const ProductTableHeader = ({ columns, onSort }: ProductTableProps) => (
	<TableHeader>
		<TableRow>
			<TableHead className="w-12">
				<Checkbox />
			</TableHead>
			{columns.map((column) => (
				<TableHead key={column.key}>
					{column.sortable ? (
						<Button
							variant="ghost"
							size="sm"
							className="-ml-3 h-8 gap-1"
							onClick={() => onSort?.(column.key)}
						>
							{column.label}
							<ArrowUpDown className="size-3.5" />
						</Button>
					) : (
						column.label
					)}
				</TableHead>
			))}
			<TableHead className="w-12" />
		</TableRow>
	</TableHeader>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones',
			sku: 'WBH-001',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 149.99,
			stock: 234,
			status: 'active',
			category: 'Electronics',
		},
		{
			id: '2',
			name: 'Premium Leather Wallet',
			sku: 'PLW-002',
			image:
				'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&h=100&fit=crop',
			price: 79.99,
			stock: 156,
			status: 'active',
			category: 'Accessories',
		},
		{
			id: '3',
			name: 'Smart Fitness Watch',
			sku: 'SFW-003',
			image:
				'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&h=100&fit=crop',
			price: 299.99,
			stock: 89,
			status: 'draft',
			category: 'Electronics',
		},
		{
			id: '4',
			name: 'Organic Cotton T-Shirt',
			sku: 'OCT-004',
			image:
				'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop',
			price: 34.99,
			stock: 0,
			status: 'archived',
			category: 'Apparel',
		},
		{
			id: '5',
			name: 'Stainless Steel Water Bottle',
			sku: 'SSW-005',
			image:
				'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&h=100&fit=crop',
			price: 24.99,
			stock: 432,
			status: 'active',
			category: 'Lifestyle',
		},
	];

	const columns: ColumnHeader[] = [
		{ key: 'name', label: 'Product', sortable: true },
		{ key: 'category', label: 'Category', sortable: true },
		{ key: 'price', label: 'Price', sortable: true },
		{ key: 'stock', label: 'Stock', sortable: true },
		{ key: 'status', label: 'Status', sortable: false },
	];

	const actions = [
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Duplicate',
			onClick: (id: string) => console.log('Duplicate', id),
		},
		{ label: 'Archive', onClick: (id: string) => console.log('Archive', id) },
		{ label: 'Delete', onClick: (id: string) => console.log('Delete', id) },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) {
			newSet.add(id);
		} else {
			newSet.delete(id);
		}
		setSelectedIds(newSet);
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<Header
					title="Products"
					description="Manage your product inventory and listings"
					addButtonLabel="Add Product"
					searchPlaceholder="Search products..."
					filterLabel="Filter"
				/>
				<div className="rounded-lg border bg-card">
					<Table>
						<ProductTableHeader columns={columns} />
						<TableBody>
							{products.map((product) => (
								<ProductRow
									key={product.id}
									product={product}
									actions={actions}
									selected={selectedIds.has(product.id)}
									onSelect={handleSelect}
								/>
							))}
						</TableBody>
					</Table>
				</div>
			</div>
		</section>
	);
}
