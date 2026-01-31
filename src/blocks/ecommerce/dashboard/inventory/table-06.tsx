'use client';

import * as React from 'react';
import {
	Package,
	ArrowUp,
	ArrowDown,
	ArrowUpDown,
	MoreHorizontal,
	Search,
	SlidersHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	value: number;
	turnoverRate: number;
	lastRestocked: string;
	category: string;
};

type SortConfig = {
	key: keyof InventoryItem;
	direction: 'asc' | 'desc';
} | null;

type SortableHeaderProps = {
	label: string;
	sortKey: keyof InventoryItem;
	currentSort: SortConfig;
	onSort: (key: keyof InventoryItem) => void;
};

const SortableHeader = ({ label, sortKey, currentSort, onSort }: SortableHeaderProps) => {
	const isActive = currentSort?.key === sortKey;
	const direction = currentSort?.direction;

	return (
		<Button
			variant="ghost"
			size="sm"
			className="-ml-3 h-8 gap-1"
			onClick={() => onSort(sortKey)}
		>
			{label}
			{isActive && direction === 'asc' && <ArrowUp className="size-3.5" />}
			{isActive && direction === 'desc' && <ArrowDown className="size-3.5" />}
			{!isActive && <ArrowUpDown className="size-3.5 opacity-50" />}
		</Button>
	);
};

type HeaderProps = {
	title: string;
	searchPlaceholder: string;
	advancedLabel: string;
};

const Header = ({ title, searchPlaceholder, advancedLabel }: HeaderProps) => (
	<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<div className="flex gap-2">
			<div className="relative">
				<Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
				<Input placeholder={searchPlaceholder} className="w-full pl-9 @sm:w-64" />
			</div>
			<Button variant="outline" size="default">
				<SlidersHorizontal className="size-4" />
				{advancedLabel}
			</Button>
		</div>
	</CardHeader>
);

type TurnoverBadgeProps = {
	rate: number;
};

const TurnoverBadge = ({ rate }: TurnoverBadgeProps) => {
	let variant: 'default' | 'secondary' | 'destructive';
	let label: string;

	if (rate >= 5) {
		variant = 'default';
		label = 'High';
	} else if (rate >= 2) {
		variant = 'secondary';
		label = 'Medium';
	} else {
		variant = 'destructive';
		label = 'Low';
	}

	return (
		<div className="flex items-center gap-2">
			<Badge variant={variant}>{label}</Badge>
			<span className="text-xs text-muted-foreground">{rate.toFixed(1)}x</span>
		</div>
	);
};

export default function Main() {
	const [sortConfig, setSortConfig] = React.useState<SortConfig>(null);

	const inventory: InventoryItem[] = [
		{ id: '1', name: 'Premium Headphones', sku: 'PH-001', image: '', quantity: 150, value: 14985.00, turnoverRate: 6.2, lastRestocked: '2024-01-15', category: 'Electronics' },
		{ id: '2', name: 'Wireless Keyboard', sku: 'WK-002', image: '', quantity: 89, value: 5340.00, turnoverRate: 3.8, lastRestocked: '2024-01-10', category: 'Peripherals' },
		{ id: '3', name: 'Monitor Stand Pro', sku: 'MSP-003', image: '', quantity: 42, value: 3358.00, turnoverRate: 1.5, lastRestocked: '2023-12-20', category: 'Accessories' },
		{ id: '4', name: 'USB Hub 7-Port', sku: 'UH-004', image: '', quantity: 200, value: 5980.00, turnoverRate: 8.1, lastRestocked: '2024-01-18', category: 'Electronics' },
		{ id: '5', name: 'Desk Organizer', sku: 'DO-005', image: '', quantity: 65, value: 1625.00, turnoverRate: 2.3, lastRestocked: '2024-01-05', category: 'Accessories' },
		{ id: '6', name: 'Webcam 4K', sku: 'W4K-006', image: '', quantity: 28, value: 4196.00, turnoverRate: 4.7, lastRestocked: '2024-01-12', category: 'Electronics' },
	];

	const handleSort = (key: keyof InventoryItem) => {
		setSortConfig((prev) => {
			if (prev?.key === key) {
				if (prev.direction === 'asc') {
					return { key, direction: 'desc' };
				}
				return null;
			}
			return { key, direction: 'asc' };
		});
	};

	const sortedInventory = React.useMemo(() => {
		if (!sortConfig) return inventory;

		return [...inventory].sort((a, b) => {
			const aVal = a[sortConfig.key];
			const bVal = b[sortConfig.key];

			if (typeof aVal === 'number' && typeof bVal === 'number') {
				return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
			}

			const aStr = String(aVal);
			const bStr = String(bVal);
			return sortConfig.direction === 'asc'
				? aStr.localeCompare(bStr)
				: bStr.localeCompare(aStr);
		});
	}, [sortConfig]);

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Restock', onClick: (id: string) => console.log('Restock', id) },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Sortable Inventory"
						searchPlaceholder="Search products..."
						advancedLabel="Advanced"
					/>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>
										<SortableHeader
											label="Product"
											sortKey="name"
											currentSort={sortConfig}
											onSort={handleSort}
										/>
									</TableHead>
									<TableHead>Category</TableHead>
									<TableHead>
										<SortableHeader
											label="Quantity"
											sortKey="quantity"
											currentSort={sortConfig}
											onSort={handleSort}
										/>
									</TableHead>
									<TableHead>
										<SortableHeader
											label="Value"
											sortKey="value"
											currentSort={sortConfig}
											onSort={handleSort}
										/>
									</TableHead>
									<TableHead>
										<SortableHeader
											label="Turnover"
											sortKey="turnoverRate"
											currentSort={sortConfig}
											onSort={handleSort}
										/>
									</TableHead>
									<TableHead>
										<SortableHeader
											label="Last Restocked"
											sortKey="lastRestocked"
											currentSort={sortConfig}
											onSort={handleSort}
										/>
									</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedInventory.map((item) => (
									<TableRow key={item.id}>
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
										<TableCell>
											<Badge variant="outline">{item.category}</Badge>
										</TableCell>
										<TableCell className="font-medium tabular-nums">{item.quantity}</TableCell>
										<TableCell className="font-medium tabular-nums">${item.value.toLocaleString()}</TableCell>
										<TableCell>
											<TurnoverBadge rate={item.turnoverRate} />
										</TableCell>
										<TableCell className="text-sm text-muted-foreground">
											{new Date(item.lastRestocked).toLocaleDateString()}
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
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
