import {
	AlertTriangle,
	ArrowRight,
	ArrowUpRight,
	Box,
	CheckCircle2,
	MoreHorizontal,
	Package,
	TrendingDown,
	TrendingUp,
	Truck,
	type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type InventoryKpi = {
	title: string;
	value: string;
	change: string;
	trend: 'up' | 'down';
	icon: LucideIcon;
	color: string;
};

type InventoryRow = {
	sku: string;
	name: string;
	category: string;
	inStock: number;
	reserved: number;
	available: number;
	reorderLevel: number;
	status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'reorder';
	location: string;
};

const InventoryKpiCard = ({
	title,
	value,
	change,
	trend,
	icon: Icon,
	color,
}: InventoryKpi) => (
	<Card>
		<CardContent className="flex items-center gap-4 p-4">
			<div className={`rounded-lg p-2.5 ${color}`}>
				<Icon className="size-5" />
			</div>
			<div className="flex-1">
				<p className="text-sm text-muted-foreground">{title}</p>
				<p className="text-2xl font-bold">{value}</p>
			</div>
			<span
				className={`flex items-center text-xs ${
					trend === 'up' ? 'text-emerald-500' : 'text-red-500'
				}`}
			>
				{trend === 'up' ? (
					<ArrowUpRight className="size-3" />
				) : (
					<TrendingDown className="size-3" />
				)}
				{change}
			</span>
		</CardContent>
	</Card>
);

const getStatusStyle = (status: InventoryRow['status']) => {
	switch (status) {
		case 'in-stock':
			return 'bg-emerald-500/10 text-emerald-500';
		case 'low-stock':
			return 'bg-amber-500/10 text-amber-500';
		case 'out-of-stock':
			return 'bg-red-500/10 text-red-500';
		case 'reorder':
			return 'bg-blue-500/10 text-blue-500';
	}
};

export default function Main() {
	const kpis: InventoryKpi[] = [
		{ title: 'Total SKUs', value: '1,247', change: '+12', trend: 'up', icon: Package, color: 'bg-primary/10 text-primary' },
		{ title: 'In Stock', value: '1,089', change: '+24', trend: 'up', icon: CheckCircle2, color: 'bg-emerald-500/10 text-emerald-500' },
		{ title: 'Low Stock', value: '126', change: '-8', trend: 'up', icon: AlertTriangle, color: 'bg-amber-500/10 text-amber-500' },
		{ title: 'Out of Stock', value: '32', change: '+5', trend: 'down', icon: Box, color: 'bg-red-500/10 text-red-500' },
	];

	const inventory: InventoryRow[] = [
		{ sku: 'SKU-001', name: 'Wireless Headphones Pro', category: 'Electronics', inStock: 45, reserved: 12, available: 33, reorderLevel: 20, status: 'in-stock', location: 'Warehouse A' },
		{ sku: 'SKU-002', name: 'Smart Watch Ultra', category: 'Electronics', inStock: 12, reserved: 5, available: 7, reorderLevel: 15, status: 'low-stock', location: 'Warehouse A' },
		{ sku: 'SKU-003', name: 'Ergonomic Laptop Stand', category: 'Accessories', inStock: 78, reserved: 8, available: 70, reorderLevel: 25, status: 'in-stock', location: 'Warehouse B' },
		{ sku: 'SKU-004', name: 'Mechanical Keyboard', category: 'Electronics', inStock: 0, reserved: 0, available: 0, reorderLevel: 30, status: 'out-of-stock', location: 'Warehouse A' },
		{ sku: 'SKU-005', name: 'USB-C Hub 7-in-1', category: 'Accessories', inStock: 234, reserved: 45, available: 189, reorderLevel: 50, status: 'in-stock', location: 'Warehouse C' },
		{ sku: 'SKU-006', name: 'Noise Cancelling Earbuds', category: 'Electronics', inStock: 18, reserved: 10, available: 8, reorderLevel: 20, status: 'reorder', location: 'Warehouse A' },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<div className="space-y-6">
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-4">
						{kpis.map((kpi, i) => (
							<InventoryKpiCard key={i} {...kpi} />
						))}
					</div>
					<Card>
						<CardHeader className="flex-row items-center justify-between pb-4">
							<CardTitle className="text-base">Inventory Status</CardTitle>
							<Button variant="ghost" size="sm" className="gap-1" asChild>
								<Link href="/inventory">
									View All
									<ArrowRight className="size-3" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent className="pt-0">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Product</TableHead>
										<TableHead className="hidden @lg:table-cell">Category</TableHead>
										<TableHead>In Stock</TableHead>
										<TableHead className="hidden @xl:table-cell">Reserved</TableHead>
										<TableHead>Available</TableHead>
										<TableHead className="hidden @lg:table-cell">Stock Level</TableHead>
										<TableHead>Status</TableHead>
										<TableHead className="w-10"></TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{inventory.map((item) => {
										const stockPercentage = Math.min(
											(item.inStock / (item.reorderLevel * 2)) * 100,
											100
										);
										return (
											<TableRow key={item.sku}>
												<TableCell>
													<div>
														<p className="font-medium">{item.name}</p>
														<p className="text-xs text-muted-foreground">{item.sku}</p>
													</div>
												</TableCell>
												<TableCell className="hidden @lg:table-cell">{item.category}</TableCell>
												<TableCell>{item.inStock}</TableCell>
												<TableCell className="hidden @xl:table-cell">{item.reserved}</TableCell>
												<TableCell className="font-medium">{item.available}</TableCell>
												<TableCell className="hidden @lg:table-cell">
													<div className="w-24">
														<Progress
															value={stockPercentage}
															className="h-2"
														/>
													</div>
												</TableCell>
												<TableCell>
													<Badge variant="secondary" className={getStatusStyle(item.status)}>
														{item.status.replace('-', ' ')}
													</Badge>
												</TableCell>
												<TableCell>
													<Button variant="ghost" size="icon" className="size-8">
														<MoreHorizontal className="size-4" />
													</Button>
												</TableCell>
											</TableRow>
										);
									})}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
				</div>
			</div>
		</section>
	);
}
