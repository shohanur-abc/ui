import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Package,
	AlertTriangle,
	TrendingUp,
	TrendingDown,
	RefreshCw,
	Warehouse,
	type LucideIcon,
} from 'lucide-react';

interface InventoryItem {
	id: string;
	name: string;
	sku: string;
	category: string;
	currentStock: number;
	minStock: number;
	maxStock: number;
	status: 'healthy' | 'low' | 'critical' | 'overstock';
	reorderPoint: number;
	lastRestocked?: string;
	trend: 'up' | 'down' | 'stable';
	trendValue: string;
}

interface InventoryFeedProps {
	title: string;
	items: InventoryItem[];
	summary: {
		totalSKUs: number;
		lowStock: number;
		critical: number;
	};
}

const StatusBadge = ({ status }: { status: InventoryItem['status'] }) => {
	const config = {
		healthy: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		low: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		critical: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		overstock: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
	};

	const labels = {
		healthy: 'Healthy',
		low: 'Low Stock',
		critical: 'Critical',
		overstock: 'Overstock',
	};

	return (
		<Badge variant="outline" className={config[status]}>
			{labels[status]}
		</Badge>
	);
};

const TrendIndicator = ({
	trend,
	value,
}: {
	trend: InventoryItem['trend'];
	value: string;
}) => {
	const config = {
		up: { icon: TrendingUp, className: 'text-emerald-400' },
		down: { icon: TrendingDown, className: 'text-rose-400' },
		stable: { icon: RefreshCw, className: 'text-muted-foreground' },
	};

	const { icon: Icon, className } = config[trend];

	return (
		<div className={`flex items-center gap-1 text-xs ${className}`}>
			<Icon className="size-3" />
			<span>{value}</span>
		</div>
	);
};

const StockProgress = ({
	current,
	min,
	max,
	reorderPoint,
}: {
	current: number;
	min: number;
	max: number;
	reorderPoint: number;
}) => {
	const percentage = Math.min((current / max) * 100, 100);
	const reorderPercentage = (reorderPoint / max) * 100;
	const isLow = current <= reorderPoint;
	const isCritical = current <= min;

	return (
		<div className="relative w-full">
			<div className="h-2 w-full rounded-full bg-muted overflow-hidden">
				<div
					className={`h-full transition-all ${
						isCritical
							? 'bg-rose-500'
							: isLow
								? 'bg-amber-500'
								: 'bg-emerald-500'
					}`}
					style={{ width: `${percentage}%` }}
				/>
			</div>
			<div
				className="absolute top-0 h-2 w-0.5 bg-muted-foreground/50"
				style={{ left: `${reorderPercentage}%` }}
			/>
		</div>
	);
};

