'use client';

import * as React from 'react';
import {
	Package,
	BarChart3,
	TrendingUp,
	TrendingDown,
	DollarSign,
	ShoppingBag,
	Eye,
	Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ProductAnalytics {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	views: number;
	viewsTrend: number;
	sales: number;
	salesTrend: number;
	revenue: number;
	revenueTrend: number;
	conversionRate: number;
	stockPercentage: number;
}

interface MetricCardProps {
	icon: React.ElementType;
	label: string;
	value: string | number;
	trend?: number;
	format?: 'number' | 'currency' | 'percent';
}

const MetricCard = ({ icon: Icon, label, value, trend, format = 'number' }: MetricCardProps) => {
	const formatValue = () => {
		if (format === 'currency' && typeof value === 'number') {
			return `$${value.toLocaleString()}`;
		}
		if (format === 'percent' && typeof value === 'number') {
			return `${value.toFixed(1)}%`;
		}
		return typeof value === 'number' ? value.toLocaleString() : value;
	};

	const getTrendColor = (trend: number) => {
		if (trend > 0) return 'text-emerald-500';
		if (trend < 0) return 'text-red-500';
		return 'text-muted-foreground';
	};

	return (
		<div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-3">
			<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
				<Icon className="size-5 text-primary" />
			</div>
			<div className="flex-1">
				<p className="text-xs text-muted-foreground">{label}</p>
				<div className="flex items-center gap-2">
					<span className="text-lg font-bold">{formatValue()}</span>
					{trend !== undefined && (
						<span className={`flex items-center text-xs ${getTrendColor(trend)}`}>
							{trend > 0 ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
							{Math.abs(trend)}%
						</span>
					)}
				</div>
			</div>
		</div>
	);
};

interface ConversionIndicatorProps {
	rate: number;
}

const ConversionIndicator = ({ rate }: ConversionIndicatorProps) => {
	const getColor = () => {
		if (rate >= 5) return 'bg-emerald-500';
		if (rate >= 2) return 'bg-amber-500';
		return 'bg-red-500';
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Conversion Rate</span>
				<span className="font-medium">{rate.toFixed(2)}%</span>
			</div>
			<Progress value={rate * 10} className={`h-2 [&>div]:${getColor()}`} />
		</div>
	);
};

interface StockGaugeProps {
	percentage: number;
}

const StockGauge = ({ percentage }: StockGaugeProps) => {
	const getColor = () => {
		if (percentage >= 50) return 'text-emerald-500';
		if (percentage >= 20) return 'text-amber-500';
		return 'text-red-500';
	};

	const getBackgroundColor = () => {
		if (percentage >= 50) return '[&>div]:bg-emerald-500';
		if (percentage >= 20) return '[&>div]:bg-amber-500';
		return '[&>div]:bg-red-500';
	};

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between text-sm">
				<span className="text-muted-foreground">Stock Level</span>
				<span className={`font-medium ${getColor()}`}>{percentage}%</span>
			</div>
			<Progress value={percentage} className={`h-2 ${getBackgroundColor()}`} />
		</div>
	);
};

interface ProductAnalyticsCardProps {
	product: ProductAnalytics;
	onViewDetails: (id: string) => void;
	labels: {
		views: string;
		sales: string;
		revenue: string;
		viewDetails: string;
	};
}

const ProductAnalyticsCard = ({ product, onViewDetails, labels }: ProductAnalyticsCardProps) => (
	<Card className="overflow-hidden transition-shadow hover:shadow-lg">
		<div className="relative aspect-video overflow-hidden bg-muted">
			{product.image ? (
				<img
					src={product.image}
					alt={product.name}
					className="size-full object-cover"
				/>
			) : (
				<div className="flex size-full items-center justify-center">
					<Package className="size-16 text-muted-foreground" />
				</div>
			)}
			<div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />
			<div className="absolute bottom-3 left-3 right-3">
				<h3 className="truncate text-lg font-bold">{product.name}</h3>
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground">{product.sku}</span>
					<span className="text-lg font-bold text-primary">
						${product.price.toFixed(2)}
					</span>
				</div>
			</div>
		</div>
		<CardContent className="space-y-4 p-4">
			<div className="grid gap-3 @sm:grid-cols-3">
				<MetricCard
					icon={Eye}
					label={labels.views}
					value={product.views}
					trend={product.viewsTrend}
				/>
				<MetricCard
					icon={ShoppingBag}
					label={labels.sales}
					value={product.sales}
					trend={product.salesTrend}
				/>
				<MetricCard
					icon={DollarSign}
					label={labels.revenue}
					value={product.revenue}
					trend={product.revenueTrend}
					format="currency"
				/>
			</div>
			<div className="grid gap-4 @sm:grid-cols-2">
				<ConversionIndicator rate={product.conversionRate} />
				<StockGauge percentage={product.stockPercentage} />
			</div>
			<Button
				variant="outline"
				className="w-full gap-2"
				onClick={() => onViewDetails(product.id)}
			>
				<BarChart3 className="size-4" />
				{labels.viewDetails}
			</Button>
		</CardContent>
	</Card>
);

export default function Main() {
	const products: ProductAnalytics[] = [
		{
			id: '1',
			name: 'Pro Wireless Earbuds',
			sku: 'AUD-PRO-001',
			image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=400&fit=crop',
			price: 179.99,
			views: 12450,
			viewsTrend: 18,
			sales: 456,
			salesTrend: 12,
			revenue: 82079,
			revenueTrend: 15,
			conversionRate: 3.66,
			stockPercentage: 65,
		},
		{
			id: '2',
			name: 'Smart Fitness Watch',
			sku: 'FIT-WCH-002',
			image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=600&h=400&fit=crop',
			price: 299.99,
			views: 8920,
			viewsTrend: -5,
			sales: 234,
			salesTrend: 3,
			revenue: 70197,
			revenueTrend: 8,
			conversionRate: 2.62,
			stockPercentage: 23,
		},
		{
			id: '3',
			name: 'Portable Power Bank',
			sku: 'PWR-PRT-003',
			image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop',
			price: 49.99,
			views: 23450,
			viewsTrend: 35,
			sales: 1234,
			salesTrend: 28,
			revenue: 61687,
			revenueTrend: 32,
			conversionRate: 5.26,
			stockPercentage: 78,
		},
		{
			id: '4',
			name: 'USB-C Hub Pro',
			sku: 'ACC-HUB-004',
			image: 'https://images.unsplash.com/photo-1625723044792-44de16ccb4e9?w=600&h=400&fit=crop',
			price: 89.99,
			views: 5670,
			viewsTrend: -12,
			sales: 89,
			salesTrend: -8,
			revenue: 8009,
			revenueTrend: -5,
			conversionRate: 1.57,
			stockPercentage: 12,
		},
	];

	const labels = {
		views: 'Views',
		sales: 'Sales',
		revenue: 'Revenue',
		viewDetails: 'View Analytics',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-6 @md:grid-cols-2">
					{products.map((product) => (
						<ProductAnalyticsCard
							key={product.id}
							product={product}
							onViewDetails={(id) => console.log('View details', id)}
							labels={labels}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
