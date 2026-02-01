'use client';

import * as React from 'react';
import {
	Package,
	AlertTriangle,
	TrendingUp,
	History,
	Warehouse,
	Settings,
	BarChart3,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Product = {
	id: string;
	name: string;
	sku: string;
	stock: number;
	status: 'in-stock' | 'low' | 'out';
};

type ProductTableProps = {
	products: Product[];
};

const ProductTable = ({ products }: ProductTableProps) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead>Product</TableHead>
				<TableHead>SKU</TableHead>
				<TableHead className="text-right">Stock</TableHead>
				<TableHead>Status</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{products.map((product) => (
				<TableRow key={product.id}>
					<TableCell className="font-medium">{product.name}</TableCell>
					<TableCell className="text-muted-foreground">{product.sku}</TableCell>
					<TableCell className="text-right">{product.stock}</TableCell>
					<TableCell>
						<Badge
							variant={
								product.status === 'in-stock'
									? 'default'
									: product.status === 'low'
										? 'secondary'
										: 'destructive'
							}
						>
							{product.status === 'in-stock'
								? 'In Stock'
								: product.status === 'low'
									? 'Low'
									: 'Out'}
						</Badge>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	</Table>
);

type TabConfig = {
	value: string;
	label: string;
	icon: React.ReactNode;
	count?: number;
};

export default function Main() {
	const tabs: TabConfig[] = [
		{
			value: 'all',
			label: 'All Items',
			icon: <Package className="size-4" />,
			count: 1250,
		},
		{
			value: 'low-stock',
			label: 'Low Stock',
			icon: <AlertTriangle className="size-4" />,
			count: 45,
		},
		{
			value: 'trending',
			label: 'Trending',
			icon: <TrendingUp className="size-4" />,
			count: 23,
		},
		{
			value: 'history',
			label: 'History',
			icon: <History className="size-4" />,
		},
		{
			value: 'locations',
			label: 'Locations',
			icon: <Warehouse className="size-4" />,
		},
		{
			value: 'analytics',
			label: 'Analytics',
			icon: <BarChart3 className="size-4" />,
		},
		{
			value: 'settings',
			label: 'Settings',
			icon: <Settings className="size-4" />,
		},
	];

	const products: Product[] = [
		{
			id: '1',
			name: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			stock: 245,
			status: 'in-stock',
		},
		{
			id: '2',
			name: 'USB-C Fast Charger',
			sku: 'UFC-001',
			stock: 12,
			status: 'low',
		},
		{
			id: '3',
			name: 'Phone Case Premium',
			sku: 'PCP-001',
			stock: 567,
			status: 'in-stock',
		},
		{ id: '4', name: 'Wireless Mouse', sku: 'WM-001', stock: 0, status: 'out' },
		{
			id: '5',
			name: 'Laptop Stand',
			sku: 'LS-001',
			stock: 89,
			status: 'in-stock',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Inventory Tabs
						</CardTitle>
						<CardDescription>
							Navigate between different inventory views
						</CardDescription>
					</CardHeader>
					<CardContent>
						<Tabs defaultValue="all" className="space-y-4">
							<TabsList className="flex-wrap h-auto gap-1">
								{tabs.map((tab) => (
									<TabsTrigger
										key={tab.value}
										value={tab.value}
										className="gap-2"
									>
										{tab.icon}
										<span className="hidden @sm:inline">{tab.label}</span>
										{tab.count !== undefined && (
											<Badge
												variant="secondary"
												className="ml-1 hidden @md:flex"
											>
												{tab.count}
											</Badge>
										)}
									</TabsTrigger>
								))}
							</TabsList>
							<TabsContent value="all">
								<ProductTable products={products} />
							</TabsContent>
							<TabsContent value="low-stock">
								<ProductTable
									products={products.filter((p) => p.status === 'low')}
								/>
							</TabsContent>
							<TabsContent value="trending">
								<div className="py-8 text-center text-muted-foreground">
									Trending products analysis coming soon
								</div>
							</TabsContent>
							<TabsContent value="history">
								<div className="py-8 text-center text-muted-foreground">
									Movement history timeline
								</div>
							</TabsContent>
							<TabsContent value="locations">
								<div className="py-8 text-center text-muted-foreground">
									Warehouse location management
								</div>
							</TabsContent>
							<TabsContent value="analytics">
								<div className="py-8 text-center text-muted-foreground">
									Inventory analytics dashboard
								</div>
							</TabsContent>
							<TabsContent value="settings">
								<div className="py-8 text-center text-muted-foreground">
									Inventory settings and configuration
								</div>
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
