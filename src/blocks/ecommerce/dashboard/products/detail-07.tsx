'use client';

import * as React from 'react';
import {
	TrendingUp,
	TrendingDown,
	Eye,
	ShoppingCart,
	DollarSign,
	Users,
	ArrowUpRight,
	Calendar,
	BarChart3,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';

interface MetricCardProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: number;
	changeLabel: string;
}

const MetricCard = ({
	icon: Icon,
	label,
	value,
	change,
	changeLabel,
}: MetricCardProps) => {
	const isPositive = change >= 0;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="flex items-center gap-2 text-muted-foreground">
				<Icon className="size-4" />
				<span className="text-sm">{label}</span>
			</div>
			<p className="mt-2 text-2xl font-bold">{value}</p>
			<div className={`mt-1 flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
				{isPositive ? <TrendingUp className="size-3.5" /> : <TrendingDown className="size-3.5" />}
				<span>{isPositive ? '+' : ''}{change}%</span>
				<span className="text-muted-foreground">{changeLabel}</span>
			</div>
		</div>
	);
};

interface ChartPlaceholderProps {
	title: string;
	height?: number;
}

const ChartPlaceholder = ({ title, height = 200 }: ChartPlaceholderProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">{title}</h3>
		<div
			className="flex items-center justify-center rounded-md bg-muted/30"
			style={{ height }}
		>
			<BarChart3 className="size-8 text-muted-foreground" />
		</div>
	</div>
);

interface ConversionFunnelProps {
	stages: { label: string; value: number; percent: number }[];
}

const ConversionFunnel = ({ stages }: ConversionFunnelProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">Conversion Funnel</h3>
		<div className="space-y-3">
			{stages.map((stage, idx) => (
				<div key={stage.label}>
					<div className="mb-1 flex items-center justify-between text-sm">
						<span>{stage.label}</span>
						<span className="font-medium">{stage.value.toLocaleString()}</span>
					</div>
					<div className="relative h-8 overflow-hidden rounded-md bg-muted">
						<div
							className="absolute left-0 top-0 h-full bg-primary/20"
							style={{ width: `${stage.percent}%` }}
						/>
						<div className="absolute inset-0 flex items-center justify-center text-xs font-medium">
							{stage.percent.toFixed(1)}%
						</div>
					</div>
					{idx < stages.length - 1 && (
						<div className="flex justify-center py-1">
							<ArrowUpRight className="size-4 rotate-90 text-muted-foreground" />
						</div>
					)}
				</div>
			))}
		</div>
	</div>
);

interface TrafficSourceProps {
	sources: { name: string; visits: number; conversions: number; revenue: number }[];
}

const TrafficSource = ({ sources }: TrafficSourceProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">Traffic Sources</h3>
		<div className="space-y-3">
			{sources.map((source) => (
				<div key={source.name} className="flex items-center gap-4">
					<div className="flex-1">
						<p className="font-medium">{source.name}</p>
						<p className="text-sm text-muted-foreground">
							{source.visits.toLocaleString()} visits
						</p>
					</div>
					<div className="text-right">
						<p className="font-medium">${source.revenue.toLocaleString()}</p>
						<p className="text-sm text-muted-foreground">
							{source.conversions} orders
						</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

interface TopCustomersProps {
	customers: { name: string; email: string; orders: number; spent: number }[];
}

const TopCustomers = ({ customers }: TopCustomersProps) => (
	<div className="rounded-lg border bg-card p-4">
		<h3 className="mb-4 font-semibold">Top Customers</h3>
		<div className="space-y-3">
			{customers.map((customer, idx) => (
				<div key={customer.email} className="flex items-center gap-3">
					<div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
						{idx + 1}
					</div>
					<div className="min-w-0 flex-1">
						<p className="truncate font-medium">{customer.name}</p>
						<p className="truncate text-sm text-muted-foreground">{customer.email}</p>
					</div>
					<div className="text-right">
						<p className="font-medium">${customer.spent.toLocaleString()}</p>
						<p className="text-sm text-muted-foreground">{customer.orders} orders</p>
					</div>
				</div>
			))}
		</div>
	</div>
);

export default function Main() {
	const [dateRange, setDateRange] = React.useState('30d');

	const metrics = [
		{ icon: Eye, label: 'Page Views', value: '12,543', change: 15.2, changeLabel: 'vs last period' },
		{ icon: ShoppingCart, label: 'Add to Cart', value: '1,234', change: 8.5, changeLabel: 'vs last period' },
		{ icon: DollarSign, label: 'Revenue', value: '$45,678', change: 23.1, changeLabel: 'vs last period' },
		{ icon: Users, label: 'Unique Visitors', value: '8,912', change: -2.3, changeLabel: 'vs last period' },
	];

	const funnelStages = [
		{ label: 'Product Views', value: 12543, percent: 100 },
		{ label: 'Add to Cart', value: 1234, percent: 9.8 },
		{ label: 'Checkout Started', value: 567, percent: 4.5 },
		{ label: 'Purchases', value: 234, percent: 1.9 },
	];

	const trafficSources = [
		{ name: 'Organic Search', visits: 5234, conversions: 89, revenue: 17650 },
		{ name: 'Direct', visits: 3456, conversions: 67, revenue: 13400 },
		{ name: 'Social Media', visits: 2345, conversions: 45, revenue: 8900 },
		{ name: 'Email', visits: 1508, conversions: 33, revenue: 5728 },
	];

	const topCustomers = [
		{ name: 'John Smith', email: 'john@example.com', orders: 5, spent: 899 },
		{ name: 'Sarah Chen', email: 'sarah@example.com', orders: 4, spent: 756 },
		{ name: 'Mike Johnson', email: 'mike@example.com', orders: 3, spent: 534 },
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-6xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<BarChart3 className="size-5" />
						<h2 className="text-xl font-semibold">Product Analytics</h2>
					</div>
					<Select value={dateRange} onValueChange={setDateRange}>
						<SelectTrigger className="w-36">
							<Calendar className="mr-2 size-4" />
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="7d">Last 7 days</SelectItem>
							<SelectItem value="30d">Last 30 days</SelectItem>
							<SelectItem value="90d">Last 90 days</SelectItem>
							<SelectItem value="1y">Last year</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-4">
					{metrics.map((metric) => (
						<MetricCard key={metric.label} {...metric} />
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<ChartPlaceholder title="Revenue Over Time" height={250} />
					<ChartPlaceholder title="Views vs Conversions" height={250} />
				</div>

				<div className="grid gap-6 @lg:grid-cols-3">
					<ConversionFunnel stages={funnelStages} />
					<TrafficSource sources={trafficSources} />
					<TopCustomers customers={topCustomers} />
				</div>
			</div>
		</section>
	);
}
