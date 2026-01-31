'use client';

import * as React from 'react';
import {
	MoreHorizontal,
	Check,
	X,
	Clock,
	RefreshCw,
	Package,
	ExternalLink,
	Copy,
	Truck,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from '@/components/ui/tooltip';

interface Supplier {
	id: string;
	name: string;
	logo?: string;
}

interface Product {
	id: string;
	name: string;
	sku: string;
	image: string;
	supplier: Supplier;
	syncStatus: 'synced' | 'pending' | 'error' | 'syncing';
	lastSync: string;
	externalId: string;
	stockSynced: number;
	stockLocal: number;
	priceSynced: number;
	priceLocal: number;
}

interface SyncStatusBadgeProps {
	status: 'synced' | 'pending' | 'error' | 'syncing';
	labels: Record<'synced' | 'pending' | 'error' | 'syncing', string>;
}

const SyncStatusBadge = ({ status, labels }: SyncStatusBadgeProps) => {
	const icons = {
		synced: <Check className="size-3" />,
		pending: <Clock className="size-3" />,
		error: <X className="size-3" />,
		syncing: <RefreshCw className="size-3 animate-spin" />,
	};

	const variants: Record<'synced' | 'pending' | 'error' | 'syncing', 'default' | 'secondary' | 'destructive' | 'outline'> = {
		synced: 'default',
		pending: 'secondary',
		error: 'destructive',
		syncing: 'outline',
	};

	return (
		<Badge variant={variants[status]} className="gap-1">
			{icons[status]}
			{labels[status]}
		</Badge>
	);
};

interface SupplierInfoProps {
	supplier: Supplier;
}

const SupplierInfo = ({ supplier }: SupplierInfoProps) => (
	<div className="flex items-center gap-2">
		{supplier.logo ? (
			<img
				src={supplier.logo}
				alt={supplier.name}
				className="size-6 rounded object-cover"
			/>
		) : (
			<div className="flex size-6 items-center justify-center rounded bg-muted text-xs font-medium">
				{supplier.name.charAt(0)}
			</div>
		)}
		<span className="text-sm">{supplier.name}</span>
	</div>
);

interface StockComparisonProps {
	local: number;
	synced: number;
	labels: { local: string; synced: string };
}

const StockComparison = ({ local, synced, labels }: StockComparisonProps) => {
	const diff = local - synced;
	const hasDiff = diff !== 0;

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<span className={hasDiff ? 'font-medium text-amber-500' : ''}>{local}</span>
				{hasDiff && (
					<span className="text-xs text-muted-foreground">
						({diff > 0 ? '+' : ''}{diff})
					</span>
				)}
			</div>
			<div className="text-xs text-muted-foreground">
				{labels.synced}: {synced}
			</div>
		</div>
	);
};

interface PriceComparisonProps {
	local: number;
	synced: number;
}

const PriceComparison = ({ local, synced }: PriceComparisonProps) => {
	const hasDiff = local !== synced;

	return (
		<div className="space-y-1">
			<div className={`font-semibold ${hasDiff ? 'text-amber-500' : ''}`}>
				${local.toFixed(2)}
			</div>
			{hasDiff && (
				<div className="text-xs text-muted-foreground line-through">
					${synced.toFixed(2)}
				</div>
			)}
		</div>
	);
};

interface ExternalIdProps {
	id: string;
	onCopy: (id: string) => void;
	onOpen: (id: string) => void;
}

const ExternalId = ({ id, onCopy, onOpen }: ExternalIdProps) => (
	<div className="flex items-center gap-1">
		<code className="rounded bg-muted px-1.5 py-0.5 text-xs font-mono">
			{id}
		</code>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={() => onCopy(id)}>
					<Copy className="size-3.5" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Copy ID</TooltipContent>
		</Tooltip>
		<Tooltip>
			<TooltipTrigger asChild>
				<Button variant="ghost" size="icon-sm" onClick={() => onOpen(id)}>
					<ExternalLink className="size-3.5" />
				</Button>
			</TooltipTrigger>
			<TooltipContent>View in supplier</TooltipContent>
		</Tooltip>
	</div>
);

interface ProductRowProps {
	product: Product;
	actions: { label: string; onClick: (id: string) => void }[];
	syncLabels: Record<'synced' | 'pending' | 'error' | 'syncing', string>;
}

const ProductRow = ({ product, actions, syncLabels }: ProductRowProps) => (
	<TableRow>
		<TableCell>
			<div className="flex items-center gap-3">
				<div className="relative size-12 overflow-hidden rounded-lg border bg-muted">
					{product.image ? (
						<img
							src={product.image}
							alt={product.name}
							className="size-full object-cover"
						/>
					) : (
						<div className="flex size-full items-center justify-center">
							<Package className="size-5 text-muted-foreground" />
						</div>
					)}
				</div>
				<div className="space-y-0.5">
					<div className="font-medium">{product.name}</div>
					<div className="text-xs text-muted-foreground">{product.sku}</div>
				</div>
			</div>
		</TableCell>
		<TableCell>
			<SupplierInfo supplier={product.supplier} />
		</TableCell>
		<TableCell>
			<ExternalId
				id={product.externalId}
				onCopy={(id) => navigator.clipboard.writeText(id)}
				onOpen={(id) => console.log('Open', id)}
			/>
		</TableCell>
		<TableCell>
			<SyncStatusBadge status={product.syncStatus} labels={syncLabels} />
		</TableCell>
		<TableCell className="text-sm text-muted-foreground">
			{product.lastSync}
		</TableCell>
		<TableCell>
			<StockComparison
				local={product.stockLocal}
				synced={product.stockSynced}
				labels={{ local: 'Local', synced: 'Synced' }}
			/>
		</TableCell>
		<TableCell>
			<PriceComparison local={product.priceLocal} synced={product.priceSynced} />
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
							onClick={() => action.onClick(product.id)}
						>
							{action.label}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</TableCell>
	</TableRow>
);

