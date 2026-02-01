import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Package,
	AlertTriangle,
	TrendingUp,
	TrendingDown,
	ArrowUpDown,
	RefreshCw,
	Filter,
	type LucideIcon,
} from 'lucide-react';

interface InventoryChange {
	id: string;
	sku: string;
	productName: string;
	category: string;
	changeType: 'sold' | 'restocked' | 'adjusted' | 'returned';
	quantity: number;
	currentStock: number;
	threshold: number;
	trend: 'up' | 'down' | 'stable';
	velocity: string;
	timestamp: string;
}

interface InventoryStreamProps {
	title: string;
	changes: InventoryChange[];
	stats: {
		totalProducts: number;
		lowStock: number;
		outOfStock: number;
	};
}

const ChangeIcon = ({ type }: { type: InventoryChange['changeType'] }) => {
	const config: Record<
		InventoryChange['changeType'],
		{ icon: LucideIcon; className: string }
	> = {
		sold: { icon: TrendingDown, className: 'bg-rose-500/20 text-rose-400' },
		restocked: {
			icon: TrendingUp,
			className: 'bg-emerald-500/20 text-emerald-400',
		},
		adjusted: {
			icon: ArrowUpDown,
			className: 'bg-amber-500/20 text-amber-400',
		},
		returned: { icon: Package, className: 'bg-blue-500/20 text-blue-400' },
	};

	const { icon: Icon, className } = config[type];

	return (
		<div
			className={`flex size-10 shrink-0 items-center justify-center rounded-lg ${className}`}
		>
			<Icon className="size-5" />
		</div>
	);
};

const StockLevel = ({
	current,
	threshold,
}: {
	current: number;
	threshold: number;
}) => {
	const percentage = Math.min((current / threshold) * 100, 100);
	const isLow = current <= threshold;
	const isOut = current === 0;

	return (
		<div className="space-y-1">
			<div className="flex justify-between text-xs">
				<span className="text-muted-foreground">Stock Level</span>
				<span
					className={
						isOut
							? 'text-rose-400'
							: isLow
								? 'text-amber-400'
								: 'text-foreground'
					}
				>
					{current} units
				</span>
			</div>
			<Progress
				value={percentage}
				className={`h-1.5 ${
					isOut
						? '[&>div]:bg-rose-500'
						: isLow
							? '[&>div]:bg-amber-500'
							: '[&>div]:bg-emerald-500'
				}`}
			/>
		</div>
	);
};

const QuantityChange = ({
	type,
	quantity,
}: {
	type: InventoryChange['changeType'];
	quantity: number;
}) => {
	const isPositive = ['restocked', 'returned'].includes(type);

	return (
		<span
			className={`font-mono text-sm font-semibold ${
				isPositive ? 'text-emerald-400' : 'text-rose-400'
			}`}
		>
			{isPositive ? '+' : '-'}
			{quantity}
		</span>
	);
};

