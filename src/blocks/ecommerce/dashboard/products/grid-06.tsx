'use client';

import * as React from 'react';
import {
	Package,
	Boxes,
	AlertTriangle,
	RotateCcw,
	MoreVertical,
	TrendingUp,
	TrendingDown,
	ArrowRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface InventoryProduct {
	id: string;
	name: string;
	sku: string;
	image: string;
	currentStock: number;
	minStock: number;
	maxStock: number;
	reserved: number;
	incoming: number;
	lastRestocked: string;
	weeklySales: number;
	salesTrend: number;
}

interface StockLevelProps {
	current: number;
	min: number;
	max: number;
	reserved: number;
}

const StockLevel = ({ current, min, max, reserved }: StockLevelProps) => {
	const available = current - reserved;
	const percentage = (current / max) * 100;
	const isLow = current <= min;
	const isCritical = current <= min * 0.5;

	const getStatusColor = () => {
		if (isCritical) return '[&>div]:bg-red-500';
		if (isLow) return '[&>div]:bg-amber-500';
		return '[&>div]:bg-emerald-500';
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Stock Level</span>
				<span
					className={`font-medium ${isCritical ? 'text-red-500' : isLow ? 'text-amber-500' : 'text-emerald-500'}`}
				>
					{current} / {max}
				</span>
			</div>
			<Progress value={percentage} className={`h-2 ${getStatusColor()}`} />
			<div className="flex items-center justify-between text-xs text-muted-foreground">
				<span>Available: {available}</span>
				<span>Reserved: {reserved}</span>
			</div>
		</div>
	);
};

interface LowStockAlertProps {
	current: number;
	min: number;
	labels: { critical: string; low: string };
}

const LowStockAlert = ({ current, min, labels }: LowStockAlertProps) => {
	if (current > min) return null;

	const isCritical = current <= min * 0.5;

	return (
		<div
			className={`flex items-center gap-2 rounded-lg p-2 text-xs ${
				isCritical
					? 'bg-red-500/10 text-red-500'
					: 'bg-amber-500/10 text-amber-500'
			}`}
		>
			<AlertTriangle className="size-4" />
			<span>{isCritical ? labels.critical : labels.low}</span>
		</div>
	);
};

interface IncomingStockProps {
	quantity: number;
	label: string;
}

const IncomingStock = ({ quantity, label }: IncomingStockProps) => {
	if (quantity === 0) return null;

	return (
		<div className="flex items-center gap-2 rounded-lg bg-primary/10 p-2 text-xs text-primary">
			<Boxes className="size-4" />
			<span>
				{quantity} {label}
			</span>
		</div>
	);
};

interface SalesVelocityProps {
	weeklyCount: number;
	trend: number;
	label: string;
}

const SalesVelocity = ({ weeklyCount, trend, label }: SalesVelocityProps) => {
	const isPositive = trend >= 0;

	return (
		<div className="flex items-center justify-between rounded-lg border bg-muted/30 p-3">
			<div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-lg font-bold">{weeklyCount}</p>
			</div>
			<div
				className={`flex items-center gap-1 text-sm ${
					isPositive ? 'text-emerald-500' : 'text-red-500'
				}`}
			>
				{isPositive ? (
					<TrendingUp className="size-4" />
				) : (
					<TrendingDown className="size-4" />
				)}
				{Math.abs(trend)}%
			</div>
		</div>
	);
};

interface RestockInfoProps {
	date: string;
	label: string;
}

const RestockInfo = ({ date, label }: RestockInfoProps) => {
	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
	};

	return (
		<div className="flex items-center gap-2 text-xs text-muted-foreground">
			<RotateCcw className="size-3.5" />
			<span>
				{label}: {formatDate(date)}
			</span>
		</div>
	);
};

interface ProductCardProps {
	product: InventoryProduct;
	actions: { label: string; onClick: (id: string) => void }[];
	labels: {
		critical: string;
		low: string;
		incoming: string;
		weeklySales: string;
		lastRestock: string;
		reorder: string;
	};
}

