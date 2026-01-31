import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
	Package,
	AlertTriangle,
	TrendingUp,
	TrendingDown,
	RotateCcw,
	Archive,
	Truck,
	CheckCircle2,
	Clock,
	type LucideIcon,
} from 'lucide-react';

interface InventoryItem {
	id: string;
	sku: string;
	name: string;
	category: string;
	currentStock: number;
	reorderPoint: number;
	maxStock: number;
	status: 'healthy' | 'low' | 'critical' | 'overstock' | 'incoming';
	velocity: 'fast' | 'medium' | 'slow';
	daysUntilStockout?: number;
	incomingStock?: number;
	incomingDate?: string;
}

interface InventoryTrackerProps {
	title: string;
	items: InventoryItem[];
	stats: {
		totalSKUs: number;
		lowStock: number;
		criticalStock: number;
		incomingOrders: number;
	};
}

const StatusConfig: Record<
	InventoryItem['status'],
	{ label: string; className: string; icon: LucideIcon }
> = {
	healthy: {
		label: 'Healthy',
		className: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
		icon: CheckCircle2,
	},
	low: {
		label: 'Low Stock',
		className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		icon: AlertTriangle,
	},
	critical: {
		label: 'Critical',
		className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		icon: AlertTriangle,
	},
	overstock: {
		label: 'Overstock',
		className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		icon: Archive,
	},
	incoming: {
		label: 'Incoming',
		className: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
		icon: Truck,
	},
};

const VelocityIndicator = ({ velocity }: { velocity: InventoryItem['velocity'] }) => {
	const config = {
		fast: { icon: TrendingUp, className: 'text-emerald-400', label: 'Fast' },
		medium: { icon: TrendingUp, className: 'text-amber-400', label: 'Medium' },
		slow: { icon: TrendingDown, className: 'text-muted-foreground', label: 'Slow' },
	};

	const { icon: Icon, className, label } = config[velocity];

	return (
		<div className={`flex items-center gap-1 text-xs ${className}`}>
			<Icon className="size-3" />
			{label}
		</div>
	);
};

const StockBar = ({
	current,
	reorderPoint,
	max,
	status,
}: {
	current: number;
	reorderPoint: number;
	max: number;
	status: InventoryItem['status'];
}) => {
	const percentage = Math.min((current / max) * 100, 100);
	const reorderPercentage = (reorderPoint / max) * 100;

	return (
		<div className="relative h-2 bg-muted/30 rounded-full overflow-hidden">
			<div
				className={`absolute top-0 left-0 h-full rounded-full transition-all ${
					status === 'critical'
						? 'bg-rose-500'
						: status === 'low'
							? 'bg-amber-500'
							: status === 'overstock'
								? 'bg-blue-500'
								: 'bg-emerald-500'
				}`}
				style={{ width: `${percentage}%` }}
			/>
			<div
				className="absolute top-0 h-full w-0.5 bg-amber-400/80"
				style={{ left: `${reorderPercentage}%` }}
				title={`Reorder point: ${reorderPoint}`}
			/>
		</div>
	);
};

