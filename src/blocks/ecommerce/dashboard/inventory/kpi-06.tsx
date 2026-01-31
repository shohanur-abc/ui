'use client';

import {
	Package,
	MapPin,
	TrendingUp,
	DollarSign,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type LocationMetric = {
	location: string;
	code: string;
	totalItems: number;
	value: number;
	turnover: number;
};

type MetricBarProps = {
	location: LocationMetric;
	maxValue: number;
};

const MetricBar = ({ location, maxValue }: MetricBarProps) => {
	const widthPercentage = (location.totalItems / maxValue) * 100;

	return (
		<div className="space-y-2">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<MapPin className="size-4 text-muted-foreground" />
					<span className="font-medium">{location.location}</span>
					<span className="text-xs text-muted-foreground">({location.code})</span>
				</div>
				<span className="font-semibold tabular-nums">{location.totalItems.toLocaleString()}</span>
			</div>
			<div className="h-3 w-full overflow-hidden rounded-full bg-muted">
				<div
					className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60 transition-all duration-500"
					style={{ width: `${widthPercentage}%` }}
				/>
			</div>
			<div className="flex justify-between text-xs text-muted-foreground">
				<span>${location.value.toLocaleString()} value</span>
				<span>{location.turnover.toFixed(1)}x turnover</span>
			</div>
		</div>
	);
};

type StatCardProps = {
	icon: React.ElementType;
	label: string;
	value: string;
};

const StatCard = ({ icon: Icon, label, value }: StatCardProps) => (
	<div className="flex items-center gap-3 rounded-lg border p-4">
		<div className="rounded-lg bg-primary/10 p-2">
			<Icon className="size-5 text-primary" />
		</div>
		<div>
			<p className="text-sm text-muted-foreground">{label}</p>
			<p className="text-xl font-bold">{value}</p>
		</div>
	</div>
);

export default function Main() {
	const locations: LocationMetric[] = [
		{ location: 'Main Warehouse', code: 'WH-001', totalItems: 12500, value: 485000, turnover: 5.2 },
		{ location: 'East Distribution', code: 'WH-002', totalItems: 8900, value: 342000, turnover: 4.8 },
		{ location: 'West Fulfillment', code: 'WH-003', totalItems: 6200, value: 234000, turnover: 6.1 },
		{ location: 'NYC Store', code: 'ST-001', totalItems: 1800, value: 89000, turnover: 8.5 },
		{ location: 'LA Store', code: 'ST-002', totalItems: 1500, value: 72000, turnover: 7.2 },
	];

	const maxValue = Math.max(...locations.map((l) => l.totalItems));
	const totalItems = locations.reduce((sum, l) => sum + l.totalItems, 0);
	const totalValue = locations.reduce((sum, l) => sum + l.value, 0);
	const avgTurnover = locations.reduce((sum, l) => sum + l.turnover, 0) / locations.length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">Inventory by Location</CardTitle>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							<StatCard
								icon={Package}
								label="Total Items"
								value={totalItems.toLocaleString()}
							/>
							<StatCard
								icon={DollarSign}
								label="Total Value"
								value={`$${(totalValue / 1000).toFixed(0)}K`}
							/>
							<StatCard
								icon={TrendingUp}
								label="Avg. Turnover"
								value={`${avgTurnover.toFixed(1)}x`}
							/>
						</div>
						<div className="space-y-6">
							{locations.map((location) => (
								<MetricBar key={location.code} location={location} maxValue={maxValue} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