const ProductCard = ({ product, actions, labels }: ProductCardProps) => (
	<Card className="flex flex-col overflow-hidden">
		<CardContent className="flex-1 space-y-4 p-4">
			<div className="flex gap-4">
				<div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-8 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="min-w-0 flex-1">
					<div className="flex items-start justify-between">
						<div>
							<h3 className="truncate font-semibold">{product.name}</h3>
							<p className="text-xs text-muted-foreground">{product.sku}</p>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon-sm">
									<MoreVertical className="size-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								{actions.map((action) => (
									<DropdownMenuItem
										key={action.label}
										onClick={() => action.onClick(product.id)}
									>
										{action.label}
									</DropdownMenuItem>
								))}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<RestockInfo
						date={product.lastRestocked}
						label={labels.lastRestock}
					/>
				</div>
			</div>

			<StockLevel
				current={product.currentStock}
				min={product.minStock}
				max={product.maxStock}
				reserved={product.reserved}
			/>

			<div className="grid gap-2 @sm:grid-cols-2">
				<LowStockAlert
					current={product.currentStock}
					min={product.minStock}
					labels={{ critical: labels.critical, low: labels.low }}
				/>
				<IncomingStock quantity={product.incoming} label={labels.incoming} />
			</div>

			<SalesVelocity
				weeklyCount={product.weeklySales}
				trend={product.salesTrend}
				label={labels.weeklySales}
			/>
		</CardContent>
		<CardFooter className="border-t bg-muted/30 p-3">
			<Button variant="outline" size="sm" className="w-full gap-2">
				{labels.reorder}
				<ArrowRight className="size-4" />
			</Button>
		</CardFooter>
	</Card>
);

export default function Main() {
	const products: InventoryProduct[] = [
		{
			id: '1',
			name: 'Wireless Bluetooth Headphones',
			sku: 'WBH-001',
			image:
				'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop',
			currentStock: 12,
			minStock: 25,
			maxStock: 100,
			reserved: 3,
			incoming: 50,
			lastRestocked: '2024-02-15',
			weeklySales: 34,
			salesTrend: 12,
		},
		{
			id: '2',
			name: 'USB-C Charging Cable 2m',
			sku: 'USB-C-2M',
			image:
				'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
			currentStock: 156,
			minStock: 50,
			maxStock: 300,
			reserved: 12,
			incoming: 0,
			lastRestocked: '2024-03-01',
			weeklySales: 89,
			salesTrend: 5,
		},
		{
			id: '3',
			name: 'Portable Power Bank 20000mAh',
			sku: 'PPB-20K',
			image:
				'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=200&h=200&fit=crop',
			currentStock: 8,
			minStock: 30,
			maxStock: 150,
			reserved: 5,
			incoming: 100,
			lastRestocked: '2024-01-20',
			weeklySales: 45,
			salesTrend: -8,
		},
		{
			id: '4',
			name: 'Laptop Sleeve 15 inch',
			sku: 'LSV-15',
			image:
				'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
			currentStock: 5,
			minStock: 20,
			maxStock: 80,
			reserved: 2,
			incoming: 0,
			lastRestocked: '2024-02-28',
			weeklySales: 18,
			salesTrend: -15,
		},
		{
			id: '5',
			name: 'Mechanical Keyboard TKL',
			sku: 'MKB-TKL',
			image:
				'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=200&h=200&fit=crop',
			currentStock: 67,
			minStock: 15,
			maxStock: 100,
			reserved: 8,
			incoming: 0,
			lastRestocked: '2024-03-05',
			weeklySales: 23,
			salesTrend: 28,
		},
		{
			id: '6',
			name: 'Wireless Mouse Ergonomic',
			sku: 'WME-001',
			image:
				'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop',
			currentStock: 34,
			minStock: 25,
			maxStock: 120,
			reserved: 4,
			incoming: 40,
			lastRestocked: '2024-02-22',
			weeklySales: 31,
			salesTrend: 3,
		},
	];

	const actions = [
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit Stock', onClick: (id: string) => console.log('Edit', id) },
		{
			label: 'Create PO',
			onClick: (id: string) => console.log('Create PO', id),
		},
		{
			label: 'Stock History',
			onClick: (id: string) => console.log('History', id),
		},
	];

	const labels = {
		critical: 'Critical Stock Level',
		low: 'Low Stock Alert',
		incoming: 'units incoming',
		weeklySales: 'Weekly Sales',
		lastRestock: 'Last restock',
		reorder: 'Reorder Stock',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @md:grid-cols-2 @xl:grid-cols-3">
					{products.map((product) => (
						<ProductCard
							key={product.id}
							product={product}
							actions={actions}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
