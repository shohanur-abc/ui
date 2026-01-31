'use client';

import * as React from 'react';
import {
	Package,
	BarChart2,
	TrendingUp,
	TrendingDown,
	Eye,
	ShoppingCart,
	DollarSign,
	Percent,
	ChevronRight,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ProductPerformance {
	id: string;
	name: string;
	sku: string;
	image: string;
	views: number;
	viewsTrend: number;
	addToCart: number;
	addToCartRate: number;
	purchases: number;
	conversionRate: number;
	revenue: number;
	revenueTrend: number;
	rank: number;
}

interface TrendValueProps {
	value: number;
	suffix?: string;
}

const TrendValue = ({ value, suffix = '%' }: TrendValueProps) => {
	const isPositive = value >= 0;
	return (
		<span className={`flex items-center gap-0.5 text-xs ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
			{isPositive ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
			{Math.abs(value)}{suffix}
		</span>
	);
};

interface MetricCellProps {
	icon: React.ElementType;
	value: string | number;
	trend?: number;
	label: string;
}

const MetricCell = ({ icon: Icon, value, trend, label }: MetricCellProps) => (
	<div className="flex flex-col items-center gap-1 rounded-lg bg-muted/50 p-3 text-center">
		<Icon className="size-4 text-muted-foreground" />
		<div className="flex items-center gap-1">
			<span className="text-lg font-bold">{value}</span>
			{trend !== undefined && <TrendValue value={trend} />}
		</div>
		<span className="text-xs text-muted-foreground">{label}</span>
	</div>
);

interface ConversionFunnelProps {
	views: number;
	addToCart: number;
	purchases: number;
	labels: { views: string; cart: string; purchase: string };
}

const ConversionFunnel = ({ views, addToCart, purchases, labels }: ConversionFunnelProps) => {
	const cartRate = views > 0 ? (addToCart / views) * 100 : 0;
	const purchaseRate = addToCart > 0 ? (purchases / addToCart) * 100 : 0;

	return (
		<div className="flex items-center gap-2">
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between text-xs">
					<span>{labels.views}</span>
					<span className="font-medium">{views.toLocaleString()}</span>
				</div>
				<Progress value={100} className="h-1.5" />
			</div>
			<ChevronRight className="size-4 text-muted-foreground" />
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between text-xs">
					<span>{labels.cart}</span>
					<span className="font-medium">{addToCart.toLocaleString()} ({cartRate.toFixed(1)}%)</span>
				</div>
				<Progress value={cartRate} className="h-1.5 [&>div]:bg-amber-500" />
			</div>
			<ChevronRight className="size-4 text-muted-foreground" />
			<div className="flex-1 space-y-1">
				<div className="flex items-center justify-between text-xs">
					<span>{labels.purchase}</span>
					<span className="font-medium">{purchases.toLocaleString()} ({purchaseRate.toFixed(1)}%)</span>
				</div>
				<Progress value={purchaseRate} className="h-1.5 [&>div]:bg-emerald-500" />
			</div>
		</div>
	);
};

interface RankBadgeProps {
	rank: number;
}

const RankBadge = ({ rank }: RankBadgeProps) => {
	const getBadgeStyle = () => {
		if (rank === 1) return 'bg-amber-500 text-white';
		if (rank === 2) return 'bg-gray-400 text-white';
		if (rank === 3) return 'bg-amber-700 text-white';
		return 'bg-muted text-muted-foreground';
	};

	return (
		<div className={`flex size-10 items-center justify-center rounded-full font-bold ${getBadgeStyle()}`}>
			#{rank}
		</div>
	);
};

interface ProductRowProps {
	product: ProductPerformance;
	onViewDetails: (id: string) => void;
	labels: {
		views: string;
		cart: string;
		purchase: string;
		revenue: string;
		viewDetails: string;
	};
}

const ProductRow = ({ product, onViewDetails, labels }: ProductRowProps) => (
	<div className="group rounded-lg border bg-card p-4 transition-all hover:shadow-md">
		<div className="mb-4 flex items-center gap-4">
			<RankBadge rank={product.rank} />
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<h3 className="font-semibold">{product.name}</h3>
				<p className="text-sm text-muted-foreground">{product.sku}</p>
			</div>
			<div className="text-right">
				<div className="flex items-center gap-2">
					<span className="text-2xl font-bold">${product.revenue.toLocaleString()}</span>
					<TrendValue value={product.revenueTrend} />
				</div>
				<span className="text-sm text-muted-foreground">{labels.revenue}</span>
			</div>
			<Button variant="outline" size="sm" onClick={() => onViewDetails(product.id)}>
				<BarChart2 className="mr-2 size-4" />
				{labels.viewDetails}
			</Button>
		</div>
		<div className="mb-4 grid gap-2 @xs:grid-cols-2 @md:grid-cols-4">
			<MetricCell
				icon={Eye}
				value={product.views.toLocaleString()}
				trend={product.viewsTrend}
				label={labels.views}
			/>
			<MetricCell
				icon={ShoppingCart}
				value={product.addToCart.toLocaleString()}
				label={labels.cart}
			/>
			<MetricCell
				icon={DollarSign}
				value={product.purchases.toLocaleString()}
				label={labels.purchase}
			/>
			<MetricCell
				icon={Percent}
				value={`${product.conversionRate.toFixed(2)}%`}
				label="Conv. Rate"
			/>
		</div>
		<ConversionFunnel
			views={product.views}
			addToCart={product.addToCart}
			purchases={product.purchases}
			labels={{ views: labels.views, cart: labels.cart, purchase: labels.purchase }}
		/>
	</div>
);

export default function Main() {
	const products: ProductPerformance[] = [
		{
			id: '1',
			name: 'Premium Yoga Mat',
			sku: 'YOG-PRM-001',
			image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&h=100&fit=crop',
			views: 45230,
			viewsTrend: 23,
			addToCart: 8934,
			addToCartRate: 19.75,
			purchases: 2456,
			conversionRate: 5.43,
			revenue: 122800,
			revenueTrend: 18,
			rank: 1,
		},
		{
			id: '2',
			name: 'Resistance Bands Set',
			sku: 'FIT-RBS-002',
			image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=100&h=100&fit=crop',
			views: 38450,
			viewsTrend: 15,
			addToCart: 7234,
			addToCartRate: 18.81,
			purchases: 1987,
			conversionRate: 5.17,
			revenue: 59610,
			revenueTrend: 12,
			rank: 2,
		},
		{
			id: '3',
			name: 'Adjustable Dumbbells',
			sku: 'FIT-ADB-003',
			image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
			views: 32100,
			viewsTrend: -5,
			addToCart: 4567,
			addToCartRate: 14.23,
			purchases: 1234,
			conversionRate: 3.84,
			revenue: 185100,
			revenueTrend: 8,
			rank: 3,
		},
		{
			id: '4',
			name: 'Foam Roller Pro',
			sku: 'FIT-FRP-004',
			image: 'https://images.unsplash.com/photo-1600881333168-2ef49b341f30?w=100&h=100&fit=crop',
			views: 28900,
			viewsTrend: 8,
			addToCart: 5678,
			addToCartRate: 19.65,
			purchases: 1567,
			conversionRate: 5.42,
			revenue: 47010,
			revenueTrend: -3,
			rank: 4,
		},
		{
			id: '5',
			name: 'Jump Rope Speed',
			sku: 'FIT-JRS-005',
			image: 'https://images.unsplash.com/photo-1434682881908-b43d0467b798?w=100&h=100&fit=crop',
			views: 21500,
			viewsTrend: -12,
			addToCart: 3456,
			addToCartRate: 16.07,
			purchases: 890,
			conversionRate: 4.14,
			revenue: 17800,
			revenueTrend: -8,
			rank: 5,
		},
	];

	const labels = {
		views: 'Views',
		cart: 'Add to Cart',
		purchase: 'Purchases',
		revenue: 'Total Revenue',
		viewDetails: 'Details',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						onViewDetails={(id) => console.log('View details', id)}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
