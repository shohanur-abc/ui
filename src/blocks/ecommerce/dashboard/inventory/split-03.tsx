'use client';

import * as React from 'react';
import {
	Package,
	MapPin,
	ArrowRight,
	ChevronRight,
	Plus,
	Minus,
	CheckCircle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';

type Location = {
	id: string;
	name: string;
	code: string;
	capacity: number;
	used: number;
	zones: Zone[];
};

type Zone = {
	id: string;
	name: string;
	products: number;
	status: 'available' | 'full' | 'maintenance';
};

type LocationCardProps = {
	location: Location;
	isSelected: boolean;
	onSelect: (id: string) => void;
};

const LocationCard = ({
	location,
	isSelected,
	onSelect,
}: LocationCardProps) => {
	const usagePercent = (location.used / location.capacity) * 100;

	return (
		<button
			onClick={() => onSelect(location.id)}
			className={`w-full rounded-lg border p-4 text-left transition-colors hover:bg-muted/50 ${
				isSelected ? 'ring-2 ring-primary' : ''
			}`}
		>
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-3">
					<div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
						<MapPin className="size-5" />
					</div>
					<div>
						<p className="font-medium">{location.name}</p>
						<p className="text-sm text-muted-foreground">{location.code}</p>
					</div>
				</div>
				<ChevronRight className="size-5 text-muted-foreground" />
			</div>
			<div className="mt-4 space-y-2">
				<div className="flex justify-between text-sm">
					<span className="text-muted-foreground">Capacity</span>
					<span>{usagePercent.toFixed(0)}% used</span>
				</div>
				<Progress value={usagePercent} />
			</div>
			<div className="mt-3 flex gap-2">
				<Badge variant="secondary">{location.zones.length} zones</Badge>
				<Badge variant="outline">{location.used.toLocaleString()} SKUs</Badge>
			</div>
		</button>
	);
};

type ZoneListProps = {
	location: Location | null;
};

const ZoneList = ({ location }: ZoneListProps) => {
	if (!location) {
		return (
			<div className="flex h-full items-center justify-center text-muted-foreground">
				<p>Select a location to view zones</p>
			</div>
		);
	}

	const statusColors = {
		available: 'bg-emerald-500',
		full: 'bg-amber-500',
		maintenance: 'bg-destructive',
	};

	return (
		<div className="p-6 space-y-4">
			<div className="flex items-center justify-between">
				<div>
					<h3 className="text-lg font-semibold">{location.name}</h3>
					<p className="text-sm text-muted-foreground">
						{location.zones.length} storage zones
					</p>
				</div>
				<Button size="sm">
					<Plus className="mr-2 size-4" />
					Add Zone
				</Button>
			</div>
			<div className="space-y-3">
				{location.zones.map((zone) => (
					<div
						key={zone.id}
						className="flex items-center justify-between rounded-lg border p-4"
					>
						<div className="flex items-center gap-3">
							<span
								className={`size-3 rounded-full ${statusColors[zone.status]}`}
							/>
							<div>
								<p className="font-medium">{zone.name}</p>
								<p className="text-sm text-muted-foreground">
									{zone.products} products
								</p>
							</div>
						</div>
						<Badge variant="outline" className="capitalize">
							{zone.status}
						</Badge>
					</div>
				))}
			</div>
		</div>
	);
};

export default function Main() {
	const [selectedId, setSelectedId] = React.useState<string>('1');

	const locations: Location[] = [
		{
			id: '1',
			name: 'Main Warehouse',
			code: 'WH-001',
			capacity: 10000,
			used: 7500,
			zones: [
				{
					id: 'z1',
					name: 'Zone A - Electronics',
					products: 2500,
					status: 'available',
				},
				{
					id: 'z2',
					name: 'Zone B - Accessories',
					products: 1800,
					status: 'full',
				},
				{
					id: 'z3',
					name: 'Zone C - Apparel',
					products: 2200,
					status: 'available',
				},
				{
					id: 'z4',
					name: 'Zone D - Storage',
					products: 1000,
					status: 'maintenance',
				},
			],
		},
		{
			id: '2',
			name: 'East Distribution',
			code: 'WH-002',
			capacity: 5000,
			used: 3200,
			zones: [
				{
					id: 'z5',
					name: 'Zone A - General',
					products: 1800,
					status: 'available',
				},
				{
					id: 'z6',
					name: 'Zone B - Returns',
					products: 1400,
					status: 'available',
				},
			],
		},
		{
			id: '3',
			name: 'West Fulfillment',
			code: 'FC-001',
			capacity: 8000,
			used: 6800,
			zones: [
				{
					id: 'z7',
					name: 'Zone A - Fast Moving',
					products: 3500,
					status: 'full',
				},
				{
					id: 'z8',
					name: 'Zone B - Bulk',
					products: 2300,
					status: 'available',
				},
				{
					id: 'z9',
					name: 'Zone C - Specialty',
					products: 1000,
					status: 'available',
				},
			],
		},
	];

	const selectedLocation = locations.find((l) => l.id === selectedId) || null;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card className="overflow-hidden">
					<div className="grid @lg:grid-cols-[400px_1fr]">
						<div className="border-r">
							<div className="border-b p-4">
								<h3 className="font-semibold">Locations</h3>
								<p className="text-sm text-muted-foreground">
									Manage warehouse locations and zones
								</p>
							</div>
							<ScrollArea className="h-96 p-4">
								<div className="space-y-3">
									{locations.map((location) => (
										<LocationCard
											key={location.id}
											location={location}
											isSelected={location.id === selectedId}
											onSelect={setSelectedId}
										/>
									))}
								</div>
							</ScrollArea>
						</div>
						<ZoneList location={selectedLocation} />
					</div>
				</Card>
			</div>
		</section>
	);
}
