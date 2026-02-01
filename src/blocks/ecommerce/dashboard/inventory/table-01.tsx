'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Search,
	Filter,
	Plus,
	Package,
	ArrowUpDown,
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	reorderPoint: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	location: string;
};

type HeaderProps = {
	title: string;
	description: string;
	searchPlaceholder: string;
	filterLabel: string;
	addLabel: string;
};

const Header = ({
	title,
	description,
	searchPlaceholder,
	filterLabel,
	addLabel,
}: HeaderProps) => (
	<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<div>
			<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
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
			<Button>
				<Plus className="size-4" />
				{addLabel}
			</Button>
		</div>
	</CardHeader>
);

type StatusBadgeProps = {
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	labels: Record<'in-stock' | 'low-stock' | 'out-of-stock', string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<
		'in-stock' | 'low-stock' | 'out-of-stock',
		'default' | 'secondary' | 'destructive'
	> = {
		'in-stock': 'default',
		'low-stock': 'secondary',
		'out-of-stock': 'destructive',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type InventoryRowProps = {
	item: InventoryItem;
	actions: { label: string; onClick: (id: string) => void }[];
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	statusLabels: Record<'in-stock' | 'low-stock' | 'out-of-stock', string>;
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
				<Avatar className="size-10 rounded-md">
					<AvatarImage src={item.image} alt={item.name} />
					<AvatarFallback className="rounded-md">
						<Package className="size-5" />
					</AvatarFallback>
				</Avatar>
				<div>
					<div className="font-medium">{item.name}</div>
					<div className="text-xs text-muted-foreground">{item.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-medium">{item.quantity}</TableCell>
		<TableCell>{item.reorderPoint}</TableCell>
		<TableCell>{item.location}</TableCell>
		<TableCell>
			<StatusBadge status={item.status} labels={statusLabels} />
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
							onClick={() => action.onClick(item.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

type ColumnHeader = {
	key: string;
	label: string;
	sortable?: boolean;
};

type TableHeaderProps = {
	columns: ColumnHeader[];
	onSort?: (key: string) => void;
};

const InventoryTableHeader = ({ columns, onSort }: TableHeaderProps) => (
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

	const columns: ColumnHeader[] = [
		{ key: 'product', label: 'Product', sortable: true },
		{ key: 'quantity', label: 'Quantity', sortable: true },
		{ key: 'reorderPoint', label: 'Reorder Point', sortable: true },
		{ key: 'location', label: 'Location', sortable: true },
		{ key: 'status', label: 'Status', sortable: false },
	];

	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			sku: 'WH-001',
			image: '',
			quantity: 150,
			reorderPoint: 50,
			status: 'in-stock',
			location: 'Warehouse A',
		},
		{
			id: '2',
			name: 'Bluetooth Speaker',
			sku: 'BS-002',
			image: '',
			quantity: 25,
			reorderPoint: 30,
			status: 'low-stock',
			location: 'Warehouse B',
		},
		{
			id: '3',
			name: 'USB-C Cable',
			sku: 'UC-003',
			image: '',
			quantity: 0,
			reorderPoint: 100,
			status: 'out-of-stock',
			location: 'Warehouse A',
		},
		{
			id: '4',
			name: 'Laptop Stand',
			sku: 'LS-004',
			image: '',
			quantity: 75,
			reorderPoint: 20,
			status: 'in-stock',
			location: 'Warehouse C',
		},
		{
			id: '5',
			name: 'Mechanical Keyboard',
			sku: 'MK-005',
			image: '',
			quantity: 45,
			reorderPoint: 40,
			status: 'in-stock',
			location: 'Warehouse A',
		},
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Adjust Stock',
			onClick: (id: string) => console.log('Adjust', id),
		},
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

	const statusLabels = {
		'in-stock': 'In Stock',
		'low-stock': 'Low Stock',
		'out-of-stock': 'Out of Stock',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Inventory Management"
						description="Track and manage your stock levels"
						searchPlaceholder="Search inventory..."
						filterLabel="Filters"
						addLabel="Add Item"
					/>
					<CardContent>
						<Table>
							<InventoryTableHeader columns={columns} />
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
				</Card>
			</div>
		</section>
	);
}
