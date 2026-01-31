'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	ShoppingCart,
	Clock,
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
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	image: string;
	quantity: number;
	reorderPoint: number;
	pendingOrders: number;
	daysUntilStockout: number | null;
	status: 'critical' | 'low' | 'pending-order' | 'backordered';
};

type TabConfig = {
	value: string;
	label: string;
	icon: React.ElementType;
	count: number;
};

type HeaderProps = {
	title: string;
	description: string;
	tabs: TabConfig[];
	activeTab: string;
	onTabChange: (value: string) => void;
};

const Header = ({ title, description, tabs, activeTab, onTabChange }: HeaderProps) => (
	<CardHeader className="space-y-4">
		<div>
			<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
			<CardDescription>{description}</CardDescription>
		</div>
		<Tabs value={activeTab} onValueChange={onTabChange}>
			<TabsList>
				{tabs.map((tab) => (
					<TabsTrigger key={tab.value} value={tab.value} className="gap-2">
						<tab.icon className="size-4" />
						{tab.label}
						<Badge variant="secondary" className="ml-1 h-5 px-1.5">
							{tab.count}
						</Badge>
					</TabsTrigger>
				))}
			</TabsList>
		</Tabs>
	</CardHeader>
);

type StatusBadgeProps = {
	status: 'critical' | 'low' | 'pending-order' | 'backordered';
	labels: Record<'critical' | 'low' | 'pending-order' | 'backordered', string>;
};

const StatusBadge = ({ status, labels }: StatusBadgeProps) => {
	const variants: Record<'critical' | 'low' | 'pending-order' | 'backordered', 'destructive' | 'secondary' | 'default' | 'outline'> = {
		critical: 'destructive',
		low: 'secondary',
		'pending-order': 'default',
		backordered: 'outline',
	};

	return <Badge variant={variants[status]}>{labels[status]}</Badge>;
};

type StockoutIndicatorProps = {
	days: number | null;
	urgentLabel: string;
	daysLabel: string;
	unknownLabel: string;
};

const StockoutIndicator = ({ days, urgentLabel, daysLabel, unknownLabel }: StockoutIndicatorProps) => {
	if (days === null) {
		return <span className="text-sm text-muted-foreground">{unknownLabel}</span>;
	}

	if (days <= 3) {
		return (
			<div className="flex items-center gap-1 text-destructive">
				<AlertTriangle className="size-3.5" />
				<span className="text-sm font-medium">{urgentLabel}</span>
			</div>
		);
	}

	return (
		<span className="text-sm text-muted-foreground">
			{days} {daysLabel}
		</span>
	);
};

type InventoryRowProps = {
	item: InventoryItem;
	statusLabels: Record<'critical' | 'low' | 'pending-order' | 'backordered', string>;
	actions: { label: string; onClick: (id: string) => void }[];
};

const InventoryRow = ({ item, statusLabels, actions }: InventoryRowProps) => (
	<TableRow>
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
			<div className="space-y-0.5">
				<div className={`font-semibold tabular-nums ${item.quantity <= item.reorderPoint ? 'text-destructive' : ''}`}>
					{item.quantity}
				</div>
				<div className="text-xs text-muted-foreground">Reorder: {item.reorderPoint}</div>
			</div>
		</TableCell>
		<TableCell>
			{item.pendingOrders > 0 ? (
				<div className="flex items-center gap-1.5 text-sm">
					<ShoppingCart className="size-3.5 text-muted-foreground" />
					<span>{item.pendingOrders} pending</span>
				</div>
			) : (
				<span className="text-sm text-muted-foreground">—</span>
			)}
		</TableCell>
		<TableCell>
			<StockoutIndicator
				days={item.daysUntilStockout}
				urgentLabel="Urgent"
				daysLabel="days"
				unknownLabel="N/A"
			/>
		</TableCell>
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

export default function Main() {
	const [activeTab, setActiveTab] = React.useState('all');

	const inventory: InventoryItem[] = [
		{ id: '1', name: 'Wireless Earbuds', sku: 'WE-001', image: '', quantity: 5, reorderPoint: 20, pendingOrders: 15, daysUntilStockout: 2, status: 'critical' },
		{ id: '2', name: 'Phone Case Leather', sku: 'PCL-002', image: '', quantity: 18, reorderPoint: 25, pendingOrders: 8, daysUntilStockout: 7, status: 'low' },
		{ id: '3', name: 'Screen Protector', sku: 'SP-003', image: '', quantity: 45, reorderPoint: 50, pendingOrders: 0, daysUntilStockout: 12, status: 'pending-order' },
		{ id: '4', name: 'USB Cable 3m', sku: 'UC3-004', image: '', quantity: 0, reorderPoint: 100, pendingOrders: 50, daysUntilStockout: null, status: 'backordered' },
		{ id: '5', name: 'Power Bank 10K', sku: 'PB10-005', image: '', quantity: 8, reorderPoint: 15, pendingOrders: 12, daysUntilStockout: 3, status: 'critical' },
	];

	const tabs: TabConfig[] = [
		{ value: 'all', label: 'All Alerts', icon: AlertTriangle, count: inventory.length },
		{ value: 'critical', label: 'Critical', icon: AlertTriangle, count: inventory.filter(i => i.status === 'critical').length },
		{ value: 'low', label: 'Low Stock', icon: Package, count: inventory.filter(i => i.status === 'low').length },
		{ value: 'pending', label: 'Pending', icon: Clock, count: inventory.filter(i => i.status === 'pending-order').length },
	];

	const statusLabels = {
		critical: 'Critical',
		low: 'Low Stock',
		'pending-order': 'Order Pending',
		backordered: 'Backordered',
	};

	const actions = [
		{ label: 'Create Order', onClick: (id: string) => console.log('Order', id) },
		{ label: 'View History', onClick: (id: string) => console.log('History', id) },
		{ label: 'Adjust Stock', onClick: (id: string) => console.log('Adjust', id) },
	];

	const filteredInventory = activeTab === 'all' 
		? inventory 
		: inventory.filter(item => {
			if (activeTab === 'pending') return item.status === 'pending-order';
			return item.status === activeTab;
		});

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Stock Alerts"
						description="Items requiring immediate attention"
						tabs={tabs}
						activeTab={activeTab}
						onTabChange={setActiveTab}
					/>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Stock</TableHead>
									<TableHead>Pending Orders</TableHead>
									<TableHead>Stockout ETA</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{filteredInventory.map((item) => (
									<InventoryRow
										key={item.id}
										item={item}
										statusLabels={statusLabels}
										actions={actions}
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
