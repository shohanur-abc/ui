'use client';

import * as React from 'react';
import {
	Package,
	ArrowUpDown,
	ArrowUp,
	ArrowDown,
	Building2,
	Truck,
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

type MovementType = 'inbound' | 'outbound' | 'transfer';

type Movement = {
	id: string;
	product: string;
	sku: string;
	quantity: number;
	type: MovementType;
	from: string;
	to: string;
	date: string;
	reference: string;
};

type MovementRowProps = {
	movement: Movement;
};

const MovementRow = ({ movement }: MovementRowProps) => {
	const typeConfig = {
		inbound: {
			icon: <ArrowDown className="size-4 text-emerald-500" />,
			label: 'Inbound',
			color: 'text-emerald-500',
		},
		outbound: {
			icon: <ArrowUp className="size-4 text-red-500" />,
			label: 'Outbound',
			color: 'text-red-500',
		},
		transfer: {
			icon: <ArrowUpDown className="size-4 text-blue-500" />,
			label: 'Transfer',
			color: 'text-blue-500',
		},
	};

	const { icon, label, color } = typeConfig[movement.type];

	return (
		<div className="flex items-center gap-4 border-b py-4 last:border-0">
			<div className="flex size-10 items-center justify-center rounded-lg bg-muted">
				{icon}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-center gap-2">
					<p className="truncate font-medium">{movement.product}</p>
					<Badge variant="secondary">{label}</Badge>
				</div>
				<p className="text-xs text-muted-foreground">
					{movement.sku} • {movement.reference}
				</p>
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">From</p>
				<div className="flex items-center gap-1">
					<Building2 className="size-3 text-muted-foreground" />
					<span className="font-medium">{movement.from}</span>
				</div>
			</div>
			<div className="hidden text-center @sm:block">
				<Truck className="mx-auto size-4 text-muted-foreground" />
			</div>
			<div className="hidden text-center @sm:block">
				<p className="text-xs text-muted-foreground">To</p>
				<div className="flex items-center gap-1">
					<Building2 className="size-3 text-muted-foreground" />
					<span className="font-medium">{movement.to}</span>
				</div>
			</div>
			<div className="text-center">
				<p className="text-xs text-muted-foreground">Qty</p>
				<p className={`font-semibold ${color}`}>
					{movement.type === 'outbound' ? '-' : '+'}
					{movement.quantity}
				</p>
			</div>
			<div className="text-right">
				<p className="text-xs text-muted-foreground">Date</p>
				<p className="font-medium">
					{new Date(movement.date).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
};

type SummaryProps = {
	inbound: number;
	outbound: number;
	transfers: number;
};

const Summary = ({ inbound, outbound, transfers }: SummaryProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<ArrowDown className="size-6 text-emerald-500" />
			<div>
				<p className="text-2xl font-bold text-emerald-500">
					+{inbound.toLocaleString()}
				</p>
				<p className="text-sm text-muted-foreground">Items received</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<ArrowUp className="size-6 text-red-500" />
			<div>
				<p className="text-2xl font-bold text-red-500">
					-{outbound.toLocaleString()}
				</p>
				<p className="text-sm text-muted-foreground">Items shipped</p>
			</div>
		</div>
		<div className="flex items-center gap-3 rounded-lg border p-4">
			<ArrowUpDown className="size-6 text-blue-500" />
			<div>
				<p className="text-2xl font-bold text-blue-500">
					{transfers.toLocaleString()}
				</p>
				<p className="text-sm text-muted-foreground">Internal transfers</p>
			</div>
		</div>
	</div>
);

export default function Main() {
	const movements: Movement[] = [
		{
			id: '1',
			product: 'Wireless Earbuds Pro',
			sku: 'WEP-001',
			quantity: 500,
			type: 'inbound',
			from: 'Supplier A',
			to: 'WH-001',
			date: '2024-01-18',
			reference: 'PO-2024-001',
		},
		{
			id: '2',
			product: 'USB-C Fast Charger',
			sku: 'UFC-001',
			quantity: 120,
			type: 'outbound',
			from: 'WH-001',
			to: 'Customer',
			date: '2024-01-18',
			reference: 'ORD-5678',
		},
		{
			id: '3',
			product: 'Phone Case Premium',
			sku: 'PCP-001',
			quantity: 200,
			type: 'transfer',
			from: 'WH-001',
			to: 'WH-002',
			date: '2024-01-17',
			reference: 'TRF-001',
		},
		{
			id: '4',
			product: 'Bluetooth Speaker',
			sku: 'BTS-001',
			quantity: 75,
			type: 'outbound',
			from: 'WH-002',
			to: 'Customer',
			date: '2024-01-17',
			reference: 'ORD-5679',
		},
		{
			id: '5',
			product: 'Screen Protector HD',
			sku: 'SPH-001',
			quantity: 1000,
			type: 'inbound',
			from: 'Supplier B',
			to: 'WH-001',
			date: '2024-01-16',
			reference: 'PO-2024-002',
		},
	];

	const inboundTotal = movements
		.filter((m) => m.type === 'inbound')
		.reduce((sum, m) => sum + m.quantity, 0);
	const outboundTotal = movements
		.filter((m) => m.type === 'outbound')
		.reduce((sum, m) => sum + m.quantity, 0);
	const transferTotal = movements
		.filter((m) => m.type === 'transfer')
		.reduce((sum, m) => sum + m.quantity, 0);

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Stock Movements
						</CardTitle>
						<CardDescription>
							Recent inventory movements this week
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<Summary
							inbound={inboundTotal}
							outbound={outboundTotal}
							transfers={transferTotal}
						/>
						<div>
							{movements.map((movement) => (
								<MovementRow key={movement.id} movement={movement} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
