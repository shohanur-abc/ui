'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	Plus,
	Minus,
	RotateCcw,
	Check,
	X,
	Warehouse,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface ProductStock {
	id: string;
	name: string;
	sku: string;
	currentStock: number;
	newStock: number;
	change: number;
	lowStockThreshold: number;
}

interface StockOperationProps {
	operation: 'add' | 'subtract' | 'set';
	onOperationChange: (op: 'add' | 'subtract' | 'set') => void;
	value: number;
	onValueChange: (val: number) => void;
	labels: { add: string; subtract: string; set: string };
}

const StockOperation = ({
	operation,
	onOperationChange,
	value,
	onValueChange,
	labels,
}: StockOperationProps) => (
	<div className="space-y-4">
		<div className="flex gap-2">
			<Button
				variant={operation === 'add' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onOperationChange('add')}
				className="flex-1 gap-1"
			>
				<Plus className="size-3.5" />
				{labels.add}
			</Button>
			<Button
				variant={operation === 'subtract' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onOperationChange('subtract')}
				className="flex-1 gap-1"
			>
				<Minus className="size-3.5" />
				{labels.subtract}
			</Button>
			<Button
				variant={operation === 'set' ? 'default' : 'outline'}
				size="sm"
				onClick={() => onOperationChange('set')}
				className="flex-1 gap-1"
			>
				<RotateCcw className="size-3.5" />
				{labels.set}
			</Button>
		</div>
		<div className="flex items-center gap-3">
			<Button
				variant="outline"
				size="icon"
				onClick={() => onValueChange(Math.max(0, value - 10))}
			>
				<Minus className="size-4" />
			</Button>
			<Input
				type="number"
				value={value}
				onChange={(e) => onValueChange(Math.max(0, Number(e.target.value)))}
				className="flex-1 text-center text-lg font-bold"
			/>
			<Button
				variant="outline"
				size="icon"
				onClick={() => onValueChange(value + 10)}
			>
				<Plus className="size-4" />
			</Button>
		</div>
	</div>
);

interface WarehouseSelectorProps {
	warehouses: { id: string; name: string; location: string }[];
	selected: string;
	onChange: (id: string) => void;
	label: string;
}

