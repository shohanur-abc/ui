'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	DollarSign,
	ArrowRight,
	MoreHorizontal,
	Clock,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type StockItem = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	value: number;
	change: number;
	lastUpdated: string;
};

type StockItemRowProps = {
	item: StockItem;
};

const StockItemRow = ({ item }: StockItemRowProps) => (
	<div className="flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-muted/50">
		<div className="flex items-center gap-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Package className="size-5 text-muted-foreground" />
			</div>
			<div>
				<p className="font-medium">{item.name}</p>
				<p className="text-xs text-muted-foreground">{item.sku}</p>
			</div>
		</div>
		<div className="flex items-center gap-6">
			<div className="text-right">
				<p className="font-semibold tabular-nums">
					{item.stock.toLocaleString()}
				</p>
				<p className="text-xs text-muted-foreground">units</p>
			</div>
			<div className="text-right">
				<p className="font-semibold tabular-nums">
					${item.value.toLocaleString()}
				</p>
				<div
					className={`flex items-center justify-end gap-0.5 text-xs ${item.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}
				>
					{item.change >= 0 ? (
						<TrendingUp className="size-3" />
					) : (
						<TrendingDown className="size-3" />
					)}
					{Math.abs(item.change)}%
				</div>
			</div>
			<Button variant="ghost" size="icon-sm">
				<MoreHorizontal className="size-4" />
			</Button>
		</div>
	</div>
);

type TabPanelProps = {
	items: StockItem[];
	emptyMessage: string;
};

const TabPanel = ({ items, emptyMessage }: TabPanelProps) => (
	<div className="space-y-3">
		{items.length > 0 ? (
			items.map((item) => <StockItemRow key={item.id} item={item} />)
		) : (
			<div className="py-8 text-center text-muted-foreground">
				{emptyMessage}
			</div>
		)}
	</div>
);

export default function Main() {
	const allItems: StockItem[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			stock: 2450,
			value: 195600,
			change: 15,
			lastUpdated: '2024-01-18',
		},
		{
			id: '2',
			name: 'Smart Watch Ultra',
			sku: 'SWU-002',
			stock: 1890,
			value: 377811,
			change: -8,
			lastUpdated: '2024-01-18',
		},
		{
			id: '3',
			name: 'USB-C Fast Charger',
			sku: 'UFC-003',
			stock: 1654,
			value: 24810,
			change: 22,
			lastUpdated: '2024-01-17',
		},
		{
			id: '4',
			name: 'Mechanical Keyboard',
			sku: 'MK-004',
			stock: 1420,
			value: 212858,
			change: -3,
			lastUpdated: '2024-01-17',
		},
		{
			id: '5',
			name: 'Bluetooth Speaker',
			sku: 'BS-005',
			stock: 1205,
			value: 60250,
			change: 5,
			lastUpdated: '2024-01-16',
		},
	];

	const lowStockItems = allItems.filter((i) => i.stock < 1500);
	const highValueItems = allItems.filter((i) => i.value > 100000);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Inventory Tabs
						</CardTitle>
						<CardDescription>View and manage stock by category</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="w-full">
							<div className="flex items-center justify-between">
								<TabsList>
									<TabsTrigger value="all">
										All Products
										<Badge variant="secondary" className="ml-2">
											{allItems.length}
										</Badge>
									</TabsTrigger>
									<TabsTrigger value="low-stock">
										Low Stock
										<Badge variant="secondary" className="ml-2">
											{lowStockItems.length}
										</Badge>
									</TabsTrigger>
									<TabsTrigger value="high-value">
										High Value
										<Badge variant="secondary" className="ml-2">
											{highValueItems.length}
										</Badge>
									</TabsTrigger>
								</TabsList>
								<Button variant="outline" size="sm">
									View All
									<ArrowRight className="ml-2 size-4" />
								</Button>
							</div>
							<TabsContent value="all" className="mt-6">
								<TabPanel items={allItems} emptyMessage="No products found" />
							</TabsContent>
							<TabsContent value="low-stock" className="mt-6">
								<TabPanel
									items={lowStockItems}
									emptyMessage="No low stock items"
								/>
							</TabsContent>
							<TabsContent value="high-value" className="mt-6">
								<TabPanel
									items={highValueItems}
									emptyMessage="No high value items"
								/>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
