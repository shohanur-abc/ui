import {
	AlertCircle,
	ArrowUpRight,
	CheckCircle2,
	Package,
	RefreshCcw,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type InventoryAlert = {
	id: string;
	type: 'low-stock' | 'out-of-stock' | 'reorder' | 'incoming' | 'overstock';
	product: string;
	sku: string;
	quantity: number;
	threshold: number;
	action: string;
	priority: 'high' | 'medium' | 'low';
};

const getAlertConfig = (type: InventoryAlert['type']) => {
	switch (type) {
		case 'low-stock':
			return { icon: AlertCircle, color: 'bg-amber-500/10 text-amber-500', label: 'Low Stock' };
		case 'out-of-stock':
			return { icon: Package, color: 'bg-red-500/10 text-red-500', label: 'Out of Stock' };
		case 'reorder':
			return { icon: RefreshCcw, color: 'bg-blue-500/10 text-blue-500', label: 'Reorder' };
		case 'incoming':
			return { icon: Truck, color: 'bg-emerald-500/10 text-emerald-500', label: 'Incoming' };
		case 'overstock':
			return { icon: CheckCircle2, color: 'bg-violet-500/10 text-violet-500', label: 'Overstock' };
	}
};

const getPriorityStyle = (priority: InventoryAlert['priority']) => {
	switch (priority) {
		case 'high':
			return 'bg-red-500/10 text-red-500';
		case 'medium':
			return 'bg-amber-500/10 text-amber-500';
		case 'low':
			return 'bg-emerald-500/10 text-emerald-500';
	}
};

const InventoryAlertCard = ({ type, product, sku, quantity, threshold, action, priority }: InventoryAlert) => {
	const config = getAlertConfig(type);
	const Icon = config.icon;
	const stockLevel = Math.min((quantity / threshold) * 100, 100);

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="flex items-start justify-between gap-4">
				<div className="flex items-center gap-3">
					<div className={`rounded-lg p-2 ${config.color}`}>
						<Icon className="size-4" />
					</div>
					<div>
						<p className="font-medium">{product}</p>
						<p className="text-xs text-muted-foreground">{sku}</p>
					</div>
				</div>
				<div className="flex items-center gap-2">
					<Badge variant="secondary" className={config.color}>
						{config.label}
					</Badge>
					<Badge variant="outline" className={getPriorityStyle(priority)}>
						{priority}
					</Badge>
				</div>
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Current Stock</span>
					<span className="font-medium">{quantity} / {threshold} units</span>
				</div>
				<Progress value={stockLevel} className="h-2" />
			</div>
			<div className="mt-4 flex items-center justify-between">
				<span className="text-sm text-muted-foreground">{action}</span>
				<Button size="sm" variant="outline" className="gap-1">
					Take Action
					<ArrowUpRight className="size-3" />
				</Button>
			</div>
		</div>
	);
};

export default function Main() {
	const alerts: InventoryAlert[] = [
		{ id: '1', type: 'out-of-stock', product: 'Mechanical Keyboard', sku: 'SKU-004', quantity: 0, threshold: 30, action: 'Reorder immediately', priority: 'high' },
		{ id: '2', type: 'low-stock', product: 'Smart Watch Ultra', sku: 'SKU-002', quantity: 12, threshold: 50, action: 'Reorder within 3 days', priority: 'high' },
		{ id: '3', type: 'low-stock', product: 'Noise Cancelling Earbuds', sku: 'SKU-006', quantity: 8, threshold: 20, action: 'Reorder within 5 days', priority: 'medium' },
		{ id: '4', type: 'reorder', product: 'USB-C Hub 7-in-1', sku: 'SKU-005', quantity: 45, threshold: 50, action: 'Reorder scheduled', priority: 'medium' },
		{ id: '5', type: 'incoming', product: 'Wireless Headphones Pro', sku: 'SKU-001', quantity: 45, threshold: 50, action: '100 units arriving Dec 15', priority: 'low' },
		{ id: '6', type: 'overstock', product: 'USB-C Cables', sku: 'SKU-008', quantity: 500, threshold: 100, action: 'Consider promotional discount', priority: 'low' },
	];

	const criticalCount = alerts.filter((a) => a.priority === 'high').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Package className="size-5 text-primary" />
							Inventory Alerts
						</CardTitle>
						<CardDescription>
							{criticalCount} critical alerts require immediate attention
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-3">
						{alerts.map((alert) => (
							<InventoryAlertCard key={alert.id} {...alert} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
