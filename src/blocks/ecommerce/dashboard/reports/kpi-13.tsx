'use client';

import {
	Boxes,
	AlertTriangle,
	TrendingDown,
	RefreshCw,
	Truck,
	Package,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type InventoryMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	subLabel: string;
	status: 'good' | 'warning' | 'critical';
	progress?: number;
};

const InventoryMetric = ({
	icon: Icon,
	label,
	value,
	subLabel,
	status,
	progress,
}: InventoryMetricProps) => {
	const statusColors = {
		good: 'text-emerald-500',
		warning: 'text-amber-500',
		critical: 'text-rose-500',
	};
	const bgColors = {
		good: 'bg-emerald-500/10',
		warning: 'bg-amber-500/10',
		critical: 'bg-rose-500/10',
	};

	return (
		<Card className="border-border/30 bg-card/60">
			<CardContent className="p-5">
				<div className="flex items-center gap-3">
					<div className={`rounded-lg p-2.5 ${bgColors[status]}`}>
						<Icon className={`size-5 ${statusColors[status]}`} />
					</div>
					<div>
						<p className="text-sm text-muted-foreground">{label}</p>
						<p className={`text-2xl font-bold ${statusColors[status]}`}>
							{value}
						</p>
						<p className="text-xs text-muted-foreground">{subLabel}</p>
					</div>
				</div>
				{progress !== undefined && (
					<Progress value={progress} className="mt-4 h-1.5" />
				)}
			</CardContent>
		</Card>
	);
};

type AlertItemProps = {
	product: string;
	sku: string;
	stock: number;
	reorderPoint: number;
};

const AlertItem = ({ product, sku, stock, reorderPoint }: AlertItemProps) => (
	<div className="flex items-center justify-between border-b border-border/30 py-3 last:border-0">
		<div>
			<p className="font-medium">{product}</p>
			<p className="text-xs text-muted-foreground">SKU: {sku}</p>
		</div>
		<div className="text-right">
			<p className="font-bold text-rose-500">{stock} left</p>
			<p className="text-xs text-muted-foreground">Reorder: {reorderPoint}</p>
		</div>
	</div>
);

export default function Main() {
	const metrics: InventoryMetricProps[] = [
		{
			icon: Boxes,
			label: 'Total SKUs',
			value: '2,458',
			subLabel: 'Active products',
			status: 'good',
			progress: 85,
		},
		{
			icon: AlertTriangle,
			label: 'Low Stock',
			value: '42',
			subLabel: 'Need reorder',
			status: 'warning',
			progress: 8,
		},
		{
			icon: TrendingDown,
			label: 'Out of Stock',
			value: '8',
			subLabel: 'Lost sales risk',
			status: 'critical',
		},
		{
			icon: RefreshCw,
			label: 'Turn Rate',
			value: '4.2x',
			subLabel: 'Monthly avg',
			status: 'good',
		},
		{
			icon: Truck,
			label: 'Pending Orders',
			value: '156',
			subLabel: 'To suppliers',
			status: 'good',
		},
		{
			icon: Package,
			label: 'Dead Stock',
			value: '24',
			subLabel: '90+ days idle',
			status: 'warning',
		},
	];

	const alerts: AlertItemProps[] = [
		{
			product: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			stock: 12,
			reorderPoint: 50,
		},
		{ product: 'USB-C Hub 7-Port', sku: 'UCH-007', stock: 8, reorderPoint: 30 },
		{
			product: 'Leather Wallet Classic',
			sku: 'LWC-023',
			stock: 5,
			reorderPoint: 25,
		},
		{
			product: 'Sports Water Bottle',
			sku: 'SWB-045',
			stock: 15,
			reorderPoint: 100,
		},
	];

	return (
		<section className="@container" data-theme="reports">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8 @3xl:py-12">
				<Card className="border-border/50 bg-card/80 backdrop-blur-sm">
					<CardHeader className="flex flex-col gap-2 @sm:flex-row @sm:items-center @sm:justify-between">
						<div>
							<CardTitle className="text-lg @sm:text-xl">
								Inventory KPI Report
							</CardTitle>
							<CardDescription>
								Stock levels and inventory health metrics
							</CardDescription>
						</div>
						<Badge
							variant="outline"
							className="w-fit border-amber-500/20 bg-amber-500/10 text-amber-500"
						>
							<AlertTriangle className="mr-1 size-3" />
							42 Items Need Attention
						</Badge>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
							{metrics.map((metric, i) => (
								<InventoryMetric key={i} {...metric} />
							))}
						</div>
						<Card className="border-border/30 bg-rose-500/5">
							<CardHeader className="pb-2">
								<CardTitle className="flex items-center gap-2 text-sm">
									<AlertTriangle className="size-4 text-rose-500" />
									Critical Stock Alerts
								</CardTitle>
							</CardHeader>
							<CardContent>
								{alerts.map((alert, i) => (
									<AlertItem key={i} {...alert} />
								))}
							</CardContent>
						</Card>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
