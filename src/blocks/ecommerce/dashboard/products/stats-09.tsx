'use client';

import * as React from 'react';
import {
	Activity,
	TrendingUp,
	TrendingDown,
	Eye,
	ShoppingCart,
	DollarSign,
	Clock,
	RefreshCw,
	Wifi,
	WifiOff,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

interface LiveMetricProps {
	icon: React.ElementType;
	label: string;
	value: string;
	change: number;
	isLive: boolean;
}

const LiveMetric = ({
	icon: Icon,
	label,
	value,
	change,
	isLive,
}: LiveMetricProps) => {
	const isPositive = change >= 0;

	return (
		<div className="relative rounded-lg border bg-card p-4">
			{isLive && (
				<div className="absolute right-3 top-3 flex items-center gap-1">
					<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
					<span className="text-[10px] text-emerald-500">LIVE</span>
				</div>
			)}
			<div className="mb-2 flex items-center gap-2 text-muted-foreground">
				<Icon className="size-4" />
				<span className="text-sm">{label}</span>
			</div>
			<p className="text-2xl font-bold">{value}</p>
			<div
				className={`mt-1 flex items-center gap-1 text-sm ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}
			>
				{isPositive ? (
					<TrendingUp className="size-3.5" />
				) : (
					<TrendingDown className="size-3.5" />
				)}
				<span>
					{isPositive ? '+' : ''}
					{change}%
				</span>
				<span className="text-muted-foreground">vs last hour</span>
			</div>
		</div>
	);
};

interface ActivityFeedItem {
	id: string;
	type: 'view' | 'cart' | 'purchase';
	product: string;
	location: string;
	timestamp: string;
}

interface ActivityFeedProps {
	items: ActivityFeedItem[];
	labels: { view: string; cart: string; purchase: string };
}

const ActivityFeed = ({ items, labels }: ActivityFeedProps) => {
	const icons = {
		view: Eye,
		cart: ShoppingCart,
		purchase: DollarSign,
	};

	const colors = {
		view: 'text-blue-500 bg-blue-500/10',
		cart: 'text-amber-500 bg-amber-500/10',
		purchase: 'text-emerald-500 bg-emerald-500/10',
	};

	return (
		<div className="rounded-lg border bg-card">
			<div className="flex items-center justify-between border-b p-4">
				<h3 className="font-semibold">Live Activity Feed</h3>
				<div className="flex items-center gap-2">
					<span className="size-2 animate-pulse rounded-full bg-emerald-500" />
					<span className="text-sm text-muted-foreground">Real-time</span>
				</div>
			</div>
			<div className="max-h-80 space-y-0 overflow-y-auto">
				{items.map((item, idx) => {
					const Icon = icons[item.type];
					return (
						<div
							key={item.id}
							className={`flex items-center gap-3 p-3 ${idx !== items.length - 1 ? 'border-b' : ''}`}
						>
							<div
								className={`flex size-8 items-center justify-center rounded-full ${colors[item.type]}`}
							>
								<Icon className="size-4" />
							</div>
							<div className="flex-1 min-w-0">
								<p className="truncate text-sm">
									<span className="font-medium">{labels[item.type]}</span>:{' '}
									{item.product}
								</p>
								<p className="text-xs text-muted-foreground">{item.location}</p>
							</div>
							<span className="shrink-0 text-xs text-muted-foreground">
								{item.timestamp}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

interface CurrentVisitorsProps {
	count: number;
	pages: { name: string; visitors: number }[];
}

const CurrentVisitors = ({ count, pages }: CurrentVisitorsProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-center justify-between">
			<h3 className="font-semibold">Current Visitors</h3>
			<Badge className="gap-1 bg-emerald-500">
				<span className="size-2 animate-pulse rounded-full bg-white" />
				{count} online
			</Badge>
		</div>
		<div className="space-y-3">
			{pages.map((page) => (
				<div key={page.name} className="flex items-center justify-between">
					<span className="text-sm">{page.name}</span>
					<div className="flex items-center gap-2">
						<div className="flex -space-x-1">
							{[...Array(Math.min(page.visitors, 3))].map((_, i) => (
								<div
									key={i}
									className="size-5 rounded-full border-2 border-card bg-muted"
								/>
							))}
						</div>
						<span className="text-sm font-medium">{page.visitors}</span>
					</div>
				</div>
			))}
		</div>
	</div>
);

interface LiveChartProps {
	title: string;
	data: number[];
}

const LiveChart = ({ title, data }: LiveChartProps) => {
	const max = Math.max(...data);
	const min = Math.min(...data);
	const range = max - min || 1;

	return (
		<div className="rounded-lg border bg-card p-4">
			<div className="mb-4 flex items-center justify-between">
				<h3 className="font-semibold">{title}</h3>
				<Badge variant="outline" className="gap-1">
					<Activity className="size-3" />
					Last 10 min
				</Badge>
			</div>
			<div className="flex h-24 items-end gap-1">
				{data.map((value, idx) => (
					<div
						key={idx}
						className="flex-1 rounded-t bg-primary/80 transition-all"
						style={{
							height: `${((value - min) / range) * 100}%`,
							minHeight: '4px',
						}}
					/>
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const [isLive, setIsLive] = React.useState(true);
	const [lastUpdate, setLastUpdate] = React.useState('Just now');

	const metrics = [
		{ icon: Eye, label: 'Page Views', value: '1,234', change: 12.5, isLive },
		{
			icon: ShoppingCart,
			label: 'Add to Cart',
			value: '89',
			change: 8.3,
			isLive,
		},
		{
			icon: DollarSign,
			label: 'Revenue',
			value: '$2,456',
			change: 23.1,
			isLive,
		},
	];

	const activityItems: ActivityFeedItem[] = [
		{
			id: '1',
			type: 'purchase',
			product: 'Premium Headphones',
			location: 'New York, US',
			timestamp: '2s ago',
		},
		{
			id: '2',
			type: 'cart',
			product: 'Sport Earbuds',
			location: 'London, UK',
			timestamp: '15s ago',
		},
		{
			id: '3',
			type: 'view',
			product: 'Gaming Headset',
			location: 'Tokyo, JP',
			timestamp: '32s ago',
		},
		{
			id: '4',
			type: 'purchase',
			product: 'Studio Monitor',
			location: 'Berlin, DE',
			timestamp: '1m ago',
		},
		{
			id: '5',
			type: 'view',
			product: 'Premium Headphones',
			location: 'Paris, FR',
			timestamp: '2m ago',
		},
		{
			id: '6',
			type: 'cart',
			product: 'Gaming Headset',
			location: 'Sydney, AU',
			timestamp: '3m ago',
		},
	];

	const currentVisitors = {
		count: 47,
		pages: [
			{ name: 'Product Page', visitors: 23 },
			{ name: 'Category Page', visitors: 12 },
			{ name: 'Checkout', visitors: 8 },
			{ name: 'Cart', visitors: 4 },
		],
	};

	const chartData = [45, 52, 48, 61, 55, 72, 68, 75, 82, 78];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-6 px-4 py-8 @sm:px-6 @2xl:px-8">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<Activity className="size-5" />
						<h2 className="text-xl font-semibold">Real-Time Analytics</h2>
					</div>
					<div className="flex items-center gap-4">
						<div className="flex items-center gap-2">
							{isLive ? (
								<Wifi className="size-4 text-emerald-500" />
							) : (
								<WifiOff className="size-4 text-muted-foreground" />
							)}
							<Switch checked={isLive} onCheckedChange={setIsLive} />
							<Label className="text-sm">{isLive ? 'Live' : 'Paused'}</Label>
						</div>
						<Button variant="outline" size="sm" className="gap-2">
							<RefreshCw className="size-4" />
							Refresh
						</Button>
					</div>
				</div>

				{!isLive && (
					<div className="flex items-center gap-2 rounded-lg border border-amber-500/50 bg-amber-500/10 p-3 text-amber-500">
						<WifiOff className="size-4" />
						<span className="text-sm">
							Live updates paused. Last updated: {lastUpdate}
						</span>
					</div>
				)}

				<div className="grid gap-4 @sm:grid-cols-3">
					{metrics.map((metric) => (
						<LiveMetric key={metric.label} {...metric} />
					))}
				</div>

				<div className="grid gap-6 @lg:grid-cols-2">
					<ActivityFeed
						items={activityItems}
						labels={{
							view: 'Viewed',
							cart: 'Added to cart',
							purchase: 'Purchased',
						}}
					/>
					<div className="space-y-6">
						<CurrentVisitors {...currentVisitors} />
						<LiveChart title="Views per Minute" data={chartData} />
					</div>
				</div>
			</div>
		</section>
	);
}
