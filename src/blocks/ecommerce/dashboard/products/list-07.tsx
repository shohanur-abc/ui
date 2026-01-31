'use client';

import * as React from 'react';
import {
	Package,
	Clock,
	Truck,
	RotateCcw,
	AlertTriangle,
	CheckCircle2,
	MoreHorizontal,
	Shield,
	Calendar,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

interface ReturnStats {
	total: number;
	pending: number;
	approved: number;
	rejected: number;
}

interface ProductReturns {
	id: string;
	name: string;
	sku: string;
	image: string;
	price: number;
	soldCount: number;
	returnRate: number;
	warrantyPeriod: number;
	warrantyUsed: number;
	returnStats: ReturnStats;
	topReasons: { reason: string; count: number }[];
	avgReturnTime: number;
}

interface ReturnRateBadgeProps {
	rate: number;
}

const ReturnRateBadge = ({ rate }: ReturnRateBadgeProps) => {
	const getColor = () => {
		if (rate < 2) return 'text-emerald-500 bg-emerald-500/10';
		if (rate < 5) return 'text-amber-500 bg-amber-500/10';
		return 'text-red-500 bg-red-500/10';
	};

	return (
		<Badge className={`gap-1 ${getColor()}`}>
			<RotateCcw className="size-3" />
			{rate.toFixed(1)}% return rate
		</Badge>
	);
};

interface WarrantyProgressProps {
	periodMonths: number;
	usedCount: number;
	soldCount: number;
	labels: { warranty: string; claims: string };
}

const WarrantyProgress = ({ periodMonths, usedCount, soldCount, labels }: WarrantyProgressProps) => {
	const claimRate = soldCount > 0 ? (usedCount / soldCount) * 100 : 0;

	return (
		<div className="space-y-2 rounded-lg border bg-muted/30 p-3">
			<div className="flex items-center gap-2 text-sm">
				<Shield className="size-4 text-primary" />
				<span className="font-medium">{labels.warranty}: {periodMonths} months</span>
			</div>
			<div className="space-y-1">
				<div className="flex items-center justify-between text-xs">
					<span className="text-muted-foreground">{labels.claims}</span>
					<span>{usedCount} / {soldCount} ({claimRate.toFixed(1)}%)</span>
				</div>
				<Progress value={claimRate} className="h-1.5" />
			</div>
		</div>
	);
};

interface ReturnStatsDisplayProps {
	stats: ReturnStats;
	labels: { total: string; pending: string; approved: string; rejected: string };
}

const ReturnStatsDisplay = ({ stats, labels }: ReturnStatsDisplayProps) => (
	<div className="grid grid-cols-4 gap-2 text-center text-xs">
		<div className="rounded-lg bg-muted p-2">
			<div className="font-bold">{stats.total}</div>
			<div className="text-muted-foreground">{labels.total}</div>
		</div>
		<div className="rounded-lg bg-amber-500/10 p-2">
			<div className="font-bold text-amber-500">{stats.pending}</div>
			<div className="text-muted-foreground">{labels.pending}</div>
		</div>
		<div className="rounded-lg bg-emerald-500/10 p-2">
			<div className="font-bold text-emerald-500">{stats.approved}</div>
			<div className="text-muted-foreground">{labels.approved}</div>
		</div>
		<div className="rounded-lg bg-red-500/10 p-2">
			<div className="font-bold text-red-500">{stats.rejected}</div>
			<div className="text-muted-foreground">{labels.rejected}</div>
		</div>
	</div>
);

interface TopReasonsProps {
	reasons: { reason: string; count: number }[];
	label: string;
}

const TopReasons = ({ reasons, label }: TopReasonsProps) => {
	const maxCount = Math.max(...reasons.map((r) => r.count));

	return (
		<div className="space-y-2">
			<span className="text-xs font-medium text-muted-foreground">{label}</span>
			{reasons.slice(0, 3).map((item) => (
				<div key={item.reason} className="space-y-1">
					<div className="flex items-center justify-between text-xs">
						<span className="truncate">{item.reason}</span>
						<span className="font-medium">{item.count}</span>
					</div>
					<Progress value={(item.count / maxCount) * 100} className="h-1" />
				</div>
			))}
		</div>
	);
};

interface AvgReturnTimeProps {
	days: number;
	label: string;
}

const AvgReturnTime = ({ days, label }: AvgReturnTimeProps) => (
	<div className="flex items-center gap-2 text-sm text-muted-foreground">
		<Clock className="size-4" />
		<span>{label}: {days} days</span>
	</div>
);

interface ProductRowProps {
	product: ProductReturns;
	actions: { label: string; onClick: (id: string) => void }[];
	labels: {
		warranty: string;
		claims: string;
		returnStats: { total: string; pending: string; approved: string; rejected: string };
		topReasons: string;
		avgTime: string;
	};
}

const ProductRow = ({ product, actions, labels }: ProductRowProps) => (
	<div className="rounded-lg border bg-card p-4">
		<div className="mb-4 flex items-start gap-4">
			<div className="size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
				{product.image ? (
					<img src={product.image} alt={product.name} className="size-full object-cover" />
				) : (
					<div className="flex size-full items-center justify-center">
						<Package className="size-8 text-muted-foreground" />
					</div>
				)}
			</div>
			<div className="min-w-0 flex-1">
				<div className="flex items-start justify-between">
					<div>
						<h3 className="font-semibold">{product.name}</h3>
						<p className="text-sm text-muted-foreground">{product.sku}</p>
					</div>
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
				</div>
				<div className="mt-2 flex flex-wrap items-center gap-3">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<span className="text-sm text-muted-foreground">{product.soldCount} sold</span>
					<ReturnRateBadge rate={product.returnRate} />
					<AvgReturnTime days={product.avgReturnTime} label={labels.avgTime} />
				</div>
			</div>
		</div>
		<div className="grid gap-4 @md:grid-cols-3">
			<WarrantyProgress
				periodMonths={product.warrantyPeriod}
				usedCount={product.warrantyUsed}
				soldCount={product.soldCount}
				labels={{ warranty: labels.warranty, claims: labels.claims }}
			/>
			<ReturnStatsDisplay stats={product.returnStats} labels={labels.returnStats} />
			<TopReasons reasons={product.topReasons} label={labels.topReasons} />
		</div>
	</div>
);

export default function Main() {
	const products: ProductReturns[] = [
		{
			id: '1',
			name: 'Wireless Gaming Mouse',
			sku: 'GAM-MOU-001',
			image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop',
			price: 79.99,
			soldCount: 2345,
			returnRate: 3.2,
			warrantyPeriod: 24,
			warrantyUsed: 45,
			returnStats: { total: 75, pending: 12, approved: 58, rejected: 5 },
			topReasons: [
				{ reason: 'Defective scroll wheel', count: 28 },
				{ reason: 'Battery issues', count: 19 },
				{ reason: 'Changed mind', count: 15 },
			],
			avgReturnTime: 8,
		},
		{
			id: '2',
			name: 'Mechanical Keyboard RGB',
			sku: 'GAM-KEY-002',
			image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?w=100&h=100&fit=crop',
			price: 149.99,
			soldCount: 1234,
			returnRate: 1.8,
			warrantyPeriod: 36,
			warrantyUsed: 12,
			returnStats: { total: 22, pending: 3, approved: 18, rejected: 1 },
			topReasons: [
				{ reason: 'Key switch issues', count: 9 },
				{ reason: 'Wrong layout', count: 7 },
				{ reason: 'DOA', count: 4 },
			],
			avgReturnTime: 5,
		},
		{
			id: '3',
			name: 'Budget Webcam HD',
			sku: 'ACC-WEB-003',
			image: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=100&h=100&fit=crop',
			price: 34.99,
			soldCount: 5678,
			returnRate: 8.5,
			warrantyPeriod: 12,
			warrantyUsed: 234,
			returnStats: { total: 483, pending: 45, approved: 398, rejected: 40 },
			topReasons: [
				{ reason: 'Poor image quality', count: 189 },
				{ reason: 'Software issues', count: 145 },
				{ reason: 'Not as described', count: 89 },
			],
			avgReturnTime: 12,
		},
		{
			id: '4',
			name: 'Premium Headset Pro',
			sku: 'AUD-HSP-004',
			image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop',
			price: 199.99,
			soldCount: 890,
			returnRate: 2.1,
			warrantyPeriod: 24,
			warrantyUsed: 8,
			returnStats: { total: 19, pending: 2, approved: 16, rejected: 1 },
			topReasons: [
				{ reason: 'Comfort issues', count: 8 },
				{ reason: 'Audio quality', count: 6 },
				{ reason: 'Wrong size', count: 3 },
			],
			avgReturnTime: 6,
		},
	];

	const actions = [
		{ label: 'View Returns', onClick: (id: string) => console.log('View', id) },
		{ label: 'Manage Warranty', onClick: (id: string) => console.log('Warranty', id) },
		{ label: 'Return Policy', onClick: (id: string) => console.log('Policy', id) },
	];

	const labels = {
		warranty: 'Warranty',
		claims: 'Warranty Claims',
		returnStats: { total: 'Total', pending: 'Pending', approved: 'Approved', rejected: 'Rejected' },
		topReasons: 'Top Return Reasons',
		avgTime: 'Avg return time',
	};

	return (
		<section className="@container" data-theme="dashboard">
			<div className="mx-auto max-w-5xl space-y-4 px-4 py-8 @sm:px-6 @2xl:px-8">
				{products.map((product) => (
					<ProductRow
						key={product.id}
						product={product}
						actions={actions}
						labels={labels}
					/>
				))}
			</div>
		</section>
	);
}
