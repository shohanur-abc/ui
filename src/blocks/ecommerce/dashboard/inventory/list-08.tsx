'use client';

import * as React from 'react';
import {
	Package,
	MapPin,
	Boxes,
	ArrowRight,
	RefreshCw,
	AlertTriangle,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type Bin = {
	id: string;
	binCode: string;
	zone: string;
	product: string;
	sku: string;
	quantity: number;
	maxCapacity: number;
	status: 'optimal' | 'overstocked' | 'understocked' | 'empty';
};

type BinRowProps = {
	bin: Bin;
};

const BinRow = ({ bin }: BinRowProps) => {
	const utilization = (bin.quantity / bin.maxCapacity) * 100;

	const statusConfig = {
		optimal: { label: 'Optimal', color: 'bg-emerald-500', variant: 'outline' as const },
		overstocked: { label: 'Overstocked', color: 'bg-amber-500', variant: 'secondary' as const },
		understocked: { label: 'Low', color: 'bg-orange-500', variant: 'secondary' as const },
		empty: { label: 'Empty', color: 'bg-muted', variant: 'outline' as const },
	};

	const { label, color, variant } = statusConfig[bin.status];

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				<Boxes className="size-5 text-muted-foreground" />
			</div>
			<div className="w-24">
				<p className="font-mono font-semibold">{bin.binCode}</p>
				<div className="flex items-center gap-1 text-xs text-muted-foreground">
					<MapPin className="size-3" />
					{bin.zone}
				</div>
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{bin.product}</p>
				<p className="text-xs text-muted-foreground">{bin.sku}</p>
			</div>
			<div className="w-40">
				<div className="flex justify-between text-xs">
					<span className="text-muted-foreground">Capacity</span>
					<span className="font-medium">{bin.quantity}/{bin.maxCapacity}</span>
				</div>
				<Progress value={utilization} className="mt-1" indicatorClassName={color} />
			</div>
			<Badge variant={variant}>{label}</Badge>
			<Button variant="ghost" size="sm">
				<RefreshCw className="mr-1 size-3" />
				Move
			</Button>
		</div>
	);
};

type SummaryProps = {
	totalBins: number;
	optimalCount: number;
	issueCount: number;
};

const Summary = ({ totalBins, optimalCount, issueCount }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border p-4 text-center">
			<Boxes className="mx-auto size-6 text-primary" />
			<p className="mt-2 text-2xl font-bold">{totalBins}</p>
			<p className="text-sm text-muted-foreground">Total Bin Locations</p>
		</div>
		<div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4 text-center">
			<Package className="mx-auto size-6 text-emerald-500" />
			<p className="mt-2 text-2xl font-bold text-emerald-500">{optimalCount}</p>
			<p className="text-sm text-muted-foreground">Optimal Status</p>
		</div>
		<div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 text-center">
			<AlertTriangle className="mx-auto size-6 text-amber-500" />
			<p className="mt-2 text-2xl font-bold text-amber-500">{issueCount}</p>
			<p className="text-sm text-muted-foreground">Need Attention</p>
		</div>
	</div>
);

export default function Main() {
	const bins: Bin[] = [
		{ id: '1', binCode: 'A-01-01', zone: 'Zone A', product: 'Wireless Earbuds Pro', sku: 'WEP-001', quantity: 85, maxCapacity: 100, status: 'optimal' },
		{ id: '2', binCode: 'A-01-02', zone: 'Zone A', product: 'USB-C Fast Charger', sku: 'UFC-001', quantity: 145, maxCapacity: 120, status: 'overstocked' },
		{ id: '3', binCode: 'A-02-01', zone: 'Zone A', product: 'Phone Case Premium', sku: 'PCP-001', quantity: 25, maxCapacity: 150, status: 'understocked' },
		{ id: '4', binCode: 'B-01-01', zone: 'Zone B', product: 'Bluetooth Speaker', sku: 'BTS-001', quantity: 0, maxCapacity: 50, status: 'empty' },
		{ id: '5', binCode: 'B-01-02', zone: 'Zone B', product: 'Screen Protector HD', sku: 'SPH-001', quantity: 180, maxCapacity: 200, status: 'optimal' },
		{ id: '6', binCode: 'B-02-01', zone: 'Zone B', product: 'Power Bank 20000mAh', sku: 'PB-001', quantity: 42, maxCapacity: 60, status: 'optimal' },
	];

	const optimalCount = bins.filter((b) => b.status === 'optimal').length;
	const issueCount = bins.filter((b) => b.status !== 'optimal').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<div className="flex items-center justify-between">
							<div>
								<CardTitle className="text-xl @lg:text-2xl">Bin Locations</CardTitle>
								<CardDescription>Storage bin status and capacity</CardDescription>
							</div>
							<Button variant="outline">
								<MapPin className="mr-2 size-4" />
								View Map
							</Button>
						</div>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary totalBins={bins.length} optimalCount={optimalCount} issueCount={issueCount} />
						<div>
							{bins.map((bin) => (
								<BinRow key={bin.id} bin={bin} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
