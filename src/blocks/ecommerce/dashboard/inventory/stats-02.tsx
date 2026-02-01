'use client';

import * as React from 'react';
import {
	Package,
	Warehouse,
	MapPin,
	TrendingUp,
	AlertTriangle,
	CheckCircle,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type LocationStat = {
	id: string;
	location: string;
	code: string;
	totalItems: number;
	capacity: number;
	utilization: number;
	lowStockItems: number;
	status: 'healthy' | 'warning' | 'critical';
};

type LocationStatRowProps = {
	stat: LocationStat;
};

const LocationStatRow = ({ stat }: LocationStatRowProps) => {
	const statusConfig = {
		healthy: {
			icon: <CheckCircle className="size-4 text-emerald-500" />,
			color: 'bg-emerald-500',
		},
		warning: {
			icon: <AlertTriangle className="size-4 text-amber-500" />,
			color: 'bg-amber-500',
		},
		critical: {
			icon: <AlertTriangle className="size-4 text-destructive" />,
			color: 'bg-destructive',
		},
	};

	const { icon, color } = statusConfig[stat.status];

	return (
		<div className="flex items-center gap-4 rounded-lg border p-4">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Warehouse className="size-5 text-muted-foreground" />
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<p className="font-medium">{stat.location}</p>
					{icon}
				</div>
				<p className="text-xs text-muted-foreground">{stat.code}</p>
			</div>
			<div className="w-48">
				<div className="flex items-center justify-between text-sm">
					<span className="text-muted-foreground">Capacity</span>
					<span className="font-medium">{stat.utilization}%</span>
				</div>
				<Progress
					value={stat.utilization}
					className="mt-1"
					indicatorClassName={color}
				/>
			</div>
			<div className="text-center">
				<p className="font-semibold">{stat.totalItems.toLocaleString()}</p>
				<p className="text-xs text-muted-foreground">items</p>
			</div>
			<div className="text-center">
				<p
					className={`font-semibold ${stat.lowStockItems > 0 ? 'text-amber-500' : 'text-emerald-500'}`}
				>
					{stat.lowStockItems}
				</p>
				<p className="text-xs text-muted-foreground">low stock</p>
			</div>
		</div>
	);
};

type SummaryProps = {
	totalLocations: number;
	totalItems: number;
	avgUtilization: number;
};

const Summary = ({
	totalLocations,
	totalItems,
	avgUtilization,
}: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<MapPin className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Locations</span>
			</div>
			<p className="mt-2 text-2xl font-bold">{totalLocations}</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Total Items</span>
			</div>
			<p className="mt-2 text-2xl font-bold">{totalItems.toLocaleString()}</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<TrendingUp className="size-5 text-primary" />
				<span className="text-sm text-muted-foreground">Avg Utilization</span>
			</div>
			<p className="mt-2 text-2xl font-bold">{avgUtilization}%</p>
		</div>
	</div>
);

export default function Main() {
	const locations: LocationStat[] = [
		{
			id: '1',
			location: 'Main Warehouse',
			code: 'WH-001',
			totalItems: 15840,
			capacity: 20000,
			utilization: 79,
			lowStockItems: 12,
			status: 'healthy',
		},
		{
			id: '2',
			location: 'East Distribution',
			code: 'WH-002',
			totalItems: 9200,
			capacity: 10000,
			utilization: 92,
			lowStockItems: 5,
			status: 'warning',
		},
		{
			id: '3',
			location: 'NYC Store',
			code: 'ST-NYC',
			totalItems: 2340,
			capacity: 3000,
			utilization: 78,
			lowStockItems: 23,
			status: 'warning',
		},
		{
			id: '4',
			location: 'LA Store',
			code: 'ST-LA',
			totalItems: 1890,
			capacity: 2500,
			utilization: 76,
			lowStockItems: 8,
			status: 'healthy',
		},
		{
			id: '5',
			location: 'Overflow Storage',
			code: 'WH-003',
			totalItems: 4500,
			capacity: 4500,
			utilization: 100,
			lowStockItems: 0,
			status: 'critical',
		},
	];

	const totalItems = locations.reduce((sum, l) => sum + l.totalItems, 0);
	const avgUtilization = Math.round(
		locations.reduce((sum, l) => sum + l.utilization, 0) / locations.length,
	);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Location Statistics
						</CardTitle>
						<CardDescription>
							Inventory distribution across all locations
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary
							totalLocations={locations.length}
							totalItems={totalItems}
							avgUtilization={avgUtilization}
						/>
						<div className="space-y-2">
							{locations.map((location) => (
								<LocationStatRow key={location.id} stat={location} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
