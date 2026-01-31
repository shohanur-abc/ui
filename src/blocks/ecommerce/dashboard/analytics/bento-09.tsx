'use client';

import {
	ArrowUpRight,
	Box,
	type LucideIcon,
	Package,
	RotateCcw,
	ShoppingBag,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type InventoryMetricProps = {
	icon: LucideIcon;
	label: string;
	value: string;
	change: string;
	status: 'good' | 'warning' | 'critical';
};

const InventoryMetric = ({ icon: Icon, label, value, change, status }: InventoryMetricProps) => {
	const statusColors = {
		good: 'text-emerald-500 bg-emerald-500/10',
		warning: 'text-amber-500 bg-amber-500/10',
		critical: 'text-rose-500 bg-rose-500/10',
	};
	return (
		<Card className="group border-border/50 bg-card/80 transition-all duration-300 hover:border-primary/30">
			<CardContent className="p-4">
				<div className="flex items-center justify-between mb-3">
					<div className="rounded-lg bg-primary/10 p-2 ring-1 ring-primary/20">
						<Icon className="size-4 text-primary" />
					</div>
					<span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}>
						{status}
					</span>
				</div>
				<p className="text-xs text-muted-foreground">{label}</p>
				<p className="text-2xl font-bold mt-1">{value}</p>
				<p className="text-xs text-muted-foreground mt-1">{change}</p>
			</CardContent>
		</Card>
	);
};

type StockLevelProps = {
	category: string;
	inStock: number;
	lowStock: number;
	outOfStock: number;
	total: number;
};

