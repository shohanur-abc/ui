'use client';

import * as React from 'react';
import {
	Package,
	Calendar,
	AlertTriangle,
	Clock,
	MoreHorizontal,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

type ExpiryStatus = 'expired' | 'expiring-soon' | 'valid';

type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	batchNumber: string;
	image: string;
	quantity: number;
	expiryDate: string;
	daysUntilExpiry: number;
	status: ExpiryStatus;
};

type HeaderProps = {
	title: string;
	description: string;
};

const Header = ({ title, description }: HeaderProps) => (
	<CardHeader>
		<CardTitle className="text-xl @lg:text-2xl">{title}</CardTitle>
		<CardDescription>{description}</CardDescription>
	</CardHeader>
);

type ExpiryBadgeProps = {
	status: ExpiryStatus;
	daysUntilExpiry: number;
	labels: Record<ExpiryStatus, string>;
};

const ExpiryBadge = ({ status, daysUntilExpiry, labels }: ExpiryBadgeProps) => {
	const variants: Record<ExpiryStatus, 'destructive' | 'secondary' | 'default'> = {
		expired: 'destructive',
		'expiring-soon': 'secondary',
		valid: 'default',
	};

	return (
		<div className="flex items-center gap-2">
			<Badge variant={variants[status]}>{labels[status]}</Badge>
			{status !== 'expired' && (
				<span className="text-xs text-muted-foreground">
					{daysUntilExpiry}d
				</span>
			)}
		</div>
	);
};

type ExpiryProgressProps = {
	daysUntilExpiry: number;
	maxDays: number;
};

const ExpiryProgress = ({ daysUntilExpiry, maxDays }: ExpiryProgressProps) => {
	const percentage = Math.max(0, Math.min(100, (daysUntilExpiry / maxDays) * 100));
	let colorClass = '';
	
	if (daysUntilExpiry <= 0) {
		colorClass = '[&>div]:bg-destructive';
	} else if (daysUntilExpiry <= 30) {
		colorClass = '[&>div]:bg-yellow-500';
	}

	return (
		<div className="flex items-center gap-2">
			<Progress value={percentage} className={`h-2 w-24 ${colorClass}`} />
			<span className="text-xs tabular-nums text-muted-foreground">
				{daysUntilExpiry <= 0 ? 'Expired' : `${daysUntilExpiry}d left`}
			</span>
		</div>
	);
};

type InventoryRowProps = {
	item: InventoryItem;
	statusLabels: Record<ExpiryStatus, string>;
	actions: { label: string; onClick: (id: string) => void }[];
};

