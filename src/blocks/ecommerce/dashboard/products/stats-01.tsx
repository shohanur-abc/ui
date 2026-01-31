'use client';

import * as React from 'react';
import {
	Package,
	TrendingUp,
	TrendingDown,
	DollarSign,
	ShoppingCart,
	Eye,
	RotateCcw,
	ArrowUpRight,
	ArrowDownRight,
	Minus,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';

interface MetricData {
	value: number;
	change: number;
	previousValue: number;
}

interface ProductStats {
	totalProducts: MetricData;
	activeProducts: MetricData;
	revenue: MetricData;
	orders: MetricData;
	views: MetricData;
	conversionRate: MetricData;
	averageOrderValue: MetricData;
	returnRate: MetricData;
}

interface StatCardProps {
	title: string;
	value: string | number;
	change: number;
	previousValue: string | number;
	icon: React.ElementType;
	format?: 'number' | 'currency' | 'percent';
	invertColors?: boolean;
}

const StatCard = ({
	title,
	value,
	change,
	previousValue,
	icon: Icon,
	format = 'number',
	invertColors = false,
}: StatCardProps) => {
	const formatValue = (val: number | string) => {
		if (typeof val === 'string') return val;
		if (format === 'currency') return `$${val.toLocaleString()}`;
		if (format === 'percent') return `${val.toFixed(2)}%`;
		return val.toLocaleString();
	};

	const isPositive = change > 0;
	const isNegative = change < 0;
	const isNeutral = change === 0;

	const getChangeColor = () => {
		if (isNeutral) return 'text-muted-foreground';
		if (invertColors) {
			return isPositive ? 'text-red-500' : 'text-emerald-500';
		}
		return isPositive ? 'text-emerald-500' : 'text-red-500';
	};

	const getChangeIcon = () => {
		if (isNeutral) return Minus;
		return isPositive ? ArrowUpRight : ArrowDownRight;
	};

	const ChangeIcon = getChangeIcon();

	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium text-muted-foreground">
					{title}
				</CardTitle>
				<Icon className="size-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-bold">{formatValue(value)}</div>
				<div className="flex items-center gap-2 text-xs">
					<span className={`flex items-center gap-1 ${getChangeColor()}`}>
						<ChangeIcon className="size-3" />
						{Math.abs(change).toFixed(1)}%
					</span>
					<span className="text-muted-foreground">
						from {formatValue(previousValue)}
					</span>
				</div>
			</CardContent>
		</Card>
	);
};

interface TrendChartMiniProps {
	data: number[];
	positive?: boolean;
}

const TrendChartMini = ({ data, positive = true }: TrendChartMiniProps) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	const points = data
		.map((value, index) => {
			const x = (index / (data.length - 1)) * 100;
			const y = 100 - ((value - min) / range) * 100;
			return `${x},${y}`;
		})
		.join(' ');

	return (
		<svg className="h-12 w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
			<polyline
				points={points}
				fill="none"
				stroke={positive ? 'rgb(16, 185, 129)' : 'rgb(239, 68, 68)'}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

interface DetailedStatCardProps {
	title: string;
	value: string | number;
	change: number;
	icon: React.ElementType;
	trendData: number[];
	format?: 'number' | 'currency' | 'percent';
}

const DetailedStatCard = ({
	title,
	value,
	change,
	icon: Icon,
	trendData,
	format = 'number',
}: DetailedStatCardProps) => {
	const formatValue = (val: number | string) => {
		if (typeof val === 'string') return val;
		if (format === 'currency') return `$${val.toLocaleString()}`;
		if (format === 'percent') return `${val.toFixed(2)}%`;
		return val.toLocaleString();
	};

	const isPositive = change >= 0;

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div>
						<p className="text-sm text-muted-foreground">{title}</p>
						<p className="mt-1 text-3xl font-bold">{formatValue(value)}</p>
						<div className={`mt-2 flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
							{isPositive ? <TrendingUp className="size-4" /> : <TrendingDown className="size-4" />}
							<span>{isPositive ? '+' : ''}{change.toFixed(1)}% vs last period</span>
						</div>
					</div>
					<div className="flex size-12 items-center justify-center rounded-lg bg-primary/10">
						<Icon className="size-6 text-primary" />
					</div>
				</div>
				<div className="mt-4">
					<TrendChartMini data={trendData} positive={isPositive} />
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const stats: ProductStats = {
		totalProducts: { value: 1234, change: 5.2, previousValue: 1173 },
		activeProducts: { value: 1089, change: 3.8, previousValue: 1049 },
		revenue: { value: 284930, change: 12.5, previousValue: 253271 },
		orders: { value: 3456, change: 8.3, previousValue: 3191 },
		views: { value: 128450, change: -2.4, previousValue: 131606 },
		conversionRate: { value: 2.69, change: 10.6, previousValue: 2.43 },
		averageOrderValue: { value: 82.45, change: 3.9, previousValue: 79.36 },
		returnRate: { value: 2.8, change: -15.2, previousValue: 3.3 },
	};

	const trendData = {
		revenue: [24000, 26500, 25800, 28900, 27500, 31200, 28493],
		orders: [280, 310, 295, 340, 325, 380, 345],
		views: [12000, 13500, 12800, 11900, 13200, 12500, 12845],
		conversion: [2.3, 2.4, 2.5, 2.3, 2.6, 2.7, 2.69],
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="grid gap-4 @xs:grid-cols-2 @lg:grid-cols-4">
					<StatCard
						title="Total Products"
						value={stats.totalProducts.value}
						change={stats.totalProducts.change}
						previousValue={stats.totalProducts.previousValue}
						icon={Package}
					/>
					<StatCard
						title="Active Products"
						value={stats.activeProducts.value}
						change={stats.activeProducts.change}
						previousValue={stats.activeProducts.previousValue}
						icon={Package}
					/>
					<StatCard
						title="Total Revenue"
						value={stats.revenue.value}
						change={stats.revenue.change}
						previousValue={stats.revenue.previousValue}
						icon={DollarSign}
						format="currency"
					/>
					<StatCard
						title="Total Orders"
						value={stats.orders.value}
						change={stats.orders.change}
						previousValue={stats.orders.previousValue}
						icon={ShoppingCart}
					/>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2">
					<DetailedStatCard
						title="Total Revenue"
						value={stats.revenue.value}
						change={stats.revenue.change}
						icon={DollarSign}
						trendData={trendData.revenue}
						format="currency"
					/>
					<DetailedStatCard
						title="Orders"
						value={stats.orders.value}
						change={stats.orders.change}
						icon={ShoppingCart}
						trendData={trendData.orders}
					/>
				</div>

				<div className="grid gap-4 @xs:grid-cols-2 @lg:grid-cols-4">
					<StatCard
						title="Page Views"
						value={stats.views.value}
						change={stats.views.change}
						previousValue={stats.views.previousValue}
						icon={Eye}
					/>
					<StatCard
						title="Conversion Rate"
						value={stats.conversionRate.value}
						change={stats.conversionRate.change}
						previousValue={stats.conversionRate.previousValue}
						icon={TrendingUp}
						format="percent"
					/>
					<StatCard
						title="Avg Order Value"
						value={stats.averageOrderValue.value}
						change={stats.averageOrderValue.change}
						previousValue={stats.averageOrderValue.previousValue}
						icon={DollarSign}
						format="currency"
					/>
					<StatCard
						title="Return Rate"
						value={stats.returnRate.value}
						change={stats.returnRate.change}
						previousValue={stats.returnRate.previousValue}
						icon={RotateCcw}
						format="percent"
						invertColors
					/>
				</div>
			</div>
		</section>
	);
}
