'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	AlertTriangle,
	CheckCircle,
	ArrowRight,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type StockStatus = 'healthy' | 'warning' | 'critical';

type StockItem = {
	id: string;
	name: string;
	sku: string;
	category: string;
	daysOfStock: number;
	status: StockStatus;
	reorderPoint: number;
	currentStock: number;
};

type StatusCardProps = {
	status: StockStatus;
	count: number;
	label: string;
	icon: React.ElementType;
};

const StatusCard = ({ status, count, label, icon: Icon }: StatusCardProps) => {
	const colors: Record<StockStatus, { bg: string; text: string; icon: string }> = {
		healthy: { bg: 'bg-emerald-500/10', text: 'text-emerald-500', icon: 'text-emerald-500' },
		warning: { bg: 'bg-amber-500/10', text: 'text-amber-500', icon: 'text-amber-500' },
		critical: { bg: 'bg-red-500/10', text: 'text-red-500', icon: 'text-red-500' },
	};

	const { bg, text, icon: iconColor } = colors[status];

	return (
		<div className={`rounded-lg p-4 ${bg}`}>
			<div className="flex items-center gap-3">
				<Icon className={`size-8 ${iconColor}`} />
				<div>
					<p className={`text-2xl font-bold ${text}`}>{count}</p>
					<p className="text-sm text-muted-foreground">{label}</p>
				</div>
			</div>
		</div>
	);
};

type StockRowProps = {
	item: StockItem;
};

const StockRow = ({ item }: StockRowProps) => {
	const statusConfig: Record<StockStatus, { color: string; label: string }> = {
		healthy: { color: 'bg-emerald-500', label: 'Healthy' },
		warning: { color: 'bg-amber-500', label: 'Warning' },
		critical: { color: 'bg-red-500', label: 'Critical' },
	};

	const { color, label } = statusConfig[item.status];
	const stockPercentage = Math.min((item.currentStock / (item.reorderPoint * 3)) * 100, 100);

	return (
		<div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
			<div className={`size-3 shrink-0 rounded-full ${color}`} />
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<span className="truncate font-medium">{item.name}</span>
					<Badge variant="outline" className="shrink-0 text-xs">
						{item.category}
					</Badge>
				</div>
				<p className="text-xs text-muted-foreground">{item.sku}</p>
			</div>
			<div className="hidden w-32 @sm:block">
				<Progress value={stockPercentage} className="h-2" />
			</div>
			<div className="text-right">
				<p className="font-semibold tabular-nums">{item.currentStock}</p>
				<p className="text-xs text-muted-foreground">of {item.reorderPoint * 3}</p>
			</div>
			<div className="text-right">
				<p className="font-medium tabular-nums">{item.daysOfStock} days</p>
				<p className="text-xs text-muted-foreground">of stock</p>
			</div>
			<Button variant="ghost" size="sm">
				<ArrowRight className="size-4" />
			</Button>
		</div>
	);
};

export default function Main() {
	const items: StockItem[] = [
		{ id: '1', name: 'Wireless Headphones', sku: 'WH-001', category: 'Audio', daysOfStock: 45, status: 'healthy', reorderPoint: 100, currentStock: 245 },
		{ id: '2', name: 'USB-C Cable', sku: 'USB-001', category: 'Accessories', daysOfStock: 12, status: 'warning', reorderPoint: 200, currentStock: 85 },
		{ id: '3', name: 'Bluetooth Speaker', sku: 'BS-001', category: 'Audio', daysOfStock: 5, status: 'critical', reorderPoint: 50, currentStock: 18 },
		{ id: '4', name: 'Power Bank', sku: 'PB-001', category: 'Electronics', daysOfStock: 30, status: 'healthy', reorderPoint: 80, currentStock: 189 },
		{ id: '5', name: 'Phone Case', sku: 'PC-001', category: 'Accessories', daysOfStock: 8, status: 'warning', reorderPoint: 150, currentStock: 42 },
		{ id: '6', name: 'Smart Watch', sku: 'SW-001', category: 'Wearables', daysOfStock: 3, status: 'critical', reorderPoint: 60, currentStock: 12 },
	];

	const healthyCount = items.filter((i) => i.status === 'healthy').length;
	const warningCount = items.filter((i) => i.status === 'warning').length;
	const criticalCount = items.filter((i) => i.status === 'critical').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Stock Health</CardTitle>
						<CardDescription>Days of inventory remaining based on current sales velocity</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							<StatusCard status="healthy" count={healthyCount} label="Healthy Stock" icon={CheckCircle} />
							<StatusCard status="warning" count={warningCount} label="Need Attention" icon={Clock} />
							<StatusCard status="critical" count={criticalCount} label="Critical Level" icon={AlertTriangle} />
						</div>
						<div className="space-y-2">
							{items.map((item) => (
								<StockRow key={item.id} item={item} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
