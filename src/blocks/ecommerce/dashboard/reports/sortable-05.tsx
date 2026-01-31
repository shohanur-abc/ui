'use client';

import { ArrowDown, ArrowUp, Grip, Layers, Pin, PinOff } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type WarehouseItem = {
	id: string;
	warehouse: string;
	location: string;
	capacity: number;
	utilized: number;
	inbound: number;
	outbound: number;
	efficiency: number;
	pinned?: boolean;
};

type SortConfig = {
	key: keyof WarehouseItem | null;
	direction: 'asc' | 'desc';
};

type ColumnHeaderProps = {
	label: string;
	sortKey: keyof WarehouseItem;
	sortConfig: SortConfig;
	onSort: (key: keyof WarehouseItem) => void;
	align?: 'left' | 'right' | 'center';
};

const ColumnHeader = ({
	label,
	sortKey,
	sortConfig,
	onSort,
	align = 'left',
}: ColumnHeaderProps) => {
	const isActive = sortConfig.key === sortKey;
	const alignClass =
		align === 'right'
			? 'text-right'
			: align === 'center'
				? 'text-center'
				: '';

	return (
		<TableHead
			className={`cursor-pointer select-none transition-colors hover:text-foreground ${alignClass}`}
			onClick={() => onSort(sortKey)}
		>
			<div
				className={`inline-flex items-center gap-1.5 ${align === 'right' ? 'flex-row-reverse' : ''}`}
			>
				{label}
				{isActive &&
					(sortConfig.direction === 'asc' ? (
						<ArrowUp className="size-3.5 text-primary" />
					) : (
						<ArrowDown className="size-3.5 text-primary" />
					))}
			</div>
		</TableHead>
	);
};

type WarehouseRowProps = WarehouseItem & {
	onTogglePin: (id: string) => void;
};

