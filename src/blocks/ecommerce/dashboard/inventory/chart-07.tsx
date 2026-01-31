'use client';

import * as React from 'react';
import {
	Warehouse,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

type Location = {
	id: string;
	name: string;
	code: string;
	capacity: number;
	used: number;
	value: number;
	change: number;
};

type LocationBarProps = {
	location: Location;
	maxValue: number;
};

const LocationBar = ({ location, maxValue }: LocationBarProps) => {
	const utilization = (location.used / location.capacity) * 100;
	const valueWidth = (location.value / maxValue) * 100;

	const getUtilizationColor = (util: number) => {
		if (util >= 90) return 'bg-destructive';
		if (util >= 75) return 'bg-amber-500';
		return 'bg-primary';
	};

	return (
		<div className="space-y-3 py-4 border-b last:border-0">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
						<Warehouse className="size-5 text-muted-foreground" />
					</div>
					<div>
						<p className="font-medium">{location.name}</p>
						<p className="text-xs text-muted-foreground">{location.code}</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<div className="text-right">
						<p className="text-sm font-semibold">${(location.value / 1000).toFixed(0)}K</p>
						<div className="flex items-center gap-1 text-xs">
							{location.change >= 0 ? (
								<TrendingUp className="size-3 text-emerald-500" />
							) : (
								<TrendingDown className="size-3 text-destructive" />
							)}
							<span className={location.change >= 0 ? 'text-emerald-500' : 'text-destructive'}>
								{location.change >= 0 ? '+' : ''}{location.change}%
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className="grid gap-2 @sm:grid-cols-2">
				<div>
					<div className="flex justify-between text-xs mb-1">
						<span className="text-muted-foreground">Inventory Value</span>
						<span className="font-medium">${location.value.toLocaleString()}</span>
					</div>
					<div className="relative h-3 overflow-hidden rounded-full bg-muted">
						<div
							className="absolute inset-y-0 left-0 bg-primary rounded-full"
							style={{ width: `${valueWidth}%` }}
						/>
					</div>
				</div>
				<div>
					<div className="flex justify-between text-xs mb-1">
						<span className="text-muted-foreground">Capacity</span>
						<span className="font-medium">{utilization.toFixed(0)}%</span>
					</div>
					<div className="relative h-3 overflow-hidden rounded-full bg-muted">
						<div
							className={`absolute inset-y-0 left-0 rounded-full ${getUtilizationColor(utilization)}`}
							style={{ width: `${utilization}%` }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default function Main() {
	const locations: Location[] = [
		{ id: '1', name: 'Main Warehouse', code: 'WH-001', capacity: 20000, used: 15840, value: 856000, change: 8 },
		{ id: '2', name: 'East Distribution', code: 'WH-002', capacity: 10000, used: 9200, value: 425000, change: 12 },
		{ id: '3', name: 'West Fulfillment', code: 'FC-001', capacity: 15000, used: 11250, value: 523000, change: -3 },
		{ id: '4', name: 'NYC Retail Store', code: 'ST-NYC', capacity: 3000, used: 2340, value: 145000, change: 15 },
		{ id: '5', name: 'LA Retail Store', code: 'ST-LA', capacity: 2500, used: 1890, value: 112000, change: 5 },
	];

	const maxValue = Math.max(...locations.map((l) => l.value));
	const totalValue = locations.reduce((sum, l) => sum + l.value, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Location Comparison</CardTitle>
								<CardDescription>Inventory value and capacity by location</CardDescription>
							</div>
							<div className="text-right">
								<p className="text-sm text-muted-foreground">Total Value</p>
								<p className="text-2xl font-bold">${(totalValue / 1000000).toFixed(2)}M</p>
							</div>
						</div>
					</CardHeader>
					<CardContent>
						{locations.map((location) => (
							<LocationBar key={location.id} location={location} maxValue={maxValue} />
						))}
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