const InventoryRow = ({ item, statusLabels, actions }: InventoryRowProps) => (
	<TableRow className={item.status === 'expired' ? 'opacity-60' : ''}>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-10 overflow-hidden rounded-lg border bg-muted">
					{item.image ? (
						<img src={item.image} alt={item.name} className="size-full object-cover" />
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
					{item.status === 'expired' && (
						<div className="absolute inset-0 flex items-center justify-center bg-destructive/20">
							<AlertTriangle className="size-4 text-destructive" />
						</div>
					)}
				</div>
				<div>
					<div className="font-medium">{item.name}</div>
					<div className="text-xs text-muted-foreground">{item.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<Badge variant="outline" className="font-mono text-xs">
				{item.batchNumber}
			</Badge>
		</TableCell>
		<TableCell className="font-medium tabular-nums">{item.quantity}</TableCell>
		<TableCell>
			<div className="flex items-center gap-1.5 text-sm">
				<Calendar className="size-3.5 text-muted-foreground" />
				{new Date(item.expiryDate).toLocaleDateString()}
			</div>
		</TableCell>
		<TableCell>
			<ExpiryProgress daysUntilExpiry={item.daysUntilExpiry} maxDays={90} />
		</TableCell>
		<TableCell>
			<ExpiryBadge
				status={item.status}
				daysUntilExpiry={item.daysUntilExpiry}
				labels={statusLabels}
			/>
		</TableCell>
		<TableCell>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="ghost" size="icon-sm">
						<MoreHorizontal className="size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					{actions.map((action) => (
						<DropdownMenuItem
							key={action.label}
							onClick={() => action.onClick(item.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

type SummaryCardProps = {
	icon: React.ElementType;
	label: string;
	value: number;
	variant: 'destructive' | 'warning' | 'default';
};

const SummaryCard = ({ icon: Icon, label, value, variant }: SummaryCardProps) => {
	const colors = {
		destructive: 'text-destructive bg-destructive/10',
		warning: 'text-yellow-600 bg-yellow-500/10',
		default: 'text-muted-foreground bg-muted',
	};

	return (
		<div className="flex items-center gap-3 rounded-lg border p-3">
			<div className={`rounded-lg p-2 ${colors[variant]}`}>
				<Icon className="size-4" />
			</div>
			<div>
				<div className="text-2xl font-bold tabular-nums">{value}</div>
				<div className="text-xs text-muted-foreground">{label}</div>
			</div>
		</div>
	);
};

export default function Main() {
	const inventory: InventoryItem[] = [
		{ id: '1', name: 'Vitamin C Serum', sku: 'VCS-001', batchNumber: 'B2024-001', image: '', quantity: 150, expiryDate: '2024-01-10', daysUntilExpiry: -5, status: 'expired' },
		{ id: '2', name: 'Face Moisturizer', sku: 'FM-002', batchNumber: 'B2024-002', image: '', quantity: 80, expiryDate: '2024-02-15', daysUntilExpiry: 12, status: 'expiring-soon' },
		{ id: '3', name: 'Eye Cream', sku: 'EC-003', batchNumber: 'B2024-003', image: '', quantity: 200, expiryDate: '2024-02-28', daysUntilExpiry: 25, status: 'expiring-soon' },
		{ id: '4', name: 'Sunscreen SPF50', sku: 'SS-004', batchNumber: 'B2024-004', image: '', quantity: 300, expiryDate: '2024-06-30', daysUntilExpiry: 147, status: 'valid' },
		{ id: '5', name: 'Night Cream', sku: 'NC-005', batchNumber: 'B2024-005', image: '', quantity: 45, expiryDate: '2024-01-20', daysUntilExpiry: 5, status: 'expiring-soon' },
	];

	const statusLabels: Record<ExpiryStatus, string> = {
		expired: 'Expired',
		'expiring-soon': 'Expiring Soon',
		valid: 'Valid',
	};

	const actions = [
		{ label: 'View Batch', onClick: (id: string) => console.log('View', id) },
		{ label: 'Mark for Disposal', onClick: (id: string) => console.log('Dispose', id) },
		{ label: 'Create Discount', onClick: (id: string) => console.log('Discount', id) },
	];

	const expiredCount = inventory.filter(i => i.status === 'expired').length;
	const expiringSoonCount = inventory.filter(i => i.status === 'expiring-soon').length;
	const validCount = inventory.filter(i => i.status === 'valid').length;

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @md:py-10 @2xl:px-8">
				<Card>
					<Header
						title="Expiry Tracking"
						description="Monitor product shelf life and batch expiration dates"
					/>
					<CardContent className="space-y-6">
						<div className="grid gap-4 @sm:grid-cols-3">
							<SummaryCard
								icon={AlertTriangle}
								label="Expired Items"
								value={expiredCount}
								variant="destructive"
							/>
							<SummaryCard
								icon={Clock}
								label="Expiring Soon"
								value={expiringSoonCount}
								variant="warning"
							/>
							<SummaryCard
								icon={Package}
								label="Valid Items"
								value={validCount}
								variant="default"
							/>
						</div>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Product</TableHead>
									<TableHead>Batch</TableHead>
									<TableHead>Quantity</TableHead>
									<TableHead>Expiry Date</TableHead>
									<TableHead>Time Left</TableHead>
									<TableHead>Status</TableHead>
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{inventory.map((item) => (
									<InventoryRow
										key={item.id}
										item={item}
										statusLabels={statusLabels}
										actions={actions}
									/>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
			</div>
		</section>
	);
}