const InventoryCard = ({ change }: { change: InventoryChange }) => {
	const isLow = change.currentStock <= change.threshold;
	const isOut = change.currentStock === 0;

	return (
		<div
			className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
				isOut
					? 'border-rose-500/30 bg-rose-500/5'
					: isLow
						? 'border-amber-500/30 bg-amber-500/5'
						: 'border-border/50 bg-card/80 hover:border-primary/30'
			}`}
		>
			<div className="flex gap-4">
				<ChangeIcon type={change.changeType} />
				<div className="flex-1 min-w-0">
					<div className="flex items-start justify-between gap-2 mb-2">
						<div>
							<h4 className="font-medium text-foreground line-clamp-1">
								{change.productName}
							</h4>
							<div className="flex items-center gap-2 text-xs text-muted-foreground">
								<span className="font-mono">{change.sku}</span>
								<span>•</span>
								<span>{change.category}</span>
							</div>
						</div>
						<div className="flex flex-col items-end gap-1">
							<QuantityChange
								type={change.changeType}
								quantity={change.quantity}
							/>
							<Badge variant="outline" className="text-xs capitalize">
								{change.changeType}
							</Badge>
						</div>
					</div>
					<StockLevel
						current={change.currentStock}
						threshold={change.threshold}
					/>
					<div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
						<div className="flex items-center gap-1 text-xs text-muted-foreground">
							<TrendingUp className="size-3" />
							<span>Velocity: {change.velocity}</span>
						</div>
						<span className="text-xs text-muted-foreground">
							{change.timestamp}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

const InventoryStats = ({
	stats,
}: {
	stats: InventoryStreamProps['stats'];
}) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col p-3 rounded-lg bg-muted/30 border border-border/50">
			<Package className="size-4 text-primary mb-1" />
			<span className="text-xl font-bold text-foreground">
				{stats.totalProducts.toLocaleString()}
			</span>
			<span className="text-xs text-muted-foreground">Total SKUs</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<AlertTriangle className="size-4 text-amber-400 mb-1" />
			<span className="text-xl font-bold text-amber-400">{stats.lowStock}</span>
			<span className="text-xs text-muted-foreground">Low Stock</span>
		</div>
		<div className="flex flex-col p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<Package className="size-4 text-rose-400 mb-1" />
			<span className="text-xl font-bold text-rose-400">
				{stats.outOfStock}
			</span>
			<span className="text-xs text-muted-foreground">Out of Stock</span>
		</div>
	</div>
);

const InventoryStream = ({ title, changes, stats }: InventoryStreamProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<Package className="size-5" />
				{title}
			</CardTitle>
			<div className="flex items-center gap-2">
				<Button variant="ghost" size="sm" className="gap-1">
					<Filter className="size-4" />
					Filter
				</Button>
				<Button variant="ghost" size="sm" className="gap-1">
					<RefreshCw className="size-4" />
					Refresh
				</Button>
			</div>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<InventoryStats stats={stats} />
			<div className="space-y-3 max-h-[400px] overflow-y-auto">
				{changes.map((change) => (
					<InventoryCard key={change.id} change={change} />
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const inventoryChanges: InventoryChange[] = [
		{
			id: '1',
			sku: 'SKU-12345',
			productName: 'Premium Wireless Headphones',
			category: 'Electronics',
			changeType: 'sold',
			quantity: 3,
			currentStock: 12,
			threshold: 25,
			trend: 'down',
			velocity: '15/day',
			timestamp: 'now',
		},
		{
			id: '2',
			sku: 'SKU-67890',
			productName: 'Smart Watch Pro',
			category: 'Electronics',
			changeType: 'restocked',
			quantity: 100,
			currentStock: 150,
			threshold: 30,
			trend: 'up',
			velocity: '8/day',
			timestamp: '5m ago',
		},
		{
			id: '3',
			sku: 'SKU-11111',
			productName: 'Mechanical Keyboard RGB',
			category: 'Accessories',
			changeType: 'sold',
			quantity: 1,
			currentStock: 0,
			threshold: 20,
			trend: 'down',
			velocity: '12/day',
			timestamp: '10m ago',
		},
		{
			id: '4',
			sku: 'SKU-22222',
			productName: 'Wireless Mouse',
			category: 'Accessories',
			changeType: 'returned',
			quantity: 2,
			currentStock: 45,
			threshold: 25,
			trend: 'stable',
			velocity: '6/day',
			timestamp: '15m ago',
		},
		{
			id: '5',
			sku: 'SKU-33333',
			productName: '4K Ultra HD Monitor',
			category: 'Displays',
			changeType: 'adjusted',
			quantity: 5,
			currentStock: 8,
			threshold: 15,
			trend: 'down',
			velocity: '3/day',
			timestamp: '30m ago',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-2xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<InventoryStream
					title="Inventory Stream"
					changes={inventoryChanges}
					stats={{
						totalProducts: 1247,
						lowStock: 23,
						outOfStock: 5,
					}}
				/>
			</div>
		</section>
	);
}
