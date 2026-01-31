'use client';

import * as React from 'react';
import {
	MoreVertical,
	ChevronDown,
	Search,
	Download,
	Upload,
	Package,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	DropdownMenuSeparator,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	comparePrice?: number;
	stock: number;
	sold: number;
	status: 'published' | 'pending' | 'out-of-stock';
	trend: 'up' | 'down' | 'stable';
}

interface ToolbarProps {
	searchPlaceholder: string;
	categoryLabel: string;
	categories: { value: string; label: string }[];
	exportLabel: string;
	importLabel: string;
}

const Toolbar = ({
	searchPlaceholder,
	categoryLabel,
	categories,
	exportLabel,
	importLabel,
}: ToolbarProps) => (
	<div className="flex flex-col gap-3 border-b p-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex flex-col gap-2 @sm:flex-row @sm:items-center">
			<div className="relative">
				<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-72" />
			</div>
			<Select>
				<SelectTrigger className="w-full @sm:w-40">
					<SelectValue placeholder={categoryLabel} />
				</SelectTrigger>
				<SelectContent>
					{categories.map((cat) => (
						<SelectItem key={cat.value} value={cat.value}>
							{cat.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
		<div className="flex gap-2">
			<Button variant="outline" size="sm">
				<Upload className="size-4" />
				{importLabel}
			</Button>
			<Button variant="outline" size="sm">
				<Download className="size-4" />
				{exportLabel}
			</Button>
		</div>
	</div>
);

interface StatusBadgeProps {
	status: 'published' | 'pending' | 'out-of-stock';
	labels: Record<'published' | 'pending' | 'out-of-stock', string>;
}

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<'published' | 'pending' | 'out-of-stock', 'default' | 'secondary' | 'destructive'> = {
		published: 'default',
		pending: 'secondary',
		'out-of-stock': 'destructive',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

interface TrendIndicatorProps {
	trend: 'up' | 'down' | 'stable';
	value: number;
}

const TrendIndicator = ({ trend, value }: TrendIndicatorProps) => (
	<div className="flex items-center gap-1">
		{trend === 'up' && <TrendingUp className="size-3.5 text-emerald-500" />}
		{trend === 'down' && <TrendingDown className="size-3.5 text-red-500" />}
		<span
			className={
				trend === 'up'
					? 'text-emerald-500'
					: trend === 'down'
						? 'text-red-500'
						: 'text-muted-foreground'
			}
		>
			{value}
		</span>
	</div>
);

interface StockProgressProps {
	stock: number;
	maxStock: number;
}

const StockProgress = ({ stock, maxStock }: StockProgressProps) => {
	const percentage = Math.min((stock / maxStock) * 100, 100);
	return (
		<div className="flex items-center gap-2">
			<Progress value={percentage} className="h-2 w-20" />
			<span className="text-sm text-muted-foreground">{stock}</span>
		</div>
	);
};

interface ProductRowProps {
	product: Product;
	actions: { label: string; onClick: (id: string) => void; separator?: boolean }[];
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
}

const ProductRow = ({ product, actions, selected, onSelect }: ProductRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(product.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<div className="font-medium leading-none">{product.name}</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<div className="space-y-0.5">
				<div className="font-semibold">${product.price.toFixed(2)}</div>
				{product.comparePrice && (
					<div className="text-xs text-muted-foreground line-through">
						${product.comparePrice.toFixed(2)}
					</div>
				)}
			</div>
		</TableCell>
		<TableCell>
			<StockProgress stock={product.stock} maxStock={500} />
		</TableCell>
		<TableCell>
			<TrendIndicator trend={product.trend} value={product.sold} />
		</TableCell>
		<TableCell>
			<StatusBadge
				status={product.status}
				labels={{
					published: 'Published',
					pending: 'Pending',
					'out-of-stock': 'Out of Stock',
				}}
			/>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreVertical className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action, idx) => (
						<React.Fragment key={action.label}>
							{action.separator && <DropdownMenuSeparator />}
							<DropdownMenuItem onClick={() => action.onClick(product.id)}>
								{action.label}
							</DropdownMenuItem>
						</React.Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

interface BulkActionsProps {
	selectedCount: number;
	actions: { label: string; onClick: () => void }[];
	clearLabel: string;
	onClear: () => void;
}

const BulkActions = ({ selectedCount, actions, clearLabel, onClear }: BulkActionsProps) => (
	<div className="flex items-center justify-between border-t bg-muted/50 px-4 py-3">
		<span className="text-sm text-muted-foreground">
			{selectedCount} selected
		</span>
		<div className="flex gap-2">
			<Button variant="ghost" size="sm" onClick={onClear}>
				{clearLabel}
			</Button>
			{actions.map((action) => (
				<Button key={action.label} variant="outline" size="sm" onClick={action.onClick}>
					{action.label}
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const products: Product[] = [
		{
			id: '1',
			name: 'Ultra HD 4K Monitor 32"',
			sku: 'MON-4K-32',
			image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=100&h=100&fit=crop',
			price: 599.99,
			comparePrice: 749.99,
			stock: 45,
			sold: 128,
			status: 'published',
			trend: 'up',
		},
		{
			id: '2',
			name: 'Mechanical Gaming Keyboard',
			sku: 'KEY-MEC-01',
			image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
			price: 179.99,
			stock: 234,
			sold: 89,
			status: 'published',
			trend: 'stable',
		},
		{
			id: '3',
			name: 'Ergonomic Office Chair',
			sku: 'CHR-ERG-05',
			image: 'https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=100&h=100&fit=crop',
			price: 449.99,
			comparePrice: 549.99,
			stock: 12,
			sold: 56,
			status: 'pending',
			trend: 'up',
		},
		{
			id: '4',
			name: 'Wireless Gaming Mouse',
			sku: 'MOU-WIR-03',
			image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
			price: 89.99,
			stock: 0,
			sold: 342,
			status: 'out-of-stock',
			trend: 'down',
		},
		{
			id: '5',
			name: 'USB-C Docking Station',
			sku: 'DOC-USB-12',
			image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=100&h=100&fit=crop',
			price: 199.99,
			stock: 78,
			sold: 167,
			status: 'published',
			trend: 'up',
		},
	];

	const categories = [
		{ value: 'all', label: 'All Categories' },
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'furniture', label: 'Furniture' },
		{ value: 'accessories', label: 'Accessories' },
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit Product', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Duplicate', onClick: (id: string) => console.log('Duplicate', id) },
		{ label: 'Delete', onClick: (id: string) => console.log('Delete', id), separator: true },
	];

	const bulkActions = [
		{ label: 'Publish', onClick: () => console.log('Bulk publish') },
		{ label: 'Archive', onClick: () => console.log('Bulk archive') },
		{ label: 'Delete', onClick: () => console.log('Bulk delete') },
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

	const columns = ['Product', 'Price', 'Inventory', 'Sold', 'Status'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-lg border bg-card">
					<Toolbar
						searchPlaceholder="Search by name or SKU..."
						categoryLabel="Category"
						categories={categories}
						exportLabel="Export"
						importLabel="Import"
					/>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-12">
									<Checkbox />
								</TableHead>
								{columns.map((column) => (
									<TableHead key={column}>{column}</TableHead>
								))}
								<TableHead className="w-12" />
							</TableRow>
						</TableHeader>
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
					{selectedIds.size > 0 && (
						<BulkActions
							selectedCount={selectedIds.size}
							actions={bulkActions}
							clearLabel="Clear selection"
							onClear={() => setSelectedIds(new Set())}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
