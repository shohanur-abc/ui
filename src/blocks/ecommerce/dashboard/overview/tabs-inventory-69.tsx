import {
	AlertCircle,
	Box,
	CheckCircle2,
	Package,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type InventoryItem = {
	sku: string;
	name: string;
	quantity: number;
	reorderLevel: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock';
	location: string;
};

const getStatusIcon = (status: InventoryItem['status']) => {
	switch (status) {
		case 'in-stock':
			return <CheckCircle2 className="size-4 text-emerald-500" />;
		case 'low-stock':
			return <AlertCircle className="size-4 text-amber-500" />;
		case 'out-of-stock':
			return <Box className="size-4 text-red-500" />;
	}
};

const getStatusStyle = (status: InventoryItem['status']) => {
	switch (status) {
		case 'in-stock':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'low-stock':
			return 'bg-amber-500/10 text-amber-500';
		case 'out-of-stock':
			return 'bg-red-500/10 text-red-500';
	}
};

const InventoryCard = (item: InventoryItem) => {
	const stockLevel = Math.min((item.quantity / (item.reorderLevel * 2)) * 100, 100);

	return (
		<div className="rounded-xl border bg-card p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					{getStatusIcon(item.status)}
					<div>
						<p className="font-medium">{item.name}</p>
						<p className="text-xs text-muted-foreground">{item.sku}</p>
					</div>
				</div>
				<Badge variant="secondary" className={getStatusStyle(item.status)}>
					{item.status.replace('-', ' ')}
				</Badge>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Stock Level</span>
					<span className="font-medium">{item.quantity} units</span>
				</div>
				<Progress value={stockLevel} className="h-2" />
				<p className="text-xs text-muted-foreground">Reorder at {item.reorderLevel} units</p>
			</div>
			<div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
				<Truck className="size-3" />
				{item.location}
			</div>
		</div>
	);
};

export default function Main() {
	const allItems: InventoryItem[] = [
		{ sku: 'SKU-001', name: 'Wireless Headphones Pro', quantity: 45, reorderLevel: 20, status: 'in-stock', location: 'Warehouse A' },
		{ sku: 'SKU-002', name: 'Smart Watch Ultra', quantity: 12, reorderLevel: 15, status: 'low-stock', location: 'Warehouse A' },
		{ sku: 'SKU-003', name: 'Ergonomic Laptop Stand', quantity: 78, reorderLevel: 25, status: 'in-stock', location: 'Warehouse B' },
		{ sku: 'SKU-004', name: 'Mechanical Keyboard', quantity: 0, reorderLevel: 30, status: 'out-of-stock', location: 'Warehouse A' },
		{ sku: 'SKU-005', name: 'USB-C Hub 7-in-1', quantity: 234, reorderLevel: 50, status: 'in-stock', location: 'Warehouse C' },
		{ sku: 'SKU-006', name: 'Noise Cancelling Earbuds', quantity: 8, reorderLevel: 20, status: 'low-stock', location: 'Warehouse A' },
	];

	const inStock = allItems.filter((i) => i.status === 'in-stock');
	const lowStock = allItems.filter((i) => i.status === 'low-stock');
	const outOfStock = allItems.filter((i) => i.status === 'out-of-stock');

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="size-5 text-primary" />
							Inventory Management
						</CardTitle>
						<CardDescription>Track stock levels by status</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="w-full">
							<TabsList className="mb-4">
								<TabsTrigger value="all">All Items ({allItems.length})</TabsTrigger>
								<TabsTrigger value="in-stock">
									<CheckCircle2 className="mr-1 size-3 text-emerald-500" />
									In Stock ({inStock.length})
								</TabsTrigger>
								<TabsTrigger value="low-stock">
									<AlertCircle className="mr-1 size-3 text-amber-500" />
									Low Stock ({lowStock.length})
								</TabsTrigger>
								<TabsTrigger value="out-of-stock">
									<Box className="mr-1 size-3 text-red-500" />
									Out of Stock ({outOfStock.length})
								</TabsTrigger>
							</TabsList>
							<TabsContent value="all">
								<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
									{allItems.map((item) => (
										<InventoryCard key={item.sku} {...item} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="in-stock">
								<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
									{inStock.map((item) => (
										<InventoryCard key={item.sku} {...item} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="low-stock">
								<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
									{lowStock.map((item) => (
										<InventoryCard key={item.sku} {...item} />
									))}
								</div>
							</TabsContent>
							<TabsContent value="out-of-stock">
								<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
									{outOfStock.map((item) => (
										<InventoryCard key={item.sku} {...item} />
									))}
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