const InventoryCard = ({ item }: { item: InventoryItem }) => {
	const config = StatusConfig[item.status];
	const StatusIcon = config.icon;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				item.status === 'critical'
					? 'border-rose-500/30 bg-rose-500/5'
					: item.status === 'low'
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80'
			}`}
		>
			<div className="flex items-start justify-between mb-3">
				<div className="flex-1 min-w-0">
					<div className="flex items-center gap-2 mb-1">
						<span className="font-mono text-xs text-muted-foreground">
							{item.sku}
						</span>
						<Badge variant="outline" className={config.className}>
							<StatusIcon className="size-3 mr-1" />
							{config.label}
						</Badge>
					</div>
					<h4 className="font-medium text-foreground truncate">{item.name}</h4>
					<span className="text-xs text-muted-foreground">{item.category}</span>
				</div>
				<VelocityIndicator velocity={item.velocity} />
			</div>

			<div className="space-y-2 mb-3">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Stock Level</span>
					<span className="font-medium text-foreground">
						{item.currentStock} / {item.maxStock}
					</span>
				</div>
				<StockBar
					current={item.currentStock}
					reorderPoint={item.reorderPoint}
					max={item.maxStock}
					status={item.status}
				/>
				<div className="flex items-center justify-between text-xs text-muted-foreground">
					<span>Reorder at: {item.reorderPoint}</span>
					{item.daysUntilStockout !== undefined && (
						<span
							className={
								item.daysUntilStockout <= 7 ? 'text-rose-400' : ''
							}
						>
							{item.daysUntilStockout} days until stockout
						</span>
					)}
				</div>
			</div>

			{item.incomingStock && (
				<div className="flex items-center justify-between p-2 rounded-lg bg-purple-500/10 text-xs">
					<span className="flex items-center gap-1 text-purple-400">
						<Truck className="size-3" />
						{item.incomingStock} units incoming
					</span>
					<span className="text-muted-foreground">ETA: {item.incomingDate}</span>
				</div>
			)}

			{(item.status === 'critical' || item.status === 'low') && !item.incomingStock && (
				<Button
					size="sm"
					className="w-full h-8 mt-2 gap-1 bg-primary/20 text-primary hover:bg-primary/30"
				>
					<RotateCcw className="size-3" />
					Reorder Now
				</Button>
			)}
		</div>
	);
};

const InventoryStats = ({ stats }: { stats: InventoryTrackerProps['stats'] }) => (
	<div className="grid grid-cols-4 gap-2">
		<div className="p-3 rounded-lg bg-muted/30 border border-border/50 text-center">
			<Package className="size-4 text-muted-foreground mx-auto mb-1" />
			<span className="text-lg font-bold text-foreground block">
				{stats.totalSKUs}
			</span>
			<span className="text-xs text-muted-foreground">SKUs</span>
		</div>
		<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
			<AlertTriangle className="size-4 text-amber-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-amber-400 block">
				{stats.lowStock}
			</span>
			<span className="text-xs text-muted-foreground">Low</span>
		</div>
		<div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-center">
			<AlertTriangle className="size-4 text-rose-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-rose-400 block">
				{stats.criticalStock}
			</span>
			<span className="text-xs text-muted-foreground">Critical</span>
		</div>
		<div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20 text-center">
			<Truck className="size-4 text-purple-400 mx-auto mb-1" />
			<span className="text-lg font-bold text-purple-400 block">
				{stats.incomingOrders}
			</span>
			<span className="text-xs text-muted-foreground">Incoming</span>
		</div>
	</div>
);

const InventoryTracker = ({ title, items, stats }: InventoryTrackerProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Package className="size-5" />
				{title}
				{stats.criticalStock > 0 && (
					<Badge className="bg-rose-500 text-white animate-pulse">
						{stats.criticalStock} Critical
					</Badge>
				)}
			</CardTitle>
			<Button variant="outline" size="sm">
				View All
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<InventoryStats stats={stats} />
			<ScrollArea className="h-[380px]">
				<div className="space-y-3 pr-4">
					{items.map((item) => (
						<InventoryCard key={item.id} item={item} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const items: InventoryItem[] = [
		{
			id: '1',
			sku: 'SKU-WH-001',
			name: 'Premium Wireless Headphones',
			category: 'Electronics',
			currentStock: 12,
			reorderPoint: 25,
			maxStock: 100,
			status: 'critical',
			velocity: 'fast',
			daysUntilStockout: 3,
		},
		{
			id: '2',
			sku: 'SKU-KB-042',
			name: 'Mechanical Keyboard RGB',
			category: 'Electronics',
			currentStock: 28,
			reorderPoint: 30,
			maxStock: 80,
			status: 'low',
			velocity: 'medium',
			daysUntilStockout: 14,
			incomingStock: 50,
			incomingDate: 'Mar 20',
		},
		{
			id: '3',
			sku: 'SKU-MS-015',
			name: 'Ergonomic Mouse Pro',
			category: 'Electronics',
			currentStock: 65,
			reorderPoint: 20,
			maxStock: 100,
			status: 'healthy',
			velocity: 'medium',
		},
		{
			id: '4',
			sku: 'SKU-CC-089',
			name: 'USB-C Cable 2m',
			category: 'Accessories',
			currentStock: 180,
			reorderPoint: 50,
			maxStock: 150,
			status: 'overstock',
			velocity: 'slow',
		},
		{
			id: '5',
			sku: 'SKU-MN-023',
			name: '4K Monitor 27"',
			category: 'Electronics',
			currentStock: 0,
			reorderPoint: 10,
			maxStock: 30,
			status: 'incoming',
			velocity: 'fast',
			incomingStock: 20,
			incomingDate: 'Mar 18',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<InventoryTracker
					title="Inventory Tracker"
					items={items}
					stats={{
						totalSKUs: 1247,
						lowStock: 23,
						criticalStock: 5,
						incomingOrders: 8,
					}}
				/>
			</div>
		</section>
	);
}
