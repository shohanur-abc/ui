'use client';

import * as React from 'react';
import {
	Package,
	Grid3X3,
	List,
	Search,
	SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	maxStock: number;
	price: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
};

type ViewMode = 'grid' | 'list';

type ToolbarProps = {
	searchPlaceholder: string;
	filterLabel: string;
	viewMode: ViewMode;
	onViewChange: (mode: ViewMode) => void;
};

const Toolbar = ({
	searchPlaceholder,
	filterLabel,
	viewMode,
	onViewChange,
}: ToolbarProps) => (
	<div className="flex flex-col gap-3 @lg:flex-row @lg:items-center @lg:justify-between">
		<div className="flex flex-1 gap-2">
			<div className="relative flex-1 @lg:max-w-sm">
				<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="pl-9" />
			</div>
			<Button variant="outline">
				<SlidersHorizontal className="size-4" />
				{filterLabel}
			</Button>
		</div>
		<ToggleGroup
			type="single"
			value={viewMode}
			onValueChange={(v) => v && onViewChange(v as ViewMode)}
		>
			<ToggleGroupItem value="grid" aria-label="Grid view">
				<Grid3X3 className="size-4" />
			</ToggleGroupItem>
			<ToggleGroupItem value="list" aria-label="List view">
				<List className="size-4" />
			</ToggleGroupItem>
		</ToggleGroup>
	</div>
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

type GridCardProps = {
	item: InventoryItem;
	statusLabels: Record<'in-stock' | 'low-stock' | 'out-of-stock', string>;
};

const GridCard = ({ item, statusLabels }: GridCardProps) => {
	const stockPercentage = (item.quantity / item.maxStock) * 100;

	return (
		<Card className="overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<div className="aspect-square bg-muted">
				{item.image ? (
					<img
						src={item.image}
						alt={item.name}
						className="size-full object-cover"
					/>
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-12 text-muted-foreground" />
					</div>
				)}
			</div>
			<CardContent className="p-4">
				<div className="mb-2 flex items-start justify-between gap-2">
					<div className="min-w-0">
						<h3 className="truncate font-medium">{item.name}</h3>
						<p className="text-xs text-muted-foreground">{item.sku}</p>
					</div>
					<StatusBadge status={item.status} labels={statusLabels} />
				</div>
				<div className="space-y-1.5">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Stock</span>
						<span className="tabular-nums">
							{item.quantity}/{item.maxStock}
						</span>
					</div>
					<Progress value={stockPercentage} className="h-1.5" />
				</div>
				<div className="mt-3 text-lg font-semibold">
					${item.price.toFixed(2)}
				</div>
			</CardContent>
		</Card>
	);
};

type ListCardProps = {
	item: InventoryItem;
	statusLabels: Record<'in-stock' | 'low-stock' | 'out-of-stock', string>;
};

const ListCard = ({ item, statusLabels }: ListCardProps) => {
	const stockPercentage = (item.quantity / item.maxStock) * 100;

	return (
		<Card className="transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<CardContent className="flex items-center gap-4 p-4">
				<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
					{item.image ? (
						<img
							src={item.image}
							alt={item.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-6 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-center gap-2">
						<h3 className="truncate font-medium">{item.name}</h3>
						<StatusBadge status={item.status} labels={statusLabels} />
					</div>
					<p className="text-sm text-muted-foreground">{item.sku}</p>
				</div>
				<div className="hidden w-32 @md:block">
					<div className="text-sm text-muted-foreground">Stock Level</div>
					<div className="mt-1 flex items-center gap-2">
						<Progress value={stockPercentage} className="h-1.5 flex-1" />
						<span className="text-sm tabular-nums">{item.quantity}</span>
					</div>
				</div>
				<div className="text-right">
					<div className="text-lg font-semibold">${item.price.toFixed(2)}</div>
					<div className="text-xs text-muted-foreground">per unit</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const [viewMode, setViewMode] = React.useState<ViewMode>('grid');

	const inventory: InventoryItem[] = [
		{
			id: '1',
			name: 'Wireless Headphones',
			sku: 'WH-001',
			image: '',
			quantity: 85,
			maxStock: 100,
			price: 79.99,
			status: 'in-stock',
		},
		{
			id: '2',
			name: 'Bluetooth Speaker',
			sku: 'BS-002',
			image: '',
			quantity: 12,
			maxStock: 50,
			price: 49.99,
			status: 'low-stock',
		},
		{
			id: '3',
			name: 'USB-C Hub',
			sku: 'UCH-003',
			image: '',
			quantity: 0,
			maxStock: 75,
			price: 34.99,
			status: 'out-of-stock',
		},
		{
			id: '4',
			name: 'Mechanical Keyboard',
			sku: 'MK-004',
			image: '',
			quantity: 45,
			maxStock: 60,
			price: 129.99,
			status: 'in-stock',
		},
		{
			id: '5',
			name: 'Gaming Mouse',
			sku: 'GM-005',
			image: '',
			quantity: 8,
			maxStock: 40,
			price: 59.99,
			status: 'low-stock',
		},
		{
			id: '6',
			name: 'Monitor Stand',
			sku: 'MS-006',
			image: '',
			quantity: 92,
			maxStock: 100,
			price: 44.99,
			status: 'in-stock',
		},
	];

	const statusLabels = {
		'in-stock': 'In Stock',
		'low-stock': 'Low Stock',
		'out-of-stock': 'Out of Stock',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<Toolbar
						searchPlaceholder="Search products..."
						filterLabel="Filters"
						viewMode={viewMode}
						onViewChange={setViewMode}
					/>
					{viewMode === 'grid' ? (
						<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3 @2xl:grid-cols-4">
							{inventory.map((item) => (
								<GridCard
									key={item.id}
									item={item}
									statusLabels={statusLabels}
								/>
							))}
						</div>
					) : (
						<div className="space-y-2">
							{inventory.map((item) => (
								<ListCard
									key={item.id}
									item={item}
									statusLabels={statusLabels}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</section>
	);
}
