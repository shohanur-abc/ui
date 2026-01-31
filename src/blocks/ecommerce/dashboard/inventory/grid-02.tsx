'use client';

import * as React from 'react';
import {
	Package,
	MapPin,
	Box,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type LocationStock = {
	id: string;
	name: string;
	code: string;
	totalItems: number;
	capacity: number;
	categories: { name: string; count: number }[];
	status: 'optimal' | 'high' | 'low';
};

type LocationCardProps = {
	location: LocationStock;
	statusLabels: Record<'optimal' | 'high' | 'low', string>;
};

const LocationCard = ({ location, statusLabels }: LocationCardProps) => {
	const usagePercentage = (location.totalItems / location.capacity) * 100;
	const variants: Record<'optimal' | 'high' | 'low', 'default' | 'secondary' | 'destructive'> = {
		optimal: 'default',
		high: 'secondary',
		low: 'destructive',
	};

	const progressColor = usagePercentage > 90 ? '[&>div]:bg-destructive' : usagePercentage > 70 ? '[&>div]:bg-yellow-500' : '';

	return (
		<Card className="group transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
			<CardHeader className="pb-3">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-primary/10 p-2.5 transition-colors group-hover:bg-primary/20">
							<MapPin className="size-5 text-primary" />
						</div>
						<div>
							<CardTitle className="text-base">{location.name}</CardTitle>
							<p className="text-xs text-muted-foreground">{location.code}</p>
						</div>
					</div>
					<Badge variant={variants[location.status]}>{statusLabels[location.status]}</Badge>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<div className="flex items-center justify-between text-sm">
						<span className="text-muted-foreground">Capacity Usage</span>
						<span className="font-medium tabular-nums">
							{location.totalItems.toLocaleString()} / {location.capacity.toLocaleString()}
						</span>
					</div>
					<Progress value={usagePercentage} className={`h-2 ${progressColor}`} />
					<p className="text-right text-xs text-muted-foreground">
						{usagePercentage.toFixed(1)}% utilized
					</p>
				</div>
				<div className="space-y-2">
					<p className="text-xs font-medium text-muted-foreground">Categories</p>
					<div className="flex flex-wrap gap-1.5">
						{location.categories.map((cat) => (
							<Badge key={cat.name} variant="outline" className="gap-1 text-xs">
								<Box className="size-3" />
								{cat.name}
								<span className="ml-0.5 text-muted-foreground">{cat.count}</span>
							</Badge>
						))}
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

type SummaryProps = {
	title: string;
	locations: LocationStock[];
};

const Summary = ({ title, locations }: SummaryProps) => {
	const totalItems = locations.reduce((sum, loc) => sum + loc.totalItems, 0);
	const totalCapacity = locations.reduce((sum, loc) => sum + loc.capacity, 0);

	return (
		<Card className="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
			<CardContent className="flex items-center gap-4 p-6">
				<div className="rounded-xl bg-primary/20 p-4">
					<Package className="size-8 text-primary" />
				</div>
				<div>
					<p className="text-sm text-muted-foreground">{title}</p>
					<p className="text-3xl font-bold tabular-nums">{totalItems.toLocaleString()}</p>
					<p className="text-xs text-muted-foreground">
						across {locations.length} locations ({((totalItems / totalCapacity) * 100).toFixed(1)}% capacity)
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const locations: LocationStock[] = [
		{
			id: '1',
			name: 'Main Warehouse',
			code: 'WH-MAIN-001',
			totalItems: 12500,
			capacity: 15000,
			categories: [
				{ name: 'Electronics', count: 5200 },
				{ name: 'Accessories', count: 4300 },
				{ name: 'Peripherals', count: 3000 },
			],
			status: 'optimal',
		},
		{
			id: '2',
			name: 'East Distribution',
			code: 'WH-EAST-002',
			totalItems: 8900,
			capacity: 10000,
			categories: [
				{ name: 'Electronics', count: 4500 },
				{ name: 'Clothing', count: 2800 },
				{ name: 'Home', count: 1600 },
			],
			status: 'high',
		},
		{
			id: '3',
			name: 'West Fulfillment',
			code: 'WH-WEST-003',
			totalItems: 2100,
			capacity: 8000,
			categories: [
				{ name: 'Electronics', count: 1200 },
				{ name: 'Accessories', count: 900 },
			],
			status: 'low',
		},
		{
			id: '4',
			name: 'NYC Store',
			code: 'ST-NYC-001',
			totalItems: 450,
			capacity: 500,
			categories: [
				{ name: 'Electronics', count: 250 },
				{ name: 'Accessories', count: 200 },
			],
			status: 'high',
		},
		{
			id: '5',
			name: 'LA Store',
			code: 'ST-LA-002',
			totalItems: 380,
			capacity: 600,
			categories: [
				{ name: 'Electronics', count: 180 },
				{ name: 'Clothing', count: 200 },
			],
			status: 'optimal',
		},
		{
			id: '6',
			name: 'Chicago Store',
			code: 'ST-CHI-003',
			totalItems: 120,
			capacity: 400,
			categories: [
				{ name: 'Accessories', count: 120 },
			],
			status: 'low',
		},
	];

	const statusLabels = {
		optimal: 'Optimal',
		high: 'Near Capacity',
		low: 'Low Stock',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<Summary title="Total Inventory" locations={locations} />
					<div className="grid gap-4 @sm:grid-cols-2 @xl:grid-cols-3">
						{locations.map((location) => (
							<LocationCard
								key={location.id}
								location={location}
								statusLabels={statusLabels}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
