'use client';

import * as React from 'react';
import {
	ChevronDown,
	ChevronRight,
	Package,
	MapPin,
	MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';

type WarehouseStock = {
	warehouseId: string;
	warehouseName: string;
	quantity: number;
	reserved: number;
	available: number;
};

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	totalQuantity: number;
	warehouses: WarehouseStock[];
	status: 'synced' | 'pending' | 'error';
};

type HeaderProps = {
	title: string;
	description: string;
};

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader>
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

type StatusBadgeProps = {
	status: 'synced' | 'pending' | 'error';
	labels: Record<'synced' | 'pending' | 'error', string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<
		'synced' | 'pending' | 'error',
		'default' | 'secondary' | 'destructive'
	> = {
		synced: 'default',
		pending: 'secondary',
		error: 'destructive',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type WarehouseRowProps = {
	warehouse: WarehouseStock;
};

const WarehouseRow = ({ warehouse }: WarehouseRowProps) => (
	<TableRow className="bg-muted/30">
		<TableCell className="pl-12">
			<div className="flex items-center gap-2">
				<MapPin className="size-4 text-muted-foreground" />
				<span className="text-sm">{warehouse.warehouseName}</span>
			</div>
		</TableCell>
		<TableCell className="text-sm tabular-nums">{warehouse.quantity}</TableCell>
		<TableCell className="text-sm tabular-nums text-muted-foreground">
			{warehouse.reserved}
		</TableCell>
		<TableCell className="text-sm tabular-nums font-medium">
			{warehouse.available}
		</TableCell>
		<TableCell />
		<TableCell />
	</TableRow>
);

type ExpandableRowProps = {
	item: InventoryItem;
	statusLabels: Record<'synced' | 'pending' | 'error', string>;
	quantityLabel: string;
	reservedLabel: string;
	availableLabel: string;
};

const ExpandableRow = ({ item, statusLabels }: ExpandableRowProps) => {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<Collapsible open={isOpen} onOpenChange={setIsOpen} asChild>
			<>
				<TableRow className="group">
					<TableCell>
						<CollapsibleTrigger asChild>
							<Button variant="ghost" size="icon-sm">
								{isOpen ? (
									<ChevronDown className="size-4" />
								) : (
									<ChevronRight className="size-4" />
								)}
							</Button>
						</CollapsibleTrigger>
					</TableCell>
					<TableCell>
						<div className="flex items-center gap-3">
							<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
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
							<div>
								<div className="font-medium">{item.name}</div>
								<div className="text-xs text-muted-foreground">{item.sku}</div>
							</div>
						</div>
					</TableCell>
					<TableCell className="font-semibold tabular-nums">
						{item.totalQuantity}
					</TableCell>
					<TableCell>
						<span className="text-sm text-muted-foreground">
							{item.warehouses.length} locations
						</span>
					</TableCell>
					<TableCell>
						<StatusBadge status={item.status} labels={statusLabels} />
					</TableCell>
					<TableCell>
						<Button variant="ghost" size="icon-sm">
							<MoreHorizontal className="size-4" />
						</Button>
					</TableCell>
				</TableRow>
				<CollapsibleContent asChild>
					<>
						{item.warehouses.map((warehouse) => (
							<WarehouseRow key={warehouse.warehouseId} warehouse={warehouse} />
						))}
					</>
				</CollapsibleContent>
			</>
		</Collapsible>
	);
};

export default function Main() {
	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Premium Wireless Headphones',
			sku: 'PWH-001',
			image: '',
			totalQuantity: 450,
			status: 'synced',
			warehouses: [
				{
					warehouseId: 'w1',
					warehouseName: 'Main Warehouse',
					quantity: 200,
					reserved: 25,
					available: 175,
				},
				{
					warehouseId: 'w2',
					warehouseName: 'East Distribution',
					quantity: 150,
					reserved: 10,
					available: 140,
				},
				{
					warehouseId: 'w3',
					warehouseName: 'West Fulfillment',
					quantity: 100,
					reserved: 15,
					available: 85,
				},
			],
		},
		{
			id: '2',
			name: 'Smart Home Hub',
			sku: 'SHH-002',
			image: '',
			totalQuantity: 180,
			status: 'pending',
			warehouses: [
				{
					warehouseId: 'w1',
					warehouseName: 'Main Warehouse',
					quantity: 80,
					reserved: 5,
					available: 75,
				},
				{
					warehouseId: 'w2',
					warehouseName: 'East Distribution',
					quantity: 100,
					reserved: 20,
					available: 80,
				},
			],
		},
		{
			id: '3',
			name: 'Portable Charger 20000mAh',
			sku: 'PC-003',
			image: '',
			totalQuantity: 0,
			status: 'error',
			warehouses: [
				{
					warehouseId: 'w1',
					warehouseName: 'Main Warehouse',
					quantity: 0,
					reserved: 0,
					available: 0,
				},
			],
		},
		{
			id: '4',
			name: 'Ergonomic Office Chair',
			sku: 'EOC-004',
			image: '',
			totalQuantity: 65,
			status: 'synced',
			warehouses: [
				{
					warehouseId: 'w1',
					warehouseName: 'Main Warehouse',
					quantity: 35,
					reserved: 2,
					available: 33,
				},
				{
					warehouseId: 'w3',
					warehouseName: 'West Fulfillment',
					quantity: 30,
					reserved: 0,
					available: 30,
				},
			],
		},
	];

	const statusLabels = {
		synced: 'Synced',
		pending: 'Pending',
		error: 'Error',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Multi-Location Inventory"
						description="View stock distribution across all warehouses"
					/>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead className="w-12" />
									<TableHead>Product</TableHead>
									<TableHead>Total Qty</TableHead>
									<TableHead>Locations</TableHead>
									<TableHead>Sync Status</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<ExpandableRow
										key={item.id}
										item={item}
										statusLabels={statusLabels}
										quantityLabel="Quantity"
										reservedLabel="Reserved"
										availableLabel="Available"
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