const InventoryCard = ({ item }: { item: InventoryItem }) => (
	<div className="group rounded-xl border border-border/50 bg-card/80 p-4 backdrop-blur-sm transition-all hover:border-primary/30">
		<div className="flex flex-col gap-3">
			<div className="flex items-start justify-between gap-2">
				<div className="flex items-center gap-3 min-w-0">
					<div
						className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${
							item.status === 'critical'
								? 'bg-rose-500/20'
								: item.status === 'low'
									? 'bg-amber-500/20'
									: 'bg-muted'
						}`}
					>
						{item.status === 'critical' || item.status === 'low' ? (
							<AlertTriangle
								className={`size-5 ${item.status === 'critical' ? 'text-rose-400' : 'text-amber-400'}`}
							/>
						) : (
							<Package className="size-5 text-muted-foreground" />
						)}
					</div>
					<div className="min-w-0">
						<h4 className="font-medium text-foreground truncate">
							{item.name}
						</h4>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="font-mono">{item.sku}</span>
							<span>•</span>
							<span>{item.category}</span>
						</div>
					</div>
				</div>
				<StatusBadge status={item.status} />
			</div>

			<div className="space-y-2">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Stock Level</span>
					<div className="flex items-center gap-2">
						<span className="font-medium text-foreground">
							{item.currentStock.toLocaleString()}
						</span>
						<span className="text-muted-foreground">
							/ {item.maxStock.toLocaleString()}
						</span>
					</div>
				</div>
				<StockProgress
					current={item.currentStock}
					min={item.minStock}
					max={item.maxStock}
					reorderPoint={item.reorderPoint}
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Reorder at: {item.reorderPoint}</span>
					<TrendIndicator trend={item.trend} value={item.trendValue} />
				</div>
			</div>

			<div className="flex items-center justify-between pt-3 border-t border-border/50">
				{item.lastRestocked && (
					<span className="text-xs text-muted-foreground">
						Last restock: {item.lastRestocked}
					</span>
				)}
				{(item.status === 'low' || item.status === 'critical') && (
					<Button size="sm" className="h-7 text-xs ml-auto">
						Reorder Now
					</Button>
				)}
			</div>
		</div>
	</div>
);

const SummaryBar = ({
	summary,
}: {
	summary: InventoryFeedProps['summary'];
}) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col items-center p-3 rounded-lg bg-muted/50 border border-border/50">
			<Warehouse className="size-5 text-primary mb-1" />
			<span className="text-xl font-bold text-foreground">
				{summary.totalSKUs}
			</span>
			<span className="text-xs text-muted-foreground">Total SKUs</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<AlertTriangle className="size-5 text-amber-400 mb-1" />
			<span className="text-xl font-bold text-amber-400">
				{summary.lowStock}
			</span>
			<span className="text-xs text-muted-foreground">Low Stock</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<AlertTriangle className="size-5 text-rose-400 mb-1" />
			<span className="text-xl font-bold text-rose-400">
				{summary.critical}
			</span>
			<span className="text-xs text-muted-foreground">Critical</span>
		</div>
	</div>
);

const InventoryFeed = ({ title, items, summary }: InventoryFeedProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold">{title}</CardTitle>
			<Button variant="outline" size="sm">
				View Inventory
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-6">
			<SummaryBar summary={summary} />
			<div className="space-y-3">
				{items.map((item) => (
					<InventoryCard key={item.id} item={item} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const inventoryItems: InventoryItem[] = [
		{
			id: '1',
			name: 'Premium Wireless Earbuds',
			sku: 'SKU-WE-2847',
			category: 'Audio',
			currentStock: 12,
			minStock: 20,
			maxStock: 500,
			reorderPoint: 50,
			status: 'critical',
			trend: 'down',
			trendValue: '-45 this week',
			lastRestocked: '2 weeks ago',
		},
		{
			id: '2',
			name: 'Smart Watch Pro Max',
			sku: 'SKU-SW-1293',
			category: 'Wearables',
			currentStock: 45,
			minStock: 30,
			maxStock: 300,
			reorderPoint: 75,
			status: 'low',
			trend: 'down',
			trendValue: '-23 this week',
			lastRestocked: '1 week ago',
		},
		{
			id: '3',
			name: 'USB-C Charging Cable 2m',
			sku: 'SKU-UC-9012',
			category: 'Accessories',
			currentStock: 890,
			minStock: 100,
			maxStock: 1000,
			reorderPoint: 200,
			status: 'overstock',
			trend: 'stable',
			trendValue: '-12 this week',
			lastRestocked: '3 days ago',
		},
		{
			id: '4',
			name: 'Bluetooth Speaker XL',
			sku: 'SKU-BS-4521',
			category: 'Audio',
			currentStock: 156,
			minStock: 50,
			maxStock: 400,
			reorderPoint: 100,
			status: 'healthy',
			trend: 'up',
			trendValue: '+8 this week',
			lastRestocked: '5 days ago',
		},
		{
			id: '5',
			name: 'Laptop Stand Adjustable',
			sku: 'SKU-LS-7834',
			category: 'Office',
			currentStock: 67,
			minStock: 25,
			maxStock: 200,
			reorderPoint: 50,
			status: 'healthy',
			trend: 'down',
			trendValue: '-5 this week',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<InventoryFeed
					title="Inventory Alerts"
					items={inventoryItems}
					summary={{ totalSKUs: 1247, lowStock: 23, critical: 5 }}
				/>
			</div>
		</section>
	);
}