interface SyncSummaryProps {
	stats: { label: string; value: number; color: string }[];
	total: number;
}

const SyncSummary = ({ stats, total }: SyncSummaryProps) => (
	<div className="flex items-center gap-6 border-b px-6 py-4">
		{stats.map((stat) => (
			<div key={stat.label} className="flex items-center gap-2">
				<div className={`size-2 rounded-full ${stat.color}`} />
				<span className="text-sm text-muted-foreground">{stat.label}:</span>
				<span className="text-sm font-medium">{stat.value}</span>
			</div>
		))}
		<div className="flex-1" />
		<Button variant="outline" size="sm" className="gap-2">
			<RefreshCw className="size-4" />
			Sync All
		</Button>
	</div>
);

export default function Main() {
	const products: Product[] = [
		{
			id: '1',
			name: 'Bluetooth Speaker Pro',
			sku: 'SPK-BT-001',
			image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=100&h=100&fit=crop',
			supplier: { id: 's1', name: 'TechDistro', logo: '' },
			syncStatus: 'synced',
			lastSync: '5 min ago',
			externalId: 'TD-78234',
			stockSynced: 156,
			stockLocal: 156,
			priceSynced: 89.99,
			priceLocal: 89.99,
		},
		{
			id: '2',
			name: 'Wireless Charger Stand',
			sku: 'CHG-WS-002',
			image: 'https://images.unsplash.com/photo-1586816879360-004f5b0c51e5?w=100&h=100&fit=crop',
			supplier: { id: 's2', name: 'GlobalTech', logo: '' },
			syncStatus: 'pending',
			lastSync: '2 hours ago',
			externalId: 'GT-45123',
			stockSynced: 89,
			stockLocal: 92,
			priceSynced: 39.99,
			priceLocal: 44.99,
		},
		{
			id: '3',
			name: 'USB-C Cable 2m',
			sku: 'CBL-UC-003',
			image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=100&h=100&fit=crop',
			supplier: { id: 's1', name: 'TechDistro', logo: '' },
			syncStatus: 'syncing',
			lastSync: 'Just now',
			externalId: 'TD-78567',
			stockSynced: 450,
			stockLocal: 432,
			priceSynced: 12.99,
			priceLocal: 12.99,
		},
		{
			id: '4',
			name: 'Laptop Stand Aluminum',
			sku: 'STD-AL-004',
			image: 'https://images.unsplash.com/photo-1527443060795-0402a218799b?w=100&h=100&fit=crop',
			supplier: { id: 's3', name: 'OfficePro', logo: '' },
			syncStatus: 'error',
			lastSync: '1 day ago',
			externalId: 'OP-12890',
			stockSynced: 34,
			stockLocal: 28,
			priceSynced: 79.99,
			priceLocal: 84.99,
		},
		{
			id: '5',
			name: 'Webcam HD 1080p',
			sku: 'CAM-HD-005',
			image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
			supplier: { id: 's2', name: 'GlobalTech', logo: '' },
			syncStatus: 'synced',
			lastSync: '30 min ago',
			externalId: 'GT-45789',
			stockSynced: 67,
			stockLocal: 67,
			priceSynced: 69.99,
			priceLocal: 69.99,
		},
	];

	const syncLabels: Record<'synced' | 'pending' | 'error' | 'syncing', string> = {
		synced: 'Synced',
		pending: 'Pending',
		error: 'Error',
		syncing: 'Syncing',
	};

	const actions = [
		{ label: 'Sync Now', onClick: (id: string) => console.log('Sync', id) },
		{ label: 'View Details', onClick: (id: string) => console.log('View', id) },
		{ label: 'Edit Mapping', onClick: (id: string) => console.log('Edit', id) },
		{ label: 'Unlink', onClick: (id: string) => console.log('Unlink', id) },
	];

	const syncStats = [
		{ label: 'Synced', value: 2, color: 'bg-emerald-500' },
		{ label: 'Pending', value: 1, color: 'bg-amber-500' },
		{ label: 'Syncing', value: 1, color: 'bg-blue-500' },
		{ label: 'Errors', value: 1, color: 'bg-red-500' },
	];

	const columns = ['Product', 'Supplier', 'External ID', 'Status', 'Last Sync', 'Stock', 'Price'];

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-7xl px-4 py-8 @sm:px-6 @2xl:px-8">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Truck className="size-5" />
							Supplier Sync
						</CardTitle>
					</CardHeader>
					<CardContent className="p-0">
						<SyncSummary stats={syncStats} total={5} />
						<Table>
							<TableHeader>
								<TableRow>
									{columns.map((column) => (
										<TableHead key={column}>{column}</TableHead>
									))}
									<TableHead className="w-12" />
								</TableRow>
							</TableHeader>
							<TableBody>
								{products.map((product) => (
									<ProductRow
										key={product.id}
										product={product}
										actions={actions}
										syncLabels={syncLabels}
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
