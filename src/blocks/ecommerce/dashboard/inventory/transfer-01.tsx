'use client';

import * as React from 'react';
import {
	Package,
	ArrowRight,
	Truck,
	Building2,
	MapPin,
	Clock,
	CheckCircle2,
} from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type TransferStatus = 'pending' | 'in-transit' | 'delivered';

type Transfer = {
	id: string;
	transferNumber: string;
	from: { name: string; code: string };
	to: { name: string; code: string };
	items: number;
	status: TransferStatus;
	date: string;
	eta?: string;
};

type StatusBadgeProps = {
	status: TransferStatus;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
	const config: Record<TransferStatus, { label: string; variant: 'secondary' | 'default' | 'outline' }> = {
		pending: { label: 'Pending', variant: 'secondary' },
		'in-transit': { label: 'In Transit', variant: 'default' },
		delivered: { label: 'Delivered', variant: 'outline' },
	};

	const { label, variant } = config[status];
	return <Badge variant={variant}>{label}</Badge>;
};

type TransferCardProps = {
	transfer: Transfer;
};

const TransferCard = ({ transfer }: TransferCardProps) => (
	<Card className="overflow-hidden">
		<CardContent className="p-4">
			<div className="flex items-start justify-between">
				<div className="flex items-center gap-2">
					<Truck className="size-4 text-primary" />
					<span className="font-mono text-sm">{transfer.transferNumber}</span>
				</div>
				<StatusBadge status={transfer.status} />
			</div>

			<div className="mt-4 flex items-center gap-3">
				<div className="flex-1 rounded-lg border p-3 text-center">
					<Building2 className="mx-auto size-5 text-muted-foreground" />
					<p className="mt-1 text-sm font-medium">{transfer.from.name}</p>
					<p className="text-xs text-muted-foreground">{transfer.from.code}</p>
				</div>
				<ArrowRight className="shrink-0 text-muted-foreground" />
				<div className="flex-1 rounded-lg border p-3 text-center">
					<MapPin className="mx-auto size-5 text-muted-foreground" />
					<p className="mt-1 text-sm font-medium">{transfer.to.name}</p>
					<p className="text-xs text-muted-foreground">{transfer.to.code}</p>
				</div>
			</div>

			<div className="mt-4 flex items-center justify-between text-sm">
				<div className="flex items-center gap-1 text-muted-foreground">
					<Package className="size-4" />
					<span>{transfer.items} items</span>
				</div>
				<div className="flex items-center gap-1 text-muted-foreground">
					<Clock className="size-4" />
					<span>{transfer.eta || transfer.date}</span>
				</div>
			</div>
		</CardContent>
	</Card>
);

type TransferStatusStepProps = {
	step: number;
	label: string;
	isActive: boolean;
	isCompleted: boolean;
};

const TransferStatusStep = ({ step, label, isActive, isCompleted }: TransferStatusStepProps) => (
	<div className="flex flex-col items-center">
		<div
			className={`flex size-8 items-center justify-center rounded-full ${
				isCompleted ? 'bg-primary text-primary-foreground' : isActive ? 'border-2 border-primary bg-primary/10' : 'border-2 border-muted bg-background'
			}`}
		>
			{isCompleted ? <CheckCircle2 className="size-5" /> : step}
		</div>
		<span className={`mt-2 text-xs ${isActive ? 'font-medium' : 'text-muted-foreground'}`}>{label}</span>
	</div>
);

type TransferProgressProps = {
	status: TransferStatus;
};

const TransferProgress = ({ status }: TransferProgressProps) => {
	const steps = [
		{ label: 'Created', status: 'pending' },
		{ label: 'In Transit', status: 'in-transit' },
		{ label: 'Delivered', status: 'delivered' },
	];

	const currentIndex = steps.findIndex((s) => s.status === status);

	return (
		<div className="flex items-center justify-between">
			{steps.map((step, index) => (
				<React.Fragment key={step.status}>
					<TransferStatusStep
						step={index + 1}
						label={step.label}
						isActive={index === currentIndex}
						isCompleted={index < currentIndex || status === 'delivered'}
					/>
					{index < steps.length - 1 && (
						<div className={`h-0.5 flex-1 ${index < currentIndex ? 'bg-primary' : 'bg-muted'}`} />
					)}
				</React.Fragment>
			))}
		</div>
	);
};

export default function Main() {
	const transfers: Transfer[] = [
		{
			id: '1',
			transferNumber: 'TRF-2024-001',
			from: { name: 'Main Warehouse', code: 'WH-001' },
			to: { name: 'NYC Store', code: 'ST-NYC' },
			items: 45,
			status: 'in-transit',
			date: '2024-01-18',
			eta: 'ETA: Jan 20',
		},
		{
			id: '2',
			transferNumber: 'TRF-2024-002',
			from: { name: 'East Distribution', code: 'WH-002' },
			to: { name: 'LA Store', code: 'ST-LA' },
			items: 120,
			status: 'pending',
			date: '2024-01-19',
		},
		{
			id: '3',
			transferNumber: 'TRF-2024-003',
			from: { name: 'West Fulfillment', code: 'FC-001' },
			to: { name: 'Main Warehouse', code: 'WH-001' },
			items: 250,
			status: 'delivered',
			date: '2024-01-15',
		},
	];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h2 className="text-xl font-semibold @lg:text-2xl">Stock Transfers</h2>
							<p className="text-sm text-muted-foreground">Track inventory movements between locations</p>
						</div>
						<Button>
							New Transfer
							<ArrowRight className="ml-2 size-4" />
						</Button>
					</div>

					{/* Transfer Progress */}
					<Card>
						<CardHeader>
							<CardTitle className="text-lg">Transfer Progress: TRF-2024-001</CardTitle>
						</CardHeader>
						<CardContent>
							<TransferProgress status="in-transit" />
						</CardContent>
					</Card>

					{/* Transfer Cards */}
					<div className="grid gap-4 @lg:grid-cols-3">
						{transfers.map((transfer) => (
							<TransferCard key={transfer.id} transfer={transfer} />
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
