'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	Clock,
	DollarSign,
	MoreHorizontal,
	ArrowUpRight,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type ListItem = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	reorderPoint: number;
	daysOfStock: number;
	value: number;
	urgency: 'critical' | 'high' | 'medium' | 'low';
};

type ListRowProps = {
	item: ListItem;
};

const ListRow = ({ item }: ListRowProps) => {
	const urgencyConfig = {
		critical: { color: 'bg-destructive', text: 'Critical' },
		high: { color: 'bg-orange-500', text: 'High' },
		medium: { color: 'bg-amber-500', text: 'Medium' },
		low: { color: 'bg-muted', text: 'Low' },
	};

	const { color, text } = urgencyConfig[item.urgency];

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<div className={`h-full w-1 self-stretch rounded-full ${color}`} />
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Package className="size-5 text-muted-foreground" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<p className="truncate font-medium">{item.name}</p>
					<Badge variant={item.urgency === 'critical' ? 'destructive' : 'secondary'} className="text-xs">
						{text}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">{item.sku}</p>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">Stock</p>
				<p className={`font-semibold ${item.stock <= item.reorderPoint ? 'text-destructive' : ''}`}>
					{item.stock}
				</p>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">Reorder At</p>
				<p className="font-medium">{item.reorderPoint}</p>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Days Left</p>
				<div className="flex items-center justify-center gap-1">
					<Clock className="size-3 text-muted-foreground" />
					<span className={`font-semibold ${item.daysOfStock <= 7 ? 'text-destructive' : item.daysOfStock <= 14 ? 'text-amber-500' : ''}`}>
						{item.daysOfStock}d
					</span>
				</div>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Value at Risk</p>
				<p className="font-semibold">${item.value.toLocaleString()}</p>
			</div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem>Create Purchase Order</DropdownMenuItem>
					<DropdownMenuItem>View Product</DropdownMenuItem>
					<DropdownMenuItem>Adjust Reorder Point</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

type SummaryProps = {
	criticalCount: number;
	totalValue: number;
};

const Summary = ({ criticalCount, totalValue }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-2">
		<div className="flex items-center gap-3 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
			<AlertTriangle className="size-8 text-destructive" />
			<div>
				<p className="text-2xl font-bold text-destructive">{criticalCount}</p>
				<p className="text-sm text-muted-foreground">Critical items need reorder</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<DollarSign className="size-8 text-primary" />
			<div>
				<p className="text-2xl font-bold">${totalValue.toLocaleString()}</p>
				<p className="text-sm text-muted-foreground">Value at risk of stockout</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const items: ListItem[] = [
		{ id: '1', name: 'Wireless Earbuds Pro', sku: 'WEP-001', stock: 12, reorderPoint: 50, daysOfStock: 3, value: 2400, urgency: 'critical' },
		{ id: '2', name: 'USB-C Fast Charger', sku: 'UFC-001', stock: 34, reorderPoint: 100, daysOfStock: 5, value: 1360, urgency: 'critical' },
		{ id: '3', name: 'Phone Case Premium', sku: 'PCP-001', stock: 89, reorderPoint: 150, daysOfStock: 10, value: 2670, urgency: 'high' },
		{ id: '4', name: 'Screen Protector HD', sku: 'SPH-001', stock: 156, reorderPoint: 200, daysOfStock: 14, value: 1560, urgency: 'medium' },
		{ id: '5', name: 'Bluetooth Speaker', sku: 'BTS-001', stock: 78, reorderPoint: 80, daysOfStock: 21, value: 5460, urgency: 'low' },
	];

	const criticalCount = items.filter((i) => i.urgency === 'critical').length;
	const totalValue = items.filter((i) => i.urgency === 'critical' || i.urgency === 'high').reduce((sum, i) => sum + i.value, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Reorder Queue</CardTitle>
								<CardDescription>Items approaching or below reorder point</CardDescription>
							</div>
							<Button>
								Create Bulk Order
								<ArrowUpRight className="ml-2 size-4" />
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary criticalCount={criticalCount} totalValue={totalValue} />
						<div>
							{items.map((item) => (
								<ListRow key={item.id} item={item} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
