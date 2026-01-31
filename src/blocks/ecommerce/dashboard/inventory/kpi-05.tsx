'use client';

import {
	Package,
	AlertTriangle,
	TrendingUp,
	Boxes,
	ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type AlertItem = {
	id: string;
	type: 'low-stock' | 'overstock' | 'expiring';
	productName: string;
	sku: string;
	currentStock: number;
	threshold: number;
};

type AlertRowProps = {
	alert: AlertItem;
	labels: Record<'low-stock' | 'overstock' | 'expiring', string>;
	actionLabel: string;
	onAction: (id: string) => void;
};

const AlertRow = ({ alert, labels, actionLabel, onAction }: AlertRowProps) => {
	const colors = {
		'low-stock': 'text-red-500 bg-red-500/10',
		overstock: 'text-yellow-500 bg-yellow-500/10',
		expiring: 'text-orange-500 bg-orange-500/10',
	};

	const percentage = (alert.currentStock / alert.threshold) * 100;

	return (
		<div className="flex items-center gap-4 rounded-lg border p-3 transition-colors hover:bg-muted/50">
			<div className={`rounded-lg p-2 ${colors[alert.type]}`}>
				<AlertTriangle className="size-4" />
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-center justify-between gap-2">
					<span className="truncate font-medium">{alert.productName}</span>
					<span className="shrink-0 text-xs text-muted-foreground">{alert.sku}</span>
				</div>
				<div className="mt-1 flex items-center gap-2">
					<Progress
						value={Math.min(percentage, 100)}
						className={`h-1.5 flex-1 ${alert.type === 'low-stock' ? '[&>div]:bg-red-500' : alert.type === 'overstock' ? '[&>div]:bg-yellow-500' : '[&>div]:bg-orange-500'}`}
					/>
					<span className="text-xs text-muted-foreground tabular-nums">
						{alert.currentStock}/{alert.threshold}
					</span>
				</div>
			</div>
			<Button variant="ghost" size="sm" onClick={() => onAction(alert.id)}>
				{actionLabel}
				<ArrowRight className="size-3" />
			</Button>
		</div>
	);
};

type SummaryStatProps = {
	icon: React.ElementType;
	label: string;
	value: number;
	color: string;
};

const SummaryStat = ({ icon: Icon, label, value, color }: SummaryStatProps) => (
	<div className="flex items-center gap-3">
		<div className={`rounded-lg p-2 ${color}`}>
			<Icon className="size-5" />
		</div>
		<div>
			<p className="text-2xl font-bold tabular-nums">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</div>
	</div>
);

export default function Main() {
	const alerts: AlertItem[] = [
		{ id: '1', type: 'low-stock', productName: 'Wireless Earbuds Pro', sku: 'WEP-001', currentStock: 8, threshold: 50 },
		{ id: '2', type: 'low-stock', productName: 'USB-C Hub 7-Port', sku: 'UCH-002', currentStock: 12, threshold: 30 },
		{ id: '3', type: 'overstock', productName: 'Phone Case Clear', sku: 'PCC-003', currentStock: 850, threshold: 500 },
		{ id: '4', type: 'expiring', productName: 'Face Cream SPF30', sku: 'FC-004', currentStock: 45, threshold: 45 },
		{ id: '5', type: 'low-stock', productName: 'Gaming Mouse RGB', sku: 'GMR-005', currentStock: 5, threshold: 25 },
	];

	const alertLabels = {
		'low-stock': 'Low Stock',
		overstock: 'Overstock',
		expiring: 'Expiring Soon',
	};

	const lowStockCount = alerts.filter((a) => a.type === 'low-stock').length;
	const overstockCount = alerts.filter((a) => a.type === 'overstock').length;
	const expiringCount = alerts.filter((a) => a.type === 'expiring').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader className="flex flex-col gap-4 @lg:flex-row @lg:items-center @lg:justify-between">
						<CardTitle className="text-xl @lg:text-2xl">Inventory Alerts</CardTitle>
						<div className="flex flex-wrap gap-6">
							<SummaryStat
								icon={AlertTriangle}
								label="Low Stock"
								value={lowStockCount}
								color="bg-red-500/10 text-red-500"
							/>
							<SummaryStat
								icon={Boxes}
								label="Overstock"
								value={overstockCount}
								color="bg-yellow-500/10 text-yellow-500"
							/>
							<SummaryStat
								icon={Package}
								label="Expiring"
								value={expiringCount}
								color="bg-orange-500/10 text-orange-500"
							/>
						</div>
					</CardHeader>
					<CardContent className="space-y-2">
						{alerts.map((alert) => (
							<AlertRow
								key={alert.id}
								alert={alert}
								labels={alertLabels}
								actionLabel="Resolve"
								onAction={(id) => console.log('Resolve', id)}
							/>
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