const WarehouseRow = ({
	id,
	warehouse,
	location,
	capacity,
	utilized,
	inbound,
	outbound,
	efficiency,
	pinned,
	onTogglePin,
}: WarehouseRowProps) => {
	const utilizationPercent = Math.round((utilized / capacity) * 100);

	return (
		<TableRow
			className={`group transition-colors ${pinned ? 'bg-primary/5 hover:bg-primary/10' : 'hover:bg-muted/50'}`}
		>
			<TableCell className="w-8">
				<Grip className="size-4 cursor-move text-muted-foreground/40 opacity-0 transition-opacity group-hover:opacity-100" />
			</TableCell>
			<TableCell>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<Button
								variant="ghost"
								size="icon"
								className="size-7"
								onClick={() => onTogglePin(id)}
							>
								{pinned ? (
									<Pin className="size-3.5 fill-primary text-primary" />
								) : (
									<PinOff className="size-3.5 text-muted-foreground" />
								)}
							</Button>
						</TooltipTrigger>
						<TooltipContent>{pinned ? 'Unpin row' : 'Pin to top'}</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</TableCell>
			<TableCell>
				<div className="flex items-center gap-2">
					<div className="rounded-md bg-primary/10 p-1.5">
						<Layers className="size-4 text-primary" />
					</div>
					<div>
						<p className="font-medium">{warehouse}</p>
						<p className="text-xs text-muted-foreground">{location}</p>
					</div>
				</div>
			</TableCell>
			<TableCell className="text-right font-medium">
				{capacity.toLocaleString()}
			</TableCell>
			<TableCell className="text-right">
				<div className="flex flex-col items-end gap-1">
					<span className="font-medium">{utilized.toLocaleString()}</span>
					<div className="flex items-center gap-2">
						<div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
							<div
								className={`h-full transition-all ${
									utilizationPercent > 90
										? 'bg-rose-500'
										: utilizationPercent > 70
											? 'bg-amber-500'
											: 'bg-emerald-500'
								}`}
								style={{ width: `${utilizationPercent}%` }}
							/>
						</div>
						<span className="text-xs text-muted-foreground">
							{utilizationPercent}%
						</span>
					</div>
				</div>
			</TableCell>
			<TableCell className="text-right text-emerald-500">
				+{inbound.toLocaleString()}
			</TableCell>
			<TableCell className="text-right text-rose-500">
				-{outbound.toLocaleString()}
			</TableCell>
			<TableCell className="text-center">
				<span
					className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
						efficiency >= 90
							? 'bg-emerald-500/10 text-emerald-500'
							: efficiency >= 75
								? 'bg-amber-500/10 text-amber-500'
								: 'bg-rose-500/10 text-rose-500'
					}`}
				>
					{efficiency}%
				</span>
			</TableCell>
		</TableRow>
	);
};

export default function Main() {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: 'utilized',
		direction: 'desc',
	});

	const [warehouses, setWarehouses] = useState<WarehouseItem[]>([
		{ id: 'WH-001', warehouse: 'Main Distribution Center', location: 'Los Angeles, CA', capacity: 50000, utilized: 42500, inbound: 1250, outbound: 980, efficiency: 94, pinned: true },
		{ id: 'WH-002', warehouse: 'East Coast Hub', location: 'Newark, NJ', capacity: 35000, utilized: 31500, inbound: 890, outbound: 1120, efficiency: 88 },
		{ id: 'WH-003', warehouse: 'Midwest Fulfillment', location: 'Chicago, IL', capacity: 28000, utilized: 21000, inbound: 650, outbound: 720, efficiency: 92 },
		{ id: 'WH-004', warehouse: 'Southern Depot', location: 'Houston, TX', capacity: 22000, utilized: 19800, inbound: 420, outbound: 380, efficiency: 78 },
		{ id: 'WH-005', warehouse: 'Pacific Northwest', location: 'Seattle, WA', capacity: 18000, utilized: 12600, inbound: 340, outbound: 290, efficiency: 85 },
		{ id: 'WH-006', warehouse: 'Mountain Region', location: 'Denver, CO', capacity: 15000, utilized: 8250, inbound: 180, outbound: 210, efficiency: 72 },
	]);

	const handleSort = (key: keyof WarehouseItem) => {
		setSortConfig((prev) => ({
			key,
			direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc',
		}));
	};

	const handleTogglePin = (id: string) => {
		setWarehouses((prev) =>
			prev.map((w) => (w.id === id ? { ...w, pinned: !w.pinned } : w))
		);
	};

	const sortedWarehouses = [...warehouses].sort((a, b) => {
		if (a.pinned && !b.pinned) return -1;
		if (!a.pinned && b.pinned) return 1;
		if (!sortConfig.key) return 0;
		const aVal = a[sortConfig.key];
		const bVal = b[sortConfig.key];
		const modifier = sortConfig.direction === 'asc' ? 1 : -1;
		if (typeof aVal === 'string' && typeof bVal === 'string') {
			return aVal.localeCompare(bVal) * modifier;
		}
		return ((aVal as number) - (bVal as number)) * modifier;
	});

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="overflow-hidden border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="text-lg @sm:text-xl">
							Warehouse Inventory Report
						</CardTitle>
						<CardDescription>
							Real-time inventory levels and logistics metrics
						</CardDescription>
					</CardHeader>
					<CardContent className="p-0">
						<Table>
							<TableHeader>
								<TableRow className="border-border/50 hover:bg-transparent">
									<TableHead className="w-8" />
									<TableHead className="w-10" />
									<ColumnHeader
										label="Warehouse"
										sortKey="warehouse"
										sortConfig={sortConfig}
										onSort={handleSort}
									/>
									<ColumnHeader
										label="Capacity"
										sortKey="capacity"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<ColumnHeader
										label="Utilized"
										sortKey="utilized"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<ColumnHeader
										label="Inbound"
										sortKey="inbound"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<ColumnHeader
										label="Outbound"
										sortKey="outbound"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="right"
									/>
									<ColumnHeader
										label="Efficiency"
										sortKey="efficiency"
										sortConfig={sortConfig}
										onSort={handleSort}
										align="center"
									/>
								</TableRow>
							</TableHeader>
							<TableBody>
								{sortedWarehouses.map((warehouse) => (
									<WarehouseRow
										key={warehouse.id}
										{...warehouse}
										onTogglePin={handleTogglePin}
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
