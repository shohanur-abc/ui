import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
	AlertTriangle,
	Package,
	TrendingDown,
	ArrowRight,
	RefreshCw,
	ExternalLink,
	Clock,
} from 'lucide-react';

interface StockAlert {
	id: string;
	sku: string;
	productName: string;
	category: string;
	currentStock: number;
	threshold: number;
	velocity: string;
	daysUntilOut: number;
	supplier?: string;
	reorderQuantity?: number;
	priority: 'critical' | 'warning' | 'low';
}

interface StockAlertsProps {
	title: string;
	alerts: StockAlert[];
	counts: {
		critical: number;
		warning: number;
		low: number;
	};
}

const PriorityBadge = ({ priority }: { priority: StockAlert['priority'] }) => {
	const config = {
		critical: {
			label: 'Critical',
			className: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
		},
		warning: {
			label: 'Warning',
			className: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
		},
		low: {
			label: 'Low',
			className: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
		},
	};

	return (
		<Badge variant="outline" className={config[priority].className}>
			{config[priority].label}
		</Badge>
	);
};

const StockIndicator = ({
	current,
	threshold,
}: {
	current: number;
	threshold: number;
}) => {
	const percentage = Math.min((current / threshold) * 100, 100);
	const isOut = current === 0;
	const isCritical = current <= threshold * 0.25;

	return (
		<div className="space-y-1">
			<div className="flex items-center justify-between text-xs">
				<span className="text-muted-foreground">Stock Level</span>
				<span
					className={
						isOut
							? 'text-rose-400 font-medium'
							: isCritical
								? 'text-amber-400'
								: 'text-foreground'
					}
				>
					{current} / {threshold}
				</span>
			</div>
			<Progress
				value={percentage}
				className={`h-2 ${
					isOut
						? '[&>div]:bg-rose-500'
						: isCritical
							? '[&>div]:bg-amber-500'
							: '[&>div]:bg-emerald-500'
				}`}
			/>
		</div>
	);
};

