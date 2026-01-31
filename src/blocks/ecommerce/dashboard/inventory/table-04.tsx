'use client';

import * as React from 'react';
import {
	Package,
	Trash2,
	Edit,
	Copy,
	Archive,
	RefreshCw,
	Search,
	X,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	price: number;
	status: 'active' | 'inactive' | 'archived';
};

type BulkAction = {
	label: string;
	icon: React.ElementType;
	onClick: (ids: string[]) => void;
	variant?: 'default' | 'destructive';
};

type BulkActionsBarProps = {
	selectedCount: number;
	actions: BulkAction[];
	onClearSelection: () => void;
	selectedText: string;
	clearText: string;
};

const BulkActionsBar = ({
	selectedCount,
	actions,
	onClearSelection,
	selectedText,
	clearText,
}: BulkActionsBarProps) => (
	<div className="flex items-center justify-between rounded-lg border border-primary/50 bg-primary/5 px-4 py-3">
		<div className="flex items-center gap-3">
			<span className="text-sm font-medium">
				{selectedCount} {selectedText}
			</span>
			<Button variant="ghost" size="sm" onClick={onClearSelection} className="gap-1">
				<X className="size-3" />
				{clearText}
			</Button>
		</div>
		<div className="flex items-center gap-2">
			{actions.map((action) => (
				<Button
					key={action.label}
					variant={action.variant === 'destructive' ? 'destructive' : 'outline'}
					size="sm"
					className="gap-1.5"
					onClick={() => action.onClick([])}
				>
					<action.icon className="size-4" />
					{action.label}
				</Button>
			))}
		</div>
	</div>
);

type StatusBadgeProps = {
	status: 'active' | 'inactive' | 'archived';
	labels: Record<'active' | 'inactive' | 'archived', string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<'active' | 'inactive' | 'archived', 'default' | 'secondary' | 'outline'> = {
		active: 'default',
		inactive: 'secondary',
		archived: 'outline',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type InventoryRowProps = {
	item: InventoryItem;
	selected: boolean;
	onSelect: (id: string, checked: boolean) => void;
	statusLabels: Record<'active' | 'inactive' | 'archived', string>;
};

const InventoryRow = ({
	item,
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
				<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
					{item.image ? (
						<img src={item.image} alt={item.name} className="size-full object-cover" />
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div>
					<div className="font-medium">{item.name}</div>
					<div className="text-xs text-muted-foreground">{item.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell className="font-medium tabular-nums">{item.quantity}</TableCell>
		<TableCell className="font-medium tabular-nums">${item.price.toFixed(2)}</TableCell>
		<TableCell>
			<StatusBadge status={item.status} labels={statusLabels} />
		</TableCell>
	</TableRow>
);

type HeaderProps = {
	title: string;
	searchPlaceholder: string;
};

const Header = ({ title, searchPlaceholder }: HeaderProps) => (
	<CardHeader className="flex flex-col gap-4 @md:flex-row @md:items-center @md:justify-between">
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<div className="relative">
			<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
			<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-72" />
		</div>
	</CardHeader>
);

export default function Main() {
	const [selectedIds, setSelectedIds] = React.useState<Set<string>>(new Set());

	const inventory: InventoryItem[] = [
		{ id: '1', name: 'Wireless Mouse', sku: 'WM-001', image: '', quantity: 150, price: 29.99, status: 'active' },
		{ id: '2', name: 'USB-C Hub', sku: 'UCH-002', image: '', quantity: 75, price: 49.99, status: 'active' },
		{ id: '3', name: 'Monitor Stand', sku: 'MS-003', image: '', quantity: 30, price: 79.99, status: 'inactive' },
		{ id: '4', name: 'Webcam Pro', sku: 'WP-004', image: '', quantity: 0, price: 129.99, status: 'archived' },
		{ id: '5', name: 'Desk Lamp LED', sku: 'DL-005', image: '', quantity: 200, price: 34.99, status: 'active' },
		{ id: '6', name: 'Keyboard Wrist Rest', sku: 'KWR-006', image: '', quantity: 85, price: 19.99, status: 'active' },
	];

	const bulkActions: BulkAction[] = [
		{ label: 'Edit', icon: Edit, onClick: (ids) => console.log('Edit', ids) },
		{ label: 'Duplicate', icon: Copy, onClick: (ids) => console.log('Duplicate', ids) },
		{ label: 'Archive', icon: Archive, onClick: (ids) => console.log('Archive', ids) },
		{ label: 'Sync', icon: RefreshCw, onClick: (ids) => console.log('Sync', ids) },
		{ label: 'Delete', icon: Trash2, onClick: (ids) => console.log('Delete', ids), variant: 'destructive' },
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

	const handleSelectAll = (checked: boolean) => {
		if (checked) {
			setSelectedIds(new Set(inventory.map((item) => item.id)));
		} else {
			setSelectedIds(new Set());
		}
	};

	const statusLabels = {
		active: 'Active',
		inactive: 'Inactive',
		archived: 'Archived',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Bulk Inventory Actions"
						searchPlaceholder="Search inventory..."
					/>
					<CardContent className="space-y-4">
						{selectedIds.size > 0 && (
							<BulkActionsBar
								selectedCount={selectedIds.size}
								actions={bulkActions}
								onClearSelection={() => setSelectedIds(new Set())}
								selectedText="items selected"
								clearText="Clear"
							/>
						)}
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12">
										<Checkbox
											checked={selectedIds.size === inventory.length}
											onCheckedChange={handleSelectAll}
										/>
									</TableHead>
									<TableHead>Product</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Price</TableHead>
									<TableHead>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<InventoryRow
										key={item.id}
										item={item}
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
