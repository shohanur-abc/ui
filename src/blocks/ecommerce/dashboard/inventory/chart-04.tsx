'use client';

import * as React from 'react';
import { MapPin, Package, TrendingUp } from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

type LocationData = {
	id: string;
	name: string;
	code: string;
	region: string;
	stock: number;
	capacity: number;
	turnover: number;
	status: 'optimal' | 'high' | 'low';
};

type TreemapCellProps = {
	location: LocationData;
	percentage: number;
};

const TreemapCell = ({ location, percentage }: TreemapCellProps) => {
	const statusColors = {
		optimal: 'bg-emerald-500/80 hover:bg-emerald-500',
		high: 'bg-amber-500/80 hover:bg-amber-500',
		low: 'bg-red-500/80 hover:bg-red-500',
	};

	const utilization = (location.stock / location.capacity) * 100;

	return (
		<div
			className={`group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-lg p-3 text-white transition-all ${statusColors[location.status]}`}
			style={{ flex: `${percentage} 1 0%`, minHeight: '100px' }}
		>
			<div>
				<p className="font-semibold">{location.name}</p>
				<p className="text-xs opacity-80">{location.code}</p>
			</div>
			<div className="mt-2">
				<p className="text-lg font-bold">{location.stock.toLocaleString()}</p>
				<p className="text-xs opacity-80">{utilization.toFixed(0)}% capacity</p>
			</div>
			<div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
				<div className="text-center">
					<p className="font-semibold">{location.name}</p>
					<p className="text-sm">{location.stock.toLocaleString()} units</p>
					<p className="text-sm">{location.turnover}x turnover</p>
				</div>
			</div>
		</div>
	);
};

type RegionGroupProps = {
	region: string;
	locations: LocationData[];
	totalStock: number;
};

const RegionGroup = ({ region, locations, totalStock }: RegionGroupProps) => {
	const regionStock = locations.reduce((sum, l) => sum + l.stock, 0);
	const regionPercentage = (regionStock / totalStock) * 100;

	return (
		<div
			className="space-y-2"
			style={{ flex: `${regionPercentage} 1 0%`, minWidth: '200px' }}
		>
			<div className="flex items-center justify-between">
				<h4 className="font-medium">{region}</h4>
				<Badge variant="secondary">{regionStock.toLocaleString()} units</Badge>
			</div>
			<div className="flex flex-wrap gap-2">
				{locations.map((location) => {
					const locationPercentage = (location.stock / regionStock) * 100;
					return (
						<TreemapCell
							key={location.id}
							location={location}
							percentage={locationPercentage}
						/>
					);
				})}
			</div>
		</div>
	);
};

type LegendItemProps = {
	label: string;
	color: string;
};

const LegendItem = ({ label, color }: LegendItemProps) => (
	<div className="flex items-center gap-2">
		<div className={`size-3 rounded ${color}`} />
		<span className="text-sm text-muted-foreground">{label}</span>
	</div>
);

export default function Main() {
	const locations: LocationData[] = [
		{
			id: '1',
			name: 'Main Warehouse',
			code: 'WH-001',
			region: 'East Coast',
			stock: 12500,
			capacity: 20000,
			turnover: 5.2,
			status: 'optimal',
		},
		{
			id: '2',
			name: 'NYC Store',
			code: 'ST-NYC',
			region: 'East Coast',
			stock: 1800,
			capacity: 2000,
			turnover: 8.5,
			status: 'high',
		},
		{
			id: '3',
			name: 'Boston Hub',
			code: 'HB-BOS',
			region: 'East Coast',
			stock: 3200,
			capacity: 5000,
			turnover: 4.8,
			status: 'optimal',
		},
		{
			id: '4',
			name: 'West Fulfillment',
			code: 'WH-002',
			region: 'West Coast',
			stock: 8900,
			capacity: 15000,
			turnover: 6.1,
			status: 'optimal',
		},
		{
			id: '5',
			name: 'LA Store',
			code: 'ST-LA',
			region: 'West Coast',
			stock: 1500,
			capacity: 2500,
			turnover: 7.2,
			status: 'optimal',
		},
		{
			id: '6',
			name: 'Seattle Depot',
			code: 'DP-SEA',
			region: 'West Coast',
			stock: 450,
			capacity: 3000,
			turnover: 2.1,
			status: 'low',
		},
		{
			id: '7',
			name: 'Central Hub',
			code: 'HB-CHI',
			region: 'Central',
			stock: 5600,
			capacity: 10000,
			turnover: 4.5,
			status: 'optimal',
		},
		{
			id: '8',
			name: 'Dallas Store',
			code: 'ST-DAL',
			region: 'Central',
			stock: 980,
			capacity: 1500,
			turnover: 5.8,
			status: 'optimal',
		},
	];

	const regions = Array.from(new Set(locations.map((l) => l.region)));
	const totalStock = locations.reduce((sum, l) => sum + l.stock, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex flex-col gap-4 @sm:flex-row @sm:items-center @sm:justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">
									Stock Distribution
								</CardTitle>
								<CardDescription>
									Inventory across all locations
								</CardDescription>
							</div>
							<div className="flex gap-4">
								<LegendItem label="Optimal" color="bg-emerald-500" />
								<LegendItem label="High Capacity" color="bg-amber-500" />
								<LegendItem label="Low Stock" color="bg-red-500" />
							</div>
						</div>
					</CardHeader>
					<CardContent>
						<div className="flex flex-wrap gap-6">
							{regions.map((region) => (
								<RegionGroup
									key={region}
									region={region}
									locations={locations.filter((l) => l.region === region)}
									totalStock={totalStock}
								/>
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
