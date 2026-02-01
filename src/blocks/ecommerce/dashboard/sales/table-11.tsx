'use client';

import { Warehouse, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type InventoryItem = {
	sku: string;
	name: string;
	category: string;
	inStock: number;
	reserved: number;
	available: number;
	reorderPoint: number;
	status: 'healthy' | 'low' | 'critical' | 'out-of-stock';
	daysOfSupply: number;
};

type InventoryTableCardProps = {
	title: string;
	description: string;
	items: InventoryItem[];
};

const getStatusBadge = (status: InventoryItem['status']) => {
	const styles: Record<
		InventoryItem['status'],
		{
			variant: 'default' | 'secondary' | 'destructive' | 'outline';
			icon: typeof CheckCircle;
		}
	> = {
		healthy: { variant: 'default', icon: CheckCircle },
		low: { variant: 'secondary', icon: AlertTriangle },
		critical: { variant: 'destructive', icon: AlertTriangle },
		'out-of-stock': { variant: 'destructive', icon: XCircle },
	};
	const { variant, icon: Icon } = styles[status];
	return (
		<Badge variant={variant} className="gap-1">
			<Icon className="size-3" />
			{status.replace('-', ' ')}
		</Badge>
	);
};

const InventoryTableCard = ({
	title,
	description,
	items,
}: InventoryTableCardProps) => (
	<Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30">
		<CardHeader className="flex flex-row items-center gap-3 pb-2">
			<div className="p-2 rounded-lg bg-primary/10 text-primary">
				<Warehouse className="size-4" />
			</div>
			<div>
				<CardTitle className="text-base font-semibold">{title}</CardTitle>
				<p className="text-sm text-muted-foreground">{description}</p>
			</div>
		</CardHeader>
		<CardContent>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Product</TableHead>
							<TableHead>Category</TableHead>
							<TableHead className="text-right">In Stock</TableHead>
							<TableHead className="text-right">Reserved</TableHead>
							<TableHead className="text-right">Available</TableHead>
							<TableHead className="w-[120px]">Stock Level</TableHead>
							<TableHead>Status</TableHead>
							<TableHead className="text-right">Supply Days</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{items.map((item) => {
							const stockPercentage = Math.min(
								100,
								(item.inStock / (item.reorderPoint * 3)) * 100,
							);
							return (
								<TableRow
									key={item.sku}
									className="hover:bg-muted/50 transition-colors"
								>
									<TableCell>
										<div>
											<p className="font-medium">{item.name}</p>
											<p className="text-xs text-muted-foreground font-mono">
												{item.sku}
											</p>
										</div>
									</TableCell>
									<TableCell className="text-muted-foreground">
										{item.category}
									</TableCell>
									<TableCell className="text-right font-medium">
										{item.inStock.toLocaleString()}
									</TableCell>
									<TableCell className="text-right text-muted-foreground">
										{item.reserved.toLocaleString()}
									</TableCell>
									<TableCell className="text-right font-semibold">
										{item.available.toLocaleString()}
									</TableCell>
									<TableCell>
										<Progress value={stockPercentage} className="h-2" />
									</TableCell>
									<TableCell>{getStatusBadge(item.status)}</TableCell>
									<TableCell className="text-right">
										<span
											className={
												item.daysOfSupply <= 7
													? 'text-destructive font-semibold'
													: item.daysOfSupply <= 14
														? 'text-amber-500'
														: 'text-muted-foreground'
											}
										>
											{item.daysOfSupply} days
										</span>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: InventoryItem[] = [
		{
			sku: 'SKU-001',
			name: 'Wireless Headphones',
			category: 'Electronics',
			inStock: 450,
			reserved: 85,
			available: 365,
			reorderPoint: 100,
			status: 'healthy',
			daysOfSupply: 32,
		},
		{
			sku: 'SKU-002',
			name: 'Smart Watch Pro',
			category: 'Electronics',
			inStock: 120,
			reserved: 45,
			available: 75,
			reorderPoint: 100,
			status: 'low',
			daysOfSupply: 12,
		},
		{
			sku: 'SKU-003',
			name: 'USB-C Hub',
			category: 'Accessories',
			inStock: 25,
			reserved: 18,
			available: 7,
			reorderPoint: 50,
			status: 'critical',
			daysOfSupply: 3,
		},
		{
			sku: 'SKU-004',
			name: 'Laptop Stand',
			category: 'Accessories',
			inStock: 280,
			reserved: 32,
			available: 248,
			reorderPoint: 75,
			status: 'healthy',
			daysOfSupply: 45,
		},
		{
			sku: 'SKU-005',
			name: 'Mechanical Keyboard',
			category: 'Electronics',
			inStock: 0,
			reserved: 0,
			available: 0,
			reorderPoint: 100,
			status: 'out-of-stock',
			daysOfSupply: 0,
		},
	];

	return (
		<section className="@container" data-theme="sales">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12">
				<InventoryTableCard
					title="Inventory Status"
					description="Stock levels and reorder alerts"
					items={items}
				/>
			</div>
		</section>
	);
}
