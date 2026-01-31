'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	AlertCircle,
	CheckCircle2,
	Clock,
	XCircle,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface InventoryStatus {
	inStock: number;
	lowStock: number;
	outOfStock: number;
	backorder: number;
	total: number;
}

interface StockLevel {
	level: 'high' | 'medium' | 'low' | 'out';
	count: number;
	products: { name: string; quantity: number }[];
}

interface InventoryMetric {
	label: string;
	value: number;
	change: number;
	icon: React.ElementType;
	variant: 'default' | 'success' | 'warning' | 'danger';
}

interface StatusCardProps {
	metric: InventoryMetric;
}

const StatusCard = ({ metric }: StatusCardProps) => {
	const variantStyles = {
		default: 'bg-muted',
		success: 'bg-emerald-500/10',
		warning: 'bg-amber-500/10',
		danger: 'bg-red-500/10',
	};

	const iconStyles = {
		default: 'text-muted-foreground',
		success: 'text-emerald-500',
		warning: 'text-amber-500',
		danger: 'text-red-500',
	};

	const Icon = metric.icon;
	const isPositive = metric.change >= 0;

	return (
		<Card className={variantStyles[metric.variant]}>
			<CardContent className="p-4">
				<div className="flex items-center justify-between">
					<div>
						<p className="text-sm text-muted-foreground">{metric.label}</p>
						<p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
					</div>
					<div className={`flex size-10 items-center justify-center rounded-full ${variantStyles[metric.variant]}`}>
						<Icon className={`size-5 ${iconStyles[metric.variant]}`} />
					</div>
				</div>
				<div className={`mt-2 flex items-center gap-1 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
					{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
					{isPositive ? '+' : ''}{metric.change}% from last week
				</div>
			</CardContent>
		</Card>
	);
};

interface StockDistributionProps {
	title: string;
	status: InventoryStatus;
	labels: { inStock: string; lowStock: string; outOfStock: string; backorder: string };
}

const StockDistribution = ({ title, status, labels }: StockDistributionProps) => {
	const data = [
		{ label: labels.inStock, value: status.inStock, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
		{ label: labels.lowStock, value: status.lowStock, color: 'bg-amber-500', textColor: 'text-amber-500' },
		{ label: labels.outOfStock, value: status.outOfStock, color: 'bg-red-500', textColor: 'text-red-500' },
		{ label: labels.backorder, value: status.backorder, color: 'bg-blue-500', textColor: 'text-blue-500' },
	];

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-base">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="mb-4 flex h-4 overflow-hidden rounded-full">
					{data.map((item) => (
						<div
							key={item.label}
							className={`${item.color} transition-all`}
							style={{ width: `${(item.value / status.total) * 100}%` }}
						/>
					))}
				</div>
				<div className="grid grid-cols-2 gap-4 @sm:grid-cols-4">
					{data.map((item) => (
						<div key={item.label} className="text-center">
							<div className={`text-2xl font-bold ${item.textColor}`}>
								{item.value.toLocaleString()}
							</div>
							<div className="text-xs text-muted-foreground">{item.label}</div>
							<div className="text-xs text-muted-foreground">
								({((item.value / status.total) * 100).toFixed(1)}%)
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

interface StockAlertRowProps {
	product: { name: string; quantity: number };
	level: 'high' | 'medium' | 'low' | 'out';
}

const StockAlertRow = ({ product, level }: StockAlertRowProps) => {
	const config = {
		high: { badge: 'bg-emerald-500/10 text-emerald-500', text: 'High' },
		medium: { badge: 'bg-blue-500/10 text-blue-500', text: 'Medium' },
		low: { badge: 'bg-amber-500/10 text-amber-500', text: 'Low' },
		out: { badge: 'bg-red-500/10 text-red-500', text: 'Out' },
	};

	return (
		<div className="flex items-center justify-between py-2">
			<div className="flex items-center gap-3">
				<div className="size-8 rounded-md bg-muted" />
				<span className="text-sm font-medium">{product.name}</span>
			</div>
			<div className="flex items-center gap-2">
				<span className="text-sm text-muted-foreground">{product.quantity} units</span>
				<Badge className={config[level].badge}>{config[level].text}</Badge>
			</div>
		</div>
	);
};

interface StockAlertsCardProps {
	title: string;
	levels: StockLevel[];
	maxShow?: number;
}

const StockAlertsCard = ({ title, levels, maxShow = 5 }: StockAlertsCardProps) => {
	const alertItems = levels
		.filter((l) => l.level === 'low' || l.level === 'out')
		.flatMap((l) => l.products.map((p) => ({ ...p, level: l.level })))
		.slice(0, maxShow);

	return (
		<Card className="border-amber-500/20">
			<CardHeader className="flex flex-row items-center gap-2">
				<AlertCircle className="size-5 text-amber-500" />
				<CardTitle className="text-base">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="divide-y">
					{alertItems.map((item, idx) => (
						<StockAlertRow key={idx} product={item} level={item.level} />
					))}
				</div>
			</CardContent>
		</Card>
	);
};

interface TurnoverRateCardProps {
	title: string;
	rate: number;
	trend: number;
	breakdown: { name: string; rate: number }[];
}

const TurnoverRateCard = ({ title, rate, trend, breakdown }: TurnoverRateCardProps) => (
	<Card>
		<CardHeader>
			<CardTitle className="text-base">{title}</CardTitle>
		</CardHeader>
		<CardContent>
			<div className="mb-4 flex items-end gap-2">
				<span className="text-4xl font-bold">{rate.toFixed(1)}x</span>
				<span className={`mb-1 flex items-center gap-1 text-sm ${trend >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
					{trend >= 0 ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
					{trend >= 0 ? '+' : ''}{trend}%
				</span>
			</div>
			<div className="space-y-3">
				{breakdown.map((item) => (
					<div key={item.name} className="space-y-1">
						<div className="flex items-center justify-between text-sm">
							<span>{item.name}</span>
							<span className="font-medium">{item.rate.toFixed(1)}x</span>
						</div>
						<Progress value={(item.rate / 15) * 100} className="h-2" />
					</div>
				))}
			</div>
		</CardContent>
	</Card>
);

export default function Main() {
	const metrics: InventoryMetric[] = [
		{ label: 'In Stock', value: 8456, change: 5, icon: CheckCircle2, variant: 'success' },
		{ label: 'Low Stock', value: 234, change: 12, icon: AlertCircle, variant: 'warning' },
		{ label: 'Out of Stock', value: 45, change: -8, icon: XCircle, variant: 'danger' },
		{ label: 'On Backorder', value: 89, change: 3, icon: Clock, variant: 'default' },
	];

	const inventoryStatus: InventoryStatus = {
		inStock: 8456,
		lowStock: 234,
		outOfStock: 45,
		backorder: 89,
		total: 8824,
	};

	const stockLevels: StockLevel[] = [
		{ level: 'low', count: 12, products: [
			{ name: 'Wireless Mouse Pro', quantity: 15 },
			{ name: 'USB-C Cable 2m', quantity: 8 },
			{ name: 'Webcam HD 1080p', quantity: 5 },
		]},
		{ level: 'out', count: 5, products: [
			{ name: 'Gaming Keyboard RGB', quantity: 0 },
			{ name: 'Monitor Arm Dual', quantity: 0 },
		]},
	];

	const turnoverBreakdown = [
		{ name: 'Electronics', rate: 12.5 },
		{ name: 'Accessories', rate: 8.3 },
		{ name: 'Audio', rate: 6.7 },
		{ name: 'Home', rate: 4.2 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @xs:grid-cols-2 @lg:grid-cols-4">
					{metrics.map((metric) => (
						<StatusCard key={metric.label} metric={metric} />
					))}
				</div>

				<StockDistribution
					title="Stock Distribution"
					status={inventoryStatus}
					labels={{ inStock: 'In Stock', lowStock: 'Low Stock', outOfStock: 'Out of Stock', backorder: 'Backorder' }}
				/>

				<div className="grid gap-6 @lg:grid-cols-2">
					<StockAlertsCard
						title="Stock Alerts"
						levels={stockLevels}
					/>
					<TurnoverRateCard
						title="Inventory Turnover"
						rate={8.4}
						trend={12}
						breakdown={turnoverBreakdown}
					/>
				</div>
			</div>
		</section>
	);
}