const WarehouseSelector = ({
	warehouses,
	selected,
	onChange,
	label,
}: WarehouseSelectorProps) => (
	<div className="space-y-2">
		<Label className="text-sm">{label}</Label>
		<Select value={selected} onValueChange={onChange}>
			<SelectTrigger>
				<SelectValue placeholder="Select warehouse" />
			</SelectTrigger>
			<SelectContent>
				{warehouses.map((wh) => (
					<SelectItem key={wh.id} value={wh.id}>
						<div className="flex items-center gap-2">
							<Warehouse className="size-4" />
							<span>{wh.name}</span>
							<span className="text-muted-foreground">({wh.location})</span>
						</div>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	</div>
);

interface StockPreviewRowProps {
	product: ProductStock;
}

const StockPreviewRow = ({ product }: StockPreviewRowProps) => {
	const isIncrease = product.change > 0;
	const isDecrease = product.change < 0;
	const willBeLowStock = product.newStock <= product.lowStockThreshold;
	const willBeOutOfStock = product.newStock <= 0;

	return (
		<div className="flex items-center gap-4 rounded-lg border bg-card p-3">
			<div className="size-10 rounded-md bg-muted" />
			<div className="min-w-0 flex-1">
				<p className="truncate text-sm font-medium">{product.name}</p>
				<p className="text-xs text-muted-foreground">{product.sku}</p>
			</div>
			<div className="flex items-center gap-4">
				<div className="text-right">
					<p className="text-sm text-muted-foreground">
						{product.currentStock}
					</p>
				</div>
				<div
					className={`flex items-center gap-1 ${isIncrease ? 'text-emerald-500' : isDecrease ? 'text-red-500' : 'text-muted-foreground'}`}
				>
					{isIncrease ? (
						<TrendingUp className="size-4" />
					) : isDecrease ? (
						<TrendingDown className="size-4" />
					) : null}
					<span className="font-medium">
						{isIncrease ? '+' : ''}
						{product.change}
					</span>
				</div>
				<div className="text-right">
					<p className="font-bold">{product.newStock}</p>
				</div>
				{willBeOutOfStock ? (
					<Badge variant="destructive" className="gap-1">
						<AlertTriangle className="size-3" />
						Out of Stock
					</Badge>
				) : willBeLowStock ? (
					<Badge
						variant="secondary"
						className="gap-1 bg-amber-500/10 text-amber-500"
					>
						<AlertTriangle className="size-3" />
						Low Stock
					</Badge>
				) : null}
			</div>
		</div>
	);
};

interface StockSummaryProps {
	totalProducts: number;
	totalChange: number;
	lowStockCount: number;
	outOfStockCount: number;
	labels: {
		products: string;
		totalChange: string;
		lowStock: string;
		outOfStock: string;
	};
}

const StockSummary = ({
	totalProducts,
	totalChange,
	lowStockCount,
	outOfStockCount,
	labels,
}: StockSummaryProps) => (
	<div className="grid gap-4 rounded-lg border bg-muted/30 p-4 @sm:grid-cols-4">
		<div className="text-center">
			<p className="text-2xl font-bold">{totalProducts}</p>
			<p className="text-sm text-muted-foreground">{labels.products}</p>
		</div>
		<div className="text-center">
			<p
				className={`text-2xl font-bold ${totalChange >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{totalChange >= 0 ? '+' : ''}
				{totalChange}
			</p>
			<p className="text-sm text-muted-foreground">{labels.totalChange}</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-amber-500">{lowStockCount}</p>
			<p className="text-sm text-muted-foreground">{labels.lowStock}</p>
		</div>
		<div className="text-center">
			<p className="text-2xl font-bold text-red-500">{outOfStockCount}</p>
			<p className="text-sm text-muted-foreground">{labels.outOfStock}</p>
		</div>
	</div>
);

export default function Main() {
	const [operation, setOperation] = React.useState<'add' | 'subtract' | 'set'>(
		'add',
	);
	const [value, setValue] = React.useState(50);
	const [selectedWarehouse, setSelectedWarehouse] = React.useState('main');

	const warehouses = [
		{ id: 'main', name: 'Main Warehouse', location: 'New York' },
		{ id: 'west', name: 'West Coast', location: 'Los Angeles' },
		{ id: 'east', name: 'East Coast', location: 'Boston' },
	];

	const products: ProductStock[] = [
		{
			id: '1',
			name: 'Wireless Headphones Pro',
			sku: 'WHP-001',
			currentStock: 45,
			newStock: 95,
			change: 50,
			lowStockThreshold: 20,
		},
		{
			id: '2',
			name: 'Mechanical Keyboard RGB',
			sku: 'MKB-002',
			currentStock: 23,
			newStock: 73,
			change: 50,
			lowStockThreshold: 20,
		},
		{
			id: '3',
			name: 'Gaming Mouse Elite',
			sku: 'GME-003',
			currentStock: 5,
			newStock: 55,
			change: 50,
			lowStockThreshold: 20,
		},
		{
			id: '4',
			name: 'USB-C Hub 7-in-1',
			sku: 'UCH-004',
			currentStock: 156,
			newStock: 206,
			change: 50,
			lowStockThreshold: 20,
		},
	];

	const lowStockCount = products.filter(
		(p) => p.newStock <= p.lowStockThreshold && p.newStock > 0,
	).length;
	const outOfStockCount = products.filter((p) => p.newStock <= 0).length;
	const totalChange = products.reduce((sum, p) => sum + p.change, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-2xl space-y-6 px-4 py-8 @sm:px-6">
				<div className="rounded-lg border bg-card p-6">
					<div className="mb-4 flex items-center gap-2">
						<Package className="size-5" />
						<h2 className="font-semibold">Bulk Stock Update</h2>
					</div>
					<p className="mb-6 text-sm text-muted-foreground">
						Update stock levels for {products.length} selected products
					</p>

					<WarehouseSelector
						warehouses={warehouses}
						selected={selectedWarehouse}
						onChange={setSelectedWarehouse}
						label="Target Warehouse"
					/>

					<Separator className="my-6" />

					<StockOperation
						operation={operation}
						onOperationChange={setOperation}
						value={value}
						onValueChange={setValue}
						labels={{
							add: 'Add Stock',
							subtract: 'Remove Stock',
							set: 'Set Stock',
						}}
					/>
				</div>

				<StockSummary
					totalProducts={products.length}
					totalChange={totalChange}
					lowStockCount={lowStockCount}
					outOfStockCount={outOfStockCount}
					labels={{
						products: 'Products',
						totalChange: 'Total Change',
						lowStock: 'Will be Low Stock',
						outOfStock: 'Will be Out of Stock',
					}}
				/>

				<div className="space-y-3">
					<div className="flex items-center gap-4 px-3 text-xs text-muted-foreground">
						<span className="flex-1">Product</span>
						<span className="w-16 text-right">Current</span>
						<span className="w-16 text-center">Change</span>
						<span className="w-16 text-right">New</span>
						<span className="w-24" />
					</div>
					<div className="space-y-2">
						{products.map((product) => (
							<StockPreviewRow key={product.id} product={product} />
						))}
					</div>
				</div>

				<div className="flex gap-3">
					<Button variant="outline" className="flex-1 gap-2">
						<X className="size-4" />
						Cancel
					</Button>
					<Button className="flex-1 gap-2">
						<Check className="size-4" />
						Apply Changes
					</Button>
				</div>
			</div>
		</section>
	);
}
