'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Package,
	Barcode,
	MapPin,
	AlertTriangle,
	ArrowDownToLine,
	ArrowUpFromLine,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface WarehouseStock {
	warehouseId: string;
	warehouseName: string;
	location: string;
	stock: number;
	reserved: number;
	available: number;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	barcode: string;
	image: string;
	warehouses: WarehouseStock[];
	totalStock: number;
	reorderPoint: number;
	maxStock: number;
}

interface ToolbarProps {
	searchPlaceholder: string;
	warehouseLabel: string;
	warehouses: { value: string; label: string }[];
	stockLabel: string;
	stockFilters: { value: string; label: string }[];
}

const Toolbar = ({
	searchPlaceholder,
	warehouseLabel,
	warehouses,
	stockLabel,
	stockFilters,
}: ToolbarProps) => (
	<div className="flex flex-col gap-3 border-b px-6 py-4 @md:flex-row @md:items-center">
		<div className="relative flex-1">
			<Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="pl-10" />
		</div>
		<div className="flex gap-2">
			<Select>
				<SelectTrigger className="w-40">
					<SelectValue placeholder={warehouseLabel} />
				</SelectTrigger>
				<SelectContent>
					{warehouses.map((wh) => (
						<SelectItem key={wh.value} value={wh.value}>
							{wh.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select>
				<SelectTrigger className="w-36">
					<SelectValue placeholder={stockLabel} />
				</SelectTrigger>
				<SelectContent>
					{stockFilters.map((filter) => (
						<SelectItem key={filter.value} value={filter.value}>
							{filter.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	</div>
);

interface StockLevelBarProps {
	current: number;
	reorderPoint: number;
	max: number;
}

const StockLevelBar = ({ current, reorderPoint, max }: StockLevelBarProps) => {
	const percentage = (current / max) * 100;
	const reorderPercentage = (reorderPoint / max) * 100;
	const isLow = current <= reorderPoint;

	return (
		<div className="relative w-32">
			<Progress
				value={percentage}
				className={`h-2 ${isLow ? '[&>div]:bg-amber-500' : ''}`}
			/>
			<div
				className="absolute top-0 h-2 w-px bg-destructive"
				style={{ left: `${reorderPercentage}%` }}
			/>
		</div>
	);
};

interface WarehouseBreakdownProps {
	warehouses: WarehouseStock[];
}

const WarehouseBreakdown = ({ warehouses }: WarehouseBreakdownProps) => (
	<div className="space-y-2">
		{warehouses.map((wh) => (
			<div key={wh.warehouseId} className="flex items-center justify-between text-sm">
				<div className="flex items-center gap-2">
					<MapPin className="size-3.5 text-muted-foreground" />
					<span className="text-muted-foreground">{wh.warehouseName}</span>
				</div>
				<div className="flex items-center gap-3">
					<span className="font-medium">{wh.available}</span>
					{wh.reserved > 0 && (
						<span className="text-xs text-muted-foreground">
							({wh.reserved} reserved)
						</span>
					)}
				</div>
			</div>
		))}
	</div>
);

interface ProductRowProps {
	product: Product;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	expanded: boolean;
	onExpand: (id: string) => void;
	actions: { label: string; onClick: (id: string) => void }[];
}

const ProductRow = ({
	product,
	selected,
	onSelect,
	expanded,
	onExpand,
	actions,
}: ProductRowProps) => {
	const isLowStock = product.totalStock <= product.reorderPoint;
	const needsReorder = product.totalStock < product.reorderPoint;

	return (
		<>
			<TableRow
				data-state={selected ? 'selected' : undefined}
				className="cursor-pointer"
				onClick={() => onExpand(product.id)}
			>
				<TableCell onClick={(e) => e.stopPropagation()}>
					<Checkbox
						checked={selected}
						onCheckedChange={(checked) => onSelect(product.id, !!checked)}
					/>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-3">
						<div className="relative size-11 overflow-hidden rounded-lg border bg-muted">
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
							<div className="flex items-center gap-2">
								<span className="font-medium">{product.name}</span>
								{needsReorder && (
									<Badge variant="destructive" className="gap-1 text-xs">
										<AlertTriangle className="size-3" />
										Reorder
									</Badge>
								)}
							</div>
							<div className="text-xs text-muted-foreground">{product.sku}</div>
						</div>
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-2">
						<Barcode className="size-4 text-muted-foreground" />
						<code className="text-sm">{product.barcode}</code>
					</div>
				</TableCell>
				<TableCell>
					<div className="flex items-center gap-3">
						<span className={`font-semibold ${isLowStock ? 'text-amber-500' : ''}`}>
							{product.totalStock}
						</span>
						<StockLevelBar
							current={product.totalStock}
							reorderPoint={product.reorderPoint}
							max={product.maxStock}
						/>
					</div>
				</TableCell>
				<TableCell className="text-muted-foreground">
					{product.reorderPoint}
				</TableCell>
				<TableCell>
					<span className="text-sm text-muted-foreground">
						{product.warehouses.length} location{product.warehouses.length !== 1 ? 's' : ''}
					</span>
				</TableCell>
				<TableCell onClick={(e) => e.stopPropagation()}>
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
			{expanded && (
				<TableRow className="bg-muted/30 hover:bg-muted/30">
					<TableCell colSpan={7}>
						<div className="px-12 py-4">
							<div className="mb-3 text-sm font-medium">Stock by Warehouse</div>
							<WarehouseBreakdown warehouses={product.warehouses} />
						</div>
					</TableCell>
				</TableRow>
			)}
		</>
	);
};

interface QuickActionsProps {
	selectedCount: number;
	actions: { label: string; icon: React.ElementType; onClick: () => void }[];
	clearLabel: string;
	onClear: () => void;
}

const QuickActions = ({ selectedCount, actions, clearLabel, onClear }: QuickActionsProps) => (
	<div className="flex items-center justify-between border-t bg-muted/50 px-6 py-3">
		<span className="text-sm text-muted-foreground">{selectedCount} selected</span>
		<div className="flex items-center gap-2">
			<Button variant="ghost" size="sm" onClick={onClear}>
				{clearLabel}
			</Button>
			{actions.map((action) => (
				<Button key={action.label} variant="outline" size="sm" onClick={action.onClick} className="gap-2">
					<action.icon className="size-4" />
					{action.label}
				</Button>
			))}
		</div>
	</div>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());
	const [expandedId, setExpandedId] = React.useState<string | null>(null);

	const products: Product[] = [
		{
			id: '1',
			name: 'Classic Running Shoes',
			sku: 'SHO-RUN-001',
			barcode: '8901234567890',
			image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop',
			warehouses: [
				{ warehouseId: 'w1', warehouseName: 'Main Warehouse', location: 'New York', stock: 120, reserved: 15, available: 105 },
				{ warehouseId: 'w2', warehouseName: 'West Coast', location: 'Los Angeles', stock: 85, reserved: 8, available: 77 },
				{ warehouseId: 'w3', warehouseName: 'Central Hub', location: 'Chicago', stock: 45, reserved: 0, available: 45 },
			],
			totalStock: 250,
			reorderPoint: 100,
			maxStock: 500,
		},
		{
			id: '2',
			name: 'Premium Yoga Mat',
			sku: 'FIT-MAT-002',
			barcode: '8901234567891',
			image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
			warehouses: [
				{ warehouseId: 'w1', warehouseName: 'Main Warehouse', location: 'New York', stock: 45, reserved: 12, available: 33 },
				{ warehouseId: 'w2', warehouseName: 'West Coast', location: 'Los Angeles', stock: 23, reserved: 5, available: 18 },
			],
			totalStock: 68,
			reorderPoint: 80,
			maxStock: 300,
		},
		{
			id: '3',
			name: 'Adjustable Dumbbells Set',
			sku: 'FIT-DUM-003',
			barcode: '8901234567892',
			image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
			warehouses: [
				{ warehouseId: 'w1', warehouseName: 'Main Warehouse', location: 'New York', stock: 28, reserved: 3, available: 25 },
			],
			totalStock: 28,
			reorderPoint: 50,
			maxStock: 200,
		},
		{
			id: '4',
			name: 'Resistance Bands Pack',
			sku: 'FIT-BND-004',
			barcode: '8901234567893',
			image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=100&h=100&fit=crop',
			warehouses: [
				{ warehouseId: 'w1', warehouseName: 'Main Warehouse', location: 'New York', stock: 340, reserved: 45, available: 295 },
				{ warehouseId: 'w2', warehouseName: 'West Coast', location: 'Los Angeles', stock: 210, reserved: 20, available: 190 },
				{ warehouseId: 'w3', warehouseName: 'Central Hub', location: 'Chicago', stock: 150, reserved: 10, available: 140 },
			],
			totalStock: 700,
			reorderPoint: 200,
			maxStock: 1000,
		},
	];

	const warehouses = [
		{ value: 'all', label: 'All Warehouses' },
		{ value: 'w1', label: 'Main Warehouse' },
		{ value: 'w2', label: 'West Coast' },
		{ value: 'w3', label: 'Central Hub' },
	];

	const stockFilters = [
		{ value: 'all', label: 'All Stock' },
		{ value: 'low', label: 'Low Stock' },
		{ value: 'out', label: 'Out of Stock' },
		{ value: 'optimal', label: 'Optimal' },
	];

	const actions = [
		{ label: 'Adjust Stock', onClick: (id: string) => console.log('Adjust', id) },
		{ label: 'Transfer', onClick: (id: string) => console.log('Transfer', id) },
		{ label: 'View History', onClick: (id: string) => console.log('History', id) },
		{ label: 'Set Reorder Point', onClick: (id: string) => console.log('Reorder', id) },
	];

	const bulkActions = [
		{ label: 'Stock In', icon: ArrowDownToLine, onClick: () => console.log('Stock in') },
		{ label: 'Stock Out', icon: ArrowUpFromLine, onClick: () => console.log('Stock out') },
	];

	const handleSelect = (id: string, checked: boolean) => {
		const newSet = new Set(selectedIds);
		if (checked) newSet.add(id);
		else newSet.delete(id);
		setSelectedIds(newSet);
	};

	const handleExpand = (id: string) => {
		setExpandedId(expandedId === id ? null : id);
	};

	const columns = ['Product', 'Barcode', 'Total Stock', 'Reorder At', 'Locations'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="overflow-hidden rounded-xl border bg-card shadow-sm">
					<Toolbar
						searchPlaceholder="Search by name, SKU or barcode..."
						warehouseLabel="Warehouse"
						warehouses={warehouses}
						stockLabel="Stock Level"
						stockFilters={stockFilters}
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
									selected={selectedIds.has(product.id)}
									onSelect={handleSelect}
									expanded={expandedId === product.id}
									onExpand={handleExpand}
									actions={actions}
								/>
							))}
						</TableBody>
					</Table>
					{selectedIds.size > 0 && (
						<QuickActions
							selectedCount={selectedIds.size}
							actions={bulkActions}
							clearLabel="Clear"
							onClear={() => setSelectedIds(new Set())}
						/>
					)}
				</div>
			</div>
		</section>
	);
}