const StockLevelsCard = ({ levels }: { levels: StockLevelProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Stock Levels by Category</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="grid grid-cols-5 gap-2 text-xs text-muted-foreground pb-2 border-b border-border/30">
				<span>Category</span>
				<span className="text-center">In Stock</span>
				<span className="text-center">Low Stock</span>
				<span className="text-center">Out of Stock</span>
				<span className="text-center">Total</span>
			</div>
			<div className="space-y-3 mt-3">
				{levels.map((level, i) => (
					<div key={i}>
						<div className="grid grid-cols-5 gap-2 text-sm mb-2">
							<span className="font-medium">{level.category}</span>
							<span className="text-center text-emerald-500">{level.inStock}</span>
							<span className="text-center text-amber-500">{level.lowStock}</span>
							<span className="text-center text-rose-500">{level.outOfStock}</span>
							<span className="text-center font-semibold">{level.total}</span>
						</div>
						<div className="flex h-1.5 rounded-full overflow-hidden">
							<div className="bg-emerald-500" style={{ width: `${(level.inStock / level.total) * 100}%` }} />
							<div className="bg-amber-500" style={{ width: `${(level.lowStock / level.total) * 100}%` }} />
							<div className="bg-rose-500" style={{ width: `${(level.outOfStock / level.total) * 100}%` }} />
						</div>
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

type TopMoversProps = {
	type: 'fast' | 'slow';
	products: { name: string; sku: string; velocity: string; stock: number }[];
};

const TopMoversCard = ({ type, products }: TopMoversProps) => (
	<Card className="border-border/50 bg-card/80">
		<CardHeader className="flex flex-row items-center justify-between pb-2">
			<div className="flex items-center gap-2">
				{type === 'fast' ? (
					<TrendingUp className="size-4 text-emerald-500" />
				) : (
					<TrendingDown className="size-4 text-amber-500" />
				)}
				<CardTitle className="text-sm font-medium">
					{type === 'fast' ? 'Fast Moving' : 'Slow Moving'}
				</CardTitle>
			</div>
			<Badge variant={type === 'fast' ? 'default' : 'secondary'}>Top 5</Badge>
		</CardHeader>
		<CardContent className="space-y-3">
			{products.map((product, i) => (
				<div key={i} className="flex items-center gap-3 py-1.5 border-b border-border/20 last:border-0">
					<span className="flex items-center justify-center size-5 rounded bg-muted text-xs">{i + 1}</span>
					<div className="flex-1 min-w-0">
						<p className="text-sm font-medium truncate">{product.name}</p>
						<p className="text-xs text-muted-foreground">{product.sku}</p>
					</div>
					<div className="text-right">
						<p className={`text-sm font-semibold ${type === 'fast' ? 'text-emerald-500' : 'text-amber-500'}`}>
							{product.velocity}
						</p>
						<p className="text-xs text-muted-foreground">{product.stock} in stock</p>
					</div>
				</div>
			))}
		</CardContent>
	</Card>
);

type TurnoverProps = {
	month: string;
	turnover: number;
	target: number;
};

const TurnoverCard = ({ data }: { data: TurnoverProps[] }) => (
	<Card className="border-border/50 bg-card/80 col-span-2">
		<CardHeader className="pb-2">
			<CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="h-32 flex items-end gap-2">
				{data.map((item, i) => (
					<div key={i} className="flex-1 flex flex-col items-center gap-1">
						<div className="w-full flex gap-0.5 h-24">
							<div
								className="flex-1 bg-primary rounded-t"
								style={{ height: `${(item.turnover / 10) * 100}%` }}
							/>
							<div
								className="flex-1 bg-primary/30 rounded-t"
								style={{ height: `${(item.target / 10) * 100}%` }}
							/>
						</div>
						<span className="text-[10px] text-muted-foreground">{item.month}</span>
					</div>
				))}
			</div>
			<div className="flex items-center justify-center gap-6 mt-4">
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-primary" />
					<span className="text-xs text-muted-foreground">Actual</span>
				</div>
				<div className="flex items-center gap-2">
					<div className="size-3 rounded bg-primary/30" />
					<span className="text-xs text-muted-foreground">Target</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

const inventoryMetrics: InventoryMetricProps[] = [
	{ icon: Package, label: 'Total SKUs', value: '2,456', change: '+45 this month', status: 'good' },
	{ icon: Box, label: 'Total Units', value: '124,567', change: '+8,234 units', status: 'good' },
	{ icon: ShoppingBag, label: 'Low Stock Items', value: '34', change: '12 critical', status: 'warning' },
	{ icon: RotateCcw, label: 'Turnover Rate', value: '4.2x', change: '+0.3 vs last month', status: 'good' },
];

const stockLevels: StockLevelProps[] = [
	{ category: 'Electronics', inStock: 450, lowStock: 23, outOfStock: 5, total: 478 },
	{ category: 'Clothing', inStock: 890, lowStock: 45, outOfStock: 12, total: 947 },
	{ category: 'Home & Garden', inStock: 320, lowStock: 18, outOfStock: 8, total: 346 },
	{ category: 'Sports', inStock: 234, lowStock: 12, outOfStock: 3, total: 249 },
];

const fastMovers = [
	{ name: 'Wireless Earbuds Pro', sku: 'SKU-001234', velocity: '45/day', stock: 234 },
	{ name: 'USB-C Cable 2m', sku: 'SKU-002345', velocity: '38/day', stock: 567 },
	{ name: 'Phone Case Universal', sku: 'SKU-003456', velocity: '32/day', stock: 890 },
	{ name: 'Bluetooth Speaker', sku: 'SKU-004567', velocity: '28/day', stock: 156 },
	{ name: 'Laptop Stand', sku: 'SKU-005678', velocity: '25/day', stock: 89 },
];

const slowMovers = [
	{ name: 'Vintage Camera', sku: 'SKU-101234', velocity: '2/week', stock: 45 },
	{ name: 'Collector Edition', sku: 'SKU-102345', velocity: '1/week', stock: 23 },
	{ name: 'Legacy Adapter', sku: 'SKU-103456', velocity: '3/month', stock: 67 },
	{ name: 'Special Bundle', sku: 'SKU-104567', velocity: '2/month', stock: 12 },
	{ name: 'Archive Product', sku: 'SKU-105678', velocity: '1/month', stock: 8 },
];

const turnoverData: TurnoverProps[] = [
	{ month: 'Jan', turnover: 3.8, target: 4.0 },
	{ month: 'Feb', turnover: 4.1, target: 4.0 },
	{ month: 'Mar', turnover: 3.9, target: 4.0 },
	{ month: 'Apr', turnover: 4.3, target: 4.2 },
	{ month: 'May', turnover: 4.5, target: 4.2 },
	{ month: 'Jun', turnover: 4.2, target: 4.5 },
];

export default function Main() {
	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 @sm:px-6 @2xl:px-8 py-8 @md:py-12 @xl:py-16">
				<div className="grid grid-cols-2 @lg:grid-cols-4 gap-4 @lg:gap-6">
					{inventoryMetrics.map((metric, i) => (
						<InventoryMetric key={i} {...metric} />
					))}
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<StockLevelsCard levels={stockLevels} />
					<TurnoverCard data={turnoverData} />
				</div>
				<div className="grid grid-cols-1 @lg:grid-cols-2 gap-4 @lg:gap-6 mt-4 @lg:mt-6">
					<TopMoversCard type="fast" products={fastMovers} />
					<TopMoversCard type="slow" products={slowMovers} />
				</div>
			</div>
		</section>
	);
}
