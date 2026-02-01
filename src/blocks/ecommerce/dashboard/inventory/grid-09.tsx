'use client';

import * as React from 'react';
import {
	Package,
	MapPin,
	Warehouse,
	Box,
	AlertTriangle,
	TrendingUp,
	TrendingDown,
} from 'lucide-react';

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Zone = {
	id: string;
	name: string;
	code: string;
	type: 'storage' | 'picking' | 'receiving' | 'shipping';
	capacity: number;
	used: number;
	itemCount: number;
	status: 'optimal' | 'near-full' | 'full';
	activity: 'high' | 'medium' | 'low';
};

type ZoneCardProps = {
	zone: Zone;
};

const ZoneCard = ({ zone }: ZoneCardProps) => {
	const utilization = (zone.used / zone.capacity) * 100;

	const statusConfig = {
		optimal: { color: 'bg-emerald-500', text: 'Optimal' },
		'near-full': { color: 'bg-amber-500', text: 'Near Full' },
		full: { color: 'bg-destructive', text: 'Full' },
	};

	const typeConfig = {
		storage: {
			icon: <Warehouse className="size-5" />,
			color: 'bg-blue-500/10 text-blue-500',
		},
		picking: {
			icon: <Package className="size-5" />,
			color: 'bg-green-500/10 text-green-500',
		},
		receiving: {
			icon: <Box className="size-5" />,
			color: 'bg-purple-500/10 text-purple-500',
		},
		shipping: {
			icon: <MapPin className="size-5" />,
			color: 'bg-orange-500/10 text-orange-500',
		},
	};

	const { color: statusColor, text: statusText } = statusConfig[zone.status];
	const { icon, color: typeColor } = typeConfig[zone.type];

	return (
		<Card>
			<CardContent className="p-6">
				<div className="flex items-start justify-between">
					<div
						className={`flex size-12 items-center justify-center rounded-xl ${typeColor}`}
					>
						{icon}
					</div>
					<Badge
						variant={
							zone.status === 'optimal'
								? 'outline'
								: zone.status === 'near-full'
									? 'secondary'
									: 'destructive'
						}
					>
						{statusText}
					</Badge>
				</div>

				<div className="mt-4">
					<div className="flex items-center gap-2">
						<h3 className="font-semibold">{zone.name}</h3>
						<span className="text-xs text-muted-foreground">({zone.code})</span>
					</div>
					<p className="mt-1 text-sm capitalize text-muted-foreground">
						{zone.type} zone
					</p>
				</div>

				<div className="mt-4 space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Capacity</span>
						<span className="font-medium">{utilization.toFixed(0)}%</span>
					</div>
					<Progress value={utilization} indicatorClassName={statusColor} />
					<p className="text-xs text-muted-foreground">
						{zone.used.toLocaleString()} / {zone.capacity.toLocaleString()}{' '}
						units
					</p>
				</div>

				<div className="mt-4 flex items-center justify-between border-t pt-4">
					<div>
						<p className="text-xs text-muted-foreground">Items</p>
						<p className="font-semibold">{zone.itemCount}</p>
					</div>
					<div className="text-right">
						<p className="text-xs text-muted-foreground">Activity</p>
						<div className="flex items-center gap-1">
							{zone.activity === 'high' ? (
								<TrendingUp className="size-3 text-emerald-500" />
							) : zone.activity === 'low' ? (
								<TrendingDown className="size-3 text-destructive" />
							) : null}
							<span className="font-medium capitalize">{zone.activity}</span>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default function Main() {
	const zones: Zone[] = [
		{
			id: '1',
			name: 'Zone A',
			code: 'A1-A20',
			type: 'storage',
			capacity: 10000,
			used: 7500,
			itemCount: 1250,
			status: 'optimal',
			activity: 'high',
		},
		{
			id: '2',
			name: 'Zone B',
			code: 'B1-B15',
			type: 'storage',
			capacity: 8000,
			used: 7200,
			itemCount: 980,
			status: 'near-full',
			activity: 'medium',
		},
		{
			id: '3',
			name: 'Picking Area 1',
			code: 'P1',
			type: 'picking',
			capacity: 2000,
			used: 1200,
			itemCount: 450,
			status: 'optimal',
			activity: 'high',
		},
		{
			id: '4',
			name: 'Receiving Dock',
			code: 'RD-1',
			type: 'receiving',
			capacity: 3000,
			used: 3000,
			itemCount: 180,
			status: 'full',
			activity: 'high',
		},
		{
			id: '5',
			name: 'Shipping Bay',
			code: 'SB-1',
			type: 'shipping',
			capacity: 2500,
			used: 800,
			itemCount: 95,
			status: 'optimal',
			activity: 'medium',
		},
		{
			id: '6',
			name: 'Zone C',
			code: 'C1-C10',
			type: 'storage',
			capacity: 5000,
			used: 2100,
			itemCount: 620,
			status: 'optimal',
			activity: 'low',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">
								Warehouse Zones
							</h2>
							<p className="text-sm text-muted-foreground">
								Capacity and activity by zone
							</p>
						</div>
						<Button variant="outline">
							<MapPin className="mr-2 size-4" />
							View Map
						</Button>
					</div>

					<div className="grid gap-4 @sm:grid-cols-2 @lg:grid-cols-3">
						{zones.map((zone) => (
							<ZoneCard key={zone.id} zone={zone} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
