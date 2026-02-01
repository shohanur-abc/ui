'use client';

import * as React from 'react';
import {
	Package,
	Calendar,
	AlertTriangle,
	Clock,
	Trash2,
	ShoppingCart,
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

type ExpiryStatus = 'expired' | 'expiring-soon' | 'good';

type BatchItem = {
	id: string;
	productName: string;
	sku: string;
	batchNumber: string;
	quantity: number;
	expiryDate: string;
	daysRemaining: number;
	status: ExpiryStatus;
};

type ExpiryBadgeProps = {
	status: ExpiryStatus;
	daysRemaining: number;
};

const ExpiryBadge = ({ status, daysRemaining }: ExpiryBadgeProps) => {
	const config: Record<
		ExpiryStatus,
		{ label: string; variant: 'destructive' | 'secondary' | 'outline' }
	> = {
		expired: { label: 'Expired', variant: 'destructive' },
		'expiring-soon': {
			label: `${daysRemaining} days left`,
			variant: 'secondary',
		},
		good: { label: `${daysRemaining} days left`, variant: 'outline' },
	};

	const { label, variant } = config[status];
	return <Badge variant={variant}>{label}</Badge>;
};

type BatchRowProps = {
	item: BatchItem;
};

const BatchRow = ({ item }: BatchRowProps) => {
	const getProgressColor = (status: ExpiryStatus) => {
		switch (status) {
			case 'expired':
				return 'bg-destructive';
			case 'expiring-soon':
				return 'bg-amber-500';
			default:
				return 'bg-emerald-500';
		}
	};

	const maxDays = 90;
	const progressValue = Math.max(
		0,
		Math.min((item.daysRemaining / maxDays) * 100, 100),
	);

	return (
		<div className="flex items-center gap-4 rounded-lg border p-4 transition-colors hover:bg-muted/50">
			<div
				className={`flex size-10 items-center justify-center rounded-lg ${
					item.status === 'expired'
						? 'bg-destructive/10'
						: item.status === 'expiring-soon'
							? 'bg-amber-500/10'
							: 'bg-muted'
				}`}
			>
				{item.status === 'expired' || item.status === 'expiring-soon' ? (
					<AlertTriangle
						className={`size-5 ${item.status === 'expired' ? 'text-destructive' : 'text-amber-500'}`}
					/>
				) : (
					<Package className="size-5 text-muted-foreground" />
				)}
			</div>
			<div className="min-w-0 flex-1">
				<p className="truncate font-medium">{item.productName}</p>
				<div className="flex items-center gap-2 text-xs text-muted-foreground">
					<span>{item.sku}</span>
					<span>•</span>
					<span>Batch: {item.batchNumber}</span>
				</div>
			</div>
			<div className="w-32">
				<div className="relative h-2 overflow-hidden rounded-full bg-muted">
					<div
						className={`absolute inset-y-0 left-0 ${getProgressColor(item.status)}`}
						style={{ width: `${progressValue}%` }}
					/>
				</div>
			</div>
			<div className="text-right">
				<p className="font-semibold tabular-nums">{item.quantity}</p>
				<p className="text-xs text-muted-foreground">units</p>
			</div>
			<div className="text-right">
				<div className="flex items-center gap-1 text-sm">
					<Calendar className="size-3 text-muted-foreground" />
					{new Date(item.expiryDate).toLocaleDateString()}
				</div>
				<ExpiryBadge status={item.status} daysRemaining={item.daysRemaining} />
			</div>
			<div className="flex gap-1">
				<Button variant="ghost" size="icon-sm" title="Create sale">
					<ShoppingCart className="size-4" />
				</Button>
				<Button variant="ghost" size="icon-sm" title="Discard">
					<Trash2 className="size-4 text-destructive" />
				</Button>
			</div>
		</div>
	);
};

type SummaryCardsProps = {
	expired: number;
	expiringSoon: number;
	good: number;
};

const SummaryCards = ({ expired, expiringSoon, good }: SummaryCardsProps) => (
	<div className="grid gap-4 @sm:grid-cols-3">
		<div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4">
			<div className="flex items-center gap-2">
				<AlertTriangle className="size-5 text-destructive" />
				<span className="text-sm font-medium">Expired</span>
			</div>
			<p className="mt-2 text-2xl font-bold text-destructive">{expired}</p>
			<p className="text-sm text-muted-foreground">items need disposal</p>
		</div>
		<div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
			<div className="flex items-center gap-2">
				<Clock className="size-5 text-amber-500" />
				<span className="text-sm font-medium">Expiring Soon</span>
			</div>
			<p className="mt-2 text-2xl font-bold text-amber-500">{expiringSoon}</p>
			<p className="text-sm text-muted-foreground">items in next 30 days</p>
		</div>
		<div className="rounded-lg border p-4">
			<div className="flex items-center gap-2">
				<Package className="size-5 text-emerald-500" />
				<span className="text-sm font-medium">Good Standing</span>
			</div>
			<p className="mt-2 text-2xl font-bold text-emerald-500">{good}</p>
			<p className="text-sm text-muted-foreground">items with 30+ days</p>
		</div>
	</div>
);

export default function Main() {
	const items: BatchItem[] = [
		{
			id: '1',
			productName: 'Organic Protein Bars',
			sku: 'OPB-001',
			batchNumber: 'B2024-001',
			quantity: 500,
			expiryDate: '2024-01-10',
			daysRemaining: -8,
			status: 'expired',
		},
		{
			id: '2',
			productName: 'Vitamin C Supplements',
			sku: 'VCS-002',
			batchNumber: 'B2024-015',
			quantity: 250,
			expiryDate: '2024-02-05',
			daysRemaining: 18,
			status: 'expiring-soon',
		},
		{
			id: '3',
			productName: 'Energy Drinks Pack',
			sku: 'EDP-003',
			batchNumber: 'B2024-022',
			quantity: 1200,
			expiryDate: '2024-02-15',
			daysRemaining: 28,
			status: 'expiring-soon',
		},
		{
			id: '4',
			productName: 'Protein Powder',
			sku: 'PP-004',
			batchNumber: 'B2024-030',
			quantity: 180,
			expiryDate: '2024-04-20',
			daysRemaining: 93,
			status: 'good',
		},
		{
			id: '5',
			productName: 'Herbal Tea Collection',
			sku: 'HTC-005',
			batchNumber: 'B2024-045',
			quantity: 340,
			expiryDate: '2024-06-01',
			daysRemaining: 135,
			status: 'good',
		},
	];

	const expiredCount = items.filter((i) => i.status === 'expired').length;
	const expiringSoonCount = items.filter(
		(i) => i.status === 'expiring-soon',
	).length;
	const goodCount = items.filter((i) => i.status === 'good').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="text-xl @lg:text-2xl">
							Expiry Management
						</CardTitle>
						<CardDescription>
							Track product batches and expiration dates
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<SummaryCards
							expired={expiredCount}
							expiringSoon={expiringSoonCount}
							good={goodCount}
						/>
						<div className="space-y-2">
							{items.map((item) => (
								<BatchRow key={item.id} item={item} />
							))}
						</div>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
