'use client';

import * as React from 'react';
import {
	MoreVertical,
	Search,
	Download,
	Upload,
	Package,
	ChevronLeft,
	ChevronRight,
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
import { Card, CardContent } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	maxStock: number;
	category: string;
	status: 'available' | 'reserved' | 'depleted';
};

type ToolbarProps = {
	searchPlaceholder: string;
	categoryLabel: string;
	categories: { value: string; label: string }[];
	exportLabel: string;
	importLabel: string;
};

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
				<Input
					placeholder={searchPlaceholder}
					className="w-full pl-9 @sm:w-72"
				/>
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

type StatusBadgeProps = {
	status: 'available' | 'reserved' | 'depleted';
	labels: Record<'available' | 'reserved' | 'depleted', string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<
		'available' | 'reserved' | 'depleted',
		'default' | 'secondary' | 'destructive'
	> = {
		available: 'default',
		reserved: 'secondary',
		depleted: 'destructive',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type StockProgressProps = {
	quantity: number;
	maxStock: number;
};

const StockProgress = ({ quantity, maxStock }: StockProgressProps) => {
	const percentage = Math.min((quantity / maxStock) * 100, 100);
	const colorClass =
		percentage > 50
			? ''
			: percentage > 20
				? '[&>div]:bg-yellow-500'
				: '[&>div]:bg-destructive';

	return (
		<div className="flex items-center gap-2">
			<Progress value={percentage} className={`h-2 w-20 ${colorClass}`} />
			<span className="text-sm tabular-nums text-muted-foreground">
				{quantity}/{maxStock}
			</span>
		</div>
	);
};

type InventoryRowProps = {
	item: InventoryItem;
	actions: {
		label: string;
		onClick: (id: string) => void;
		destructive?: boolean;
	}[];
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	statusLabels: Record<'available' | 'reserved' | 'depleted', string>;
};

const InventoryRow = ({
	item,
	actions,
	selected,
	onSelect,
	statusLabels,
}: InventoryRowProps) => (
	<TableRow data-state={selected ? 'selected' : undefined}>
		<TableCell>
			<Checkbox
				checked={selected}
				onCheckedChange={(checked) => onSelect(item.id, !!checked)}
			/>
		</TableCell>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
					{item.image ? (
						<img
							src={item.image}
							alt={item.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<div className="font-medium leading-none">{item.name}</div>
					<div className="text-xs text-muted-foreground">{item.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>{item.category}</TableCell>
		<TableCell>
			<StockProgress quantity={item.quantity} maxStock={item.maxStock} />
		</TableCell>
		<TableCell>
			<StatusBadge status={item.status} labels={statusLabels} />
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
							{action.destructive && idx > 0 && <DropdownMenuSeparator />}
							<DropdownMenuItem
								onClick={() => action.onClick(item.id)}
								className={action.destructive ? 'text-destructive' : ''}
							>
								{action.label}
							</DropdownMenuItem>
						</React.Fragment>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
	showingText: string;
	ofText: string;
	itemsText: string;
};

const Pagination = ({
	currentPage,
	totalPages,
	itemsPerPage,
	totalItems,
	showingText,
	ofText,
	itemsText,
}: PaginationProps) => {
	const start = (currentPage - 1) * itemsPerPage + 1;
	const end = Math.min(currentPage * itemsPerPage, totalItems);

	return (
		<div className="flex flex-col gap-2 border-t px-4 py-3 @sm:flex-row @sm:items-center @sm:justify-between">
			<p className="text-sm text-muted-foreground">
				{showingText} {start}-{end} {ofText} {totalItems} {itemsText}
			</p>
			<div className="flex items-center gap-2">
				<Button variant="outline" size="icon-sm" disabled={currentPage === 1}>
					<ChevronLeft className="size-4" />
				</Button>
				<span className="text-sm tabular-nums">
					{currentPage} / {totalPages}
				</span>
				<Button
					variant="outline"
					size="icon-sm"
					disabled={currentPage === totalPages}
				>
					<ChevronRight className="size-4" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const categories = [
		{ value: 'all', label: 'All Categories' },
		{ value: 'electronics', label: 'Electronics' },
		{ value: 'accessories', label: 'Accessories' },
		{ value: 'peripherals', label: 'Peripherals' },
	];

	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			image: '',
			quantity: 180,
			maxStock: 200,
			category: 'Electronics',
			status: 'available',
		},
		{
			id: '2',
			name: 'Smart Watch Series X',
			sku: 'SWX-002',
			image: '',
			quantity: 45,
			maxStock: 150,
			category: 'Electronics',
			status: 'reserved',
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-003',
			image: '',
			quantity: 0,
			maxStock: 500,
			category: 'Accessories',
			status: 'depleted',
		},
		{
			id: '4',
			name: 'Gaming Mouse RGB',
			sku: 'GMR-004',
			image: '',
			quantity: 89,
			maxStock: 100,
			category: 'Peripherals',
			status: 'available',
		},
		{
			id: '5',
			name: 'Webcam HD 1080p',
			sku: 'WHD-005',
			image: '',
			quantity: 12,
			maxStock: 80,
			category: 'Peripherals',
			status: 'reserved',
		},
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit Item', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Transfer Stock',
			onClick: (id: string) => console.log('Transfer', id),
		},
		{
			label: 'Delete',
			onClick: (id: string) => console.log('Delete', id),
			destructive: true,
		},
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

	const statusLabels = {
		available: 'Available',
		reserved: 'Reserved',
		depleted: 'Depleted',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Toolbar
						searchPlaceholder="Search products..."
						categoryLabel="Category"
						categories={categories}
						exportLabel="Export"
						importLabel="Import"
					/>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox />
									</TableHead>
									<TableHead>Product</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>Stock Level</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<InventoryRow
										key={item.id}
										item={item}
										actions={actions}
										selected={selectedIds.has(item.id)}
										onSelect={handleSelect}
										statusLabels={statusLabels}
									/>
								))}
							</TableBody>
						</Table>
					</CardContent>
					<Pagination
						currentPage={1}
						totalPages={5}
						itemsPerPage={5}
						totalItems={24}
						showingText="Showing"
						ofText="of"
						itemsText="items"
					/>
				</Card>
			</div>
		</section>
	);
}