const AlertCard = ({ alert }: { alert: StockAlert }) => (
	<div
		className={`p-4 rounded-xl border backdrop-blur-sm transition-all hover:shadow-lg ${
			alert.priority === 'critical'
				? 'border-rose-500/30 bg-rose-500/5'
				: alert.priority === 'warning'
					? 'border-amber-500/30 bg-amber-500/5'
					: 'border-border/50 bg-card/80'
		}`}
	>
		<div className="flex items-start gap-4">
			<div
				className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${
					alert.currentStock === 0
						? 'bg-rose-500/20 text-rose-400'
						: 'bg-amber-500/20 text-amber-400'
				}`}
			>
				{alert.currentStock === 0 ? (
					<AlertTriangle className="size-6" />
				) : (
					<Package className="size-6" />
				)}
			</div>
			<div className="flex-1 min-w-0">
				<div className="flex items-start justify-between gap-2 mb-2">
					<div>
						<div className="flex items-center gap-2 mb-1">
							<h4 className="font-medium text-foreground line-clamp-1">
								{alert.productName}
							</h4>
							<PriorityBadge priority={alert.priority} />
						</div>
						<div className="flex items-center gap-2 text-xs text-muted-foreground">
							<span className="font-mono">{alert.sku}</span>
							<span>•</span>
							<span>{alert.category}</span>
						</div>
					</div>
					<Button variant="ghost" size="icon-sm">
						<ExternalLink className="size-4" />
					</Button>
				</div>

				<StockIndicator
					current={alert.currentStock}
					threshold={alert.threshold}
				/>

				<div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<span className="flex items-center gap-1">
							<TrendingDown className="size-3" />
							{alert.velocity}
						</span>
						<span className="flex items-center gap-1">
							<Clock className="size-3" />
							{alert.daysUntilOut === 0
								? 'Out of stock'
								: `${alert.daysUntilOut}d left`}
						</span>
					</div>
					{alert.reorderQuantity && (
						<Button size="sm" className="h-7 gap-1">
							Reorder {alert.reorderQuantity}
							<ArrowRight className="size-3" />
						</Button>
					)}
				</div>
			</div>
		</div>
	</div>
);

const AlertCounts = ({ counts }: { counts: StockAlertsProps['counts'] }) => (
	<div className="grid grid-cols-3 gap-3">
		<div className="flex flex-col items-center p-3 rounded-lg bg-rose-500/10 border border-rose-500/20">
			<span className="text-2xl font-bold text-rose-400">{counts.critical}</span>
			<span className="text-xs text-muted-foreground">Critical</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
			<span className="text-2xl font-bold text-amber-400">{counts.warning}</span>
			<span className="text-xs text-muted-foreground">Warning</span>
		</div>
		<div className="flex flex-col items-center p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
			<span className="text-2xl font-bold text-blue-400">{counts.low}</span>
			<span className="text-xs text-muted-foreground">Low Stock</span>
		</div>
	</div>
);

const StockAlerts = ({ title, alerts, counts }: StockAlertsProps) => (
	<Card className="border-border/50 bg-card/50 backdrop-blur-sm">
		<CardHeader className="flex-row items-center justify-between border-b border-border/50">
			<CardTitle className="text-lg font-semibold flex items-center gap-2">
				<AlertTriangle className="size-5" />
				{title}
			</CardTitle>
			<Button variant="ghost" size="sm" className="gap-1">
				<RefreshCw className="size-4" />
				Refresh
			</Button>
		</CardHeader>
		<CardContent className="pt-6 space-y-4">
			<AlertCounts counts={counts} />
			<ScrollArea className="h-[400px]">
				<div className="space-y-3 pr-4">
					{alerts.map((alert) => (
						<AlertCard key={alert.id} alert={alert} />
					))}
				</div>
			</ScrollArea>
		</CardContent>
	</Card>
);

export default function Main() {
	const alerts: StockAlert[] = [
		{
			id: '1',
			sku: 'SKU-12345',
			productName: 'Premium Wireless Headphones',
			category: 'Electronics',
			currentStock: 0,
			threshold: 50,
			velocity: '12/day',
			daysUntilOut: 0,
			supplier: 'AudioTech Inc.',
			reorderQuantity: 100,
			priority: 'critical',
		},
		{
			id: '2',
			sku: 'SKU-67890',
			productName: 'Smart Watch Pro - Black',
			category: 'Electronics',
			currentStock: 5,
			threshold: 30,
			velocity: '8/day',
			daysUntilOut: 1,
			supplier: 'TechGear Ltd.',
			reorderQuantity: 50,
			priority: 'critical',
		},
		{
			id: '3',
			sku: 'SKU-11111',
			productName: 'Mechanical Keyboard RGB',
			category: 'Accessories',
			currentStock: 15,
			threshold: 40,
			velocity: '6/day',
			daysUntilOut: 3,
			reorderQuantity: 75,
			priority: 'warning',
		},
		{
			id: '4',
			sku: 'SKU-22222',
			productName: 'Wireless Mouse Ergonomic',
			category: 'Accessories',
			currentStock: 23,
			threshold: 35,
			velocity: '4/day',
			daysUntilOut: 6,
			reorderQuantity: 50,
			priority: 'warning',
		},
		{
			id: '5',
			sku: 'SKU-33333',
			productName: '4K Ultra HD Monitor 27"',
			category: 'Displays',
			currentStock: 28,
			threshold: 25,
			velocity: '2/day',
			daysUntilOut: 14,
			priority: 'low',
		},
	];

	return (
		<section className="@container" data-theme="activity">
			<div className="mx-auto max-w-xl px-4 py-8 @sm:px-6 @sm:py-12 @2xl:px-8 @2xl:py-16">
				<StockAlerts
					title="Stock Alerts"
					alerts={alerts}
					counts={{ critical: 2, warning: 8, low: 13 }}
				/>
			</div>
		</section>
	);
}
